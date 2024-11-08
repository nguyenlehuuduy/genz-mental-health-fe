"use server";

import {
  callGetRequest,
  callPatchRequest,
  callPostRequest,
  callPutRequest,
} from "./apiService";

interface RoomMessageForResponse {
  id: string;
  created_at: string;
  updated_at: string;
  accountInRoom: Array<string>;
  nameRoom: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  isSeen?: boolean;
  idLastSendingUser?: string;
}

export type RoomMessageForCard = {
  id: string;
  created_at: string;
  updated_at: string;
  account_in_room: Array<string>;
  name_room: string;
  //TODO_115430: UPDATE IMAGE OF ROOM
  image_room: string;
  lastMessage: string;
  lastMessageTime: string;
  isSeen?: boolean;
  idLastSendingUser?: string;
};

export async function getAllRoomMessageAccount(): Promise<
  Array<RoomMessageForCard> | undefined
> {
  const res = await callGetRequest(`/room-message`, "get-list-room-message");
  if (res.status === 200) {
    const data: Array<RoomMessageForResponse> = res.response;
    const listRoomMessage: Array<RoomMessageForCard> = [];
    for (const item of data) {
      listRoomMessage.push({
        id: item.id,
        account_in_room: item.accountInRoom,
        created_at: item.created_at,
        image_room:
          item.avatar && process.env.NEXT_PUBLIC_API_BASE_URL + item.avatar,
        name_room: item.nameRoom,
        updated_at: item.updated_at,
        lastMessage: item.lastMessage,
        lastMessageTime: item.lastMessageTime,
        isSeen: item.isSeen,
        idLastSendingUser: item.idLastSendingUser,
      });
    }
    return listRoomMessage;
  }
}

export async function updateReadMessage(idRoom: string) {
  const res = await callPatchRequest(`/room-message/update-read/${idRoom}`, {});
  if (res.status === 200) {
    return true;
  }
  return false;
}
