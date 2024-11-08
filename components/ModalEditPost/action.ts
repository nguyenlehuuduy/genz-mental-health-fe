"use server";

import { editPost } from "@/service/postService";

export async function editPostById(idPost: string, content: string) {
  const res = await editPost(idPost, content);

  return res;
}
