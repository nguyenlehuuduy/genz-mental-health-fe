"use client";

import { RoomMessageForCard } from "@/service/roomMessageService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AvatarAccount from "../Avata";
import { socketService } from "@/socket";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addRoomsMessage } from "../../redux/actions/rooms";
import Image from "next/image";

type PropsComponent = {
  listRoomChat: Array<RoomMessageForCard>;
  sessionKey: string;
};

export default function ChatRoomArea(props: PropsComponent) {
  const router = useRouter();
  const dispatch = useDispatch();

  const joinAllRoom = (rooms: RoomMessageForCard[]) => {
    rooms.forEach((room) => {
      socketService.joinRoom(room.id);
    });
  };

  useEffect(() => {
    dispatch(addRoomsMessage(props.listRoomChat));
    if (socketService.checkConnect()) {
      joinAllRoom(props.listRoomChat);
    } else {
      socketService.connectWithAuthToken(props.sessionKey);
      joinAllRoom(props.listRoomChat);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isChatVisible, setIsChatVisible] = useState<boolean>(true);

  const toggleChatVisibility = () => {
    setIsChatVisible((prev) => !prev);
  };

  return (
    <div className="p-2 w-full">
      <div className="flex pl-12 gap-6" onClick={toggleChatVisibility}>
        <Image
          src="icons-system/GreySolidIcon/chevron-down.svg"
          width={24}
          height={24}
          alt="icon video"
          className="rounded-none cursor-pointer"
        />
        <p className="font-bold">Trò chuyện</p>
      </div>

      <div
        className={`flex pl-10 flex-col w-full gap-4 mt-5 overflow-y-auto transition-[max-height,transform,opacity] duration-500 ease-in-out ${
          isChatVisible
            ? "max-h-[432px] opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-4"
        }`}
      >
        {props.listRoomChat ? (
          props.listRoomChat.map((item, index) => (
            <div
              onClick={() => {
                router.push(`/message/${item.id}`);
              }}
              key={index}
              className="relative flex w-full items-center justify-start gap-2 cursor-pointer p-2"
            >
              <div className="relative flex w-[40px] h-[40px]">
                <AvatarAccount
                  name={item.name_room}
                  filePath={item.image_room}
                  height={40}
                  width={40}
                />
              </div>
              <p className="text-base font-bold leading-5 text-[#000000CC]">
                {item.name_room}
              </p>
            </div>
          ))
        ) : (
          <p className="w-full text-center">
            Kết bạn để có thể trò chuyện, chia sẻ nhiều hơn nhé
          </p>
        )}
      </div>
    </div>
  );
}
