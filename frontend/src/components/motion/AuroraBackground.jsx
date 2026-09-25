import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Ambient animated background: soft floating gradient orbs plus an optional
 * technical grid. Purely decorative, never intercepts pointer events.
 */
export default function AuroraBackground({
  variant = 'light',
  grid = true,
  className = '',
  intensity = 'normal',
}) {
  const reduceMotion = useReducedMotion();
  const isDark = variant === 'dark';

  const orbs = isDark
    ? [
        { className: 'left-[-12%] top-[-10%] h-[46rem] w-[46rem] bg-blue-600/25', delay: 0 },
        { className: 'right-[-14%] top-[8%] h-[38rem] w-[38rem] bg-cyan-400/20', delay: 1.4 },
        { className: 'bottom-[-18%] left-[26%] h-[40rem] w-[40rem] bg-indigo-500/20', delay: 2.6 },
      ]
    : [
        { className: 'right-[-10%] top-[-14%] h-[42rem] w-[42rem] bg-[#DBEAFE]/70', delay: 0 },
        { className: 'left-[-12%] top-[26%] h-[34rem] w-[34rem] bg-[#E0F2FE]/70', delay: 1.6 },
        { className: 'bottom-[-16%] right-[18%] h-[32rem] w-[32rem] bg-[#EDE9FE]/60', delay: 3 },
      ];

  const opacity = intensity === 'strong' ? (isDark ? 'opacity-90' : 'opacity-100') : 'opacity-70';

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {grid && (
        <div
          className={`absolute inset-0 ${
            isDark ? 'bg-grid-fine opacity-30' : 'bg-grid-subtle'
          } ${isDark ? '[background-image:none]' : ''}`}
          style={
            isDark
              ? {
                  backgroundImage:
                    'linear-gradient(to right, rgba(96,165,250,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(96,165,250,0.10) 1px, transparent 1px)',
                  backgroundSize: '34px 34px',
                }
              : undefined
          }
        />
      )}

      <div className={`absolute inset-0 ${opacity}`}>
        {orbs.map((orb, idx) => (
          <motion.span
            key={idx}
            className={`absolute block rounded-full blur-3xl ${orb.className}`}
            animate={
              reduceMotion
                ? undefined
                : {
                    x: [0, 26, -18, 0],
                    y: [0, -22, 16, 0],
                    scale: [1, 1.08, 0.96, 1],
                  }
            }
            transition={{
              duration: 22 + idx * 4,
              delay: orb.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}
