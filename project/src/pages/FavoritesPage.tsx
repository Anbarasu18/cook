import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import RecipeGrid from '../components/RecipeGrid';
import EmptyState from '../components/EmptyState';
import TagInput from '../components/TagInput';
import { Heart, Tag, Filter, X, Grid, List, Search } from 'lucide-react';

const FavoritesPage: React.FC = () => {
  const { favorites, getFavoriteTags, getFavoritesByTag } = useFavorites();
  const [activeTag, setActiveTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showTagManager, setShowTagManager] = useState(false);
  const [customTags, setCustomTags] = useState<string[]>([]);
  
  const allTags = getFavoriteTags();
  
  // Filter favorites based on active tag and search query
  const filteredFavorites = getFavoritesByTag(activeTag).filter(meal => 
    searchQuery === '' || 
    meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase()) ||
    meal.strCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
    meal.strArea.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add custom tag to all existing tags
  const handleAddCustomTag = (tag: string) => {
    if (tag && !allTags.includes(tag)) {
      setCustomTags([...customTags, tag]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <Heart className="text-red-500 mr-2" size={28} />
            My Favorite Recipes
          </h1>
          <p className="text-gray-600">
            {favorites.length} {favorites.length === 1 ? 'recipe' : 'recipes'} saved
          </p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search favorites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
          
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-amber-100 text-amber-600' : 'bg-white text-gray-700'}`}
              aria-label="Grid view"
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-amber-100 text-amber-600' : 'bg-white text-gray-700'}`}
              aria-label="List view"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Tag filters */}
      {favorites.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold flex items-center">
              <Filter size={18} className="mr-2 text-amber-600" />
              Filter by Tag
            </h2>
            <button
              onClick={() => setShowTagManager(!showTagManager)}
              className="text-amber-600 hover:text-amber-700 text-sm font-medium"
            >
              {showTagManager ? 'Hide Tag Manager' : 'Manage Tags'}
            </button>
          </div>
          
          {showTagManager && (
            <div className="bg-amber-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-700 mb-2">
                Create new tags to organize your favorite recipes:
              </p>
              <TagInput 
                tags={customTags} 
                onChange={setCustomTags}
                placeholder="Add new tags..."
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => setShowTagManager(false)}
                  className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                >
                  Done
                </button>
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag('all')}
              className={`flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeTag === 'all'
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Recipes
            </button>
            
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeTag === tag
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Tag size={14} className="mr-1" />
                {tag}
                <span className="ml-1 text-xs">
                  ({getFavoritesByTag(tag).length})
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Favorites content */}
      {favorites.length > 0 ? (
        <>
          {filteredFavorites.length > 0 ? (
            <RecipeGrid meals={filteredFavorites} />
          ) : (
            <EmptyState 
              message={searchQuery ? `No favorites matching "${searchQuery}"` : `No recipes with the tag "${activeTag}"`} 
              suggestion={searchQuery ? "Try a different search term or clear the search" : "Select a different tag or 'All Recipes'"}
            />
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <div className="bg-amber-100 p-6 inline-flex rounded-full mb-4">
            <Heart size={48} className="text-amber-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Your favorites list is empty</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            Save your favorite recipes to access them quickly later. Look for the heart icon on recipes you love!
          </p>
          <Link
            to="/"
            className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-lg transition-colors inline-block"
          >
            Discover Recipes
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;