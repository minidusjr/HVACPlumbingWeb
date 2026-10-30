'use client';

import { CheckCircle2, Lock, PhoneCall, Send } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import type { BusinessInfo, LeadFormSection, ServiceItem } from '@/types';

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
      className="py-16 sm:py-24 bg-slate-100 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Value Proposition & Direct Dispatch Callout */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-brand-primary">
              {leadForm.eyebrow}
            </p>

            <h2
              id="lead-form-heading"
              className="text-2xl sm:text-4xl font-extrabold tracking-tight text-brand-secondary leading-tight"
            >
              {leadForm.heading}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {leadForm.subheading}
            </p>

            {/* Value Highlights List */}
            <ul className="space-y-3.5 pt-2">
              {leadForm.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-3 text-sm sm:text-base font-semibold text-slate-800"
                >
                  <CheckCircle2
                    className="h-5 w-5 text-brand-primary shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            {/* Direct Phone Dispatch Card */}
            <aside
              aria-label="Direct Emergency Dispatch Phone"
              className="mt-8 rounded-2xl bg-brand-secondary text-white p-6 shadow-lg border border-slate-800"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-brand-accent">
                {business.hours}
              </p>
              <p className="mt-1 text-lg font-bold text-white">
                {business.tagline}
              </p>
              <a
                href={business.phoneHref}
                className="mt-4 inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white font-extrabold px-6 py-3.5 shadow-md transition-colors"
              >
                <PhoneCall className="h-5 w-5" aria-hidden="true" />
                <span>{business.ctaCallText}</span>
              </a>
            </aside>
          </div>

          {/* Right Column: High-Converting Lead Capture Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white p-6 sm:p-10 shadow-xl border border-slate-200">
              {isSubmitted ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="py-12 text-center space-y-4"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-brand-secondary">
                    {leadForm.fields.successHeadline}
                  </h3>
                  <p className="text-base text-slate-600 max-w-md mx-auto">
                    {leadForm.fields.successMessage}
                  </p>
                </div>
              ) : (
                <form
                  action={leadForm.actionUrl}
                  method="POST"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <input
                    type="hidden"
                    name="access_key"
                    value={resolvedWeb3Key}
                  />
                  {/* Anti-Spam Honeypot Field */}
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="lead-name"
                        className="block text-sm font-bold text-slate-800 mb-2"
                      >
                        {leadForm.fields.nameLabel}{' '}
                        <span className="text-red-600" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <input
                        id="lead-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder={leadForm.fields.namePlaceholder}
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-brand-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label
                        htmlFor="lead-phone"
                        className="block text-sm font-bold text-slate-800 mb-2"
                      >
                        {leadForm.fields.phoneLabel}{' '}
                        <span className="text-red-600" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <input
                        id="lead-phone"
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        placeholder={leadForm.fields.phonePlaceholder}
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-brand-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Zip Code */}
                    <div>
                      <label
                        htmlFor="lead-zip"
                        className="block text-sm font-bold text-slate-800 mb-2"
                      >
                        {leadForm.fields.zipLabel}{' '}
                        <span className="text-red-600" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <input
                        id="lead-zip"
                        name="zip_code"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]{5}"
                        maxLength={5}
                        required
                        autoComplete="postal-code"
                        placeholder={leadForm.fields.zipPlaceholder}
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-brand-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
                      />
                    </div>

                    {/* Service Needed Dropdown */}
                    <div>
                      <label
                        htmlFor="lead-service"
                        className="block text-sm font-bold text-slate-800 mb-2"
                      >
                        {leadForm.fields.serviceLabel}{' '}
                        <span className="text-red-600" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <select
                        id="lead-service"
                        name="service_needed"
                        required
                        defaultValue=""
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-900 focus:border-brand-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
                      >
                        <option value="" disabled>
                          {leadForm.fields.servicePlaceholder}
                        </option>
                        {services.map((service) => (
                          <option key={service.id} value={service.title}>
                            {service.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {errorMessage && (
                    <p
                      role="alert"
                      className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm font-semibold text-red-700"
                    >
                      {errorMessage}
                    </p>
                  )}

                  {/* Primary Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary-hover disabled:opacity-60 text-white font-extrabold text-base sm:text-lg px-8 py-4 shadow-lg transition-all active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-primary"
                  >
                    <Send className="h-5 w-5" aria-hidden="true" />
                    <span>
                      {isSubmitting
                        ? leadForm.fields.submittingText
                        : leadForm.fields.submitButtonText}
                    </span>
                  </button>

                  {/* Privacy Note */}
                  <p className="flex items-center justify-center gap-1.5 text-xs text-slate-500 text-center pt-1">
                    <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{leadForm.fields.privacyNote}</span>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
