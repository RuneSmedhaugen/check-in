import { db }
from "./dexie";

export type WorkoutEntry = {
  id?: number;

  date: string;

  exerciseName: string;

  sets: number;

  reps: number;

  calories: number;
};

export async function
saveWorkoutEntries(
  entries:
    WorkoutEntry[]
) {
  await db.workouts.bulkAdd(
    entries
  );
}

export async function
getWorkoutsByDate(
  date: string
) {
  return db.workouts
    .where("date")
    .equals(date)
    .toArray();
}

export async function
getWorkoutTotalsByDate(
  date: string
) {
  const workouts =
    await
    getWorkoutsByDate(
      date
    );

  return {
    calories:
      workouts.reduce(
        (
          sum,
          workout
        ) =>
          sum +
          workout.calories,
        0
      ),
  };
}