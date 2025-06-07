import { EmailTemplate } from '../types/email.types';

export const paymentReceiptTemplate: Omit<EmailTemplate, 'id'> = {
  name: 'Payment Receipt',
  subject: 'Payment Receipt - Invoice #{{invoiceNumber}}',
  category: 'transaction',
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
      name: 'invoiceNumber',
      description: 'Invoice number',
      required: true,
      example: 'INV-2024-001'
    },
    {
      name: 'paymentDate',
      description: 'Payment date',
      required: true,
      example: '2024-01-15T10:00:00Z'
    },
    {
      name: 'paymentAmount',
      description: 'Payment amount',
      required: true,
      example: '299'
    },
    {
      name: 'paymentMethod',
      description: 'Payment method',
      required: true,
      example: 'Credit Card ending in 4242'
    },
    {
      name: 'subscriptionPlan',
      description: 'Subscription plan name',
      required: true,
      example: 'vCFO Pro Monthly'
    },
    {
      name: 'billingPeriod',
      description: 'Billing period',
      required: true,
      example: 'January 1 - January 31, 2024'
    },
    {
      name: 'downloadUrl',
      description: 'URL to download receipt',
      required: false,
      defaultValue: '{{websiteUrl}}/receipts/{{invoiceNumber}}'
    }
  ],
  mjmlTemplate: `
    <mjml>
      <mj-head>
        <mj-title>Payment Receipt</mj-title>
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
            <mj-text align="center" color="white" font-size="16px" padding-top="5px">
              Payment Receipt
            </mj-text>
          </mj-column>
        </mj-section>

        <!-- Success Banner -->
        <mj-section background-color="#10B981" padding="15px">
          <mj-column>
            <mj-text align="center" color="white" font-size="18px" font-weight="600">
              ✓ Payment Successful
            </mj-text>
          </mj-column>
        </mj-section>

        <!-- Main Content -->
        <mj-section background-color="white" padding="40px 20px">
          <mj-column>
            <mj-text font-size="22px" font-weight="600" padding-bottom="20px">
              Thank you for your payment, {{firstName}}!
            </mj-text>
            
            <mj-text padding-bottom="30px">
              This email confirms that we've received your payment for {{companyName}}'s vCFO of One subscription.
            </mj-text>

            <!-- Receipt Details -->
            <mj-wrapper background-color="#f9fafb" border-radius="8px" padding="25px">
              <mj-section>
                <mj-column>
                  <mj-text font-size="18px" font-weight="600" padding-bottom="20px">
                    Receipt Details
                  </mj-text>
                  
                  <mj-divider border-color="#e5e7eb" border-width="1px" padding-bottom="20px" />
                  
                  <mj-table>
                    <tr>
                      <td style="padding: 8px 0; color: #666666;">Invoice Number:</td>
                      <td style="padding: 8px 0; text-align: right; font-weight: 600;">{{invoiceNumber}}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #666666;">Payment Date:</td>
                      <td style="padding: 8px 0; text-align: right;">{{formatDate paymentDate "MMMM d, yyyy"}}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #666666;">Payment Method:</td>
                      <td style="padding: 8px 0; text-align: right;">{{paymentMethod}}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #666666;">Billing Period:</td>
                      <td style="padding: 8px 0; text-align: right;">{{billingPeriod}}</td>
                    </tr>
                  </mj-table>
                  
                  <mj-divider border-color="#e5e7eb" border-width="1px" padding-top="20px" padding-bottom="20px" />
                  
                  <mj-table>
                    <tr>
                      <td style="padding: 8px 0;">{{subscriptionPlan}}</td>
                      <td style="padding: 8px 0; text-align: right; font-weight: 600;">{{formatCurrency paymentAmount}}</td>
                    </tr>
                    <tr>
                      <td style="padding: 16px 0; font-size: 18px; font-weight: 600;">Total Paid:</td>
                      <td style="padding: 16px 0; text-align: right; font-size: 20px; font-weight: 700; color: {{primaryColor}};">{{formatCurrency paymentAmount}}</td>
                    </tr>
                  </mj-table>
                </mj-column>
              </mj-section>
            </mj-wrapper>

            <!-- Download Button -->
            <mj-button href="{{downloadUrl}}" align="center" padding-top="30px">
              Download Receipt PDF
            </mj-button>
          </mj-column>
        </mj-section>

        <!-- What's Included Reminder -->
        <mj-section background-color="#f9fafb" padding="30px 20px">
          <mj-column>
            <mj-text font-size="18px" font-weight="600" padding-bottom="15px">
              Your Subscription Includes:
            </mj-text>
            <mj-text padding-bottom="8px">
              ✓ Unlimited access to financial dashboards
            </mj-text>
            <mj-text padding-bottom="8px">
              ✓ Real-time cash flow forecasting
            </mj-text>
            <mj-text padding-bottom="8px">
              ✓ Custom KPI tracking and alerts
            </mj-text>
            <mj-text padding-bottom="8px">
              ✓ Monthly vCFO consultation calls
            </mj-text>
            <mj-text>
              ✓ Priority email support
            </mj-text>
          </mj-column>
        </mj-section>

        <!-- Tax Information -->
        <mj-section background-color="white" padding="30px 20px">
          <mj-column>
            <mj-wrapper background-color="#FEF3C7" border-radius="8px" padding="15px">
              <mj-section>
                <mj-column width="10%">
                  <mj-text font-size="20px">
                    💡
                  </mj-text>
                </mj-column>
                <mj-column width="90%">
                  <mj-text color="#92400E">
                    <strong>Tax Tip:</strong> This subscription is typically tax-deductible as a business expense. Keep this receipt for your records.
                  </mj-text>
                </mj-column>
              </mj-section>
            </mj-wrapper>
          </mj-column>
        </mj-section>

        <!-- Support Section -->
        <mj-section padding="20px">
          <mj-column>
            <mj-text align="center" font-size="14px" color="#666666" padding-bottom="10px">
              Questions about your billing? Contact us at {{supportEmail}}
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
    companyName: 'Acme Corp',
    invoiceNumber: 'INV-2024-001',
    paymentDate: new Date().toISOString(),
    paymentAmount: 299,
    paymentMethod: 'Credit Card ending in 4242',
    subscriptionPlan: 'vCFO Pro Monthly',
    billingPeriod: 'January 1 - January 31, 2024'
  }
};