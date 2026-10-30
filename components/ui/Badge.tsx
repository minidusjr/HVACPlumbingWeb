import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type BadgeTone = 'accent-dark' | 'primary-light' | 'primary-dark';
type BadgeSize = 'sm' | 'md';

const TONES: Record<BadgeTone, string> = {
  'accent-dark':
    'border-white/15 bg-gradient-to-r from-white/[0.12] to-white/[0.05] text-brand-accent shadow-[0_1px_0_0_rgba(255,255,255,0.2)_inset,0_4px_12px_rgba(0,0,0,0.25)] backdrop-blur-md',
  'primary-light':
    'border-brand-primary/25 bg-gradient-to-r from-brand-primary/15 to-brand-primary/5 text-brand-primary shadow-[0_1px_0_0_rgba(255,255,255,0.8)_inset]',
  'primary-dark':
    'border-brand-primary/35 bg-gradient-to-r from-brand-primary/25 to-brand-primary/10 text-sky-200 shadow-[0_1px_0_0_rgba(255,255,255,0.12)_inset]',
};

const SIZES: Record<BadgeSize, string> = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-3.5 py-1.5 text-xs sm:text-sm',
};

interface BadgeProps {
  tone?: BadgeTone;
  size?: BadgeSize;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** Modern glassmorphism pill badge with inner specular rim. */
export function Badge({
  tone = 'accent-dark',
  size = 'md',
  icon,
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex max-w-full items-center gap-2 rounded-full border font-bold tracking-tight',
        TONES[tone],
        SIZES[size],
        className
      )}
    >
      {icon}
      <span className="leading-snug">{children}</span>
    </span>
  );
}
