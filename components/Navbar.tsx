'use client';

import { Menu, PhoneCall, Wrench, X } from 'lucide-react';
import { useState } from 'react';
import type { BusinessInfo } from '@/types';

interface NavbarProps {
  business: BusinessInfo;
}

export function Navbar({ business }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top Emergency Status Bar */}
      <div className="bg-brand-secondary text-slate-200 text-xs sm:text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <p className="font-medium tracking-wide flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse"
              aria-hidden="true"
            />
            <span>{business.tagline}</span>
          </p>
          <p className="hidden md:block text-slate-300 font-medium">
            {business.licenseNumber} &bull; {business.hours}
          </p>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary text-white shadow-md transition-transform group-hover:scale-105">
              <Wrench className="h-6 w-6" aria-hidden="true" />
            </span>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-brand-secondary leading-none">
                {business.name}
              </span>
              <span className="text-xs font-semibold text-brand-primary mt-1">
                {business.licenseNumber}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-8"
          >
            {business.navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-slate-700 hover:text-brand-primary transition-colors py-2"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Prominent Click-to-Call CTA & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={business.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-sm sm:text-base px-4 py-2.5 sm:px-5 sm:py-3 shadow-md hover:shadow-lg transition-all active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-primary"
            >
              <PhoneCall className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" aria-hidden="true" />
              <span>{business.ctaCallText}</span>
            </a>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              aria-label={business.mobileMenuAriaLabel}
              className="lg:hidden inline-flex items-center justify-center p-2.5 rounded-xl text-slate-700 hover:text-brand-primary hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Collapsible Drawer */}
      {isMobileMenuOpen && (
        <nav
          id="mobile-navigation-menu"
          aria-label="Mobile Navigation"
          className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl"
        >
          <ul className="space-y-1">
            {business.navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-lg px-4 py-3 text-base font-semibold text-slate-800 hover:bg-slate-100 hover:text-brand-primary transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2 px-2">
            <p className="text-xs font-medium text-slate-500">
              {business.hours}
            </p>
            <a
              href={business.phoneHref}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-secondary text-white font-bold py-3.5 px-4 shadow-sm"
            >
              <PhoneCall className="h-5 w-5 text-brand-accent" aria-hidden="true" />
              <span>{business.ctaCallText}</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

