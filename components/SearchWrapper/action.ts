"use server";

import { getSearchAccount, getSearchPost } from "@/service/searchService";

export async function getAccountsByName(keyword: string) {
  return await getSearchAccount(keyword);
}

export async function getPostsByName(keyword: string) {
  return await getSearchPost(keyword);
}