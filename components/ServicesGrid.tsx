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
      className="scroll-mt-24 bg-white py-12 sm:py-24"
    >
      <Container>
        <SectionHeading
          id="services-heading"
          eyebrow={services.eyebrow}
          title={services.heading}
          description={services.subheading}
        />

        {/* HyperUI Feature Grid */}
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:mt-16 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {services.items.map((service) => (
            <li key={service.id}>
              <article className="group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50/70 p-5 shadow-sm transition hover:border-brand-primary/40 hover:bg-white hover:shadow-xl hover:ring-1 hover:ring-brand-primary/20 sm:p-8">
                <div className="flex items-center gap-4 sm:flex-col sm:items-start">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-primary text-white shadow-md transition group-hover:scale-105 sm:size-14">
                    <IconRenderer name={service.icon} className="size-6 sm:size-7" />
                  </span>
                  <h3 className="text-lg font-bold leading-snug text-brand-secondary transition group-hover:text-brand-primary sm:text-xl">
                    {service.title}
                  </h3>
                </div>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 sm:mt-4 sm:text-base">
                  {service.description}
                </p>

                <div className="mt-5 border-t border-slate-200/80 pt-4 sm:mt-6">
                  {/* Stretched link: the whole card is one large tap target */}
                  <a
                    href={ctaHref}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-primary after:absolute after:inset-0 after:rounded-2xl focus:outline-none focus-visible:after:ring-2 focus-visible:after:ring-brand-primary"
                  >
                    <span>{service.ctaText}</span>
                    <ArrowUpRight
                      className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
