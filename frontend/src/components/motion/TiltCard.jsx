import React, { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';

/**
 * Lightweight 3D tilt container with an optional pointer-following glare.
 */
export default function TiltCard({
  children,
  className = '',
  intensity = 8,
  glare = true,
  scale = 1.015,
  style,
}) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const springConfig = { stiffness: 220, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(pointerY, [0, 1], [intensity, -intensity]), springConfig);
  const rotateY = useSpring(useTransform(pointerX, [0, 1], [-intensity, intensity]), springConfig);

  const glareX = useTransform(pointerX, (v) => `${v * 100}%`);
  const glareY = useTransform(pointerY, (v) => `${v * 100}%`);
  const glareBackground = useMotionTemplate`radial-gradient(340px circle at ${glareX} ${glareY}, rgba(37, 99, 235, 0.16), transparent 62%)`;

  const handlePointerMove = (event) => {
    if (reduceMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set((event.clientX - rect.left) / rect.width);
    pointerY.set((event.clientY - rect.top) / rect.height);
  };

  const handlePointerLeave = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  if (reduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div className="[perspective:1200px]">
      <motion.div
        ref={ref}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        whileHover={{ scale }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', ...style }}
        className={`group/tilt relative ${className}`}
      >
        {children}
        {glare && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
            style={{ background: glareBackground }}
          />
        )}
      </motion.div>
    </div>
  );
}
