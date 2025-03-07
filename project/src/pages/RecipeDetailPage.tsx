import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMealById, extractIngredients } from '../services/mealService';
import { Meal, Ingredient } from '../types/recipe';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import FavoriteButton from '../components/FavoriteButton';
import TagInput from '../components/TagInput';
import { useFavorites } from '../context/FavoritesContext';
import { 
  ArrowLeft, 
  Clock, 
  Globe, 
  Tag, 
  Youtube, 
  Utensils, 
  ExternalLink,
  Printer,
  Share2,
  Heart
} from 'lucide-react';

const RecipeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [meal, setMeal] = useState<Meal | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTagInput, setShowTagInput] = useState(false);
  const [currentTags, setCurrentTags] = useState<string[]>([]);
  
  const { 
    isFavorite, 
    addFavorite, 
    removeFavorite, 
    updateFavoriteTags,
    getFavoriteTags
  } = useFavorites();

  useEffect(() => {
    const fetchMealDetails = async () => {
      if (!id) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const mealData = await getMealById(id);
        if (mealData) {
          setMeal(mealData);
          setIngredients(extractIngredients(mealData));
        } else {
          setError('Recipe not found. It may have been removed or is temporarily unavailable.');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMealDetails();
  }, [id]);

  // Set initial tags if recipe is already a favorite
  useEffect(() => {
    if (meal && isFavorite(meal.idMeal)) {
      const existingTags = getFavoriteTags().filter(tag => 
        isFavorite(meal.idMeal) && 
        useFavorites().getFavoritesByTag(tag).some(fav => fav.idMeal === meal.idMeal)
      );
      setCurrentTags(existingTags);
    }
  }, [meal, isFavorite]);

  const formatInstructions = (instructions: string) => {
    // Split by numbered steps if they exist
    if (instructions.match(/\d+\.\s/)) {
      return instructions.split(/\d+\.\s/).filter(step => step.trim());
    }
    
    // Otherwise split by periods, but be careful with abbreviations
    return instructions
      .split('.')
      .filter(step => step.trim())
      .map(step => step.trim() + '.');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleToggleFavorite = () => {
    if (!meal) return;
    
    if (isFavorite(meal.idMeal)) {
      removeFavorite(meal.idMeal);
      setShowTagInput(false);
    } else {
      addFavorite(meal, currentTags);
      setShowTagInput(true);
    }
  };

  const handleTagsChange = (newTags: string[]) => {
    setCurrentTags(newTags);
    if (meal && isFavorite(meal.idMeal)) {
      updateFavoriteTags(meal.idMeal, newTags);
    }
  };

  const handleAddToFavorites = () => {
    if (!meal) return;
    
    if (!isFavorite(meal.idMeal)) {
      addFavorite(meal, currentTags);
    }
    setShowTagInput(true);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center">
        <LoadingSpinner size="large" />
        <p className="text-gray-600 mt-4">Loading recipe details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-lg">
        <button 
          onClick={handleGoBack}
          className="flex items-center text-amber-600 hover:text-amber-700 mb-8"
        >
          <ArrowLeft size={20} className="mr-1" />
          Back to search results
        </button>
        <ErrorMessage message={error} onRetry={() => navigate(0)} />
      </div>
    );
  }

  if (!meal) {
    return null;
  }

  const instructionSteps = formatInstructions(meal.strInstructions);
  const tags = meal.strTags ? meal.strTags.split(',') : [];
  const isFav = isFavorite(meal.idMeal);
  const allTags = getFavoriteTags();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px]">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute top-4 left-4 md:top-6 md:left-6">
          <button 
            onClick={handleGoBack}
            className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
          <div className="container mx-auto">
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {meal.strCategory}
              </span>
              <span className="bg-gray-700/50 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <Globe size={14} className="mr-1" />
                {meal.strArea}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{meal.strMeal}</h1>
            <div className="flex flex-wrap items-center text-sm md:text-base gap-x-6 gap-y-2">
              {tags.length > 0 && (
                <div className="flex items-center">
                  <Tag size={18} className="mr-1" />
                  <span>{tags.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Recipe Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 mb-8">
              <FavoriteButton 
                meal={meal} 
                size="large" 
                className="min-w-[120px]"
              />
              
              {meal.strYoutube && (
                <a
                  href={meal.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Youtube size={18} className="mr-2" />
                  Watch Video
                </a>
              )}
              <button className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors">
                <Printer size={18} className="mr-2" />
                Print Recipe
              </button>
              <button className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors">
                <Share2 size={18} className="mr-2" />
                Share
              </button>
            </div>
            
            {/* Favorite Tags Section */}
            {isFav && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Heart size={20} className="text-red-500 fill-current mr-2" />
                    <h3 className="text-lg font-semibold">Saved to Favorites</h3>
                  </div>
                  <button
                    onClick={() => setShowTagInput(!showTagInput)}
                    className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                  >
                    {showTagInput ? 'Hide Tags' : 'Manage Tags'}
                  </button>
                </div>
                
                {showTagInput ? (
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700 mb-2">
                      Add tags to organize your favorites:
                    </p>
                    <TagInput 
                      tags={currentTags} 
                      onChange={handleTagsChange}
                      suggestions={allTags}
                    />
                  </div>
                ) : currentTags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {currentTags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    No tags added. Click "Manage Tags" to organize this recipe.
                  </p>
                )}
              </div>
            )}
            
            {/* Ingredients */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Utensils className="text-amber-500 mr-2" size={24} />
                Ingredients
              </h2>
              <div className="bg-amber-50 rounded-lg p-6">
                <ul className="space-y-3">
                  {ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </span>
                      <div>
                        <span className="font-medium">{ingredient.measure}</span>
                        <span className="ml-2">{ingredient.name}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Instructions */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Clock className="text-amber-500 mr-2" size={24} />
                Instructions
              </h2>
              <div className="space-y-6">
                {instructionSteps.map((step, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border-l-4 border-amber-500 bg-white shadow-sm"
                  >
                    <div className="flex items-start">
                      <div className="mr-4">
                        <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center">
                          {index + 1}
                        </div>
                      </div>
                      <p className="text-gray-700">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Source and Attribution */}
            <div className="mt-12 pt-6 border-t border-gray-200 text-sm text-gray-500">
              <p>Recipe data provided by <a href="https://www.themealdb.com/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">TheMealDB</a></p>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Recipe Details */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Recipe Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{meal.strCategory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cuisine:</span>
                  <span className="font-medium">{meal.strArea}</span>
                </div>
                {tags.length > 0 && (
                  <div>
                    <span className="text-gray-600">Tags:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {!isFav && (
                <button
                  onClick={handleAddToFavorites}
                  className="w-full mt-6 flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  <Heart size={18} className="mr-2" />
                  Add to Favorites
                </button>
              )}
            </div>
            
            {/* YouTube Video */}
            {meal.strYoutube && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="font-bold text-lg mb-4">Video Tutorial</h3>
                <div className="relative pt-[56.25%] bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={meal.strYoutube.replace('watch?v=', 'embed/')}
                    title={`${meal.strMeal} video tutorial`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <a 
                  href={meal.strYoutube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-amber-600 hover:text-amber-700 flex items-center"
                >
                  Watch on YouTube <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;