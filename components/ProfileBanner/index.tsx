"use client";

import { Button } from "antd";
import Image from "next/image";
import { IconAddFriend, MessageBlueIcon } from "../../icons";
import { InfoAnotherAccount } from "@/service/accountService";
import { MouseEventHandler, useState } from "react";
import { follow } from "../RequestFollowers/action";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/configureStore";
import AvatarAccount from "../Avata";

const ProfileBanner = ({
  infoAccount,
  handleUnfollow,
}: {
  infoAccount: InfoAnotherAccount;
  handleUnfollow: (idFollow: string) => Promise<void>;
}) => {
  const [sendFollow, setSendFollow] = useState<boolean>(false);
  const currentUser = useSelector((state: RootState) => state.auth.user);
  let buttonText = "";
  let handleClick: MouseEventHandler<HTMLElement> | undefined = undefined;

  const handleFollow = async (receiverId: string) => {
    const userId = currentUser?.id ?? "";
    if (userId) {
      const result = await follow(userId, receiverId);
      if (result) {
        setSendFollow(true);
      }
    } else {
      console.error("Current user ID is undefined");
    }
  };

  if (sendFollow) {
    buttonText = "Đã gửi follow";
  } else {
    switch (infoAccount.follow_ship.status) {
      case 0:
        buttonText = "Theo dõi";
        handleClick = () =>
          handleFollow(infoAccount.profile_other_account.user.id);
        break;
      case 1:
        buttonText = "Theo dõi lại";
        handleClick = () =>
          handleFollow(infoAccount.profile_other_account.user.id);
        break;
      case 2:
        buttonText = "Đã theo dõi";
        handleClick = () =>
          handleUnfollow(infoAccount.follow_ship.follow_ship_id);
        break;
      case 3:
        buttonText = "Bạn bè";
        handleClick = () =>
          handleUnfollow(infoAccount.follow_ship.follow_ship_id);
        break;
      default:
        buttonText = "Theo dõi";
        handleClick = () =>
          handleFollow(infoAccount.profile_other_account.user.id);
    }
  }

  const icon =
    infoAccount.follow_ship.status !== 3 ? (
      <IconAddFriend width={18} height={18} />
    ) : null;

  return (
    <div className="w-full bg-white rounded-md">
      <div className="relative w-full h-[200px] rounded-md overflow-hidden flex items-center justify-center bg-slate-50">
        {infoAccount.profile_other_account.user.banner ? (
          <Image
            src={infoAccount.profile_other_account.user.banner}
            fill
            className="object-cover"
            quality={100}
            alt="banner account"
          />
        ) : (
          <span className="text-gray-500">Chưa có thông tin banner</span>
        )}
      </div>
      <div className="flex flex-col">
        <div className="flex py-2 px-4 gap-4">
          <div className="relative w-[150px] h-[150px]">
            <AvatarAccount
              name={infoAccount.profile_other_account.user.full_name}
              filePath={infoAccount.profile_other_account.user.avata}
              height={150}
              width={150}
            />
          </div>

          <div className="flex flex-col justify-center gap-3 max-w-[500px] w-full">
            <p className="font-bold text-2xl">
              {infoAccount.profile_other_account.user.full_name}
            </p>
            <p className="text-sm text-[#393A3C]">
              {infoAccount.profile_other_account.user.about_me}
            </p>
            <div className="flex flex-row gap-4">
              <Button
                className={`${infoAccount.follow_ship.status === 3 ? "bg-[#0F52BA] text-white border-white" : "bg-white text-[#0F52BA] border-[#0F52BA]"} flex justify-center items-center text-base font-medium  py-2 `}
                icon={icon}
                onClick={handleClick}
              >
                {buttonText}
              </Button>
              {infoAccount.follow_ship.status === 3 && (
                <Button
                  className="flex justify-center items-center text-base font-medium bg-white text-[#0F52BA] py-2 border-[#0F52BA]"
                  icon={<MessageBlueIcon width={18} height={18} />}
                >
                  Trò chuyện
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;
