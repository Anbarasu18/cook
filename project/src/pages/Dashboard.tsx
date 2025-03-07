import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChefHat, Heart, Calendar, ShoppingCart, Settings, Plus } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Mock user data
  const user = {
    name: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    savedRecipes: 24,
    completedRecipes: 18,
  };

  // Mock saved recipes
  const savedRecipes = [
    {
      id: 1,
      title: 'Creamy Tuscan Chicken Pasta',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      time: '30 min',
      category: 'Italian',
      saved: true,
    },
    {
      id: 2,
      title: 'Vegetable Buddha Bowl',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      time: '20 min',
      category: 'Vegetarian',
      saved: true,
    },
    {
      id: 3,
      title: 'Spicy Korean Beef Tacos',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      time: '25 min',
      category: 'Fusion',
      saved: true,
    },
  ];

  // Mock recent recipes
  const recentRecipes = [
    {
      id: 4,
      title: 'Mediterranean Grilled Salmon',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      time: '35 min',
      category: 'Mediterranean',
      date: '2 days ago',
    },
    {
      id: 5,
      title: 'Classic Chocolate Chip Cookies',
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      time: '45 min',
      category: 'Dessert',
      date: '3 days ago',
    },
  ];

  // Mock meal plan
  const mealPlan = [
    { day: 'Monday', recipe: 'Lemon Herb Roasted Chicken' },
    { day: 'Tuesday', recipe: 'Vegetable Stir Fry' },
    { day: 'Wednesday', recipe: 'Beef Tacos' },
    { day: 'Thursday', recipe: 'Pasta Primavera' },
    { day: 'Friday', recipe: 'Grilled Salmon' },
    { day: 'Saturday', recipe: 'Homemade Pizza' },
    { day: 'Sunday', recipe: 'Slow Cooker Pot Roast' },
  ];

  // Mock shopping list
  const shoppingList = [
    { item: 'Chicken breast', amount: '2 lbs', checked: false },
    { item: 'Spinach', amount: '1 bag', checked: true },
    { item: 'Pasta', amount: '1 box', checked: false },
    { item: 'Heavy cream', amount: '1 pint', checked: false },
    { item: 'Parmesan cheese', amount: '8 oz', checked: true },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* User Profile Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
            <p className="text-gray-600 mb-4">Welcome back to your kitchen dashboard!</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="bg-amber-50 px-4 py-2 rounded-lg">
                <p className="text-amber-800 font-semibold">{user.savedRecipes}</p>
                <p className="text-sm text-gray-600">Saved Recipes</p>
              </div>
              <div className="bg-amber-50 px-4 py-2 rounded-lg">
                <p className="text-amber-800 font-semibold">{user.completedRecipes}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <Link
              to="/profile/edit"
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-center transition-colors"
            >
              Edit Profile
            </Link>
            <Link
              to="/settings"
              className="flex items-center justify-center gap-1 text-gray-600 hover:text-amber-600 transition-colors"
            >
              <Settings size={16} />
              <span>Settings</span>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Left and Center */}
        <div className="lg:col-span-2 space-y-8">
          {/* Saved Recipes */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Saved Recipes</h2>
              <Link
                to="/saved-recipes"
                className="text-amber-600 hover:text-amber-700 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {savedRecipes.map(recipe => (
                <Link
                  key={recipe.id}
                  to={`/recipes/${recipe.id}`}
                  className="group"
                >
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <button className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md">
                        <Heart size={16} className="text-red-500 fill-current" />
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <h3 className="text-white font-medium line-clamp-1">{recipe.title}</h3>
                      <div className="flex justify-between items-center text-xs text-white/80">
                        <span>{recipe.category}</span>
                        <span className="flex items-center">
                          <Clock size={12} className="mr-1" />
                          {recipe.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Recently Viewed */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Recently Viewed</h2>
              <Link
                to="/history"
                className="text-amber-600 hover:text-amber-700 text-sm font-medium"
              >
                View History
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentRecipes.map(recipe => (
                <Link
                  key={recipe.id}
                  to={`/recipes/${recipe.id}`}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{recipe.title}</h3>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{recipe.category}</span>
                      <span className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {recipe.time}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">{recipe.date}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Sidebar - Right */}
        <div className="space-y-8">
          {/* Meal Plan */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Weekly Meal Plan</h2>
              <Link
                to="/meal-planner"
                className="flex items-center text-amber-600 hover:text-amber-700 text-sm font-medium"
              >
                <Calendar size={16} className="mr-1" />
                <span>Planner</span>
              </Link>
            </div>
            
            <div className="space-y-3">
              {mealPlan.map((meal, index) => (
                <div key={index} className="flex items-center justify-between p-2 border-b border-gray-100 last:border-0">
                  <div className="font-medium text-gray-700">{meal.day}</div>
                  <div className="text-sm text-gray-600">{meal.recipe}</div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 flex items-center justify-center gap-1 text-amber-600 hover:text-amber-700 font-medium">
              <Plus size={16} />
              <span>Add Meal</span>
            </button>
          </div>
          
          {/* Shopping List */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Shopping List</h2>
              <Link
                to="/shopping-list"
                className="flex items-center text-amber-600 hover:text-amber-700 text-sm font-medium"
              >
                <ShoppingCart size={16} className="mr-1" />
                <span>Full List</span>
              </Link>
            </div>
            
            <div className="space-y-2">
              {shoppingList.map((item, index) => (
                <div key={index} className="flex items-center p-2">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    className="mr-3 rounded text-amber-500 focus:ring-amber-500"
                    readOnly
                  />
                  <div className={`flex-1 ${item.checked ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {item.item}
                  </div>
                  <div className="text-sm text-gray-500">{item.amount}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex items-center">
              <input
                type="text"
                placeholder="Add item..."
                className="flex-1 border-b border-gray-300 focus:border-amber-500 focus:outline-none py-1"
              />
              <button className="ml-2 p-1 text-amber-600 hover:text-amber-700">
                <Plus size={18} />
              </button>
            </div>
          </div>
          
          {/* Cooking Tips */}
          <div className="bg-amber-50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <ChefHat size={20} className="text-amber-600" />
              <h2 className="text-lg font-bold">Cooking Tip</h2>
            </div>
            <p className="text-gray-700 mb-3">
              When cooking pasta, add salt to the water only after it starts boiling. This raises the boiling point and seasons the pasta from the inside out.
            </p>
            <button className="text-amber-600 hover:text-amber-700 text-sm font-medium">
              More Tips
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;