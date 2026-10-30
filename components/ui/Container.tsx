import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/** HyperUI layout wrapper: `mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8` */
export function Container({
  as: Component = 'div',
  className,
  children,
}: ContainerProps) {
  return (
    <Component
      className={cn('mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8', className)}
    >
      {children}
    </Component>
  );
}

