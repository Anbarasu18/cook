import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Meal } from '../types/recipe';
import { useFavorites } from '../context/FavoritesContext';

interface FavoriteButtonProps {
  meal: Meal;
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  className?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ 
  meal, 
  size = 'medium', 
  showText = true,
  className = ''
}) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const isFav = isFavorite(meal.idMeal);
  
  const sizeClasses = {
    small: 'p-1.5 text-sm',
    medium: 'p-2 text-base',
    large: 'p-3 text-lg'
  };
  
  const iconSizes = {
    small: 16,
    medium: 20,
    large: 24
  };

  const handleToggleFavorite = () => {
    if (isFav) {
      removeFavorite(meal.idMeal);
    } else {
      setIsAnimating(true);
      addFavorite(meal);
      
      // Reset animation after it completes
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    }
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleToggleFavorite();
      }}
      className={`flex items-center justify-center rounded-full transition-all ${
        isFav 
          ? 'bg-red-100 text-red-600 hover:bg-red-200' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      } ${sizeClasses[size]} ${className}`}
      aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart 
        size={iconSizes[size]} 
        className={`${isFav ? 'fill-current' : ''} ${
          isAnimating ? 'animate-heartbeat' : ''
        }`} 
      />
      {showText && (
        <span className="ml-1">{isFav ? 'Saved' : 'Save'}</span>
      )}
    </button>
  );
};

export default FavoriteButton;