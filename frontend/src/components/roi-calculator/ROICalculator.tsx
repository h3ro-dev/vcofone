'use client';

import React, { useState, useEffect } from 'react';
import { calculateROI, generateChartData, VCFO_PRICING, type ROIInputs, type ROIResults } from '@/lib/roi-calculations';
import { formatCurrency, formatPercentage, cn } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  helperText?: string;
}

const Slider: React.FC<SliderProps> = ({ 
  label, 
  value, 
  onChange, 
  min, 
  max, 
  step, 
  prefix = '', 
  suffix = '',
  helperText 
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-neutral-700">{label}</label>
        <span className="text-lg font-semibold text-primary-600">
          {prefix}{value.toLocaleString()}{suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer slider"
      />
      {helperText && (
        <p className="text-xs text-neutral-500">{helperText}</p>
      )}
    </div>
  );
};

export default function ROICalculator() {
  const [selectedTier, setSelectedTier] = useState<keyof typeof VCFO_PRICING>('growth');
  const [inputs, setInputs] = useState<ROIInputs>({
    currentRevenue: 1000000,
    currentProfit: 150000,
    hoursPerWeekOnFinance: 10,
    hourlyRate: 150,
    missedOpportunities: 5000,
    cashFlowIssues: 3000,
    badDecisions: 2000,
  });
  
  const [results, setResults] = useState<ROIResults | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const calculatedResults = calculateROI(inputs, selectedTier);
    setResults(calculatedResults);
    setChartData(generateChartData(inputs, calculatedResults));
  }, [inputs, selectedTier]);

  const updateInput = (key: keyof ROIInputs, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-neutral-900">
          ROI Calculator for Virtual CFO Services
        </h1>
        <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
          Discover how much value a Virtual CFO can add to your business. 
          Input your current metrics below to see your potential return on investment.
        </p>
      </div>

      {/* Tier Selection */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(Object.keys(VCFO_PRICING) as Array<keyof typeof VCFO_PRICING>).map((tier) => (
            <div
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={cn(
                "p-6 rounded-lg border-2 cursor-pointer transition-all",
                selectedTier === tier
                  ? "border-primary-500 bg-primary-50"
                  : "border-neutral-200 hover:border-primary-300"
              )}
            >
              <h3 className="text-xl font-semibold capitalize mb-2">{tier}</h3>
              <p className="text-2xl font-bold text-primary-600 mb-4">
                {formatCurrency(VCFO_PRICING[tier].monthly)}/mo
              </p>
              <ul className="space-y-2">
                {VCFO_PRICING[tier].features.map((feature, idx) => (
                  <li key={idx} className="text-sm text-neutral-600 flex items-start">
                    <span className="text-accent-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Your Current Business Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Slider
            label="Annual Revenue"
            value={inputs.currentRevenue}
            onChange={(v) => updateInput('currentRevenue', v)}
            min={100000}
            max={10000000}
            step={50000}
            prefix="$"
            helperText="Your total annual revenue"
          />
          
          <Slider
            label="Annual Profit"
            value={inputs.currentProfit}
            onChange={(v) => updateInput('currentProfit', v)}
            min={10000}
            max={2000000}
            step={10000}
            prefix="$"
            helperText="Your net profit after all expenses"
          />
          
          <Slider
            label="Hours Per Week on Finance"
            value={inputs.hoursPerWeekOnFinance}
            onChange={(v) => updateInput('hoursPerWeekOnFinance', v)}
            min={1}
            max={40}
            step={1}
            suffix=" hours"
            helperText="Time you spend on financial tasks"
          />
          
          <Slider
            label="Your Hourly Rate"
            value={inputs.hourlyRate}
            onChange={(v) => updateInput('hourlyRate', v)}
            min={50}
            max={500}
            step={10}
            prefix="$"
            suffix="/hour"
            helperText="Value of your time"
          />
          
          <Slider
            label="Monthly Missed Opportunities"
            value={inputs.missedOpportunities}
            onChange={(v) => updateInput('missedOpportunities', v)}
            min={0}
            max={50000}
            step={500}
            prefix="$"
            helperText="Revenue lost due to lack of financial insight"
          />
          
          <Slider
            label="Monthly Cash Flow Issues"
            value={inputs.cashFlowIssues}
            onChange={(v) => updateInput('cashFlowIssues', v)}
            min={0}
            max={50000}
            step={500}
            prefix="$"
            helperText="Costs from poor cash flow management"
          />
          
          <Slider
            label="Monthly Cost of Bad Decisions"
            value={inputs.badDecisions}
            onChange={(v) => updateInput('badDecisions', v)}
            min={0}
            max={50000}
            step={500}
            prefix="$"
            helperText="Losses from uninformed financial decisions"
          />
        </div>
      </div>

      {/* Results Section */}
      {results && (
        <>
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl shadow-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-6">Your Potential ROI</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <p className="text-5xl font-bold mb-2">
                  {formatPercentage(results.annualROI)}
                </p>
                <p className="text-lg opacity-90">Annual ROI</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-bold mb-2">
                  {results.paybackPeriod < 1 
                    ? `${Math.round(results.paybackPeriod * 30)} days`
                    : `${results.paybackPeriod.toFixed(1)} months`
                  }
                </p>
                <p className="text-lg opacity-90">Payback Period</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-bold mb-2">
                  {formatCurrency(results.fiveYearValue)}
                </p>
                <p className="text-lg opacity-90">5-Year Value</p>
              </div>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Financial Impact Breakdown</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-neutral-800">Monthly Benefits</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Time Value Saved</span>
                    <span className="font-semibold">{formatCurrency(results.timeValueSaved)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Operational Improvements</span>
                    <span className="font-semibold">
                      {formatCurrency(
                        inputs.missedOpportunities + 
                        inputs.cashFlowIssues * 0.8 + 
                        inputs.badDecisions * 0.7
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Profit Increase</span>
                    <span className="font-semibold">
                      {formatCurrency(results.potentialProfit / 12 - inputs.currentProfit / 12)}
                    </span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total Monthly Benefit</span>
                    <span className="text-accent-600">{formatCurrency(results.totalMonthlyBenefit)}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-neutral-800">Profit Margins</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Current Margin</span>
                    <span className="font-semibold">{formatPercentage(results.currentProfitMargin)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Improved Margin</span>
                    <span className="font-semibold text-accent-600">
                      {formatPercentage(results.improvedProfitMargin)}
                    </span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Monthly Investment</span>
                      <span className="font-semibold">{formatCurrency(results.monthlyInvestment)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg mt-2">
                      <span>Net Monthly Gain</span>
                      <span className="text-accent-600">
                        {formatCurrency(results.totalMonthlyBenefit - results.monthlyInvestment)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">12-Month Profit Projection</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <Tooltip 
                    formatter={(value: any) => formatCurrency(value)}
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="withoutVCFO" 
                    stroke="#9CA3AF" 
                    name="Without vCFO"
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="withVCFO" 
                    stroke="#4169E1" 
                    name="With vCFO"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Ready to Transform Your Financial Future?
            </h2>
            <p className="text-lg text-neutral-700 mb-6 max-w-2xl mx-auto">
              Based on your inputs, partnering with vCFO of One could generate{' '}
              <span className="font-bold text-primary-600">
                {formatCurrency(results.totalAnnualBenefit - results.annualInvestment)}
              </span>{' '}
              in additional profit this year alone.
            </p>
            <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors">
              Get Your Free Financial Clarity Session
            </button>
          </div>
        </>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #4169E1;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #4169E1;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          border: none;
        }
      `}</style>
    </div>
  );
}