import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChevronDown, Grid, List, Filter, X, Heart, Share2, Printer } from 'lucide-react';

interface RecipeDiscoveryProps {
  searchQuery: string;
}

const RecipeDiscovery: React.FC<RecipeDiscoveryProps> = ({ searchQuery }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  // Mock recipe data
  const recipes = [
    {
      id: 1,
      title: 'Creamy Tuscan Chicken Pasta',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      time: '30 min',
      difficulty: 'Medium',
      category: 'Italian',
      description: 'Creamy pasta with sun-dried tomatoes, spinach, and tender chicken breast in a rich garlic parmesan sauce.',
    },
    {
      id: 2,
      title: 'Vegetable Buddha Bowl',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      time: '20 min',
      difficulty: 'Easy',
      category: 'Vegetarian',
      description: 'A nourishing bowl packed with colorful vegetables, quinoa, avocado, and a zesty tahini dressing.',
    },
    {
      id: 3,
      title: 'Spicy Korean Beef Tacos',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      time: '25 min',
      difficulty: 'Medium',
      category: 'Fusion',
      description: 'Tender Korean-style beef topped with kimchi slaw and sriracha mayo in soft corn tortillas.',
    },
    {
      id: 4,
      title: 'Mediterranean Grilled Salmon',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      time: '35 min',
      difficulty: 'Medium',
      category: 'Mediterranean',
      description: 'Perfectly grilled salmon with lemon, herbs, and a side of roasted vegetables and tzatziki sauce.',
    },
    {
      id: 5,
      title: 'Classic Chocolate Chip Cookies',
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      time: '45 min',
      difficulty: 'Easy',
      category: 'Dessert',
      description: 'Soft and chewy chocolate chip cookies with a perfect golden edge and melty chocolate centers.',
    },
    {
      id: 6,
      title: 'Thai Green Curry',
      image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      time: '40 min',
      difficulty: 'Medium',
      category: 'Thai',
      description: 'Aromatic green curry with coconut milk, vegetables, and your choice of protein served with jasmine rice.',
    },
  ];

  // Filter categories
  const filterCategories = [
    {
      name: 'Meal Type',
      options: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'],
    },
    {
      name: 'Dietary',
      options: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Low-Carb'],
    },
    {
      name: 'Cooking Time',
      options: ['Under 15 min', '15-30 min', '30-60 min', 'Over 60 min'],
    },
    {
      name: 'Difficulty',
      options: ['Easy', 'Medium', 'Hard'],
    },
    {
      name: 'Cuisine',
      options: ['Italian', 'Mexican', 'Asian', 'Mediterranean', 'American', 'Indian'],
    },
  ];

  // Toggle filter
  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters([]);
  };

  // Filter recipes based on search query and active filters
  const filteredRecipes = recipes.filter(recipe => {
    // Search query filter
    if (searchQuery && !recipe.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Active filters
    if (activeFilters.length > 0) {
      // Check if recipe matches any of the active filters
      const matchesDifficulty = activeFilters.includes(recipe.difficulty);
      const matchesCategory = activeFilters.includes(recipe.category);
      
      // Add more filter logic as needed
      
      return matchesDifficulty || matchesCategory;
    }
    
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Discover Recipes</h1>
          <p className="text-gray-600">
            {searchQuery 
              ? `Search results for "${searchQuery}"`
              : 'Browse our collection of delicious recipes'}
          </p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            <Filter size={18} />
            <span>Filters</span>
            <ChevronDown size={18} />
          </button>
          
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-amber-100 text-amber-600' : 'bg-white text-gray-700'}`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-amber-100 text-amber-600' : 'bg-white text-gray-700'}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm text-gray-600">Active filters:</span>
          {activeFilters.map(filter => (
            <span
              key={filter}
              className="flex items-center bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm"
            >
              {filter}
              <button
                onClick={() => toggleFilter(filter)}
                className="ml-1 text-amber-800 hover:text-amber-900"
              >
                <X size={14} />
              </button>
            </span>
          ))}
          <button
            onClick={clearFilters}
            className="text-sm text-amber-600 hover:text-amber-700 ml-2"
          >
            Clear all
          </button>
        </div>
      )}
      
      {/* Filters Panel */}
      {filtersOpen && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filterCategories.map(category => (
              <div key={category.name}>
                <h3 className="font-semibold mb-3">{category.name}</h3>
                <div className="space-y-2">
                  {category.options.map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={activeFilters.includes(option)}
                        onChange={() => toggleFilter(option)}
                        className="rounded text-amber-500 focus:ring-amber-500 mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end mt-6">
            <button
              onClick={clearFilters}
              className="text-gray-600 hover:text-gray-800 mr-4"
            >
              Clear All
            </button>
            <button
              onClick={() => setFiltersOpen(false)}
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
      
      {/* Recipe Grid/List View */}
      {filteredRecipes.length > 0 ? (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
          : "space-y-6"
        }>
          {filteredRecipes.map(recipe => (
            viewMode === 'grid' ? (
              <Link
                key={recipe.id}
                to={`/recipes/${recipe.id}`}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
                      {recipe.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock size={14} className="mr-1" />
                      {recipe.time}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{recipe.title}</h3>
                  <div className="flex items-center text-gray-500 text-sm">
                    <span className="mr-2">Difficulty:</span>
                    <span className={`font-medium ${
                      recipe.difficulty === 'Easy' ? 'text-green-600' :
                      recipe.difficulty === 'Medium' ? 'text-amber-600' : 'text-red-600'
                    }`}>
                      {recipe.difficulty}
                    </span>
                  </div>
                </div>
              </Link>
            ) : (
              <div
                key={recipe.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow flex"
              >
                <div className="w-1/3 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 w-2/3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
                      {recipe.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock size={14} className="mr-1" />
                      {recipe.time}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{recipe.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-500 text-sm">
                      <span className="mr-2">Difficulty:</span>
                      <span className={`font-medium ${
                        recipe.difficulty === 'Easy' ? 'text-green-600' :
                        recipe.difficulty === 'Medium' ? 'text-amber-600' : 'text-red-600'
                      }`}>
                        {recipe.difficulty}
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-500 hover:text-amber-600 transition-colors">
                        <Heart size={18} />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-amber-600 transition-colors">
                        <Share2 size={18} />
                      </button>
                      <Link
                        to={`/recipes/${recipe.id}`}
                        className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-1 rounded-lg text-sm transition-colors"
                      >
                        View Recipe
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">No recipes found matching your criteria.</p>
          <button
            onClick={clearFilters}
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-full"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeDiscovery;