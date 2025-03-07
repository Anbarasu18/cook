import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Heart } from 'lucide-react';
import { useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { favoritesCount } = useFavorites();

  const handleSearchClick = () => {
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleFavoritesClick = () => {
    navigate('/favorites');
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-amber-600">CookBook</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={handleSearchClick}
            className={`font-medium transition-colors ${
              location.pathname === '/'
                ? 'text-amber-600 border-b-2 border-amber-600'
                : 'text-gray-700 hover:text-amber-600'
            }`}
          >
            Search Recipes
          </button>
          <button
            onClick={handleFavoritesClick}
            className={`font-medium transition-colors flex items-center ${
              location.pathname === '/favorites'
                ? 'text-amber-600 border-b-2 border-amber-600'
                : 'text-gray-700 hover:text-amber-600'
            }`}
          >
            <span>Favorites</span>
            {favoritesCount > 0 && (
              <span className="ml-1 bg-amber-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {favoritesCount > 99 ? '99+' : favoritesCount}
              </span>
            )}
          </button>
          <a
            href="https://www.themealdb.com/api.php"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gray-700 hover:text-amber-600 transition-colors"
          >
            API Info
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <Link 
            to="/favorites" 
            className="relative mr-4"
            aria-label="Favorites"
          >
            <Heart size={24} className={location.pathname === '/favorites' ? 'text-amber-600' : 'text-gray-700'} />
            {favoritesCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {favoritesCount > 99 ? '99+' : favoritesCount}
              </span>
            )}
          </Link>
          <button
            className="text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-4 pb-4">
              <button
                onClick={handleSearchClick}
                className={`font-medium transition-colors text-left ${
                  location.pathname === '/'
                    ? 'text-amber-600'
                    : 'text-gray-700 hover:text-amber-600'
                }`}
              >
                Search Recipes
              </button>
              <button
                onClick={handleFavoritesClick}
                className={`font-medium transition-colors text-left flex items-center ${
                  location.pathname === '/favorites'
                    ? 'text-amber-600'
                    : 'text-gray-700 hover:text-amber-600'
                }`}
              >
                <Heart size={18} className="mr-2" />
                <span>Favorites</span>
                {favoritesCount > 0 && (
                  <span className="ml-2 bg-amber-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </button>
              <a
                href="https://www.themealdb.com/api.php"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gray-700 hover:text-amber-600 transition-colors"
              >
                API Info
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;