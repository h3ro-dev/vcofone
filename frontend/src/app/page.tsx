'use client';

import React, { useState } from 'react';
import { Button, Card, Input, Container } from '@/components/ui';
import { colors, typography, spacing } from '@/styles/design-system';

export default function Home() {
  const [email, setEmail] = useState('');
  const [showConsultationModal, setShowConsultationModal] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit to API
    console.log('Email submitted:', email);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20 md:py-32">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              Get Crystal-Clear Financial Visibility Without a Full-Time CFO
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 animate-slide-up">
              AI-driven virtual CFO providing financial insight and oversight on demand. 
              Make confident financial decisions with real-time analytics and expert guidance tailored for small business owners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-200">
              <Button 
                size="lg" 
                onClick={() => setShowConsultationModal(true)}
              >
                Get Your Free Financial Clarity Session
              </Button>
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See How It Works
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 bg-white">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Sound Familiar?
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            We understand the challenges small business owners face every day.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Spending More Time Managing Money Than Making It?",
                description: "You're buried in spreadsheets, reconciling accounts, and chasing invoices instead of focusing on growth and serving your customers."
              },
              {
                title: "Hours in Excel with No Real Clarity",
                description: "Despite all your efforts tracking numbers, you still can't answer critical questions about your business's financial health or future."
              },
              {
                title: "Cash Flow Surprises Keep You Up at Night",
                description: "Unpredictable cash flow makes it impossible to plan ahead, invest in growth, or even take a proper vacation."
              },
              {
                title: "Flying Blind Without Clear KPIs",
                description: "You know metrics matter, but which ones? Without the right dashboard, you're making decisions based on gut feel instead of data."
              }
            ].map((pain, index) => (
              <Card key={index} variant="bordered" className="hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {pain.title}
                </h3>
                <p className="text-gray-600">
                  {pain.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gray-50">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Your AI-Powered Virtual CFO
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            vCFO of One transforms your financial chaos into clarity with AI-driven insights 
            and real-time analytics designed specifically for small business owners.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Real-Time Financial Dashboard",
                description: "See your complete financial picture at a glance. Cash position, revenue trends, expense patterns, and profitability metrics updated in real-time.",
                icon: "📊"
              },
              {
                title: "Intelligent Cash Flow Forecasting",
                description: "Predict cash crunches before they happen. Our AI analyzes your patterns and alerts you to potential issues weeks in advance.",
                icon: "📈"
              },
              {
                title: "Custom KPI Tracking",
                description: "Track the metrics that actually matter for your business. Set targets, monitor progress, and get alerts when things go off track.",
                icon: "📉"
              },
              {
                title: "ROI Analysis on Everything",
                description: "Know exactly what's working and what's not. Get data-driven insights on every initiative, expense, and investment.",
                icon: "💡"
              }
            ].map((feature, index) => (
              <Card key={index} variant="elevated">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Financial Clarity in 3 Simple Steps
          </h2>
          
          <div className="max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Connect Your Data",
                description: "Securely link your accounting software, bank accounts, and business tools. Setup takes less than 15 minutes."
              },
              {
                step: "2",
                title: "Get Instant Insights",
                description: "Our AI analyzes your financial data and surfaces the insights that matter most for your business."
              },
              {
                step: "3",
                title: "Make Confident Decisions",
                description: "Use your personalized dashboard and recommendations to make data-driven decisions that drive growth."
              }
            ].map((step, index) => (
              <div key={index} className="flex items-start mb-12 last:mb-0">
                <div className="flex-shrink-0 w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  {step.step}
                </div>
                <div className="ml-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-lg text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-primary-50">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            What You Get with vCFO of One
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Save 10+ Hours Per Week",
                description: "Automate financial reporting and analysis. Spend time growing your business, not managing spreadsheets."
              },
              {
                title: "Increase Profitability by 15-30%",
                description: "Identify hidden profit leaks and optimization opportunities most small businesses miss."
              },
              {
                title: "Sleep Better at Night",
                description: "Know your cash position for the next 90 days. No more financial surprises or emergency scrambles."
              },
              {
                title: "Strategic Financial Partner",
                description: "Get CFO-level insights and recommendations without the six-figure salary."
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-lg text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <Container>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Choose the plan that fits your business
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$197",
                description: "Perfect for businesses under $500K annual revenue",
                features: [
                  "Real-time financial dashboard",
                  "Basic cash flow forecasting (30 days)",
                  "5 custom KPIs",
                  "Monthly AI insights report",
                  "Email support"
                ]
              },
              {
                name: "Growth",
                price: "$397",
                description: "Ideal for businesses $500K-$2M annual revenue",
                features: [
                  "Everything in Starter",
                  "Advanced cash flow forecasting (90 days)",
                  "Unlimited custom KPIs",
                  "Weekly AI insights & recommendations",
                  "Profit optimization analysis",
                  "Priority support"
                ],
                popular: true
              },
              {
                name: "Scale",
                price: "$797",
                description: "For businesses over $2M annual revenue",
                features: [
                  "Everything in Growth",
                  "Multi-entity support",
                  "Custom integrations",
                  "Daily monitoring & alerts",
                  "Quarterly strategy sessions",
                  "Dedicated success manager"
                ]
              }
            ].map((plan, index) => (
              <Card 
                key={index} 
                variant={plan.popular ? "elevated" : "bordered"}
                className={plan.popular ? "border-2 border-primary-500" : ""}
              >
                {plan.popular && (
                  <div className="bg-primary-500 text-white text-sm font-semibold px-4 py-1 rounded-full mb-4 inline-block">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  fullWidth 
                  variant={plan.popular ? "primary" : "secondary"}
                  onClick={() => setShowConsultationModal(true)}
                >
                  Get Started
                </Button>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Take Control of Your Financial Future?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of small business owners who've transformed their 
              financial chaos into clarity with vCFO of One.
            </p>
            <Button 
              size="xl" 
              variant="accent"
              onClick={() => setShowConsultationModal(true)}
            >
              Start Your Free Financial Clarity Session
            </Button>
            <p className="mt-4 text-sm opacity-75">
              No credit card required • 15-minute setup • Cancel anytime
            </p>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <Container>
          <div className="text-center">
            <p className="mb-4">© 2024 vCFO of One. All rights reserved.</p>
            <div className="flex justify-center space-x-8 text-sm">
              <a href="#" className="hover:text-primary-400">Privacy Policy</a>
              <a href="#" className="hover:text-primary-400">Terms of Service</a>
              <a href="#" className="hover:text-primary-400">Contact</a>
            </div>
            <p className="mt-8 text-sm text-gray-400">
              Part of the Utlyze "Of One" suite - empowering solo professionals everywhere.
            </p>
          </div>
        </Container>
      </footer>

      {/* Consultation Modal - Placeholder */}
      {showConsultationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Book Your Free Clarity Session</h3>
            <p className="text-gray-600 mb-6">
              Fill out the form below and we'll contact you within 24 hours to schedule your session.
            </p>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <Input
                label="Your Name"
                placeholder="John Smith"
                required
                fullWidth
              />
              <Input
                label="Email"
                type="email"
                placeholder="john@company.com"
                required
                fullWidth
              />
              <Input
                label="Phone"
                type="tel"
                placeholder="(555) 123-4567"
                required
                fullWidth
              />
              <Input
                label="Business Name"
                placeholder="Acme Corp"
                fullWidth
              />
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  fullWidth
                  onClick={() => setShowConsultationModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  fullWidth
                >
                  Book Session
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </main>
  );
}
