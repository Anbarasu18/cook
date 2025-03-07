import React from 'react';
import { Meal } from '../types/recipe';
import RecipeCard from './RecipeCard';

interface RecipeGridProps {
  meals: Meal[];
}

const RecipeGrid: React.FC<RecipeGridProps> = ({ meals }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {meals.map((meal) => (
        <RecipeCard key={meal.idMeal} meal={meal} />
      ))}
    </div>
  );
};

export default RecipeGrid;