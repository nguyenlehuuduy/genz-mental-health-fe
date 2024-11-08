"use client";

import Image from "next/image";
import { Fragment, useState } from "react";
import RecentActionList from "../RecentActionList";
import ListImageAccount from "../ListImageAccount";
import ListVideoAccount from "../ListVideoAccount";
import { DetailMyselfResponseForCard } from "@/service/accountService";
import { TargetAccountForCard } from "@/service/actionTargetService";
import { ImageGalleryForCard } from "@/service/imageService";
import ModalListFollowShip from "../ModalListFollowShip";

type Follow = {
  id: string;
  full_name: string;
  avata: string;
  nick_name: string;
};

type PropsComponent = {
  profile: DetailMyselfResponseForCard;
  listTargetAccount: Array<TargetAccountForCard>;
  listImagePost: Array<ImageGalleryForCard>;
};
export default function OptionManageAccount(props: PropsComponent) {
  const [selectOptionNumber, setSelectOptionNumber] = useState<number>(0);
  const [showFollowShip, setShowFollowShip] = useState<boolean>(false);
  const [dataFollowShip, setDataFollowShip] = useState<Array<Follow>>([]);
  const [typeFollowShip, setTypeFollowShip] = useState<
    "follower" | "following"
  >("follower");
  const { follower, followings, object_count } = props.profile;

  return (
    <Fragment>
      {showFollowShip && (
        <ModalListFollowShip
          followShip={typeFollowShip}
          listFollowShip={dataFollowShip}
          closeModal={() => setShowFollowShip(false)}
          isOpen={showFollowShip}
        />
      )}
      <div className="flex w-full items-center gap-2 text-[14px] mb-2 justify-between px-2">
        <div
          className="cursor-pointer"
          onClick={() => {
            setDataFollowShip(followings);
            setShowFollowShip(true);
            setTypeFollowShip("following");
          }}
        >
          <span className="text-[18px] font-medium">
            {object_count.followings ?? 0}{" "}
          </span>
          Đang theo dõi
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            setShowFollowShip(true);
            setDataFollowShip(follower);
            setTypeFollowShip("follower");
          }}
        >
          <span className="text-[18px] font-medium">
            {object_count.followers ?? 0}{" "}
          </span>
          Theo dõi bạn
        </div>
      </div>
      <div className="flex justify-between h-[40px] mb-4">
        <div
          className={`flex items-center justify-center gap-2 w-[30%] cursor-pointer ${selectOptionNumber === 0 && "border-blue-500 border-b-2"} p-2`}
          onClick={() => setSelectOptionNumber(0)}
        >
          <label className="text-sm  cursor-pointer">Gần đây</label>
        </div>
        <div
          className={`flex items-center justify-center gap-2 w-[30%] cursor-pointer ${selectOptionNumber === 2 && "border-blue-500 border-b-2"} `}
          onClick={() => setSelectOptionNumber(2)}
        >
          <Image
            alt="icon create post"
            width={24}
            height={24}
            src={"/icons-system/GreySolidIcon/video-camera.svg"}
          />
          <label className="text-sm  cursor-pointer">Video</label>
        </div>
        <div
          className={`flex items-center  justify-center gap-2 w-[30%] cursor-pointer ${selectOptionNumber === 1 && "border-blue-500 border-b-2"}`}
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
      {(selectOptionNumber === 0 && (
        <RecentActionList listTargetAccount={props.listTargetAccount ?? []} />
      )) ||
        (selectOptionNumber === 1 && (
          <ListImageAccount
            listImagePublicOfAccount={props.listImagePost ?? []}
          />
        )) ||
        (selectOptionNumber === 2 && <ListVideoAccount />)}
    </Fragment>
  );
}
