import React, { useEffect, useRef, useState, startTransition } from 'react';

const DEFAULT_FONT_URL =
  'https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2';

/**
 * Framer TextPressure - variable font reacts to cursor per character
 * @see https://framer.com/m/TextPressure-y92d.js@LAQguO8Civb6UXOmpMCm
 */
export default function TextPressure({
  text = 'Compressa',
  fontFamily = 'Compressa VF',
  fontUrl = DEFAULT_FONT_URL,
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = true,
  stroke = false,
  scale = false,
  textColor = '#FFFFFF',
  strokeColor = '#FF0000',
  minFontSize = 24,
  maxFontSize,
  textAlign = 'center',
  letterSpacing = '0',
  className = '',
  style = {},
}) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const spansRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  const chars = text.split('');

  const dist = (a, b) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };
    const handleTouchMove = (e) => {
      const t = e.touches[0];
      if (t) {
        cursorRef.current.x = t.clientX;
        cursorRef.current.y = t.clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    if (containerRef.current) {
      const { left, top, width: w, height: h } = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = left + w / 2;
      mouseRef.current.y = top + h / 2;
      cursorRef.current.x = mouseRef.current.x;
      cursorRef.current.y = mouseRef.current.y;
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const setSize = () => {
    if (!containerRef.current || !titleRef.current) return;
    const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();
    let newFontSize = flex
      ? containerW / (chars.length / 2)
      : Math.max(minFontSize, containerW / chars.length * 1.1);
    newFontSize = Math.max(newFontSize, minFontSize);
    if (maxFontSize != null) newFontSize = Math.min(newFontSize, maxFontSize);
    startTransition(() => setFontSize(newFontSize));
    startTransition(() => setScaleY(1));
    startTransition(() => setLineHeight(1));

    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const textRect = titleRef.current.getBoundingClientRect();
      if (scale && textRect.height > 0) {
        const yRatio = containerH / textRect.height;
        startTransition(() => setScaleY(yRatio));
        startTransition(() => setLineHeight(yRatio));
      }
    });
  };

  useEffect(() => {
    setSize();
    window.addEventListener('resize', setSize);
    return () => window.removeEventListener('resize', setSize);
  }, [scale, text, chars.length, minFontSize, maxFontSize, flex]);

  useEffect(() => {
    let rafId;
    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist = titleRect.width / 2;

        spansRef.current.forEach((span) => {
          if (!span) return;
          const rect = span.getBoundingClientRect();
          const charCenter = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
          const d = dist(mouseRef.current, charCenter);

          const getAttr = (distance, minVal, maxVal) => {
            const val = maxVal - Math.abs((maxVal * distance) / maxDist);
            return Math.max(minVal, val + minVal);
          };

          const wdth = width ? Math.floor(getAttr(d, 5, 200)) : 100;
          const wght = weight ? Math.floor(getAttr(d, 100, 900)) : 400;
          const italVal = italic ? getAttr(d, 0, 1).toFixed(2) : 0;
          const alphaVal = alpha ? getAttr(d, 0, 1).toFixed(2) : 1;

          span.style.opacity = alphaVal.toString();
          span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [width, weight, italic, alpha, chars.length]);

  const dynamicClassName = [
    flex ? 'text-pressure-flex' : 'text-pressure-tight',
    stroke ? 'text-pressure-stroke' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={containerRef}
      className={`text-pressure-root w-full ${flex ? 'text-pressure-root--spread' : ''} ${className}`.trim()}
      style={{
        position: 'relative',
        minHeight: 64,
        height: 72,
        width: '100%',
        background: 'transparent',
        ...style,
      }}
    >
      <style>{`
        @font-face {
          font-family: '${fontFamily}';
          src: url('${fontUrl}');
          font-style: normal;
          font-display: swap;
        }
        .text-pressure-root--spread {
          display: flex;
          align-items: center;
          padding-top: 4px;
        }
        .text-pressure-title span {
          transition: color 0.2s ease-out, text-shadow 0.2s ease-out;
        }
        .text-pressure-title:hover span {
          text-shadow: 0 0 12px rgba(255, 255, 255, 0.4);
        }
        .text-pressure-flex {
          display: flex;
          flex: 1;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 100%;
        }
        .text-pressure-tight {
          display: inline-flex;
          flex-wrap: nowrap;
          justify-content: flex-start;
          gap: 0;
          width: auto;
          max-width: 100%;
        }
        .text-pressure-stroke span {
          position: relative;
          color: ${textColor};
        }
        .text-pressure-stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: 3px;
          -webkit-text-stroke-color: ${strokeColor};
        }
        .text-pressure-title {
          color: ${textColor};
        }
      `}</style>
      <h1
        ref={titleRef}
        className={`text-pressure-title ${dynamicClassName}`}
        style={{
          fontFamily,
          textTransform: 'uppercase',
          fontSize,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: textAlign === 'left' ? 'left top' : textAlign === 'right' ? 'right top' : 'center top',
          margin: 0,
          textAlign,
          letterSpacing,
          userSelect: 'none',
          whiteSpace: 'nowrap',
          fontWeight: 100,
          width: flex ? '100%' : 'auto',
        }}
      >
        {chars.map((char, i) => (
          <span
            key={`${char}-${i}`}
            ref={(el) => {
              spansRef.current[i] = el;
            }}
            data-char={char}
            style={{ display: 'inline-block', color: stroke ? undefined : textColor }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
}
