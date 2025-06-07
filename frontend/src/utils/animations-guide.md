# vCFO of One - Animation System Guide

## Overview

The vCFO of One animation system is built with Framer Motion and provides a comprehensive set of animations, hooks, and utilities for creating smooth, professional animations throughout the application.

## Installation

```bash
npm install framer-motion
```

## Core Animation System

### 1. Animation Variants

Located in `frontend/src/utils/animations.ts`

#### Available Variants:

- **Fade**: Simple opacity animations
- **Slide**: Directional slide animations (up, down, left, right)
- **Scale**: Scale with fade animations
- **Hero**: Special entrance for hero sections
- **Card**: Optimized for feature cards with hover states
- **Button**: Click and hover animations
- **Testimonial**: Carousel slide animations
- **Text Reveal**: Animated text appearances
- **State**: Success/error state transitions

### 2. Animation Presets

Quick-start animation configurations:

```tsx
import { animationPresets } from '@/utils/animations';

// Usage
<motion.div {...animationPresets.fadeInUp}>
  Content
</motion.div>
```

## Custom Hooks

### useScrollAnimation

Triggers animations when elements enter the viewport:

```tsx
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { slideVariants } from '@/utils/animations';

function Component() {
  const { ref, controls } = useScrollAnimation({
    threshold: 0.3,
    delay: 200
  });

  return (
    <motion.div
      ref={ref}
      {...controls}
      variants={slideVariants.up}
    >
      Animated content
    </motion.div>
  );
}
```

### useHoverAnimation

Advanced hover effects with spring physics:

```tsx
import { useHoverAnimation } from '@/hooks/useHoverAnimation';

function Button() {
  const { ref, hoverProps } = useHoverAnimation({
    scale: 1.05,
    rotate: 2
  });

  return (
    <motion.button ref={ref} {...hoverProps}>
      Hover me
    </motion.button>
  );
}
```

### use3DHover

Creates perspective-based 3D hover effects:

```tsx
import { use3DHover } from '@/hooks/useHoverAnimation';

function Card() {
  const hover3D = use3DHover();

  return (
    <div {...hover3D}>
      3D Card Content
    </div>
  );
}
```

### useCountAnimation

Animates numbers from 0 to target value:

```tsx
import { useCountAnimation } from '@/hooks/useScrollAnimation';

function Stats() {
  const { ref, count } = useCountAnimation(1000, 2, true);

  return (
    <div ref={ref}>
      <span>{count}</span> Happy Customers
    </div>
  );
}
```

## Implementation Examples

### Hero Section

```tsx
import { motion } from 'framer-motion';
import { heroVariants, animationPresets } from '@/utils/animations';

function HeroSection() {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={heroVariants}
    >
      <h1>Get Crystal-Clear Financial Visibility</h1>
      <motion.p {...animationPresets.fadeInUp}>
        Without a Full-Time CFO
      </motion.p>
    </motion.section>
  );
}
```

### Feature Cards with Stagger

```tsx
import { motion } from 'framer-motion';
import { staggerContainerVariants, cardVariants } from '@/utils/animations';

function Features() {
  const features = [...]; // Your features array

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          whileHover="hover"
        >
          {feature.content}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

### CTA Button with Pulse

```tsx
import { motion } from 'framer-motion';
import { buttonVariants, pulseAnimation } from '@/utils/animations';

function CTAButton() {
  return (
    <motion.button
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      animate={pulseAnimation}
    >
      Get Your Free Financial Clarity Session
    </motion.button>
  );
}
```

### Page Transitions

```tsx
import { motion, AnimatePresence } from 'framer-motion';
import { fadeVariants } from '@/utils/animations';

function PageTransition({ children }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={fadeVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

## Best Practices

1. **Performance**: Use `will-change` CSS property sparingly
2. **Accessibility**: Always respect `prefers-reduced-motion`
3. **Consistency**: Use predefined durations and easings
4. **Subtlety**: Keep animations professional and non-distracting
5. **Testing**: Test on various devices and connection speeds

## Animation Timing Guide

- **Fast**: 200ms - Micro-interactions, hovers
- **Normal**: 300ms - Most UI transitions
- **Slow**: 500ms - Page transitions, hero entrances
- **Very Slow**: 800ms - Special emphasis animations

## Accessibility

The animation system automatically detects and respects the user's motion preferences:

```tsx
import { getReducedMotionVariants } from '@/utils/animations';

const safeVariants = getReducedMotionVariants(slideVariants.up);
```

## Debugging

Enable Framer Motion's visual debugging:

```tsx
import { motion } from 'framer-motion';

// In development only
if (process.env.NODE_ENV === 'development') {
  motion.visualElement.animationState.visualElement.projection.isEnabled = true;
}
```

## Common Patterns

### Loading States

```tsx
import { spinnerVariants } from '@/utils/animations';

<motion.div variants={spinnerVariants} animate="spin">
  <LoadingIcon />
</motion.div>
```

### Form Validation Feedback

```tsx
import { stateVariants } from '@/utils/animations';

<motion.div
  variants={stateVariants.error}
  initial="hidden"
  animate={hasError ? "visible" : "hidden"}
>
  Error message
</motion.div>
```

### Scroll Progress Indicator

```tsx
import { useScrollProgress } from '@/hooks/useScrollAnimation';

function ProgressBar() {
  const { ref, scrollProgress } = useScrollProgress();

  return (
    <div ref={ref}>
      <div style={{ width: `${scrollProgress * 100}%` }} />
    </div>
  );
}
```

## Performance Tips

1. Use `transform` and `opacity` for best performance
2. Avoid animating `width`, `height`, or other layout properties
3. Use `useMemo` for complex variant calculations
4. Batch animations with `staggerChildren`
5. Use CSS transitions for simple hover states

## Integration with Design System

The animation system is fully integrated with the vCFO of One design system colors and spacing for consistent visual language throughout the application.