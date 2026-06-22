import { db }
from "./dexie";

import type {
  MealEntry,
  MealItem,
} from "./dexie";

export async function
saveMeal(
  meal: Omit<
    MealEntry,
    "id"
  >,
  items: Omit<
    MealItem,
    "id" | "mealId"
  >[]
) {
  const mealId =
    await db
      .mealEntries
      .add(meal);

  const itemsWithMealId =
    items.map(
      (item) => ({
        ...item,
        mealId,
      })
    );

  await db
    .mealItems
    .bulkAdd(
      itemsWithMealId
    );
}

export async function
getMealTotalsByDate(
  date: string
) {
  const meals =
    await db
      .mealEntries
      .where("date")
      .equals(date)
      .toArray();

  return {
    calories:
      meals.reduce(
        (
          sum,
          meal
        ) =>
          sum +
          meal.totalCalories,
        0
      ),

    protein:
      meals.reduce(
        (
          sum,
          meal
        ) =>
          sum +
          meal.totalProtein,
        0
      ),

    carbs:
      meals.reduce(
        (
          sum,
          meal
        ) =>
          sum +
          meal.totalCarbs,
        0
      ),

    fat:
      meals.reduce(
        (
          sum,
          meal
        ) =>
          sum +
          meal.totalFat,
        0
      ),
  };
}

export async function
getMealsByDate(
  date: string
) {
  const meals =
    await db
      .mealEntries
      .where("date")
      .equals(date)
      .toArray();

  return meals;
}