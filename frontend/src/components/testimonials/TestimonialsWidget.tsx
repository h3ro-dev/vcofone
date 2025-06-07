'use client';

import React from 'react';
import { testimonials } from '@/data/testimonials';

interface TestimonialsWidgetProps {
  maxItems?: number;
  title?: string;
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-primary-500 fill-current' : 'text-neutral-300'}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

export const TestimonialsWidget: React.FC<TestimonialsWidgetProps> = ({ 
  maxItems = 3,
  title = "What Clients Say"
}) => {
  const displayTestimonials = testimonials.slice(0, maxItems);
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-neutral-100">
      <h3 className="text-xl font-bold text-neutral-900 mb-6">{title}</h3>
      
      <div className="space-y-4">
        {displayTestimonials.map((testimonial) => (
          <div 
            key={testimonial.id} 
            className="pb-4 border-b border-neutral-100 last:border-0 last:pb-0"
          >
            <StarRating rating={testimonial.rating} />
            
            <p className="text-sm text-neutral-600 mt-2 line-clamp-3">
              "{testimonial.content}"
            </p>
            
            <div className="mt-3 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-bold">
                {testimonial.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-900">{testimonial.name}</p>
                <p className="text-xs text-neutral-500">{testimonial.company}</p>
              </div>
            </div>
            
            {/* Quick Stats */}
            {testimonial.results && testimonial.results.length > 0 && (
              <div className="mt-3 flex gap-4">
                {testimonial.results.slice(0, 2).map((result, index) => (
                  <div key={index} className="text-xs">
                    <span className="font-bold text-primary-600">{result.value}</span>
                    <span className="text-neutral-500 ml-1">{result.metric}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <button className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
          View All Success Stories →
        </button>
      </div>
    </div>
  );
};