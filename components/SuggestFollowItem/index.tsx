"use client";

import React from "react";
import AvatarAccount from "../Avata";
import { useRouter } from "next/navigation";
import { SuggestFollowForCard } from "@/service/followService";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/configureStore";
import { follow } from "../RequestFollowers/action";
import { notification } from "antd";

type PropsComponent = {
  item: SuggestFollowForCard;
};

const SuggestFollowItem = ({ item }: PropsComponent) => {
  const router = useRouter();

  const currentUser = useSelector((state: RootState) => state.auth.user);

  const [api, contextHolder] = notification.useNotification();
  const success = () => {
    api.open({
      message: "Chấp nhận theo dõi",
      description: "Giờ bạn đã có thêm 1 người theo dõi",
    });
  };

  const handleFollow = async () => {
    const res = await follow(currentUser?.id!, item.id);

    if (res) {
      success();
    }
  };
  return (
    <div
      onClick={() => router.push(`/profile/${item.id}`)}
      className="flex flex-row p-3 gap-5 bg-[#F5F6F8] rounded-md w-full cursor-pointer"
    >
      {contextHolder}
      <div className="w-[70px] h-[70px]">
        <AvatarAccount
          name={item.full_name}
          filePath={item.avata}
          width={70}
          height={70}
        />
      </div>

      <div className="flex flex-col justify-center items-start max-w-[400px] w-full shrink-0">
        <p className="text-base font-bold text-[#000000CC]">{item.full_name}</p>
        <p className="text-sm text-black truncate">{item.about_me}</p>
      </div>

      <div className="flex items-center">
        <button
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            handleFollow();
          }}
          className="bg-white px-4 py-2 rounded-md border border-[#0F52BA] text-[#0F52BA] font-bold text-xs hover:border-[#FF000F] hover:text-[#FF000F]"
        >
          Theo dõi
        </button>
      </div>
    </div>
  );
};

export default SuggestFollowItem;
