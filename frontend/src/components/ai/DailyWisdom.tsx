import {
  useEffect,
  useState,
} from "react";

import {
  getDailyWisdom,
} from "../../features/ai/api/DailyWidom";

export default function
DailyWisdom() {
  const [
    wisdom,
    setWisdom,
  ] = useState("");

  useEffect(() => {
    async function
    loadWisdom() {
      const text =
        await getDailyWisdom();

      setWisdom(
        text
      );
    }

    loadWisdom();
  }, []);

  if (!wisdom)
    return null;

  return (
    <div className="
      sticky
      top-0
      z-50
      overflow-hidden
      border-b
    border-slate-800
    bg-slate-900/95
  backdrop-blur
      py-2
    ">
      <div className="
        animate-marquee
        whitespace-nowrap
        text-sm
        text-slate-300
      ">
        ✨
        {" "}
        {
          wisdom
        }
        {" "}
        ✨
      </div>
    </div>
  );
}