import type {
  FoodCategory,
} from "../data/foodPortions";

export function
getFoodCategory(
  foodName: string
): FoodCategory {
  const lower =
    foodName.toLowerCase();

  if (
    lower.includes("egg") ||
    lower.includes("egg")
  ) {
    return "egg";
  }

  if (
    lower.includes("bread") ||
    lower.includes("brød") ||
    lower.includes("kneipp") ||
    lower.includes("toast")
  ) {
    return "bread";
  }

  if (
    lower.includes("norvegia") ||
    lower.includes("jarlsberg") ||
    lower.includes("gouda") ||
    lower.includes("cheese")
  ) {
    return "cheese";
  }

  if (
    lower.includes("ham") ||
    lower.includes("skinke") ||
    lower.includes("salami") ||
    lower.includes("turkey")
  ) {
    return "coldCuts";
  }

  if (
    lower.includes("ketchup") ||
    lower.includes("mustard")
  ) {
    return "sauce";
  }

  if (
    lower.includes("butter") ||
    lower.includes("smør") ||
    lower.includes("mayo")
  ) {
    return "spread";
  }

  if (
    lower.includes("milk") ||
    lower.includes("juice") ||
    lower.includes("cola") ||
    lower.includes("monster")
  ) {
    return "drink";
  }

  if (
    lower.includes("axa") ||
    lower.includes("cereal") ||
    lower.includes("granola")
  ) {
    return "cereal";
  }

  return "default";
}