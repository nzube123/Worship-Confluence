import { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  const baseClasses = 'rounded-full font-bold transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-400';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-600 to-green-500 text-white',
    secondary: 'bg-gradient-to-r from-purple-600 to-yellow-400 text-black',
    outline: 'border border-white/30 text-white hover:bg-white/15',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-7 py-3',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}