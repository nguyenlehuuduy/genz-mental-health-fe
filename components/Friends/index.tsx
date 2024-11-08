"use client";

import React, { useState } from "react";
import FollowingList from "../FollowingList";
import FollowerList from "../FollowerList";
import RequestFollowList from "../RequestFollowList";
import SuggestFollowList from "../SuggestFollowList";
import {
  SuggestFollowForCard,
  SuggestFollowSuggestForResponse,
} from "@/service/followService";
import RequestFollowers from "../RequestFollowers";

type PropsComponent = {
  listFollowing: SuggestFollowSuggestForResponse[];
  listFollower: SuggestFollowSuggestForResponse[];
  listRequestFollow: RequestFollowers[];
  listSuggestFollow: SuggestFollowForCard[];
};

const Friends = ({
  listFollowing,
  listFollower,
  listRequestFollow,
  listSuggestFollow,
}: PropsComponent) => {
  const [showComponent, setShowComponent] = useState<number>(0);

  return (
    <div className="flex flex-col justify-center px-8 bg-white">
      <div className="flex flex-row items-center gap-4 border-b justify-between">
        <div
          onClick={() => setShowComponent(0)}
          className={`${showComponent === 0 ? "font-bold text-[#0F52BA] border-b-2 border-[#0F52BA]" : "text-[#3D3D3D]"} cursor-pointer flex flex-col justify-center py-3`}
        >
          <span className="text-md">Đang theo dõi</span>
        </div>
        <div
          onClick={() => setShowComponent(1)}
          className={`${showComponent === 1 ? "font-bold text-[#0F52BA] border-b-2 border-[#0F52BA]" : "text-[#3D3D3D]"} cursor-pointer flex flex-col justify-center py-3`}
        >
          <span className="text-md">Người theo dõi</span>
        </div>
        <div
          onClick={() => setShowComponent(2)}
          className={`${showComponent === 2 ? "font-bold text-[#0F52BA] border-b-2 border-[#0F52BA]" : "text-[#3D3D3D]"} cursor-pointer flex flex-col justify-center py-3`}
        >
          <span className="text-md">Xác nhận theo dõi</span>
        </div>
        <div
          onClick={() => setShowComponent(3)}
          className={`${showComponent === 3 ? "font-bold text-[#0F52BA] border-b-2 border-[#0F52BA]" : "text-[#3D3D3D]"} cursor-pointer flex flex-col justify-center py-3`}
        >
          <span className="text-md">Đề xuất cho bạn</span>
        </div>
      </div>
      {showComponent === 0 && <FollowingList listFollowing={listFollowing} />}
      {showComponent === 1 && <FollowerList listFollower={listFollower} />}
      {showComponent === 2 && (
        <RequestFollowList listRequestFollow={listRequestFollow} />
      )}
      {showComponent === 3 && (
        <SuggestFollowList listSuggestFollow={listSuggestFollow} />
      )}
    </div>
  );
};

export default Friends;
