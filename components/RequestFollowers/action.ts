"use server";

import {
  acceptFollow,
  followAccount,
  getAllRequestFollowersAccount,
  refuseFollow,
  unfollowAccount,
} from "@/service/followService";
import { revalidateTag } from "next/cache";
import { revalidate } from "../NotifyPopup/action";

export async function getRequestFollowers() {
  revalidateTag("get-request-follow");
  const result = await getAllRequestFollowersAccount();
  return result;
}

export async function acceptRequestFollow(
  idRequest: string,
  idSender: string,
  idReciver: string,
) {
  const result = await acceptFollow(idRequest, idSender, idReciver);
  if (result === 201) {
    revalidateTag("get-list-room-message");
    revalidate();
    return true;
  } else {
    return false;
  }
}

export async function follow(senderId: string, reciverId: string) {
  const result = await followAccount(senderId, reciverId);
  if (result === 201) {
    return true;
  } else {
    return false;
  }
}

export async function refuseRequestFollow(idRequest: string) {
  const result = await refuseFollow(idRequest);
  if (result === 200) {
    revalidate();
    return true;
  } else {
    return false;
  }
}

export async function unfollow(idFollow: string) {
  const result = await unfollowAccount(idFollow);
  if (result === 200) {
    return true;
  } else {
    return false;
  }
}
