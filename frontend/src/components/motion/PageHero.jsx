import React from 'react';
import { motion } from 'framer-motion';
import AuroraBackground from './AuroraBackground';
import { Reveal, Stagger, StaggerItem } from './Reveal';
import SmartImage from '../SmartImage';

const EASE = [0.16, 1, 0.3, 1];

/**
 * Consistent, animated page header used by every inner page.
 * Optionally renders a framed visual on the right for extra depth.
 */
export default function PageHero({
  eyebrow,
  icon: Icon,
  title,
  highlight,
  description,
  image,
  imageAlt = 'Core Apex.dev engineering',
  imageBadge,
  chips = [],
  actions,
  children,
}) {
  const withImage = Boolean(image);

  return (
    <section className="relative overflow-hidden border-b border-[#E2E8F0] bg-[#F8FAFC] pb-16 pt-28 sm:pt-32">
      <AuroraBackground />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 items-center gap-12 ${
            withImage ? 'lg:grid-cols-12 lg:gap-10' : ''
          }`}
        >
          <div className={withImage ? 'lg:col-span-6' : 'mx-auto max-w-3xl'}>
            <div className={`flex flex-col ${withImage ? 'text-left' : 'items-center text-center'}`}>
              {eyebrow && (
                <Reveal variant="down" duration={0.5}>
                  <span className="inline-flex items-center gap-2 rounded-lg border border-[#BFDBFE] bg-[#EFF6FF] px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#1D4ED8]">
                    {Icon && <Icon size={14} />}
                    {eyebrow}
                  </span>
                </Reveal>
              )}

              <Reveal delay={0.08} className="mt-4">
                <h1 className="text-4xl font-extrabold leading-[1.12] tracking-tight text-[#172033] sm:text-5xl md:text-6xl">
                  {title} {highlight && <span className="text-gradient-brand">{highlight}</span>}
                </h1>
              </Reveal>

              {description && (
                <Reveal delay={0.16} className="mt-4">
                  <p
                    className={`text-base leading-relaxed text-[#64748B] sm:text-lg ${
                      withImage ? 'max-w-xl' : 'mx-auto max-w-2xl'
                    }`}
                  >
                    {description}
                  </p>
                </Reveal>
              )}

              {chips.length > 0 && (
                <Stagger
                  className={`mt-6 flex flex-wrap gap-2 ${
                    withImage ? '' : 'justify-center'
                  }`}
                  stagger={0.07}
                >
                  {chips.map((chip) => (
                    <StaggerItem key={chip} variant="zoom">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-semibold text-[#475569] shadow-sm transition-colors hover:border-[#BFDBFE] hover:text-[#2563EB]">
                        {chip}
                      </span>
                    </StaggerItem>
                  ))}
                </Stagger>
              )}

              {actions && (
                <Reveal delay={0.24} className={`mt-7 ${withImage ? '' : 'flex justify-center'}`}>
                  <div className="flex flex-wrap items-center justify-center gap-3">{actions}</div>
                </Reveal>
              )}

              {children && <div className="mt-8 w-full">{children}</div>}
            </div>
          </div>

          {withImage && (
            <div className="lg:col-span-6">
              <Reveal variant="right" duration={0.75}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="relative"
                >
                  <div className="absolute -inset-5 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-[#DBEAFE] via-white to-[#E0F2FE] blur-2xl" />

                  <div className="overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white p-2 shadow-lift">
                    <SmartImage
                      src={image}
                      alt={imageAlt}
                      ratio="16 / 11"
                      priority
                      wrapperClassName="w-full rounded-2xl"
                      className="rounded-2xl transition-transform duration-[1200ms] ease-smooth hover:scale-[1.04]"
                    />
                  </div>

                  {imageBadge && (
                    <motion.div
                      initial={{ opacity: 0, y: 14, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.5, ease: EASE }}
                      className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white/95 px-4 py-3 shadow-xl backdrop-blur animate-float-soft"
                    >
                      {imageBadge.icon && (
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
                          <imageBadge.icon size={16} />
                        </span>
                      )}
                      <div>
                        <div className="text-sm font-bold text-[#172033]">{imageBadge.title}</div>
                        <div className="font-mono text-[10px] uppercase tracking-wider text-[#64748B]">
                          {imageBadge.subtitle}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </Reveal>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
