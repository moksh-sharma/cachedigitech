import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Framer Studio Showcase Stack
 * @see https://framer.com/m/Studio-Showcase-Stack-boSulF.js@dUIrWuIi2KBLsm7NJSjI
 */
function getResponsiveValues(windowWidth) {
  if (windowWidth < 480) {
    return { cardWidth: 200, cardHeight: 280, mainGap: 120, backGap: 20, rotation: 6 };
  }
  if (windowWidth < 768) {
    return { cardWidth: 240, cardHeight: 340, mainGap: 160, backGap: 25, rotation: 7 };
  }
  return { cardWidth: 280, cardHeight: 400, mainGap: 200, backGap: 30, rotation: 8 };
}

function getCardTransform(index, activeIndex, count, responsive) {
  const diff = index - activeIndex;
  const absDiff = Math.abs(diff);
  let xOffset;

  if (diff === 0) {
    xOffset = 0;
  } else if (diff === -1) {
    xOffset = -responsive.mainGap;
  } else if (diff === 1) {
    xOffset = responsive.mainGap;
  } else if (diff < -1) {
    xOffset = -responsive.mainGap + (diff + 1) * responsive.backGap;
  } else {
    xOffset = responsive.mainGap + (diff - 1) * responsive.backGap;
  }

  return {
    rotate: diff * responsive.rotation,
    x: xOffset,
    zIndex: count - absDiff,
    opacity: 1,
    scale: Math.max(0.85, 1 - absDiff * 0.05),
  };
}

export default function StudioShowcaseStack({
  items = [],
  onItemClick,
  defaultPosition = 'center',
  borderRadius = 12,
  borderWidth = 0,
  borderColor = '#000000',
  shadowStrength = 1,
  backgroundOpacity = 0.55,
  renderOverlay,
  className = '',
}) {
  const count = items.length;

  const getInitialIndex = useCallback(() => {
    if (count === 0) return 0;
    if (defaultPosition === 'left') return 0;
    if (defaultPosition === 'right') return count - 1;
    return Math.floor(count / 2);
  }, [count, defaultPosition]);

  const [activeIndex, setActiveIndex] = useState(getInitialIndex);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    setActiveIndex(getInitialIndex());
  }, [getInitialIndex]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goToIndex = (index) => {
    if (index >= 0 && index < count) setActiveIndex(index);
  };

  const handleCardClick = (index) => {
    if (index === activeIndex) {
      onItemClick?.(items[index], index);
    } else {
      goToIndex(index);
    }
  };

  if (count === 0) return null;

  const responsive = getResponsiveValues(windowWidth);
  const shadowActive = `0 ${25 * shadowStrength}px ${50 * shadowStrength}px ${-12 * shadowStrength}px rgba(0, 0, 0, ${0.25 * shadowStrength})`;
  const shadowIdle = `0 ${25 * shadowStrength}px ${50 * shadowStrength}px ${-12 * shadowStrength}px rgba(0, 0, 0, ${0.1 * shadowStrength})`;

  return (
    <div
      className={`flex flex-col items-center justify-center w-full overflow-hidden py-6 sm:py-10 relative ${className}`.trim()}
    >
      <button
        type="button"
        onClick={() => goToIndex((activeIndex - 1 + count) % count)}
        className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-50 flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-200 bg-white text-gray-700 shadow-md hover:bg-gray-50 transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => goToIndex((activeIndex + 1) % count)}
        className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-50 flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-200 bg-white text-gray-700 shadow-md hover:bg-gray-50 transition-colors"
        aria-label="Next"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div
        className="relative w-full max-w-5xl mx-auto px-12 sm:px-14"
        style={{ height: responsive.cardHeight + 50 }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <AnimatePresence initial={false}>
            {items.map((item, index) => {
              const transform = getCardTransform(index, activeIndex, count, responsive);
              const isActive = index === activeIndex;
              const isHovered = hoveredIndex === index;
              const imageSrc = item.image || item.imageUrl;

              return (
                <motion.div
                  key={item.id ?? index}
                  animate={{
                    rotate: transform.rotate,
                    x: transform.x,
                    zIndex: transform.zIndex,
                    opacity: transform.opacity,
                    scale: isHovered ? transform.scale * 1.05 : transform.scale,
                  }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  onClick={() => handleCardClick(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="absolute cursor-pointer overflow-hidden bg-black"
                  style={{
                    width: `${responsive.cardWidth}px`,
                    height: `${responsive.cardHeight}px`,
                    borderRadius: `${borderRadius}px`,
                    border:
                      borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : 'none',
                    boxShadow: isActive ? shadowActive : shadowIdle,
                  }}
                >
                  <div className="w-full h-full overflow-hidden">
                    <img
                      src={imageSrc}
                      alt={item.title || `Item ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  {!isActive && (
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                      style={{ backgroundColor: `rgba(0, 0, 0, ${backgroundOpacity})` }}
                    />
                  )}

                  {isActive && (
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.55)',
                        opacity: isHovered ? 0.2 : 0.4,
                      }}
                    />
                  )}

                  {isActive && renderOverlay?.(item, index)}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
