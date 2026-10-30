import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
  tone?: 'light' | 'dark';
  badge?: ReactNode;
  className?: string;
}

/** HyperUI section header: eyebrow, H2 and supporting copy. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = 'center',
  tone = 'light',
  badge,
  className,
}: SectionHeadingProps) {
  const isDark = tone === 'dark';

  return (
    <div
      className={cn(
        'max-w-3xl space-y-3 sm:space-y-4',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {badge}
      {eyebrow && (
        <p
          className={cn(
            'text-xs font-extrabold uppercase tracking-widest sm:text-sm',
            isDark ? 'text-sky-300' : 'text-brand-primary'
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={cn(
          'text-balance text-2xl font-extrabold tracking-tight sm:text-4xl',
          isDark ? 'text-white' : 'text-brand-secondary'
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'text-sm leading-relaxed sm:text-lg',
            isDark ? 'text-slate-300' : 'text-slate-600'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

