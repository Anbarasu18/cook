import axios from 'axios';
import { MealDBResponse, Meal, Ingredient } from '../types/recipe';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const searchMeals = async (query: string): Promise<Meal[]> => {
  try {
    const response = await axios.get<MealDBResponse>(`${API_BASE_URL}/search.php?s=${query}`);
    return response.data.meals || [];
  } catch (error) {
    console.error('Error searching meals:', error);
    throw new Error('Failed to search meals. Please try again later.');
  }
};

export const getMealById = async (id: string): Promise<Meal | null> => {
  try {
    const response = await axios.get<MealDBResponse>(`${API_BASE_URL}/lookup.php?i=${id}`);
    return response.data.meals ? response.data.meals[0] : null;
  } catch (error) {
    console.error('Error fetching meal details:', error);
    throw new Error('Failed to fetch meal details. Please try again later.');
  }
};

export const extractIngredients = (meal: Meal): Ingredient[] => {
  const ingredients: Ingredient[] = [];
  
  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}` as keyof Meal;
    const measureKey = `strMeasure${i}` as keyof Meal;
    
    const ingredient = meal[ingredientKey];
    const measure = meal[measureKey];
    
    if (ingredient && ingredient.trim() !== '' && measure && measure.trim() !== '') {
      ingredients.push({
        name: ingredient,
        measure: measure
      });
    }
  }
  
  return ingredients;
};

export const getRandomMeals = async (count: number = 6): Promise<Meal[]> => {
  try {
    const meals: Meal[] = [];
    const uniqueIds = new Set<string>();
    
    // The API doesn't support fetching multiple random meals at once,
    // so we need to make multiple requests
    while (meals.length < count) {
      const response = await axios.get<MealDBResponse>(`${API_BASE_URL}/random.php`);
      const meal = response.data.meals?.[0];
      
      if (meal && !uniqueIds.has(meal.idMeal)) {
        uniqueIds.add(meal.idMeal);
        meals.push(meal);
      }
    }
    
    return meals;
  } catch (error) {
    console.error('Error fetching random meals:', error);
    throw new Error('Failed to fetch random meals. Please try again later.');
  }
};