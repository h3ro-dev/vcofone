require('dotenv').config({ path: '../backend/.env' });
const mongoose = require('mongoose');
const BlogPost = require('../backend/src/models/BlogPost');

// Sample blog posts data
const samplePosts = [
  {
    title: '5 Cash Flow Mistakes That Kill Small Businesses',
    excerpt: 'Learn how to avoid the most common cash flow pitfalls that cause 82% of small businesses to fail.',
    content: `# 5 Cash Flow Mistakes That Kill Small Businesses

Cash flow is the lifeblood of any business. Yet, 82% of small businesses fail due to cash flow problems. As a virtual CFO who has worked with hundreds of small businesses, I've seen these mistakes repeated time and again.

## 1. Not Tracking Cash Flow Regularly

Many business owners only look at their bank balance when they need to make a payment. This reactive approach is dangerous.

**Solution**: Implement weekly cash flow forecasting. Use tools or spreadsheets to project your cash position 13 weeks ahead.

## 2. Confusing Profit with Cash Flow

Your P&L might show a profit, but if your customers haven't paid yet, you can't pay your bills with profit.

**Solution**: Focus on cash-based metrics alongside accrual accounting. Track Days Sales Outstanding (DSO) religiously.

## 3. Offering Terms Without Consideration

Giving every customer 30-day terms without assessing their creditworthiness is a recipe for disaster.

**Solution**: Implement credit checks, require deposits for new customers, and consider offering early payment discounts.

## 4. Poor Inventory Management

Tying up cash in excess inventory is like putting money in a safe you can't open.

**Solution**: Use just-in-time ordering, implement inventory turnover targets, and regularly review slow-moving stock.

## 5. Growing Too Fast

Paradoxically, rapid growth can kill a business faster than slow sales.

**Solution**: Model the cash impact of growth before accepting large orders. Consider factoring or lines of credit to bridge timing gaps.

## Take Action Today

Don't let your business become another statistic. Start with one improvement this week:

1. Set up a simple 13-week cash flow forecast
2. Calculate your current DSO
3. Review your customer payment terms

Remember, managing cash flow isn't just about survival—it's about creating the freedom to grow your business on your terms.`,
    category: 'Cash Flow',
    tags: ['cash flow', 'small business', 'financial management', 'business survival'],
    author: {
      name: 'vCFO Team',
      bio: 'Expert virtual CFOs helping small businesses achieve financial clarity and growth.',
    },
    featured: true,
    status: 'published',
  },
  {
    title: 'The 7 KPIs Every Small Business Must Track',
    excerpt: 'Stop flying blind. These seven key performance indicators will give you the financial visibility you need to make confident decisions.',
    content: `# The 7 KPIs Every Small Business Must Track

Running a business without tracking KPIs is like driving with your eyes closed. You might get lucky for a while, but eventually, you'll crash.

## Why KPIs Matter

KPIs (Key Performance Indicators) transform gut feelings into data-driven decisions. They're your business's vital signs.

## The Essential 7

### 1. Gross Profit Margin
**Formula**: (Revenue - COGS) / Revenue × 100

This tells you how much money you keep from each sale after direct costs. Aim for industry benchmarks, but always push for improvement.

### 2. Customer Acquisition Cost (CAC)
**Formula**: Total Sales & Marketing Costs / Number of New Customers

If you're spending $1,000 to acquire a customer who only brings $500 in lifetime value, you have a problem.

### 3. Monthly Recurring Revenue (MRR)
Even if you don't have a subscription business, track your predictable revenue. It's the foundation of financial stability.

### 4. Cash Conversion Cycle
**Formula**: DSO + Inventory Days - DPO

This shows how quickly you turn investments into cash. The lower, the better.

### 5. Customer Lifetime Value (CLV)
**Formula**: Average Purchase Value × Purchase Frequency × Customer Lifespan

This number should be at least 3x your CAC for a healthy business.

### 6. Quick Ratio
**Formula**: (Current Assets - Inventory) / Current Liabilities

Can you pay your bills if sales stop tomorrow? This ratio gives you the answer.

### 7. Revenue Per Employee
**Formula**: Total Revenue / Number of Employees

This efficiency metric helps you benchmark against competitors and track productivity.

## Implementation Tips

1. **Start Simple**: Pick 3 KPIs to start. Master those before adding more.
2. **Automate Tracking**: Use accounting software that calculates these automatically.
3. **Review Weekly**: KPIs are useless if you don't act on them.
4. **Share with Your Team**: Transparency drives accountability.

## Your Next Step

Choose one KPI from this list that you're not currently tracking. Set up a simple spreadsheet or dashboard to monitor it weekly. In 30 days, you'll wonder how you ever managed without it.`,
    category: 'KPIs & Metrics',
    tags: ['KPIs', 'metrics', 'performance tracking', 'business intelligence'],
    author: {
      name: 'vCFO Team',
      bio: 'Expert virtual CFOs helping small businesses achieve financial clarity and growth.',
    },
    featured: false,
    status: 'published',
  },
  {
    title: 'Tax Planning Strategies That Save Small Businesses Thousands',
    excerpt: 'Discover legal tax strategies that can reduce your tax bill by 20-40%. Stop overpaying and start keeping more of what you earn.',
    content: `# Tax Planning Strategies That Save Small Businesses Thousands

Most small business owners overpay taxes by thousands each year. Not because they want to, but because they don't know these strategies exist.

## The Cost of Poor Tax Planning

The average small business overpays taxes by 20-40%. On $500,000 in revenue, that's $20,000-$40,000 left on the table.

## Top Tax-Saving Strategies

### 1. Choose the Right Business Structure

The difference between an LLC, S-Corp, and C-Corp can save you thousands:

- **LLC**: Simple, but you pay self-employment tax on all profits
- **S-Corp**: Save on self-employment tax by paying yourself a reasonable salary
- **C-Corp**: Double taxation, but potential benefits for high-growth businesses

### 2. Maximize Retirement Contributions

Beyond a simple IRA:

- **SEP-IRA**: Contribute up to 25% of compensation or $66,000
- **Solo 401(k)**: Contribute up to $66,000 plus $7,500 catch-up
- **Defined Benefit Plan**: Contribute up to $265,000 annually

### 3. Leverage Section 179 Deduction

Write off up to $1,160,000 in equipment purchases immediately instead of depreciating over years.

### 4. Home Office Deduction

If you use part of your home exclusively for business:
- Deduct a percentage of mortgage/rent, utilities, insurance
- Simplified option: $5 per square foot up to $1,500

### 5. Hire Your Kids

If your children are under 18:
- Pay them up to $13,850 tax-free
- Deduct their wages as a business expense
- No payroll taxes if you're a sole proprietor

### 6. Time Your Income and Expenses

Strategic timing can save thousands:
- Defer income to next year if you expect lower rates
- Accelerate expenses into current year for immediate deductions

### 7. R&D Tax Credit

Not just for tech companies! If you're improving products or processes, you might qualify for credits up to $500,000.

## Implementation Checklist

1. **Review your business structure** - Are you in the optimal entity?
2. **Calculate retirement contribution room** - Are you maximizing it?
3. **Track all business expenses** - Missing deductions is like throwing money away
4. **Plan quarterly** - Don't wait until year-end
5. **Work with a proactive CPA** - Not all accountants are tax strategists

## The Bottom Line

Tax planning isn't about evading taxes—it's about legally keeping more of what you've earned. Every dollar saved in taxes is a dollar you can reinvest in growing your business.

Start with one strategy from this list. The ROI on good tax planning is often 10:1 or higher.`,
    category: 'Tax Strategy',
    tags: ['tax planning', 'tax savings', 'small business taxes', 'deductions'],
    author: {
      name: 'vCFO Team',
      bio: 'Expert virtual CFOs helping small businesses achieve financial clarity and growth.',
    },
    featured: false,
    status: 'published',
  },
  {
    title: 'Financial Planning 101: Building Your Business Budget',
    excerpt: 'A practical guide to creating a budget that actually works for your small business. Includes templates and real-world examples.',
    content: `# Financial Planning 101: Building Your Business Budget

A budget isn't a constraint—it's a roadmap to profitability. Yet 61% of small businesses don't have a formal budget. Here's how to join the successful 39%.

## Why Budgets Fail

Most budgets fail because they're:
- Too complex
- Based on wishful thinking
- Never updated
- Not tied to action

## The Zero-Based Budgeting Approach

Instead of using last year's numbers, start from zero and justify every expense. This forces you to think critically about spending.

## Step-by-Step Budget Creation

### Step 1: Project Revenue Realistically

Start with:
- Historical data (if available)
- Signed contracts
- Sales pipeline probability
- Market conditions

**Pro tip**: Create three scenarios - conservative, realistic, and optimistic.

### Step 2: Identify Fixed Costs

These don't change with sales:
- Rent
- Salaries
- Insurance
- Software subscriptions

### Step 3: Calculate Variable Costs

These scale with revenue:
- Cost of goods sold
- Sales commissions
- Payment processing fees
- Shipping

### Step 4: Plan for One-Time Expenses

Don't let these surprise you:
- Equipment purchases
- Marketing campaigns
- Professional development
- Legal fees

### Step 5: Build in a Buffer

Add 10-15% contingency for the unexpected. If you don't use it, it becomes profit.

## Monthly Budget Template

| Category | Jan | Feb | Mar | Q1 Total |
|----------|-----|-----|-----|----------|
| **Revenue** |
| Product Sales | $50,000 | $52,000 | $55,000 | $157,000 |
| Service Revenue | $20,000 | $20,000 | $22,000 | $62,000 |
| **Total Revenue** | $70,000 | $72,000 | $77,000 | $219,000 |
| **Fixed Costs** |
| Rent | $5,000 | $5,000 | $5,000 | $15,000 |
| Salaries | $25,000 | $25,000 | $25,000 | $75,000 |
| **Variable Costs** |
| COGS (40%) | $20,000 | $20,800 | $22,000 | $62,800 |
| **Net Profit** | $20,000 | $21,200 | $25,000 | $66,200 |

## Making Your Budget Work

### 1. Review Weekly
Compare actual vs. budget every week. Waiting until month-end is too late.

### 2. Involve Your Team
Share relevant portions with department heads. They'll help you stay on track.

### 3. Tie to KPIs
Link budget items to key metrics. This creates accountability.

### 4. Update Quarterly
As conditions change, your budget should too. It's a living document.

## Common Budgeting Mistakes

1. **Being too optimistic with revenue** - Use conservative estimates
2. **Forgetting about taxes** - Set aside 25-30% of profit
3. **No emergency fund** - Build 3-6 months of expenses
4. **Cutting marketing in tough times** - This often makes things worse

## Your Action Plan

1. Download our budget template (link)
2. Block 2 hours this week to create your first draft
3. Review with your accountant or advisor
4. Implement weekly budget reviews

Remember: A budget is just a plan. The magic happens when you execute and adjust based on real results.`,
    category: 'Financial Planning',
    tags: ['budgeting', 'financial planning', 'business budget', 'cash management'],
    author: {
      name: 'vCFO Team',
      bio: 'Expert virtual CFOs helping small businesses achieve financial clarity and growth.',
    },
    featured: false,
    status: 'published',
  },
  {
    title: 'How to Calculate ROI on Every Business Investment',
    excerpt: 'Stop guessing whether your investments pay off. Learn the simple framework that reveals the true return on every dollar spent.',
    content: `# How to Calculate ROI on Every Business Investment

"Is this worth it?" It's the question every business owner asks before spending money. Here's how to answer it with confidence.

## The True Cost of Not Measuring ROI

Without ROI calculations, you're:
- Wasting money on ineffective strategies
- Missing opportunities with high returns
- Making emotional instead of logical decisions

## The Basic ROI Formula

**ROI = (Gain from Investment - Cost of Investment) / Cost of Investment × 100**

Simple, right? The challenge is defining "gain" and "cost" accurately.

## ROI Calculations by Investment Type

### Marketing Campaigns

**Example**: Facebook Ad Campaign
- Cost: $5,000
- New customers: 50
- Average customer value: $500
- Gain: 50 × $500 = $25,000
- ROI: ($25,000 - $5,000) / $5,000 × 100 = 400%

**Hidden costs to include**:
- Agency fees
- Creative development
- Staff time managing campaign

### New Equipment

**Example**: CNC Machine
- Cost: $50,000
- Annual labor savings: $30,000
- Increased capacity revenue: $40,000
- Annual gain: $70,000
- First-year ROI: ($70,000 - $50,000) / $50,000 × 100 = 40%

**Consider**:
- Maintenance costs
- Training time
- Opportunity cost of capital

### Employee Training

**Example**: Sales Training Program
- Cost: $10,000
- Sales increase: 20%
- Previous annual sales: $500,000
- Gain: $500,000 × 0.20 = $100,000
- ROI: ($100,000 - $10,000) / $10,000 × 100 = 900%

**Don't forget**:
- Lost productivity during training
- Implementation time
- Potential turnover

### Technology Implementation

**Example**: New CRM System
- Cost: $24,000/year
- Time saved: 10 hours/week × 52 weeks = 520 hours
- Hourly value: $50
- Annual savings: $26,000
- Customer retention improvement: $50,000
- Total gain: $76,000
- ROI: ($76,000 - $24,000) / $24,000 × 100 = 217%

## Advanced ROI Concepts

### 1. Time Value of Money

Future gains are worth less than immediate gains. Use Net Present Value (NPV) for multi-year investments.

### 2. Risk-Adjusted ROI

High-risk investments should have higher projected ROI to compensate.

### 3. Opportunity Cost

What could you earn investing the money elsewhere? Your ROI should beat this.

### 4. Intangible Benefits

Some gains are hard to quantify:
- Brand reputation
- Employee morale
- Customer satisfaction

Assign conservative values to these when possible.

## ROI Decision Framework

Use this checklist before any investment:

1. **Calculate conservative ROI** - Use pessimistic assumptions
2. **Set minimum threshold** - e.g., 50% ROI minimum
3. **Consider payback period** - How quickly will you recoup?
4. **Assess risk level** - Higher risk needs higher ROI
5. **Compare alternatives** - Is there a better option?
6. **Plan measurement** - How will you track actual ROI?

## Common ROI Mistakes

1. **Ignoring ongoing costs** - Subscriptions, maintenance, updates
2. **Overestimating gains** - Be conservative
3. **Too short timeframe** - Some investments take time
4. **Not tracking actual results** - Measure to improve

## Your ROI Tracking System

1. Create a simple spreadsheet with:
   - Investment name
   - Date
   - Projected cost/gain/ROI
   - Actual cost/gain/ROI
   - Lessons learned

2. Review quarterly to:
   - Identify winning strategies
   - Cut losing investments
   - Improve projections

## Take Action

Pick one recent investment and calculate its actual ROI. You might be surprised by what you find. Knowledge is power—and profit.`,
    category: 'Growth Strategy',
    tags: ['ROI', 'investment analysis', 'business growth', 'financial decisions'],
    author: {
      name: 'vCFO Team',
      bio: 'Expert virtual CFOs helping small businesses achieve financial clarity and growth.',
    },
    featured: true,
    status: 'published',
  }
];

// Connect to MongoDB and seed data
async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vcofone', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing posts
    await BlogPost.deleteMany({});
    console.log('Cleared existing blog posts');

    // Insert sample posts
    const createdPosts = await BlogPost.insertMany(samplePosts);
    console.log(`Created ${createdPosts.length} blog posts`);

    // Add some related posts
    for (let i = 0; i < createdPosts.length; i++) {
      const post = createdPosts[i];
      const relatedPosts = createdPosts
        .filter((p, index) => index !== i)
        .slice(0, 3)
        .map(p => p._id);
      
      post.relatedPosts = relatedPosts;
      await post.save();
    }
    console.log('Added related posts');

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the seeding function
seedDatabase();