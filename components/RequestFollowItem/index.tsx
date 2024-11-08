"use client";

import React from "react";
import AvatarAccount from "../Avata";
import RequestFollowers from "../RequestFollowers";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/configureStore";
import Link from "next/link";

type PropsComponent = {
  item: RequestFollowers;
  handleAcceptRequestFollow: (
    idRequest: string,
    idSender: string,
    idReceiver: string,
  ) => Promise<void>;
  handleRefuseRequestFollow: (idRequest: string) => Promise<void>;
};

const RequestFollowerItem = ({
  item,
  handleAcceptRequestFollow,
  handleRefuseRequestFollow,
}: PropsComponent) => {

  const currentUser = useSelector((state: RootState) => state.auth.user);
  return (
    <div
      className="flex justify-between flex-row p-3 gap-5 bg-[#F5F6F8] rounded-md w-full cursor-pointer "
    >
      <div className="flex gap-3">
      <div className="w-[70px] h-[70px]">
        <AvatarAccount
          name={item.sender.fullName}
          filePath={item.sender.avatar}
          width={70}
          height={70}
        />
      </div>

      <div className="flex flex-col justify-center items-start max-w-[350px] w-full">
        <Link href={`/profile/${item.sender.id}`} className="text-base font-medium hover:underline">
          {item.sender.fullName}
        </Link>
        <p className="text-sm max-w-[350px] truncate">
          {item.sender.aboutMe}
        </p>
      </div>
      </div>
      <div className="flex justify-end">
        <div className="flex flex-row items-center gap-2 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAcceptRequestFollow(item.id, item.sender.id, currentUser?.id!);
            }}
            className="w-full bg-white px-4 py-2 rounded-md border border-[#0F52BA] text-[#0F52BA] font-bold text-xs "
          >
            Chấp nhận
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRefuseRequestFollow(item.id);
            }}
            className="bg-white px-4 py-2 rounded-md border border-[#3D3D3D] text-[#3D3D3D] font-bold text-xs "
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestFollowerItem;
