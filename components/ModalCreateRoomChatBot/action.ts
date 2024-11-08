"use server";
import { ID_CHAT_BOT } from "@/lib/constants";
import { getLoginAccount } from "@/service/accountService";
import {
  RoomMessageForRequest,
  createRoomChat,
  sendMessageToChatBot,
} from "@/service/messageService";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { redirect } from "next/navigation";

interface ValidateFromType {
  nameRoom?: string;
}

export type ActionRoomForCreateState = {
  validate?: ValidateFromType;
  success?: boolean;
  idRoom?: string;
};

const schema = z.object({
  nameRoom: z
    .string({ invalid_type_error: "Bạn muốn trò chuyện về điều gì?" })
    .min(1, "Bạn muốn trò chuyện về điều gì?"),
});

export async function createRoom(
  _: ActionRoomForCreateState,
  formData: FormData,
) {
  const data = Object.fromEntries(formData);
  const userInfo = await getLoginAccount();
  const validatedFields = schema.safeParse({
    nameRoom: data.nameRoom,
  });
  if (!validatedFields.success) {
    return {
      validate: {
        nameRoom: validatedFields.error.formErrors.fieldErrors.nameRoom?.[0],
      },
      success: false,
    };
  }
  const body: RoomMessageForRequest = {
    accountInRoom: [ID_CHAT_BOT, userInfo?.id ?? ""].filter(Boolean),
    name: formData.get("nameRoom")?.toString() ?? "",
  };
  const result = await createRoomChat(body);
  const sendAFirstMessage = await sendMessageToChatBot({
    contentText: `xin chào, rất vui khi gặp cậu, cậu tên gì? là ai?`,
    roomId: result?.id ?? "",
  });
  if (sendAFirstMessage?.id) {
    revalidateTag("get-valid-room-chat-bot");
    return { success: true, idRoom: result?.id };
  }
  redirect("/home");
}
