import React from 'react';
import { spacing, breakpoints } from '@/styles/design-system';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
  centered?: boolean;
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  size = 'lg',
  padding = true,
  centered = true,
  children,
  className = '',
  style,
  ...props
}) => {
  const maxWidths = {
    sm: breakpoints.sm,
    md: breakpoints.md,
    lg: breakpoints.lg,
    xl: breakpoints.xl,
    full: '100%',
  };

  const containerStyles: React.CSSProperties = {
    width: '100%',
    maxWidth: maxWidths[size],
    margin: centered ? '0 auto' : '0',
    padding: padding ? `0 ${spacing[4]}` : '0',
    ...style,
  };

  // Responsive padding
  const responsivePadding = padding ? {
    '@media (min-width: 768px)': {
      padding: `0 ${spacing[6]}`,
    },
    '@media (min-width: 1024px)': {
      padding: `0 ${spacing[8]}`,
    },
  } : {};

  return (
    <div
      className={`container-${size} ${className}`}
      style={containerStyles}
      {...props}
    >
      {children}
    </div>
  );
}; 