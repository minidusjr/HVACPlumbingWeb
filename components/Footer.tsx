import { Clock, Mail, MapPin, PhoneCall, Wrench } from 'lucide-react';
import type { ReactNode } from 'react';
import type { BusinessInfo, FooterSection } from '@/types';
import { ButtonLink } from './ui/Button';
import { Container } from './ui/Container';

interface FooterProps {
  business: BusinessInfo;
  footer: FooterSection;
}

function ContactRow({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-brand-primary">
        {icon}
      </span>
      <span className="min-w-0 pt-0.5">{children}</span>
    </li>
  );
}

export function Footer({ business, footer }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const iconClass = 'size-4';

  return (
    <footer
      id="service-areas"
      aria-label="Site Footer and Local Service Areas"
      className="scroll-mt-24 border-t border-slate-800 bg-brand-secondary text-slate-300"
    >
      {/* Floating Bento Emergency Callout Banner */}
      <Container className="pt-8 sm:pt-12">
        <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-r from-brand-primary via-brand-primary to-brand-primary-hover p-6 text-white shadow-[0_1px_0_0_rgba(255,255,255,0.35)_inset,0_20px_45px_-15px_rgb(var(--color-primary)/0.55)] sm:px-8 sm:py-7">
          <div
            className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-white/15 blur-2xl"
            aria-hidden="true"
          />
          <div className="relative flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-balance text-base font-extrabold tracking-tight sm:text-xl">
              {footer.emergencyBannerText}
            </p>
            <ButtonLink
              href={business.phoneHref}
              variant="dark"
              size="md"
              className="w-full shrink-0 whitespace-nowrap sm:w-auto"
            >
              <PhoneCall
                className="size-4 shrink-0 text-brand-accent"
                aria-hidden="true"
              />
              <span>{business.ctaCallText}</span>
            </ButtonLink>
          </div>
        </div>
      </Container>

      {/* Multi-Column Footer */}
      <Container className="py-10 sm:py-16">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br from-brand-primary to-brand-primary-hover text-white shadow-[0_1px_0_0_rgba(255,255,255,0.3)_inset,0_8px_16px_-4px_rgb(var(--color-primary)/0.45)]">
                <Wrench className="size-5" aria-hidden="true" />
              </span>
              <span className="text-lg font-extrabold text-white sm:text-xl">
                {business.name}
              </span>
            </div>
            <p className="max-w-sm text-xs leading-relaxed text-slate-400 sm:text-sm">
              {footer.description}
            </p>
            <p className="inline-block rounded-xl border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-xs font-bold text-brand-accent shadow-[0_1px_0_0_rgba(255,255,255,0.12)_inset]">
              {business.licenseNumber}
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4 lg:col-span-4">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-white sm:text-sm">
              {footer.contactHeading}
            </h2>
            <address className="not-italic">
              <ul className="space-y-3 text-xs sm:text-sm">
                <ContactRow
                  icon={<MapPin className={iconClass} aria-hidden="true" />}
                >
                  {business.address}
                </ContactRow>
                <ContactRow
                  icon={<PhoneCall className={iconClass} aria-hidden="true" />}
                >
                  <a
                    href={business.phoneHref}
                    className="font-bold text-white transition hover:text-brand-accent"
                  >
                    {business.phoneDisplay}
                  </a>
                </ContactRow>
                <ContactRow
                  icon={<Mail className={iconClass} aria-hidden="true" />}
                >
                  <a
                    href={`mailto:${business.email}`}
                    className="break-all transition hover:text-white"
                  >
                    {business.email}
                  </a>
                </ContactRow>
                <ContactRow
                  icon={<Clock className={iconClass} aria-hidden="true" />}
                >
                  {business.hours}
                </ContactRow>
              </ul>
            </address>
          </div>

          {/* Service Areas Bento Pills */}
          <div className="space-y-4 md:col-span-2 lg:col-span-4">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-white sm:text-sm">
              {footer.serviceAreasHeading}
            </h2>
            <ul className="grid grid-cols-2 gap-2 text-xs text-slate-300 sm:text-sm md:grid-cols-3 lg:grid-cols-2">
              {footer.serviceAreas.map((area) => (
                <li
                  key={area}
                  className="flex min-w-0 items-center gap-2 rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] px-3 py-2 shadow-[0_1px_0_0_rgba(255,255,255,0.1)_inset] transition-colors hover:border-brand-primary/40 hover:from-white/[0.11]"
                >
                  <span
                    className="size-1.5 shrink-0 rounded-full bg-brand-accent"
                    aria-hidden="true"
                  />
                  <span className="truncate font-medium">{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col-reverse items-center justify-between gap-4 border-t border-white/10 pt-6 text-center text-xs text-slate-400 sm:mt-12 sm:flex-row sm:pt-8 sm:text-left">
          <p>
            &copy; {currentYear} {footer.copyrightText}
          </p>
          <nav aria-label={footer.quickLinksHeading}>
            <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 sm:gap-x-6">
              {business.navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-medium transition hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
