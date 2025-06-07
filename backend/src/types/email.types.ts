/// <reference types="node" />

export interface EmailConfig {
  provider: 'sendgrid' | 'smtp';
  from: {
    email: string;
    name: string;
  };
  replyTo?: string;
  sendgrid?: {
    apiKey: string;
  };
  smtp?: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  };
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  category: EmailTemplateCategory;
  mjmlTemplate: string;
  variables: TemplateVariable[];
  previewData?: Record<string, any>;
}

export type EmailTemplateCategory = 
  | 'welcome'
  | 'consultation'
  | 'follow-up'
  | 'reminder'
  | 'onboarding'
  | 'marketing'
  | 'transaction'
  | 'notification';

export interface TemplateVariable {
  name: string;
  description: string;
  required: boolean;
  defaultValue?: string;
  example?: string;
}

export interface SendEmailOptions {
  to: string | string[];
  templateId: string;
  data: Record<string, any>;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: EmailAttachment[];
  scheduledFor?: Date;
  tags?: string[];
}

export interface EmailAttachment {
  filename: string;
  content: Buffer | string;
  contentType?: string;
  contentDisposition?: 'attachment' | 'inline';
  cid?: string;
}

export interface EmailSendResult {
  id: string;
  status: 'sent' | 'queued' | 'failed';
  provider: string;
  timestamp: Date;
  error?: string;
}

export interface EmailLog {
  id: string;
  to: string[];
  from: string;
  subject: string;
  templateId: string;
  status: 'sent' | 'failed' | 'bounced' | 'opened' | 'clicked';
  sentAt: Date;
  openedAt?: Date;
  clickedAt?: Date;
  error?: string;
  metadata?: Record<string, any>;
}