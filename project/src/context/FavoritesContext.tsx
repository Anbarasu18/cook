import React, { createContext, useState, useEffect, useContext } from 'react';
import { Meal, FavoriteMeal, FavoritesContextType } from '../types/recipe';

// Create context with default values
const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
  updateFavoriteTags: () => {},
  getFavoriteTags: () => [],
  getFavoritesByTag: () => [],
  favoritesCount: 0
});

// Storage key for localStorage
const STORAGE_KEY = 'recipe-favorites';

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteMeal[]>([]);

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const storedFavorites = localStorage.getItem(STORAGE_KEY);
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error('Failed to parse favorites from localStorage:', error);
        // If parsing fails, reset localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  // Add a meal to favorites
  const addFavorite = (meal: Meal, tags: string[] = []) => {
    if (!isFavorite(meal.idMeal)) {
      const favoriteMeal: FavoriteMeal = {
        ...meal,
        dateAdded: new Date().toISOString(),
        tags: tags
      };
      setFavorites(prev => [...prev, favoriteMeal]);
    }
  };

  // Remove a meal from favorites
  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(meal => meal.idMeal !== id));
  };

  // Check if a meal is in favorites
  const isFavorite = (id: string): boolean => {
    return favorites.some(meal => meal.idMeal === id);
  };

  // Update tags for a favorite meal
  const updateFavoriteTags = (id: string, tags: string[]) => {
    setFavorites(prev => 
      prev.map(meal => 
        meal.idMeal === id 
          ? { ...meal, tags } 
          : meal
      )
    );
  };

  // Get all unique tags from favorites
  const getFavoriteTags = (): string[] => {
    const allTags = favorites.flatMap(meal => meal.tags);
    return [...new Set(allTags)];
  };

  // Get favorites filtered by tag
  const getFavoritesByTag = (tag: string): FavoriteMeal[] => {
    if (tag === 'all') return favorites;
    return favorites.filter(meal => meal.tags.includes(tag));
  };

  // Count of favorites
  const favoritesCount = favorites.length;

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    updateFavoriteTags,
    getFavoriteTags,
    getFavoritesByTag,
    favoritesCount
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to use the favorites context
export const useFavorites = () => useContext(FavoritesContext);