import { CheckCircle2, Quote, Star } from 'lucide-react';
import type { TestimonialsSection } from '@/types';

interface TestimonialsProps {
  testimonials: TestimonialsSection;
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section
      id={testimonials.id}
      aria-labelledby="testimonials-heading"
      className="py-12 sm:py-24 bg-brand-secondary text-white scroll-mt-20 relative overflow-hidden"
    >
      {/* Decorative Background Pattern */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.12),transparent_55%)]"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-brand-accent">
            <Star className="h-4 w-4 shrink-0 fill-current" aria-hidden="true" />
            <span className="leading-snug">{testimonials.averageRatingText}</span>
          </div>

          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-sky-300 pt-1 sm:pt-2">
            {testimonials.eyebrow}
          </p>

          <h2
            id="testimonials-heading"
            className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white text-balance"
          >
            {testimonials.heading}
          </h2>

          <p className="text-sm sm:text-lg text-slate-300 leading-relaxed">
            {testimonials.subheading}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-8 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
          {testimonials.items.map((review) => (
            <article
              key={review.id}
              className="flex flex-col justify-between rounded-2xl bg-slate-800/90 border border-slate-700 p-5 sm:p-8 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  {/* Star Rating */}
                  <div
                    className="flex items-center gap-1 text-brand-accent"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {Array.from({ length: review.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="h-4 w-4 sm:h-5 sm:w-5 fill-current"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <Quote
                    className="h-6 w-6 sm:h-8 sm:w-8 text-slate-600 shrink-0"
                    aria-hidden="true"
                  />
                </div>

                {/* Service Performed Tag */}
                <p className="mt-3.5 sm:mt-4 inline-block rounded-lg bg-brand-primary/20 border border-brand-primary/30 px-2.5 py-1 text-xs font-semibold text-sky-200">
                  {review.servicePerformed}
                </p>

                {/* Review Body */}
                <blockquote className="mt-3.5 sm:mt-4 text-sm sm:text-base text-slate-200 leading-relaxed">
                  &ldquo;{review.comment}&rdquo;
                </blockquote>
              </div>

              {/* Reviewer Footer */}
              <footer className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-slate-700/80 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white capitalize truncate">
                    {review.author}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {review.neighborhood} &bull; {review.date}
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  <span>Verified</span>
                </span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
