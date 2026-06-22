import { useEffect, useState } from "react";

import Card from "../components/ui/Card";

import SectionTitle from "../components/ui/SectionTitle";

import { getAllDailyLogs } from "../db/DailyLogs";

import { getMealTotalsByDate } from "../db/Meals";

import { getWorkoutTotalsByDate } from "../db/Workouts";

type HistoryLog = {
  date: string;

  sleepHours: number;

  energy: string;

  weight: number;

  notes: string;

  waterMl: number;

  coffeeCups: number;

  calories: number;

  protein: number;

  carbs: number;

  fat: number;

  workoutCalories: number;
};

export default function HistoryPage() {
  const [logs, setLogs] = useState<HistoryLog[]>([]);

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("nb-NO");
  }

  useEffect(() => {
    async function loadLogs() {
      const data = await getAllDailyLogs();

      const logsWithFood = await Promise.all(
        data.map(async (log) => {
          const totals = await getMealTotalsByDate(log.date);

          const workoutTotals = await getWorkoutTotalsByDate(log.date);

          return {
            ...log,

            calories: Math.round(totals.calories),

            protein: Math.round(totals.protein),

            carbs: Math.round(totals.carbs),

            fat: Math.round(totals.fat),

            workoutCalories: Math.round(workoutTotals.calories),
          };
        }),
      );

      setLogs(logsWithFood);
    }

    loadLogs();
  }, []);

  return (
    <div
      className="
      space-y-4
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
          History
        </h1>

        <p
          className="
          mt-1
          text-slate-400
        "
        >
          Your previous check-ins
        </p>
      </div>

      {logs.length === 0 && <Card>No entries yet.</Card>}

      {logs.map((log) => (
        <Card key={log.date}>
          <SectionTitle title={formatDate(log.date)} />

          <div
            className="
              space-y-2
              text-sm
            "
          >
            <p>Sleep: {log.sleepHours}h</p>

            <p>Feeling: {log.energy}</p>

            <p>Weight: {log.weight} kg</p>

            <p>Water: {(log.waterMl / 1000).toFixed(2)}L</p>

            <p>Coffee: {log.coffeeCups} cups</p>

            <div
              className="
                rounded-xl
                bg-slate-800
                p-3
                space-y-1
              "
            >
              <p
                className="
                  font-semibold
                "
              >
                Food totals
              </p>

              <p>
                Calories: {log.calories}
                kcal
              </p>

              <p>Protein: {log.protein}g</p>

              <p>Carbs: {log.carbs}g</p>

              <p>Fat: {log.fat}g</p>
            </div>

            <div
              className="
                rounded-xl
                bg-slate-800
                p-3
              "
            >
              <p
                className="
                  font-semibold
                "
              >
                Workout
              </p>

              <p>
                Calories burned: {log.workoutCalories}
                kcal
              </p>
            </div>

            {log.notes && (
              <div>
                <p
                  className="
                    font-semibold
                  "
                >
                  Notes
                </p>

                <p
                  className="
                    text-slate-300
                  "
                >
                  {log.notes}
                </p>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
