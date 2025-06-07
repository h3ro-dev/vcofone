import React from 'react';
import { Testimonial } from '@/data/testimonials';

interface TestimonialCardProps {
  testimonial: Testimonial;
  variant?: 'default' | 'featured';
}

const StarIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg
    className={`w-5 h-5 ${filled ? 'text-primary-500 fill-current' : 'text-neutral-300'}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const QuoteIcon = () => (
  <svg
    className="w-8 h-8 text-primary-200"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  testimonial, 
  variant = 'default' 
}) => {
  const isFeatured = variant === 'featured';
  
  return (
    <div
      className={`
        relative h-full p-8 rounded-xl transition-all duration-300
        ${isFeatured 
          ? 'bg-gradient-to-br from-primary-50 to-accent-50 border-2 border-primary-200 shadow-xl hover:shadow-2xl' 
          : 'bg-white border border-neutral-200 shadow-lg hover:shadow-xl'
        }
      `}
    >
      {/* Quote Icon */}
      <div className="absolute top-6 right-6">
        <QuoteIcon />
      </div>
      
      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} filled={i < testimonial.rating} />
        ))}
      </div>
      
      {/* Content */}
      <blockquote className="mb-6">
        <p className="text-neutral-700 leading-relaxed text-lg">
          "{testimonial.content}"
        </p>
      </blockquote>
      
      {/* Results Metrics */}
      {testimonial.results && testimonial.results.length > 0 && (
        <div className="mb-6 space-y-2">
          {testimonial.results.map((result, index) => (
            <div 
              key={index} 
              className="flex justify-between items-center py-2 border-b border-neutral-100 last:border-0"
            >
              <span className="text-sm text-neutral-600">{result.metric}</span>
              <span className="text-sm font-bold text-primary-600">{result.value}</span>
            </div>
          ))}
        </div>
      )}
      
      {/* Author */}
      <div className="mt-auto">
        <div className="flex items-center gap-4">
          {/* Avatar Placeholder */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
            {testimonial.name.split(' ').map(n => n[0]).join('')}
          </div>
          
          <div>
            <h4 className="font-semibold text-neutral-900">{testimonial.name}</h4>
            <p className="text-sm text-neutral-600">
              {testimonial.role} • {testimonial.company}
            </p>
          </div>
        </div>
      </div>
      
      {/* Featured Badge */}
      {isFeatured && (
        <div className="absolute -top-3 left-8 bg-primary-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
          Featured Success Story
        </div>
      )}
    </div>
  );
};