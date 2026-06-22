export const
BASE_CALORIES =
  2344;

export function
calculateNetCalories(
  foodCalories:
    number,

  workoutCalories:
    number
) {
  return (
    foodCalories -
    BASE_CALORIES +
    workoutCalories
  );
}