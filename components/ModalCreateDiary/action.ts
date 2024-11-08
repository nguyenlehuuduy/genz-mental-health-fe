"use server";

import { DiaryForCreateAndUpdate, postDiary } from "@/service/diaryService";
import { revalidateTag } from "next/cache";

export async function createDiary(diary: DiaryForCreateAndUpdate) {
  const res = await postDiary(diary);
  revalidateTag("get-list-diary");
  return res;
}
