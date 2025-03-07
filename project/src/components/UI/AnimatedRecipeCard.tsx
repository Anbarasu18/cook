import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface AnimatedRecipeCardProps {
  title: string;
  description: string;
  className?: string;
}

const AnimatedRecipeCard: React.FC<AnimatedRecipeCardProps> = ({
  title = "Butter Chicken",
  description = "Delicious creamy chicken dish!",
  className = ""
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    if (!buttonRef.current || !cardRef.current) return;

    const handleClick = () => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      // Create animation timeline
      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false;
        }
      });

      // Animate the card
      tl.to(cardRef.current, {
        y: -50,
        scale: 1.2,
        backgroundColor: '#ffa500',
        duration: 1,
        ease: 'bounce.out'
      }).to(cardRef.current, {
        y: 0,
        scale: 1,
        backgroundColor: '#ff6347',
        duration: 1,
        ease: 'power2.inOut'
      });
    };

    buttonRef.current.addEventListener('click', handleClick);

    return () => {
      if (buttonRef.current) {
        buttonRef.current.removeEventListener('click', handleClick);
      }
    };
  }, []);

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <button
        ref={buttonRef}
        id="animate-btn"
        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        Animate Recipe
      </button>

      <div
        ref={cardRef}
        id="recipe-card"
        className="w-[200px] h-[300px] bg-[#ff6347] rounded-[10px] p-5 shadow-lg"
        style={{
          margin: '50px',
          transform: 'translate3d(0, 0, 0)' // Force GPU acceleration
        }}
      >
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-white/90">{description}</p>
      </div>
    </div>
  );
};

export default AnimatedRecipeCard;