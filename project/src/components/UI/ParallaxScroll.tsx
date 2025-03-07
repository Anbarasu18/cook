import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxScrollProps {
  className?: string;
}

const ParallaxScroll: React.FC<ParallaxScrollProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    // Create scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Animate the text
    tl.to(textRef.current, {
      x: 300,
      opacity: 0,
      ease: 'none'
    });

    // Cleanup
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* First parallax section */}
      <div className="h-screen bg-cover bg-center bg-fixed relative"
        style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?indian-food')" }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white text-center">
            Discover Amazing Recipes
          </h1>
        </div>
      </div>

      {/* Animated text section */}
      <div className="h-[50vh] bg-amber-50 flex items-center justify-center relative overflow-hidden">
        <div
          ref={textRef}
          className="text-3xl md:text-5xl font-bold text-amber-800 text-center transform"
        >
          Scroll to See Magic!
        </div>
      </div>

      {/* Second parallax section */}
      <div className="h-screen bg-cover bg-center bg-fixed relative"
        style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?spices')" }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white text-center">
            Explore Global Flavors
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ParallaxScroll;