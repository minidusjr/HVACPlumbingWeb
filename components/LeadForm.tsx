'use client';

import { CheckCircle2, Lock, PhoneCall, Send } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import type { BusinessInfo, LeadFormSection, ServiceItem } from '@/types';
import { Button, ButtonLink } from './ui/Button';
import { Container } from './ui/Container';
import { FloatingInput, FloatingSelect } from './ui/FormField';
import { SectionHeading } from './ui/SectionHeading';

interface LeadFormProps {
  leadForm: LeadFormSection;
  services: ServiceItem[];
  business: BusinessInfo;
}

export function LeadForm({ leadForm, services, business }: LeadFormProps) {
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
        // Send via official EmailJS REST API
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
        // Fallback to Web3Forms endpoint if configured
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

  return (
    <section
      id={leadForm.id}
      aria-labelledby="lead-form-heading"
      className="scroll-mt-24 bg-slate-100 py-12 sm:py-24"
    >
      <Container>
        {/*
          HyperUI Contact Form layout.
          DOM order = phone order: heading -> form -> highlights.
          On lg the form moves to the right column spanning both rows.
        */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-x-16 lg:gap-y-8">
          {/* Heading */}
          <div className="lg:col-span-2">
            <SectionHeading
              id="lead-form-heading"
              align="left"
              eyebrow={leadForm.eyebrow}
              title={leadForm.heading}
              description={leadForm.subheading}
            />
          </div>

          {/* Form card */}
          <div className="lg:col-span-3 lg:col-start-3 lg:row-span-2 lg:row-start-1">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:rounded-3xl sm:p-10">
              {isSubmitted ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="space-y-4 py-12 text-center"
                >
                  <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="size-10" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-brand-secondary">
                    {leadForm.fields.successHeadline}
                  </h3>
                  <p className="mx-auto max-w-md text-base text-slate-600">
                    {leadForm.fields.successMessage}
                  </p>
                </div>
              ) : (
                <form
                  action={leadForm.actionUrl}
                  method="POST"
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-5"
                >
                  <input type="hidden" name="access_key" value={resolvedWeb3Key} />
                  {/* Anti-spam honeypot */}
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
                      className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
                    >
                      {errorMessage}
                    </p>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    fullWidth
                    disabled={isSubmitting}
                    className="rounded-xl font-extrabold shadow-lg"
                  >
                    <Send className="size-5 shrink-0" aria-hidden="true" />
                    <span>
                      {isSubmitting
                        ? leadForm.fields.submittingText
                        : leadForm.fields.submitButtonText}
                    </span>
                  </Button>

                  <p className="flex items-start justify-center gap-1.5 text-center text-xs leading-relaxed text-slate-500">
                    <Lock className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                    <span>{leadForm.fields.privacyNote}</span>
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Highlights & direct dispatch */}
          <div className="space-y-6 lg:col-span-2 lg:col-start-1">
            <ul className="space-y-3">
              {leadForm.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-3 text-sm font-semibold text-slate-800 sm:text-base"
                >
                  <CheckCircle2
                    className="mt-0.5 size-5 shrink-0 text-brand-primary"
                    aria-hidden="true"
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            <aside
              aria-label="Direct Emergency Dispatch Phone"
              className="rounded-2xl border border-slate-800 bg-brand-secondary p-5 text-white shadow-lg sm:p-6"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-brand-accent">
                {business.hours}
              </p>
              <p className="mt-1 text-base font-bold text-white sm:text-lg">
                {business.tagline}
              </p>
              <ButtonLink
                href={business.phoneHref}
                size="md"
                className="mt-4 w-full whitespace-nowrap rounded-xl font-extrabold sm:w-auto"
              >
                <PhoneCall className="size-5 shrink-0" aria-hidden="true" />
                <span>{business.ctaCallText}</span>
              </ButtonLink>
            </aside>
          </div>
        </div>
      </Container>
    </section>
  );
}
