"use server";

import {
  CategorySaveForCreate,
  createCategorySave,
} from "@/service/categorySaveService";
import { revalidateTag } from "next/cache";

export async function createSaveCateContent(cate: CategorySaveForCreate) {
  const res = await createCategorySave(cate);
  revalidateTag("get-list-category-save");
  return res;
}
