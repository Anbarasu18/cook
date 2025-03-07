import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, ChefHat, Heart, Share2, Printer, Check, Timer, Plus, Minus, Play, ExternalLink } from 'lucide-react';

const RecipeGuide: React.FC = () => {
  const [servings, setServings] = useState(4);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions' | 'video' | 'variations'>('ingredients');
  const [timerActive, setTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [savedToFavorites, setSavedToFavorites] = useState(false);
  
  // Recipe data
  const recipe = {
    id: 1,
    title: 'Creamy Tuscan Chicken Pasta',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    time: '30 min',
    prepTime: '10 min',
    cookTime: '20 min',
    difficulty: 'Medium',
    category: 'Italian-American Fusion',
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
      { section: "For the Chicken", items: [
        { name: 'Boneless, skinless chicken breasts', amount: '1', unit: 'lb (450g)' },
        { name: 'Olive oil', amount: '2', unit: 'tbsp' },
        { name: 'Italian seasoning', amount: '1', unit: 'tsp' },
        { name: 'Garlic powder', amount: '1/2', unit: 'tsp' },
        { name: 'Salt', amount: '1/2', unit: 'tsp' },
        { name: 'Black pepper', amount: '1/4', unit: 'tsp' },
      ]},
      { section: "For the Pasta and Sauce", items: [
        { name: 'Fettuccine pasta', amount: '8', unit: 'oz (225g)', note: 'substitute: linguine or pappardelle' },
        { name: 'Garlic, minced', amount: '3', unit: 'cloves' },
        { name: 'Sun-dried tomatoes, julienned', amount: '1/2', unit: 'cup (80g)', note: 'oil-packed, drained' },
        { name: 'Fresh spinach', amount: '2', unit: 'cups (60g)' },
        { name: 'Heavy cream', amount: '1', unit: 'cup (240ml)', note: 'substitute: half-and-half for lighter version' },
        { name: 'Freshly grated Parmesan cheese', amount: '1/2', unit: 'cup (50g)' },
        { name: 'Chicken broth', amount: '1/4', unit: 'cup (60ml)', note: 'optional, for a thinner sauce' },
        { name: 'Red pepper flakes', amount: '1/4', unit: 'tsp', note: 'optional, for heat' },
        { name: 'Salt and pepper', amount: '', unit: 'to taste' },
      ]}
    ],
    equipment: [
      { name: 'Large skillet or sauté pan' },
      { name: 'Pasta pot' },
      { name: 'Meat thermometer', note: 'recommended' },
      { name: 'Cutting board and knife' },
      { name: 'Measuring cups and spoons' },
    ],
    instructions: [
      {
        step: 'Prepare the pasta: Bring a large pot of generously salted water to a boil. Cook the fettuccine according to package directions until al dente (typically 8-10 minutes). Reserve ½ cup of pasta water before draining.',
        tip: 'Pasta should have a slight bite to it as it will continue cooking slightly when added to the sauce',
        time: 10,
      },
      {
        step: 'Prepare the chicken: While the water is coming to a boil, slice the chicken breasts horizontally to create thinner cutlets. Pat dry with paper towels.',
        time: 2,
      },
      {
        step: 'Season the chicken: In a small bowl, combine Italian seasoning, garlic powder, salt, and pepper. Sprinkle this mixture evenly over both sides of the chicken cutlets, pressing gently to adhere.',
        time: 1,
      },
      {
        step: 'Cook the chicken: Heat olive oil in a large skillet over medium-high heat until shimmering. Add the chicken cutlets and cook for 4-5 minutes per side until golden brown and the internal temperature reaches 165°F (74°C).',
        tip: 'Chicken should be golden brown with clear juices when pierced',
        time: 10,
      },
      {
        step: 'Rest the chicken: Transfer the cooked chicken to a cutting board and let rest for 5 minutes. Once rested, slice into ½-inch strips against the grain.',
        tip: 'Resting prevents the juices from running out when sliced',
        time: 5,
      },
      {
        step: 'Start the sauce: In the same skillet (don\'t clean it!), reduce heat to medium and add the minced garlic. Cook for 30-45 seconds until fragrant but not browned.',
        tip: 'Garlic should be aromatic but not turning brown',
        time: 1,
      },
      {
        step: 'Add sun-dried tomatoes: Add the julienned sun-dried tomatoes to the skillet and cook for 1-2 minutes until they begin to soften and release their flavors.',
        time: 2,
      },
      {
        step: 'Create the cream sauce: Pour in the heavy cream and bring to a gentle simmer. Cook for 3-4 minutes, stirring occasionally, until the sauce begins to thicken slightly.',
        tip: 'Sauce should coat the back of a spoon',
        time: 4,
      },
      {
        step: 'Add cheese: Reduce heat to low and gradually stir in the grated Parmesan cheese until completely melted and the sauce is smooth. If the sauce seems too thick, add a splash of the reserved pasta water or chicken broth.',
        time: 1,
      },
      {
        step: 'Incorporate spinach: Add the fresh spinach to the sauce and stir until wilted, about 1-2 minutes.',
        tip: 'It will look like too much spinach at first, but it wilts down significantly',
        time: 2,
      },
      {
        step: 'Combine components: Add the sliced chicken back to the skillet along with the drained pasta. Toss everything together until well coated with the sauce. If needed, add more reserved pasta water to reach desired consistency.',
        tip: 'Pasta should be evenly coated but not swimming in sauce',
        time: 2,
      },
      {
        step: 'Final seasoning: Taste and adjust seasoning with salt, pepper, and red pepper flakes if using. The sauce should be rich, creamy, and well-balanced.',
        time: 1,
      },
      {
        step: 'Serve: Transfer to a serving dish or individual plates. Garnish with additional grated Parmesan cheese and a sprinkle of fresh herbs if desired.',
        tip: 'Pair with a simple green salad and garlic bread',
        time: 1,
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
    variations: [
      {
        name: "Seafood Tuscan Pasta",
        description: "Replace chicken with 1 lb of shrimp or scallops. Cook seafood for just 2-3 minutes per side until opaque.",
      },
      {
        name: "Vegetarian Tuscan Pasta",
        description: "Omit chicken and double the spinach and sun-dried tomatoes. Add 1 cup of sliced mushrooms and 1 diced bell pepper for extra substance.",
      },
      {
        name: "Spicy Tuscan Chicken Pasta",
        description: "Increase red pepper flakes to 1/2 tsp and add 1 tbsp of calabrian chili paste to the sauce for a spicy kick.",
      },
      {
        name: "Lighter Version",
        description: "Use half-and-half instead of heavy cream, reduce Parmesan to 1/4 cup, and use whole wheat pasta for a lighter meal.",
      },
    ],
    chefNotes: [
      "For a deeper flavor, marinate the chicken in Italian dressing for 30 minutes before cooking.",
      "The sauce will continue to thicken as it cools, so don't reduce it too much on the stove.",
      "Leftovers can be stored in an airtight container in the refrigerator for up to 3 days. Reheat gently with a splash of milk or cream to restore the sauce's consistency.",
    ],
    videoTutorial: {
      mainVideo: {
        title: "Creamy Tuscan Chicken Pasta Tutorial",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnail: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        timestamps: [
          { time: "1:25", description: "Proper technique for slicing chicken" },
          { time: "3:45", description: "How to tell when chicken is perfectly cooked" },
          { time: "5:30", description: "Creating the silky cream sauce" },
          { time: "7:15", description: "Incorporating spinach without overcooking" },
        ]
      },
      alternativeVideos: [
        { 
          title: "Italian Chef's Authentic Tuscan Pasta",
          url: "https://www.youtube.com/watch?v=oHg5SJYRHA0",
          thumbnail: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        },
        { 
          title: "Quick Weeknight Tuscan Chicken",
          url: "https://www.youtube.com/watch?v=6_b7RDuLwcI",
          thumbnail: "https://images.unsplash.com/photo-1600803907087-f56d462fd26b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        },
      ]
    }
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
            
            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200">
              <div className="flex overflow-x-auto">
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === 'ingredients'
                      ? 'text-amber-600 border-b-2 border-amber-600'
                      : 'text-gray-600 hover:text-amber-600'
                  }`}
                >
                  Ingredients & Equipment
                </button>
                <button
                  onClick={() => setActiveTab('instructions')}
                  className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === 'instructions'
                      ? 'text-amber-600 border-b-2 border-amber-600'
                      : 'text-gray-600 hover:text-amber-600'
                  }`}
                >
                  Step-by-Step Instructions
                </button>
                <button
                  onClick={() => setActiveTab('video')}
                  className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === 'video'
                      ? 'text-amber-600 border-b-2 border-amber-600'
                      : 'text-gray-600 hover:text-amber-600'
                  }`}
                >
                  Video Tutorial
                </button>
                <button
                  onClick={() => setActiveTab('variations')}
                  className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === 'variations'
                      ? 'text-amber-600 border-b-2 border-amber-600'
                      : 'text-gray-600 hover:text-amber-600'
                  }`}
                >
                  Variations & Tips
                </button>
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="mb-8">
              {/* Ingredients Tab */}
              {activeTab === 'ingredients' && (
                <div>
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
                  
                  {recipe.ingredients.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mb-6">
                      <h3 className="font-semibold text-lg mb-3">{section.section}</h3>
                      <ul className="space-y-3">
                        {section.items.map((ingredient, index) => (
                          <li key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mr-3">
                              {index + 1}
                            </span>
                            <div>
                              <span className="font-medium">
                                {getAdjustedAmount(ingredient.amount, recipe.servings)} {ingredient.unit}
                              </span>
                              <span className="ml-2 text-gray-700">{ingredient.name}</span>
                              {ingredient.note && (
                                <p className="text-sm text-gray-500 italic mt-1">{ingredient.note}</p>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  
                  <h3 className="font-semibold text-lg mb-3 mt-8">Special Equipment</h3>
                  <ul className="space-y-2">
                    {recipe.equipment.map((item, index) => (
                      <li key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <span className="w-8 h-8 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center mr-3">
                          {index + 1}
                        </span>
                        <div>
                          <span className="text-gray-700">{item.name}</span>
                          {item.note && (
                            <span className="text-sm text-gray-500 italic ml-2">({item.note})</span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Instructions Tab */}
              {activeTab === 'instructions' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Step-by-Step Instructions</h2>
                  <div className="space-y-6">
                    {recipe.instructions.map((instruction, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border-l-4 border-amber-500 bg-amber-50"
                      >
                        <div className="flex items-start">
                          <div className="mr-4">
                            <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center">
                              {index + 1}
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-700 mb-3">{instruction.step}</p>
                            {instruction.tip && (
                              <p className="text-sm text-amber-700 bg-amber-100 p-2 rounded-md mb-3">
                                <span className="font-semibold">Tip:</span> {instruction.tip}
                              </p>
                            )}
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
                </div>
              )}
              
              {/* Video Tutorial Tab */}
              {activeTab === 'video' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Video Tutorial</h2>
                  
                  <div className="mb-8">
                    <div className="relative pt-[56.25%] bg-gray-100 rounded-lg overflow-hidden mb-4">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img 
                          src={recipe.videoTutorial.mainVideo.thumbnail} 
                          alt={recipe.videoTutorial.mainVideo.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <a 
                            href={recipe.videoTutorial.mainVideo.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                          >
                            <Play size={32} className="text-amber-600 ml-1" />
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2">{recipe.videoTutorial.mainVideo.title}</h3>
                    <a 
                      href={recipe.videoTutorial.mainVideo.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-amber-600 hover:text-amber-700 flex items-center mb-4"
                    >
                      Watch on YouTube <ExternalLink size={14} className="ml-1" />
                    </a>
                    
                    <h4 className="font-medium mb-2">Key Timestamps:</h4>
                    <ul className="space-y-2 mb-6">
                      {recipe.videoTutorial.mainVideo.timestamps.map((timestamp, index) => (
                        <li key={index} className="flex items-start">
                          <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-sm font-medium mr-2">
                            {timestamp.time}
                          </span>
                          <span className="text-gray-700">{timestamp.description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-3">Alternative Video Resources</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recipe.videoTutorial.alternativeVideos.map((video, index) => (
                      <a 
                        key={index}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-20 h-20 relative rounded overflow-hidden mr-3">
                          <img 
                            src={video.thumbnail} 
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <Play size={24} className="text-white" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{video.title}</h4>
                          <span className="text-sm text-amber-600 flex items-center mt-1">
                            Watch on YouTube <ExternalLink size={12} className="ml-1" />
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Variations Tab */}
              {activeTab === 'variations' && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Recipe Variations</h2>
                  <div className="space-y-4 mb-8">
                    {recipe.variations.map((variation, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-lg mb-1">{variation.name}</h3>
                        <p className="text-gray-700">{variation.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-4">Chef's Notes</h2>
                  <div className="bg-amber-50 p-5 rounded-lg mb-8">
                    <ul className="space-y-3">
                      {recipe.chefNotes.map((note, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-amber-600 mr-2">•</span>
                          <span className="text-gray-700">{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
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
                <h3 className="font-semibold mb-4">Recipe Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Prep Time:</span>
                    <span className="font-medium">{recipe.prepTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cook Time:</span>
                    <span className="font-medium">{recipe.cookTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Time:</span>
                    <span className="font-medium">{recipe.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Servings:</span>
                    <span className="font-medium">{recipe.servings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Difficulty:</span>
                    <span className={`font-medium ${
                      recipe.difficulty === 'Easy' ? 'text-green-600' :
                      recipe.difficulty === 'Medium' ? 'text-amber-600' : 'text-red-600'
                    }`}>
                      {recipe.difficulty}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cuisine:</span>
                    <span className="font-medium">{recipe.category}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Jump */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Quick Jump</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => setActiveTab('ingredients')}
                    className="w-full text-left py-2 px-3 rounded-lg hover:bg-amber-50 transition-colors flex items-center"
                  >
                    <span className="w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mr-2">1</span>
                    Ingredients & Equipment
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('instructions')}
                    className="w-full text-left py-2 px-3 rounded-lg hover:bg-amber-50 transition-colors flex items-center"
                  >
                    <span className="w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mr-2">2</span>
                    Step-by-Step Instructions
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('video')}
                    className="w-full text-left py-2 px-3 rounded-lg hover:bg-amber-50 transition-colors flex items-center"
                  >
                    <span className="w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mr-2">3</span>
                    Video Tutorial
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('variations')}
                    className="w-full text-left py-2 px-3 rounded-lg hover:bg-amber-50 transition-colors flex items-center"
                  >
                    <span className="w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mr-2">4</span>
                    Variations & Tips
                  </button>
                </li>
              </ul>
            </div>
            
            {/* Serving Suggestions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg mb-4">Serving Suggestions</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-0.5" />
                  <span>Serve with a simple green salad dressed with olive oil and lemon juice</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-0.5" />
                  <span>Pair with garlic bread or a crusty baguette to soak up the delicious sauce</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-0.5" />
                  <span>A glass of medium-bodied white wine like Chardonnay complements the creamy sauce</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-green-500 mr-2 mt-0.5" />
                  <span>Garnish with fresh basil leaves and a sprinkle of red pepper flakes for color and flavor</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeGuide;