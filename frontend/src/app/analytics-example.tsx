'use client';

import React, { useRef } from 'react';
import { useAnalytics, useScrollTracking, useVisibilityTracking } from '@/lib/analytics';
import { TrackedButton } from '@/components/analytics/TrackedButton';
import { TrackedForm } from '@/components/analytics/TrackedForm';

// Example Landing Page with Analytics
export default function LandingPageExample() {
  const { track } = useAnalytics();
  const pricingSectionRef = useRef<HTMLElement>(null);
  const testimonialSectionRef = useRef<HTMLElement>(null);

  // Track scroll depth
  useScrollTracking([25, 50, 75, 100]);

  // Track when pricing section becomes visible
  useVisibilityTracking(pricingSectionRef, 'pricing_view', {
    section: 'pricing',
  });

  // Track when testimonials become visible
  useVisibilityTracking(testimonialSectionRef, 'testimonial_view', {
    section: 'testimonials',
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Your form submission logic here
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted with email:', email);
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>Get Crystal-Clear Financial Visibility Without a Full-Time CFO</h1>
        <p>AI-driven virtual CFO providing financial insight and oversight on demand</p>
        
        {/* Primary CTA with tracking */}
        <TrackedButton
          ctaName="Get Free Financial Clarity Session"
          location="hero"
          className="cta-primary"
        >
          Get Your Free Financial Clarity Session
        </TrackedButton>

        {/* Secondary CTA */}
        <TrackedButton
          eventName="download_resource"
          eventProperties={{ resource: 'financial-clarity-guide' }}
          className="cta-secondary"
        >
          Download Free Guide
        </TrackedButton>
      </section>

      {/* Lead Capture Form */}
      <section className="lead-capture">
        <h2>Start Your Financial Transformation</h2>
        
        <TrackedForm
          formName="financial-clarity-session"
          onSubmit={handleFormSubmit}
          onSubmitSuccess={() => {
            console.log('Success! Redirecting to thank you page...');
            // Redirect or show success message
          }}
          onSubmitError={(error) => {
            console.error('Form submission error:', error);
            // Show error message
          }}
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
          <input
            type="text"
            name="company"
            placeholder="Company name"
          />
          <button type="submit">Get Started</button>
        </TrackedForm>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Key Features</h2>
        <div className="feature-grid">
          <div 
            className="feature"
            onClick={() => track('feature_view', { feature: 'real-time-insights' })}
          >
            <h3>Real-time Financial Insights</h3>
            <p>Get instant visibility into your financial health</p>
          </div>
          <div 
            className="feature"
            onClick={() => track('feature_view', { feature: 'cash-flow-forecast' })}
          >
            <h3>Cash Flow Forecasting</h3>
            <p>Predict and manage your cash flow with AI</p>
          </div>
          <div 
            className="feature"
            onClick={() => track('feature_view', { feature: 'kpi-tracking' })}
          >
            <h3>Custom KPI Tracking</h3>
            <p>Track the metrics that matter to your business</p>
          </div>
        </div>
      </section>

      {/* Pricing Section (tracked for visibility) */}
      <section ref={pricingSectionRef} className="pricing">
        <h2>Simple, Transparent Pricing</h2>
        <div className="pricing-cards">
          <div className="pricing-card">
            <h3>Starter</h3>
            <p className="price">$299/month</p>
            <TrackedButton
              ctaName="Select Starter Plan"
              location="pricing"
              eventProperties={{ plan: 'starter', price: 299 }}
            >
              Get Started
            </TrackedButton>
          </div>
          <div className="pricing-card featured">
            <h3>Professional</h3>
            <p className="price">$599/month</p>
            <TrackedButton
              ctaName="Select Professional Plan"
              location="pricing"
              eventProperties={{ plan: 'professional', price: 599 }}
            >
              Get Started
            </TrackedButton>
          </div>
          <div className="pricing-card">
            <h3>Enterprise</h3>
            <p className="price">Custom</p>
            <TrackedButton
              ctaName="Contact Sales"
              location="pricing"
              eventProperties={{ plan: 'enterprise' }}
            >
              Contact Sales
            </TrackedButton>
          </div>
        </div>
      </section>

      {/* Testimonials Section (tracked for visibility) */}
      <section ref={testimonialSectionRef} className="testimonials">
        <h2>What Our Clients Say</h2>
        {/* Testimonial content */}
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <h2>Ready to Transform Your Financial Management?</h2>
        <TrackedButton
          ctaName="Get Free Financial Clarity Session"
          location="footer"
          className="cta-primary"
        >
          Get Your Free Financial Clarity Session
        </TrackedButton>
      </section>
    </div>
  );
}