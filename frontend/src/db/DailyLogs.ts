import {
  db,
  type DailyLog,
} from "./dexie";

export async function saveDailyLog(
  log: DailyLog
) {
  await db.dailyLogs.put(log);
}

export async function getDailyLog(
  date: string
) {
  return db.dailyLogs.get(date);
}

export async function
getAllDailyLogs() {
  return db.dailyLogs
    .orderBy("date")
    .reverse()
    .toArray();
}