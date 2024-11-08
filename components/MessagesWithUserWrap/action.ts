"use server";

import {
  getAllValidMessageInRoom,
  sendMessage,
} from "@/service/messageService";
import { updateReadMessage } from "@/service/roomMessageService";

export const sendMessageForUser = async (
  contentMessage: string,
  roomId: string,
) => {
  const res = await sendMessage({ contentMessage, roomId });
  return res;
};

export const getListMessageInRoom = async (idRoom: string) => {
  const res = await getAllValidMessageInRoom(idRoom);
  return res;
};

export const seenMessageRoom = async (idRoom: string) => {
  const res = await updateReadMessage(idRoom);
  return res;
};
