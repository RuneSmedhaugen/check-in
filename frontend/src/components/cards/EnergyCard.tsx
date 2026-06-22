import Card from "../ui/Card";
import SectionTitle from "../ui/SectionTitle";
import ChipButton from "../ui/ChipButton";

import { useDailyStore }
  from "../../store/useDailyStore";

export default function EnergyCard() {
  const {
    energy,
    setEnergy,
    saveToday,
  } = useDailyStore();

  const saveEnergy = async (
    value:
      | "awful"
      | "low"
      | "okay"
      | "good"
      | "high"
  ) => {
    setEnergy(value);

    await saveToday();
  };

  return (
    <Card>
      <SectionTitle
        title="Energy"
        subtitle="How are you feeling?"
      />

      <div className="flex flex-wrap gap-2">
        <ChipButton
          label="😵 Awful"
          active={energy === "awful"}
          onClick={() =>
            saveEnergy("awful")
          }
        />

        <ChipButton
          label="😴 Low"
          active={energy === "low"}
          onClick={() =>
            saveEnergy("low")
          }
        />

        <ChipButton
          label="😐 Okay"
          active={energy === "okay"}
          onClick={() =>
            saveEnergy("okay")
          }
        />

        <ChipButton
          label="🙂 Good"
          active={energy === "good"}
          onClick={() =>
            saveEnergy("good")
          }
        />

        <ChipButton
          label="⚡ High"
          active={energy === "high"}
          onClick={() =>
            saveEnergy("high")
          }
        />
      </div>
    </Card>
  );
}