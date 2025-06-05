/**
 * Design System Usage Examples
 * 
 * This file demonstrates how to use the design system in your components.
 * You can use either Tailwind CSS classes or import tokens directly.
 */

import React from 'react';
import { colors, spacing, typography, components, boxShadow } from './design-system';

// Example 1: Using Tailwind CSS classes with our custom design tokens
export const TailwindExample = () => {
  return (
    <div className="p-6 bg-neutral-50 rounded-lg">
      {/* Using our custom color palette */}
      <h1 className="text-3xl font-semibold text-primary-700 mb-4">
        Welcome to VCofOne
      </h1>
      
      {/* Primary button using Utlyze blue */}
      <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2.5 rounded-md font-medium transition-colors">
        Get Started
      </button>
      
      {/* Accent button using the green */}
      <button className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2.5 rounded-md font-medium ml-3 transition-colors">
        Learn More
      </button>
      
      {/* Card with elevation shadow */}
      <div className="mt-6 p-6 bg-white rounded-lg shadow-elevation-2">
        <h2 className="text-xl font-medium text-neutral-900">Financial Overview</h2>
        <p className="text-neutral-600 mt-2">
          Your personalized financial dashboard powered by AI.
        </p>
      </div>
      
      {/* Success message */}
      <div className="mt-4 p-4 bg-success-50 border border-success-200 rounded-md">
        <p className="text-success-800">Successfully saved your settings!</p>
      </div>
    </div>
  );
};

// Example 2: Using direct imports for custom styling
export const DirectImportExample = () => {
  const customButtonStyles: React.CSSProperties = {
    backgroundColor: colors.primary[500],
    color: 'white',
    padding: components.button.padding.md,
    borderRadius: components.button.borderRadius,
    fontWeight: components.button.fontWeight,
    fontSize: components.button.fontSize.md[0],
    border: 'none',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  };
  
  const cardStyles: React.CSSProperties = {
    padding: components.card.padding,
    backgroundColor: components.card.background,
    borderRadius: components.card.borderRadius,
    boxShadow: components.card.boxShadow,
    border: components.card.border,
  };
  
  return (
    <div style={{ padding: spacing[8], backgroundColor: colors.neutral[50] }}>
      <h1 style={{
        fontSize: typography.fontSize['3xl'][0],
        lineHeight: typography.fontSize['3xl'][1].lineHeight,
        fontWeight: typography.fontWeight.bold,
        color: colors.primary[700],
        marginBottom: spacing[4],
      }}>
        Direct Import Example
      </h1>
      
      <button style={customButtonStyles}>
        Custom Styled Button
      </button>
      
      <div style={{ ...cardStyles, marginTop: spacing[6] }}>
        <h2 style={{
          fontSize: typography.fontSize.xl[0],
          fontWeight: typography.fontWeight.medium,
          color: colors.neutral[900],
        }}>
          Card Component
        </h2>
        <p style={{
          fontSize: typography.fontSize.base[0],
          color: colors.neutral[600],
          marginTop: spacing[2],
        }}>
          This card uses our design system tokens directly.
        </p>
      </div>
    </div>
  );
};

// Example 3: Combining both approaches
export const CombinedExample = () => {
  return (
    <div className="p-8 bg-gradient-to-br from-primary-50 to-accent-50 min-h-screen">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-primary-900 mb-4">
          Virtual CFO for One
        </h1>
        <p className="text-xl text-neutral-700 mb-8">
          Empowering solo businesses with AI-powered financial insights
        </p>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-elevation-3 hover:shadow-elevation-4 transition-shadow">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-primary-600 text-2xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Financial Analytics
            </h3>
            <p className="text-neutral-600">
              Real-time insights into your business performance
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-elevation-3 hover:shadow-elevation-4 transition-shadow">
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-accent-600 text-2xl">🤖</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              AI-Powered Advice
            </h3>
            <p className="text-neutral-600">
              Get personalized recommendations for growth
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-elevation-3 hover:shadow-elevation-4 transition-shadow">
            <div className="w-12 h-12 bg-info-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-info-600 text-2xl">📈</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Growth Tracking
            </h3>
            <p className="text-neutral-600">
              Monitor your progress and achieve your goals
            </p>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-12 text-center">
          <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
            Start Your Free Trial
          </button>
          <p className="text-neutral-600 mt-4">
            No credit card required • 14-day free trial
          </p>
        </div>
      </div>
      
      {/* Animation Examples */}
      <div className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">
          Animation Examples
        </h2>
        <div className="flex gap-4 flex-wrap">
          <button className="bg-accent-500 text-white px-6 py-3 rounded-md font-medium animate-fade-in">
            Fade In Animation
          </button>
          <button className="bg-info-500 text-white px-6 py-3 rounded-md font-medium animate-slide-in">
            Slide In Animation
          </button>
          <button className="bg-warning-500 text-white px-6 py-3 rounded-md font-medium animate-scale-in">
            Scale In Animation
          </button>
        </div>
      </div>
    </div>
  );
};

// Example 4: Form Components
export const FormExample = () => {
  return (
    <div className="p-8 bg-neutral-50">
      <form className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">
          Contact Us
        </h2>
        
        {/* Input Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            className="w-full px-3.5 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="you@example.com"
          />
        </div>
        
        {/* Select Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Topic
          </label>
          <select className="w-full px-3.5 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors">
            <option>General Inquiry</option>
            <option>Technical Support</option>
            <option>Billing</option>
          </select>
        </div>
        
        {/* Textarea */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Message
          </label>
          <textarea
            className="w-full px-3.5 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            rows={4}
            placeholder="Tell us how we can help..."
          />
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2.5 px-4 rounded-md font-medium transition-colors"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

// Export all examples
export default {
  TailwindExample,
  DirectImportExample,
  CombinedExample,
  FormExample,
};