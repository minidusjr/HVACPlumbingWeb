import { Star } from 'lucide-react';
import { cn } from '@/lib/cn';

interface StarRatingProps {
  rating: number;
  max?: number;
  className?: string;
}

/** Accessible star rating (HyperUI review pattern). */
export function StarRating({ rating, max = 5, className }: StarRatingProps) {
  return (
    <div
      role="img"
      aria-label={`${rating} out of ${max} stars`}
      className={cn('flex items-center gap-0.5 text-brand-accent', className)}
    >
      {Array.from({ length: max }).map((_, idx) => (
        <Star
          key={idx}
          aria-hidden="true"
          className={cn('size-4', idx < rating ? 'fill-current' : 'opacity-30')}
        />
      ))}
    </div>
  );
}

