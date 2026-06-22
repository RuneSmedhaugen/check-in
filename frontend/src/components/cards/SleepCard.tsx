import { useState } from "react";

import Card from "../ui/Card";
import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";

import { useDailyStore } from "../../store/useDailyStore";

export default function SleepCard() {
  const {
    sleepHours,
    setSleepHours,
    saveToday,
  } = useDailyStore();

  const [
    tempSleep,
    setTempSleep,
  ] = useState(sleepHours);

  return (
    <Card>
      <SectionTitle
        title="Sleep"
        subtitle="How long did you sleep?"
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <span className="text-4xl font-bold">
            {tempSleep}h
          </span>

          <input
            type="range"
            min="0"
            max="12"
            step="0.5"
            value={tempSleep}
            onChange={(e) =>
              setTempSleep(
                Number(e.target.value)
              )
            }
            className="w-full"
          />
        </div>

        <Button
          onClick={async () => {
            setSleepHours(tempSleep);

            await saveToday();
          }}
        >
          Save Sleep
        </Button>
      </div>
    </Card>
  );
}