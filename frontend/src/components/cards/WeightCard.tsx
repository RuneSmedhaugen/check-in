import { useState } from "react";

import Card from "../ui/Card";
import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";

import { useDailyStore }
  from "../../store/useDailyStore";

export default function WeightCard() {
  const {
    weight,
    setWeight,
    saveToday,
  } = useDailyStore();

  const [
    tempWeight,
    setTempWeight,
  ] = useState(weight);

  const increaseWeight =
    () => {
      setTempWeight(
        (prev) =>
          Math.round(
            (prev + 0.1) * 10
          ) / 10
      );
    };

  const decreaseWeight =
    () => {
      setTempWeight(
        (prev) =>
          Math.round(
            (prev - 0.1) * 10
          ) / 10
      );
    };

  return (
    <Card>
      <SectionTitle
        title="Weight"
        subtitle="Morning weigh-in"
      />

      <div className="space-y-4">

        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <button
            onClick={
              decreaseWeight
            }
            className="
              rounded-full
              bg-slate-800
              px-4
              py-2
              text-2xl
            "
          >
            -
          </button>

          <span className="text-4xl font-bold">
            {tempWeight.toFixed(1)}
          </span>

          <button
            onClick={
              increaseWeight
            }
            className="
              rounded-full
              bg-slate-800
              px-4
              py-2
              text-2xl
            "
          >
            +
          </button>
        </div>

        <Button
          onClick={async () => {
            setWeight(
              tempWeight
            );

            await saveToday();
          }}
        >
          Save Weight
        </Button>

      </div>
    </Card>
  );
}