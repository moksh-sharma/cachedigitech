import React, { useEffect, useRef, useState } from 'react';

const CURSOR_ICON = '/icons8-hand-cursor.svg';
const POINTER_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABkklEQVR4nLXUMWtaURiH8ceLGkSXgkMJhNKSocSStB3yIVxchX4FoR/AxQySRRTEpSCICiKIKO2WIUsghUIyhAwhF0pLBpMY6CCEi9d73/IOKSWExOg9zwf4/zgczoHHWwFCGGgdOIrH4wJ8Bz4EDXyr1WqidbtdiUajf4CPQQKTyWQidw2HQ4lEIjfAVlDAdDqdyv/1+30Jh8PXwDsjgNbr9RS5AjaWBVzXdeWhms2mWJZ1Cbw1AmiNRkORC+CNEUCr1+sSCoV+A68XAWaz2Uyeqlqt6jv5BbwyAmiVSkWRc2D1OYDneZ7MW6lUUuQMeGkE0AqFgiInQNIIoOXzeUWOgRdGAC2XyynyxRgwHo8VGD8F+L7vLwS0220FDpcGPM8T27ZlMBhIsViUbDYrqVRKx0+BzYUB27Ylk8lILBbzgZ/AV2AX+AS8Byzm6MHxVqsliUTiFvgMJFgix3Gcf8Oj0UjS6bQe/8eyv+hde+VyWRTpdDqSTCZdYAcIBzGurQEHlmU5wD6wHdTw/ea6sMf6C87u5xNAiVqfAAAAAElFTkSuQmCC';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch-only devices — hide custom cursor there
    const hasTouch =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (hasTouch && hasCoarsePointer) {
      setIsTouchDevice(true);
      return;
    }

    // Tags / selectors that count as "interactive"
    const interactiveTags = new Set([
      'A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT', 'LABEL',
    ]);
    const interactiveSelectors =
      'a, button, input, textarea, select, label, [role="button"], [onclick], .cursor-pointer';

    const isInteractive = (el) => {
      if (!el || el === document) return false;
      if (interactiveTags.has(el.tagName)) return true;
      if (el.closest && el.closest(interactiveSelectors)) return true;
      const style = window.getComputedStyle(el);
      if (style.cursor === 'pointer') return true;
      return false;
    };

    // Mouse move — position the cursor icon so its top-left tip
    // aligns with the actual pointer position
    const onMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      setHovering(isInteractive(e.target));
      setHidden(false);
    };

    // Mouse down / up
    const onMouseDown = () => setClicking(true);
    const onMouseUp = () => setClicking(false);

    // Mouse leave / enter window
    const onMouseLeave = () => setHidden(true);
    const onMouseEnter = () => setHidden(false);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  // Don't render on touch-only devices
  if (isTouchDevice) return null;

  const cursorClass = [
    'custom-cursor-icon',
    hovering ? 'cursor-hover' : '',
    clicking ? 'cursor-click' : '',
    hidden ? 'cursor-hidden' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={cursorRef} className={cursorClass} aria-hidden="true">
      <img
        src={hovering ? CURSOR_ICON : POINTER_ICON}
        alt=""
        draggable={false}
        className="custom-cursor-img"
      />
    </div>
  );
};

export default CustomCursor;
