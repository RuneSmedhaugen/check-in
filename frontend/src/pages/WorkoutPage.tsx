import { exercises } from "../features/workouts/data/exercises";

import { useWorkoutStore } from "../store/useWorkoutStore";

import { saveWorkoutEntries } from "../db/Workouts";

export default function WorkoutPage() {
  const {
    items,
    addExercise,
    removeExercise,
    updateSets,
    updateReps,
    clearWorkout,
  } = useWorkoutStore();

  function getExercise(itemName: string) {
    return exercises.find((e) => e.name === itemName);
  }

  function calculateCalories(item: (typeof items)[0]) {
    const exercise = getExercise(item.name);

    if (!exercise) return 0;

    return exercise.type === "minutes"
      ? exercise.calories * item.reps
      : exercise.calories * item.reps * item.sets;
  }

  const totalCalories = items.reduce(
    (sum, item) => sum + calculateCalories(item),
    0,
  );

  async function saveWorkout() {
    const today = new Date().toISOString().split("T")[0];

    await saveWorkoutEntries(
      items.map((item) => ({
        date: today,

        exerciseName: item.name,

        sets: item.sets,

        reps: item.reps,

        calories: Math.round(calculateCalories(item)),
      })),
    );

    clearWorkout();

    alert("Workout saved!");
  }

  return (
    <div
      className="
        p-4
        space-y-6
      "
    >
      <h1
        className="
          text-3xl
          font-bold
        "
      >
        Workout
      </h1>

      <div>
        <h2
          className="
            mb-3
            text-xl
            font-semibold
          "
        >
          Exercises
        </h2>

        <div
          className="
            flex
            flex-wrap
            gap-2
          "
        >
          {exercises.map((exercise) => (
            <button
              key={exercise.name}
              onClick={() => addExercise(exercise)}
              className="
                  rounded-xl
                  bg-slate-800
                  px-4
                  py-2
                  hover:bg-slate-700
                "
            >
              {exercise.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2
          className="
            mb-3
            text-xl
            font-semibold
          "
        >
          Current Workout
        </h2>

        <div
          className="
            space-y-3
          "
        >
          {items.map((item) => {
            const exercise = getExercise(item.name);

            const isMinutes = exercise?.type === "minutes";

            return (
              <div
                key={item.id}
                className="
                    rounded-2xl
                    bg-slate-800
                    p-4
                    space-y-4
                  "
              >
                <div>
                  <p
                    className="
                        text-lg
                        font-bold
                      "
                  >
                    {item.name}
                  </p>

                  {exercise?.description && (
                    <p
                      className="
                          text-sm
                          text-slate-400
                        "
                    >
                      {exercise.description}
                    </p>
                  )}
                </div>

                {!isMinutes && (
                  <div
                    className="
                        flex
                        items-center
                        gap-3
                      "
                  >
                    <span>Sets</span>

                    <button
                      onClick={() =>
                        updateSets(item.id, Math.max(1, item.sets - 1))
                      }
                      className="
                          rounded-lg
                          bg-slate-700
                          px-3
                        "
                    >
                      -
                    </button>

                    <span>{item.sets}</span>

                    <button
                      onClick={() => updateSets(item.id, item.sets + 1)}
                      className="
                          rounded-lg
                          bg-slate-700
                          px-3
                        "
                    >
                      +
                    </button>
                  </div>
                )}

                <div
                  className="
                      flex
                      items-center
                      gap-3
                    "
                >
                  <span>{isMinutes ? "Minutes" : "Reps"}</span>

                  <button
                    onClick={() =>
                      updateReps(item.id, Math.max(1, item.reps - 1))
                    }
                    className="
                        rounded-lg
                        bg-slate-700
                        px-3
                      "
                  >
                    -
                  </button>

                  <span>{item.reps}</span>

                  <button
                    onClick={() => updateReps(item.id, item.reps + 1)}
                    className="
                        rounded-lg
                        bg-slate-700
                        px-3
                      "
                  >
                    +
                  </button>
                </div>

                <div
                  className="
                      flex
                      items-center
                      justify-between
                    "
                >
                  <p
                    className="
                        text-lg
                        font-semibold
                      "
                  >
                    ~{Math.round(calculateCalories(item))}
                    kcal
                  </p>

                  <button
                    onClick={() => removeExercise(item.id)}
                    className="
                        text-red-400
                        hover:text-red-300
                      "
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {items.length > 0 && (
          <div
            className="
              mt-4
              rounded-2xl
              bg-slate-900
              p-4
            "
          >
            <p
              className="
                text-lg
                font-bold
              "
            >
              Estimated burn: {Math.round(totalCalories)}
              kcal
            </p>

            <button
              onClick={saveWorkout}
              className="
                mt-4
                w-full
                rounded-2xl
                bg-green-600
                p-3
                font-semibold
              "
            >
              Save Workout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
