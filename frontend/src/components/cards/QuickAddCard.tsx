import Card from "../ui/Card";
import SectionTitle from "../ui/SectionTitle";

export default function QuickAddCard() {
  return (
    <Card>
      <SectionTitle
        title="Quick Add"
        subtitle="Fast logging shortcuts"
      />

      <div className="grid grid-cols-2 gap-3">
        <button className="rounded-2xl bg-slate-800 p-4">
          Meal
        </button>

        <button className="rounded-2xl bg-slate-800 p-4">
          Snack
        </button>

        <button className="rounded-2xl bg-slate-800 p-4">
          Beer
        </button>

        <button className="rounded-2xl bg-slate-800 p-4">
          Workout
        </button>
      </div>
    </Card>
  );
}