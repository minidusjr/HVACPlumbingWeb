import { Clock, Mail, MapPin, PhoneCall, Wrench } from 'lucide-react';
import type { BusinessInfo, FooterSection } from '@/types';

interface FooterProps {
  business: BusinessInfo;
  footer: FooterSection;
}

export function Footer({ business, footer }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="service-areas"
      aria-label="Site Footer and Local Service Areas"
      className="bg-brand-secondary text-slate-300 border-t border-slate-800 scroll-mt-20"
    >
      {/* Top Emergency Callout Strip */}
      <div className="bg-brand-primary text-white py-5 sm:py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3.5 sm:gap-4 text-center sm:text-left">
          <p className="text-sm sm:text-lg font-extrabold tracking-tight text-balance">
            {footer.emergencyBannerText}
          </p>
          <a
            href={business.phoneHref}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-brand-secondary hover:bg-slate-900 text-white font-bold text-sm sm:text-base px-6 py-3.5 sm:py-3 shadow-md transition-colors shrink-0 active:scale-[0.99]"
          >
            <PhoneCall
              className="h-4 w-4 text-brand-accent shrink-0"
              aria-hidden="true"
            />
            <span>{business.ctaCallText}</span>
          </a>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10">
          {/* Column 1: Brand Info & License */}
          <div className="lg:col-span-4 space-y-3.5 sm:space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary text-white">
                <Wrench className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-lg sm:text-xl font-extrabold text-white">
                {business.name}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {footer.description}
            </p>

            <p className="inline-block rounded-lg bg-slate-800 border border-slate-700 px-3 py-1.5 text-xs font-bold text-brand-accent">
              {business.licenseNumber}
            </p>
          </div>

          {/* Column 2: Contact Details */}
          <div className="lg:col-span-4 space-y-3.5 sm:space-y-4">
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white">
              {footer.contactHeading}
            </h2>
            <address className="not-italic space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
              <p className="flex items-start gap-3">
                <MapPin
                  className="h-4 w-4 sm:h-5 sm:w-5 text-brand-primary shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>{business.address}</span>
              </p>
              <p className="flex items-center gap-3">
                <PhoneCall
                  className="h-4 w-4 sm:h-5 sm:w-5 text-brand-primary shrink-0"
                  aria-hidden="true"
                />
                <a
                  href={business.phoneHref}
                  className="font-bold text-white hover:text-brand-accent transition-colors"
                >
                  {business.phoneDisplay}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Mail
                  className="h-4 w-4 sm:h-5 sm:w-5 text-brand-primary shrink-0"
                  aria-hidden="true"
                />
                <a
                  href={`mailto:${business.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {business.email}
                </a>
              </p>
              <p className="flex items-start gap-3">
                <Clock
                  className="h-4 w-4 sm:h-5 sm:w-5 text-brand-primary shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>{business.hours}</span>
              </p>
            </address>
          </div>

          {/* Column 3: Local Service Areas */}
          <div className="lg:col-span-4 space-y-3.5 sm:space-y-4">
            <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white">
              {footer.serviceAreasHeading}
            </h2>
            <ul className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-slate-300">
              {footer.serviceAreas.map((area) => (
                <li
                  key={area}
                  className="flex items-center gap-2 rounded-lg bg-slate-800/60 px-2.5 py-1.5 border border-slate-800 truncate"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-brand-accent shrink-0"
                    aria-hidden="true"
                  />
                  <span className="truncate">{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Quick Navigation */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-800 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
          <p>
            &copy; {currentYear} {footer.copyrightText}
          </p>
          <nav aria-label="Footer Quick Links" className="flex flex-wrap justify-center gap-5 sm:gap-6">
            {business.navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-white transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
