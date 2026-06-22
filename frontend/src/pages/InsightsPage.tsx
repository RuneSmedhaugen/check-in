import { useState, useEffect } from "react";

import Card from "../components/ui/Card";

import { askOllama } from "../features/ai/api/Ollama";

import { getDailyLog } from "../db/DailyLogs";
import { getMealTotalsByDate } from "../db/Meals";
import { getWorkoutTotalsByDate } from "../db/Workouts";

import { BASE_CALORIES, calculateNetCalories } from "../utils/calorieBalance";

type Message = {
  role: "user" | "assistant";
  text: string;
};

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

function getTimeContext() {
  const now = new Date();

  const hour = now.getHours();
  const minute = now.getMinutes();

  const currentTime = `${hour}:${minute.toString().padStart(2, "0")}`;

  const start = 7;
  const end = 23;

  const totalMinutes = (end - start) * 60;

  const minutesPassed = (hour - start) * 60 + minute;

  const dayProgress = Math.max(0, Math.min(1, minutesPassed / totalMinutes));

  return {
    currentTime,
    dayProgress: Math.round(dayProgress * 100),
  };
}

const STORAGE_KEY = "daily-ai-chat";

export default function InsightsPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [todayData, setTodayData] = useState("");

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return [];

    const parsed = JSON.parse(saved);

    if (parsed.date !== getTodayDate()) {
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }

    return parsed.messages ?? [];
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        date: getTodayDate(),
        messages,
      }),
    );
  }, [messages]);

  useEffect(() => {
    async function loadTodayData() {
      const date = getTodayDate();

      const log = await getDailyLog(date);
      const meals = await getMealTotalsByDate(date);
      const workouts = await getWorkoutTotalsByDate(date);

      const net = calculateNetCalories(
        Math.round(meals.calories),
        Math.round(workouts.calories),
      );

      const { currentTime, dayProgress } = getTimeContext();

      const context = `
Current time:
${currentTime}

Day progress:
${dayProgress}%

IMPORTANT INTERPRETATION RULE:
- Early day (0–40%) = low intake is normal
- Mid day (40–70%) = moderate expectations
- Late day (70–100%) = closer to daily targets

Today's health data:

Sleep:
${log?.sleepHours ?? 0}h

Energy:
${log?.energy ?? "unknown"}

Weight:
${log?.weight ?? 0}kg

Water:
${log?.waterMl ?? 0}ml

Coffee:
${log?.coffeeCups ?? 0} cups

Food:
${Math.round(meals.calories)} kcal

Protein:
${Math.round(meals.protein)}g

Carbs:
${Math.round(meals.carbs)}g

Fat:
${Math.round(meals.fat)}g

Workout calories:
${Math.round(workouts.calories)} kcal

Base calories:
${BASE_CALORIES}

Net calories:
${net}

Notes:
${log?.notes ?? "none"}
`;

      setTodayData(context);
    }

    loadTodayData();
  }, []);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      setLoading(true);

      const reply = await askOllama(`
You are a friendly fitness coach.

You understand time of day matters.

Important behavior rules:
- Early day = do NOT judge low intake
- Mid day = give balanced feedback
- Late day = be more strict if needed
- Always interpret data relative to day progress

You are helping a 36 year old male
who is trying to lose weight and
build healthier habits.

Rules:
- use the user's health data
- be supportive
- practical
- not overly formal
- short replies
- avoid generic fitness clichés

${todayData}

User question:
${input}
`);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: reply,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-4 p-4 pb-24">
      <div>
        <h1 className="text-3xl font-bold">Insights</h1>
        <p className="text-slate-400">Chat with your AI coach</p>
      </div>

      <Card>
        <div className="space-y-3 max-h-125 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`rounded-2xl p-3 ${
                message.role === "user"
                  ? "bg-blue-600 ml-8"
                  : "bg-slate-800 mr-8"
              }`}
            >
              {message.text}
            </div>
          ))}

          {loading && <p className="text-slate-400">Thinking...</p>}
        </div>
      </Card>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder="Ask something..."
          className="flex-1 rounded-2xl bg-slate-800 p-3"
        />

        <button onClick={sendMessage} className="rounded-2xl bg-blue-600 px-5">
          Send
        </button>

        <button
          onClick={() => {
            setMessages([]);
            localStorage.removeItem(STORAGE_KEY);
          }}
          className="text-sm text-slate-400"
        >
          Clear chat
        </button>
      </div>
    </div>
  );
}
