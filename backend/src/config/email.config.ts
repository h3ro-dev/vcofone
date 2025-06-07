import { EmailConfig } from '../types/email.types';
import dotenv from 'dotenv';

dotenv.config();

export const emailConfig: EmailConfig = {
  provider: (process.env.EMAIL_PROVIDER as 'sendgrid' | 'smtp') || 'smtp',
  from: {
    email: process.env.EMAIL_FROM || 'hello@vcofone.ai',
    name: process.env.EMAIL_FROM_NAME || 'vCFO of One'
  },
  replyTo: process.env.EMAIL_REPLY_TO || 'support@vcofone.ai',
  sendgrid: process.env.EMAIL_PROVIDER === 'sendgrid' ? {
    apiKey: process.env.SENDGRID_API_KEY || ''
  } : undefined,
  smtp: process.env.EMAIL_PROVIDER === 'smtp' ? {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || ''
    }
  } : undefined
};

// Template configuration
export const templateConfig = {
  companyName: 'vCFO of One',
  companyLogo: 'https://vcofone.ai/logo.png',
  websiteUrl: 'https://vcofone.ai',
  supportEmail: 'support@vcofone.ai',
  primaryColor: '#4169E1',
  accentColor: '#00A878',
  socialLinks: {
    linkedin: 'https://linkedin.com/company/vcofone',
    twitter: 'https://twitter.com/vcofone'
  }
};