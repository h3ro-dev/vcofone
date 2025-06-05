'use client';

import React, { useEffect } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { usePathname, useSearchParams } from 'next/navigation';

// Initialize Posthog
if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    capture_pageview: false, // We'll handle this manually
    capture_pageleave: true,
  });
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views
  useEffect(() => {
    if (pathname) {
      // Posthog page view
      if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
        posthog.capture('$pageview', {
          $current_url: window.location.href,
          $pathname: pathname,
        });
      }

      // Google Analytics page view (handled by GoogleAnalytics component)
    }
  }, [pathname, searchParams]);

  return (
    <>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      )}
      {process.env.NEXT_PUBLIC_POSTHOG_KEY ? (
        <PostHogProvider client={posthog}>
          {children}
        </PostHogProvider>
      ) : (
        children
      )}
    </>
  );
}