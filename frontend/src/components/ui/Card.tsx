import React from 'react';
import { colors, spacing, borderRadius, shadows } from '@/styles/design-system';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  children,
  className = '',
  style,
  ...props
}) => {
  const paddingStyles = {
    none: '0',
    sm: spacing[3],
    md: spacing[6],
    lg: spacing[8],
    xl: spacing[12],
  };

  const variantStyles = {
    default: {
      backgroundColor: '#ffffff',
      border: `1px solid ${colors.gray[200]}`,
      boxShadow: 'none',
    },
    bordered: {
      backgroundColor: '#ffffff',
      border: `2px solid ${colors.gray[300]}`,
      boxShadow: 'none',
    },
    elevated: {
      backgroundColor: '#ffffff',
      border: 'none',
      boxShadow: shadows.md,
    },
    interactive: {
      backgroundColor: '#ffffff',
      border: `1px solid ${colors.gray[200]}`,
      boxShadow: shadows.sm,
      cursor: 'pointer',
      transition: 'all 200ms ease-in-out',
      ':hover': {
        boxShadow: shadows.lg,
        transform: 'translateY(-2px)',
      },
    },
  };

  const baseStyles: React.CSSProperties = {
    borderRadius: borderRadius.xl,
    padding: paddingStyles[padding],
    ...variantStyles[variant],
    ...style,
  };

  return (
    <div
      className={`card-${variant} ${className}`}
      style={baseStyles}
      {...props}
    >
      {children}
    </div>
  );
}; 