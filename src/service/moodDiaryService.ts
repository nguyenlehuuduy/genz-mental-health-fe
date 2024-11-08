import { callGetRequest } from "./apiService";

interface MoodDiaryForResponse {
  id: string;
  moodDiaryName: string;
  descriptionMood: string;
  created_at: Date;
  updated_at: Date;
  iconMood: string;
}

export type MoodDiaryForCard = {
  id: string;
  mood_diary_name: string;
  description_mood: string;
  created_at: Date;
  updated_at: Date;
  icon_mood: string;
}

export async function getAllMoodDiary() {
  const res = await callGetRequest(
    `/mood-diary`,
    "get-all-mood-diary",
  );
  if (res.status === 200) {
    const data: Array<MoodDiaryForResponse> = res.response;
    const result: Array<MoodDiaryForCard> = [];
    for (const item of data) {
      result.push({
        created_at: item.created_at,
        id: item.id,
        updated_at: item.updated_at,
        description_mood: item.descriptionMood,
        mood_diary_name: item.moodDiaryName,
        icon_mood: item.iconMood
      });
    }
    return result;
  }
}
