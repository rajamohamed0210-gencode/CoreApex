import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

/** Thin reading-progress bar pinned to the very top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-brand-600 via-brand-500 to-sky-400"
    />
  );
}

/** Floating scroll-to-top button with a circular progress ring. */
export function BackToTop() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.button
      type="button"
      aria-label="Scroll back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      initial={false}
      animate={visible ? { opacity: 1, y: 0, pointerEvents: 'auto' } : { opacity: 0, y: 16, pointerEvents: 'none' }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="group fixed bottom-6 left-5 z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-[#E2E8F0] bg-white/95 text-[#2563EB] shadow-[0_10px_30px_-10px_rgba(23,32,51,0.35)] backdrop-blur transition-colors hover:border-[#2563EB] hover:bg-[#EFF6FF] sm:left-6"
    >
      <svg viewBox="0 0 44 44" className="absolute inset-0 h-full w-full -rotate-90">
        <circle cx="22" cy="22" r="20" fill="none" stroke="#E2E8F0" strokeWidth="2" />
        <motion.circle
          cx="22"
          cy="22"
          r="20"
          fill="none"
          stroke="#2563EB"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>
      <ArrowUp size={16} className="relative transition-transform duration-300 group-hover:-translate-y-0.5" />
    </motion.button>
  );
}

export default ScrollProgress;
