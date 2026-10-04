'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // High-performance RAF refs (avoids re-rendering on mousemove)
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on desktop devices with a mouse / fine pointer
    if (typeof window === 'undefined') return;

    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    if (isTouch) return;

    setMounted(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      // Move the center dot instantly with zero lag
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    // Track when hovering over clickable/interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = Boolean(
        target.closest(
          'a, button, input, select, textarea, [role="button"], label, .interactive-cursor, .blueprint-card, .cursor-pointer'
        )
      );

      setIsHovered(isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousemove', handleElementHover, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);

    // Smooth 60fps lerp loop for the trailing outer ring
    let rafId: number;
    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const loop = () => {
      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.18);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.18);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousemove', handleElementHover);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Hide native cursor on desktop to let custom cursor seamlessly drive the pointer */}
      <style jsx global>{`
        @media (pointer: fine) {
          html,
          body,
          a,
          button,
          input,
          select,
          textarea,
          [role='button'],
          .blueprint-card {
            cursor: none !important;
          }
        }
      `}</style>

      <div
        className={`pointer-events-none fixed inset-0 z-[999999] transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ mixBlendMode: 'difference' }}
        aria-hidden="true"
      >
        {/* Outer trailing ring: reacts & inverts color dynamically against any background */}
        <div
          ref={ringRef}
          className="fixed top-0 left-0 -ml-[19px] -mt-[19px] rounded-full pointer-events-none will-change-transform"
          style={{
            width: 38,
            height: 38,
            border: isHovered
              ? '2px solid #FFFFFF'
              : '1.5px solid rgba(255, 255, 255, 0.85)',
            backgroundColor: isHovered
              ? 'rgba(255, 255, 255, 0.18)'
              : 'rgba(255, 255, 255, 0.04)',
            backdropFilter: 'invert(5%)',
            transform: 'translate3d(-100px, -100px, 0)',
            scale: isClicked ? '0.82' : isHovered ? '1.65' : '1',
            transition:
              'scale 0.22s cubic-bezier(0.16, 1, 0.3, 1), border 0.2s ease, background-color 0.2s ease',
            boxShadow: isHovered
              ? '0 0 14px rgba(255, 255, 255, 0.45)'
              : 'none',
          }}
        />

        {/* Center dot: stays directly on cursor coordinates */}
        <div
          ref={dotRef}
          className="fixed top-0 left-0 -ml-[4px] -mt-[4px] rounded-full pointer-events-none will-change-transform"
          style={{
            width: 8,
            height: 8,
            backgroundColor: '#FFFFFF',
            transform: 'translate3d(-100px, -100px, 0)',
            scale: isHovered ? '0.5' : isClicked ? '1.3' : '1',
            transition: 'scale 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 0 4px rgba(255, 255, 255, 0.8)',
          }}
        />
      </div>
    </>
  );
}
