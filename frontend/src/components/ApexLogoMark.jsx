import React from 'react';
import { motion } from 'framer-motion';

export default function ApexLogoMark({ size = 36, animated = true, className = "" }) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={animated ? { scale: 0.94, opacity: 0 } : false}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <defs>
          {/* Deep Navy/Royal Gradient for Left Facet */}
          <linearGradient id="apexLeftFacet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          {/* Electric Royal Blue for Center-Left Facet */}
          <linearGradient id="apexCenterLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>

          {/* Vibrant Royal to Sky Blue for Center-Right Facet */}
          <linearGradient id="apexCenterRight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>

          {/* Sky Light for Right Facet */}
          <linearGradient id="apexRightFacet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
        </defs>

        {/* Facet 1: Outer Left Triangle */}
        <polygon
          points="50,12 14,88 38,88"
          fill="url(#apexLeftFacet)"
        />

        {/* Facet 2: Inner Left Triangle */}
        <polygon
          points="50,12 38,88 50,66"
          fill="url(#apexCenterLeft)"
        />

        {/* Facet 3: Inner Right Triangle */}
        <polygon
          points="50,12 50,66 62,88"
          fill="url(#apexCenterRight)"
        />

        {/* Facet 4: Outer Right Triangle */}
        <polygon
          points="50,12 62,88 86,88"
          fill="url(#apexRightFacet)"
        />

        {/* Subtle Bottom Ground Line */}
        <line
          x1="14"
          y1="88"
          x2="86"
          y2="88"
          stroke="#0F172A"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </motion.svg>
    </div>
  );
}
