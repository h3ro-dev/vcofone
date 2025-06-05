import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { animationConfig } from '../utils/animations';

interface UseScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
  delay?: number;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    triggerOnce = true,
    rootMargin = '-100px',
    delay = 0,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const isInView = useInView(ref, {
    once: triggerOnce,
    margin: rootMargin,
    amount: threshold,
  });

  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timer = setTimeout(() => {
        setShouldAnimate(true);
        setHasAnimated(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isInView, hasAnimated, delay]);

  return {
    ref,
    isInView: shouldAnimate,
    controls: {
      initial: 'hidden',
      animate: shouldAnimate ? 'visible' : 'hidden',
      exit: 'exit',
    },
  };
};

// Hook for parallax scroll effects
export const useParallaxScroll = (speed = 0.5) => {
  const [offsetY, setOffsetY] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const rate = scrolled * -speed;
      
      // Only apply parallax when element is in viewport
      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        setOffsetY(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, offsetY };
};

// Hook for progressive reveal animations
export const useProgressiveReveal = (itemCount: number, staggerDelay = 0.1) => {
  const [revealedCount, setRevealedCount] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: '-50px',
  });

  useEffect(() => {
    if (isInView && revealedCount < itemCount) {
      const timer = setInterval(() => {
        setRevealedCount((prev) => {
          if (prev >= itemCount) {
            clearInterval(timer);
            return prev;
          }
          return prev + 1;
        });
      }, staggerDelay * 1000);

      return () => clearInterval(timer);
    }
  }, [isInView, itemCount, revealedCount, staggerDelay]);

  const getItemProps = (index: number) => ({
    initial: 'hidden',
    animate: index < revealedCount ? 'visible' : 'hidden',
    custom: index,
  });

  return { containerRef, revealedCount, getItemProps };
};

// Hook for intersection-based animations with percentage visibility
export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;
      
      // Calculate how much of the element is visible
      const visibleHeight = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top);
      const percentageVisible = Math.max(0, Math.min(1, visibleHeight / elementHeight));
      
      setScrollProgress(percentageVisible);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, scrollProgress };
};

// Hook for animating numbers/counters
export const useCountAnimation = (
  end: number,
  duration = animationConfig.duration.slow,
  startWhenInView = true
) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!startWhenInView || (isInView && !hasStarted)) {
      setHasStarted(true);
      let startTime: number;
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };
      
      requestAnimationFrame(animateCount);
    }
  }, [end, duration, isInView, hasStarted, startWhenInView]);

  return { ref, count };
};