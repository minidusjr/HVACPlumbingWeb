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
      <span className="mt-0.5 shrink-0 text-brand-primary">{icon}</span>
      <span className="min-w-0">{children}</span>
    </li>
  );
}

export function Footer({ business, footer }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const iconClass = 'size-4 sm:size-5';

  return (
    <footer
      id="service-areas"
      aria-label="Site Footer and Local Service Areas"
      className="scroll-mt-24 border-t border-slate-800 bg-brand-secondary text-slate-300"
    >
      {/* HyperUI CTA strip */}
      <div className="bg-brand-primary py-5 text-white sm:py-6">
        <Container className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-balance text-sm font-extrabold tracking-tight sm:text-lg">
            {footer.emergencyBannerText}
          </p>
          <ButtonLink
            href={business.phoneHref}
            variant="dark"
            size="md"
            className="w-full shrink-0 whitespace-nowrap sm:w-auto"
          >
            <PhoneCall className="size-4 shrink-0 text-brand-accent" aria-hidden="true" />
            <span>{business.ctaCallText}</span>
          </ButtonLink>
        </Container>
      </div>

      {/* HyperUI multi-column footer */}
      <Container className="py-10 sm:py-16">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary text-white">
                <Wrench className="size-5" aria-hidden="true" />
              </span>
              <span className="text-lg font-extrabold text-white sm:text-xl">
                {business.name}
              </span>
            </div>
            <p className="max-w-sm text-xs leading-relaxed text-slate-400 sm:text-sm">
              {footer.description}
            </p>
            <p className="inline-block rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-bold text-brand-accent">
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
                <ContactRow icon={<MapPin className={iconClass} aria-hidden="true" />}>
                  {business.address}
                </ContactRow>
                <ContactRow icon={<PhoneCall className={iconClass} aria-hidden="true" />}>
                  <a
                    href={business.phoneHref}
                    className="font-bold text-white transition hover:text-brand-accent"
                  >
                    {business.phoneDisplay}
                  </a>
                </ContactRow>
                <ContactRow icon={<Mail className={iconClass} aria-hidden="true" />}>
                  <a
                    href={`mailto:${business.email}`}
                    className="break-all transition hover:text-white"
                  >
                    {business.email}
                  </a>
                </ContactRow>
                <ContactRow icon={<Clock className={iconClass} aria-hidden="true" />}>
                  {business.hours}
                </ContactRow>
              </ul>
            </address>
          </div>

          {/* Service areas */}
          <div className="space-y-4 md:col-span-2 lg:col-span-4">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-white sm:text-sm">
              {footer.serviceAreasHeading}
            </h2>
            <ul className="grid grid-cols-2 gap-2 text-xs text-slate-300 sm:text-sm md:grid-cols-3 lg:grid-cols-2">
              {footer.serviceAreas.map((area) => (
                <li
                  key={area}
                  className="flex min-w-0 items-center gap-2 rounded-lg border border-slate-800 bg-slate-800/60 px-2.5 py-1.5"
                >
                  <span
                    className="size-1.5 shrink-0 rounded-full bg-brand-accent"
                    aria-hidden="true"
                  />
                  <span className="truncate">{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col-reverse items-center justify-between gap-4 border-t border-slate-800 pt-6 text-center text-xs text-slate-400 sm:mt-12 sm:flex-row sm:pt-8 sm:text-left">
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
