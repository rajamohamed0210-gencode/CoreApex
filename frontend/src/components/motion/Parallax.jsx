import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

/**
 * Scroll-linked parallax wrapper. `speed` > 0 moves slower than the page
 * (background feel), negative values move faster (foreground feel).
 */
export function Parallax({
  children,
  speed = 0.18,
  className = '',
  style,
  offset = ['start end', 'end start'],
}) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });

  const distance = speed * 160;
  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(raw, { stiffness: 110, damping: 26, mass: 0.4 });

  if (reduceMotion) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={style}>
      <motion.div style={{ y, willChange: 'transform' }}>{children}</motion.div>
    </div>
  );
}

/** Scroll-linked scale/zoom image frame used for hero + feature visuals. */
export function ParallaxImage({ children, className = '', scaleRange = [1, 1.12] }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={reduceMotion ? undefined : { scale }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

export default Parallax;
