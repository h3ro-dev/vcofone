import { EmailTemplate } from '../types/email.types';

export const consultationReminderTemplate: Omit<EmailTemplate, 'id'> = {
  name: 'Consultation Reminder',
  subject: 'Reminder: Your Financial Clarity Session is Tomorrow',
  category: 'reminder',
  variables: [
    {
      name: 'firstName',
      description: 'Recipient\'s first name',
      required: true,
      example: 'John'
    },
    {
      name: 'consultationDate',
      description: 'Date of the consultation',
      required: true,
      example: '2024-02-15T10:00:00Z'
    },
    {
      name: 'meetingLink',
      description: 'Video call meeting link',
      required: true,
      example: 'https://meet.vcofone.ai/abc123'
    },
    {
      name: 'reminderTimeframe',
      description: 'When the session is (e.g., "tomorrow", "in 1 hour")',
      required: false,
      defaultValue: 'tomorrow'
    }
  ],
  mjmlTemplate: `
    <mjml>
      <mj-head>
        <mj-title>Consultation Reminder</mj-title>
        <mj-font name="Inter" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" />
        <mj-attributes>
          <mj-all font-family="Inter, Arial, sans-serif" />
          <mj-text font-size="16px" line-height="24px" color="#1a1a1a" />
          <mj-button background-color="{{primaryColor}}" color="white" font-size="16px" font-weight="600" inner-padding="16px 32px" border-radius="8px" />
        </mj-attributes>
      </mj-head>
      <mj-body background-color="#f5f5f5">
        <!-- Header -->
        <mj-section background-color="{{primaryColor}}" padding="30px 20px">
          <mj-column>
            <mj-text align="center" color="white" font-size="28px" font-weight="700">
              vCFO of One
            </mj-text>
          </mj-column>
        </mj-section>

        <!-- Reminder Banner -->
        <mj-section background-color="#FEF3C7" padding="15px">
          <mj-column>
            <mj-text align="center" color="#92400E" font-size="18px" font-weight="600">
              ⏰ Reminder: Your session is {{reminderTimeframe}}!
            </mj-text>
          </mj-column>
        </mj-section>

        <!-- Main Content -->
        <mj-section background-color="white" padding="40px 20px">
          <mj-column>
            <mj-text font-size="22px" font-weight="600" padding-bottom="20px">
              Hi {{firstName}},
            </mj-text>
            
            <mj-text padding-bottom="25px">
              Just a friendly reminder that your Financial Clarity Session is coming up {{reminderTimeframe}}. I'm excited to help you unlock insights that will transform your business finances!
            </mj-text>

            <!-- Meeting Details Card -->
            <mj-wrapper background-color="#f9fafb" border-radius="8px" padding="20px">
              <mj-section>
                <mj-column>
                  <mj-text font-size="18px" font-weight="600" padding-bottom="15px" color="{{primaryColor}}">
                    📅 Your Session Details
                  </mj-text>
                  
                  <mj-text padding-bottom="20px">
                    <strong>When:</strong> {{formatDate consultationDate "EEEE, MMMM do 'at' h:mm a zzz"}}
                  </mj-text>

                  <mj-button href="{{meetingLink}}" align="center">
                    Save Meeting Link
                  </mj-button>
                </mj-column>
              </mj-section>
            </mj-wrapper>

            <!-- Quick Checklist -->
            <mj-text font-size="18px" font-weight="600" padding-top="30px" padding-bottom="15px">
              Quick Preparation Checklist:
            </mj-text>

            <mj-wrapper background-color="#F0FDF4" border-radius="8px" padding="15px">
              <mj-section>
                <mj-column>
                  <mj-text padding-bottom="8px" color="#166534">
                    ✅ Have your recent P&L and Balance Sheet ready
                  </mj-text>
                  <mj-text padding-bottom="8px" color="#166534">
                    ✅ List your top 3 financial challenges
                  </mj-text>
                  <mj-text padding-bottom="8px" color="#166534">
                    ✅ Note any specific questions you want answered
                  </mj-text>
                  <mj-text color="#166534">
                    ✅ Find a quiet space for our video call
                  </mj-text>
                </mj-column>
              </mj-section>
            </mj-wrapper>

            <mj-text padding-top="25px" padding-bottom="20px">
              This session is your opportunity to gain clarity on your financial situation and discover strategies to grow your business more profitably.
            </mj-text>

            <mj-text font-style="italic" color="#666666">
              Need to reschedule? <a href="{{websiteUrl}}/reschedule?booking={{urlEncode meetingLink}}" style="color: {{primaryColor}};">Click here</a> to pick a new time that works better for you.
            </mj-text>
          </mj-column>
        </mj-section>

        <!-- What to Expect -->
        <mj-section background-color="#f9fafb" padding="30px 20px">
          <mj-column>
            <mj-text font-size="18px" font-weight="600" padding-bottom="15px">
              What You'll Get From Our Session:
            </mj-text>
            <mj-text padding-bottom="10px">
              🎯 Clear understanding of your financial position
            </mj-text>
            <mj-text padding-bottom="10px">
              📊 Key metrics to track for growth
            </mj-text>
            <mj-text padding-bottom="10px">
              💡 Actionable insights to improve cash flow
            </mj-text>
            <mj-text>
              🚀 Strategic recommendations tailored to your business
            </mj-text>
          </mj-column>
        </mj-section>

        <!-- Footer -->
        <mj-section padding="20px">
          <mj-column>
            <mj-text align="center" font-size="14px" color="#666666" padding-bottom="10px">
              Looking forward to speaking with you {{reminderTimeframe}}!
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
    consultationDate: new Date(Date.now() + 86400000).toISOString(),
    meetingLink: 'https://meet.vcofone.ai/demo123',
    reminderTimeframe: 'tomorrow'
  }
};