import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface InteractiveCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
  scaleHover?: number;
  liftHover?: number;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function InteractiveCard({
  children,
  className = '',
  enableTilt = true,
  scaleHover = 1.025,
  liftHover = -6,
  onClick,
  ...rest
}: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [canHover, setCanHover] = useState(false);

  // Mouse coordinate motion values relative to card center (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid, physics-based tilt and return
  const springConfig = { damping: 20, stiffness: 300, mass: 0.2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Subtle tilt range: max ±2 degrees
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-2, 2]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [2, -2]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setCanHover(mediaQuery.matches && !motionQuery.matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHover || !enableTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: 1000,
        rotateX: canHover && enableTilt && isHovered ? rotateX : 0,
        rotateY: canHover && enableTilt && isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      animate={{
        y: isHovered && canHover ? liftHover : 0,
        scale: isHovered && canHover ? scaleHover : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 24,
        mass: 0.5,
      }}
      className={`group transition-shadow duration-300 ease-out ${
        isHovered && canHover
          ? 'shadow-[0_20px_40px_-15px_rgba(30,30,30,0.12),0_10px_20px_-10px_rgba(30,30,30,0.06)] border-gold/40'
          : 'shadow-sm border-bordercolor'
      } ${className}`}
      {...(rest as any)}
    >
      {children}
    </motion.div>
  );
}
