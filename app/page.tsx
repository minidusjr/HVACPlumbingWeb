import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { LeadForm } from '@/components/LeadForm';
import { Navbar } from '@/components/Navbar';
import { ServicesGrid } from '@/components/ServicesGrid';
import { Testimonials } from '@/components/Testimonials';
import rawData from '@/config/data.json';
import type { SiteConfig } from '@/types';

const siteConfig = rawData as SiteConfig;

export default function HomePage() {
  const { business, hero, services, testimonials, leadForm, footer } =
    siteConfig;

  return (
    <>
      <Navbar business={business} />
      <main id="main-content" className="flex-1">
        <Hero hero={hero} business={business} />
        <ServicesGrid
          services={services}
          ctaHref={hero.primaryCtaHref}
        />
        <Testimonials testimonials={testimonials} />
        <LeadForm
          leadForm={leadForm}
          services={services.items}
          business={business}
        />
      </main>
      <Footer business={business} footer={footer} />
    </>
  );
}

