import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, Users, ChefHat, Heart, Share2, Printer, Check, Timer, Plus, Minus } from 'lucide-react';

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [servings, setServings] = useState(4);
  const [activeStep, setActiveStep] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [savedToFavorites, setSavedToFavorites] = useState(false);
  
  // Mock recipe data
  const recipe = {
    id: parseInt(id || '1'),
    title: 'Creamy Tuscan Chicken Pasta',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    time: '30 min',
    prepTime: '10 min',
    cookTime: '20 min',
    difficulty: 'Medium',
    category: 'Italian',
    servings: 4,
    calories: 520,
    rating: 4.8,
    reviews: 124,
    author: {
      name: 'Chef Maria',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    },
    description: "This creamy Tuscan chicken pasta is a restaurant-quality dinner that's easy to make at home. With sun-dried tomatoes, spinach, and tender chicken breast in a rich garlic parmesan sauce, it's sure to become a family favorite.",
    ingredients: [
      { name: 'Boneless, skinless chicken breasts', amount: '1 lb', unit: '' },
      { name: 'Fettuccine pasta', amount: '8', unit: 'oz' },
      { name: 'Sun-dried tomatoes', amount: '1/2', unit: 'cup' },
      { name: 'Fresh spinach', amount: '2', unit: 'cups' },
      { name: 'Heavy cream', amount: '1', unit: 'cup' },
      { name: 'Parmesan cheese, grated', amount: '1/2', unit: 'cup' },
      { name: 'Garlic, minced', amount: '3', unit: 'cloves' },
      { name: 'Italian seasoning', amount: '1', unit: 'tsp' },
      { name: 'Olive oil', amount: '2', unit: 'tbsp' },
      { name: 'Salt and pepper', amount: '', unit: 'to taste' },
    ],
    instructions: [
      {
        step: 'Cook pasta according to package directions until al dente. Drain and set aside.',
        time: 10,
      },
      {
        step: 'Season chicken breasts with salt, pepper, and Italian seasoning. Heat olive oil in a large skillet over medium-high heat.',
        time: 2,
      },
      {
        step: 'Add chicken to the skillet and cook for 5-7 minutes per side until golden brown and cooked through. Remove from pan and set aside.',
        time: 14,
      },
      {
        step: 'In the same skillet, add minced garlic and cook for 30 seconds until fragrant.',
        time: 1,
      },
      {
        step: 'Add sun-dried tomatoes and cook for 1-2 minutes.',
        time: 2,
      },
      {
        step: 'Pour in heavy cream and bring to a simmer. Cook for 3-4 minutes until slightly thickened.',
        time: 4,
      },
      {
        step: 'Stir in Parmesan cheese until melted and smooth.',
        time: 1,
      },
      {
        step: 'Slice the chicken and add it back to the skillet along with the spinach. Cook until spinach is wilted.',
        time: 2,
      },
      {
        step: 'Add the cooked pasta to the sauce and toss to coat. Serve hot with additional Parmesan cheese if desired.',
        time: 2,
      },
    ],
    nutrition: {
      calories: 520,
      protein: '32g',
      carbs: '42g',
      fat: '26g',
      fiber: '3g',
      sugar: '4g',
    },
    tags: ['pasta', 'chicken', 'italian', 'creamy', 'dinner'],
    relatedRecipes: [
      {
        id: 7,
        title: 'Lemon Garlic Shrimp Pasta',
        image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      },
      {
        id: 8,
        title: 'Classic Spaghetti Carbonara',
        image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      },
      {
        id: 9,
        title: 'Chicken Alfredo',
        image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      },
    ],
  };

  // Adjust ingredient amounts based on servings
  const getAdjustedAmount = (amount: string, originalServings: number) => {
    if (!amount) return '';
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) return amount;
    
    const ratio = servings / originalServings;
    const adjusted = numAmount * ratio;
    
    // Format to at most 2 decimal places and remove trailing zeros
    return adjusted.toFixed(2).replace(/\.?0+$/, '');
  };

  // Timer functions
  const startTimer = (seconds: number) => {
    setTimerSeconds(seconds * 60);
    setTimerActive(true);
    
    // In a real app, you would implement the actual timer functionality here
    // For this mockup, we're just setting the state
  };

  const toggleFavorite = () => {
    setSavedToFavorites(!savedToFavorites);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px]">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
          <div className="container mx-auto">
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {recipe.category}
              </span>
              <span className="text-amber-300 flex items-center">
                ★★★★★ <span className="ml-1">{recipe.rating} ({recipe.reviews})</span>
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{recipe.title}</h1>
            <div className="flex flex-wrap items-center text-sm md:text-base gap-x-6 gap-y-2">
              <div className="flex items-center">
                <Clock size={18} className="mr-1" />
                <span>Total: {recipe.time}</span>
              </div>
              <div className="flex items-center">
                <ChefHat size={18} className="mr-1" />
                <span>Prep: {recipe.prepTime}</span>
              </div>
              <div className="flex items-center">
                <Users size={18} className="mr-1" />
                <span>Servings: {recipe.servings}</span>
              </div>
              <div className="flex items-center">
                <span className={`font-medium ${
                  recipe.difficulty === 'Easy' ? 'text-green-400' :
                  recipe.difficulty === 'Medium' ? 'text-amber-400' : 'text-red-400'
                }`}>
                  {recipe.difficulty}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recipe Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">About This Recipe</h2>
              <p className="text-gray-700">{recipe.description}</p>
            </div>
            
            {/* Author */}
            <div className="flex items-center mb-8 p-4 bg-amber-50 rounded-lg">
              <img
                src={recipe.author.avatar}
                alt={recipe.author.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="text-sm text-gray-600">Recipe by</p>
                <p className="font-semibold">{recipe.author.name}</p>
              </div>
            </div>
            
            {/* Ingredients */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Ingredients</h2>
                <div className="flex items-center">
                  <button
                    onClick={() => setServings(Math.max(1, servings - 1))}
                    className="p-1 rounded-full bg-gray-200 text-gray-700"
                    disabled={servings <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="mx-3 font-medium">{servings} servings</span>
                  <button
                    onClick={() => setServings(servings + 1)}
                    className="p-1 rounded-full bg-gray-200 text-gray-700"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mr-3">
                      {index + 1}
                    </span>
                    <span className="font-medium">
                      {getAdjustedAmount(ingredient.amount, recipe.servings)} {ingredient.unit}
                    </span>
                    <span className="ml-2 text-gray-700">{ingredient.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Instructions */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Instructions</h2>
              <div className="space-y-6">
                {recipe.instructions.map((instruction, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      index === activeStep
                        ? 'bg-amber-50 border-amber-500'
                        : index < activeStep
                        ? 'bg-gray-50 border-green-500'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="mr-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index === activeStep
                            ? 'bg-amber-500 text-white'
                            : index < activeStep
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}>
                          {index < activeStep ? <Check size={16} /> : index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 mb-3">{instruction.step}</p>
                        <div className="flex items-center">
                          {instruction.time && (
                            <button
                              onClick={() => startTimer(instruction.time)}
                              className="flex items-center text-sm text-amber-600 hover:text-amber-700"
                            >
                              <Timer size={16} className="mr-1" />
                              Set timer for {instruction.time} min
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  disabled={activeStep === 0}
                >
                  Previous Step
                </button>
                <button
                  onClick={() => setActiveStep(Math.min(recipe.instructions.length - 1, activeStep + 1))}
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-50"
                  disabled={activeStep === recipe.instructions.length - 1}
                >
                  Next Step
                </button>
              </div>
            </div>
            
            {/* Nutrition */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Nutrition Information</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-gray-600 text-sm">Calories</p>
                  <p className="text-xl font-bold text-amber-600">{recipe.nutrition.calories}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-gray-600 text-sm">Protein</p>
                  <p className="text-xl font-bold text-amber-600">{recipe.nutrition.protein}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-gray-600 text-sm">Carbs</p>
                  <p className="text-xl font-bold text-amber-600">{recipe.nutrition.carbs}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-gray-600 text-sm">Fat</p>
                  <p className="text-xl font-bold text-amber-600">{recipe.nutrition.fat}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-gray-600 text-sm">Fiber</p>
                  <p className="text-xl font-bold text-amber-600">{recipe.nutrition.fiber}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-gray-600 text-sm">Sugar</p>
                  <p className="text-xl font-bold text-amber-600">{recipe.nutrition.sugar}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">* Percent Daily Values are based on a 2,000 calorie diet.</p>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Action Buttons */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between mb-6">
                <button
                  onClick={toggleFavorite}
                  className={`flex items-center justify-center w-1/3 py-2 rounded-lg transition-colors ${
                    savedToFavorites
                      ? 'bg-red-100 text-red-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Heart size={20} className={savedToFavorites ? 'fill-current' : ''} />
                  <span className="ml-2">Save</span>
                </button>
                <button className="flex items-center justify-center w-1/3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Share2 size={20} />
                  <span className="ml-2">Share</span>
                </button>
                <button className="flex items-center justify-center w-1/3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Printer size={20} />
                  <span className="ml-2">Print</span>
                </button>
              </div>
              
              {timerActive && (
                <div className="bg-amber-50 p-4 rounded-lg mb-6">
                  <p className="font-medium text-center mb-2">Timer Running</p>
                  <div className="text-3xl font-bold text-amber-600 text-center">
                    {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
                  </div>
                  <button
                    onClick={() => setTimerActive(false)}
                    className="w-full mt-2 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                  >
                    Stop Timer
                  </button>
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Related Recipes */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-xl mb-4">You Might Also Like</h3>
              <div className="space-y-4">
                {recipe.relatedRecipes.map((related) => (
                  <div key={related.id} className="flex items-center">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-20 h-20 object-cover rounded-lg mr-4"
                    />
                    <h4 className="font-medium hover:text-amber-600 transition-colors">
                      {related.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;