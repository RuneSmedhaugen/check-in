import {
  useEffect,
  useState,
} from "react";

import Card
from "../ui/Card";

import SectionTitle
from "../ui/SectionTitle";

import {
  getMealTotalsByDate,
} from "../../db/Meals";

type Totals = {
  calories: number;

  protein: number;

  carbs: number;

  fat: number;
};

export default function
CalorieCard() {
  const [
    totals,
    setTotals,
  ] = useState<Totals>({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  useEffect(() => {
    async function
    loadTotals() {
      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      const data =
        await getMealTotalsByDate(
          today
        );

      setTotals({
        calories:
          Math.round(
            data.calories
          ),

        protein:
          Math.round(
            data.protein
          ),

        carbs:
          Math.round(
            data.carbs
          ),

        fat:
          Math.round(
            data.fat
          ),
      });
    }

    loadTotals();
  }, []);

  return (
    <Card>
      <SectionTitle
        title="Today's Intake"
        subtitle="
        Saved meals today
        "
      />

      <div className="
        grid
        grid-cols-2
        gap-3
      ">
        <div className="
          rounded-xl
          bg-slate-800
          p-3
        ">
          <p className="
            text-sm
            text-slate-400
          ">
            Calories
          </p>

          <p className="
            text-2xl
            font-bold
          ">
            {
              totals.calories
            }
          </p>
        </div>

        <div className="
          rounded-xl
          bg-slate-800
          p-3
        ">
          <p className="
            text-sm
            text-slate-400
          ">
            Protein
          </p>

          <p className="
            text-2xl
            font-bold
          ">
            {
              totals.protein
            }g
          </p>
        </div>

        <div className="
          rounded-xl
          bg-slate-800
          p-3
        ">
          <p className="
            text-sm
            text-slate-400
          ">
            Carbs
          </p>

          <p className="
            text-2xl
            font-bold
          ">
            {
              totals.carbs
            }g
          </p>
        </div>

        <div className="
          rounded-xl
          bg-slate-800
          p-3
        ">
          <p className="
            text-sm
            text-slate-400
          ">
            Fat
          </p>

          <p className="
            text-2xl
            font-bold
          ">
            {
              totals.fat
            }g
          </p>
        </div>
      </div>
    </Card>
  );
}