'use client';

import { useCallback, useEffect, useRef } from 'react';
import { usePostHog } from 'posthog-js/react';
import { trackEvent, trackConversion, trackScrollDepth, EventProperties, AnalyticsEvent } from './tracking';

// Hook for tracking events
export function useAnalytics() {
  const posthog = usePostHog();

  const track = useCallback((eventName: AnalyticsEvent | string, properties?: EventProperties) => {
    trackEvent(eventName, properties);
  }, []);

  const trackCTAClick = useCallback((ctaName: string, location: string) => {
    track('cta_click', {
      cta_name: ctaName,
      location,
      page: window.location.pathname,
    });
  }, [track]);

  const trackFormSubmit = useCallback((formName: string, success: boolean) => {
    track(success ? 'form_submit' : 'form_error', {
      form_name: formName,
      success,
      page: window.location.pathname,
    });
  }, [track]);

  const trackSignup = useCallback((method: string) => {
    trackConversion('signup');
    track('signup_complete', {
      method,
      page: window.location.pathname,
    });
  }, [track]);

  return {
    track,
    trackCTAClick,
    trackFormSubmit,
    trackSignup,
    trackConversion,
    posthog,
  };
}

// Hook for tracking scroll depth
export function useScrollTracking(thresholds: number[] = [25, 50, 75, 100]) {
  const trackedDepths = useRef(new Set<number>());

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      const scrollPercentage = ((scrollTop + windowHeight) / documentHeight) * 100;

      thresholds.forEach((threshold) => {
        if (scrollPercentage >= threshold && !trackedDepths.current.has(threshold)) {
          trackedDepths.current.add(threshold);
          trackScrollDepth(threshold);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [thresholds]);
}

// Hook for tracking element visibility
export function useVisibilityTracking(
  elementRef: React.RefObject<HTMLElement>,
  eventName: string,
  properties?: EventProperties,
  threshold: number = 0.5
) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTracked.current) {
            hasTracked.current = true;
            trackEvent(eventName, {
              ...properties,
              element_visible: true,
              visibility_ratio: entry.intersectionRatio,
            });
          }
        });
      },
      { threshold }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, eventName, properties, threshold]);
}

// Hook for A/B testing
export function useABTest(testName: string, variants: string[]): string {
  const posthog = usePostHog();
  
  // Get variant from Posthog feature flags
  const variant = posthog?.getFeatureFlag(testName) as string || variants[0];

  useEffect(() => {
    if (variant) {
      trackEvent('ab_test_view', {
        test_name: testName,
        variant,
      });
    }
  }, [testName, variant]);

  return variant;
}