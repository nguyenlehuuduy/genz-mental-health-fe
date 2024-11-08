"use server"

import { cookies } from "next/headers";

export async function setCookie(key: string, value: string) {
  const cookieStore = cookies();
  cookieStore.set(key, value);
}

export async function getCookie(key: string) {
  const cookieStore = cookies();
  return cookieStore.get(key);
}

export async function deleteCookie(key: string) {
  const cookieStore = cookies();
  cookieStore.delete(key);
}

