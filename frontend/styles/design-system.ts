/**
 * vCFO of One Design System
 * Target Audience: Small business owners without a full-time CFO
 * Design Philosophy: Clean, professional, trustworthy
 */

export const colors = {
  // Primary - Utlyze Blue
  primary: {
    50: '#e6effc',
    100: '#c2d5f7',
    200: '#9ab9f2',
    300: '#729ded',
    400: '#5586ea',
    500: '#4169E1', // Main brand color
    600: '#3659d4',
    700: '#2a47c6',
    800: '#1e35b8',
    900: '#1427a7',
  },
  
  // Accent - Financial Success Green
  accent: {
    50: '#e6f7f2',
    100: '#c0ebde',
    200: '#96ddc8',
    300: '#6ccfb2',
    400: '#4dc5a1',
    500: '#00A878', // Main accent
    600: '#008d6a',
    700: '#007359',
    800: '#005948',
    900: '#00453a',
  },
  
  // Neutral grays
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // Semantic colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
};

export const typography = {
  fontFamily: {
    sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
  },
  
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  lineHeight: {
    tight: '1.2',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
};

export const spacing = {
  0: '0',
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  5: '1.25rem',  // 20px
  6: '1.5rem',   // 24px
  8: '2rem',     // 32px
  10: '2.5rem',  // 40px
  12: '3rem',    // 48px
  16: '4rem',    // 64px
  20: '5rem',    // 80px
  24: '6rem',    // 96px
  32: '8rem',    // 128px
};

export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
};

export const animation = {
  duration: {
    fast: '150ms',
    base: '300ms',
    slow: '500ms',
    slower: '700ms',
  },
  
  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Component-specific tokens
export const components = {
  button: {
    primary: {
      background: colors.primary[500],
      hover: colors.primary[600],
      active: colors.primary[700],
      text: '#ffffff',
    },
    secondary: {
      background: colors.gray[100],
      hover: colors.gray[200],
      active: colors.gray[300],
      text: colors.gray[800],
    },
    accent: {
      background: colors.accent[500],
      hover: colors.accent[600],
      active: colors.accent[700],
      text: '#ffffff',
    },
  },
  
  card: {
    background: '#ffffff',
    border: colors.gray[200],
    shadow: shadows.base,
    hoverShadow: shadows.md,
  },
  
  input: {
    background: '#ffffff',
    border: colors.gray[300],
    focusBorder: colors.primary[500],
    text: colors.gray[900],
    placeholder: colors.gray[500],
  },
};

// Tailwind config helper
export const tailwindConfig = {
  extend: {
    colors: {
      primary: colors.primary,
      accent: colors.accent,
      gray: colors.gray,
    },
    fontFamily: typography.fontFamily,
    boxShadow: shadows,
  },
}; 