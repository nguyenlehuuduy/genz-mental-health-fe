"use server";

import { getPostMyProfile, getPostOtherAccount } from "@/service/postService";

export async function getPostsMyAccount(page: number) {
  const result = await getPostMyProfile(page);
  return result;
}

export async function getPostsOtherAccount(idAccount: string, page: number) {
  const result = await getPostOtherAccount(idAccount, page);
  return result;
}
