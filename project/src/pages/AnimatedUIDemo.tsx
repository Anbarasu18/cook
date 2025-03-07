import React, { useState } from 'react';
import { Home, Settings, User, Bell, Heart, Search, Zap, Layers, Compass, Star } from 'lucide-react';
import AnimatedButton from '../components/UI/AnimatedButton';
import MorphingCard from '../components/UI/MorphingCard';
import AnimatedMenu from '../components/UI/AnimatedMenu';
import GradientBackground from '../components/UI/GradientBackground';
import ParallaxContainer, { ParallaxLayer } from '../components/UI/ParallaxContainer';
import AnimatedScene from '../components/3D/AnimatedScene';
import AnimatedRecipeCard from '../components/UI/AnimatedRecipeCard';
import ParallaxScroll from '../components/UI/ParallaxScroll';
import HoverCard from '../components/UI/HoverCard';
import CelebrationCard from '../components/UI/CelebrationCard';

const AnimatedUIDemo: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('celebration');
  
  // Menu items
  const menuItems = [
    { label: 'Home', icon: <Home size={18} /> },
    { label: 'Profile', icon: <User size={18} /> },
    { label: 'Settings', icon: <Settings size={18} /> },
    { label: 'Notifications', icon: <Bell size={18} /> },
  ];
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600 flex items-center">
            <Zap className="mr-2" />
            Funky UI Demo
          </h1>
          
          <nav className="hidden md:flex space-x-6">
            <button 
              className={`font-medium transition-colors ${
                activeSection === 'celebration' 
                  ? 'text-purple-600 border-b-2 border-purple-600' 
                  : 'text-gray-600 hover:text-purple-600'
              }`}
              onClick={() => setActiveSection('celebration')}
            >
              Celebration
            </button>
            <button 
              className={`font-medium transition-colors ${
                activeSection === 'buttons' 
                  ? 'text-purple-600 border-b-2 border-purple-600' 
                  : 'text-gray-600 hover:text-purple-600'
              }`}
              onClick={() => setActiveSection('buttons')}
            >
              Buttons
            </button>
            <button 
              className={`font-medium transition-colors ${
                activeSection === 'cards' 
                  ? 'text-purple-600 border-b-2 border-purple-600' 
                  : 'text-gray-600 hover:text-purple-600'
              }`}
              onClick={() => setActiveSection('cards')}
            >
              Cards
            </button>
            <button 
              className={`font-medium transition-colors ${
                activeSection === 'menus' 
                  ? 'text-purple-600 border-b-2 border-purple-600' 
                  : 'text-gray-600 hover:text-purple-600'
              }`}
              onClick={() => setActiveSection('menus')}
            >
              Menus
            </button>
            <button 
              className={`font-medium transition-colors ${
                activeSection === 'backgrounds' 
                  ? 'text-purple-600 border-b-2 border-purple-600' 
                  : 'text-gray-600 hover:text-purple-600'
              }`}
              onClick={() => setActiveSection('backgrounds')}
            >
              Backgrounds
            </button>
            <button 
              className={`font-medium transition-colors ${
                activeSection === '3d' 
                  ? 'text-purple-600 border-b-2 border-purple-600' 
                  : 'text-gray-600 hover:text-purple-600'
              }`}
              onClick={() => setActiveSection('3d')}
            >
              3D Scene
            </button>
          </nav>
          
          <div className="md:hidden">
            <AnimatedMenu items={[
              { label: 'Celebration', onClick: () => setActiveSection('celebration') },
              { label: 'Buttons', onClick: () => setActiveSection('buttons') },
              { label: 'Cards', onClick: () => setActiveSection('cards') },
              { label: 'Menus', onClick: () => setActiveSection('menus') },
              { label: 'Backgrounds', onClick: () => setActiveSection('backgrounds') },
              { label: '3D Scene', onClick: () => setActiveSection('3d') }
            ]} color="purple" />
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className={`${activeSection === 'parallax' ? '' : 'container mx-auto px-4 py-8'}`}>
        {/* Celebration Section */}
        {activeSection === 'celebration' && (
          <CelebrationCard
            title="Paneer Tikka"
            description="Grilled paneer cubes with aromatic Indian spices"
            backgroundImage="https://source.unsplash.com/800x600/?indian-food"
            onCelebrate={() => console.log('Celebrating!')}
          />
        )}
        
        {/* Buttons Section */}
        {activeSection === 'buttons' && (
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center">Animated Buttons</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
                <h3 className="text-xl font-semibold mb-6 text-blue-600">Blue Button</h3>
                <AnimatedButton text="Click Me" color="blue" />
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
                <h3 className="text-xl font-semibold mb-6 text-pink-600">Pink Button</h3>
                <AnimatedButton text="Explore Now" color="pink" />
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
                <h3 className="text-xl font-semibold mb-6 text-emerald-600">Green Button</h3>
                <AnimatedButton text="Get Started" color="green" />
              </div>
            </div>
          </section>
        )}
        
        {/* Cards Section */}
        {activeSection === 'cards' && (
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center">Morphing Cards</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <MorphingCard
                title="Interactive Design"
                description="Create engaging user experiences with smooth animations and transitions."
                icon={<Layers />}
                color="blue"
              />
              
              <MorphingCard
                title="Responsive Layout"
                description="Designs that look great on any device, from mobile to desktop."
                icon={<Compass />}
                color="pink"
              />
              
              <MorphingCard
                title="Modern Aesthetics"
                description="Bold colors and playful shapes that create a memorable visual identity."
                icon={<Star />}
                color="green"
              />
            </div>
          </section>
        )}
        
        {/* Backgrounds Section */}
        {activeSection === 'backgrounds' && (
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center">Gradient Backgrounds</h2>
            
            <div className="space-y-8">
              <GradientBackground colorScheme="funky" className="rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-white mb-4">Funky Gradient</h3>
                <p className="text-white/80 mb-6">
                  A vibrant mix of purple, deep purple, pink, and yellow creates an energetic, playful atmosphere.
                </p>
                <AnimatedButton text="Explore Funky" color="purple" />
              </GradientBackground>
              
              <GradientBackground colorScheme="sunset" className="rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-white mb-4">Sunset Gradient</h3>
                <p className="text-white/80 mb-6">
                  Warm oranges, ambers, and pinks blend together to create a sunset-inspired backdrop.
                </p>
                <AnimatedButton text="Feel the Warmth" color="orange" />
              </GradientBackground>
              
              <GradientBackground colorScheme="ocean" className="rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-white mb-4">Ocean Gradient</h3>
                <p className="text-white/80 mb-6">
                  Cool blues and teals flow together like ocean waves, creating a calm, refreshing feel.
                </p>
                <AnimatedButton text="Dive In" color="blue" />
              </GradientBackground>
              
              <GradientBackground colorScheme="neon" className="rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-white mb-4">Neon Gradient</h3>
                <p className="text-white/80 mb-6">
                  Electric colors pulse and glow, creating a vibrant, high-energy atmosphere.
                </p>
                <AnimatedButton text="Power Up" color="purple" />
              </GradientBackground>
            </div>
          </section>
        )}
        
        {/* 3D Scene Section */}
        {activeSection === '3d' && (
          <section className="h-screen">
            <AnimatedScene />
          </section>
        )}
      </main>
    </div>
  );
};

export default AnimatedUIDemo;