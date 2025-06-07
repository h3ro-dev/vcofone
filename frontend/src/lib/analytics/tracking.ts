import posthog from 'posthog-js';

// Type definitions for analytics events
export type AnalyticsEvent = 
  | 'cta_click'
  | 'form_start'
  | 'form_submit'
  | 'form_error'
  | 'signup_complete'
  | 'scroll_depth'
  | 'video_play'
  | 'download_resource'
  | 'feature_view'
  | 'pricing_view'
  | 'testimonial_view';

export interface EventProperties {
  [key: string]: any;
  label?: string;
  value?: number;
  category?: string;
}

// Google Analytics event tracking
export function trackGAEvent(eventName: string, parameters?: EventProperties) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
}

// Posthog event tracking
export function trackPosthogEvent(eventName: string, properties?: EventProperties) {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.capture(eventName, properties);
  }
}

// Unified event tracking
export function trackEvent(eventName: AnalyticsEvent | string, properties?: EventProperties) {
  // Track in both GA and Posthog
  trackGAEvent(eventName, properties);
  trackPosthogEvent(eventName, properties);
}

// Conversion tracking
export function trackConversion(conversionType: 'lead' | 'signup' | 'demo_request', value?: number) {
  const eventName = `conversion_${conversionType}`;
  const properties: EventProperties = {
    conversion_type: conversionType,
    value: value || 0,
    currency: 'USD',
  };

  trackEvent(eventName, properties);

  // Special handling for Google Ads conversion tracking
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID,
      value: value || 0,
      currency: 'USD',
    });
  }
}

// User identification
export function identifyUser(userId: string, traits?: Record<string, any>) {
  // Posthog identification
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.identify(userId, traits);
  }

  // Google Analytics user ID
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
      user_id: userId,
    });
  }
}

// Track page timing
export function trackPageTiming() {
  if (typeof window !== 'undefined' && window.performance) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

    trackEvent('page_timing', {
      page_load_time: pageLoadTime,
      dom_interactive_time: perfData.domInteractive - perfData.navigationStart,
      dns_lookup_time: perfData.domainLookupEnd - perfData.domainLookupStart,
    });
  }
}

// Track scroll depth
export function trackScrollDepth(depth: number) {
  trackEvent('scroll_depth', {
    depth_percentage: depth,
    page: window.location.pathname,
  });
}

// Add gtag to window type
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}