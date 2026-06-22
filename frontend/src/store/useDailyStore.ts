import { create } from "zustand";

import {
  saveDailyLog,
  getDailyLog,
} from "../db/DailyLogs";

type EnergyLevel =
  | "awful"
  | "low"
  | "okay"
  | "good"
  | "high";

type DailyState = {
  sleepHours: number;

  energy: EnergyLevel;

  weight: number;

  notes: string;

  waterMl: number;

  coffeeCups: number;

  loadToday: () => Promise<void>;

  saveToday: () => Promise<void>;

  setWaterMl: (value: number) => void;

  setCoffeeCups: (value: number) => void;

  setWeight: (
    value: number
  ) => void;

  setSleepHours: (
    value: number
  ) => void;

  setEnergy: (
    value: EnergyLevel
  ) => void;

  setNotes: (
    value: string
  ) => void;
};

function getTodayDate() {
  return new Date()
    .toISOString()
    .split("T")[0];
}

export const useDailyStore =
  create<DailyState>((set, get) => ({
    sleepHours: 7.5,

    energy: "okay",

    weight: 135,

    notes: "",

    waterMl: 0,

    coffeeCups: 0,

    async loadToday() {
      const today =
        await getDailyLog(
          getTodayDate()
        );

      if (!today) return;

      set({
        sleepHours:
          today.sleepHours,

        energy:
          today.energy,

        weight:
          today.weight,

        notes:
          today.notes ?? "",

        waterMl:
          today.waterMl ?? 0,

        coffeeCups:
          today.coffeeCups ?? 0,
      });
    },

    async saveToday() {
      await saveDailyLog({
        date:
          getTodayDate(),

        sleepHours:
          get().sleepHours,

        energy:
          get().energy,

        weight:
          get().weight,

        notes:
          get().notes,

        waterMl:
          get().waterMl,

        coffeeCups:
          get().coffeeCups,
      });
    },

    setSleepHours: (
      value
    ) =>
      set({
        sleepHours: value,
      }),

    setEnergy: (
      value
    ) =>
      set({
        energy: value,
      }),

    setWeight: (
      value
    ) =>
      set({
        weight: value,
      }),

    setNotes: (
      value
    ) =>
      set({
        notes: value,
      }),

    setWaterMl: (
      value
    ) =>
      set({
        waterMl: value,
      }),

    setCoffeeCups: (
      value
    ) =>
      set({
        coffeeCups: value,
      }),
  }));