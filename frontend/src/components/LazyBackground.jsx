import React, { useEffect, useRef, useState } from 'react';

/**
 * Defers CSS background-image until near viewport (native lazy doesn't cover backgrounds).
 * Use eager for above-fold heroes / LCP.
 */
export function LazyBackground({
  src,
  eager = false,
  rootMargin = '240px 0px',
  className = '',
  style,
  gradient,
  children,
  as: Tag = 'div',
  ...rest
}) {
  const ref = useRef(null);
  const [ready, setReady] = useState(() => Boolean(eager && src));

  useEffect(() => {
    if (eager || !src) {
      setReady(Boolean(src));
      return undefined;
    }

    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setReady(true);
      return undefined;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setReady(true);
        io.disconnect();
      },
      { rootMargin, threshold: 0.01 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [src, eager, rootMargin]);

  const bgImage = !ready || !src
    ? undefined
    : gradient
      ? `linear-gradient(${gradient}), url(${src})`
      : `url(${src})`;

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        backgroundImage: bgImage ?? style?.backgroundImage,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default LazyBackground;
