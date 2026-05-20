import { useCallback, useEffect, useMemo, useRef, useState, startTransition } from 'react';
import './SequentialCarousel.css';

const VISIBLE_THRESHOLD = 15;
const REPEAT_COUNT = 40;

/**
 * Framer Sequential Elastic Carousel (no nav buttons, auto-advance).
 * @see https://framer.com/m/SequentialCarousel-ryyHPV.js@GaVnykvz3Aahok2yqYFK
 */
export default function SequentialCarousel({
  items = [],
  cardGap = 280,
  animationDuration = 600,
  sequenceDelay = 80,
  animationOrigin = 0,
  fadeStartIndex = 2,
  autoPlayInterval = 3200,
  autoPlay = true,
  hideBackground = true,
  backgroundColor = 'transparent',
  cardWidth = 280,
  className = '',
}) {
  const originalCards = useMemo(
    () => items.map((item, i) => ({ id: item.id ?? i + 1, item })),
    [items]
  );

  const cards = useMemo(() => {
    if (originalCards.length === 0) return [];
    const repeated = [];
    for (let i = 0; i < REPEAT_COUNT; i++) {
      repeated.push(...originalCards);
    }
    return repeated;
  }, [originalCards]);

  const startIndex = useMemo(() => {
    if (originalCards.length === 0) return 0;
    return Math.floor(cards.length / 2);
  }, [cards.length, originalCards.length]);

  const [currentIndex, setCurrentIndex] = useState(startIndex);
  /** Lags currentIndex until the center card finishes moving (caption stays in sync visually). */
  const [captionIndex, setCaptionIndex] = useState(startIndex);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cardStates, setCardStates] = useState(new Map());

  const mountedRef = useRef(true);
  const currentIndexRef = useRef(currentIndex);
  const isAnimatingRef = useRef(isAnimating);
  const captionTimeoutRef = useRef(null);

  currentIndexRef.current = currentIndex;
  isAnimatingRef.current = isAnimating;

  const activeTitle = cards[captionIndex]?.item?.name ?? '';

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (captionTimeoutRef.current) clearTimeout(captionTimeoutRef.current);
    };
  }, []);

  const getCardStyle = useCallback(
    (position, animate, delay = 0) => {
      const absPosition = Math.abs(position);
      let cumulativeTranslateX = 0;

      if (position !== 0) {
        const direction = position > 0 ? 1 : -1;
        for (let i = 1; i <= absPosition; i++) {
          const gapMultiplier = Math.max(0.3, 1 - (i - 1) * 0.15);
          cumulativeTranslateX += cardGap * gapMultiplier * direction;
        }
      }

      const scale = position === 0 ? 1 : Math.max(0.65, 1 - absPosition * 0.12);
      const opacity = absPosition <= fadeStartIndex ? 1 : 0;
      const zIndex = 20 - absPosition;
      const translateY = animationOrigin * absPosition * absPosition;
      const transition = animate ? `all ${animationDuration}ms ease-in-out ${delay}ms` : 'none';

      return {
        wrapper: {
          position: 'absolute',
          width: cardWidth,
          left: '50%',
          marginLeft: -cardWidth / 2,
          transform: `translateX(${cumulativeTranslateX}px) translateY(${translateY}px)`,
          opacity,
          zIndex,
          transition,
          pointerEvents: position === 0 ? 'auto' : 'none',
          willChange: 'transform, opacity',
        },
        visual: {
          transform: `scale(${scale})`,
          transition,
        },
      };
    },
    [animationDuration, animationOrigin, cardGap, cardWidth, fadeStartIndex]
  );

  const calculateCardStates = useCallback(
    (newIndex, animate, fromIndex) => {
      const newStates = new Map();
      const direction = newIndex > fromIndex ? 1 : -1;

      cards.forEach((card, index) => {
        const position = index - newIndex;
        const absPosition = Math.abs(position);
        if (absPosition > VISIBLE_THRESHOLD + 5) return;

        let delay = 0;
        if (animate) {
          if (direction > 0) {
            if (position < 0) {
              delay = Math.max(0, (VISIBLE_THRESHOLD - Math.abs(position)) * sequenceDelay);
            } else if (position > 0) {
              delay = (VISIBLE_THRESHOLD + position) * sequenceDelay;
            } else {
              delay = VISIBLE_THRESHOLD * sequenceDelay;
            }
          } else if (position > 0) {
            delay = Math.max(0, (VISIBLE_THRESHOLD - position) * sequenceDelay);
          } else if (position < 0) {
            delay = (VISIBLE_THRESHOLD + Math.abs(position)) * sequenceDelay;
          } else {
            delay = VISIBLE_THRESHOLD * sequenceDelay;
          }
        }

        newStates.set(index, { position, delay });
      });

      return newStates;
    },
    [cards, sequenceDelay]
  );

  useEffect(() => {
    const initialStates = calculateCardStates(startIndex, false, startIndex);
    startTransition(() => {
      setCurrentIndex(startIndex);
      setCaptionIndex(startIndex);
      setCardStates(initialStates);
    });
  }, [startIndex, calculateCardStates]);

  const scheduleCaptionSync = useCallback(
    (index) => {
      if (captionTimeoutRef.current) clearTimeout(captionTimeoutRef.current);
      // Center card moves last in the cascade when advancing
      const centerSettleMs = VISIBLE_THRESHOLD * sequenceDelay + animationDuration;
      captionTimeoutRef.current = setTimeout(() => {
        if (!mountedRef.current) return;
        startTransition(() => setCaptionIndex(index));
      }, centerSettleMs);
    },
    [animationDuration, sequenceDelay]
  );

  const runAdvance = useCallback(() => {
    if (isAnimatingRef.current || originalCards.length === 0) return;

    const fromIndex = currentIndexRef.current;
    startTransition(() => setIsAnimating(true));

    const newIndex = fromIndex + 1;
    const newStates = calculateCardStates(newIndex, true, fromIndex);

    startTransition(() => {
      setCurrentIndex(newIndex);
      setCardStates(newStates);
    });

    scheduleCaptionSync(newIndex);

    const totalAnimationTime = VISIBLE_THRESHOLD * sequenceDelay + animationDuration + 200;

    setTimeout(() => {
      if (!mountedRef.current) return;
      startTransition(() => setIsAnimating(false));

      if (newIndex >= startIndex + originalCards.length * 5) {
        const resetIndex = newIndex - originalCards.length * 5;
        const resetStates = calculateCardStates(resetIndex, false, resetIndex);
        if (captionTimeoutRef.current) clearTimeout(captionTimeoutRef.current);
        startTransition(() => {
          setCurrentIndex(resetIndex);
          setCaptionIndex(resetIndex);
          setCardStates(resetStates);
        });
      }
    }, totalAnimationTime);
  }, [
    animationDuration,
    calculateCardStates,
    originalCards.length,
    sequenceDelay,
    scheduleCaptionSync,
    startIndex,
  ]);

  useEffect(() => {
    if (!autoPlay || originalCards.length === 0) return undefined;

    const id = window.setInterval(runAdvance, autoPlayInterval);
    return () => window.clearInterval(id);
  }, [autoPlay, autoPlayInterval, originalCards.length, runAdvance]);

  if (originalCards.length === 0) return null;

  return (
    <div
      className={`sequential-carousel ${className}`.trim()}
      style={{
        background: hideBackground ? 'transparent' : backgroundColor,
      }}
    >
      <div className="sequential-carousel__stage">
        <div className="sequential-carousel__track">
          {cards.map((card, index) => {
            const state = cardStates.get(index);
            if (!state) return null;

            const { position, delay } = state;
            const absPosition = Math.abs(position);
            if (absPosition > VISIBLE_THRESHOLD) return null;

            const darknessAmount =
              position === 0 ? 0 : Math.min(0.4, absPosition * 0.06 + 0.05);
            const { item } = card;
            const styles = getCardStyle(position, isAnimating, delay);

            return (
              <div
                key={`${card.id}-${index}`}
                style={styles.wrapper}
                className="sequential-carousel__card"
                aria-hidden={position !== 0}
              >
                <div className="sequential-carousel__card-visual" style={styles.visual}>
                  <div className="sequential-carousel__card-inner">
                    <div
                      className="sequential-carousel__shade"
                      style={{
                        backgroundColor: `rgba(0, 0, 0, ${darknessAmount})`,
                        transition: isAnimating
                          ? `background-color ${animationDuration}ms ease-in-out ${delay}ms`
                          : 'none',
                      }}
                    />
                    <div className="sequential-carousel__image-wrap">
                      <img
                        src={item.image}
                        alt={position === 0 ? item.name : ''}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p
        key={captionIndex}
        className="sequential-carousel__caption"
        aria-live="polite"
      >
        {activeTitle}
      </p>
    </div>
  );
}
