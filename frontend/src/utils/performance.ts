/**
 * Performance optimization utilities for vCFO application
 * Includes hooks and helpers for optimizing React components
 */

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Debounce hook - delays executing a function until after wait milliseconds
 * @param callback - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const callbackRef = useRef(callback);

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  ) as T;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

/**
 * Throttle hook - ensures a function is called at most once per interval
 * @param callback - Function to throttle
 * @param delay - Minimum delay between calls in milliseconds
 * @returns Throttled function
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRunRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const timeSinceLastRun = now - lastRunRef.current;

      if (timeSinceLastRun >= delay) {
        callbackRef.current(...args);
        lastRunRef.current = now;
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          callbackRef.current(...args);
          lastRunRef.current = Date.now();
        }, delay - timeSinceLastRun);
      }
    },
    [delay]
  ) as T;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return throttledCallback;
}

/**
 * Intersection Observer hook for lazy loading and infinite scroll
 * @param options - Intersection Observer options
 * @returns [ref, isIntersecting]
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
): [React.RefObject<T>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<T>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return [targetRef, isIntersecting];
}

/**
 * Performance monitoring hook - measures component render time
 * @param componentName - Name of the component for logging
 */
export function usePerformanceMonitor(componentName: string) {
  const renderStartRef = useRef<number>();
  const renderCountRef = useRef(0);

  useEffect(() => {
    renderStartRef.current = performance.now();
    renderCountRef.current += 1;

    return () => {
      if (renderStartRef.current && process.env.NODE_ENV === 'development') {
        const renderTime = performance.now() - renderStartRef.current;
        if (renderTime > 16.67) { // More than one frame (60fps)
          console.warn(
            `[Performance] ${componentName} took ${renderTime.toFixed(2)}ms to render (render #${renderCountRef.current})`
          );
        }
      }
    };
  });
}

/**
 * Virtual scrolling hook for large lists
 * @param items - Array of items to render
 * @param itemHeight - Height of each item in pixels
 * @param containerHeight - Height of the container in pixels
 * @param overscan - Number of items to render outside the visible area
 * @returns Visible items and container props
 */
export function useVirtualScroll<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number,
  overscan = 3
) {
  const [scrollTop, setScrollTop] = useState(0);
  
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );
  
  const visibleItems = items.slice(startIndex, endIndex + 1);
  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return {
    visibleItems,
    containerProps: {
      onScroll: handleScroll,
      style: {
        height: containerHeight,
        overflow: 'auto',
      },
    },
    viewportProps: {
      style: {
        height: totalHeight,
        position: 'relative' as const,
      },
    },
    itemsProps: {
      style: {
        transform: `translateY(${offsetY}px)`,
      },
    },
  };
}

/**
 * Prefetch data hook - preloads data on hover/focus
 * @param fetchFn - Function that fetches the data
 * @returns [triggerProps, data, loading, error]
 */
export function usePrefetch<T>(
  fetchFn: () => Promise<T>
): [
  { onMouseEnter: () => void; onFocus: () => void },
  T | null,
  boolean,
  Error | null
] {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const fetchedRef = useRef(false);

  const prefetch = useCallback(async () => {
    if (fetchedRef.current || loading) return;

    setLoading(true);
    fetchedRef.current = true;

    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to prefetch'));
    } finally {
      setLoading(false);
    }
  }, [fetchFn, loading]);

  const triggerProps = {
    onMouseEnter: prefetch,
    onFocus: prefetch,
  };

  return [triggerProps, data, loading, error];
}

/**
 * Memory leak prevention hook - cancels async operations on unmount
 */
export function useAbortController() {
  const abortControllerRef = useRef<AbortController>();

  useEffect(() => {
    abortControllerRef.current = new AbortController();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return abortControllerRef.current?.signal;
}

/**
 * Web Vitals monitoring
 */
export function reportWebVitals(metric: any) {
  if (metric.label === 'web-vital') {
    console.log(metric);
    // Send to analytics service
    // analytics.track('Web Vital', metric);
  }
}

/**
 * Measure and log API call performance
 */
export async function measureApiCall<T>(
  name: string,
  apiCall: () => Promise<T>
): Promise<T> {
  const start = performance.now();
  
  try {
    const result = await apiCall();
    const duration = performance.now() - start;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Performance] ${name}: ${duration.toFixed(2)}ms`);
    }
    
    // Log slow API calls
    if (duration > 1000) {
      console.warn(`[API Performance] Slow API call detected: ${name} took ${duration.toFixed(2)}ms`);
    }
    
    return result;
  } catch (error) {
    const duration = performance.now() - start;
    console.error(`[API Performance] ${name} failed after ${duration.toFixed(2)}ms`, error);
    throw error;
  }
}