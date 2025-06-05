import React from 'react';
import { motion } from 'framer-motion';
import { cardVariants, animationPresets } from '@/utils/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { use3DHover } from '@/hooks/useHoverAnimation';

interface AnimatedFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

/**
 * Example component demonstrating multiple animation techniques:
 * - Scroll-triggered entrance animation
 * - 3D hover effect
 * - Stagger animation when in a group
 * - Smooth transitions
 */
export const AnimatedFeatureCard: React.FC<AnimatedFeatureCardProps> = ({
  icon,
  title,
  description,
  delay = 0,
}) => {
  // Scroll animation hook
  const { ref: scrollRef, controls } = useScrollAnimation({
    threshold: 0.3,
    delay: delay * 100, // Stagger delay based on card index
  });

  // 3D hover effect
  const hover3D = use3DHover();

  return (
    <motion.div
      ref={scrollRef}
      {...controls}
      variants={cardVariants}
      whileHover="hover"
      className="relative"
    >
      <div
        {...hover3D}
        className="bg-white rounded-xl shadow-lg p-6 h-full border border-gray-100 overflow-hidden"
      >
        {/* Animated background gradient on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-50 to-accent-50 opacity-0"
          whileHover={{ opacity: 0.1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Icon with pulse animation */}
        <motion.div
          className="w-12 h-12 mb-4 text-primary-600"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          {icon}
        </motion.div>

        {/* Title with text reveal animation */}
        <motion.h3
          className="text-xl font-semibold text-gray-900 mb-2"
          {...animationPresets.fadeInUp}
        >
          {title}
        </motion.h3>

        {/* Description with delayed fade in */}
        <motion.p
          className="text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {description}
        </motion.p>

        {/* Animated "Learn more" link */}
        <motion.a
          href="#"
          className="inline-flex items-center mt-4 text-primary-600 font-medium group"
          whileHover={{ x: 5 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          Learn more
          <motion.svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            initial={{ x: 0 }}
            whileHover={{ x: 3 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </motion.svg>
        </motion.a>
      </div>
    </motion.div>
  );
};

/**
 * Example usage in a feature grid:
 * 
 * ```tsx
 * import { motion } from 'framer-motion';
 * import { staggerContainerVariants } from '@/utils/animations';
 * import { AnimatedFeatureCard } from '@/components/examples/AnimatedFeatureCard';
 * 
 * function FeatureGrid() {
 *   const features = [
 *     { icon: <Icon1 />, title: "Real-time Insights", description: "..." },
 *     { icon: <Icon2 />, title: "Cash Flow Forecasting", description: "..." },
 *     { icon: <Icon3 />, title: "KPI Tracking", description: "..." },
 *   ];
 * 
 *   return (
 *     <motion.div
 *       className="grid grid-cols-1 md:grid-cols-3 gap-6"
 *       variants={staggerContainerVariants}
 *       initial="hidden"
 *       whileInView="visible"
 *       viewport={{ once: true }}
 *     >
 *       {features.map((feature, index) => (
 *         <AnimatedFeatureCard
 *           key={index}
 *           {...feature}
 *           delay={index}
 *         />
 *       ))}
 *     </motion.div>
 *   );
 * }
 * ```
 */