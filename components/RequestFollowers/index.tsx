"use client";

import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/configureStore";
import { useRouter } from "next/navigation";
import { getTimeAgo } from "@/lib/utils";
import AvatarAccount from "../Avata";

type RequestFollowers = {
  id: string;
  sender: {
    id: string;
    fullName: string;
    phone: string;
    aboutMe: string;
    nickName: string;
    birth: string;
    address: string;
    avatar: string;
  };
  createdAt: string;
};

const RequestFollowers = ({
  listRequestFollowers,
  handleAcceptRequestFollow,
  handleRefuseRequestFollow,
}: {
  listRequestFollowers: RequestFollowers[] | undefined;
  handleAcceptRequestFollow: (
    idRequest: string,
    idSender: string,
    idReceiver: string,
  ) => Promise<void>;
  handleRefuseRequestFollow: (idRequest: string) => Promise<void>;
}) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const router = useRouter();

  const handleNavigateProfile = (idAccount: string) => {
    router.push(`/profile/${idAccount}`);
  };
  return (
    <>
      {!!listRequestFollowers?.length && (
        <div className="pb-2">
          <div className="w-full bg-white p-3 rounded-md">
          <div className="w-full">
            <span className="text-[#0F52BA] font-bold">Yêu cầu theo dõi</span>
            <div className="flex flex-col gap-4 pt-4 max-h-[200px] overflow-y-auto">
              {listRequestFollowers &&
                listRequestFollowers.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleNavigateProfile(item.sender.id)}
                    className="flex flex-col items-center gap-2 cursor-pointer"
                  >
                    <div className="w-full flex flex-row justify-between items-center">
                      <div className="flex flex-row items-center gap-4 shrink-0">
                        <div className="relative w-[60px] h-[60px]">
                          <AvatarAccount
                            name={item.sender.fullName}
                            filePath={item.sender.avatar}
                            width={60}
                            height={60}
                          />
                        </div>
                        <p className="font-medium">{item.sender.fullName}</p>
                      </div>
                      <p className="font-medium text-sm text-[#000000B3]">
                        {getTimeAgo(item.createdAt)}
                      </p>
                    </div>
                    <div className="flex flex-col w-full gap-2">
                      <div className="flex flex-row w-full gap-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAcceptRequestFollow(
                              item.id,
                              item.sender.id,
                              user?.id ?? "",
                            );
                          }}
                          className="px-3 py-1 w-full bg-[#0F52BA] rounded-lg text-white text-base font-semibold"
                        >
                          Đồng ý
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRefuseRequestFollow(item.id);
                          }}
                          className="px-3 py-1 w-full bg-[#E4E6EB] rounded-lg text-base font-semibold"
                        >
                          Hủy bỏ
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        </div>
      )}
    </>
  );
};

export default RequestFollowers;
