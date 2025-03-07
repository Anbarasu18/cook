import React from 'react';
import confetti from 'canvas-confetti';

interface CelebrationCardProps {
  title: string;
  description: string;
  backgroundImage?: string;
  onCelebrate?: () => void;
}

const CelebrationCard: React.FC<CelebrationCardProps> = ({
  title,
  description,
  backgroundImage = 'https://source.unsplash.com/800x600/?spices',
  onCelebrate
}) => {
  const handleCelebrate = () => {
    // Launch confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FFA500', '#FF6347', '#FF1493', '#9370DB']
    });

    // Call custom celebration handler if provided
    if (onCelebrate) {
      onCelebrate();
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        background: `url(${backgroundImage}) center/cover no-repeat`,
      }}
    >
      <div className="glass-card backdrop-blur-md bg-white/20 border border-white/30 rounded-xl p-8 w-full max-w-sm text-center text-white shadow-xl transition-all duration-300 hover:bg-white/30">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-6 opacity-90">{description}</p>
        <button
          onClick={handleCelebrate}
          className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full border border-white/50 transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          Celebrate!
        </button>
      </div>
    </div>
  );
};

export default CelebrationCard;