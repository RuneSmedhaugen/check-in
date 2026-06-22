import { create } from "zustand";

type MealItem = {
  id: string;

  name: string;

  brand?: string;

  calories: number;

  protein: number;

  carbs: number;

  fat: number;

  amount: number;

  unit: string;

  grams: number;
};

type MealState = {
  items: MealItem[];

  addFood: (item: MealItem) => void;

  removeFood: (id: string) => void;

  clearMeal: () => void;

  updateAmount: (id: string, amount: number) => void;
};

export const useMealStore = create<MealState>((set) => ({
  items: [],

  addFood: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),

  removeFood: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  clearMeal: () =>
    set({
      items: [],
    }),

  updateAmount: (id, amount) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? {
              ...item,
              amount,
            }
          : item,
      ),
    })),
}));
