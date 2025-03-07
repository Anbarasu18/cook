import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchPage from './pages/SearchPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import AnimatedUIDemo from './pages/AnimatedUIDemo';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  return (
    <FavoritesProvider>
      <div className="min-h-screen flex flex-col bg-neutral-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/recipe/:id" element={<RecipeDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/ui-demo" element={<AnimatedUIDemo />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </FavoritesProvider>
  );
}

export default App;