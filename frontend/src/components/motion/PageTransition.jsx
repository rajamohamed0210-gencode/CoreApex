import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Fades/slides each routed page into place. Keyed on pathname by <App />.
 */
export default function PageTransition({ children, className = '' }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      // Exit fast so navigation never feels blocked by the transition.
      exit={{ opacity: 0, y: -8, transition: { duration: 0.22, ease: 'easeIn' } }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
