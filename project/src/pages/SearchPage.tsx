import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import RecipeGrid from '../components/RecipeGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import { searchMeals, getRandomMeals } from '../services/mealService';
import { Meal } from '../types/recipe';
import { ChefHat } from 'lucide-react';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [meals, setMeals] = useState<Meal[]>([]);
  const [randomMeals, setRandomMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRandomLoading, setIsRandomLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Handle search
  const handleSearch = async (query: string) => {
    setSearchParams({ q: query });
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    
    try {
      const results = await searchMeals(query);
      setMeals(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Load initial search results if query parameter exists
  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, []);

  // Load random meals for initial state
  useEffect(() => {
    const loadRandomMeals = async () => {
      if (!hasSearched && randomMeals.length === 0) {
        setIsRandomLoading(true);
        try {
          const results = await getRandomMeals(8);
          setRandomMeals(results);
        } catch (err) {
          console.error('Failed to load random meals:', err);
        } finally {
          setIsRandomLoading(false);
        }
      }
    };

    loadRandomMeals();
  }, [hasSearched, randomMeals.length]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
          Find Your Perfect Recipe
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Search thousands of recipes from around the world. Enter an ingredient, dish name, or cuisine type to get started.
        </p>
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      </div>

      {/* Error state */}
      {error && (
        <div className="my-8 max-w-lg mx-auto">
          <ErrorMessage 
            message={error} 
            onRetry={() => initialQuery && handleSearch(initialQuery)} 
          />
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="my-12 flex flex-col items-center">
          <LoadingSpinner size="large" />
          <p className="text-gray-600 mt-4">Searching for delicious recipes...</p>
        </div>
      )}

      {/* Search results */}
      {!isLoading && hasSearched && (
        <div className="my-8">
          <h2 className="text-2xl font-semibold mb-6">
            {meals.length > 0 
              ? `Search Results for "${initialQuery}"`
              : ''}
          </h2>
          
          {meals.length > 0 ? (
            <RecipeGrid meals={meals} />
          ) : !error && (
            <EmptyState 
              message={`No recipes found for "${initialQuery}"`} 
            />
          )}
        </div>
      )}

      {/* Random recipes (shown when no search has been performed) */}
      {!hasSearched && (
        <div className="my-8">
          <div className="flex items-center mb-6">
            <ChefHat className="text-amber-500 mr-2" size={24} />
            <h2 className="text-2xl font-semibold">Discover Random Recipes</h2>
          </div>
          
          {isRandomLoading ? (
            <div className="my-8 flex justify-center">
              <LoadingSpinner size="medium" />
            </div>
          ) : (
            <RecipeGrid meals={randomMeals} />
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;