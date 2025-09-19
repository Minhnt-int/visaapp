/**
 * High Contrast Utility Classes
 * Ensures WCAG AA compliance with minimum 4.5:1 contrast ratio
 */

export const highContrastColors = {
  // Text colors with sufficient contrast
  text: {
    primary: 'text-gray-900', // #111827 on white = 16.97:1
    secondary: 'text-gray-700', // #374151 on white = 9.48:1
    muted: 'text-gray-600', // #4B5563 on white = 7.57:1 
    inverse: 'text-white', // white on dark backgrounds
  },
  
  // Background colors
  background: {
    white: 'bg-white',
    gray: 'bg-gray-50',
    dark: 'bg-gray-900',
    primary: 'bg-blue-600', // #2563EB
    secondary: 'bg-gray-100',
  },
  
  // Interactive elements
  interactive: {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white', // 4.5:1+
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900', // 7.5:1+
    outline: 'border-gray-300 text-gray-900 hover:bg-gray-50', // 8.5:1+
    danger: 'bg-red-600 hover:bg-red-700 text-white', // 4.5:1+
  },
  
  // Links
  link: {
    default: 'text-blue-700 hover:text-blue-800', // 5.8:1 ratio
    visited: 'text-purple-700 hover:text-purple-800', // 5.2:1 ratio
    contrast: 'text-blue-800 hover:text-blue-900', // 7.5:1+ ratio
  },
  
  // Status colors
  status: {
    success: 'text-green-700 bg-green-50', // 4.7:1
    warning: 'text-yellow-800 bg-yellow-50', // 5.9:1
    error: 'text-red-700 bg-red-50', // 4.7:1
    info: 'text-blue-700 bg-blue-50', // 5.8:1
  }
};

/**
 * High Contrast Button Component
 */
interface HighContrastButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  'aria-label'?: string;
}

export function HighContrastButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  'aria-label': ariaLabel,
  ...props
}: HighContrastButtonProps) {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[36px]',
    md: 'px-4 py-3 text-base min-h-[44px]', // Touch-friendly
    lg: 'px-6 py-4 text-lg min-h-[48px]',
  };
  
  const variantClasses = {
    primary: `${highContrastColors.interactive.primary} focus:ring-blue-500`,
    secondary: `${highContrastColors.interactive.secondary} focus:ring-gray-500`,
    outline: `${highContrastColors.interactive.outline} border-2 focus:ring-gray-500`,
    danger: `${highContrastColors.interactive.danger} focus:ring-red-500`,
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    >
      {children}
    </button>
  );
}
