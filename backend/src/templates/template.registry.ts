import { EmailTemplate } from '../types/email.types';
import { welcomeTemplate } from './welcome.template';
import { consultationBookingTemplate } from './consultation-booking.template';
import { consultationReminderTemplate } from './consultation-reminder.template';
import { consultationFollowUpTemplate } from './consultation-followup.template';
import { onboardingWelcomeTemplate } from './onboarding-welcome.template';
import { monthlyReportTemplate } from './monthly-report.template';
import { paymentReceiptTemplate } from './payment-receipt.template';
import { passwordResetTemplate } from './password-reset.template';

export const templateRegistry: Record<string, Omit<EmailTemplate, 'id'>> = {
  'welcome': welcomeTemplate,
  'consultation-booking': consultationBookingTemplate,
  'consultation-reminder': consultationReminderTemplate,
  'consultation-followup': consultationFollowUpTemplate,
  'onboarding-welcome': onboardingWelcomeTemplate,
  'monthly-report': monthlyReportTemplate,
  'payment-receipt': paymentReceiptTemplate,
  'password-reset': passwordResetTemplate
};