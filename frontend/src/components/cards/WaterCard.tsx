import Card from "../ui/Card";
import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";

import { useDailyStore } from "../../store/useDailyStore";

function formatWater(ml: number) {
  return `${(ml / 1000).toFixed(2)}L`;
}

export default function WaterCard() {
  const {
    waterMl,
    coffeeCups,
    setWaterMl,
    setCoffeeCups,
    saveToday,
  } = useDailyStore();

  const add = (amount: number) => {
    setWaterMl(waterMl + amount);
  };

  return (
    <Card>
      <SectionTitle
        title="Water"
        subtitle="Hydration for today"
      />

      <div className="space-y-4">

        <div className="text-4xl font-bold">
          {formatWater(waterMl)}
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button onClick={() => add(1000)}>
            +1L
          </Button>

          <Button onClick={() => add(500)}>
            +500ml
          </Button>

          <Button onClick={() => add(250)}>
            +250ml
          </Button>

          <Button onClick={() => add(100)}>
            +100ml
          </Button>

          <Button onClick={() => add(50)}>
            +50ml
          </Button>

          <Button onClick={() => setWaterMl(0)}>
            Reset
          </Button>
        </div>

        <Button onClick={saveToday}>
          Save Water
        </Button>

      </div>

      <div className="space-y-2">
  <h3 className="font-semibold">
    Coffee
  </h3>

  <div className="flex items-center gap-2">
    <Button
      onClick={() =>
        setCoffeeCups(
          Math.max(
            coffeeCups - 1,
            0
          )
        )
      }
    >
      -1
    </Button>

    <span className="font-bold">
      {coffeeCups} cups. 1 cup = 250ml, ~100mg caffeine
    </span>

    <Button
      onClick={() =>
        setCoffeeCups(
          coffeeCups + 1
        )
      }
    >
      +1
    </Button>
  </div>
</div>
    </Card>
  );
}