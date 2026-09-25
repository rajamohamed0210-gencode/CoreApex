import React from 'react';

/**
 * Infinite, seamless marquee. Content is rendered twice so the loop has no seam.
 */
export default function Marquee({
  children,
  speed = 38,
  reverse = false,
  pauseOnHover = true,
  fade = true,
  className = '',
  itemClassName = '',
}) {
  const animation = reverse ? 'animate-marquee-reverse' : 'animate-marquee';
  const pauseClass = pauseOnHover ? 'group-hover:[animation-play-state:paused]' : '';

  return (
    <div className={`group relative flex w-full overflow-hidden ${fade ? 'mask-fade-x' : ''} ${className}`}>
      <div
        className={`flex w-max shrink-0 items-center ${animation} ${pauseClass} ${itemClassName}`}
        style={{ '--marquee-duration': `${speed}s` }}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={`flex w-max shrink-0 items-center ${animation} ${pauseClass} ${itemClassName}`}
        style={{ '--marquee-duration': `${speed}s` }}
      >
        {children}
      </div>
    </div>
  );
}
