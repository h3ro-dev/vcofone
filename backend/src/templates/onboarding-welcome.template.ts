import { EmailTemplate } from '../types/email.types';

export const onboardingWelcomeTemplate: Omit<EmailTemplate, 'id'> = {
  name: 'Customer Onboarding Welcome',
  subject: 'Welcome Aboard! Let\'s Get Your Financial Dashboard Set Up 🚀',
  category: 'onboarding',
  variables: [
    {
      name: 'firstName',
      description: 'Customer\'s first name',
      required: true,
      example: 'John'
    },
    {
      name: 'companyName',
      description: 'Customer\'s company name',
      required: true,
      example: 'Acme Corp'
    },
    {
      name: 'onboardingUrl',
      description: 'URL to start onboarding',
      required: false,
      defaultValue: '{{websiteUrl}}/onboarding'
    },
    {
      name: 'setupGuideUrl',
      description: 'URL to setup guide',
      required: false,
      defaultValue: '{{websiteUrl}}/guide/setup'
    }
  ],
  mjmlTemplate: `
    <mjml>
      <mj-head>
        <mj-title>Customer Onboarding Welcome</mj-title>
        <mj-font name="Inter" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" />
        <mj-attributes>
          <mj-all font-family="Inter, Arial, sans-serif" />
          <mj-text font-size="16px" line-height="24px" color="#1a1a1a" />
          <mj-button background-color="{{primaryColor}}" color="white" font-size="16px" font-weight="600" inner-padding="16px 32px" border-radius="8px" />
        </mj-attributes>
      </mj-head>
      <mj-body background-color="#f5f5f5">
        <!-- Header with gradient -->
        <mj-section background-url="https://via.placeholder.com/600x200/4169E1/00A878" background-size="cover" padding="60px 20px">
          <mj-column>
            <mj-text align="center" color="white" font-size="36px" font-weight="700">
              Welcome to Your Financial Command Center
            </mj-text>
            <mj-text align="center" color="white" font-size="18px" padding-top="10px">
              {{companyName}}'s journey to financial clarity starts now
            </mj-text>
          </mj-column>
        </mj-section>

        <!-- Main Content -->
        <mj-section background-color="white" padding="40px 20px">
          <mj-column>
            <mj-text font-size="24px" font-weight="600" padding-bottom="20px">
              Congratulations {{firstName}}! 🎉
            </mj-text>
            
            <mj-text padding-bottom="25px">
              You've just taken a huge step towards mastering your business finances. As your AI-powered vCFO, I'm here to guide you through a smooth setup process.
            </mj-text>

            <mj-text padding-bottom="30px">
              In just 15 minutes, you'll have a fully operational financial dashboard that gives you real-time insights into your business performance.
            </mj-text>

            <!-- Getting Started Steps -->
            <mj-text font-size="20px" font-weight="600" padding-bottom="20px" color="{{primaryColor}}">
              🚀 Let's Get You Started
            </mj-text>

            <!-- Step 1 -->
            <mj-wrapper background-color="#f9fafb" border-radius="8px" padding="20px" padding-bottom="15px">
              <mj-section>
                <mj-column width="15%">
                  <mj-text align="center" font-size="24px" font-weight="700" color="{{accentColor}}">
                    1
                  </mj-text>
                </mj-column>
                <mj-column width="85%">
                  <mj-text font-weight="600" padding-bottom="5px">
                    Connect Your Accounting Software
                  </mj-text>
                  <mj-text font-size="14px" color="#666666">
                    Securely link QuickBooks, Xero, or your preferred platform (2 minutes)
                  </mj-text>
                </mj-column>
              </mj-section>
            </mj-wrapper>

            <!-- Step 2 -->
            <mj-wrapper background-color="#f9fafb" border-radius="8px" padding="20px" padding-bottom="15px">
              <mj-section>
                <mj-column width="15%">
                  <mj-text align="center" font-size="24px" font-weight="700" color="{{accentColor}}">
                    2
                  </mj-text>
                </mj-column>
                <mj-column width="85%">
                  <mj-text font-weight="600" padding-bottom="5px">
                    Set Your Key Metrics
                  </mj-text>
                  <mj-text font-size="14px" color="#666666">
                    Choose the KPIs that matter most to your business (5 minutes)
                  </mj-text>
                </mj-column>
              </mj-section>
            </mj-wrapper>

            <!-- Step 3 -->
            <mj-wrapper background-color="#f9fafb" border-radius="8px" padding="20px">
              <mj-section>
                <mj-column width="15%">
                  <mj-text align="center" font-size="24px" font-weight="700" color="{{accentColor}}">
                    3
                  </mj-text>
                </mj-column>
                <mj-column width="85%">
                  <mj-text font-weight="600" padding-bottom="5px">
                    Customize Your Dashboard
                  </mj-text>
                  <mj-text font-size="14px" color="#666666">
                    Arrange widgets and set alerts for instant insights (8 minutes)
                  </mj-text>
                </mj-column>
              </mj-section>
            </mj-wrapper>

            <mj-button href="{{onboardingUrl}}" align="center" padding-top="30px">
              Start Setup Now
            </mj-button>

            <mj-text align="center" padding-top="15px" font-size="14px" color="#666666">
              Average setup time: 15 minutes
            </mj-text>
          </mj-column>
        </mj-section>

        <!-- What's Included -->
        <mj-section background-color="#EFF6FF" padding="40px 20px">
          <mj-column>
            <mj-text font-size="20px" font-weight="600" padding-bottom="20px" align="center">
              Everything You Get with vCFO of One
            </mj-text>
            
            <mj-wrapper>
              <mj-section>
                <mj-column width="50%" padding="10px">
                  <mj-text padding-bottom="10px">
                    ✨ <strong>Real-time Dashboards</strong><br/>
                    <span style="font-size: 14px; color: #666666;">See your finances update live</span>
                  </mj-text>
                  <mj-text padding-bottom="10px">
                    📊 <strong>Custom KPIs</strong><br/>
                    <span style="font-size: 14px; color: #666666;">Track metrics that matter to you</span>
                  </mj-text>
                  <mj-text>
                    🔔 <strong>Smart Alerts</strong><br/>
                    <span style="font-size: 14px; color: #666666;">Get notified of important changes</span>
                  </mj-text>
                </mj-column>
                <mj-column width="50%" padding="10px">
                  <mj-text padding-bottom="10px">
                    💰 <strong>Cash Flow Forecasting</strong><br/>
                    <span style="font-size: 14px; color: #666666;">Predict your future position</span>
                  </mj-text>
                  <mj-text padding-bottom="10px">
                    📈 <strong>ROI Analysis</strong><br/>
                    <span style="font-size: 14px; color: #666666;">Measure every investment</span>
                  </mj-text>
                  <mj-text>
                    🤝 <strong>Monthly vCFO Calls</strong><br/>
                    <span style="font-size: 14px; color: #666666;">Strategic guidance included</span>
                  </mj-text>
                </mj-column>
              </mj-section>
            </mj-wrapper>
          </mj-column>
        </mj-section>

        <!-- Support Section -->
        <mj-section background-color="white" padding="40px 20px">
          <mj-column>
            <mj-text font-size="18px" font-weight="600" padding-bottom="15px" align="center">
              Need Help? We're Here for You
            </mj-text>
            <mj-text align="center" padding-bottom="25px">
              Our support team is standing by to ensure your setup goes smoothly
            </mj-text>
            
            <mj-wrapper>
              <mj-section>
                <mj-column width="33%" padding="10px">
                  <mj-text align="center">
                    📖<br/>
                    <a href="{{setupGuideUrl}}" style="color: {{primaryColor}}; text-decoration: none;">Setup Guide</a>
                  </mj-text>
                </mj-column>
                <mj-column width="33%" padding="10px">
                  <mj-text align="center">
                    💬<br/>
                    <a href="{{websiteUrl}}/chat" style="color: {{primaryColor}}; text-decoration: none;">Live Chat</a>
                  </mj-text>
                </mj-column>
                <mj-column width="33%" padding="10px">
                  <mj-text align="center">
                    📧<br/>
                    <a href="mailto:{{supportEmail}}" style="color: {{primaryColor}}; text-decoration: none;">Email Support</a>
                  </mj-text>
                </mj-column>
              </mj-section>
            </mj-wrapper>
          </mj-column>
        </mj-section>

        <!-- Footer -->
        <mj-section padding="20px" background-color="#f5f5f5">
          <mj-column>
            <mj-text align="center" font-size="14px" color="#666666" padding-bottom="10px">
              Welcome to the vCFO of One family!
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
    companyName: 'Acme Corp'
  }
};