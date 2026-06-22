import {
  FOOD_PORTIONS,
} from "../data/foodPortions";

import {
  getFoodCategory,
} from "./getFoodCategory";

export function
getFoodPortions(
  foodName: string
) {
  const category =
    getFoodCategory(
      foodName
    );

  return (
    FOOD_PORTIONS[
      category
    ] ??
    FOOD_PORTIONS.default
  );
}