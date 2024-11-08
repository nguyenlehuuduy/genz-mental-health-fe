"use client";

import React, { useState } from "react";
import AvatarAccount from "../Avata";
import { SuggestFollowSuggestForResponse } from "@/service/followService";
import Link from "next/link";

type PropsComponent = {
  item: SuggestFollowSuggestForResponse;
  handleUnfollow: (id: string) => void;
};

const FollowingItem = ({ item, handleUnfollow }: PropsComponent) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="flex justify-between p-3 gap-5 bg-[#F5F6F8] rounded-md w-full cursor-pointer">
      <div className="flex gap-3">
        <div className="w-[70px] h-[70px]">
          <AvatarAccount
            name={item.fullName}
            filePath={item.avata}
            width={70}
            height={70}
          />
        </div>

        <div className="flex flex-col justify-center items-start max-w-[400px] w-full shrink-0">
          <Link
            href={`/profile/${item.id}`}
            className="font-medium hover:underline"
          >
            {item.fullName}
          </Link>
          <p className="text-sm truncate max-w-[350px]">{item.aboutMe}</p>
        </div>
      </div>

      <div className="flex items-center">
        <button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            handleUnfollow(item.idFollowShip);
          }}
          className="bg-white px-2 py-2 rounded-md border border-[#0F52BA] text-[#0F52BA] hover:border-[#FF000F] hover:text-[#FF000F]"
        >
          {isHovered ? "Hủy theo dõi" : "Đang theo dõi"}
        </button>
      </div>
    </div>
  );
};

export default FollowingItem;
