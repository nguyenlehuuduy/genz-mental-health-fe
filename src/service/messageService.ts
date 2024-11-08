import { callGetRequest, callPostRequest } from "./apiService";

export type RoomMessageForRequest = {
  accountInRoom: Array<string>;
  name: string;
};

interface RoomMessageForResponse {
  id: string;
  created_at: Date;
  updated_at: Date;
  nameRoom?: string;
}

export type RoomBotMessageForCard = {
  id: string;
  created_at: Date;
  updated_at: Date;
  name_room?: string;
};

export interface MessageForResponse {
  id: string;
  owner: {
    id: string;
    fullName: string;
    email: string;
    avata: string;
  };
  ownerId: string;
  roomId: string;
  created_at: Date;
  updated_at: Date;
  contentText: string;
}

export type MessageForCard = {
  id: string;
  owner: {
    id: string;
    full_name: string;
    email: string;
    avata: string;
  };
  owner_id: string;
  room_id: string;
  created_at: Date;
  updated_at: Date;
  content_text: string;
};

export type MessageForRequest = {
  contentText: string;
  roomId: string;
};

export type MessageForUserRequest = {
  contentMessage: string;
  roomId: string;
};

interface MessageUserForResponse {
  id: string;
  ownerId: string;
  owner: {
    id: string;
    fullName: string;
    email: string;
    avata: string;
  };
  contentText: string;
  roomId: string;
  created_at: string;
  updated_at: string;
}

interface MessageBotForResponse {
  id: string;
  ownerId: string;
  roomId: string;
  created_at: string;
  contentText: string;
}

export type MessageBotForCard = {
  id: string;
  owner_id: string;
  room_id: string;
  created_at: string;
  content_text: string;
};

interface RoomMessageInfForResponse {
  id: string;
  nameRoom: string;
  created_at: Date;
  accountInRoom: Array<{
    fullName: string;
    id: string;
    nickName: string;
    avata: string;
  }>;
}

export type RoomMessageInfForCard = {
  id: string;
  name_room: string;
  created_at: Date;
  account_in_room: Array<{
    full_name: string;
    id: string;
    nick_name: string;
    avata: string;
  }>;
};

export async function createRoomChat(
  accountInRoom: RoomMessageForRequest,
): Promise<RoomBotMessageForCard | undefined> {
  const result = await callPostRequest("/room-message", accountInRoom);
  if (result.status === 201) {
    const data: RoomMessageForResponse = result.response;
    const response: RoomBotMessageForCard = {
      created_at: data.created_at,
      id: data.id,
      updated_at: data.updated_at,
      name_room: data.nameRoom,
    };
    return response;
  }
}

export async function getAllValidRoomChatBot(): Promise<
  Array<RoomBotMessageForCard> | undefined
> {
  const res = await callGetRequest(
    `/room-message/chat-bot`,
    "get-valid-room-chat-bot",
  );
  if (res.status === 200) {
    const data: Array<RoomMessageForResponse> = res.response;
    const result: Array<RoomBotMessageForCard> = [];
    for (const item of data) {
      result.push({
        created_at: item.created_at,
        id: item.id,
        updated_at: item.updated_at,
        name_room: item.nameRoom,
      });
    }
    return result;
  }
}

export async function getAllValidMessageInRoom(
  idRoom: string,
): Promise<Array<MessageForCard> | undefined> {
  const res = await callGetRequest(
    `/room-message/messages/${idRoom}`,
    "get-valid-message-chat",
  );
  if (res.status === 200) {
    const data: Array<MessageForResponse> = res.response;
    const result: Array<MessageForCard> = [];
    let i = 0;
    for (const item of data) {
      if (i > 0) {
        result.push({
          created_at: item.created_at,
          id: item.id,
          updated_at: item.updated_at,
          content_text: item.contentText,
          owner: {
            avata:
              item.owner.avata &&
              process.env.NEXT_PUBLIC_API_BASE_URL + item.owner.avata,
            email: item.owner.email,
            full_name: item.owner.fullName,
            id: item.id,
          },
          owner_id: item.ownerId,
          room_id: item.ownerId,
        });
      }
      i++;
    }
    return result;
  }
}

export async function sendMessageToChatBot(body: MessageForRequest) {
  const result = await callPostRequest("/chat-bot", body);
  if (result.status === 201) {
    const data: MessageBotForResponse = result.response;
    const response: MessageBotForCard = {
      created_at: data.created_at,
      id: data.id,
      content_text: data.contentText,
      owner_id: data.ownerId,
      room_id: data.roomId,
    };
    return response;
  }
}

export async function getInfRoomMessage(
  idRoom: string,
): Promise<RoomMessageInfForCard | undefined> {
  const res = await callGetRequest(
    `/room-message/${idRoom}`,
    "get-inf-room-chat-bot",
  );
  if (res.status === 200) {
    const data: RoomMessageInfForResponse = res.response;
    const result: RoomMessageInfForCard = {
      account_in_room: data.accountInRoom.map((item) => {
        return {
          avata:
            item.avata && process.env.NEXT_PUBLIC_API_BASE_URL + item.avata,
          full_name: item.fullName,
          id: item.id,
          nick_name: item.nickName,
        };
      }),
      created_at: data.created_at,
      id: data.id,
      name_room: data.nameRoom,
    };

    return result;
  }
}

export async function sendMessage(body: MessageForUserRequest) {
  const result = await callPostRequest("/room-message/send-message", body);
  if (result.status === 201) {
    const data: MessageUserForResponse = result.response;
    return data;
  }
}
