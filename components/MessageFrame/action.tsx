"use server";
import {
  MessageBotForCard,
  MessageForRequest,
  sendMessageToChatBot,
} from "@/service/messageService";
import { z } from "zod";
import { redirect } from "next/navigation";

interface ValidateFromType {
  contentText?: string;
  roomId?: string;
}

export type ActionMessageForSendBotState = {
  validate?: ValidateFromType;
  success?: boolean;
  response?: MessageBotForCard;
};

const schema = z.object({
  contentText: z
    .string({ invalid_type_error: "Bạn muốn trò chuyện về điều gì?" })
    .min(1, "Bạn muốn trò chuyện về điều gì?"),
  roomId: z
    .string({ invalid_type_error: "Chưa có mã phòng" })
    .min(1, "Chưa có mã phòng"),
});

export async function sendMessageToBot(
  _: ActionMessageForSendBotState,
  formData: FormData,
) {
  const data = Object.fromEntries(formData);
  const validatedFields = schema.safeParse({
    contentText: data.contentText,
    roomId: data.roomId,
  });
  if (!validatedFields.success) {
    return {
      validate: {
        contentText:
          validatedFields.error.formErrors.fieldErrors.contentText?.[0],
        roomId: validatedFields.error.formErrors.fieldErrors.roomId?.[0],
      },
      success: false,
    };
  }
  const body: MessageForRequest = {
    contentText: formData.get("contentText")?.toString() ?? "",
    roomId: formData.get("roomId")?.toString() ?? "",
  };
  const result = await sendMessageToChatBot(body);
  if (result?.id) {
    return { success: true, response: result };
  }
  redirect("/home");
}
