'use client';

import React from 'react';
import { 
  TestimonialsSection, 
  TestimonialsCarousel, 
  TestimonialsWidget,
  TestimonialCard 
} from './index';
import { getFeaturedTestimonials } from '@/data/testimonials';

/**
 * Demo page showing all testimonials components
 * This file demonstrates the various ways to display testimonials
 */
export default function TestimonialsDemo() {
  const featuredTestimonials = getFeaturedTestimonials();
  
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-200">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-neutral-900">
            Testimonials Components Demo
          </h1>
          <p className="text-neutral-600 mt-2">
            Showcasing all available testimonial display options for vCFO of One
          </p>
        </div>
      </header>

      {/* Component Demos */}
      <main className="space-y-20 pb-20">
        {/* 1. Full Testimonials Section */}
        <section>
          <div className="container mx-auto px-4 pt-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              1. Full Testimonials Section
            </h2>
            <p className="text-neutral-600 mb-8">
              Best for: Landing pages, dedicated testimonials page
            </p>
          </div>
          <TestimonialsSection showAll={false} maxItems={6} />
        </section>

        {/* 2. Testimonials Carousel */}
        <section>
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              2. Testimonials Carousel
            </h2>
            <p className="text-neutral-600 mb-8">
              Best for: Homepage sections, about pages
            </p>
          </div>
          <TestimonialsCarousel autoPlay={true} autoPlayInterval={6000} />
        </section>

        {/* 3. Testimonials Widget */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              3. Testimonials Widget
            </h2>
            <p className="text-neutral-600 mb-8">
              Best for: Sidebars, footers, compact sections
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
              <TestimonialsWidget maxItems={3} title="Client Success" />
              <TestimonialsWidget maxItems={2} title="Recent Reviews" />
              <TestimonialsWidget maxItems={4} title="What They Say" />
            </div>
          </div>
        </section>

        {/* 4. Individual Cards */}
        <section>
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              4. Individual Testimonial Cards
            </h2>
            <p className="text-neutral-600 mb-8">
              Best for: Custom layouts, featured testimonials
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {featuredTestimonials.slice(0, 2).map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  variant="featured"
                />
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-8">
              {featuredTestimonials.slice(2).map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  variant="default"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="bg-primary-50 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-neutral-900 mb-8">
              Usage Guidelines
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">When to use each component:</h3>
                <ul className="space-y-2 text-neutral-600">
                  <li>• <strong>TestimonialsSection:</strong> Full-width sections on landing pages</li>
                  <li>• <strong>TestimonialsCarousel:</strong> When space is limited or for visual interest</li>
                  <li>• <strong>TestimonialsWidget:</strong> Sidebars, footers, or compact areas</li>
                  <li>• <strong>TestimonialCard:</strong> Custom layouts or highlighting specific testimonials</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">Key Features:</h3>
                <ul className="space-y-2 text-neutral-600">
                  <li>✓ Fully responsive design</li>
                  <li>✓ Accessible with ARIA labels</li>
                  <li>✓ TypeScript support</li>
                  <li>✓ Customizable through props</li>
                  <li>✓ Consistent with vCFO of One branding</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}