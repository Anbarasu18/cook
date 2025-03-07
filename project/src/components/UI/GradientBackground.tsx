import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface GradientBackgroundProps {
  children: React.ReactNode;
  colorScheme?: 'funky' | 'sunset' | 'ocean' | 'neon' | 'pastel';
  animated?: boolean;
  className?: string;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  colorScheme = 'funky',
  animated = true,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  
  // Color schemes
  const colorSchemes = {
    funky: {
      colors: [
        'rgba(123, 31, 162, 1)',    // Purple
        'rgba(103, 58, 183, 1)',    // Deep Purple
        'rgba(244, 143, 177, 1)',   // Pink
        'rgba(255, 235, 59, 1)',    // Yellow
      ],
      bgClass: 'bg-purple-900',
    },
    sunset: {
      colors: [
        'rgba(255, 87, 34, 1)',     // Deep Orange
        'rgba(255, 152, 0, 1)',     // Orange
        'rgba(255, 193, 7, 1)',     // Amber
        'rgba(233, 30, 99, 1)',     // Pink
      ],
      bgClass: 'bg-orange-900',
    },
    ocean: {
      colors: [
        'rgba(0, 188, 212, 1)',     // Cyan
        'rgba(3, 169, 244, 1)',     // Light Blue
        'rgba(33, 150, 243, 1)',    // Blue
        'rgba(0, 150, 136, 1)',     // Teal
      ],
      bgClass: 'bg-cyan-900',
    },
    neon: {
      colors: [
        'rgba(124, 77, 255, 1)',    // Purple
        'rgba(29, 233, 182, 1)',    // Teal
        'rgba(255, 82, 82, 1)',     // Red
        'rgba(255, 215, 64, 1)',    // Yellow
      ],
      bgClass: 'bg-violet-900',
    },
    pastel: {
      colors: [
        'rgba(187, 222, 251, 1)',   // Light Blue
        'rgba(209, 196, 233, 1)',   // Lavender
        'rgba(255, 236, 179, 1)',   // Light Yellow
        'rgba(197, 225, 165, 1)',   // Light Green
      ],
      bgClass: 'bg-blue-100',
    },
  };
  
  // Animate gradient
  useEffect(() => {
    if (!animated || !gradientRef.current) return;
    
    const colors = colorSchemes[colorScheme].colors;
    
    // Create gradient animation
    gsap.to(gradientRef.current, {
      backgroundPosition: '200% 200%',
      duration: 15,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
    
    // Mouse movement effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !gradientRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      gsap.to(gradientRef.current, {
        backgroundPosition: `${x * 100}% ${y * 100}%`,
        duration: 2,
        ease: 'power2.out',
      });
    };
    
    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [animated, colorScheme]);
  
  // Create CSS gradient
  const createGradientCSS = (colors: string[]) => {
    return `
      radial-gradient(circle at 0% 0%, ${colors[0]}, transparent 50%),
      radial-gradient(circle at 100% 0%, ${colors[1]}, transparent 50%),
      radial-gradient(circle at 100% 100%, ${colors[2]}, transparent 50%),
      radial-gradient(circle at 0% 100%, ${colors[3]}, transparent 50%)
    `;
  };
  
  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${colorSchemes[colorScheme].bgClass} ${className}`}
    >
      {/* Animated gradient background */}
      <div
        ref={gradientRef}
        className="absolute inset-0 z-0"
        style={{
          background: createGradientCSS(colorSchemes[colorScheme].colors),
          backgroundSize: '200% 200%',
          backgroundPosition: '0% 0%',
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GradientBackground;