'use client'

import React from 'react'
import MetricCard from '@/components/dashboard/MetricCard'
import ChartCard from '@/components/dashboard/ChartCard'
import SimpleBarChart from '@/components/dashboard/SimpleBarChart'

// Icons as simple SVG components
const DollarIcon = () => (
  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const TrendingUpIcon = () => (
  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const UsersIcon = () => (
  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)

const ChartIcon = () => (
  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

export default function DashboardPage() {
  // Sample data for the dashboard
  const revenueData = [
    { label: 'Jan', value: 45000 },
    { label: 'Feb', value: 52000 },
    { label: 'Mar', value: 48000 },
    { label: 'Apr', value: 61000 },
    { label: 'May', value: 55000 },
    { label: 'Jun', value: 67000 },
  ]

  const expenseData = [
    { label: 'Marketing', value: 12000, color: '#4169E1' },
    { label: 'Operations', value: 28000, color: '#00A878' },
    { label: 'Salaries', value: 45000, color: '#6B7280' },
    { label: 'Other', value: 8000, color: '#F59E0B' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">vCFO Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">Financial Overview & Insights</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                Export Report
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-[#4169E1] rounded-lg hover:bg-[#3455C8]">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Monthly Revenue"
            value={67000}
            change={22}
            trend="up"
            icon={<DollarIcon />}
            prefix="$"
          />
          <MetricCard
            title="Net Profit Margin"
            value="24.3%"
            change={3.2}
            trend="up"
            icon={<TrendingUpIcon />}
          />
          <MetricCard
            title="Active Clients"
            value={148}
            change={-5}
            trend="down"
            icon={<UsersIcon />}
          />
          <MetricCard
            title="Cash Flow"
            value={125000}
            change={15}
            trend="up"
            icon={<ChartIcon />}
            prefix="$"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard 
            title="Revenue Trend" 
            subtitle="Last 6 months performance"
          >
            <SimpleBarChart data={revenueData} />
          </ChartCard>
          
          <ChartCard 
            title="Expense Breakdown" 
            subtitle="Current month distribution"
          >
            <SimpleBarChart data={expenseData} />
          </ChartCard>
        </div>

        {/* Insights Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Powered Insights</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Strong Revenue Growth</p>
                <p className="text-sm text-gray-600">Your revenue has increased by 22% compared to last month. This growth is primarily driven by new client acquisitions.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Optimize Marketing Spend</p>
                <p className="text-sm text-gray-600">Marketing expenses are 15% higher than industry average. Consider reallocating budget to channels with higher ROI.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Cash Flow Forecast</p>
                <p className="text-sm text-gray-600">Based on current trends, you'll have sufficient cash flow for the next 6 months with a 20% buffer for unexpected expenses.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left">
            <h4 className="font-medium text-gray-900">Generate P&L Report</h4>
            <p className="text-sm text-gray-600 mt-1">Create detailed profit & loss statement</p>
          </button>
          <button className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left">
            <h4 className="font-medium text-gray-900">Cash Flow Analysis</h4>
            <p className="text-sm text-gray-600 mt-1">Deep dive into cash flow patterns</p>
          </button>
          <button className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left">
            <h4 className="font-medium text-gray-900">ROI Calculator</h4>
            <p className="text-sm text-gray-600 mt-1">Calculate ROI for your initiatives</p>
          </button>
        </div>
      </main>
    </div>
  )
}