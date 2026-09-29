import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for trailing outer ring
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable on non-touch devices with fine pointers and when reduced motion is not requested
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (mediaQuery.matches && !motionQuery.matches) {
      setIsEnabled(true);
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if target is interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('a, button, [role="button"], input, textarea, select, video, .cursor-pointer, .interactive-hover')
        );
        setIsHovered(isInteractive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isEnabled || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer subtle follower ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 42 : 26,
          height: isHovered ? 42 : 26,
          borderColor: isHovered ? 'rgba(212, 180, 131, 0.75)' : 'rgba(212, 180, 131, 0.35)',
          backgroundColor: isHovered ? 'rgba(212, 180, 131, 0.08)' : 'transparent',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="rounded-full border border-gold fixed pointer-events-none"
      />

      {/* Inner center dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.4 : 1,
          backgroundColor: isHovered ? '#C9A26B' : '#D4B483',
        }}
        transition={{ duration: 0.15 }}
        className="w-1.5 h-1.5 rounded-full fixed pointer-events-none"
      />
    </div>
  );
}
