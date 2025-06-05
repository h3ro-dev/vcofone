# vCFO of One - Email Template System

A comprehensive email template system for the vCFO of One platform, featuring responsive MJML templates, multiple provider support, and a robust API.

## Features

- 🎨 **Beautiful MJML Templates** - Responsive email templates using MJML
- 📧 **Multiple Provider Support** - SendGrid and SMTP support out of the box
- 🔧 **Template Engine** - Handlebars templating with custom helpers
- 📊 **8 Pre-built Templates** - Ready-to-use templates for common scenarios
- 🚀 **RESTful API** - Simple API for sending emails and managing templates
- 📝 **TypeScript** - Fully typed for better developer experience
- 🔒 **Secure** - Environment-based configuration for sensitive data

## Email Templates

### Available Templates

1. **Welcome Email** (`welcome`)
   - Sent when a new user signs up
   - Introduces key features and benefits

2. **Consultation Booking** (`consultation-booking`)
   - Confirms Financial Clarity Session booking
   - Includes meeting details and preparation tips

3. **Consultation Reminder** (`consultation-reminder`)
   - Reminds users of upcoming consultations
   - Sent 24 hours before the session

4. **Consultation Follow-up** (`consultation-followup`)
   - Sent after consultation sessions
   - Includes recap and personalized recommendations

5. **Onboarding Welcome** (`onboarding-welcome`)
   - Welcomes new customers
   - Guides through platform setup

6. **Monthly Report** (`monthly-report`)
   - Automated monthly financial summary
   - Key metrics and insights

7. **Payment Receipt** (`payment-receipt`)
   - Transaction confirmation
   - Includes invoice details

8. **Password Reset** (`password-reset`)
   - Secure password reset flow
   - Includes security tips

## Installation

```bash
cd backend
npm install
```

## Configuration

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Configure your email provider:

### For SMTP (Gmail, Outlook, etc.)
```env
EMAIL_PROVIDER=smtp
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### For SendGrid
```env
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=your-sendgrid-api-key
```

## Usage

### Starting the Server

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

### API Endpoints

#### Send Email
```http
POST /api/email/send
Content-Type: application/json

{
  "to": "customer@example.com",
  "templateId": "welcome",
  "data": {
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

#### Get All Templates
```http
GET /api/email/templates
```

#### Get Template by ID
```http
GET /api/email/templates/:id
```

#### Preview Template
```http
POST /api/email/preview/:id
Content-Type: application/json

{
  "data": {
    "firstName": "John",
    "companyName": "Acme Corp"
  }
}
```

#### Send Test Email (Development Only)
```http
POST /api/email/test
Content-Type: application/json

{
  "templateId": "welcome",
  "email": "test@example.com"
}
```

## Template Variables

Each template has specific variables that need to be provided:

### Welcome Email
```javascript
{
  firstName: "John",
  lastName: "Doe",
  ctaUrl: "https://vcofone.ai/get-started" // optional
}
```

### Consultation Booking
```javascript
{
  firstName: "John",
  consultationDate: "2024-02-15T10:00:00Z",
  consultationDuration: 45,
  meetingLink: "https://meet.vcofone.ai/abc123",
  calendarLink: "..." // optional
}
```

### Monthly Report
```javascript
{
  firstName: "John",
  companyName: "Acme Corp",
  monthName: "January",
  revenue: 125000,
  revenueChange: "+12.5",
  expenses: 95000,
  expensesChange: "+8.2",
  netProfit: 30000,
  profitMargin: 24,
  cashBalance: 250000,
  keyInsights: ["Revenue grew by 12.5%", "..."]
}
```

## Custom Handlebars Helpers

The system includes several custom Handlebars helpers:

- `{{formatDate date "format"}}` - Format dates using date-fns
- `{{formatCurrency amount}}` - Format currency values
- `{{ifEquals value1 value2}}` - Conditional comparison
- `{{urlEncode string}}` - URL encode strings

## Adding New Templates

1. Create a new template file in `src/templates/`:
```typescript
// src/templates/new-template.template.ts
import { EmailTemplate } from '../types/email.types';

export const newTemplate: Omit<EmailTemplate, 'id'> = {
  name: 'New Template',
  subject: 'Subject with {{variable}}',
  category: 'notification',
  variables: [
    {
      name: 'variable',
      description: 'Description',
      required: true,
      example: 'Example value'
    }
  ],
  mjmlTemplate: `
    <mjml>
      <!-- Your MJML template -->
    </mjml>
  `,
  previewData: {
    variable: 'Example value'
  }
};
```

2. Add to template registry in `src/templates/template.registry.ts`:
```typescript
import { newTemplate } from './new-template.template';

export const templateRegistry = {
  // ... existing templates
  'new-template': newTemplate
};
```

## Development Tips

### Testing Email Templates

1. Use the preview endpoint to see rendered HTML without sending
2. Use the test endpoint to send actual emails in development
3. MJML provides excellent error messages for invalid markup

### Email Provider Tips

- **Gmail**: Use app-specific passwords, not your regular password
- **SendGrid**: Use API keys with only necessary permissions
- **Development**: Consider using services like Mailtrap or Ethereal Email

### Best Practices

1. Always test templates across multiple email clients
2. Keep templates under 102KB to avoid Gmail clipping
3. Use preview text effectively
4. Include both text and HTML versions (handled automatically)
5. Test with real data to ensure proper formatting

## Troubleshooting

### Common Issues

1. **SMTP Authentication Failed**
   - Ensure you're using app-specific passwords
   - Check if 2FA is enabled on your email account

2. **Templates Not Loading**
   - Check that all imports in template.registry.ts are correct
   - Ensure template files are properly exported

3. **MJML Compilation Errors**
   - Check MJML syntax in templates
   - Ensure all MJML tags are properly closed

## Security Considerations

- Never commit `.env` files
- Use environment variables for all sensitive data
- Implement rate limiting for production use
- Validate all input data
- Sanitize template variables to prevent XSS

## License

Part of the vCFO of One platform by Utlyze.