import { ArrowUpRight } from 'lucide-react';
import type { ServicesSection } from '@/types';
import { IconRenderer } from './IconRenderer';
import { Container } from './ui/Container';
import { SectionHeading } from './ui/SectionHeading';

interface ServicesGridProps {
  services: ServicesSection;
  ctaHref: string;
}

export function ServicesGrid({ services, ctaHref }: ServicesGridProps) {
  return (
    <section
      id={services.id}
      aria-labelledby="services-heading"
      className="relative scroll-mt-24 overflow-hidden bg-slate-50/60 py-14 sm:py-24"
    >
      {/* Subtle Top Radial Wash */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-white to-transparent"
        aria-hidden="true"
      />

      <Container className="relative">
        <SectionHeading
          id="services-heading"
          eyebrow={services.eyebrow}
          title={services.heading}
          description={services.subheading}
        />

        {/* Modern Bento Feature Grid */}
        <ul className="mt-10 grid grid-cols-1 gap-5 sm:mt-16 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {services.items.map((service, idx) => (
            <li key={service.id}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-b from-white via-white to-slate-50/90 p-6 shadow-[0_1px_0_0_rgba(255,255,255,1)_inset,0_10px_30px_-10px_rgba(15,23,42,0.07),0_2px_6px_-1px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-primary/40 hover:shadow-[0_1px_0_0_rgba(255,255,255,1)_inset,0_24px_48px_-12px_rgb(var(--color-primary)/0.16),0_4px_12px_-2px_rgba(15,23,42,0.06)] sm:p-8">
                {/* Ambient Corner Glow on Hover */}
                <div
                  className="pointer-events-none absolute -right-12 -top-12 size-36 rounded-full bg-brand-primary/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />

                {/* Top Icon + Subtle Index Pill */}
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex size-13 shrink-0 items-center justify-center rounded-2xl border border-white/25 bg-gradient-to-br from-brand-primary to-brand-primary-hover p-3.5 text-white shadow-[0_1px_0_0_rgba(255,255,255,0.35)_inset,0_10px_20px_-5px_rgb(var(--color-primary)/0.45)] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                    <IconRenderer name={service.icon} className="size-6" />
                  </span>
                  <span
                    className="rounded-full border border-slate-200/80 bg-slate-100/80 px-2.5 py-1 text-[11px] font-extrabold tracking-widest text-slate-600 transition-colors group-hover:border-brand-primary/25 group-hover:bg-brand-primary/10 group-hover:text-brand-primary"
                    aria-hidden="true"
                  >
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-extrabold leading-snug tracking-tight text-brand-secondary transition-colors group-hover:text-brand-primary sm:mt-6 sm:text-xl">
                  {service.title}
                </h3>

                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-600 sm:mt-3 sm:text-base">
                  {service.description}
                </p>

                {/* Interactive Pill Action Bar */}
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <a
                    href={ctaHref}
                    className="inline-flex items-center gap-2 text-sm font-extrabold text-brand-secondary transition-colors group-hover:text-brand-primary after:absolute after:inset-0 after:rounded-3xl focus:outline-none focus-visible:after:ring-2 focus-visible:after:ring-brand-primary"
                  >
                    <span>{service.ctaText}</span>
                  </a>
                  <span
                    className="inline-flex size-8 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition-all duration-300 group-hover:border-brand-primary group-hover:bg-brand-primary group-hover:text-white group-hover:shadow-md"
                    aria-hidden="true"
                  >
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
