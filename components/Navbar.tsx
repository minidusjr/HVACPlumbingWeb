'use client';

import { Menu, PhoneCall, Wrench, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { BusinessInfo } from '@/types';
import { Button, ButtonLink } from './ui/Button';
import { Container } from './ui/Container';

interface NavbarProps {
  business: BusinessInfo;
}

export function Navbar({ business }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close the mobile menu with the Escape key
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* HyperUI Announcement Banner */}
      <div className="bg-brand-secondary py-2 text-white">
        <Container className="flex items-center justify-center gap-3 sm:justify-between">
          <p className="flex min-w-0 items-center gap-2 text-xs font-medium sm:text-sm">
            <span
              className="relative flex size-2 shrink-0"
              aria-hidden="true"
            >
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            <span className="truncate">{business.tagline}</span>
          </p>
          <p className="hidden shrink-0 text-sm text-slate-300 md:block">
            {business.hours}
          </p>
        </Container>
      </div>

      {/* HyperUI Header */}
      <div className="border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md">
        <Container className="flex h-16 items-center gap-4 sm:h-20 lg:gap-8">
          {/* Brand */}
          <a
            href="#"
            className="group flex min-w-0 items-center gap-2.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary sm:gap-3"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary text-white shadow-md transition group-hover:scale-105 sm:size-11">
              <Wrench className="size-5 sm:size-6" aria-hidden="true" />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-base font-extrabold leading-tight tracking-tight text-brand-secondary sm:text-xl">
                {business.name}
              </span>
              <span className="mt-0.5 truncate text-[11px] font-semibold text-brand-primary sm:text-xs">
                {business.licenseNumber}
              </span>
            </span>
          </a>

          <div className="flex flex-1 items-center justify-end gap-4 lg:justify-between">
            {/* Desktop Navigation */}
            <nav aria-label="Primary Navigation" className="hidden lg:block">
              <ul className="flex items-center gap-6 text-sm xl:gap-8">
                {business.navigation.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="whitespace-nowrap font-semibold text-slate-600 transition hover:text-brand-primary"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              {/* Icon-only on phones, full button from sm+ */}
              <ButtonLink
                href={business.phoneHref}
                aria-label={business.ctaCallText}
                size="icon"
                className="sm:hidden"
              >
                <PhoneCall className="size-5" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink
                href={business.phoneHref}
                size="md"
                className="hidden whitespace-nowrap sm:inline-flex"
              >
                <PhoneCall className="size-5" aria-hidden="true" />
                <span>{business.ctaCallText}</span>
              </ButtonLink>

              <Button
                variant="soft"
                size="icon"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation-menu"
                aria-label={business.mobileMenuAriaLabel}
                className="lg:hidden"
              >
                {isMobileMenuOpen ? (
                  <X className="size-6" aria-hidden="true" />
                ) : (
                  <Menu className="size-6" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>
        </Container>

        {/* HyperUI Dropdown Menu Panel (mobile & tablet) */}
        {isMobileMenuOpen && (
          <nav
            id="mobile-navigation-menu"
            aria-label="Mobile Navigation"
            className="border-t border-slate-100 bg-white shadow-xl lg:hidden"
          >
            <Container className="py-4">
              <ul className="space-y-1">
                {business.navigation.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={closeMenu}
                      className="block rounded-lg px-4 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-brand-primary"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
                <p className="text-center text-xs font-medium text-slate-500">
                  {business.hours}
                </p>
                <ButtonLink
                  href={business.phoneHref}
                  onClick={closeMenu}
                  size="lg"
                  fullWidth
                >
                  <PhoneCall className="size-5" aria-hidden="true" />
                  <span>{business.ctaCallText}</span>
                </ButtonLink>
              </div>
            </Container>
          </nav>
        )}
      </div>
    </header>
  );
}
