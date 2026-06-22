import Dexie, {
  type Table,
} from "dexie";
import type { WorkoutEntry } from "./Workouts";

export type DailyLog = {
  date: string;

  sleepHours: number;

  energy:
    | "awful"
    | "low"
    | "okay"
    | "good"
    | "high";

  weight: number;

  notes: string;

  waterMl: number;

  coffeeCups: number;
};

export type MealEntry = {
  id?: number;

  date: string;

  title: string;

  totalCalories: number;

  totalProtein: number;

  totalCarbs: number;

  totalFat: number;
};

export type MealItem = {
  id?: number;

  mealId: number;

  name: string;

  brand?: string;

  calories: number;

  protein: number;

  carbs: number;

  fat: number;

  amount: number;

  unit: string;
};

class AppDatabase
extends Dexie {
  dailyLogs!:
    Table<DailyLog>;

  mealEntries!:
    Table<MealEntry>;

  mealItems!:
    Table<MealItem>;

  workouts!:
    Table<WorkoutEntry>;

  constructor() {
    super(
      "healthTrackerDB"
    );

    this.version(2)
      .stores({
        dailyLogs:
          "date",

        mealEntries:
          "++id, date",

        mealItems:
          "++id, mealId",

        workouts:
          "++id, date",
      });
  }
}

export const db =
  new AppDatabase();