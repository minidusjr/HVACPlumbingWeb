import { ArrowRight, BadgeCheck, Quote, Star } from 'lucide-react';
import type { TestimonialsSection } from '@/types';
import { Badge } from './ui/Badge';
import { Container } from './ui/Container';
import { SectionHeading } from './ui/SectionHeading';
import { StarRating } from './ui/StarRating';

interface TestimonialsProps {
  testimonials: TestimonialsSection;
}

/** "Marcus & Elena Vance" -> "MV" (lightweight avatar, no image requests) */
function getInitials(name: string): string {
  const words = name.replace(/[^a-zA-Z\s]/g, ' ').trim().split(/\s+/);
  const first = words[0]?.[0] ?? '';
  const last = words.length > 1 ? words[words.length - 1][0] : '';
  return `${first}${last}`.toUpperCase();
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section
      id={testimonials.id}
      aria-labelledby="testimonials-heading"
      className="relative scroll-mt-24 overflow-hidden bg-brand-secondary py-12 text-white sm:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.12),transparent_55%)]"
        aria-hidden="true"
      />

      <Container className="relative">
        <SectionHeading
          id="testimonials-heading"
          tone="dark"
          eyebrow={testimonials.eyebrow}
          title={testimonials.heading}
          description={testimonials.subheading}
          badge={
            <Badge
              tone="accent-dark"
              icon={<Star className="size-4 shrink-0 fill-current" aria-hidden="true" />}
            >
              {testimonials.averageRatingText}
            </Badge>
          }
        />

        {/* HyperUI Reviews: swipeable on phones, 3-column grid from md */}
        <div
          role="region"
          aria-label={testimonials.heading}
          tabIndex={0}
          className="scrollbar-none -mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 focus:outline-none sm:-mx-6 sm:mt-16 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:gap-8"
        >
          {testimonials.items.map((review) => (
            <blockquote
              key={review.id}
              className="flex w-[85%] shrink-0 snap-center flex-col rounded-2xl border border-slate-700 bg-slate-800/90 p-5 shadow-lg sm:w-[60%] sm:p-8 md:w-auto"
            >
              <div className="flex items-center gap-4">
                <span
                  className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-primary text-sm font-extrabold text-white ring-2 ring-white/10 sm:size-14 sm:text-base"
                  aria-hidden="true"
                >
                  {getInitials(review.author)}
                </span>
                <div className="min-w-0 flex-1">
                  <StarRating rating={review.rating} />
                  <p className="mt-1 truncate text-base font-bold capitalize text-white">
                    {review.author}
                  </p>
                </div>
                <Quote
                  className="size-7 shrink-0 self-start text-slate-600"
                  aria-hidden="true"
                />
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-200 sm:text-base">
                &ldquo;{review.comment}&rdquo;
              </p>

              <footer className="mt-5 space-y-3 border-t border-slate-700/80 pt-4">
                <Badge tone="primary-dark" size="sm">
                  {review.servicePerformed}
                </Badge>
                <div className="flex items-center justify-between gap-2 text-xs">
                  <cite className="truncate not-italic text-slate-400">
                    {review.neighborhood} &bull; {review.date}
                  </cite>
                  <span className="inline-flex shrink-0 items-center gap-1 font-semibold text-emerald-400">
                    <BadgeCheck className="size-4" aria-hidden="true" />
                    {testimonials.verifiedLabel}
                  </span>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs font-medium text-slate-400 md:hidden">
          {testimonials.swipeHint}
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </p>
      </Container>
    </section>
  );
}
