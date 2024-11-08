"use server";

import {
  CategorySaveForCreate,
  updateCategorySaveByAccount,
} from "@/service/categorySaveService";
import { revalidateTag } from "next/cache";

export async function updateSaveCateContent(
  cate: CategorySaveForCreate,
  idCate: string,
) {
  const res = await updateCategorySaveByAccount(cate, idCate);
  revalidateTag("get-list-category-save");
  return res;
}
