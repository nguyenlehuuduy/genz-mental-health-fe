"use client";
import { SuggestFollowSuggestForResponse } from "@/service/followService";
import React, { useState } from "react";
import FollowerItem from "../FollowerItem";
import { follow, unfollow } from "../RequestFollowers/action";
import { notification } from "antd";

type PropsComponent = {
  listFollower: SuggestFollowSuggestForResponse[];
};

const FollowerList = ({ listFollower }: PropsComponent) => {
  const [followers, setFollowers] =
    useState<SuggestFollowSuggestForResponse[]>(listFollower);

  const [api, contextHolder] = notification.useNotification();
  const openSuccess = () => {
    api.success({
      message: "Đã gửi yêu cầu theo dõi",
      description: "Hãy chờ người bạn đó đồng ý",
    });
  };

  const openFail = () => {
    api.error({
      message: "Gửi yêu cầu theo dõi thất bại",
      description: "Hãy thử lại",
    });
  };

  const handleUnfollow = async (id: string) => {
    const res = await unfollow(id);

    if (res) {
      setFollowers((prevFollowers) =>
        prevFollowers.filter((followers) => followers.idFollowShip !== id),
      );
    }
  };

  const handleFollow = async (senderId: string, reciverId: string) => {
    const res = await follow(senderId, reciverId);
    if (res) {
      openSuccess();
    } else {
      openFail();
    }
  };
  return (
    <div className="py-7 flex flex-col gap-5 min-h-screen overflow-y-auto">
      {contextHolder}
      {followers.map((item) => (
        <FollowerItem
          key={item.id}
          item={item}
          handleUnfollow={handleUnfollow}
          handleFollow={handleFollow}
        />
      ))}
    </div>
  );
};

export default FollowerList;
