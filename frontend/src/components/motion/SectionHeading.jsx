import React from 'react';
import { Stagger, StaggerItem, Reveal } from './Reveal';

/**
 * Shared section header: animated eyebrow pill, staggered headline and
 * supporting copy. Keeps every section visually consistent.
 */
export default function SectionHeading({
  eyebrow,
  icon: Icon,
  title,
  highlight,
  description,
  align = 'center',
  tone = 'light',
  className = '',
  eyebrowClassName = '',
  titleClassName = '',
  descriptionClassName = '',
}) {
  const dark = tone === 'dark';

  // Base colours flip with the tone so overrides never fight Tailwind's
  // stylesheet order (e.g. text-[#172033] vs text-white).
  const eyebrowBase = dark
    ? 'border-white/15 bg-white/10 text-[#93C5FD]'
    : 'border-[#BFDBFE] bg-[#EFF6FF] text-[#1D4ED8]';
  const titleBase = dark ? 'text-white' : 'text-[#172033]';
  const descriptionBase = dark ? 'text-slate-300' : 'text-[#64748B]';
  const highlightClass = dark ? 'text-[#7DD3FC]' : 'text-gradient-brand';
  const alignment =
    align === 'left'
      ? 'text-left items-start'
      : align === 'right'
        ? 'text-right items-end md:ml-auto'
        : 'text-center items-center mx-auto';

  return (
    <Stagger
      className={`flex max-w-3xl flex-col gap-3 ${alignment} ${
        align === 'center' ? '' : 'md:items-start'
      } ${className}`}
      stagger={0.12}
    >
      {eyebrow && (
        <StaggerItem variant="down" duration={0.5}>
          <div
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider ${eyebrowBase} ${eyebrowClassName}`}
          >
            {Icon && (
              <span className="flex items-center">
                <Icon size={14} />
              </span>
            )}
            {eyebrow}
          </div>
        </StaggerItem>
      )}

      {title && (
        <StaggerItem variant="up">
          <h2
            className={`text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl ${titleBase} ${titleClassName}`}
          >
            {title} {highlight && <span className={highlightClass}>{highlight}</span>}
          </h2>
        </StaggerItem>
      )}

      {description && (
        <StaggerItem variant="up">
          <p className={`text-base leading-relaxed sm:text-lg ${descriptionBase} ${descriptionClassName}`}>
            {description}
          </p>
        </StaggerItem>
      )}
    </Stagger>
  );
}

/** Animated eyebrow pill usable on its own (page hero headers). */
export function EyebrowPill({ children, icon: Icon, className = '' }) {
  return (
    <Reveal variant="down" duration={0.5}>
      <div
        className={`inline-flex items-center gap-2 rounded-lg border border-[#BFDBFE] bg-[#EFF6FF] px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-[#1D4ED8] ${className}`}
      >
        {Icon && <Icon size={14} />}
        {children}
      </div>
    </Reveal>
  );
}
