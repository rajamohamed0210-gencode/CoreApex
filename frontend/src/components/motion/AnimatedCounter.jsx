import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

const groupThousands = (value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

/**
 * Counts up to `value` the first time it scrolls into view.
 */
export default function AnimatedCounter({
  value = 0,
  decimals = 0,
  duration = 1.8,
  prefix = '',
  suffix = '',
  separator = true,
  className = '',
  start = 0,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : start);

  useEffect(() => {
    if (!isInView) return undefined;

    if (reduceMotion) {
      setDisplay(value);
      return undefined;
    }

    const controls = animate(start, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(latest),
    });

    return () => controls.stop();
  }, [isInView, value, duration, start, reduceMotion]);

  const fixed = display.toFixed(decimals);
  const [whole, fraction] = fixed.split('.');
  const formatted = separator ? groupThousands(whole) : whole;

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${value}${suffix}`}>
      {prefix}
      {formatted}
      {fraction ? `.${fraction}` : ''}
      {suffix}
    </span>
  );
}
