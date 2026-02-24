import { useEffect, useRef } from 'react';

type Node = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  phase: number;
  mouseEnterTime: number;
  targetX: number;
  targetY: number;
};

interface InteractiveBackgroundProps {
  /** When true, positions absolute inside parent (hero); when false, fixed full viewport */
  contained?: boolean;
}

export function InteractiveBackground({ contained = false }: InteractiveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>();

  const mousePosition = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const getSize = () => {
      if (contained && container) {
        const rect = container.getBoundingClientRect();
        return { w: rect.width, h: rect.height };
      }
      return { w: window.innerWidth, h: window.innerHeight };
    };

    const resizeCanvas = () => {
      const { w, h } = getSize();
      canvas.width = w;
      canvas.height = h;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let resizeObserver: ResizeObserver | undefined;
    if (contained && container) {
      resizeObserver = new ResizeObserver(() => {
        resizeCanvas();
        initNodes();
      });
      resizeObserver.observe(container);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleInitialMousePosition = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      window.removeEventListener('mousemove', handleInitialMousePosition);
    };

    window.addEventListener('mousemove', handleInitialMousePosition);
    window.addEventListener('mousemove', handleMouseMove);

    const gridSpacing = 80;
    const maxMouseDist = 300;
    const delayMs = 400;
    const nodes: Node[] = [];

    const initNodes = () => {
      const { w, h } = getSize();
      nodes.length = 0;
      for (let x = -200; x < w + 200; x += gridSpacing) {
        for (let y = -200; y < h + 200; y += gridSpacing) {
          nodes.push({
            x: x,
            y: y,
            baseX: x,
            baseY: y,
            phase: Math.random() * Math.PI * 2,
            mouseEnterTime: -1,
            targetX: x,
            targetY: y,
          });
        }
      }
    };

    requestAnimationFrame(() => {
      resizeCanvas();
      initNodes();
    });

    let time = 0;

    const getLocalMouse = () => {
      if (contained && container) {
        const rect = container.getBoundingClientRect();
        return {
          x: mousePosition.current.x - rect.left,
          y: mousePosition.current.y - rect.top,
        };
      }
      return { x: mousePosition.current.x, y: mousePosition.current.y };
    };

    const animate = () => {
      const { w, h } = getSize();
      ctx.clearRect(0, 0, w, h);
      time += 0.02;
      const localMouse = getLocalMouse();

      nodes.forEach((node, i) => {
        const mouseDx = localMouse.x - node.baseX;
        const mouseDy = localMouse.y - node.baseY;
        const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);

        if (mouseDistance < maxMouseDist) {
          if (node.mouseEnterTime === -1) {
            node.mouseEnterTime = Date.now();
          }
        } else {
          node.mouseEnterTime = -1;
        }

        let delayFactor = 0;
        if (node.mouseEnterTime !== -1) {
          delayFactor = Math.min(
            (Date.now() - node.mouseEnterTime) / delayMs,
            1
          );
        }

        const floatX = Math.sin(time + node.phase) * 3;
        const floatY = Math.cos(time + node.phase * 1.5) * 3;

        let attractionX = 0;
        let attractionY = 0;

        if (mouseDistance < maxMouseDist && delayFactor > 0) {
          const attraction =
            (1 - mouseDistance / maxMouseDist) * 0.6 * delayFactor;
          attractionX =
            (mouseDx / mouseDistance) * mouseDistance * attraction;
          attractionY =
            (mouseDy / mouseDistance) * mouseDistance * attraction;
        }

        node.targetX = node.baseX + floatX + attractionX;
        node.targetY = node.baseY + floatY + attractionY;

        node.x += (node.targetX - node.x) * 0.08;
        node.y += (node.targetY - node.y) * 0.08;

        const alpha = 0.55;

        if (mouseDistance < maxMouseDist && delayFactor > 0) {
          const size =
            2 + (1 - mouseDistance / maxMouseDist) * 2;
          const mouseAlpha =
            (1 - mouseDistance / maxMouseDist) *
            alpha *
            delayFactor;
          ctx.beginPath();
          ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
          const glowAlpha =
            (1 - mouseDistance / maxMouseDist) *
            0.8 *
            delayFactor;
          ctx.shadowBlur = 10;
          ctx.shadowColor = `rgba(99,102,241,${glowAlpha})`;
          ctx.fillStyle = `rgba(99,102,241,${mouseAlpha})`;
          ctx.fill();
          ctx.shadowBlur = 0;

          nodes.forEach((other, j) => {
            if (j <= i) return;
            const dx = node.x - other.x;
            const dy = node.y - other.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < gridSpacing * 1.5) {
              const midX = (node.x + other.x) / 2;
              const midY = (node.y + other.y) / 2;
              const midDx = localMouse.x - midX;
              const midDy = localMouse.y - midY;
              const midMouseDist = Math.sqrt(
                midDx * midDx + midDy * midDy
              );

              let lineAlpha =
                (1 - dist / (gridSpacing * 1.5)) *
                alpha *
                0.5;
              if (midMouseDist < maxMouseDist) {
                lineAlpha +=
                  (1 - midMouseDist / maxMouseDist) * 0.6;
              }

              if (lineAlpha > 0.05) {
                const grad = ctx.createLinearGradient(
                  node.x,
                  node.y,
                  other.x,
                  other.y
                );
                grad.addColorStop(
                  0,
                  `rgba(99,102,241,${lineAlpha})`
                );
                grad.addColorStop(
                  1,
                  `rgba(139,92,246,${lineAlpha * 0.8})`
                );
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(other.x, other.y);
                ctx.strokeStyle = grad;
                ctx.lineWidth = 1;
                ctx.stroke();
              }
            }
          });
        }
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (resizeObserver && container) {
        resizeObserver.disconnect();
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [contained]);

  const wrapperClass = contained
    ? 'absolute inset-0 pointer-events-none z-0'
    : 'fixed inset-0 pointer-events-none z-[-1]';

  return (
    <>
      <div ref={containerRef} className={wrapperClass}>
        <canvas
          ref={canvasRef}
          className="block w-full h-full"
          style={{ width: '100%', height: '100%' }}
        />
        {/* Corner Glow */}
        <div
          className={`absolute bottom-0 right-0 w-[800px] h-[800px] opacity-45 ${contained ? 'max-w-[200%] max-h-[200%]' : ''}`}
          style={{
            background: 'linear-gradient(to top left, rgba(199,210,254,0.6), rgba(243,232,255,0.4), transparent)',
            borderRadius: '9999px',
            filter: 'blur(48px)',
          }}
        />
      </div>
    </>
  );
}
