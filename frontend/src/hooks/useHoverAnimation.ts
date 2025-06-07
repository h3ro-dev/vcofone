import { useState, useRef, useCallback } from 'react';
import { useSpring, SpringConfig } from 'framer-motion';

interface UseHoverAnimationOptions {
  scale?: number;
  rotate?: number;
  x?: number;
  y?: number;
  springConfig?: SpringConfig;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

export const useHoverAnimation = (options: UseHoverAnimationOptions = {}) => {
  const {
    scale = 1.05,
    rotate = 0,
    x = 0,
    y = 0,
    springConfig = { stiffness: 300, damping: 30 },
    onHoverStart,
    onHoverEnd,
  } = options;

  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const scaleSpring = useSpring(1, springConfig);
  const rotateSpring = useSpring(0, springConfig);
  const xSpring = useSpring(0, springConfig);
  const ySpring = useSpring(0, springConfig);

  const handleHoverStart = useCallback(() => {
    setIsHovered(true);
    scaleSpring.set(scale);
    rotateSpring.set(rotate);
    xSpring.set(x);
    ySpring.set(y);
    onHoverStart?.();
  }, [scale, rotate, x, y, scaleSpring, rotateSpring, xSpring, ySpring, onHoverStart]);

  const handleHoverEnd = useCallback(() => {
    setIsHovered(false);
    scaleSpring.set(1);
    rotateSpring.set(0);
    xSpring.set(0);
    ySpring.set(0);
    onHoverEnd?.();
  }, [scaleSpring, rotateSpring, xSpring, ySpring, onHoverEnd]);

  const hoverProps = {
    onMouseEnter: handleHoverStart,
    onMouseLeave: handleHoverEnd,
    style: {
      scale: scaleSpring,
      rotate: rotateSpring,
      x: xSpring,
      y: ySpring,
    },
  };

  return {
    ref,
    isHovered,
    hoverProps,
  };
};

// 3D hover effect hook
export const use3DHover = () => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Invert for natural feel
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotateX(rotateX);
    setRotateY(rotateY);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
  }, []);

  const style = {
    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    transformStyle: 'preserve-3d' as const,
    transition: 'transform 0.1s ease-out',
  };

  return {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style,
  };
};

// Magnetic hover effect
export const useMagneticHover = (strength = 0.3) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    setPosition({
      x: distanceX * strength,
      y: distanceY * strength,
    });
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  const style = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: 'transform 0.2s ease-out',
  };

  return {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style,
  };
};

// Glow effect on hover
export const useGlowHover = (glowColor = 'rgba(65, 105, 225, 0.5)') => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const glowStyle = isHovered
    ? {
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor} 0%, transparent 50%)`,
        opacity: 0.8,
      }
    : {};

  return {
    ref,
    glowProps: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
    glowStyle,
    isHovered,
  };
};