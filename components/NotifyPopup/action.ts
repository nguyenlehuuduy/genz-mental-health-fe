"use server";

import { deleteNotify } from "@/service/notificationService";
import { revalidateTag } from "next/cache";

export async function deleteNotification(idNoti: string) {
  const res = await deleteNotify(idNoti);
  return res;
}

export async function revalidate() {
  revalidateTag("get-valid-notification-cache");
}
