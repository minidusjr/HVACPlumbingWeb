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
      className="relative overflow-hidden bg-brand-secondary py-10 text-white sm:py-16 lg:py-24"
    >
      {/* Modern Architectural Mesh & Grid Backdrop */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:36px_36px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgb(var(--color-primary)/0.28),transparent_55%),radial-gradient(circle_at_bottom_left,rgb(var(--color-accent)/0.12),transparent_50%)]"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Copy, CTAs & Bento Trust Cards */}
          <div className="space-y-6 sm:space-y-8 lg:col-span-7">
            <Badge
              tone="accent-dark"
              icon={
                <span className="relative flex size-2 shrink-0" aria-hidden="true">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-accent opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-brand-accent" />
                </span>
              }
            >
              {hero.eyebrow}
            </Badge>

            <h1
              id="hero-heading"
              className="text-balance text-[1.85rem] font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl sm:leading-[1.08] lg:text-6xl"
            >
              {hero.headline}
            </h1>

            <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-lg lg:text-xl">
              {hero.subheadline}
            </p>

            {/* Tactile 3D CTA Buttons with Embedded Icon Chips */}
            <div className="flex flex-col gap-3.5 pt-1 sm:flex-row sm:items-center sm:gap-4">
              <ButtonLink
                href={hero.primaryCtaHref}
                size="lg"
                className="font-extrabold sm:pr-6"
              >
                <span>{hero.primaryCtaText}</span>
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-xl bg-white/20 shadow-inner transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-white/30">
                  <ArrowRight className="size-4 sm:size-5" aria-hidden="true" />
                </span>
              </ButtonLink>

              <ButtonLink
                href={business.phoneHref}
                variant="outline-light"
                size="lg"
                className="sm:pl-5"
              >
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-xl border border-brand-accent/30 bg-brand-accent/15 text-brand-accent">
                  <PhoneCall className="size-4" aria-hidden="true" />
                </span>
                <span>{business.phoneDisplay}</span>
              </ButtonLink>
            </div>

            <p className="text-center text-xs font-medium text-slate-400 sm:text-left sm:text-sm">
              {hero.secondaryCtaText}
            </p>

            {/* Glass Bento Trust Badge Boxes */}
            <dl className="grid grid-cols-1 gap-3.5 pt-4 sm:grid-cols-3 sm:gap-4">
              {hero.trustBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.09] to-white/[0.03] p-4 backdrop-blur-md shadow-[0_1px_0_0_rgba(255,255,255,0.18)_inset,0_12px_28px_-8px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary/50 hover:from-white/[0.13] hover:to-white/[0.05] hover:shadow-[0_1px_0_0_rgba(255,255,255,0.28)_inset,0_18px_36px_-8px_rgba(0,0,0,0.45)]"
                >
                  {/* Top Specular Highlight Line */}
                  <div
                    className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
                    aria-hidden="true"
                  />

                  <div className="flex items-center gap-3.5 sm:flex-col sm:items-start sm:gap-3 xl:flex-row xl:items-center">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-gradient-to-br from-brand-primary/35 to-brand-primary/10 text-brand-accent shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset] transition-transform duration-300 group-hover:scale-110">
                      <IconRenderer name={badge.icon} className="size-5" />
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
                </div>
              ))}
            </dl>
          </div>

          {/* Right Column: Framed Glass Visual & Floating Social Proof */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Frosted Frame */}
              <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-white/10 to-white/[0.02] p-2 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-md sm:rounded-[28px] sm:p-2.5">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
                  <Image
                    src={hero.image.src}
                    alt={hero.image.alt}
                    width={800}
                    height={600}
                    preload
                    loading="eager"
                    fetchPriority="high"
                    unoptimized={hero.image.src.endsWith('.svg')}
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>

              {/* Floating Frosted Verification Card */}
              <div className="mt-3.5 flex items-center justify-between gap-3 rounded-2xl border border-white/80 bg-white/95 p-4 text-slate-900 shadow-[0_20px_40px_-12px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:absolute sm:-bottom-6 sm:left-5 sm:right-5 sm:mt-0 sm:p-5">
                <div className="min-w-0">
                  <p className="text-sm font-extrabold leading-tight text-brand-secondary sm:text-base">
                    {hero.image.badgeTitle}
                  </p>
                  <p className="mt-0.5 text-xs font-medium leading-snug text-slate-600 sm:text-sm">
                    {hero.image.badgeSubtitle}
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center rounded-full border border-amber-200 bg-gradient-to-b from-amber-50 to-amber-100 px-3 py-1 text-xs font-extrabold text-amber-900 shadow-sm">
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
