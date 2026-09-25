import React from 'react';

/**
 * Infinite, seamless marquee.
 *
 * Each track renders the content twice and translates by -50% of its own width,
 * so the loop restarts exactly where it began (no visible seam), while
 * `min-w-full` guarantees the track always covers the container.
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

  const track = (key) => (
    <div
      key={key}
      aria-hidden={key === 'clone' ? 'true' : undefined}
      className={`flex min-w-full shrink-0 items-center ${animation} ${pauseClass} ${itemClassName}`}
      style={{ '--marquee-duration': `${speed}s` }}
    >
      <div className="flex shrink-0 items-center">{children}</div>
      <div className="flex shrink-0 items-center" aria-hidden="true">
        {children}
      </div>
    </div>
  );

  return (
    <div className={`group relative flex w-full overflow-hidden ${fade ? 'mask-fade-x' : ''} ${className}`}>
      {track('main')}
      {track('clone')}
    </div>
  );
}
