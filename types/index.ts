export type IconName =
  | 'ShieldCheck'
  | 'Clock'
  | 'Award'
  | 'Wrench'
  | 'Droplets'
  | 'Flame'
  | 'AlertTriangle'
  | 'Search'
  | 'Pipette'
  | 'PhoneCall'
  | 'CheckCircle2'
  | 'MapPin'
  | 'Mail'
  | 'Star';

export interface ThemeConfig {
  primary: string;
  primaryHover: string;
  secondary: string;
  accent: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface BusinessInfo {
  name: string;
  tagline: string;
  phoneDisplay: string;
  phoneHref: string;
  email: string;
  address: string;
  licenseNumber: string;
  hours: string;
  ctaCallText: string;
  mobileMenuAriaLabel: string;
  navigation: NavigationItem[];
}

export interface TrustBadge {
  id: string;
  icon: IconName;
  title: string;
  subtitle: string;
}

export interface HeroImage {
  src: string;
  alt: string;
  badgeTitle: string;
  badgeSubtitle: string;
}

export interface HeroSection {
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  trustBadges: TrustBadge[];
  image: HeroImage;
}

export interface ServiceItem {
  id: string;
  icon: IconName;
  title: string;
  description: string;
  ctaText: string;
}

export interface ServicesSection {
  id: string;
  eyebrow: string;
  heading: string;
  subheading: string;
  items: ServiceItem[];
}

export interface ReviewItem {
  id: string;
  author: string;
  neighborhood: string;
  rating: number;
  date: string;
  servicePerformed: string;
  comment: string;
}

export interface TestimonialsSection {
  id: string;
  eyebrow: string;
  heading: string;
  subheading: string;
  averageRatingText: string;
  verifiedLabel: string;
  swipeHint: string;
  items: ReviewItem[];
}

export interface LeadFormFields {
  nameLabel: string;
  namePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  zipLabel: string;
  zipPlaceholder: string;
  serviceLabel: string;
  servicePlaceholder: string;
  submitButtonText: string;
  submittingText: string;
  privacyNote: string;
  successHeadline: string;
  successMessage: string;
}

export interface LeadFormSection {
  id: string;
  eyebrow: string;
  heading: string;
  subheading: string;
  actionUrl: string;
  accessKeyPlaceholder: string;
  highlights: string[];
  fields: LeadFormFields;
}

export interface FooterSection {
  description: string;
  serviceAreasHeading: string;
  contactHeading: string;
  quickLinksHeading: string;
  serviceAreas: string[];
  copyrightText: string;
  emergencyBannerText: string;
}

export interface SeoMetadata {
  title: string;
  description: string;
  keywords: string[];
}

export interface SiteConfig {
  seo: SeoMetadata;
  theme: ThemeConfig;
  business: BusinessInfo;
  hero: HeroSection;
  services: ServicesSection;
  testimonials: TestimonialsSection;
  leadForm: LeadFormSection;
  footer: FooterSection;
}

