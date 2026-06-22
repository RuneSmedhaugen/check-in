import {
  useEffect,
  useState,
} from "react";

import Card
from "../ui/Card";

import SectionTitle
from "../ui/SectionTitle";

import {
  getWorkoutTotalsByDate,
} from "../../db/Workouts";

export default function
WorkoutSummaryCard() {
  const [
    calories,
    setCalories,
  ] =
    useState(0);

  useEffect(() => {
    async function
    loadWorkout() {
      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      const totals =
        await
        getWorkoutTotalsByDate(
          today
        );

      setCalories(
        Math.round(
          totals.calories
        )
      );
    }

    loadWorkout();
  }, []);

  return (
    <Card>
      <SectionTitle
        title="Workout"
        subtitle="
          Today's activity
        "
      />

      <p className="
        text-3xl
        font-bold
      ">
        {calories}
        kcal burned
      </p>
    </Card>
  );
}