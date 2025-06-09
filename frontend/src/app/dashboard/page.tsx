'use client';

import React from 'react';
import { Container, Card } from '@/components/ui';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { SimpleBarChart } from '@/components/dashboard/SimpleBarChart';
import { colors } from '@/styles/design-system';

export default function DashboardPreview() {
  // Demo data
  const cashFlowData = [
    { month: 'Jan', inflow: 45000, outflow: 38000 },
    { month: 'Feb', inflow: 52000, outflow: 41000 },
    { month: 'Mar', inflow: 48000, outflow: 43000 },
    { month: 'Apr', inflow: 61000, outflow: 45000 },
    { month: 'May', inflow: 58000, outflow: 47000 },
    { month: 'Jun', inflow: 67000, outflow: 52000 },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 58000 },
    { month: 'Jun', revenue: 67000 },
  ];

  const expenseBreakdown = [
    { category: 'Payroll', amount: 28000, percentage: 45 },
    { category: 'Marketing', amount: 12000, percentage: 19 },
    { category: 'Operations', amount: 8000, percentage: 13 },
    { category: 'Rent & Utilities', amount: 7000, percentage: 11 },
    { category: 'Other', amount: 7000, percentage: 12 },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200 py-6">
        <Container>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Financial Dashboard</h1>
              <p className="text-gray-600 mt-1">Real-time insights for your business</p>
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-medium">Demo Mode</span> • Last updated: Just now
            </div>
          </div>
        </Container>
      </section>

      {/* KPI Cards */}
      <section className="py-8">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Cash on Hand"
              value="$127,450"
              change="+12.5%"
              trend="up"
              icon="💰"
            />
            <MetricCard
              title="Monthly Revenue"
              value="$67,000"
              change="+15.5%"
              trend="up"
              icon="📈"
            />
            <MetricCard
              title="Burn Rate"
              value="$52,000"
              change="-8.2%"
              trend="down"
              icon="🔥"
            />
            <MetricCard
              title="Runway"
              value="2.4 months"
              change="+0.3"
              trend="up"
              icon="🚀"
            />
          </div>
        </Container>
      </section>

      {/* Charts Section */}
      <section className="py-8">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Cash Flow Chart */}
            <ChartCard title="Cash Flow Analysis" subtitle="Inflow vs Outflow">
              <SimpleBarChart
                data={cashFlowData}
                dataKeys={['inflow', 'outflow']}
                colors={[colors.accent[500], colors.primary[500]]}
              />
            </ChartCard>

            {/* Revenue Trend Chart */}
            <ChartCard title="Revenue Trend" subtitle="6-Month Overview">
              <SimpleBarChart
                data={revenueData}
                dataKeys={['revenue']}
                colors={[colors.primary[500]]}
              />
            </ChartCard>
          </div>
        </Container>
      </section>

      {/* Expense Breakdown */}
      <section className="py-8">
        <Container>
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Expense Breakdown</h2>
            <div className="space-y-4">
              {expenseBreakdown.map((expense, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-8 rounded-full" style={{ backgroundColor: colors.primary[500 - index * 100] }} />
                    <div>
                      <p className="font-medium text-gray-900">{expense.category}</p>
                      <p className="text-sm text-gray-500">{expense.percentage}% of total</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900">${expense.amount.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </Card>
        </Container>
      </section>

      {/* AI Insights */}
      <section className="py-8 pb-16">
        <Container>
          <Card className="bg-gradient-to-br from-primary-50 to-accent-50 border-0">
            <div className="flex items-start gap-4">
              <div className="text-3xl">🤖</div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">AI Insights</h2>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Your cash flow is improving. Revenue increased 15.5% while expenses only grew 8.3%.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">•</span>
                    <span>Marketing spend is yielding 3.2x ROI. Consider increasing budget by 20%.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Runway alert: At current burn rate, you have 2.4 months of runway. Consider fundraising or reducing expenses.</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </Container>
      </section>
    </main>
  );
}