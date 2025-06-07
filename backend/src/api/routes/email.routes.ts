import { Router, Request, Response } from 'express';
import { emailService } from '../../services/email.service';
import { SendEmailOptions } from '../../types/email.types';
import { logger } from '../../utils/logger';
import { z } from 'zod';

const router = Router();

// Validation schemas
const sendEmailSchema = z.object({
  to: z.union([z.string().email(), z.array(z.string().email())]),
  templateId: z.string(),
  data: z.record(z.any()),
  cc: z.union([z.string().email(), z.array(z.string().email())]).optional(),
  bcc: z.union([z.string().email(), z.array(z.string().email())]).optional(),
  scheduledFor: z.string().datetime().optional()
});

// Send email endpoint
router.post('/send', async (req: Request, res: Response) => {
  try {
    const validatedData = sendEmailSchema.parse(req.body);
    
    const options: SendEmailOptions = {
      ...validatedData,
      scheduledFor: validatedData.scheduledFor ? new Date(validatedData.scheduledFor) : undefined
    };

    const result = await emailService.send(options);

    if (result.status === 'failed') {
      return res.status(500).json({
        success: false,
        error: result.error || 'Failed to send email'
      });
    }

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    logger.error('Failed to send email', { error, body: req.body });
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors
      });
    }

    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get all templates
router.get('/templates', async (req: Request, res: Response) => {
  try {
    const templates = emailService.getTemplates();
    
    res.json({
      success: true,
      data: templates
    });
  } catch (error) {
    logger.error('Failed to get templates', { error });
    
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve templates'
    });
  }
});

// Get template by ID
router.get('/templates/:id', async (req: Request, res: Response) => {
  try {
    const template = emailService.getTemplate(req.params.id);
    
    if (!template) {
      return res.status(404).json({
        success: false,
        error: 'Template not found'
      });
    }
    
    res.json({
      success: true,
      data: template
    });
  } catch (error) {
    logger.error('Failed to get template', { error, templateId: req.params.id });
    
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve template'
    });
  }
});

// Preview email template
router.post('/preview/:id', async (req: Request, res: Response) => {
  try {
    const template = emailService.getTemplate(req.params.id);
    
    if (!template) {
      return res.status(404).json({
        success: false,
        error: 'Template not found'
      });
    }

    // Use preview data if no data provided
    const data = req.body.data || template.previewData || {};
    const html = await emailService.preview(req.params.id, data);
    
    res.json({
      success: true,
      data: {
        html,
        subject: template.subject,
        variables: template.variables
      }
    });
  } catch (error) {
    logger.error('Failed to preview template', { 
      error, 
      templateId: req.params.id,
      data: req.body.data 
    });
    
    res.status(500).json({
      success: false,
      error: 'Failed to preview template'
    });
  }
});

// Test email endpoint (development only)
if (process.env.NODE_ENV !== 'production') {
  router.post('/test', async (req: Request, res: Response) => {
    try {
      const { templateId, email } = req.body;
      
      if (!templateId || !email) {
        return res.status(400).json({
          success: false,
          error: 'templateId and email are required'
        });
      }

      const template = emailService.getTemplate(templateId);
      if (!template) {
        return res.status(404).json({
          success: false,
          error: 'Template not found'
        });
      }

      const result = await emailService.send({
        to: email,
        templateId,
        data: template.previewData || {}
      });

      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      logger.error('Failed to send test email', { error, body: req.body });
      
      res.status(500).json({
        success: false,
        error: 'Failed to send test email'
      });
    }
  });
}

export default router;