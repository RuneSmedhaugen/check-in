import { useEffect, useState } from "react";

import Card from "../components/ui/Card";

import SectionTitle from "../components/ui/SectionTitle";

import { getDailyLog } from "../db/DailyLogs";

import { getMealTotalsByDate } from "../db/Meals";

import { getWorkoutTotalsByDate } from "../db/Workouts";

import { BASE_CALORIES, calculateNetCalories } from "../utils/calorieBalance";

import type { DailyLog } from "../db/dexie";

export default function LogPage() {
  const [today, setToday] = useState<DailyLog | null>(null);

  const [foodTotals, setFoodTotals] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  const [workoutTotals, setWorkoutTotals] = useState({
    calories: 0,
  });

  useEffect(() => {
    async function loadData() {
      const date = new Date().toISOString().split("T")[0];

      const log = await getDailyLog(date);

      const meals = await getMealTotalsByDate(date);

      const workouts = await getWorkoutTotalsByDate(date);

      setToday(log ?? null);
      setFoodTotals(meals);
      setWorkoutTotals(workouts);
    }

    loadData();
  }, []);

  const netCalories = calculateNetCalories(
    Math.round(foodTotals.calories),
    Math.round(workoutTotals.calories),
  );

  return (
    <div
      className="
      space-y-6
      p-4
    "
    >
      <div>
        <h1
          className="
          text-3xl
          font-bold
        "
        >
          Log
        </h1>

        <p
          className="
          text-slate-400
          mt-1
        "
        >
          Today's summary
        </p>
      </div>

      <Card>
        <SectionTitle title="Health" />

        <div
          className="
          space-y-2
        "
        >
          <p>Sleep: {today?.sleepHours}h</p>

          <p>Feeling: {today?.energy}</p>

          <p>
            Weight: {today?.weight}
            kg
          </p>
        </div>
      </Card>

      <Card>
        <SectionTitle
          title="
            Hydration
          "
        />

        <div
          className="
          space-y-2
        "
        >
          <p>Water: {((today?.waterMl ?? 0) / 1000).toFixed(2)}L</p>

          <p>
            Coffee: {today?.coffeeCups ?? 0}
            cups
          </p>
        </div>
      </Card>

      <Card>
        <SectionTitle title="Food" />

        <div
          className="
          space-y-2
        "
        >
          <p>
            Calories: {Math.round(foodTotals.calories)}
            kcal
          </p>

          <p>Protein: {Math.round(foodTotals.protein)}g</p>

          <p>Carbs: {Math.round(foodTotals.carbs)}g</p>

          <p>Fat: {Math.round(foodTotals.fat)}g</p>
        </div>
      </Card>

      <Card>
        <SectionTitle
          title="
            Daily Balance
          "
        />

        <div
          className="
          space-y-2
        "
        >
          <p>
            Base burn: {BASE_CALORIES}
            kcal
          </p>

          <p>
            Workout: {Math.round(workoutTotals.calories)}
            kcal
          </p>

          <p
            className={`
            text-2xl
            font-bold
            ${netCalories < 0 ? "text-green-400" : "text-red-400"}
          `}
          >
            {netCalories > 0 ? "+" : ""}
            {netCalories}
            kcal
          </p>
        </div>
      </Card>

      {today?.notes && (
        <Card>
          <SectionTitle title="Notes" />

          <p
            className="
            text-slate-300
          "
          >
            {today.notes}
          </p>
        </Card>
      )}
    </div>
  );
}
