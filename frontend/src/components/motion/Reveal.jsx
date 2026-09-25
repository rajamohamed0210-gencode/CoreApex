import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

export const revealVariants = {
  up: { hidden: { opacity: 0, y: 34 }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -28 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -46 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 46 }, show: { opacity: 1, x: 0 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  zoom: { hidden: { opacity: 0, scale: 0.93 }, show: { opacity: 1, scale: 1 } },
  blur: {
    hidden: { opacity: 0, y: 20, filter: 'blur(14px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  flip: {
    hidden: { opacity: 0, y: 28, rotateX: -14 },
    show: { opacity: 1, y: 0, rotateX: 0 },
  },
};

/**
 * Scroll-triggered reveal wrapper.
 * Falls back to a plain element when the visitor prefers reduced motion.
 */
export function Reveal({
  children,
  variant = 'up',
  delay = 0,
  duration = 0.65,
  className = '',
  as = 'div',
  once = true,
  amount = 0.2,
  style,
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (reduceMotion) {
    const Tag = as;
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      style={style}
      variants={revealVariants[variant] || revealVariants.up}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin: '0px 0px -70px 0px' }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/** Container that cascades its <StaggerItem> children into view. */
export function Stagger({
  children,
  className = '',
  stagger = 0.09,
  delayChildren = 0.05,
  once = true,
  amount = 0.15,
  as = 'div',
  style,
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (reduceMotion) {
    const Tag = as;
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin: '0px 0px -60px 0px' }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}

/** Child of <Stagger>. */
export function StaggerItem({
  children,
  className = '',
  variant = 'up',
  duration = 0.6,
  style,
  as = 'div',
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (reduceMotion) {
    const Tag = as;
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      style={style}
      variants={revealVariants[variant] || revealVariants.up}
      transition={{ duration, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

export default Reveal;
