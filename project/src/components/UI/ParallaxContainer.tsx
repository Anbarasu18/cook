import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface ParallaxLayer {
  children: React.ReactNode;
  depth?: number; // 0 = no movement, 1 = full movement
  className?: string;
}

interface ParallaxContainerProps {
  children: React.ReactNode;
  sensitivity?: number; // Higher = more movement
  className?: string;
}

export const ParallaxLayer: React.FC<ParallaxLayer> = ({
  children,
  depth = 0.5,
  className = '',
}) => {
  return (
    <div
      className={`parallax-layer absolute ${className}`}
      data-depth={depth}
    >
      {children}
    </div>
  );
};

const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
  children,
  sensitivity = 0.1,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [layers, setLayers] = useState<HTMLElement[]>([]);
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // Find all parallax layers
  useEffect(() => {
    if (!containerRef.current) return;
    
    const layerElements = containerRef.current.querySelectorAll('.parallax-layer');
    setLayers(Array.from(layerElements) as HTMLElement[]);
    
    // Get container dimensions
    setContainerRect(containerRef.current.getBoundingClientRect());
    
    // Update container dimensions on resize
    const handleResize = () => {
      if (containerRef.current) {
        setContainerRect(containerRef.current.getBoundingClientRect());
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [children]);
  
  // Handle mouse movement
  useEffect(() => {
    if (!containerRef.current || !containerRect || layers.length === 0) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to container center
      const mouseX = ((e.clientX - containerRect.left) / containerRect.width) * 2 - 1;
      const mouseY = ((e.clientY - containerRect.top) / containerRect.height) * 2 - 1;
      
      // Animate each layer
      layers.forEach((layer) => {
        const depth = parseFloat(layer.dataset.depth || '0.5');
        const moveX = mouseX * sensitivity * depth * 100; // px
        const moveY = mouseY * sensitivity * depth * 100; // px
        
        gsap.to(layer, {
          x: moveX,
          y: moveY,
          duration: 0.5,
          ease: 'power2.out',
        });
      });
    };
    
    const handleMouseEnter = () => {
      setIsHovering(true);
    };
    
    const handleMouseLeave = () => {
      setIsHovering(false);
      
      // Reset all layers to center position
      layers.forEach((layer) => {
        gsap.to(layer, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.5)',
        });
      });
    };
    
    const container = containerRef.current;
    
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [layers, containerRect, sensitivity]);
  
  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

export default ParallaxContainer;