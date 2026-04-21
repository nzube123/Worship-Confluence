import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/app/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <div>
        {label && (
          <label htmlFor={id} className="mb-1 block text-sm text-gray-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'w-full rounded-lg border border-white/20 bg-black/70 p-3 text-white placeholder:text-gray-400 focus:border-purple-400 focus:outline-none',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';