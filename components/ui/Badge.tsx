import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type BadgeTone = 'accent-dark' | 'primary-light' | 'primary-dark';
type BadgeSize = 'sm' | 'md';

const TONES: Record<BadgeTone, string> = {
  'accent-dark': 'border-white/15 bg-white/10 text-brand-accent',
  'primary-light': 'border-brand-primary/20 bg-brand-primary/10 text-brand-primary',
  'primary-dark': 'border-brand-primary/30 bg-brand-primary/20 text-sky-200',
};

const SIZES: Record<BadgeSize, string> = {
  sm: 'px-2.5 py-0.5 text-xs',
  md: 'px-3 py-1 text-xs sm:text-sm',
};

interface BadgeProps {
  tone?: BadgeTone;
  size?: BadgeSize;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** HyperUI pill badge: `inline-flex items-center rounded-full px-2.5 py-0.5` */
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
        'inline-flex max-w-full items-center gap-1.5 rounded-full border font-semibold',
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
