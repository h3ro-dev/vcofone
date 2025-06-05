import { EmailTemplate } from '../types/email.types';

export const consultationBookingTemplate: Omit<EmailTemplate, 'id'> = {
  name: 'Consultation Booking Confirmation',
  subject: 'Your Financial Clarity Session is Confirmed! 📅',
  category: 'consultation',
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
      name: 'consultationDuration',
      description: 'Duration of the consultation in minutes',
      required: true,
      example: '45'
    },
    {
      name: 'meetingLink',
      description: 'Video call meeting link',
      required: true,
      example: 'https://meet.vcofone.ai/abc123'
    },
    {
      name: 'calendarLink',
      description: 'Link to add to calendar',
      required: false,
      defaultValue: ''
    }
  ],
  mjmlTemplate: `
    <mjml>
      <mj-head>
        <mj-title>Consultation Booking Confirmation</mj-title>
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

        <!-- Success Banner -->
        <mj-section background-color="{{accentColor}}" padding="20px">
          <mj-column>
            <mj-text align="center" color="white" font-size="20px" font-weight="600">
              ✅ Your Financial Clarity Session is Confirmed!
            </mj-text>
          </mj-column>
        </mj-section>

        <!-- Main Content -->
        <mj-section background-color="white" padding="40px 20px">
          <mj-column>
            <mj-text font-size="24px" font-weight="600" padding-bottom="20px">
              Hi {{firstName}},
            </mj-text>
            
            <mj-text padding-bottom="30px">
              Great news! Your free Financial Clarity Session is all set. I'm looking forward to helping you gain crystal-clear visibility into your business finances.
            </mj-text>

            <!-- Meeting Details Card -->
            <mj-wrapper background-color="#f9fafb" border-radius="8px" padding="20px">
              <mj-section>
                <mj-column>
                  <mj-text font-size="18px" font-weight="600" padding-bottom="15px">
                    📅 Session Details
                  </mj-text>
                  
                  <mj-text padding-bottom="10px">
                    <strong>Date & Time:</strong> {{formatDate consultationDate "EEEE, MMMM do, yyyy 'at' h:mm a zzz"}}
                  </mj-text>
                  
                  <mj-text padding-bottom="10px">
                    <strong>Duration:</strong> {{consultationDuration}} minutes
                  </mj-text>
                  
                  <mj-text padding-bottom="20px">
                    <strong>Format:</strong> Video Call
                  </mj-text>

                  <mj-button href="{{meetingLink}}" align="center">
                    Join Video Call
                  </mj-button>

                  {{#if calendarLink}}
                  <mj-text align="center" padding-top="10px">
                    <a href="{{calendarLink}}" style="color: {{primaryColor}}; text-decoration: none;">Add to Calendar</a>
                  </mj-text>
                  {{/if}}
                </mj-column>
              </mj-section>
            </mj-wrapper>

            <!-- What to Expect -->
            <mj-text font-size="18px" font-weight="600" padding-top="30px" padding-bottom="15px">
              What We'll Cover:
            </mj-text>

            <mj-text padding-bottom="10px" padding-left="20px">
              • Your current financial challenges and goals
            </mj-text>
            <mj-text padding-bottom="10px" padding-left="20px">
              • Quick financial health assessment
            </mj-text>
            <mj-text padding-bottom="10px" padding-left="20px">
              • Key metrics you should be tracking
            </mj-text>
            <mj-text padding-bottom="30px" padding-left="20px">
              • Personalized recommendations for your business
            </mj-text>

            <!-- Preparation Tips -->
            <mj-text font-size="18px" font-weight="600" padding-bottom="15px">
              How to Prepare:
            </mj-text>

            <mj-text padding-bottom="10px">
              To make the most of our session, please have the following ready:
            </mj-text>

            <mj-text padding-bottom="10px" padding-left="20px">
              ✓ Recent financial statements (P&L, Balance Sheet)
            </mj-text>
            <mj-text padding-bottom="10px" padding-left="20px">
              ✓ Your top 3 financial concerns or questions
            </mj-text>
            <mj-text padding-bottom="30px" padding-left="20px">
              ✓ Any specific KPIs you're currently tracking
            </mj-text>

            <mj-text>
              Can't make it? No problem! <a href="{{websiteUrl}}/reschedule?booking={{urlEncode meetingLink}}" style="color: {{primaryColor}};">Reschedule here</a>
            </mj-text>
          </mj-column>
        </mj-section>

        <!-- CTA Section -->
        <mj-section background-color="#f9fafb" padding="30px 20px">
          <mj-column>
            <mj-text align="center" font-size="16px" padding-bottom="20px">
              Questions before our call? I'm here to help!
            </mj-text>
            <mj-button href="mailto:{{supportEmail}}" background-color="white" color="{{primaryColor}}" border="2px solid {{primaryColor}}" align="center">
              Email Support
            </mj-button>
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
    consultationDate: new Date(Date.now() + 86400000 * 3).toISOString(),
    consultationDuration: 45,
    meetingLink: 'https://meet.vcofone.ai/demo123'
  }
};