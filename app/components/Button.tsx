'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'large' | 'medium' | 'small' | 'xs';

export interface ButtonProps {
  /** Button variant style */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Optional link URL - renders as Link if provided */
  href?: string;
  /** Optional click handler - used when href is not provided */
  onClick?: () => void;
  /** Optional icon component */
  icon?: ReactNode;
  /** Icon position */
  iconPosition?: 'left' | 'right';
  /** Show arrow icon on the right */
  showArrow?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Button text/content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Type attribute for button element */
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Reusable Button component with variants and sizes
 * 
 * Features:
 * - Primary, secondary, and tertiary variants
 * - Four size options (large, medium, small, xs)
 * - Can render as Link or button element
 * - Smooth transitions and hover effects
 * - WCAG 2.1 AA compliant focus states
 * - Optional icon support
 */
export default function Button({
  variant = 'primary',
  size = 'medium',
  href,
  onClick,
  icon,
  iconPosition = 'right',
  showArrow = false,
  disabled = false,
  children,
  className = '',
  type = 'button',
}: ButtonProps) {
  // Size configurations
  const sizeConfig = {
    large: {
      padding: 'px-8 py-4',
      text: 'text-base md:text-lg',
      height: 'h-10 md:h-[40px]',
      iconSize: 'w-4 h-4 md:w-5 md:h-5',
    },
    medium: {
      padding: 'px-6 py-3',
      text: 'text-base',
      height: 'h-9',
      iconSize: 'w-4 h-4',
    },
    small: {
      padding: 'px-4 py-2',
      text: 'text-sm',
      height: 'h-8',
      iconSize: 'w-3.5 h-3.5',
    },
    xs: {
      padding: 'px-3 py-1',
      text: 'text-xs',
      height: 'h-6',
      iconSize: 'w-3 h-3',
    },
  };

  // Variant configurations
  const variantConfig = {
    primary: {
      base: 'bg-[#00ff41] text-gray-950 font-bold',
      shadow: 'shadow-[0_4px_15px_rgba(0,255,65,0.3)]',
      hover: 'hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,255,65,0.6),0_0_40px_rgba(0,255,65,0.4)]',
      focus: 'focus:ring-[#00ff41]',
      active: 'active:scale-95',
    },
    secondary: {
      base: 'bg-transparent border-2 font-bold',
      shadow: 'shadow-[0_4px_15px_rgba(255,71,87,0.2)]',
      hover: 'hover:scale-105 hover:shadow-[0_8px_30px_rgba(255,71,87,0.6),0_0_40px_rgba(255,71,87,0.4)]',
      focus: 'focus:ring-[#ff4757]',
      active: 'active:scale-95',
      // Secondary variant needs color prop - defaulting to coral red
      border: 'border-[#ff4757]',
      text: 'text-[#ff4757]',
      hoverFill: 'hover:bg-[#ff4757] hover:text-white',
    },
    tertiary: {
      base: 'bg-transparent border-0 font-semibold',
      shadow: '',
      hover: 'hover:underline',
      focus: 'focus:ring-cyan-400',
      active: '',
      text: 'text-cyan-400',
    },
  };

  const sizeStyles = sizeConfig[size];
  const variantStyles = variantConfig[variant];

  // Build base classes
  const baseClasses = `
    group relative
    inline-flex items-center justify-center gap-2
    rounded-lg
    transition-all duration-300 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    ${sizeStyles.padding}
    ${sizeStyles.text}
    ${variantStyles.base}
    ${variantStyles.shadow}
    ${variantStyles.hover}
    ${variantStyles.focus}
    ${variantStyles.active}
    ${variant === 'secondary' ? `${variantConfig.secondary.border} ${variantConfig.secondary.text} ${variantConfig.secondary.hoverFill}` : ''}
    ${variant === 'tertiary' ? variantConfig.tertiary.text : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  // Determine which icon to show
  const displayIcon = showArrow ? (
    <ArrowRight className={`${sizeStyles.iconSize} transition-transform duration-300 group-hover:translate-x-1`} aria-hidden="true" />
  ) : icon ? (
    <span className={sizeStyles.iconSize}>{icon}</span>
  ) : null;

  // Render content with icon
  const content = (
    <>
      {iconPosition === 'left' && displayIcon}
      {children}
      {iconPosition === 'right' && displayIcon}
    </>
  );

  // Render as Link or button
  if (href && !disabled) {
    return (
      <Link
        href={href}
        className={baseClasses}
        aria-disabled={disabled}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {content}
    </button>
  );
}
