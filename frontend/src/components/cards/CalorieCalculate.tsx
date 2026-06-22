import {
  useEffect,
  useState,
} from "react";

import Card
from "../ui/Card";

import SectionTitle
from "../ui/SectionTitle";

import {
  getMealTotalsByDate,
} from "../../db/Meals";

import {
  getWorkoutTotalsByDate,
} from "../../db/Workouts";

import {
  BASE_CALORIES,
  calculateNetCalories,
} from "../../utils/calorieBalance";

export default function
CalorieCalculate() {
  const [
    foodCalories,
    setFoodCalories,
  ] = useState(0);

  const [
    workoutCalories,
    setWorkoutCalories,
  ] = useState(0);

  useEffect(() => {
    async function
    loadCalories() {
      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      const foodTotals =
        await getMealTotalsByDate(
          today
        );

      const workoutTotals =
        await getWorkoutTotalsByDate(
          today
        );

      setFoodCalories(
        Math.round(
          foodTotals.calories
        )
      );

      setWorkoutCalories(
        Math.round(
          workoutTotals.calories
        )
      );
    }

    loadCalories();
  }, []);

  const netCalories =
    calculateNetCalories(
      foodCalories,
      workoutCalories
    );

  return (
    <Card>
      <SectionTitle
        title="Daily Balance"
        subtitle="
          Calories in vs out
        "
      />

      <div className="
        space-y-2
      ">
        <p>
          Food:
          {" "}
          {foodCalories}
          kcal
        </p>

        <p>
          Base burn:
          {" "}
          {
            BASE_CALORIES
          }
          kcal
        </p>

        <p>
          Workout:
          {" "}
          {
            workoutCalories
          }
          kcal
        </p>

        <p
          className={`
            text-2xl
            font-bold
            ${
              netCalories <
              0
                ? "text-green-400"
                : "text-red-400"
            }
          `}
        >
          {netCalories >
          0
            ? "+"
            : ""}
          {
            netCalories
          }
          kcal
        </p>
      </div>
    </Card>
  );
}