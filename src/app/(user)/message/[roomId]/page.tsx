import { ChatList, MessagesWithUserWrap } from "../../../../../components";
import { getInfRoomMessage } from "@/service/messageService";
import { revalidateTag } from "next/cache";

export default async function MessagePage({
  params,
}: {
  params: { roomId: string };
}) {
  const infRoom = await getInfRoomMessage(params.roomId);
  revalidateTag("get-valid-message-chat");
  return (
    <div className="flex gap-2 w-full">
      <div className={`w-[30%] bg-white rounded-md p-2`}>
        <ChatList />
      </div>
      <div className="w-[70%] bg-white rounded-md p-2">
        <MessagesWithUserWrap infRoom={infRoom!} />
      </div>
    </div>
  );
}
