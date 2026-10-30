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
  'group inline-flex items-center justify-center gap-2 rounded-lg border text-center font-semibold transition active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60';

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'border-brand-primary bg-brand-primary text-white shadow-sm hover:border-brand-primary-hover hover:bg-brand-primary-hover focus-visible:ring-brand-primary',
  dark:
    'border-brand-secondary bg-brand-secondary text-white shadow-sm hover:bg-slate-800 focus-visible:ring-brand-secondary',
  light:
    'border-white bg-white text-brand-secondary shadow-sm hover:bg-slate-100 focus-visible:ring-white focus-visible:ring-offset-brand-secondary',
  'outline-light':
    'border-white/25 bg-white/5 text-white hover:border-white/40 hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-brand-secondary',
  soft:
    'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-brand-primary focus-visible:ring-brand-primary',
};

const SIZES: Record<ButtonSize, string> = {
  sm: 'px-4 py-2.5 text-sm',
  md: 'px-5 py-3 text-sm sm:text-base',
  lg: 'px-6 py-4 text-base sm:px-8 sm:text-lg',
  icon: 'size-11 p-0',
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
  return cn(BASE, VARIANTS[variant], SIZES[size], fullWidth && 'w-full', className);
}

type ButtonLinkProps = ButtonStyleProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode };

/** HyperUI-style button rendered as a link (CTAs, tel: links, anchors). */
export function ButtonLink({
  variant,
  size,
  fullWidth,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={buttonClasses({ variant, size, fullWidth, className })} {...props}>
      {children}
    </a>
  );
}

type ButtonProps = ButtonStyleProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode };

/** HyperUI-style native button (form submits, toggles). */
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
