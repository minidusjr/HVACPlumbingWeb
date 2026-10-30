'use client';

import { CheckCircle2, Lock, Send } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import type { BusinessInfo, LeadFormSection, ServiceItem } from '@/types';
import { Button } from './ui/Button';
import { FloatingInput, FloatingSelect } from './ui/FormField';

interface LeadFormClientProps {
  leadForm: LeadFormSection;
  services: ServiceItem[];
  business: BusinessInfo;
}

export function LeadFormClient({
  leadForm,
  services,
  business,
}: LeadFormClientProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const emailJsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const emailJsTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const emailJsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  const resolvedWeb3Key =
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
    leadForm.accessKeyPlaceholder;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);

    const isEmailJsConfigured =
      emailJsServiceId &&
      emailJsTemplateId &&
      emailJsPublicKey &&
      emailJsServiceId !== 'YOUR_EMAILJS_SERVICE_ID' &&
      emailJsTemplateId !== 'YOUR_EMAILJS_TEMPLATE_ID' &&
      emailJsPublicKey !== 'YOUR_EMAILJS_PUBLIC_KEY';

    const isWeb3FormsConfigured =
      resolvedWeb3Key &&
      resolvedWeb3Key !== 'YOUR_WEB3FORMS_OR_EMAILJS_ACCESS_KEY';

    try {
      if (isEmailJsConfigured) {
        const response = await fetch(
          'https://api.emailjs.com/api/v1.0/email/send',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              service_id: emailJsServiceId,
              template_id: emailJsTemplateId,
              user_id: emailJsPublicKey,
              template_params: {
                business_name: business.name,
                from_name: formData.get('name'),
                name: formData.get('name'),
                phone: formData.get('phone'),
                zip_code: formData.get('zip_code'),
                service_needed: formData.get('service_needed'),
                subject: `New Service Lead - ${business.name}`,
              },
            }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to send lead via EmailJS.');
        }
      } else if (isWeb3FormsConfigured) {
        const response = await fetch(leadForm.actionUrl, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to send lead via Web3Forms.');
        }
      }

      setIsSubmitted(true);
    } catch {
      setErrorMessage(
        `Could not submit online right now. Please call us directly at ${business.phoneDisplay}.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="space-y-4 py-12 text-center"
      >
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-emerald-200 bg-gradient-to-b from-emerald-50 to-emerald-100 text-emerald-700 shadow-sm">
          <CheckCircle2 className="size-9" aria-hidden="true" />
        </div>
        <h3 className="text-2xl font-extrabold text-brand-secondary">
          {leadForm.fields.successHeadline}
        </h3>
        <p className="mx-auto max-w-md text-base text-slate-600">
          {leadForm.fields.successMessage}
        </p>
      </div>
    );
  }

  return (
    <form
      action={leadForm.actionUrl}
      method="POST"
      onSubmit={handleSubmit}
      className="space-y-4 sm:space-y-5"
    >
      <input type="hidden" name="access_key" value={resolvedWeb3Key} />
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <input
        type="hidden"
        name="subject"
        value={`New Service Lead - ${business.name}`}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        <FloatingInput
          id="lead-name"
          name="name"
          type="text"
          label={leadForm.fields.nameLabel}
          placeholder={leadForm.fields.namePlaceholder}
          autoComplete="name"
          required
        />
        <FloatingInput
          id="lead-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          label={leadForm.fields.phoneLabel}
          placeholder={leadForm.fields.phonePlaceholder}
          autoComplete="tel"
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        <FloatingInput
          id="lead-zip"
          name="zip_code"
          type="text"
          inputMode="numeric"
          pattern="[0-9]{5}"
          maxLength={5}
          label={leadForm.fields.zipLabel}
          placeholder={leadForm.fields.zipPlaceholder}
          autoComplete="postal-code"
          required
        />
        <FloatingSelect
          id="lead-service"
          name="service_needed"
          label={leadForm.fields.serviceLabel}
          placeholderOption={leadForm.fields.servicePlaceholder}
          required
        >
          {services.map((service) => (
            <option key={service.id} value={service.title}>
              {service.title}
            </option>
          ))}
        </FloatingSelect>
      </div>

      {errorMessage && (
        <p
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
        >
          {errorMessage}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        fullWidth
        disabled={isSubmitting}
        className="font-extrabold"
      >
        <span>
          {isSubmitting
            ? leadForm.fields.submittingText
            : leadForm.fields.submitButtonText}
        </span>
        <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-xl bg-white/20 shadow-inner transition-transform duration-300 group-hover:translate-x-1">
          <Send className="size-4" aria-hidden="true" />
        </span>
      </Button>

      <p className="flex items-start justify-center gap-1.5 text-center text-xs leading-relaxed text-slate-500">
        <Lock
          className="mt-0.5 size-3.5 shrink-0 text-brand-primary"
          aria-hidden="true"
        />
        <span>{leadForm.fields.privacyNote}</span>
      </p>
    </form>
  );
}

