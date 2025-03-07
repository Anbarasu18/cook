import React from 'react';
import { Link } from 'react-router-dom';
import { Meal } from '../types/recipe';
import { Globe, Tag } from 'lucide-react';
import FavoriteButton from './FavoriteButton';

interface RecipeCardProps {
  meal: Meal;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ meal }) => {
  return (
    <Link
      to={`/recipe/${meal.idMeal}`}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {meal.strCategory}
          </span>
        </div>
        <div className="absolute top-2 left-2">
          <FavoriteButton meal={meal} showText={false} size="small" />
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{meal.strMeal}</h3>
        <div className="mt-auto flex items-center text-gray-600 text-sm">
          <Globe size={16} className="mr-1" />
          <span>{meal.strArea}</span>
          
          {meal.strTags && (
            <div className="ml-auto flex items-center">
              <Tag size={16} className="mr-1" />
              <span className="truncate max-w-[100px]">
                {meal.strTags.split(',')[0]}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;