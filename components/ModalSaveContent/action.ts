"use server";

import {
  CategorySaveForCreate,
  createCategorySave,
  getCategorySaveByAccount,
} from "@/service/categorySaveService";
import {
  ContentSaveForCreate,
  createContentSave,
} from "@/service/saveContentService";
import { revalidateTag } from "next/cache";

export async function getListCateSaveContent() {
  return await getCategorySaveByAccount();
}

export async function saveContent(body: ContentSaveForCreate) {
  const result = await createContentSave(body);
  revalidateTag("get-list-category-save");
  return result;
}

export async function createACateSave(cate: CategorySaveForCreate) {
  return await createCategorySave(cate);
}
