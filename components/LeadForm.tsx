import { CheckCircle2, PhoneCall } from 'lucide-react';
import type { BusinessInfo, LeadFormSection, ServiceItem } from '@/types';
import { LeadFormClient } from './LeadFormClient';
import { ButtonLink } from './ui/Button';
import { Container } from './ui/Container';
import { SectionHeading } from './ui/SectionHeading';

interface LeadFormProps {
  leadForm: LeadFormSection;
  services: ServiceItem[];
  business: BusinessInfo;
}

export function LeadForm({ leadForm, services, business }: LeadFormProps) {
  return (
    <section
      id={leadForm.id}
      aria-labelledby="lead-form-heading"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-slate-100/80 via-slate-50 to-white py-14 sm:py-24"
    >
      <Container className="relative">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-x-14 lg:gap-y-8">
          {/* Heading (Server-Rendered — 0 KB Client JS) */}
          <div className="lg:col-span-2">
            <SectionHeading
              id="lead-form-heading"
              align="left"
              eyebrow={leadForm.eyebrow}
              title={leadForm.heading}
              description={leadForm.subheading}
            />
          </div>

          {/* Double-Bezel Elevated Form Box */}
          <div className="lg:col-span-3 lg:col-start-3 lg:row-span-2 lg:row-start-1">
            <div className="rounded-[28px] border border-slate-200/80 bg-gradient-to-b from-white/90 to-slate-100/70 p-2 shadow-[0_24px_60px_-15px_rgba(15,23,42,0.12),0_4px_12px_-2px_rgba(15,23,42,0.05)] backdrop-blur-md sm:rounded-[32px] sm:p-3">
              <div className="rounded-3xl border border-slate-200/70 bg-white p-5 shadow-[0_1px_0_0_rgba(255,255,255,1)_inset] sm:p-9">
                <LeadFormClient
                  leadForm={leadForm}
                  services={services}
                  business={business}
                />
              </div>
            </div>
          </div>

          {/* Bento Highlight Pills & Glass Dispatch Box (Server-Rendered — 0 KB Client JS) */}
          <div className="space-y-5 lg:col-span-2 lg:col-start-1">
            <ul className="space-y-2.5">
              {leadForm.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm font-bold text-slate-800 shadow-[0_1px_0_0_rgba(255,255,255,1)_inset,0_4px_12px_-4px_rgba(15,23,42,0.05)] backdrop-blur-sm"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                    <CheckCircle2 className="size-4" aria-hidden="true" />
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            <aside
              aria-label="Direct Emergency Dispatch Phone"
              className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-brand-secondary via-slate-900 to-slate-950 p-6 text-white shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_20px_40px_-15px_rgba(15,23,42,0.5)]"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-brand-primary/25 blur-2xl"
                aria-hidden="true"
              />
              <p className="relative text-xs font-extrabold uppercase tracking-wider text-brand-accent">
                {business.hours}
              </p>
              <p className="relative mt-1.5 text-base font-extrabold text-white sm:text-lg">
                {business.tagline}
              </p>
              <ButtonLink
                href={business.phoneHref}
                size="md"
                className="relative mt-4 w-full whitespace-nowrap font-extrabold sm:w-auto"
              >
                <PhoneCall className="size-4 shrink-0" aria-hidden="true" />
                <span>{business.ctaCallText}</span>
              </ButtonLink>
            </aside>
          </div>
        </div>
      </Container>
    </section>
  );
}
