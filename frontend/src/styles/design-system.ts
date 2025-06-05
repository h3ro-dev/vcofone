/**
 * Design System for VCofOne
 * 
 * This file contains all design tokens and system configuration
 * for the VCofOne application. It's designed to work seamlessly
 * with Tailwind CSS while providing type-safe design tokens.
 */

// Color Palette
export const colors = {
  // Primary Brand Colors
  primary: {
    50: '#E6EDFC',
    100: '#C0D2F7',
    200: '#97B5F2',
    300: '#6D98ED',
    400: '#4D81E8',
    500: '#4169E1', // Utlyze Blue (main)
    600: '#3455C8',
    700: '#2741A6',
    800: '#1C2E85',
    900: '#121D64',
    950: '#0A1142',
  },
  
  // Accent Green
  accent: {
    50: '#E6F9F3',
    100: '#C0F0E0',
    200: '#97E6CB',
    300: '#6DDCB6',
    400: '#4DD4A6',
    500: '#00A878', // Accent Green (main)
    600: '#00966B',
    700: '#007D5A',
    800: '#006448',
    900: '#004B36',
    950: '#003225',
  },
  
  // Neutral/Gray Scale
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    950: '#030712',
  },
  
  // Semantic Colors
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
  },
  
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },
  
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },
  
  info: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },
} as const;

// Typography
export const typography = {
  // Font Families
  fontFamily: {
    sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
    mono: ['Fira Code', 'Consolas', 'Monaco', 'Andale Mono', 'Ubuntu Mono', 'monospace'],
  },
  
  // Font Sizes with line heights
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
    base: ['1rem', { lineHeight: '1.5rem' }],     // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],  // 36px
    '5xl': ['3rem', { lineHeight: '1' }],         // 48px
    '6xl': ['3.75rem', { lineHeight: '1' }],      // 60px
    '7xl': ['4.5rem', { lineHeight: '1' }],       // 72px
    '8xl': ['6rem', { lineHeight: '1' }],         // 96px
    '9xl': ['8rem', { lineHeight: '1' }],         // 128px
  },
  
  // Font Weights
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  
  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  
  // Line Heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
    '3': '.75rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '7': '1.75rem',
    '8': '2rem',
    '9': '2.25rem',
    '10': '2.5rem',
  },
} as const;

// Spacing Scale
export const spacing = {
  px: '1px',
  '0': '0px',
  '0.5': '0.125rem',  // 2px
  '1': '0.25rem',     // 4px
  '1.5': '0.375rem',  // 6px
  '2': '0.5rem',      // 8px
  '2.5': '0.625rem',  // 10px
  '3': '0.75rem',     // 12px
  '3.5': '0.875rem',  // 14px
  '4': '1rem',        // 16px
  '5': '1.25rem',     // 20px
  '6': '1.5rem',      // 24px
  '7': '1.75rem',     // 28px
  '8': '2rem',        // 32px
  '9': '2.25rem',     // 36px
  '10': '2.5rem',     // 40px
  '11': '2.75rem',    // 44px
  '12': '3rem',       // 48px
  '14': '3.5rem',     // 56px
  '16': '4rem',       // 64px
  '20': '5rem',       // 80px
  '24': '6rem',       // 96px
  '28': '7rem',       // 112px
  '32': '8rem',       // 128px
  '36': '9rem',       // 144px
  '40': '10rem',      // 160px
  '44': '11rem',      // 176px
  '48': '12rem',      // 192px
  '52': '13rem',      // 208px
  '56': '14rem',      // 224px
  '60': '15rem',      // 240px
  '64': '16rem',      // 256px
  '72': '18rem',      // 288px
  '80': '20rem',      // 320px
  '96': '24rem',      // 384px
} as const;

// Border Radius
export const borderRadius = {
  none: '0px',
  sm: '0.125rem',    // 2px
  DEFAULT: '0.25rem', // 4px
  md: '0.375rem',    // 6px
  lg: '0.5rem',      // 8px
  xl: '0.75rem',     // 12px
  '2xl': '1rem',     // 16px
  '3xl': '1.5rem',   // 24px
  full: '9999px',
} as const;

// Box Shadows
export const boxShadow = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: 'none',
  
  // Custom elevation shadows
  elevation: {
    1: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    2: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
    3: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
    4: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
    5: '0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22)',
  },
} as const;

// Z-Index Scale
export const zIndex = {
  auto: 'auto',
  '0': '0',
  '10': '10',
  '20': '20',
  '30': '30',
  '40': '40',
  '50': '50',
  dropdown: '1000',
  sticky: '1020',
  fixed: '1030',
  modalBackdrop: '1040',
  modal: '1050',
  popover: '1060',
  tooltip: '1070',
} as const;

// Animation
export const animation = {
  // Transitions
  transition: {
    none: 'none',
    all: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    colors: 'background-color, border-color, color, fill, stroke 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: 'opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    shadow: 'box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Duration
  duration: {
    '75': '75ms',
    '100': '100ms',
    '150': '150ms',
    '200': '200ms',
    '300': '300ms',
    '500': '500ms',
    '700': '700ms',
    '1000': '1000ms',
  },
  
  // Timing Functions
  timingFunction: {
    DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// Component-specific tokens
export const components = {
  // Buttons
  button: {
    padding: {
      sm: `${spacing['2']} ${spacing['3']}`,
      md: `${spacing['2.5']} ${spacing['4']}`,
      lg: `${spacing['3']} ${spacing['5']}`,
    },
    fontSize: {
      sm: typography.fontSize.sm,
      md: typography.fontSize.base,
      lg: typography.fontSize.lg,
    },
    borderRadius: borderRadius.md,
    fontWeight: typography.fontWeight.medium,
  },
  
  // Cards
  card: {
    padding: spacing['6'],
    borderRadius: borderRadius.lg,
    boxShadow: boxShadow.md,
    background: colors.neutral[50],
    border: `1px solid ${colors.neutral[200]}`,
  },
  
  // Inputs
  input: {
    padding: {
      sm: `${spacing['1.5']} ${spacing['3']}`,
      md: `${spacing['2']} ${spacing['3.5']}`,
      lg: `${spacing['2.5']} ${spacing['4']}`,
    },
    fontSize: {
      sm: typography.fontSize.sm,
      md: typography.fontSize.base,
      lg: typography.fontSize.lg,
    },
    borderRadius: borderRadius.md,
    borderColor: colors.neutral[300],
    focusBorderColor: colors.primary[500],
    background: 'white',
  },
  
  // Modals
  modal: {
    overlay: {
      background: 'rgba(0, 0, 0, 0.5)',
      zIndex: zIndex.modalBackdrop,
    },
    content: {
      background: 'white',
      borderRadius: borderRadius.xl,
      boxShadow: boxShadow.xl,
      zIndex: zIndex.modal,
      padding: spacing['6'],
      maxWidth: '32rem',
    },
  },
} as const;

// Breakpoints (matching Tailwind's defaults)
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Export a function to generate Tailwind config extension
export const getTailwindExtension = () => ({
  colors: {
    primary: colors.primary,
    accent: colors.accent,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    info: colors.info,
    neutral: colors.neutral,
  },
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSize,
  fontWeight: typography.fontWeight,
  letterSpacing: typography.letterSpacing,
  lineHeight: typography.lineHeight,
  spacing,
  borderRadius,
  boxShadow: {
    ...boxShadow,
    ...Object.entries(boxShadow.elevation).reduce((acc, [key, value]) => ({
      ...acc,
      [`elevation-${key}`]: value,
    }), {}),
  },
  zIndex,
  animation: {
    'fade-in': 'fadeIn 200ms ease-in-out',
    'fade-out': 'fadeOut 200ms ease-in-out',
    'slide-in': 'slideIn 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    'slide-out': 'slideOut 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    'scale-in': 'scaleIn 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    'scale-out': 'scaleOut 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  keyframes: {
    fadeIn: {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' },
    },
    fadeOut: {
      '0%': { opacity: '1' },
      '100%': { opacity: '0' },
    },
    slideIn: {
      '0%': { transform: 'translateY(-10px)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
    slideOut: {
      '0%': { transform: 'translateY(0)', opacity: '1' },
      '100%': { transform: 'translateY(-10px)', opacity: '0' },
    },
    scaleIn: {
      '0%': { transform: 'scale(0.95)', opacity: '0' },
      '100%': { transform: 'scale(1)', opacity: '1' },
    },
    scaleOut: {
      '0%': { transform: 'scale(1)', opacity: '1' },
      '100%': { transform: 'scale(0.95)', opacity: '0' },
    },
  },
  transitionDuration: animation.duration,
  transitionTimingFunction: animation.timingFunction,
});

// Type exports for TypeScript usage
export type Colors = typeof colors;
export type Typography = typeof typography;
export type Spacing = typeof spacing;
export type BorderRadius = typeof borderRadius;
export type BoxShadow = typeof boxShadow;
export type ZIndex = typeof zIndex;
export type Animation = typeof animation;
export type Components = typeof components;
export type Breakpoints = typeof breakpoints;

// Default export for convenience
export default {
  colors,
  typography,
  spacing,
  borderRadius,
  boxShadow,
  zIndex,
  animation,
  components,
  breakpoints,
  getTailwindExtension,
};