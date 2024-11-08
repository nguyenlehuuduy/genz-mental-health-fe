"use server";

import { deleteCategorySaveByAccount } from "@/service/categorySaveService";
import { revalidateTag } from "next/cache";

export async function deleteCategorySave(idCateSave: string) {
  const res = await deleteCategorySaveByAccount(idCateSave);
  revalidateTag("get-list-category-save");
  return res;
}
