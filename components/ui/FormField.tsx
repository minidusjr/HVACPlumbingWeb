import { ChevronDown } from 'lucide-react';
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from 'react';

/*
 * Modern tactile floating-label inputs.
 * Inputs use text-base (16px) so iOS Safari does not zoom in on focus.
 */

const FIELD_WRAPPER =
  'group relative block rounded-2xl border border-slate-200/90 bg-slate-50/70 shadow-[0_1px_2px_rgba(15,23,42,0.04)_inset] transition-all duration-200 hover:border-slate-300 hover:bg-white focus-within:border-brand-primary focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgb(var(--color-primary)/0.12)]';

const FLOATING_LABEL =
  'pointer-events-none absolute start-3.5 top-0 -translate-y-1/2 rounded-full bg-white px-2 text-xs font-bold text-slate-600 transition-all duration-200';

function RequiredMark() {
  return (
    <span className="text-red-500" aria-hidden="true">
      {' '}
      *
    </span>
  );
}

interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

export function FloatingInput({
  id,
  label,
  required,
  placeholder,
  ...props
}: FloatingInputProps) {
  return (
    <label htmlFor={id} className={FIELD_WRAPPER}>
      <input
        id={id}
        required={required}
        placeholder={placeholder ?? label}
        className="peer h-14 w-full rounded-2xl border-none bg-transparent px-4 pt-3 text-base font-medium text-slate-900 placeholder-transparent focus:outline-none focus:placeholder-slate-400"
        {...props}
      />
      <span
        className={`${FLOATING_LABEL} peer-placeholder-shown:top-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-placeholder-shown:text-slate-500 peer-focus:top-0 peer-focus:bg-white peer-focus:text-xs peer-focus:font-bold peer-focus:text-brand-primary`}
      >
        {label}
        {required && <RequiredMark />}
      </span>
    </label>
  );
}

interface FloatingSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  placeholderOption: string;
  children: ReactNode;
}

export function FloatingSelect({
  id,
  label,
  required,
  placeholderOption,
  children,
  ...props
}: FloatingSelectProps) {
  return (
    <label htmlFor={id} className={FIELD_WRAPPER}>
      <select
        id={id}
        required={required}
        defaultValue=""
        className="peer h-14 w-full appearance-none truncate rounded-2xl border-none bg-transparent pe-10 ps-4 pt-1 text-base font-medium text-slate-900 invalid:text-slate-400 focus:outline-none"
        {...props}
      >
        <option value="" disabled>
          {placeholderOption}
        </option>
        {children}
      </select>
      <span className={`${FLOATING_LABEL} peer-focus:text-brand-primary`}>
        {label}
        {required && <RequiredMark />}
      </span>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute end-3.5 top-1/2 size-5 -translate-y-1/2 text-slate-400 transition-transform duration-200 group-focus-within:rotate-180 group-focus-within:text-brand-primary"
      />
    </label>
  );
}
