import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Clock, Globe, Users, ChefHat } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

interface RecipeDetailsProps {
  recipeId: string;
}

interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  [key: string]: string | null;
}

interface Ingredient {
  name: string;
  measure: string;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({ recipeId }) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
        );

        if (response.data.meals && response.data.meals[0]) {
          const recipeData = response.data.meals[0];
          setRecipe(recipeData);

          // Extract ingredients and measurements
          const extractedIngredients: Ingredient[] = [];
          for (let i = 1; i <= 20; i++) {
            const ingredient = recipeData[`strIngredient${i}`];
            const measure = recipeData[`strMeasure${i}`];

            if (ingredient && ingredient.trim() !== '') {
              extractedIngredients.push({
                name: ingredient,
                measure: measure || ''
              });
            }
          }
          setIngredients(extractedIngredients);
        } else {
          setError('Recipe not found');
        }
      } catch (err) {
        setError('Failed to fetch recipe details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!recipe) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Recipe Image */}
      <div className="relative h-[300px] md:h-[400px]">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {recipe.strCategory}
            </span>
            <span className="bg-amber-500/80 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <Globe size={14} className="mr-1" />
              {recipe.strArea}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">{recipe.strMeal}</h1>
        </div>
      </div>

      <div className="p-6">
        {/* Ingredients */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <ChefHat className="mr-2 text-amber-500" />
            Ingredients
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="flex items-center p-3 bg-amber-50 rounded-lg"
              >
                <span className="w-8 h-8 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mr-3 font-medium">
                  {index + 1}
                </span>
                <div>
                  <span className="font-medium">{ingredient.measure}</span>
                  <span className="ml-2">{ingredient.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div>
          <h2 className="text-xl font-bold mb-4">Instructions</h2>
          <div className="space-y-4">
            {recipe.strInstructions.split('\n').filter(step => step.trim()).map((step, index) => (
              <div
                key={index}
                className="flex items-start p-4 bg-gray-50 rounded-lg"
              >
                <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0 font-medium">
                  {index + 1}
                </span>
                <p className="text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;