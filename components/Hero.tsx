import { ArrowRight, PhoneCall } from 'lucide-react';
import Image from 'next/image';
import type { BusinessInfo, HeroSection } from '@/types';
import { IconRenderer } from './IconRenderer';
import { Badge } from './ui/Badge';
import { ButtonLink } from './ui/Button';
import { Container } from './ui/Container';

interface HeroProps {
  hero: HeroSection;
  business: BusinessInfo;
}

export function Hero({ hero, business }: HeroProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-brand-secondary py-8 text-white sm:py-16 lg:py-24"
    >
      {/* Decorative radial highlight */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.16),transparent_60%)]"
        aria-hidden="true"
      />

      <Container className="relative">
        {/* HyperUI split banner */}
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Copy, CTAs & trust badges */}
          <div className="space-y-5 sm:space-y-7 lg:col-span-7">
            <Badge
              tone="accent-dark"
              icon={
                <span
                  className="size-2 shrink-0 rounded-full bg-brand-accent"
                  aria-hidden="true"
                />
              }
            >
              {hero.eyebrow}
            </Badge>

            <h1
              id="hero-heading"
              className="text-balance text-[1.75rem] font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl sm:leading-[1.1] lg:text-6xl"
            >
              {hero.headline}
            </h1>

            <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-lg lg:text-xl">
              {hero.subheadline}
            </p>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:gap-4">
              <ButtonLink
                href={hero.primaryCtaHref}
                size="lg"
                className="rounded-xl font-extrabold shadow-xl shadow-black/25"
              >
                <span>{hero.primaryCtaText}</span>
                <ArrowRight
                  className="size-5 shrink-0 transition-transform group-hover:translate-x-1 sm:size-6"
                  aria-hidden="true"
                />
              </ButtonLink>

              <ButtonLink
                href={business.phoneHref}
                variant="outline-light"
                size="lg"
                className="rounded-xl"
              >
                <PhoneCall
                  className="size-5 shrink-0 text-brand-accent"
                  aria-hidden="true"
                />
                <span>{business.phoneDisplay}</span>
              </ButtonLink>
            </div>

            <p className="text-center text-xs font-medium text-slate-400 sm:text-left sm:text-sm">
              {hero.secondaryCtaText}
            </p>

            {/* HyperUI feature list: trust badges */}
            <dl className="grid grid-cols-1 gap-3 border-t border-white/15 pt-5 sm:grid-cols-3 sm:gap-4">
              {hero.trustBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3.5 transition hover:bg-white/[0.09] sm:flex-col sm:items-start sm:gap-3 sm:p-4 xl:flex-row xl:items-center"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-brand-primary/30 bg-brand-primary/20 text-brand-accent">
                    <IconRenderer name={badge.icon} className="size-5 sm:size-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <dt className="text-sm font-extrabold leading-snug text-white sm:text-[15px]">
                      {badge.title}
                    </dt>
                    <dd className="mt-0.5 text-xs font-medium leading-relaxed text-slate-300/90">
                      {badge.subtitle}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          {/* Visual & floating social proof */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="overflow-hidden rounded-2xl border-2 border-white/15 bg-slate-900 shadow-2xl sm:rounded-3xl">
                <Image
                  src={hero.image.src}
                  alt={hero.image.alt}
                  width={800}
                  height={600}
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="h-auto w-full object-cover"
                />
              </div>

              <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 text-slate-900 shadow-xl sm:absolute sm:-bottom-5 sm:left-6 sm:right-6 sm:mt-0 sm:p-5">
                <div className="min-w-0">
                  <p className="text-sm font-extrabold leading-tight text-brand-secondary sm:text-base">
                    {hero.image.badgeTitle}
                  </p>
                  <p className="mt-0.5 text-xs font-medium leading-snug text-slate-600 sm:text-sm">
                    {hero.image.badgeSubtitle}
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center rounded-full bg-amber-100 px-2.5 py-1 text-xs font-extrabold text-amber-900">
                  ★★★★★
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
