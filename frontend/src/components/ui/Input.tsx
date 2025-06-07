import React, { forwardRef } from 'react';
import { colors, spacing, typography, borderRadius } from '@/styles/design-system';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helper,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  style,
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[1],
    width: fullWidth ? '100%' : 'auto',
  };

  const inputWrapperStyles: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  const inputStyles: React.CSSProperties = {
    width: '100%',
    padding: `${spacing[2]} ${spacing[3]}`,
    paddingLeft: icon && iconPosition === 'left' ? spacing[10] : spacing[3],
    paddingRight: icon && iconPosition === 'right' ? spacing[10] : spacing[3],
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.sans,
    color: colors.gray[900],
    backgroundColor: '#ffffff',
    border: `1px solid ${error ? colors.error : colors.gray[300]}`,
    borderRadius: borderRadius.lg,
    outline: 'none',
    transition: 'all 150ms ease-in-out',
    ...style,
  };

  const iconStyles: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    [iconPosition]: spacing[3],
    color: colors.gray[500],
    pointerEvents: 'none',
  };

  const labelStyles: React.CSSProperties = {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    fontFamily: typography.fontFamily.sans,
    color: colors.gray[700],
    marginBottom: spacing[1],
  };

  const helperStyles: React.CSSProperties = {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    color: error ? colors.error : colors.gray[600],
    marginTop: spacing[1],
  };

  return (
    <div style={containerStyles}>
      {label && (
        <label htmlFor={inputId} style={labelStyles}>
          {label}
        </label>
      )}
      
      <div style={inputWrapperStyles}>
        {icon && (
          <span style={iconStyles}>
            {icon}
          </span>
        )}
        
        <input
          ref={ref}
          id={inputId}
          style={inputStyles}
          className={`
            focus:border-${error ? 'error' : 'primary'}-500
            focus:ring-2
            focus:ring-${error ? 'error' : 'primary'}-500
            focus:ring-opacity-20
            placeholder:text-gray-400
            disabled:bg-gray-50
            disabled:text-gray-500
            disabled:cursor-not-allowed
            ${className}
          `}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined}
          {...props}
        />
      </div>
      
      {(error || helper) && (
        <p 
          id={error ? `${inputId}-error` : `${inputId}-helper`}
          style={helperStyles}
        >
          {error || helper}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input'; 