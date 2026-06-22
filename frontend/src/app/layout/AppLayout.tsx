import { Outlet }
from "react-router-dom";

import BottomNav
from "./BottomNav";

import DailyWisdom
from "../../components/ai/DailyWisdom";

export default function
AppLayout() {
  return (
    <div className="
      min-h-screen
      bg-slate-950
      text-slate-100
    ">
      <DailyWisdom />

      <main className="
        mx-auto
        max-w-md
        pb-24
      ">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
}