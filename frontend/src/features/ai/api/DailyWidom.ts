import {
  askOllama,
} from "./Ollama";

const STORAGE_KEY =
  "daily-wisdom";

function
getTodayDate() {
  return new Date()
    .toISOString()
    .split("T")[0];
}

export async function
getDailyWisdom() {
  const saved =
    localStorage.getItem(
      STORAGE_KEY
    );

  if (saved) {
    const parsed =
      JSON.parse(
        saved
      );

    if (
      parsed.date ===
      getTodayDate()
    ) {
      return parsed.text;
    }
  }

  const wisdom =
    await askOllama(`
Write ONE short
motivational sentence
for someone trying
to lose weight and
build healthier habits.

Rules:
- max 20 words
- warm
- slightly funny
- not cringe
- no quotes
- no hashtags
- no extra text
- only output
the sentence
`);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      date:
        getTodayDate(),

      text:
        wisdom.trim(),
    })
  );

  return wisdom.trim();
}