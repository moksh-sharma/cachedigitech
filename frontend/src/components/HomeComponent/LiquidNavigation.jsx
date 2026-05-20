import React, { useLayoutEffect, useRef, useState, useId } from 'react';
import { LayoutGroup, motion } from 'framer-motion';
import './LiquidNavigation.css';

/** Smooth liquid spring (Framer-like, low bounce) */
const LIQUID_SPRING = { type: 'spring', stiffness: 380, damping: 34, mass: 0.85 };
const COLOR_TWEEN = { duration: 0.28, ease: [0.44, 0, 0.56, 1] };
const FADE_TWEEN = { duration: 0.22, ease: [0.44, 0, 0.56, 1] };

const ICON_SIZE = 36;
const TEXT_PAD_RIGHT = 12;
const OPEN_PAD_X = 4;

function useLabelWidth(label) {
  const measureRef = useRef(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (measureRef.current) {
      setWidth(measureRef.current.offsetWidth);
    }
  }, [label]);

  return { measureRef, width };
}

function LiquidNavItem({
  label,
  href,
  iconPath,
  hoverColor,
  iconColor = 'rgb(156, 163, 175)',
  backgroundColor = 'rgba(255, 255, 255, 0.08)',
  isOpen,
  onMouseEnter,
  newTab = true,
}) {
  const { measureRef, width: labelWidth } = useLabelWidth(label);
  const textWidth = labelWidth + TEXT_PAD_RIGHT;
  const expandedWidth = ICON_SIZE + textWidth + OPEN_PAD_X * 2;
  const color = isOpen ? hoverColor : iconColor;

  return (
    <motion.a
      href={href}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener noreferrer' : undefined}
      aria-label={label}
      className="liquid-nav-item"
      onMouseEnter={onMouseEnter}
      layout
      initial={false}
      animate={{
        width: isOpen ? expandedWidth : ICON_SIZE,
        paddingLeft: isOpen ? OPEN_PAD_X : 0,
        paddingRight: isOpen ? OPEN_PAD_X : 0,
      }}
      transition={LIQUID_SPRING}
      style={{
        backgroundColor,
        borderRadius: 22,
      }}
    >
      <motion.span
        className="liquid-nav-item__icon"
        animate={{ color }}
        transition={COLOR_TWEEN}
      >
        <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d={iconPath} />
        </svg>
      </motion.span>

      <span className="liquid-nav-item__text-wrap" style={{ width: textWidth }} aria-hidden={!isOpen}>
        <motion.span
          className="liquid-nav-item__light"
          aria-hidden="true"
          initial={false}
          animate={{ opacity: isOpen ? 0.55 : 0 }}
          transition={FADE_TWEEN}
        />
        <motion.span
          className="liquid-nav-item__text"
          initial={false}
          animate={{ color, opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -6 }}
          transition={{
            color: COLOR_TWEEN,
            opacity: FADE_TWEEN,
            x: LIQUID_SPRING,
          }}
        >
          {label}
        </motion.span>
      </span>

      <span ref={measureRef} className="liquid-nav-item__measure" aria-hidden="true">
        {label}
      </span>
    </motion.a>
  );
}

/**
 * @see https://framer.com/m/Liquid-Navigation-drU0.js@cdIoVo4rPylnTxxZZryU
 */
export default function LiquidNavigation({
  items = [],
  className = '',
  iconColor,
  backgroundColor,
}) {
  const [activeIndex, setActiveIndex] = useState(null);
  const layoutId = useId();

  return (
    <LayoutGroup id={layoutId}>
      <nav
        className={`liquid-navigation ${className}`.trim()}
        onMouseLeave={() => setActiveIndex(null)}
        aria-label="Social links"
      >
        {items.map((item, index) => (
          <LiquidNavItem
            key={item.label}
            label={item.label}
            href={item.href}
            iconPath={item.iconPath ?? item.d}
            hoverColor={item.hoverColor ?? item.color}
            iconColor={iconColor}
            backgroundColor={backgroundColor}
            isOpen={activeIndex === index}
            onMouseEnter={() => setActiveIndex(index)}
            newTab={item.newTab !== false}
          />
        ))}
      </nav>
    </LayoutGroup>
  );
}
