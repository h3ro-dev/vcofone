'use client';

import React, { useState } from 'react';
import { TestimonialCard } from './TestimonialCard';
import { testimonials, getFeaturedTestimonials } from '@/data/testimonials';

interface TestimonialsSectionProps {
  showAll?: boolean;
  maxItems?: number;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ 
  showAll = false,
  maxItems = 6 
}) => {
  const [showAllTestimonials, setShowAllTestimonials] = useState(showAll);
  const featuredTestimonials = getFeaturedTestimonials();
  const displayTestimonials = showAllTestimonials 
    ? testimonials 
    : testimonials.slice(0, maxItems);

  return (
    <section className="py-24 bg-gradient-to-b from-neutral-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Real Results from Real Business Owners
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Join hundreds of small business owners who've transformed their financial clarity 
            and profitability with vCFO of One
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 p-8 bg-primary-50 rounded-2xl">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">500+</div>
            <div className="text-sm text-neutral-600 mt-1">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">12 hrs</div>
            <div className="text-sm text-neutral-600 mt-1">Avg. Time Saved/Week</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">47%</div>
            <div className="text-sm text-neutral-600 mt-1">Avg. Profit Increase</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">4.9/5</div>
            <div className="text-sm text-neutral-600 mt-1">Client Satisfaction</div>
          </div>
        </div>

        {/* Featured Testimonials */}
        {featuredTestimonials.length > 0 && !showAllTestimonials && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-neutral-800 mb-8 text-center">
              Featured Success Stories
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTestimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  variant="featured"
                />
              ))}
            </div>
          </div>
        )}

        {/* All Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTestimonials
            .filter(t => showAllTestimonials || !t.featured)
            .map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                variant="default"
              />
            ))}
        </div>

        {/* Show More Button */}
        {!showAllTestimonials && testimonials.length > maxItems && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAllTestimonials(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors"
            >
              Show More Success Stories
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Transform Your Business Finances?
          </h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join these successful business owners and get the financial clarity you need to grow with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-neutral-50 transition-colors">
              Get Your Free Financial Clarity Session
            </button>
            <button className="px-8 py-4 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition-colors">
              See Pricing Plans
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};