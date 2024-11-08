"use server";

import { getAllCommentByPostId } from "@/service/commentService";

export const getAllCommentOfPost = async (idPost: string) => {
  const res = await getAllCommentByPostId(idPost);
  return res;
};
