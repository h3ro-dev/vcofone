import { EmailTemplate } from '../types/email.types';

export const consultationFollowUpTemplate: Omit<EmailTemplate, 'id'> = {
  name: 'Consultation Follow-up',
  subject: 'Your Financial Clarity Session Recap & Next Steps',
  category: 'follow-up',
  variables: [
    {
      name: 'firstName',
      description: 'Recipient\'s first name',
      required: true,
      example: 'John'
    },
    {
      name: 'keyInsights',
      description: 'Array of key insights from the session',
      required: true,
      example: '["Cash flow needs optimization", "KPI tracking is limited"]'
    },
    {
      name: 'recommendations',
      description: 'Array of recommendations',
      required: true,
      example: '["Implement weekly cash flow forecasting", "Set up KPI dashboard"]'
    },
    {
      name: 'nextStepsUrl',
      description: 'URL to book next steps or sign up',
      required: false,
      defaultValue: '{{websiteUrl}}/get-started'
    },
    {
      name: 'resourcesUrl',
      description: 'URL to helpful resources',
      required: false,
      defaultValue: '{{websiteUrl}}/resources'
    }
  ],
  mjmlTemplate: `
    <mjml>
      <mj-head>
        <mj-title>Consultation Follow-up</mj-title>
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
            <mj-text font-size="24px" font-weight="600" padding-bottom="20px">
              Hi {{firstName}},
            </mj-text>
            
            <mj-text padding-bottom="25px">
              Thank you for taking the time to discuss your business finances with me. It was great learning about your business and understanding your financial goals.
            </mj-text>

            <mj-text padding-bottom="30px">
              As promised, here's a recap of our conversation and your personalized roadmap to financial clarity.
            </mj-text>

            <!-- Key Insights Section -->
            <mj-wrapper background-color="#EFF6FF" border-radius="8px" padding="20px">
              <mj-section>
                <mj-column>
                  <mj-text font-size="18px" font-weight="600" padding-bottom="15px" color="{{primaryColor}}">
                    🔍 Key Insights From Our Session
                  </mj-text>
                  
                  {{#each keyInsights}}
                  <mj-text padding-bottom="10px" padding-left="20px">
                    • {{this}}
                  </mj-text>
                  {{/each}}
                </mj-column>
              </mj-section>
            </mj-wrapper>

            <!-- Recommendations Section -->
            <mj-text font-size="18px" font-weight="600" padding-top="30px" padding-bottom="15px">
              💡 My Recommendations for You
            </mj-text>

            {{#each recommendations}}
            <mj-wrapper background-color="#f9fafb" border-radius="8px" padding="15px" padding-bottom="10px">
              <mj-section>
                <mj-column>
                  <mj-text>
                    <strong>{{@index}}.</strong> {{this}}
                  </mj-text>
                </mj-column>
              </mj-section>
            </mj-wrapper>
            {{/each}}

            <!-- Next Steps CTA -->
            <mj-text font-size="18px" font-weight="600" padding-top="30px" padding-bottom="15px">
              🚀 Ready to Take Action?
            </mj-text>

            <mj-text padding-bottom="25px">
              Based on our discussion, vCFO of One can help you implement these recommendations and achieve the financial clarity you're looking for. Here's what you'll get:
            </mj-text>

            <mj-wrapper background-color="#F0FDF4" border-radius="8px" padding="20px">
              <mj-section>
                <mj-column>
                  <mj-text padding-bottom="10px" color="#166534">
                    ✅ Real-time financial dashboards
                  </mj-text>
                  <mj-text padding-bottom="10px" color="#166534">
                    ✅ Automated cash flow forecasting
                  </mj-text>
                  <mj-text padding-bottom="10px" color="#166534">
                    ✅ Custom KPI tracking & alerts
                  </mj-text>
                  <mj-text padding-bottom="10px" color="#166534">
                    ✅ Monthly virtual CFO consultations
                  </mj-text>
                  <mj-text color="#166534">
                    ✅ ROI analysis for every decision
                  </mj-text>
                </mj-column>
              </mj-section>
            </mj-wrapper>

            <mj-button href="{{nextStepsUrl}}" align="center" padding-top="30px">
              Start Your Free Trial
            </mj-button>

            <mj-text align="center" padding-top="15px" font-size="14px" color="#666666">
              No credit card required • Cancel anytime
            </mj-text>
          </mj-column>
        </mj-section>

        <!-- Resources Section -->
        <mj-section background-color="#f9fafb" padding="30px 20px">
          <mj-column>
            <mj-text font-size="18px" font-weight="600" padding-bottom="15px">
              📚 Helpful Resources
            </mj-text>
            <mj-text padding-bottom="20px">
              While you consider your next steps, here are some resources that might help:
            </mj-text>
            <mj-button href="{{resourcesUrl}}" background-color="white" color="{{primaryColor}}" border="2px solid {{primaryColor}}" align="center">
              Browse Free Resources
            </mj-button>
          </mj-column>
        </mj-section>

        <!-- Personal Note -->
        <mj-section background-color="white" padding="30px 20px">
          <mj-column>
            <mj-text font-style="italic" color="#666666">
              "Remember, every successful business owner started exactly where you are now. The difference is they took action to gain financial clarity. I'm here to help you do the same."
            </mj-text>
            <mj-text align="right" padding-top="10px" color="#666666">
              - Your vCFO of One Team
            </mj-text>
          </mj-column>
        </mj-section>

        <!-- Footer -->
        <mj-section padding="20px">
          <mj-column>
            <mj-text align="center" font-size="14px" color="#666666" padding-bottom="10px">
              Questions? Reply to this email or reach out at {{supportEmail}}
            </mj-text>
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
    keyInsights: [
      'Your cash flow is healthy but unpredictable',
      'You\'re missing key performance metrics',
      'Financial reporting takes too much manual effort'
    ],
    recommendations: [
      'Implement 13-week cash flow forecasting',
      'Set up automated KPI dashboards for daily monitoring',
      'Integrate your accounting software with real-time reporting'
    ]
  }
};