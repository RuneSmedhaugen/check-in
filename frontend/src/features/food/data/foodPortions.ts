export type PortionOption = {
  unit: string;
  grams: number;
};

export type FoodCategory =
  | "bread"
  | "cheese"
  | "coldCuts"
  | "egg"
  | "sauce"
  | "spread"
  | "drink"
  | "cereal"
  | "meat"
  | "default";

export const FOOD_PORTIONS: Record<
  FoodCategory,
  PortionOption[]
> = {
  bread: [
    {
      unit: "slice",
      grams: 35,
    },
  ],

  cheese: [
    {
      unit: "slice",
      grams: 17,
    },
  ],

  coldCuts: [
    {
      unit: "slice",
      grams: 12,
    },
  ],

  egg: [
    {
      unit: "egg",
      grams: 55,
    },
  ],

  sauce: [
    {
      unit: "stripe",
      grams: 10,
    },
    {
      unit: "tbsp",
      grams: 15,
    },
  ],

  spread: [
    {
      unit: "spread",
      grams: 5,
    },
    {
      unit: "tbsp",
      grams: 15,
    },
  ],

  drink: [
    {
      unit: "glass",
      grams: 250,
    },
    {
      unit: "cup",
      grams: 250,
    },
    {
      unit: "can",
      grams: 500,
    },
  ],

  cereal: [
    {
      unit: "bowl",
      grams: 70,
    },
    {
      unit: "tbsp",
      grams: 15,
    },
  ],

  meat: [
    {
      unit: "portion",
      grams: 150,
    },
  ],

  default: [
    {
      unit: "100g",
      grams: 100,
    },
  ],
};