import { Variants, TargetAndTransition, Transition } from 'framer-motion';

// Animation Configuration
export const animationConfig = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    verySlow: 0.8,
  },
  easing: {
    easeOut: [0.16, 1, 0.3, 1],
    easeIn: [0.4, 0, 1, 1],
    easeInOut: [0.4, 0, 0.2, 1],
    spring: { type: 'spring', stiffness: 300, damping: 30 },
    smooth: { type: 'spring', stiffness: 100, damping: 20 },
  },
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
  },
};

// Base Transition
export const baseTransition: Transition = {
  duration: animationConfig.duration.normal,
  ease: animationConfig.easing.easeOut,
};

// Fade Variants
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: baseTransition,
  },
  exit: { opacity: 0, transition: { ...baseTransition, duration: animationConfig.duration.fast } },
};

// Slide Variants
export const slideVariants = {
  up: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: baseTransition,
    },
    exit: { opacity: 0, y: -20, transition: { ...baseTransition, duration: animationConfig.duration.fast } },
  } as Variants,
  down: {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: baseTransition,
    },
    exit: { opacity: 0, y: 20, transition: { ...baseTransition, duration: animationConfig.duration.fast } },
  } as Variants,
  left: {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: baseTransition,
    },
    exit: { opacity: 0, x: -20, transition: { ...baseTransition, duration: animationConfig.duration.fast } },
  } as Variants,
  right: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: baseTransition,
    },
    exit: { opacity: 0, x: 20, transition: { ...baseTransition, duration: animationConfig.duration.fast } },
  } as Variants,
};

// Scale Variants
export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: baseTransition,
  },
  exit: { opacity: 0, scale: 0.95, transition: { ...baseTransition, duration: animationConfig.duration.fast } },
};

// Stagger Container Variants
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: animationConfig.stagger.normal,
      delayChildren: 0.1,
    },
  },
};

// Hero Entrance Variants
export const heroVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: animationConfig.duration.slow,
      ease: animationConfig.easing.easeOut,
    },
  },
};

// Feature Card Variants
export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: animationConfig.duration.normal,
      ease: animationConfig.easing.easeOut,
    },
  },
  hover: {
    y: -5,
    scale: 1.02,
    transition: {
      duration: animationConfig.duration.fast,
      ease: animationConfig.easing.easeOut,
    },
  },
};

// Button Variants
export const buttonVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: animationConfig.duration.fast,
      ease: animationConfig.easing.easeOut,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: animationConfig.duration.fast,
      ease: animationConfig.easing.easeIn,
    },
  },
};

// CTA Pulse Animation
export const pulseAnimation: TargetAndTransition = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

// Testimonial Slide Variants
export const testimonialVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    transition: {
      duration: animationConfig.duration.normal,
      ease: animationConfig.easing.easeOut,
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    transition: {
      duration: animationConfig.duration.normal,
      ease: animationConfig.easing.easeIn,
    },
  }),
};

// Loading Spinner Variants
export const spinnerVariants: Variants = {
  spin: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// Accessibility Helper
export const getReducedMotionVariants = (variants: Variants): Variants => {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return {
      hidden: variants.hidden,
      visible: { ...variants.visible, transition: { duration: 0 } },
      exit: variants.exit ? { ...variants.exit, transition: { duration: 0 } } : undefined,
    };
  }
  return variants;
};

// Scroll Animation Trigger Settings
export const scrollAnimationSettings = {
  viewport: { once: true, margin: '-100px' },
  initial: 'hidden',
  whileInView: 'visible',
  exit: 'exit',
};

// Utility function to create custom variants
export const createCustomVariant = (
  from: { opacity?: number; x?: number; y?: number; scale?: number },
  to: { opacity?: number; x?: number; y?: number; scale?: number },
  transition?: Transition
): Variants => ({
  hidden: from,
  visible: {
    ...to,
    transition: transition || baseTransition,
  },
});

// Hover Animation Helper
export const hoverAnimation = (scale = 1.05, duration = animationConfig.duration.fast): TargetAndTransition => ({
  scale,
  transition: {
    duration,
    ease: animationConfig.easing.easeOut,
  },
});

// Text Animation Variants
export const textRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    clipPath: 'inset(100% 0% 0% 0%)',
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: {
      duration: animationConfig.duration.slow,
      ease: animationConfig.easing.easeOut,
    },
  },
};

// Success/Error State Variants
export const stateVariants = {
  success: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 30,
      },
    },
  } as Variants,
  error: {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: animationConfig.duration.fast,
        ease: animationConfig.easing.easeOut,
      },
    },
  } as Variants,
};

// Export all variants as a collection
export const animations = {
  fade: fadeVariants,
  slide: slideVariants,
  scale: scaleVariants,
  stagger: staggerContainerVariants,
  hero: heroVariants,
  card: cardVariants,
  button: buttonVariants,
  testimonial: testimonialVariants,
  spinner: spinnerVariants,
  text: textRevealVariants,
  state: stateVariants,
};

// Animation presets for common use cases
export const animationPresets = {
  fadeInUp: {
    initial: 'hidden',
    animate: 'visible',
    exit: 'exit',
    variants: slideVariants.up,
  },
  fadeIn: {
    initial: 'hidden',
    animate: 'visible',
    exit: 'exit',
    variants: fadeVariants,
  },
  scaleIn: {
    initial: 'hidden',
    animate: 'visible',
    exit: 'exit',
    variants: scaleVariants,
  },
  staggerChildren: {
    initial: 'hidden',
    animate: 'visible',
    variants: staggerContainerVariants,
  },
};