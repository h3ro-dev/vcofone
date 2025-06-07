import { EmailTemplate } from '../types/email.types';

export const passwordResetTemplate: Omit<EmailTemplate, 'id'> = {
  name: 'Password Reset',
  subject: 'Reset Your vCFO of One Password',
  category: 'transaction',
  variables: [
    {
      name: 'firstName',
      description: 'User\'s first name',
      required: true,
      example: 'John'
    },
    {
      name: 'resetLink',
      description: 'Password reset link',
      required: true,
      example: 'https://vcofone.ai/reset-password?token=abc123'
    },
    {
      name: 'expirationTime',
      description: 'Link expiration time in hours',
      required: false,
      defaultValue: '24'
    },
    {
      name: 'userEmail',
      description: 'User\'s email address',
      required: true,
      example: 'john@example.com'
    },
    {
      name: 'requestIp',
      description: 'IP address of the request',
      required: false,
      defaultValue: ''
    }
  ],
  mjmlTemplate: `
    <mjml>
      <mj-head>
        <mj-title>Password Reset</mj-title>
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
          </mj-column>
        </mj-section>

        <!-- Main Content -->
        <mj-section background-color="white" padding="40px 20px">
          <mj-column>
            <mj-text align="center" font-size="24px" font-weight="600" padding-bottom="20px">
              Password Reset Request
            </mj-text>
            
            <mj-text padding-bottom="20px">
              Hi {{firstName}},
            </mj-text>
            
            <mj-text padding-bottom="25px">
              We received a request to reset the password for your vCFO of One account associated with {{userEmail}}.
            </mj-text>

            <mj-text padding-bottom="30px">
              If you made this request, click the button below to reset your password:
            </mj-text>

            <mj-button href="{{resetLink}}" align="center">
              Reset Password
            </mj-button>

            <mj-text align="center" padding-top="20px" font-size="14px" color="#666666">
              This link will expire in {{expirationTime}} hours for security reasons.
            </mj-text>
          </mj-column>
        </mj-section>

        <!-- Security Notice -->
        <mj-section background-color="#FEF3C7" padding="30px 20px">
          <mj-column>
            <mj-text font-size="18px" font-weight="600" color="#92400E" padding-bottom="15px">
              🔒 Security Notice
            </mj-text>
            <mj-text color="#92400E" padding-bottom="15px">
              If you didn't request a password reset, please ignore this email. Your password won't be changed unless you click the link above and create a new one.
            </mj-text>
            {{#if requestIp}}
            <mj-text color="#92400E" font-size="14px">
              This request was made from IP address: {{requestIp}}
            </mj-text>
            {{/if}}
          </mj-column>
        </mj-section>

        <!-- Alternative Method -->
        <mj-section background-color="white" padding="30px 20px">
          <mj-column>
            <mj-text font-size="16px" font-weight="600" padding-bottom="15px">
              Having trouble with the button?
            </mj-text>
            <mj-text padding-bottom="10px">
              Copy and paste this link into your browser:
            </mj-text>
            <mj-text font-size="14px" color="{{primaryColor}}" word-break="break-all">
              {{resetLink}}
            </mj-text>
          </mj-column>
        </mj-section>

        <!-- Tips Section -->
        <mj-section background-color="#f9fafb" padding="30px 20px">
          <mj-column>
            <mj-text font-size="18px" font-weight="600" padding-bottom="15px">
              💡 Password Security Tips
            </mj-text>
            <mj-text padding-bottom="10px">
              • Use a unique password you haven't used before
            </mj-text>
            <mj-text padding-bottom="10px">
              • Make it at least 12 characters long
            </mj-text>
            <mj-text padding-bottom="10px">
              • Include a mix of letters, numbers, and symbols
            </mj-text>
            <mj-text>
              • Consider using a password manager
            </mj-text>
          </mj-column>
        </mj-section>

        <!-- Support -->
        <mj-section background-color="white" padding="30px 20px">
          <mj-column>
            <mj-text align="center" font-size="16px" padding-bottom="15px">
              Need help? We're here for you.
            </mj-text>
            <mj-text align="center">
              Contact support at <a href="mailto:{{supportEmail}}" style="color: {{primaryColor}}; text-decoration: none;">{{supportEmail}}</a>
            </mj-text>
          </mj-column>
        </mj-section>

        <!-- Footer -->
        <mj-section padding="20px" background-color="#f5f5f5">
          <mj-column>
            <mj-text align="center" font-size="14px" color="#666666" padding-bottom="10px">
              This is an automated security email from vCFO of One
            </mj-text>
            <mj-text align="center" font-size="14px" color="#666666">
              © {{currentYear}} {{companyName}}. All rights reserved.
            </mj-text>
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  `,
  previewData: {
    firstName: 'John',
    userEmail: 'john@example.com',
    resetLink: 'https://vcofone.ai/reset-password?token=demo123',
    expirationTime: 24,
    requestIp: '192.168.1.1'
  }
};