import React from 'react';
import { Heart, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

interface FavoritesCounterProps {
  showLink?: boolean;
}

const FavoritesCounter: React.FC<FavoritesCounterProps> = ({ showLink = true }) => {
  const { favoritesCount } = useFavorites();

  if (favoritesCount === 0 && !showLink) return null;

  return (
    <div className="flex items-center">
      {showLink ? (
        <Link 
          to="/favorites" 
          className="flex items-center text-gray-700 hover:text-amber-600 transition-colors"
        >
          <div className="relative">
            <Heart size={20} className="text-red-500" />
            {favoritesCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {favoritesCount > 99 ? '99+' : favoritesCount}
              </span>
            )}
          </div>
          <span className="ml-2 font-medium">Favorites</span>
          <ChevronRight size={16} className="ml-1" />
        </Link>
      ) : (
        <div className="flex items-center">
          <div className="relative">
            <Heart size={20} className="text-red-500" />
            {favoritesCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {favoritesCount > 99 ? '99+' : favoritesCount}
              </span>
            )}
          </div>
          <span className="ml-2 font-medium text-gray-700">{favoritesCount} Saved</span>
        </div>
      )}
    </div>
  );
};

export default FavoritesCounter;