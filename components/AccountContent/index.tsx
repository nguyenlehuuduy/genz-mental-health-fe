"use client";

import { PostForCard } from "@/service/postService";
import React, { useState } from "react";
import PostByAccount from "../PostByAccount";
import Image from "next/image";
import ModalListFollowShip from "../ModalListFollowShip";
import { InfoAnotherAccount } from "@/service/accountService";
import ListImageAccount from "../ListImageAccount";
import ListVideoAccount from "../ListVideoAccount";
import { ImageGalleryForCard } from "@/service/imageService";
import { PermissionPostForResponse } from "@/service/permissionPostService";

type PropsComponent = {
  idAccount: string;
  profile: InfoAnotherAccount;
  listValidPostOfAccount: PostForCard[];
  listImagePublicOfAccount: Array<ImageGalleryForCard>;
  listPermissionPost: Array<PermissionPostForResponse>;
};

type Follow = {
  id: string;
  full_name: string;
  avata: string;
  nick_name: string;
};

const AccountContent = (props: PropsComponent) => {
  const [showFollowShip, setShowFollowShip] = useState<boolean>(false);
  const [dataFollowShip, setDataFollowShip] = useState<Array<Follow>>([]);
  const [typeFollowShip, setTypeFollowShip] = useState<
    "follower" | "following"
  >("follower");
  const [selectOptionNumber, setSelectOptionNumber] = useState<number>(1);
  const { profile_other_account } = props.profile;

  return (
    <div className="w-full flex mt-2 justify-between">
      <div className="w-[65%]">
        <PostByAccount
          listPermissionPost={props.listPermissionPost ?? []}
          idAccount={props.idAccount}
          listValidPost={props.listValidPostOfAccount}
        />
      </div>
      <div className="w-[33%]">
        <div className="w-full flex flex-col gap-1 overflow-y-auto  h-[calc(100vh-60px)] sticky top-0 bg-white p-2 rounded-md">
          <div className="flex w-full items-center gap-2 text-[14px] mb-2 justify-between px-2">
            <div
              className="cursor-pointer"
              onClick={() => {
                setDataFollowShip(profile_other_account.followings);
                setShowFollowShip(true);
                setTypeFollowShip("following");
              }}
            >
              <span className="text-[18px] font-medium">
                {profile_other_account.object_count.followings ?? 0}{" "}
              </span>
              Đang theo dõi
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowFollowShip(true);
                setDataFollowShip(profile_other_account.follower);
                setTypeFollowShip("follower");
              }}
            >
              <span className="text-[18px] font-medium">
                {profile_other_account.object_count.followers ?? 0}{" "}
              </span>
              Theo dõi bạn
            </div>
          </div>
          <div className="flex justify-between h-[40px] mb-4">
            <div
              className={`flex items-center justify-center gap-2 w-[45%] cursor-pointer ${selectOptionNumber === 2 && "border-blue-500 border-b-2"} `}
              onClick={() => setSelectOptionNumber(2)}
            >
              <Image
                alt="icon create post"
                width={24}
                height={24}
                src={"/icons-system/GreySolidIcon/video-camera.svg"}
              />
              <label className="text-sm cursor-pointer">Video</label>
            </div>
            <div
              className={`flex items-center justify-center gap-2 w-[45%] cursor-pointer ${selectOptionNumber === 1 && "border-blue-500 border-b-2"}`}
              onClick={() => setSelectOptionNumber(1)}
            >
              <Image
                alt="icon create post"
                width={24}
                height={24}
                src={"/icons-system/GreySolidIcon/camera.svg"}
              />
              <label className="text-sm cursor-pointer">Ảnh</label>
            </div>
          </div>
          {(selectOptionNumber === 1 && (
            <ListImageAccount
              listImagePublicOfAccount={props.listImagePublicOfAccount}
            />
          )) ||
            (selectOptionNumber === 2 && <ListVideoAccount />)}
        </div>
        {showFollowShip && (
          <ModalListFollowShip
            followShip={typeFollowShip}
            listFollowShip={dataFollowShip}
            closeModal={() => setShowFollowShip(false)}
            isOpen={showFollowShip}
          />
        )}
      </div>
    </div>
  );
};

export default AccountContent;
