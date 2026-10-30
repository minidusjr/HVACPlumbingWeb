import { ArrowUpRight } from 'lucide-react';
import type { ServicesSection } from '@/types';
import { IconRenderer } from './IconRenderer';

interface ServicesGridProps {
  services: ServicesSection;
  ctaHref: string;
}

export function ServicesGrid({ services, ctaHref }: ServicesGridProps) {
  return (
    <section
      id={services.id}
      aria-labelledby="services-heading"
      className="py-12 sm:py-24 bg-white scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-4">
          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-brand-primary">
            {services.eyebrow}
          </p>
          <h2
            id="services-heading"
            className="text-2xl sm:text-4xl font-extrabold tracking-tight text-brand-secondary text-balance"
          >
            {services.heading}
          </h2>
          <p className="text-sm sm:text-lg text-slate-600 leading-relaxed">
            {services.subheading}
          </p>
        </div>

        {/* Responsive Service Cards Grid */}
        <div className="mt-8 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {services.items.map((service) => (
            <article
              key={service.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-8 shadow-sm transition-all duration-200 sm:hover:-translate-y-1 hover:border-brand-primary hover:bg-white hover:shadow-xl"
            >
              <div>
                <div className="flex items-center gap-4 sm:block">
                  <div className="inline-flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-primary text-white shadow-md transition-transform group-hover:scale-105">
                    <IconRenderer name={service.icon} className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>

                  <h3 className="sm:mt-6 text-lg sm:text-xl font-bold text-brand-secondary group-hover:text-brand-primary transition-colors leading-snug">
                    {service.title}
                  </h3>
                </div>

                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-slate-200/80">
                <a
                  href={ctaHref}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-primary hover:text-brand-primary-hover transition-colors py-1"
                >
                  <span>{service.ctaText}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
