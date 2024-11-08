"use server";

import { sharePost } from "@/service/postService";

export async function actionSharePost(postId: string, content: string) {
  const res = await sharePost(postId, content);
  return res;
}
