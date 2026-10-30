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
      <div className="bg-brand-secondary text-slate-200 text-[11px] sm:text-sm py-1.5 sm:py-2 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-between gap-2">
          <p className="font-medium tracking-wide flex items-center gap-1.5 truncate">
            <span
              className="inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-400 animate-pulse"
              aria-hidden="true"
            />
            <span className="truncate">{business.tagline}</span>
          </p>
          <p className="hidden md:block text-slate-300 font-medium shrink-0">
            {business.licenseNumber} &bull; {business.hours}
          </p>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 sm:gap-3 min-w-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg"
          >
            <span className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary text-white shadow-md transition-transform group-hover:scale-105">
              <Wrench className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
            </span>
            <div className="flex flex-col min-w-0">
              <span className="text-base sm:text-xl font-extrabold tracking-tight text-brand-secondary leading-tight truncate">
                {business.name}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-brand-primary truncate mt-0.5">
                {business.licenseNumber}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-8 shrink-0"
          >
            {business.navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-slate-700 hover:text-brand-primary transition-colors py-2 whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Prominent Click-to-Call CTA (Icon-only on mobile, Full button on sm+) & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href={business.phoneHref}
              aria-label={business.ctaCallText}
              title={business.ctaCallText}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-sm sm:text-base h-11 w-11 sm:h-auto sm:w-auto sm:px-5 sm:py-3 shadow-md hover:shadow-lg transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-primary whitespace-nowrap"
            >
              <PhoneCall className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline">{business.ctaCallText}</span>
            </a>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              aria-label={business.mobileMenuAriaLabel}
              className="lg:hidden inline-flex items-center justify-center h-11 w-11 rounded-xl border border-slate-200 text-slate-700 hover:text-brand-primary hover:bg-slate-100 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
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
          className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-2xl"
        >
          <ul className="space-y-1">
            {business.navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base font-bold text-slate-800 hover:bg-slate-100 hover:text-brand-primary transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5 px-1">
            <p className="text-xs font-medium text-slate-500 text-center">
              {business.hours}
            </p>
            <a
              href={business.phoneHref}
              className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-brand-primary text-white font-extrabold py-3.5 px-4 shadow-md active:scale-[0.99]"
            >
              <PhoneCall className="h-5 w-5" aria-hidden="true" />
              <span>{business.ctaCallText}</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
