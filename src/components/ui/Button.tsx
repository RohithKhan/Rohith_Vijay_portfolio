import type { ReactNode } from 'react';
import { Magnetic } from './Magnetic';

type Variant = 'primary' | 'accent' | 'ghost' | 'outline';

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
  external?: boolean;
};

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium tracking-tight transition-all duration-300 overflow-hidden';

const variants: Record<Variant, string> = {
  primary: 'bg-white text-ink-base hover:bg-accent hover:text-white',
  accent: 'bg-accent text-white hover:bg-accent-hover shadow-[0_0_24px_-4px_rgba(59,130,246,0.5)] hover:shadow-[0_0_32px_-4px_rgba(59,130,246,0.7)]',
  ghost: 'glass text-white hover:border-white/20',
  outline: 'border border-white/15 text-white hover:border-accent/50 hover:bg-accent/5',
};

export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  icon,
  external,
}: Props) {
  const content = (
    <>
      {/* Sheen on hover */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
      </span>
    </>
  );

  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Magnetic strength={0.25}>
        <a
          href={href}
          onClick={onClick}
          className={cls}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {content}
        </a>
      </Magnetic>
    );
  }
  return (
    <Magnetic strength={0.25}>
      <button onClick={onClick} className={cls}>
        {content}
      </button>
    </Magnetic>
  );
}
