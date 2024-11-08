"use client";

import React, { useState } from "react";
import FollowingItem from "../FollowingItem";
import { SuggestFollowSuggestForResponse } from "@/service/followService";
import { unfollow } from "../RequestFollowers/action";

type PropsComponent = {
  listFollowing: SuggestFollowSuggestForResponse[];
};

const FollowingList = ({ listFollowing }: PropsComponent) => {
  const [followings, setFollowings] =
    useState<SuggestFollowSuggestForResponse[]>(listFollowing);

  const handleUnfollow = async (id: string) => {
    const res = await unfollow(id);

    if (res) {
      setFollowings((prevFollowings) =>
        prevFollowings.filter((following) => following.idFollowShip !== id),
      );
    }
  };
  return (
    <div className="py-7 flex flex-col gap-5 min-h-screen overflow-y-auto">
      {followings.map((item) => (
        <FollowingItem
          key={item.id}
          item={item}
          handleUnfollow={handleUnfollow}
        />
      ))}
    </div>
  );
};

export default FollowingList;
