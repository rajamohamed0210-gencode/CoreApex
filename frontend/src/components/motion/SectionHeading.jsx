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
  className = '',
  eyebrowClassName = '',
  titleClassName = '',
  descriptionClassName = '',
}) {
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
            className={`inline-flex items-center gap-2 rounded-lg border border-[#BFDBFE] bg-[#EFF6FF] px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-[#1D4ED8] ${eyebrowClassName}`}
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
            className={`text-3xl font-extrabold tracking-tight text-[#172033] sm:text-4xl md:text-5xl ${titleClassName}`}
          >
            {title}{' '}
            {highlight && <span className="text-gradient-brand">{highlight}</span>}
          </h2>
        </StaggerItem>
      )}

      {description && (
        <StaggerItem variant="up">
          <p className={`text-base leading-relaxed text-[#64748B] sm:text-lg ${descriptionClassName}`}>
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
