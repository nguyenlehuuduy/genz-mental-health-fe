"use server";
import { deleteContentSave } from "@/service/saveContentService";
import { revalidateTag } from "next/cache";

export async function deleteSaveContent(id: string) {
  revalidateTag("get-save-content-by-cate-id");
  await deleteContentSave(id);
}
