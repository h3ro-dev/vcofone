import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight">
              Get Crystal-Clear Financial Visibility 
              <span className="block text-primary-600 mt-2">Without a Full-Time CFO</span>
            </h1>
            
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              AI-driven virtual CFO providing financial insight and oversight on demand. 
              Stop spending hours in Excel with no clarity. Get the financial leadership your business needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/roi-calculator"
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors inline-block"
              >
                Calculate Your ROI
              </Link>
              <button className="bg-white hover:bg-neutral-50 text-primary-600 font-semibold py-4 px-8 rounded-lg text-lg transition-colors border-2 border-primary-600">
                Get Free Financial Clarity Session
              </button>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary-100 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-accent-100 rounded-full blur-3xl opacity-30"></div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-neutral-900 mb-12">
            Does This Sound Like You?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "💰",
                title: "Managing vs Making Money",
                description: "Spending more time on finances than growing your business"
              },
              {
                icon: "📊",
                title: "Excel Exhaustion",
                description: "Hours in spreadsheets with no real clarity or insights"
              },
              {
                icon: "📉",
                title: "Cash Flow Chaos",
                description: "Unpredictable cash flow causing stress and missed opportunities"
              },
              {
                icon: "❓",
                title: "Unclear Metrics",
                description: "No idea which KPIs matter or how to track them effectively"
              }
            ].map((pain, index) => (
              <div key={index} className="text-center space-y-3">
                <div className="text-4xl mb-4">{pain.icon}</div>
                <h3 className="font-semibold text-lg text-neutral-800">{pain.title}</h3>
                <p className="text-neutral-600">{pain.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-neutral-900 mb-12">
            Transform Your Financial Future
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Real-Time Financial Insights",
                description: "Get instant visibility into your financial health with AI-powered dashboards",
                color: "bg-primary-100"
              },
              {
                title: "Cash Flow Forecasting",
                description: "Predict and prevent cash flow issues before they impact your business",
                color: "bg-accent-100"
              },
              {
                title: "Custom KPI Tracking",
                description: "Monitor the metrics that matter most to your specific business",
                color: "bg-primary-100"
              },
              {
                title: "ROI Analysis",
                description: "Measure the true return on every business initiative and investment",
                color: "bg-accent-100"
              },
              {
                title: "Strategic Guidance",
                description: "Get CFO-level advice without the CFO-level cost",
                color: "bg-primary-100"
              },
              {
                title: "24/7 Availability",
                description: "Your virtual CFO is always ready when you need financial insights",
                color: "bg-accent-100"
              }
            ].map((feature, index) => (
              <div key={index} className={`${feature.color} rounded-xl p-6 space-y-3`}>
                <h3 className="font-semibold text-xl text-neutral-800">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-4xl font-bold text-white">
            Ready to See Your Potential ROI?
          </h2>
          <p className="text-xl text-white opacity-90">
            Most businesses see a 300%+ return within the first 90 days
          </p>
          <Link 
            href="/roi-calculator"
            className="bg-white hover:bg-neutral-50 text-primary-600 font-semibold py-4 px-8 rounded-lg text-lg transition-colors inline-block"
          >
            Calculate Your ROI Now
          </Link>
        </div>
      </section>
    </main>
  )
}