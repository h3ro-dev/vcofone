'use client';

import React, { useRef } from 'react';
import { useAnalytics } from '@/lib/analytics';

interface TrackedFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  formName: string;
  onSubmitSuccess?: () => void;
  onSubmitError?: (error: Error) => void;
  children: React.ReactNode;
}

export function TrackedForm({
  formName,
  onSubmitSuccess,
  onSubmitError,
  onSubmit,
  onFocus,
  children,
  ...props
}: TrackedFormProps) {
  const { track, trackFormSubmit, trackConversion } = useAnalytics();
  const hasTrackedStart = useRef(false);

  const handleFocus = (e: React.FocusEvent<HTMLFormElement>) => {
    // Track form start only once
    if (!hasTrackedStart.current) {
      hasTrackedStart.current = true;
      track('form_start', {
        form_name: formName,
        page: window.location.pathname,
      });
    }
    
    onFocus?.(e);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      // Call original onSubmit if provided
      if (onSubmit) {
        await onSubmit(e);
      }
      
      // Track successful submission
      trackFormSubmit(formName, true);
      trackConversion('lead');
      
      onSubmitSuccess?.();
    } catch (error) {
      // Track failed submission
      trackFormSubmit(formName, false);
      track('form_error', {
        form_name: formName,
        error_message: error instanceof Error ? error.message : 'Unknown error',
      });
      
      onSubmitError?.(error as Error);
    }
  };

  return (
    <form 
      onFocus={handleFocus}
      onSubmit={handleSubmit}
      {...props}
    >
      {children}
    </form>
  );
}