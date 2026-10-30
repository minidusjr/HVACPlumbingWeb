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
      className="relative scroll-mt-24 overflow-hidden bg-brand-secondary py-14 text-white sm:py-24"
    >
      {/* Subtle Architectural Grid & Ambient Glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:40px_40px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgb(var(--color-accent)/0.14),transparent_55%),radial-gradient(circle_at_top_right,rgb(var(--color-primary)/0.2),transparent_50%)]"
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

        {/* Glassmorphism Review Bento Cards (Swipeable on phones, 3-col on md+) */}
        <div
          role="region"
          aria-label={testimonials.heading}
          tabIndex={0}
          className="scrollbar-none -mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 focus:outline-none sm:-mx-6 sm:mt-16 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:gap-8"
        >
          {testimonials.items.map((review) => (
            <blockquote
              key={review.id}
              className="group relative flex w-[86%] shrink-0 snap-center flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.09] to-white/[0.03] p-6 backdrop-blur-md shadow-[0_1px_0_0_rgba(255,255,255,0.18)_inset,0_20px_40px_-15px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/40 hover:from-white/[0.12] hover:to-white/[0.05] sm:w-[60%] sm:p-8 md:w-auto"
            >
              {/* Top Specular Highlight Line */}
              <div
                className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
                aria-hidden="true"
              />

              <div className="flex items-center gap-4">
                <span
                  className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-white/25 bg-gradient-to-br from-brand-primary to-brand-primary-hover text-sm font-extrabold text-white shadow-[0_1px_0_0_rgba(255,255,255,0.35)_inset,0_8px_16px_-4px_rgb(var(--color-primary)/0.45)] sm:size-13 sm:text-base"
                  aria-hidden="true"
                >
                  {getInitials(review.author)}
                </span>
                <div className="min-w-0 flex-1">
                  <StarRating rating={review.rating} />
                  <p className="mt-1 truncate text-base font-extrabold capitalize text-white">
                    {review.author}
                  </p>
                </div>
                <Quote
                  className="size-8 shrink-0 self-start text-white/15 transition-colors group-hover:text-brand-accent/40"
                  aria-hidden="true"
                />
              </div>

              <p className="mt-5 flex-1 text-sm leading-relaxed text-slate-200/95 sm:text-base">
                &ldquo;{review.comment}&rdquo;
              </p>

              <footer className="mt-6 space-y-3.5 border-t border-white/10 pt-4">
                <Badge tone="primary-dark" size="sm">
                  {review.servicePerformed}
                </Badge>
                <div className="flex items-center justify-between gap-2 text-xs">
                  <cite className="truncate not-italic font-medium text-slate-400">
                    {review.neighborhood} &bull; {review.date}
                  </cite>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-0.5 font-bold text-emerald-300">
                    <BadgeCheck className="size-3.5" aria-hidden="true" />
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
