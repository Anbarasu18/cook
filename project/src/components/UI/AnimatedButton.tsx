import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface AnimatedButtonProps {
  text: string;
  onClick?: () => void;
  color?: 'blue' | 'pink' | 'green' | 'orange' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  text,
  onClick,
  color = 'blue',
  size = 'md',
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  
  // Color variants
  const colorVariants = {
    blue: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-blue-500/30',
    pink: 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 shadow-pink-500/30',
    green: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-emerald-500/30',
    orange: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-amber-500/30',
    purple: 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-purple-500/30',
  };
  
  // Size variants
  const sizeVariants = {
    sm: 'text-sm py-2 px-4',
    md: 'text-base py-3 px-6',
    lg: 'text-lg py-4 px-8',
  };
  
  // Handle hover animation
  useEffect(() => {
    if (!buttonRef.current) return;
    
    if (isHovered) {
      gsap.to(buttonRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: 'elastic.out(1, 0.3)',
      });
    } else {
      gsap.to(buttonRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [isHovered]);
  
  // Handle press animation
  useEffect(() => {
    if (!buttonRef.current) return;
    
    if (isPressed) {
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        ease: 'power2.out',
      });
      
      // Create particle effect
      if (particlesRef.current) {
        createParticles();
      }
    } else if (isHovered) {
      gsap.to(buttonRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: 'elastic.out(1, 0.3)',
      });
    }
  }, [isPressed]);
  
  // Create particle effect
  const createParticles = () => {
    if (!particlesRef.current || !buttonRef.current) return;
    
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const particlesContainer = particlesRef.current;
    
    // Clear previous particles
    particlesContainer.innerHTML = '';
    
    // Create new particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = `absolute rounded-full ${getParticleColor(color)}`;
      
      // Random position around the button
      const x = buttonRect.width / 2;
      const y = buttonRect.height / 2;
      
      // Random size
      const size = Math.random() * 10 + 5;
      
      // Set initial styles
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.opacity = '1';
      
      particlesContainer.appendChild(particle);
      
      // Animate the particle
      gsap.to(particle, {
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        opacity: 0,
        duration: 0.6 + Math.random() * 0.4,
        ease: 'power2.out',
        onComplete: () => {
          if (particlesContainer.contains(particle)) {
            particlesContainer.removeChild(particle);
          }
        }
      });
    }
  };
  
  // Get particle color based on button color
  const getParticleColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-300';
      case 'pink': return 'bg-pink-300';
      case 'green': return 'bg-emerald-300';
      case 'orange': return 'bg-amber-300';
      case 'purple': return 'bg-purple-300';
      default: return 'bg-blue-300';
    }
  };
  
  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => {
          setIsPressed(true);
          setTimeout(() => setIsPressed(false), 150);
          onClick && onClick();
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        className={`
          relative z-10 rounded-xl font-bold text-white transform transition-all
          ${colorVariants[color]} ${sizeVariants[size]} ${className}
          shadow-lg hover:shadow-xl active:shadow-md
        `}
      >
        <span className="relative z-10">{text}</span>
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity"></div>
          <div 
            className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform -translate-x-full"
            style={{
              animation: isHovered ? 'shimmer 1.5s infinite' : 'none',
            }}
          ></div>
        </div>
      </button>
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-visible"></div>
      
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedButton;