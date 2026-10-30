import {
  AlertTriangle,
  Award,
  CheckCircle2,
  Clock,
  Droplets,
  Flame,
  type LucideIcon,
  type LucideProps,
  Mail,
  MapPin,
  PhoneCall,
  Pipette,
  Search,
  ShieldCheck,
  Star,
  Wrench,
} from 'lucide-react';
import type { IconName } from '@/types';

const ICON_MAP: Record<IconName, LucideIcon> = {
  ShieldCheck,
  Clock,
  Award,
  Wrench,
  Droplets,
  Flame,
  AlertTriangle,
  Search,
  Pipette,
  PhoneCall,
  CheckCircle2,
  MapPin,
  Mail,
  Star,
};

interface IconRendererProps extends LucideProps {
  name: IconName;
}

export function IconRenderer({ name, ...props }: IconRendererProps) {
  const IconComponent = ICON_MAP[name] ?? Wrench;
  return <IconComponent aria-hidden="true" {...props} />;
}
