import React, { useMemo, useState } from 'react';

const PRESETS = {
  primary: {
    defaultState: { bgColor: '#1D1D1D', borderColor: '#414141', textColor: '#FFFFFF' },
    hoverState: { bgColor: '#2D2D2D', borderColor: '#515151', textColor: '#FFFFFF' },
  },
  red: {
    defaultState: { bgColor: '#DC2626', borderColor: '#DC2626', textColor: '#FFFFFF' },
    hoverState: { bgColor: '#EF4444', borderColor: '#EF4444', textColor: '#FFFFFF' },
  },
  secondary: {
    defaultState: { bgColor: '#FFFFFF', borderColor: '#D1D5DB', textColor: '#000000' },
    hoverState: { bgColor: '#F9FAFB', borderColor: '#9CA3AF', textColor: '#000000' },
  },
  secondaryDark: {
    defaultState: { bgColor: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.35)', textColor: '#FFFFFF' },
    hoverState: { bgColor: 'rgba(255,255,255,0.22)', borderColor: 'rgba(255,255,255,0.5)', textColor: '#FFFFFF' },
  },
};

/**
 * Framer Swipe Letters Button
 * @see https://framer.com/m/SwipeLettersButton-mH43.js@rHT2txKD4ed0LGcRSBpo
 */
export default function SwipeLettersButton({
  label = 'GET IN TOUCH',
  onClick,
  type = 'button',
  variant = 'primary',
  defaultState,
  hoverState,
  radius = 9999,
  paddingX = 24,
  paddingY = 16,
  fontSize = '18px',
  fontWeight = 600,
  letterSpacing = '0.4px',
  showBorder = true,
  direction = 'alternate',
  duration = 380,
  easing = 'cubic-bezier(.25,.75,.25,1)',
  stagger = 18,
  className = '',
  ...rest
}) {
  const preset = PRESETS[variant] || PRESETS.primary;
  const resolvedDefault = { ...preset.defaultState, ...defaultState };
  const resolvedHover = { ...preset.hoverState, ...hoverState };

  const [hovered, setHovered] = useState(false);
  const chars = useMemo(
    () => Array.from(label || '').map((c) => (c === ' ' ? '\u00a0' : c)),
    [label]
  );

  const currentBg = hovered ? resolvedHover.bgColor : resolvedDefault.bgColor;
  const currentBorder = hovered ? resolvedHover.borderColor : resolvedDefault.borderColor;
  const currentText = hovered ? resolvedHover.textColor : resolvedDefault.textColor;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`swipe-letters-btn ${className}`.trim()}
      onMouseEnter={() => !rest.disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => !rest.disabled && setHovered(true)}
      onBlur={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: currentBg,
        borderRadius: radius,
        border: showBorder ? `1px solid ${currentBorder}` : 'none',
        overflow: 'hidden',
        position: 'relative',
        userSelect: 'none',
        cursor: rest.disabled ? 'not-allowed' : 'pointer',
        transition: 'background-color 0.2s ease, border-color 0.2s ease, transform 0.1s ease',
        padding: 0,
        font: 'inherit',
        opacity: rest.disabled ? 0.6 : 1,
      }}
      {...rest}
    >
      <span
        style={{
          padding: `${paddingY}px ${paddingX}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: letterSpacing,
        }}
      >
        {chars.map((ch, i) => {
          const dir = direction === 'alternate' ? (i % 2 === 0 ? 'top' : 'bottom') : direction;
          const initY = dir === 'top' ? '-50%' : '0%';
          const hoverY = dir === 'top' ? '0%' : '-50%';
          const delay = `${i * stagger}ms`;

          return (
            <span
              key={`${ch}-${i}`}
              style={{
                position: 'relative',
                display: 'inline-block',
                height: '1em',
                overflow: 'hidden',
                fontSize,
                fontWeight,
                lineHeight: 1,
              }}
            >
              <span
                style={{
                  display: 'grid',
                  gridAutoRows: '1em',
                  transform: `translateY(${hovered ? hoverY : initY})`,
                  transitionProperty: 'transform',
                  transitionDuration: `${duration}ms`,
                  transitionTimingFunction: easing,
                  transitionDelay: delay,
                  willChange: 'transform',
                }}
              >
                <span style={{ color: currentText, transition: 'color 0.2s ease' }}>{ch}</span>
                <span style={{ color: currentText, transition: 'color 0.2s ease' }}>{ch}</span>
              </span>
            </span>
          );
        })}
      </span>
    </button>
  );
}
