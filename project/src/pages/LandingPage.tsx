import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Clock, Award, Filter, Heart } from 'lucide-react';

const LandingPage: React.FC = () => {
  // Featured recipes data
  const featuredRecipes = [
    {
      id: 1,
      title: 'Creamy Tuscan Chicken Pasta',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      time: '30 min',
      difficulty: 'Medium',
      category: 'Italian',
    },
    {
      id: 2,
      title: 'Vegetable Buddha Bowl',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      time: '20 min',
      difficulty: 'Easy',
      category: 'Vegetarian',
    },
    {
      id: 3,
      title: 'Spicy Korean Beef Tacos',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      time: '25 min',
      difficulty: 'Medium',
      category: 'Fusion',
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      text: 'CookBook has transformed my meal planning. I save so much time and have discovered amazing recipes my family loves!',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 2,
      name: 'Michael Chen',
      text: 'As someone who was intimidated by cooking, this app has made it approachable and fun. The step-by-step instructions are perfect.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      text: 'The recipe filtering is incredible! I have dietary restrictions and CookBook makes it so easy to find delicious meals that work for me.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
    },
  ];

  // Categories
  const categories = [
    { name: 'Quick & Easy', icon: <Clock size={24} /> },
    { name: 'Vegetarian', icon: <Filter size={24} /> },
    { name: 'Desserts', icon: <Heart size={24} /> },
    { name: 'Gourmet', icon: <Award size={24} /> },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Cooking background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your Virtual Kitchen Assistant
            </h1>
            <p className="text-xl mb-8">
              Discover, plan, and cook delicious meals with ease. Personalized recipes for every taste and skill level.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/recipes"
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-full transition-colors inline-flex items-center justify-center"
              >
                Browse Recipes
                <ChevronRight size={20} className="ml-1" />
              </Link>
              <Link
                to="/dashboard"
                className="bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 px-6 rounded-full transition-colors inline-flex items-center justify-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Explore Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/recipes?category=${category.name}`}
                className="bg-amber-50 hover:bg-amber-100 rounded-xl p-6 text-center transition-colors group"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Recipes</h2>
            <Link
              to="/recipes"
              className="text-amber-600 hover:text-amber-700 font-medium flex items-center"
            >
              View all
              <ChevronRight size={20} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRecipes.map((recipe) => (
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
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Cooking Experience?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of home cooks who have discovered the joy of cooking with CookBook.
          </p>
          <Link
            to="/dashboard"
            className="bg-white text-amber-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full text-lg transition-colors inline-block"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;