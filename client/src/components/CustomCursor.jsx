import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const isDesktop = window.matchMedia('(pointer: fine)').matches;
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const hovered = useRef(false);
  const pressed = useRef(false);

  useEffect(() => {
    if (!isDesktop) return;

    const dot = dotRef.current;
    const ringEl = ringRef.current;
    let rafId;

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px) scale(${hovered.current ? 0 : pressed.current ? 0.8 : 1})`;
    };

    const onOver = (e) => {
      if (e.target.closest('a, button')) {
        hovered.current = true;
        dot.style.transform = `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px) scale(0)`;
        ringEl.style.background = 'rgba(37,99,235,0.20)';
      }
    };

    const onOut = (e) => {
      if (e.target.closest('a, button')) {
        hovered.current = false;
        ringEl.style.background = 'transparent';
      }
    };

    const onDown = () => {
      pressed.current = true;
      if (!hovered.current) {
        dot.style.transform = `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px) scale(0.8)`;
      }
      ringEl.style.transform = `translate(${ring.current.x - 16}px, ${ring.current.y - 16}px) scale(${hovered.current ? 2.2 * 0.8 : 0.8})`;
    };

    const onUp = () => {
      pressed.current = false;
      if (!hovered.current) {
        dot.style.transform = `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px) scale(1)`;
      }
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.12);
      const scale = hovered.current ? 2.2 : pressed.current ? 0.8 : 1;
      ringEl.style.transform = `translate(${ring.current.x - 16}px, ${ring.current.y - 16}px) scale(${scale})`;
      rafId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    animate();

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(rafId);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#2563EB',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'transform 0.15s ease',
          willChange: 'transform',
          transform: 'translate(-100px, -100px) scale(1)',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '2px solid #2563EB',
          backgroundColor: 'transparent',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'transform 0.15s ease, background-color 0.2s ease',
          willChange: 'transform',
          transform: 'translate(-100px, -100px) scale(1)',
        }}
      />
    </>
  );
}
