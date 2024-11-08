import {
  getAllValidMessageInRoom,
  getAllValidRoomChatBot,
  getInfRoomMessage,
} from "@/service/messageService";
import { MessageFrame } from "../../../../components";
import { getLoginAccount } from "@/service/accountService";
import ListRoomMessageChat from "../../../../components/ListRoomMessageChatBot";
import CreateRoomChatBot from "../../../../components/CreateRoomChatBot";
import { revalidateTag } from "next/cache";

type PropsComponent = {
  searchParams: {
    idBotRoom: string;
  };
};

async function getAllMessageOfRoom(idRoom: string) {
  try {
    return await getAllValidMessageInRoom(idRoom);
  } catch (error) {
    console.error(error);
  }
}

export default async function ChatboxPage(props: PropsComponent) {
  const listMessage =
    props.searchParams.idBotRoom &&
    (await getAllMessageOfRoom(props.searchParams.idBotRoom));
  const listBotRoomChat = await getAllValidRoomChatBot();
  const profile = await getLoginAccount();
  const infRoom =
    props.searchParams.idBotRoom &&
    (await getInfRoomMessage(props.searchParams.idBotRoom));
  revalidateTag("get-valid-message-chat");
  return (
    <div className="flex w-full gap-1 m-auto">
      {listMessage && infRoom ? (
        <MessageFrame
          infRoom={infRoom}
          profile={profile!}
          listMessage={listMessage}
          idBotRoom={props.searchParams.idBotRoom}
        />
      ) : (
        <CreateRoomChatBot />
      )}
      <div className="flex flex-col w-[30%] h-[calc(100vh-80px)] overflow-y-auto gap-1">
        <ListRoomMessageChat
          currentRoom={props.searchParams.idBotRoom}
          listBotRoomChat={listBotRoomChat ?? []}
        />
      </div>
    </div>
  );
}
