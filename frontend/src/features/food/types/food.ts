export type FoodProduct = {
  id: string;

  name: string;

  brand?: string;

  image?: string;

  calories: number;

  protein: number;

  carbs: number;

  fat: number;

  servingSize?: string;

  unit: string;

  grams: number;
};