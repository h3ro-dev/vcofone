/**
 * ROI Calculation functions for vCFO of One
 */

export interface ROIInputs {
  currentRevenue: number;
  currentProfit: number;
  hoursPerWeekOnFinance: number;
  hourlyRate: number; // Owner's hourly rate
  missedOpportunities: number; // Estimated monthly missed opportunities
  cashFlowIssues: number; // Monthly cost of cash flow problems
  badDecisions: number; // Monthly cost of poor financial decisions
}

export interface ROIResults {
  currentProfitMargin: number;
  timeValueSaved: number;
  potentialRevenue: number;
  potentialProfit: number;
  improvedProfitMargin: number;
  totalMonthlyBenefit: number;
  totalAnnualBenefit: number;
  monthlyInvestment: number;
  annualInvestment: number;
  monthlyROI: number;
  annualROI: number;
  paybackPeriod: number; // in months
  fiveYearValue: number;
}

export interface ChartDataPoint {
  month: string;
  withoutVCFO: number;
  withVCFO: number;
}

// Pricing tiers for vCFO service
export const VCFO_PRICING = {
  starter: {
    monthly: 997,
    annual: 9970, // ~2 months free
    features: ['Monthly Financial Review', 'Cash Flow Forecasting', 'Basic KPI Dashboard']
  },
  growth: {
    monthly: 1997,
    annual: 19970, // ~2 months free
    features: ['Weekly Financial Review', 'Advanced Forecasting', 'Custom KPI Dashboard', 'Quarterly Strategy Sessions']
  },
  scale: {
    monthly: 3997,
    annual: 39970, // ~2 months free
    features: ['Dedicated CFO Support', 'Real-time Dashboards', 'Board-Ready Reporting', 'M&A Support']
  }
} as const;

export function calculateROI(inputs: ROIInputs, tier: keyof typeof VCFO_PRICING = 'growth'): ROIResults {
  // Current state calculations
  const currentProfitMargin = inputs.currentProfit / inputs.currentRevenue;
  
  // Time savings calculation
  const monthlyHoursSaved = inputs.hoursPerWeekOnFinance * 4.33; // weeks per month
  const timeValueSaved = monthlyHoursSaved * inputs.hourlyRate;
  
  // Revenue improvements (conservative estimates)
  const revenueImprovement = 0.15; // 15% revenue improvement
  const profitMarginImprovement = 0.20; // 20% profit margin improvement
  const cashFlowRecovery = 0.80; // Recover 80% of cash flow issues
  const decisionImprovement = 0.70; // Prevent 70% of bad decisions
  
  // Calculate improved metrics
  const improvedRevenue = inputs.currentRevenue * (1 + revenueImprovement);
  const improvedProfitMargin = currentProfitMargin * (1 + profitMarginImprovement);
  const improvedProfit = improvedRevenue * improvedProfitMargin;
  
  // Calculate total benefits
  const monthlyOperationalSavings = 
    timeValueSaved + 
    (inputs.cashFlowIssues * cashFlowRecovery) + 
    (inputs.badDecisions * decisionImprovement) +
    inputs.missedOpportunities;
  
  const monthlyProfitIncrease = improvedProfit - inputs.currentProfit;
  const totalMonthlyBenefit = monthlyOperationalSavings + monthlyProfitIncrease;
  const totalAnnualBenefit = totalMonthlyBenefit * 12;
  
  // Investment
  const monthlyInvestment = VCFO_PRICING[tier].monthly;
  const annualInvestment = VCFO_PRICING[tier].annual;
  
  // ROI calculations
  const monthlyROI = ((totalMonthlyBenefit - monthlyInvestment) / monthlyInvestment);
  const annualROI = ((totalAnnualBenefit - annualInvestment) / annualInvestment);
  
  // Payback period
  const paybackPeriod = monthlyInvestment / totalMonthlyBenefit;
  
  // 5-year value (with compound growth)
  const annualGrowthRate = 0.10; // 10% annual growth
  let fiveYearValue = 0;
  for (let year = 1; year <= 5; year++) {
    const yearBenefit = totalAnnualBenefit * Math.pow(1 + annualGrowthRate, year - 1);
    fiveYearValue += yearBenefit - annualInvestment;
  }
  
  return {
    currentProfitMargin,
    timeValueSaved,
    potentialRevenue: improvedRevenue,
    potentialProfit: improvedProfit,
    improvedProfitMargin,
    totalMonthlyBenefit,
    totalAnnualBenefit,
    monthlyInvestment,
    annualInvestment,
    monthlyROI,
    annualROI,
    paybackPeriod,
    fiveYearValue
  };
}

export function generateChartData(inputs: ROIInputs, results: ROIResults): ChartDataPoint[] {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const monthlyGrowthRate = 0.01; // 1% monthly growth with vCFO
  const data: ChartDataPoint[] = [];
  
  for (let i = 0; i < 12; i++) {
    const withoutVCFO = inputs.currentProfit;
    const withVCFO = inputs.currentProfit + (results.totalMonthlyBenefit - results.monthlyInvestment) * Math.pow(1 + monthlyGrowthRate, i);
    
    data.push({
      month: months[i],
      withoutVCFO: Math.round(withoutVCFO),
      withVCFO: Math.round(withVCFO)
    });
  }
  
  return data;
}