"use server";

import {
  commentPost,
  commentSharePost,
  deletePost,
  getListValidPostByAccount,
  likePost,
  likePostShare,
} from "@/service/postService";

export async function getValidPost(page: number) {
  const result = await getListValidPostByAccount(page);
  return result?.data;
}

export async function like(postId: string) {
  const result = await likePost(postId);
  return result;
}

export async function likePostSharing(postId: string) {
  const result = await likePostShare(postId);
  return result;
}

export async function comment(
  postId: string,
  accountId: string,
  contentComment: string,
) {
  const result = await commentPost(postId, accountId, contentComment);
  return result;
}

export async function commentShare(
  postId: string,
  accountId: string,
  contentComment: string,
) {
  const result = await commentSharePost(postId, accountId, contentComment);
  return result;
}

export async function deletePostByUser(postId: string) {
  const result = await deletePost(postId);
  return result;
}
