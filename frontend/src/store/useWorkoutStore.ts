import { create }
from "zustand";

type WorkoutItem = {
  id: string;

  name: string;

  sets: number;

  reps: number;

  calories: number;
};

type WorkoutStore = {
  items:
    WorkoutItem[];

  addExercise: (
    exercise: {
      name: string;
      caloriesPerRep?: number;
    }
  ) => void;

  removeExercise: (
    id: string
  ) => void;

  updateSets: (
    id: string,
    sets: number
  ) => void;

  updateReps: (
    id: string,
    reps: number
  ) => void;

  clearWorkout:
    () => void;
};

export const
useWorkoutStore =
create<
  WorkoutStore
>((set) => ({
  items: [],

  addExercise: (
    exercise
  ) =>
    set((state) => ({
      items: [
        ...state.items,

        {
          id:
            crypto.randomUUID(),

          name:
            exercise.name,

          sets: 3,

          reps: 10,

          calories:
            (
              exercise
                .caloriesPerRep ??
              0
            ) * 30,
        },
      ],
    })),

  removeExercise:
    (id) =>
      set(
        (state) => ({
          items:
            state.items.filter(
              (
                item
              ) =>
                item.id !==
                id
            ),
        })
      ),

  updateSets:
    (
      id,
      sets
    ) =>
      set(
        (state) => ({
          items:
            state.items.map(
              (
                item
              ) =>
                item.id ===
                id
                  ? {
                      ...item,
                      sets,
                    }
                  : item
            ),
        })
      ),

  updateReps:
    (
      id,
      reps
    ) =>
      set(
        (state) => ({
          items:
            state.items.map(
              (
                item
              ) =>
                item.id ===
                id
                  ? {
                      ...item,
                      reps,

                      calories:
                        reps *
                        item
                          .sets *
                        0.35,
                    }
                  : item
            ),
        })
      ),

  clearWorkout:
    () =>
      set({
        items: [],
      }),
}));