import { EmailTemplate } from '../types/email.types';

export const welcomeTemplate: Omit<EmailTemplate, 'id'> = {
  name: 'Welcome to vCFO of One',
  subject: 'Welcome to vCFO of One, {{firstName}}!',
  category: 'welcome',
  variables: [
    {
      name: 'firstName',
      description: 'Recipient\'s first name',
      required: true,
      example: 'John'
    },
    {
      name: 'lastName',
      description: 'Recipient\'s last name',
      required: true,
      example: 'Doe'
    },
    {
      name: 'ctaUrl',
      description: 'URL for the call-to-action button',
      required: false,
      defaultValue: '{{websiteUrl}}/get-started'
    }
  ],
  mjmlTemplate: `
    <mjml>
      <mj-head>
        <mj-title>Welcome to vCFO of One</mj-title>
        <mj-font name="Inter" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" />
        <mj-attributes>
          <mj-all font-family="Inter, Arial, sans-serif" />
          <mj-text font-size="16px" line-height="24px" color="#1a1a1a" />
          <mj-button background-color="{{primaryColor}}" color="white" font-size="16px" font-weight="600" inner-padding="16px 32px" border-radius="8px" />
        </mj-attributes>
      </mj-head>
      <mj-body background-color="#f5f5f5">
        <!-- Header -->
        <mj-section background-color="{{primaryColor}}" padding="40px 20px">
          <mj-column>
            <mj-text align="center" color="white" font-size="32px" font-weight="700">
              vCFO of One
            </mj-text>
            <mj-text align="center" color="white" font-size="18px" padding-top="10px">
              Your AI-Powered Virtual CFO
            </mj-text>
          </mj-column>
        </mj-section>

        <!-- Main Content -->
        <mj-section background-color="white" padding="40px 20px" border-radius="8px 8px 0 0">
          <mj-column>
            <mj-text font-size="24px" font-weight="600" padding-bottom="20px">
              Welcome {{firstName}}! 🎉
            </mj-text>
            
            <mj-text padding-bottom="20px">
              Thank you for joining vCFO of One. You've just taken the first step towards crystal-clear financial visibility for your business.
            </mj-text>

            <mj-text padding-bottom="20px">
              As your AI-powered virtual CFO, I'm here to help you:
            </mj-text>

            <mj-text padding-bottom="10px" padding-left="20px">
              ✓ Get real-time financial insights
            </mj-text>
            <mj-text padding-bottom="10px" padding-left="20px">
              ✓ Forecast cash flow accurately
            </mj-text>
            <mj-text padding-bottom="10px" padding-left="20px">
              ✓ Track custom KPIs that matter
            </mj-text>
            <mj-text padding-bottom="30px" padding-left="20px">
              ✓ Analyze ROI on all initiatives
            </mj-text>

            <mj-text padding-bottom="30px">
              Ready to get started? Schedule your free Financial Clarity Session and let's transform how you manage your business finances.
            </mj-text>

            <mj-button href="{{ctaUrl}}" align="center">
              Schedule Your Free Session
            </mj-button>
          </mj-column>
        </mj-section>

        <!-- Help Section -->
        <mj-section background-color="#f9fafb" padding="30px 20px">
          <mj-column>
            <mj-text font-size="18px" font-weight="600" padding-bottom="15px">
              Need Help Getting Started?
            </mj-text>
            <mj-text padding-bottom="15px">
              Our team is here to support you every step of the way:
            </mj-text>
            <mj-text padding-bottom="5px">
              📧 Email: {{supportEmail}}
            </mj-text>
            <mj-text>
              🌐 Visit: <a href="{{websiteUrl}}/help" style="color: {{primaryColor}}; text-decoration: none;">Help Center</a>
            </mj-text>
          </mj-column>
        </mj-section>

        <!-- Footer -->
        <mj-section padding="20px">
          <mj-column>
            <mj-text align="center" font-size="14px" color="#666666">
              © {{currentYear}} {{companyName}}. All rights reserved.
            </mj-text>
            <mj-social font-size="15px" icon-size="20px" mode="horizontal" align="center" padding-top="10px">
              <mj-social-element name="linkedin" href="{{socialLinks.linkedin}}" />
              <mj-social-element name="twitter" href="{{socialLinks.twitter}}" />
            </mj-social>
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  `,
  previewData: {
    firstName: 'John',
    lastName: 'Doe'
  }
};