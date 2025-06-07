#!/usr/bin/env node
import dotenv from 'dotenv';
import { emailService } from '../services/email.service';

// Load environment variables
dotenv.config();

async function testEmailTemplate() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('Usage: npm run test-email <template-id> <recipient-email>');
    console.log('Example: npm run test-email welcome test@example.com');
    console.log('\nAvailable templates:');
    
    const templates = emailService.getTemplates();
    templates.forEach(template => {
      console.log(`  - ${template.id}: ${template.name}`);
    });
    
    process.exit(1);
  }

  const [templateId, recipientEmail] = args;
  
  try {
    console.log(`\n🚀 Testing email template: ${templateId}`);
    console.log(`📧 Sending to: ${recipientEmail}\n`);

    const template = emailService.getTemplate(templateId);
    if (!template) {
      console.error(`❌ Template '${templateId}' not found`);
      process.exit(1);
    }

    // Use preview data for testing
    const result = await emailService.send({
      to: recipientEmail,
      templateId,
      data: template.previewData || {}
    });

    if (result.status === 'sent') {
      console.log('✅ Email sent successfully!');
      console.log(`📨 Message ID: ${result.id}`);
    } else {
      console.error('❌ Failed to send email:', result.error);
    }
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  testEmailTemplate();
}