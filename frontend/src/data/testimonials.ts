export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
  featured?: boolean;
  results?: {
    metric: string;
    value: string;
  }[];
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Founder & CEO',
    company: 'TechStart Solutions',
    content: 'Before vCFO of One, I was drowning in spreadsheets and had no idea if we were actually profitable. Now I have real-time visibility into our cash flow and can make decisions with confidence. The ROI tracking alone has saved us from two bad investments.',
    rating: 5,
    featured: true,
    results: [
      { metric: 'Cash Flow Visibility', value: '100%' },
      { metric: 'Time Saved Weekly', value: '12 hours' },
      { metric: 'ROI on Investments', value: '+47%' }
    ]
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    role: 'Owner',
    company: 'Johnson Construction LLC',
    content: 'As a contractor, I knew how to build houses but not how to build a profitable business. vCFO of One showed me I was actually losing money on 30% of my projects. Now every job is profitable, and I finally understand my numbers.',
    rating: 5,
    featured: true,
    results: [
      { metric: 'Profit Margin Increase', value: '+18%' },
      { metric: 'Unprofitable Projects', value: '0%' },
      { metric: 'Annual Revenue Growth', value: '+65%' }
    ]
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Creative Director',
    company: 'Bloom Digital Agency',
    content: 'I started my agency because I love design, not spreadsheets. vCFO of One handles all the financial complexity so I can focus on what I do best. The automated KPI tracking has been a game-changer for client retention.',
    rating: 5,
    featured: false,
    results: [
      { metric: 'Client Retention', value: '94%' },
      { metric: 'Monthly Recurring Revenue', value: '+125%' }
    ]
  },
  {
    id: '4',
    name: 'David Park',
    role: 'Founder',
    company: 'GreenLeaf Supplements',
    content: 'We were growing fast but hemorrhaging cash. vCFO of One helped us identify that our fastest-growing product line was actually our least profitable. We pivoted our strategy and turned our first profit within 90 days.',
    rating: 5,
    featured: true,
    results: [
      { metric: 'Time to Profitability', value: '90 days' },
      { metric: 'Cash Burn Reduction', value: '-73%' },
      { metric: 'Gross Margin Improvement', value: '+22%' }
    ]
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    role: 'CEO',
    company: 'Thompson Law Group',
    content: "Running a law firm is complex enough without wrestling with financial reports. vCFO of One gives me instant insights into case profitability, staff utilization, and cash flow projections. It's like having a Fortune 500 finance team at a fraction of the cost.",
    rating: 5,
    featured: false,
    results: [
      { metric: 'Revenue per Attorney', value: '+41%' },
      { metric: 'Collection Rate', value: '97%' }
    ]
  },
  {
    id: '6',
    name: 'Alex Kim',
    role: 'Founder',
    company: 'FitLife Studios',
    content: 'Opening a second location almost killed my business because I didn\'t understand unit economics. vCFO of One showed me exactly what metrics to track and when to expand. Now we have 5 profitable locations and growing.',
    rating: 5,
    featured: false,
    results: [
      { metric: 'Locations', value: '5 profitable' },
      { metric: 'Per-Location Profit', value: '+67%' }
    ]
  },
  {
    id: '7',
    name: 'Rachel Green',
    role: 'Owner',
    company: 'Artisan Coffee Roasters',
    content: 'I thought we needed more sales, but vCFO of One showed us we needed better margins. By understanding our true costs and adjusting pricing, we increased profit by 40% without adding a single new customer.',
    rating: 5,
    featured: false,
    results: [
      { metric: 'Profit Increase', value: '+40%' },
      { metric: 'Same Customer Base', value: '100%' }
    ]
  },
  {
    id: '8',
    name: 'James Mitchell',
    role: 'Managing Partner',
    company: 'Mitchell & Associates CPAs',
    content: "Even as a CPA, I struggled with my own firm's finances. vCFO of One provides the strategic financial oversight I needed. The real-time dashboards and predictive analytics have transformed how we operate.",
    rating: 5,
    featured: false,
    results: [
      { metric: 'Partner Distributions', value: '+55%' },
      { metric: 'Operational Efficiency', value: '+38%' }
    ]
  }
];

// Helper function to get featured testimonials
export const getFeaturedTestimonials = () => {
  return testimonials.filter(t => t.featured);
};

// Helper function to get testimonials by rating
export const getTestimonialsByRating = (minRating: number) => {
  return testimonials.filter(t => t.rating >= minRating);
};