import { useState } from "react";

import Card from "../ui/Card";
import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";

import { useDailyStore }
  from "../../store/useDailyStore";

export default function NotesCard() {
  const {
    notes,
    setNotes,
    saveToday,
  } = useDailyStore();

  const [
    tempNotes,
    setTempNotes,
  ] = useState(notes);

  return (
    <Card>
      <SectionTitle
        title="Notes"
        subtitle="
          Anything worth
          remembering today?
        "
      />

      <div className="space-y-4">

        <textarea
          value={tempNotes}
          onChange={(e) =>
            setTempNotes(
              e.target.value
            )
          }
          placeholder="
Bad sleep.
Craved snacks hard.
Knee hurts.
Migraine warning.
Actually felt decent.
          "
          className="
            min-h-32
            w-full
            rounded-2xl
            bg-slate-800
            p-4
            text-white
            outline-none
          "
        />

        <Button
          onClick={async () => {
            setNotes(
              tempNotes
            );

            await saveToday();
          }}
        >
          Save Notes
        </Button>

      </div>
    </Card>
  );
}