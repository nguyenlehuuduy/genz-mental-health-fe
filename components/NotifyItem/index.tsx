"use client";

import React from "react";
import AvatarAccount from "../Avata";
import { HeartIcon } from "../../icons";
import Image from "next/image";
import { NotificationForCard } from "@/service/notificationService";
import { TYPE_NOTIFY } from "@/lib/constants";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/configureStore";
import Link from "next/link";

type PropsComponent = {
  item: NotificationForCard;
  isLike?: boolean;
  isComment?: boolean;
  isShare?: boolean;
  isFriend?: boolean;
  handleAcceptRequestFollow?: (
    idRequest: string,
    idSender: string,
    idReceiver: string,
    idNoti: string,
  ) => Promise<void>;
  handleRefuseRequestFollow?: (
    idNoti: string,
    idRequest: string,
  ) => Promise<void>;
};

const NotifyItem = ({
  item,
  isLike,
  isComment,
  isShare,
  isFriend,
  handleAcceptRequestFollow,
  handleRefuseRequestFollow,
}: PropsComponent) => {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  return (
    <div className="flex flex-row w-full h-full py-3 gap-3 ">
      <div className="relative w-[44px] h-[44px]  rounded-full flex shrink-0 justify-center items-center ">
        <AvatarAccount
          name={item.account_info.full_name}
          filePath={item.account_info.avatar}
          width={44}
          height={44}
        />
      </div>
      <div className="flex flex-col w-[70%] justify-start text-start gap-1 ">
        <Link
          href={`/new-feeds/${item.post_id}`}
          className="text-sm font-semibold"
        >
          {item.type_Notification.type_Name}
        </Link>
        <p className="text-sm text-[#000000E6] font-normal">
          {item.message_notifications}
        </p>
        {item.type_Notification.id === TYPE_NOTIFY.REQUEST_FL && (
          <div className="flex flex-row w-full gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (handleAcceptRequestFollow) {
                  handleAcceptRequestFollow(
                    item.follower_id,
                    item.account_info.id,
                    currentUser?.id || "",
                    item.id,
                  );
                }
              }}
              className="px-3 py-1 w-full bg-[#0F52BA] rounded-lg text-white text-base font-semibold"
            >
              Đồng ý
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (handleRefuseRequestFollow) {
                  handleRefuseRequestFollow(item.id, item.follower_id);
                }
              }}
              className="px-3 py-1 w-full bg-[#E4E6EB] rounded-lg text-base font-semibold"
            >
              Hủy bỏ
            </button>
          </div>
        )}
        <p className="text-sm text-[#000000B3] font-normal">
          {item.created_at}
        </p>
      </div>
      <div className="flex flex-col  h-full items-center gap-5 px-2 ">
        <div className="w-[10px] h-[10px] rounded-full bg-[#0F52BA]"></div>
        {isLike && <HeartIcon width={20} height={18} />}
        {isComment && (
          <Image
            src="icons-system/GreySolidIcon/chat-alt.svg"
            width={20}
            height={20}
            alt="icon save post"
          />
        )}
        {isShare && (
          <Image
            src="icons-system/GreySolidIcon/share.svg"
            width={20}
            height={20}
            alt="icon save post"
          />
        )}
        {isFriend && (
          <Image
            src="/friend_icon.svg"
            width={20}
            height={20}
            alt="icon save post"
          />
        )}
      </div>
    </div>
  );
};

export default NotifyItem;
