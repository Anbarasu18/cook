export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  [key: string]: string | null;
}

export interface MealDBResponse {
  meals: Meal[] | null;
}

export interface Ingredient {
  name: string;
  measure: string;
}

export interface FavoriteMeal extends Meal {
  dateAdded: string;
  tags: string[];
}

export interface FavoritesContextType {
  favorites: FavoriteMeal[];
  addFavorite: (meal: Meal, tags?: string[]) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  updateFavoriteTags: (id: string, tags: string[]) => void;
  getFavoriteTags: () => string[];
  getFavoritesByTag: (tag: string) => FavoriteMeal[];
  favoritesCount: number;
}