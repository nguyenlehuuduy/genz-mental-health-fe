"use client";

import { Divider, Input, List, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { SearchIcon } from "../../icons";
import InfiniteScroll from "react-infinite-scroll-component";
import AvatarAccount from "../Avata";
import { useRouter } from "next/navigation";
import { getTimeAgo } from "@/lib/utils";
import { socketService } from "@/socket";
import { EVENTS } from "@/lib/constants";
import { MessageForResponse } from "@/service/messageService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/configureStore";
import { seenMessage, updateRoomsMessage } from "../../redux/actions/rooms";
import { seenMessageRoom } from "../MessagesWithUserWrap/action";
import { RoomMessageForCard } from "@/service/roomMessageService";

const ChatList = () => {
  const rooms = useSelector((state: RootState) => state.rooms.rooms);
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleNewMessage = (message: MessageForResponse) => {
      dispatch(updateRoomsMessage(message));
    };

    socketService.on(EVENTS.CLIENT.SEND_ROOM_MESSAGE, handleNewMessage);
  });

  const handleSeenMessage = async (idRoom: string) => {
    const res = await seenMessageRoom(idRoom);
    if (res) {
      dispatch(seenMessage(idRoom));
    }
  };

  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRooms, setFilteredRooms] =
    useState<RoomMessageForCard[]>(rooms);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredRooms(rooms);
    } else {
      setFilteredRooms(
        rooms.filter((room) =>
          room.name_room.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    }
  }, [searchTerm, rooms]);
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-3">
        <p className="font-bold text-[#666666]">Tin nhắn</p>
        <Input
          placeholder="Tìm kiếm"
          allowClear
          style={{
            background: "#FAFBFD",
            color: "#666666",
            fontWeight: 500,
          }}
          onChange={(e) => setSearchTerm(e.target.value)}
          suffix={<SearchIcon width={14} height={14} />}
          variant="borderless"
        />
      </div>
      <div className="overflow-auto max-h-1/2">
        {filteredRooms.length > 0 ? (
          <InfiniteScroll
            dataLength={filteredRooms.length}
            next={() => {}}
            hasMore={filteredRooms.length < 1}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>Hết tin nhắn</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={filteredRooms}
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  style={{
                    paddingLeft: 10,
                    paddingRight: 10,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (item.idLastSendingUser !== currentUser?.id) {
                      handleSeenMessage(item.id);
                    }
                    router.push(`/message/${item.id}`);
                  }}
                >
                  <div className="relative flex flex-row w-full h-full justify-between py-3 gap-2">
                    {!item.isSeen &&
                      item.idLastSendingUser !== currentUser?.id && (
                        <div className="absolute w-2 h-2 top-[65%] right-0 bg-[#0866FF] rounded-full"></div>
                      )}

                    <div className="relative w-[44px] h-[44px] rounded-full flex justify-center items-center">
                      <AvatarAccount
                        name={item.name_room}
                        filePath={item.image_room}
                        height={44}
                        width={44}
                      />
                    </div>
                    <div className="flex flex-row items-start  w-full justify-between">
                      <div className="flex flex-col justify-start gap-1 max-w-[170px]">
                        <p className="text-base font-bold text-[#000000CC] truncate">
                          {item.name_room}
                        </p>
                        {/* Check Seen Message */}
                        {item.isSeen ||
                        item.idLastSendingUser === currentUser?.id ? (
                          <p className="text-base font-normal text-[#666666] truncate">
                            {item.idLastSendingUser === currentUser?.id
                              ? "Bạn: "
                              : ""}
                            {item.lastMessage}
                          </p>
                        ) : (
                          <p className="text-base font-bold text-black truncate">
                            {item.lastMessage}
                          </p>
                        )}
                      </div>

                      <p className="text-[10px] text-[#666666] font-semibold">
                        {getTimeAgo(item.lastMessageTime)}
                      </p>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        ) : (
          <p className="px-4 py-8 flex justify-center items-center font-semibold text-lg">
            Bạn chưa trò chuyện với ai
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatList;
