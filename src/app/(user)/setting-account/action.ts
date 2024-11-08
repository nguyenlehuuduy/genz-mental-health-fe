"use server";

import { UserForUpdate, putInfoAccount } from "@/service/accountService";
import { revalidateTag } from "next/cache";

export default async function updateInfoAccount(
  account: UserForUpdate,
): Promise<boolean | undefined> {
  const rs = await putInfoAccount(account);
  if (rs) {
    revalidateTag("get-detail-myself-profile");
    return true;
  }
}
