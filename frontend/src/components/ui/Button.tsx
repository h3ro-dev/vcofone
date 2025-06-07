import React from 'react';
import { colors, spacing, typography, borderRadius, shadows } from '@/styles/design-system';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  icon,
  iconPosition = 'left',
  children,
  className = '',
  disabled,
  ...props
}) => {
  // Size styles
  const sizeStyles = {
    sm: {
      padding: `${spacing[2]} ${spacing[3]}`,
      fontSize: typography.fontSize.sm,
      height: '32px',
    },
    md: {
      padding: `${spacing[2]} ${spacing[4]}`,
      fontSize: typography.fontSize.base,
      height: '40px',
    },
    lg: {
      padding: `${spacing[3]} ${spacing[6]}`,
      fontSize: typography.fontSize.lg,
      height: '48px',
    },
    xl: {
      padding: `${spacing[4]} ${spacing[8]}`,
      fontSize: typography.fontSize.xl,
      height: '56px',
    },
  };

  // Variant styles
  const variantStyles = {
    primary: {
      backgroundColor: colors.primary[500],
      color: '#ffffff',
      border: 'none',
      ':hover': {
        backgroundColor: colors.primary[600],
      },
      ':active': {
        backgroundColor: colors.primary[700],
      },
      ':disabled': {
        backgroundColor: colors.gray[300],
        color: colors.gray[500],
      },
    },
    secondary: {
      backgroundColor: colors.gray[100],
      color: colors.gray[800],
      border: `1px solid ${colors.gray[300]}`,
      ':hover': {
        backgroundColor: colors.gray[200],
        borderColor: colors.gray[400],
      },
      ':active': {
        backgroundColor: colors.gray[300],
      },
      ':disabled': {
        backgroundColor: colors.gray[100],
        color: colors.gray[400],
        borderColor: colors.gray[200],
      },
    },
    accent: {
      backgroundColor: colors.accent[500],
      color: '#ffffff',
      border: 'none',
      ':hover': {
        backgroundColor: colors.accent[600],
      },
      ':active': {
        backgroundColor: colors.accent[700],
      },
      ':disabled': {
        backgroundColor: colors.gray[300],
        color: colors.gray[500],
      },
    },
    ghost: {
      backgroundColor: 'transparent',
      color: colors.primary[600],
      border: 'none',
      ':hover': {
        backgroundColor: colors.primary[50],
        color: colors.primary[700],
      },
      ':active': {
        backgroundColor: colors.primary[100],
      },
      ':disabled': {
        color: colors.gray[400],
      },
    },
    danger: {
      backgroundColor: colors.error,
      color: '#ffffff',
      border: 'none',
      ':hover': {
        backgroundColor: '#dc2626',
      },
      ':active': {
        backgroundColor: '#b91c1c',
      },
      ':disabled': {
        backgroundColor: colors.gray[300],
        color: colors.gray[500],
      },
    },
  };

  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
    fontWeight: typography.fontWeight.medium,
    fontFamily: typography.fontFamily.sans,
    borderRadius: borderRadius.lg,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: 'all 150ms ease-in-out',
    outline: 'none',
    width: fullWidth ? '100%' : 'auto',
    position: 'relative',
    overflow: 'hidden',
    userSelect: 'none',
    ...sizeStyles[size],
    ...variantStyles[variant],
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <svg
      className="animate-spin"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      style={{
        animation: 'spin 1s linear infinite',
      }}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.25"
      />
      <path
        d="M12 2C6.48 2 2 6.48 2 12"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <button
      style={baseStyles}
      className={`
        focus:ring-2 focus:ring-offset-2 focus:ring-${variant === 'accent' ? 'accent' : 'primary'}-500
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && iconPosition === 'left' && <LoadingSpinner />}
      {!loading && icon && iconPosition === 'left' && icon}
      <span style={{ opacity: loading ? 0.7 : 1 }}>{children}</span>
      {!loading && icon && iconPosition === 'right' && icon}
      {loading && iconPosition === 'right' && <LoadingSpinner />}
    </button>
  );
};

// Add CSS animation for spinner
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
} 