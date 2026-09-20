import React from 'react';

// React Atom Icon SVG
export function ReactLogo({ size = 28, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" className={className}>
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </g>
    </svg>
  );
}

// Python Logo SVG
export function PythonLogo({ size = 28, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" className={className}>
      <path fill="#387EB8" d="M63.15 2.1c-16.14.04-30.82 2.76-30.82 17.58v13.19h31.42v4.4H20.02C5.8 37.27 0 46.12 0 62.45c0 16.32 8.44 26.54 21.98 26.54h12.42V75.64c0-14.82 13.06-15.01 27.68-15.01h31.22c4.8 0 7.8-3.08 7.8-8.15V20.28C101.1 5.46 82.68 2.05 63.15 2.1zm-13.8 9.54c2.82 0 5.1 2.29 5.1 5.1 0 2.82-2.28 5.1-5.1 5.1a5.1 5.1 0 0 1-5.1-5.1c0-2.81 2.28-5.1 5.1-5.1z" />
      <path fill="#FFE052" d="M64.85 125.9c16.14-.04 30.82-2.76 30.82-17.58v-13.19H64.25v-4.4h43.73c14.22 0 20.02-8.85 20.02-25.18 0-16.32-8.44-26.54-21.98-26.54H93.6v13.35c0 14.82-13.06 15.01-27.68 15.01H34.7c-4.8 0-7.8 3.08-7.8 8.15v32.2c0 14.82 18.42 18.23 37.95 18.18zm13.8-9.54c-2.82 0-5.1-2.29-5.1-5.1 0-2.82 2.28-5.1 5.1-5.1a5.1 5.1 0 0 1 5.1 5.1c0 2.81-2.28 5.1-5.1 5.1z" />
    </svg>
  );
}

// Django Logo Badge SVG
export function DjangoLogo({ size = 28, className = "" }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`rounded-lg bg-[#092E20] flex items-center justify-center font-bold text-white font-mono text-[13px] tracking-tighter ${className}`}
    >
      dj
    </div>
  );
}

// PostgreSQL Elephant Logo SVG
export function PostgreSQLLogo({ size = 28, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
      <circle cx="50" cy="50" r="46" fill="#336791" />
      <path
        d="M50 20 C35 20 25 32 25 48 C25 62 34 72 45 78 L45 84 L55 84 L55 78 C66 72 75 62 75 48 C75 32 65 20 50 20 Z"
        fill="#FFFFFF"
        opacity="0.95"
      />
      <circle cx="40" cy="42" r="4" fill="#336791" />
      <circle cx="60" cy="42" r="4" fill="#336791" />
      <path
        d="M44 58 Q50 64 56 58"
        stroke="#336791"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
