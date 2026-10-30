import { ChevronDown } from 'lucide-react';
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from 'react';

/*
 * HyperUI "Inputs with label inside" pattern, converted to Tailwind v3.
 * Inputs use text-base (16px) so iOS Safari does not zoom in on focus.
 */

const FIELD_WRAPPER =
  'relative block rounded-lg border border-slate-300 bg-white shadow-sm transition focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/20';

const FLOATING_LABEL =
  'pointer-events-none absolute start-3 top-0 -translate-y-1/2 bg-white px-1 text-xs font-semibold text-slate-700 transition-all';

function RequiredMark() {
  return (
    <span className="text-red-600" aria-hidden="true">
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
        className="peer h-14 w-full rounded-lg border-none bg-transparent px-4 pt-3 text-base text-slate-900 placeholder-transparent focus:outline-none focus:placeholder-slate-400"
        {...props}
      />
      <span
        className={`${FLOATING_LABEL} peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-placeholder-shown:text-slate-500 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-brand-primary`}
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
        className="peer h-14 w-full appearance-none truncate rounded-lg border-none bg-transparent pe-10 ps-4 pt-1 text-base text-slate-900 invalid:text-slate-400 focus:outline-none"
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
        className="pointer-events-none absolute end-3 top-1/2 size-5 -translate-y-1/2 text-slate-400"
      />
    </label>
  );
}

