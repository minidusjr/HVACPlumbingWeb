import { ArrowRight, PhoneCall } from 'lucide-react';
import Image from 'next/image';
import type { BusinessInfo, HeroSection } from '@/types';
import { IconRenderer } from './IconRenderer';

interface HeroProps {
  hero: HeroSection;
  business: BusinessInfo;
}

export function Hero({ hero, business }: HeroProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-brand-secondary text-white py-12 sm:py-16 lg:py-24"
    >
      {/* Subtle Decorative Gradient Radial Highlight */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.16),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Primary Copy, CTAs & 3 Trust Badges */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-xs sm:text-sm font-semibold text-brand-accent">
              <span
                className="h-2 w-2 rounded-full bg-brand-accent"
                aria-hidden="true"
              />
              <span>{hero.eyebrow}</span>
            </div>

            <h1
              id="hero-heading"
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]"
            >
              {hero.headline}
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-2xl">
              {hero.subheadline}
            </p>

            {/* Massive Primary Call-to-Action Button & Direct Phone Link */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href={hero.primaryCtaHref}
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-brand-primary hover:bg-brand-primary-hover text-white font-extrabold text-lg sm:text-xl px-8 py-5 shadow-xl shadow-black/25 transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-accent"
              >
                <span>{hero.primaryCtaText}</span>
                <ArrowRight className="h-6 w-6 shrink-0" aria-hidden="true" />
              </a>

              <a
                href={business.phoneHref}
                className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-base sm:text-lg px-6 py-5 transition-colors"
              >
                <PhoneCall
                  className="h-5 w-5 text-brand-accent shrink-0"
                  aria-hidden="true"
                />
                <span>{business.phoneDisplay}</span>
              </a>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              {hero.secondaryCtaText} &bull; {business.hours}
            </p>

            {/* 3 Trust Badge Icons (Lucide) */}
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/15">
              {hero.trustBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-start gap-3.5 rounded-xl bg-white/5 p-4 border border-white/10"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-primary/25 text-brand-accent">
                    <IconRenderer name={badge.icon} className="h-6 w-6" />
                  </div>
                  <div>
                    <dt className="text-sm font-bold text-white">
                      {badge.title}
                    </dt>
                    <dd className="text-xs text-slate-300 mt-0.5">
                      {badge.subtitle}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          {/* Right Column: Optimized Next/Image Visual & Floating Social Proof */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="relative overflow-hidden rounded-3xl border-2 border-white/15 bg-slate-900 shadow-2xl">
                <Image
                  src={hero.image.src}
                  alt={hero.image.alt}
                  width={800}
                  height={600}
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Floating Verification Card */}
              <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-5 sm:left-6 sm:right-6 rounded-2xl bg-white text-slate-900 p-4 sm:p-5 shadow-xl border border-slate-200 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm sm:text-base font-extrabold text-brand-secondary">
                    {hero.image.badgeTitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    {hero.image.badgeSubtitle}
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-900">
                  ★★★★★
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

