import React, { useState } from 'react';

/**
 * Lazy-loaded image with a shimmer placeholder, blur-up entrance
 * and an automatic fallback when the remote source fails.
 */
export default function SmartImage({
  src,
  alt = '',
  fallback,
  className = '',
  wrapperClassName = '',
  ratio,
  priority = false,
  imgStyle,
}) {
  const [loaded, setLoaded] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  const source = useFallback && fallback ? fallback : src;

  const handleError = () => {
    if (fallback && !useFallback) {
      setUseFallback(true);
      return;
    }
    setLoaded(true);
  };

  return (
    <div
      className={`relative overflow-hidden ${wrapperClassName}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {!loaded && <span aria-hidden="true" className="skeleton absolute inset-0 block" />}
      <img
        src={source}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        onError={handleError}
        style={imgStyle}
        className={`h-full w-full object-cover transition-[opacity,filter,transform] duration-[900ms] ease-smooth ${
          loaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-[10px] scale-[1.03]'
        } ${className}`}
      />
    </div>
  );
}
