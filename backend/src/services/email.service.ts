import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';
import handlebars from 'handlebars';
import mjml2html from 'mjml';
import { 
  EmailConfig, 
  SendEmailOptions, 
  EmailSendResult, 
  EmailTemplate 
} from '../types/email.types';
import { emailConfig, templateConfig } from '../config/email.config';
import { templateRegistry } from '../templates/template.registry';
import { logger } from '../utils/logger';
import { format } from 'date-fns';

export class EmailService {
  private transporter?: nodemailer.Transporter;
  private templates: Map<string, EmailTemplate>;

  constructor(private config: EmailConfig = emailConfig) {
    this.templates = new Map();
    this.initialize();
  }

  private initialize() {
    // Initialize email provider
    if (this.config.provider === 'sendgrid' && this.config.sendgrid) {
      sgMail.setApiKey(this.config.sendgrid.apiKey);
    } else if (this.config.provider === 'smtp' && this.config.smtp) {
      this.transporter = nodemailer.createTransport({
        host: this.config.smtp.host,
        port: this.config.smtp.port,
        secure: this.config.smtp.secure,
        auth: this.config.smtp.auth
      });
    }

    // Register Handlebars helpers
    this.registerHandlebarsHelpers();

    // Load templates
    this.loadTemplates();
  }

  private registerHandlebarsHelpers() {
    // Date formatting helper
    handlebars.registerHelper('formatDate', (date: Date, formatStr: string) => {
      return format(new Date(date), formatStr || 'PPP');
    });

    // Currency formatting helper
    handlebars.registerHelper('formatCurrency', (amount: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);
    });

    // Conditional helper
    handlebars.registerHelper('ifEquals', function(arg1: any, arg2: any, options: any) {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

    // URL encoding helper
    handlebars.registerHelper('urlEncode', (str: string) => {
      return encodeURIComponent(str);
    });
  }

  private loadTemplates() {
    // Load all templates from registry
    Object.entries(templateRegistry).forEach(([id, template]) => {
      this.templates.set(id, { ...template, id });
    });
  }

  async send(options: SendEmailOptions): Promise<EmailSendResult> {
    try {
      const template = this.templates.get(options.templateId);
      if (!template) {
        throw new Error(`Template ${options.templateId} not found`);
      }

      // Merge template data with global config
      const templateData = {
        ...templateConfig,
        ...options.data,
        currentYear: new Date().getFullYear()
      };

      // Compile subject
      const subjectTemplate = handlebars.compile(template.subject);
      const subject = subjectTemplate(templateData);

      // Compile MJML template
      const mjmlTemplate = handlebars.compile(template.mjmlTemplate);
      const mjmlOutput = mjmlTemplate(templateData);

      // Convert MJML to HTML
      const { html, errors } = mjml2html(mjmlOutput, { minify: true });
      if (errors && errors.length > 0) {
        logger.error('MJML compilation errors:', errors);
      }

      // Send email based on provider
      let result: EmailSendResult;
      if (this.config.provider === 'sendgrid') {
        result = await this.sendWithSendGrid({
          to: options.to,
          from: this.config.from,
          subject,
          html,
          cc: options.cc,
          bcc: options.bcc,
          attachments: options.attachments,
          replyTo: this.config.replyTo
        });
      } else {
        result = await this.sendWithSMTP({
          to: options.to,
          from: `${this.config.from.name} <${this.config.from.email}>`,
          subject,
          html,
          cc: options.cc,
          bcc: options.bcc,
          attachments: options.attachments,
          replyTo: this.config.replyTo
        });
      }

      logger.info(`Email sent successfully`, {
        templateId: options.templateId,
        to: options.to,
        subject,
        result
      });

      return result;
    } catch (error) {
      logger.error('Failed to send email', { error, options });
      return {
        id: '',
        status: 'failed',
        provider: this.config.provider,
        timestamp: new Date(),
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private async sendWithSendGrid(mailOptions: any): Promise<EmailSendResult> {
    const msg = {
      to: mailOptions.to,
      from: {
        email: mailOptions.from.email,
        name: mailOptions.from.name
      },
      subject: mailOptions.subject,
      html: mailOptions.html,
      cc: mailOptions.cc,
      bcc: mailOptions.bcc,
      replyTo: mailOptions.replyTo,
      attachments: mailOptions.attachments?.map((att: any) => ({
        content: att.content.toString('base64'),
        filename: att.filename,
        type: att.contentType,
        disposition: att.contentDisposition,
        contentId: att.cid
      }))
    };

    const [response] = await sgMail.send(msg);
    
    return {
      id: response.headers['x-message-id'] || '',
      status: 'sent',
      provider: 'sendgrid',
      timestamp: new Date()
    };
  }

  private async sendWithSMTP(mailOptions: any): Promise<EmailSendResult> {
    if (!this.transporter) {
      throw new Error('SMTP transporter not initialized');
    }

    const info = await this.transporter.sendMail({
      ...mailOptions,
      attachments: mailOptions.attachments?.map((att: any) => ({
        filename: att.filename,
        content: att.content,
        contentType: att.contentType,
        contentDisposition: att.contentDisposition,
        cid: att.cid
      }))
    });

    return {
      id: info.messageId,
      status: 'sent',
      provider: 'smtp',
      timestamp: new Date()
    };
  }

  // Preview email template
  async preview(templateId: string, data: Record<string, any>): Promise<string> {
    const template = this.templates.get(templateId);
    if (!template) {
      throw new Error(`Template ${templateId} not found`);
    }

    const templateData = {
      ...templateConfig,
      ...data,
      currentYear: new Date().getFullYear()
    };

    const mjmlTemplate = handlebars.compile(template.mjmlTemplate);
    const mjmlOutput = mjmlTemplate(templateData);
    const { html } = mjml2html(mjmlOutput);

    return html;
  }

  // Get all templates
  getTemplates(): EmailTemplate[] {
    return Array.from(this.templates.values());
  }

  // Get template by ID
  getTemplate(id: string): EmailTemplate | undefined {
    return this.templates.get(id);
  }
}

// Export singleton instance
export const emailService = new EmailService();