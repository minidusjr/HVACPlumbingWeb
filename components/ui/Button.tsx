import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';
import { cn } from '@/lib/cn';

export type ButtonVariant =
  | 'primary'
  | 'dark'
  | 'light'
  | 'outline-light'
  | 'soft';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

const BASE =
  'group relative isolate inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-2xl border text-center font-bold tracking-tight transition-all duration-300 ease-out active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 ' +
  'before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:-translate-x-full before:skew-x-[-20deg] before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent before:transition-transform before:duration-700 hover:before:translate-x-full';

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'border-white/20 bg-gradient-to-b from-brand-primary to-brand-primary-hover text-white shadow-[0_1px_0_0_rgba(255,255,255,0.35)_inset,0_10px_25px_-5px_rgb(var(--color-primary)/0.45),0_4px_10px_-4px_rgba(15,23,42,0.2)] hover:-translate-y-0.5 hover:shadow-[0_1px_0_0_rgba(255,255,255,0.45)_inset,0_16px_32px_-6px_rgb(var(--color-primary)/0.6),0_6px_14px_-4px_rgba(15,23,42,0.25)] focus-visible:ring-brand-primary',
  dark:
    'border-white/15 bg-gradient-to-b from-slate-800 to-brand-secondary text-white shadow-[0_1px_0_0_rgba(255,255,255,0.2)_inset,0_10px_24px_-6px_rgba(15,23,42,0.55)] hover:-translate-y-0.5 hover:border-white/25 hover:from-slate-700 hover:to-slate-900 hover:shadow-[0_1px_0_0_rgba(255,255,255,0.28)_inset,0_14px_30px_-6px_rgba(15,23,42,0.7)] focus-visible:ring-brand-secondary',
  light:
    'border-slate-200/90 bg-gradient-to-b from-white to-slate-50/90 text-brand-secondary shadow-[0_1px_0_0_rgba(255,255,255,1)_inset,0_8px_20px_-6px_rgba(15,23,42,0.14)] hover:-translate-y-0.5 hover:border-brand-primary/30 hover:text-brand-primary hover:shadow-[0_1px_0_0_rgba(255,255,255,1)_inset,0_12px_26px_-6px_rgba(15,23,42,0.2)] focus-visible:ring-white focus-visible:ring-offset-brand-secondary',
  'outline-light':
    'border-white/20 bg-white/[0.07] text-white backdrop-blur-md shadow-[0_1px_0_0_rgba(255,255,255,0.18)_inset,0_8px_24px_-6px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 hover:border-brand-accent/50 hover:bg-white/[0.13] hover:shadow-[0_1px_0_0_rgba(255,255,255,0.28)_inset,0_12px_28px_-6px_rgba(0,0,0,0.4)] focus-visible:ring-white focus-visible:ring-offset-brand-secondary',
  soft:
    'border-slate-200/80 bg-gradient-to-b from-white to-slate-100/90 text-slate-700 shadow-[0_1px_0_0_rgba(255,255,255,0.9)_inset,0_2px_6px_rgba(15,23,42,0.06)] hover:border-brand-primary/30 hover:text-brand-primary hover:shadow-md focus-visible:ring-brand-primary',
};

const SIZES: Record<ButtonSize, string> = {
  sm: 'px-4 py-2.5 text-sm rounded-xl',
  md: 'px-5 py-3 text-sm sm:text-base rounded-xl',
  lg: 'px-6 py-4 text-base sm:px-8 sm:py-4.5 sm:text-lg rounded-2xl',
  icon: 'size-11 p-0 rounded-xl',
};

interface ButtonStyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

export function buttonClasses({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
}: ButtonStyleProps = {}): string {
  return cn(
    BASE,
    VARIANTS[variant],
    SIZES[size],
    fullWidth && 'w-full',
    className
  );
}

type ButtonLinkProps = ButtonStyleProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode };

/** Tactile 3D gradient & glassmorphism button rendered as a link. */
export function ButtonLink({
  variant,
  size,
  fullWidth,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={buttonClasses({ variant, size, fullWidth, className })}
      {...props}
    >
      {children}
    </a>
  );
}

type ButtonProps = ButtonStyleProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode };

/** Tactile 3D gradient & glassmorphism native button. */
export function Button({
  variant,
  size,
  fullWidth,
  className,
  type = 'button',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses({ variant, size, fullWidth, className })}
      {...props}
    >
      {children}
    </button>
  );
}
