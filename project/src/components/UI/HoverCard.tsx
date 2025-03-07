import React, { useState } from 'react';

interface HoverCardProps {
  imageUrl?: string;
  alt?: string;
  className?: string;
}

const HoverCard: React.FC<HoverCardProps> = ({
  imageUrl = 'https://source.unsplash.com/400x300/?biryani',
  alt = 'Recipe Image',
  className = '',
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation based on mouse position
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 15; // Max 15 degrees
    const rotateX = ((centerY - y) / centerY) * 10; // Max 10 degrees

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      className={`relative w-[300px] h-[200px] perspective-[1000px] mx-auto my-[50px] ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`w-full h-full rounded-xl overflow-hidden shadow-lg transition-all duration-500 ease-out transform-gpu ${
          isHovered ? 'shadow-xl' : ''
        }`}
        style={{
          transform: isHovered
            ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
            : 'none',
          transformStyle: 'preserve-3d',
        }}
      >
        <img
          src={imageUrl}
          alt={alt}
          className="w-full h-full object-cover"
        />
        
        {/* Shine effect overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-tr from-white/0 to-white/30 opacity-0 transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : ''
          }`}
          style={{
            transform: 'translateZ(1px)',
          }}
        />
        
        {/* Shadow overlay */}
        <div
          className={`absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-500 ${
            isHovered ? 'opacity-20' : ''
          }`}
        />
      </div>
    </div>
  );
};

export default HoverCard;