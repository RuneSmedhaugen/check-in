import { useState } from "react";

import { searchFoods } from "../features/food/api/OpenFoodFacts";

import type { FoodProduct } from "../features/food/types/food";

import { useMealStore } from "../store/useMealStore";

import Card from "../components/ui/Card";

import { saveMeal } from "../db/Meals";

import { getFoodPortions } from "../features/food/utils/getFoodPortions";

export default function FoodPage() {
  const [query, setQuery] = useState("");

  const [foods, setFoods] = useState<FoodProduct[]>([]);

  const [loading, setLoading] = useState(false);

  const [hasSearched, setHasSearched] = useState(false);

  const [foodAmounts, setFoodAmounts] = useState<Record<string, number>>({});

  const [selectedUnits, setSelectedUnits] = useState<Record<string, string>>(
    {},
  );

  const { addFood, items, removeFood, clearMeal } = useMealStore();

  async function handleSearch() {
    try {
      setLoading(true);

      const results = await searchFoods(query);

      setFoods(results);

      setHasSearched(true);
    } catch (error) {
      console.error(error);

      setFoods([]);
    } finally {
      setLoading(false);
    }
  }

  const totalCalories = items.reduce((sum, item) => sum + item.calories, 0);

  const totalProtein = items.reduce((sum, item) => sum + item.protein, 0);

  const totalCarbs = items.reduce((sum, item) => sum + item.carbs, 0);

  const totalFat = items.reduce((sum, item) => sum + item.fat, 0);

  return (
    <div
      className="
      mx-auto
      max-w-md
      space-y-5
      p-4
      pb-24
    "
    >
      <div>
        <h1
          className="
          text-3xl
          font-bold
        "
        >
          Food
        </h1>

        <p
          className="
          mt-1
          text-slate-400
        "
        >
          Search and build meals
        </p>
      </div>

      <div
        className="
        flex
        gap-2
      "
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="
            Search food...
          "
          className="
            flex-1
            rounded-2xl
            border
            border-slate-700
            bg-slate-800
            p-3
            outline-none
          "
        />

        <button
          onClick={handleSearch}
          className="
            rounded-2xl
            bg-blue-600
            px-5
            font-medium
          "
        >
          Search
        </button>
      </div>

      <div
        className="
        sticky
        top-2
        z-10
      "
      >
        <Card>
          <h2
            className="
            mb-3
            text-xl
            font-bold
          "
          >
            Current Meal
          </h2>

          {items.length === 0 && (
            <p
              className="
              text-slate-400
            "
            >
              No foods added yet.
            </p>
          )}

          <div
            className="
            max-h-48
            space-y-2
            overflow-y-auto
          "
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    bg-slate-800
                    p-3
                  "
              >
                <div>
                  <p>{item.name}</p>

                  <p
                    className="
                      text-sm
                      text-slate-400
                    "
                  >
                    {item.amount} {item.unit}
                    {" • "}
                    {Math.round(item.calories)}
                    kcal
                  </p>
                </div>

                <button onClick={() => removeFood(item.id)}>❌</button>
              </div>
            ))}
          </div>

          <div
            className="
            mt-4
            grid
            grid-cols-2
            gap-2
            text-sm
          "
          >
            <p>Calories: {Math.round(totalCalories)}</p>

            <p>Protein: {Math.round(totalProtein)}g</p>

            <p>Carbs: {Math.round(totalCarbs)}g</p>

            <p>Fat: {Math.round(totalFat)}g</p>
          </div>

          <button
            onClick={async () => {
              if (items.length === 0) return;

              await saveMeal(
                {
                  date: new Date().toISOString().split("T")[0],

                  title: "Meal",

                  totalCalories,
                  totalProtein,
                  totalCarbs,
                  totalFat,
                },

                items.map((item) => ({
                  name: item.name,

                  brand: item.brand,

                  calories: item.calories,

                  protein: item.protein,

                  carbs: item.carbs,

                  fat: item.fat,

                  amount: item.amount,

                  unit: item.unit,
                })),
              );

              clearMeal();

              alert("Meal saved!");
            }}
            className="
              mt-4
              w-full
              rounded-2xl
              bg-green-600
              p-3
              font-medium
            "
          >
            Save Meal
          </button>
        </Card>
      </div>

      {loading && <Card>Searching...</Card>}

      {!loading && hasSearched && foods.length === 0 && (
        <Card>
          No foods found.
          <br />
          Try another spelling or broader search.
        </Card>
      )}

      {!loading && foods.length > 0 && (
        <div
          className="
            flex
            gap-4
            overflow-x-auto
            pb-2
            snap-x
            snap-mandatory
          "
        >
          {foods.map((food) => {
            const portions = getFoodPortions(food.name);

            const selectedUnit = selectedUnits[food.id] ?? portions[0].unit;

            const amount = foodAmounts[food.id] ?? 1;

            const portion =
              portions.find((p) => p.unit === selectedUnit) ?? portions[0];

            const multiplier = (portion.grams * amount) / 100;

            const calories = food.calories * multiplier;

            const protein = food.protein * multiplier;

            const carbs = food.carbs * multiplier;

            const fat = food.fat * multiplier;

            return (
              <div
                key={food.id}
                className="
                      min-w-70
                      shrink-0
                      snap-center
                    "
              >
                <Card>
                  <p
                    className="
                        text-lg
                        font-bold
                      "
                  >
                    {food.name}
                  </p>

                  <p
                    className="
                        text-sm
                        text-slate-400
                      "
                  >
                    {food.brand}
                  </p>

                  <p
                    className="
                        mt-3
                      "
                  >
                    ≈ {Math.round(calories)}
                    kcal
                  </p>

                  <p
                    className="
                        mt-1
                        text-sm
                      "
                  >
                    P:
                    {Math.round(protein)}g{" | "}
                    C:
                    {Math.round(carbs)}g{" | "}
                    F:
                    {Math.round(fat)}g
                  </p>

                  <div
                    className="
                        mt-4
                        flex
                        items-center
                        gap-2
                      "
                  >
                    <button
                      onClick={() =>
                        setFoodAmounts((prev) => ({
                          ...prev,
                          [food.id]: Math.max(1, (prev[food.id] ?? 1) - 1),
                        }))
                      }
                      className="
                            rounded-xl
                            bg-slate-700
                            px-3
                            py-2
                          "
                    >
                      -
                    </button>

                    <span>{amount}</span>

                    <button
                      onClick={() =>
                        setFoodAmounts((prev) => ({
                          ...prev,
                          [food.id]: (prev[food.id] ?? 1) + 1,
                        }))
                      }
                      className="
                            rounded-xl
                            bg-slate-700
                            px-3
                            py-2
                          "
                    >
                      +
                    </button>

                    <select
                      value={selectedUnit}
                      onChange={(e) =>
                        setSelectedUnits((prev) => ({
                          ...prev,
                          [food.id]: e.target.value,
                        }))
                      }
                      className="
                            ml-auto
                            rounded-xl
                            bg-slate-700
                            p-2
                          "
                    >
                      {portions.map((p) => (
                        <option key={p.unit} value={p.unit}>
                          {p.unit}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() =>
                      addFood({
                        id: crypto.randomUUID(),

                        name: food.name,

                        brand: food.brand,

                        calories,

                        protein,

                        carbs,

                        fat,

                        amount,

                        unit: selectedUnit,

                        grams: portion.grams,
                      })
                    }
                    className="
                          mt-4
                          w-full
                          rounded-2xl
                          bg-green-600
                          p-3
                          font-medium
                        "
                  >
                    Add
                  </button>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
