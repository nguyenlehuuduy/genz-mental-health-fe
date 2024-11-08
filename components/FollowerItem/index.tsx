"use client";

import React, { useState } from "react";
import AvatarAccount from "../Avata";
import { SuggestFollowSuggestForResponse } from "@/service/followService";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/configureStore";

type PropsComponent = {
  item: SuggestFollowSuggestForResponse;
  handleUnfollow: (id: string) => void;
  handleFollow: (senderId: string, reciverId: string) => void;
};

const FollowerItem = ({
  item,
  handleUnfollow,
  handleFollow,
}: PropsComponent) => {
  const [isHovered, setIsHovered] = useState(false);

  const currentUser = useSelector((state: RootState) => state.auth.user);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/profile/${item.id}`)}
      className="flex justify-between p-3 gap-5 bg-[#F5F6F8] rounded-md w-full cursor-pointer"
    >
      <div className="flex gap-3">
        <div className="w-[70px] h-[70px]">
          <AvatarAccount
            name={item.fullName}
            filePath={item.avata}
            width={70}
            height={70}
          />
        </div>

        <div className="flex flex-col justify-center items-start max-w-[400px] w-full">
          <p className="text-base font-bold text-[#000000CC]">
            {item.fullName}
          </p>
          <p className="text-sm text-black truncate max-w-[350px]">
            {item.aboutMe}
          </p>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2 shrink-0">
        {item.followStatus ? (
          <button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();
              handleUnfollow(item.idFollowShip);
            }}
            className="w-full bg-white px-4 py-2 rounded-md border border-[#0F52BA] text-[#0F52BA] font-bold text-xs hover:border-[#FF000F] hover:text-[#FF000F]"
          >
            {isHovered ? "Hủy theo dõi" : "Bạn bè"}
          </button>
        ) : (
          <button
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();
              handleFollow(currentUser?.id || "", item.id);
            }}
            className="w-full bg-white px-4 py-2 rounded-md border border-[#0F52BA] text-[#0F52BA] hover:bg-slate-50"
          >
            Theo dõi lại
          </button>
        )}

        <button className="bg-white px-4 py-2 rounded-md border border-[#3D3D3D] text-[#3D3D3D] ">
          Xóa
        </button>
      </div>
    </div>
  );
};

export default FollowerItem;
