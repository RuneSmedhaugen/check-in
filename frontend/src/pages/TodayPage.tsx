import { useEffect } from "react";

import SleepCard
  from "../components/cards/SleepCard";

import EnergyCard
  from "../components/cards/EnergyCard";

import WeightCard
  from "../components/cards/WeightCard";

import NotesCard
  from "../components/cards/NotesCard";

import QuickAddCard
  from "../components/cards/QuickAddCard";

import { useDailyStore }
  from "../store/useDailyStore";

import WaterCard from "../components/cards/WaterCard";

import CalorieCard from "../components/cards/CalorieCard";

import WorkoutSummaryCard from "../components/cards/WorkoutSummaryCard";

import CalorieCalculate from "../components/cards/CalorieCalculate";

export default function TodayPage() {
  const {
    loadToday,
  } = useDailyStore();


  useEffect(() => {
    loadToday();
  }, [loadToday]);

  return (
    <div className="space-y-4 p-4">

      <div>
        <h1 className="text-3xl font-bold">
          Today
        </h1>

        <p className="mt-1 text-slate-400">
          Daily check-in dashboard
        </p>
      </div>


      
      <CalorieCard />
      <WorkoutSummaryCard />
      <CalorieCalculate />
      <SleepCard />
      <EnergyCard />
      <WeightCard />
      <NotesCard />
      <WaterCard />
      <QuickAddCard />
    </div>
  );
}