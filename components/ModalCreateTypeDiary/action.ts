"use server";

import { CateDiaryForUpdate, CategoryDiaryForCreate, postCategoryDiary, updateCateDiary } from "@/service/diaryService";
import { revalidateTag } from "next/cache";

export async function createCategoryDiary(cate: CategoryDiaryForCreate) {
  const res = await postCategoryDiary(cate);
  revalidateTag("get-list-category-diary");
  return res;
}

export async function updateCategoryDiary(body: CateDiaryForUpdate, idCateDiary: string) {
  const res = await updateCateDiary(body, idCateDiary);
  revalidateTag("get-list-category-diary");
  return res;
}
