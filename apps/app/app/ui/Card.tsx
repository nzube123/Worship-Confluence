import { ReactNode } from 'react';
import { cn } from '@/app/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn('rounded-2xl border border-white/10 bg-black/50 shadow-lg', className)}>
      {children}
    </div>
  );
}