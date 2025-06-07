'use client';

import React from 'react';
import { useAnalytics } from '@/lib/analytics';

interface TrackedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  eventName?: string;
  eventProperties?: Record<string, any>;
  ctaName?: string;
  location?: string;
  children: React.ReactNode;
}

export function TrackedButton({
  eventName,
  eventProperties,
  ctaName,
  location = 'unknown',
  onClick,
  children,
  ...props
}: TrackedButtonProps) {
  const { track, trackCTAClick } = useAnalytics();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Track the click
    if (ctaName) {
      trackCTAClick(ctaName, location);
    } else if (eventName) {
      track(eventName, eventProperties);
    }

    // Call original onClick if provided
    onClick?.(e);
  };

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
}