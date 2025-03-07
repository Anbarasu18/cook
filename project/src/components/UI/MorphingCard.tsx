import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface MorphingCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  color?: 'blue' | 'pink' | 'green' | 'orange' | 'purple';
  onClick?: () => void;
  className?: string;
}

const MorphingCard: React.FC<MorphingCardProps> = ({
  title,
  description,
  icon,
  color = 'blue',
  onClick,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);
  
  // Color variants
  const colorVariants = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-600',
      shape: 'bg-blue-500',
      shadow: 'shadow-blue-500/20',
    },
    pink: {
      bg: 'bg-pink-50',
      border: 'border-pink-200',
      text: 'text-pink-600',
      shape: 'bg-pink-500',
      shadow: 'shadow-pink-500/20',
    },
    green: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-600',
      shape: 'bg-emerald-500',
      shadow: 'shadow-emerald-500/20',
    },
    orange: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-600',
      shape: 'bg-amber-500',
      shadow: 'shadow-amber-500/20',
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-600',
      shape: 'bg-purple-500',
      shadow: 'shadow-purple-500/20',
    },
  };
  
  // Handle hover animation
  useEffect(() => {
    if (!cardRef.current || !contentRef.current || !shapeRef.current) return;
    
    if (isHovered) {
      // Card animation
      gsap.to(cardRef.current, {
        y: -10,
        scale: 1.02,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        duration: 0.4,
        ease: 'power2.out',
      });
      
      // Content animation
      gsap.to(contentRef.current, {
        y: -5,
        duration: 0.3,
        ease: 'power2.out',
      });
      
      // Shape animation
      gsap.to(shapeRef.current, {
        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
        rotate: 10,
        scale: 1.2,
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)',
      });
    } else {
      // Card animation
      gsap.to(cardRef.current, {
        y: 0,
        scale: 1,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        duration: 0.4,
        ease: 'power2.out',
      });
      
      // Content animation
      gsap.to(contentRef.current, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
      
      // Shape animation
      gsap.to(shapeRef.current, {
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        rotate: 0,
        scale: 1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)',
      });
    }
  }, [isHovered]);
  
  return (
    <div
      ref={cardRef}
      className={`
        relative overflow-hidden rounded-2xl border p-6 transition-all
        ${colorVariants[color].bg} ${colorVariants[color].border} ${colorVariants[color].shadow}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Background shape */}
      <div
        ref={shapeRef}
        className={`
          absolute -right-10 -top-10 h-40 w-40 opacity-20 transition-all
          ${colorVariants[color].shape}
        `}
        style={{
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        }}
      ></div>
      
      {/* Content */}
      <div ref={contentRef} className="relative z-10">
        {icon && (
          <div className={`mb-4 text-2xl ${colorVariants[color].text}`}>
            {icon}
          </div>
        )}
        <h3 className={`mb-2 font-bold text-xl ${colorVariants[color].text}`}>
          {title}
        </h3>
        <p className="text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
};

export default MorphingCard;