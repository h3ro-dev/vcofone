import { EmailTemplate } from '../types/email.types';

export const monthlyReportTemplate: Omit<EmailTemplate, 'id'> = {
  name: 'Monthly Financial Report',
  subject: '{{monthName}} Financial Report for {{companyName}} 📊',
  category: 'notification',
  variables: [
    {
      name: 'firstName',
      description: 'Recipient\'s first name',
      required: true,
      example: 'John'
    },
    {
      name: 'companyName',
      description: 'Company name',
      required: true,
      example: 'Acme Corp'
    },
    {
      name: 'monthName',
      description: 'Report month name',
      required: true,
      example: 'January'
    },
    {
      name: 'revenue',
      description: 'Monthly revenue',
      required: true,
      example: '125000'
    },
    {
      name: 'revenueChange',
      description: 'Revenue change percentage',
      required: true,
      example: '+12.5'
    },
    {
      name: 'expenses',
      description: 'Monthly expenses',
      required: true,
      example: '95000'
    },
    {
      name: 'expensesChange',
      description: 'Expenses change percentage',
      required: true,
      example: '+8.2'
    },
    {
      name: 'netProfit',
      description: 'Net profit',
      required: true,
      example: '30000'
    },
    {
      name: 'profitMargin',
      description: 'Profit margin percentage',
      required: true,
      example: '24'
    },
    {
      name: 'cashBalance',
      description: 'Current cash balance',
      required: true,
      example: '250000'
    },
    {
      name: 'keyInsights',
      description: 'Array of key insights',
      required: true,
      example: '["Revenue grew by 12.5% MoM", "Operating expenses under control"]'
    },
    {
      name: 'dashboardUrl',
      description: 'URL to full dashboard',
      required: false,
      defaultValue: '{{websiteUrl}}/dashboard'
    }
  ],
  mjmlTemplate: `
    <mjml>
      <mj-head>
        <mj-title>Monthly Financial Report</mj-title>
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
            <mj-text align="center" color="white" font-size="14px" font-weight="500" text-transform="uppercase" letter-spacing="1px">
              Monthly Financial Report
            </mj-text>
            <mj-text align="center" color="white" font-size="28px" font-weight="700" padding-top="10px">
              {{monthName}} {{currentYear}}
            </mj-text>
            <mj-text align="center" color="white" font-size="16px" padding-top="5px">
              {{companyName}}
            </mj-text>
          </mj-column>
        </mj-section>

        <!-- Executive Summary -->
        <mj-section background-color="white" padding="40px 20px">
          <mj-column>
            <mj-text font-size="22px" font-weight="600" padding-bottom="20px">
              Hi {{firstName}},
            </mj-text>
            
            <mj-text padding-bottom="25px">
              Your {{monthName}} financial report is ready. Here's a snapshot of how {{companyName}} performed this month.
            </mj-text>

            <!-- Key Metrics Grid -->
            <mj-wrapper>
              <mj-section>
                <mj-column width="50%" padding="10px">
                  <mj-wrapper background-color="#f9fafb" border-radius="8px" padding="20px">
                    <mj-section>
                      <mj-column>
                        <mj-text font-size="14px" color="#666666" padding-bottom="5px">
                          Revenue
                        </mj-text>
                        <mj-text font-size="24px" font-weight="700" color="{{primaryColor}}" padding-bottom="5px">
                          {{formatCurrency revenue}}
                        </mj-text>
                        <mj-text font-size="14px" color="{{#ifEquals revenueChange.[0] '+'}}#10B981{{else}}#EF4444{{/ifEquals}}">
                          {{revenueChange}}% vs last month
                        </mj-text>
                      </mj-column>
                    </mj-section>
                  </mj-wrapper>
                </mj-column>
                
                <mj-column width="50%" padding="10px">
                  <mj-wrapper background-color="#f9fafb" border-radius="8px" padding="20px">
                    <mj-section>
                      <mj-column>
                        <mj-text font-size="14px" color="#666666" padding-bottom="5px">
                          Expenses
                        </mj-text>
                        <mj-text font-size="24px" font-weight="700" color="#1a1a1a" padding-bottom="5px">
                          {{formatCurrency expenses}}
                        </mj-text>
                        <mj-text font-size="14px" color="{{#ifEquals expensesChange.[0] '-'}}#10B981{{else}}#EF4444{{/ifEquals}}">
                          {{expensesChange}}% vs last month
                        </mj-text>
                      </mj-column>
                    </mj-section>
                  </mj-wrapper>
                </mj-column>
              </mj-section>
              
              <mj-section>
                <mj-column width="50%" padding="10px">
                  <mj-wrapper background-color="#F0FDF4" border-radius="8px" padding="20px">
                    <mj-section>
                      <mj-column>
                        <mj-text font-size="14px" color="#166534" padding-bottom="5px">
                          Net Profit
                        </mj-text>
                        <mj-text font-size="24px" font-weight="700" color="#166534" padding-bottom="5px">
                          {{formatCurrency netProfit}}
                        </mj-text>
                        <mj-text font-size="14px" color="#166534">
                          {{profitMargin}}% margin
                        </mj-text>
                      </mj-column>
                    </mj-section>
                  </mj-wrapper>
                </mj-column>
                
                <mj-column width="50%" padding="10px">
                  <mj-wrapper background-color="#EFF6FF" border-radius="8px" padding="20px">
                    <mj-section>
                      <mj-column>
                        <mj-text font-size="14px" color="#1E40AF" padding-bottom="5px">
                          Cash Balance
                        </mj-text>
                        <mj-text font-size="24px" font-weight="700" color="#1E40AF" padding-bottom="5px">
                          {{formatCurrency cashBalance}}
                        </mj-text>
                        <mj-text font-size="14px" color="#1E40AF">
                          Available funds
                        </mj-text>
                      </mj-column>
                    </mj-section>
                  </mj-wrapper>
                </mj-column>
              </mj-section>
            </mj-wrapper>
          </mj-column>
        </mj-section>

        <!-- Key Insights -->
        <mj-section background-color="#f9fafb" padding="30px 20px">
          <mj-column>
            <mj-text font-size="20px" font-weight="600" padding-bottom="20px">
              🔍 Key Insights
            </mj-text>
            
            {{#each keyInsights}}
            <mj-wrapper background-color="white" border-radius="8px" padding="15px" padding-bottom="10px">
              <mj-section>
                <mj-column width="10%">
                  <mj-text font-size="20px">
                    💡
                  </mj-text>
                </mj-column>
                <mj-column width="90%">
                  <mj-text>
                    {{this}}
                  </mj-text>
                </mj-column>
              </mj-section>
            </mj-wrapper>
            {{/each}}
          </mj-column>
        </mj-section>

        <!-- Trend Chart Placeholder -->
        <mj-section background-color="white" padding="40px 20px">
          <mj-column>
            <mj-text font-size="20px" font-weight="600" padding-bottom="20px">
              📈 Revenue Trend
            </mj-text>
            
            <mj-image src="https://via.placeholder.com/600x300/4169E1/FFFFFF?text=Revenue+Trend+Chart" alt="Revenue Trend Chart" border-radius="8px" />
            
            <mj-text align="center" padding-top="20px" font-size="14px" color="#666666">
              View interactive charts and detailed breakdowns in your dashboard
            </mj-text>
          </mj-column>
        </mj-section>

        <!-- CTA Section -->
        <mj-section background-color="#EFF6FF" padding="40px 20px">
          <mj-column>
            <mj-text align="center" font-size="20px" font-weight="600" padding-bottom="15px">
              Want to dive deeper?
            </mj-text>
            <mj-text align="center" padding-bottom="25px">
              Access your full dashboard for detailed analytics, cash flow projections, and actionable recommendations.
            </mj-text>
            <mj-button href="{{dashboardUrl}}" align="center">
              View Full Dashboard
            </mj-button>
          </mj-column>
        </mj-section>

        <!-- Next Steps -->
        <mj-section background-color="white" padding="30px 20px">
          <mj-column>
            <mj-text font-size="18px" font-weight="600" padding-bottom="15px">
              📅 What's Next?
            </mj-text>
            <mj-text padding-bottom="10px">
              • Your monthly vCFO consultation is scheduled for next week
            </mj-text>
            <mj-text padding-bottom="10px">
              • Q1 quarterly review coming up
            </mj-text>
            <mj-text>
              • Tax optimization opportunities identified - let's discuss
            </mj-text>
          </mj-column>
        </mj-section>

        <!-- Footer -->
        <mj-section padding="20px" background-color="#f5f5f5">
          <mj-column>
            <mj-text align="center" font-size="14px" color="#666666" padding-bottom="10px">
              This report was automatically generated by your vCFO of One AI
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
    companyName: 'Acme Corp',
    monthName: 'January',
    revenue: 125000,
    revenueChange: '+12.5',
    expenses: 95000,
    expensesChange: '+8.2',
    netProfit: 30000,
    profitMargin: 24,
    cashBalance: 250000,
    keyInsights: [
      'Revenue grew by 12.5% month-over-month, driven by new client acquisitions',
      'Operating expenses increased by 8.2% but remain within budget',
      'Cash runway extended to 8.3 months at current burn rate'
    ]
  }
};