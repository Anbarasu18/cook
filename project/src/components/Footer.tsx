import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="mb-2">
            Recipe data provided by{' '}
            <a 
              href="https://www.themealdb.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 transition-colors"
            >
              TheMealDB
            </a>
          </p>
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} CookBook. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;