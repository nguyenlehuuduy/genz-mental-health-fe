"use client";

import React, { useState } from "react";
import RequestFollowers from "../RequestFollowers";
import FollowerItem from "../FollowerItem";
import RequestFollowerItem from "../RequestFollowItem";
import { notification } from "antd";
import {
  acceptRequestFollow,
  refuseRequestFollow,
} from "../RequestFollowers/action";

type PropsComponent = {
  listRequestFollow: RequestFollowers[];
};

const RequestFollowList = ({ listRequestFollow }: PropsComponent) => {
  const [requestFollows, setRequestFollows] =
    useState<RequestFollowers[]>(listRequestFollow);

  const [api, contextHolder] = notification.useNotification();
  const openAccept = () => {
    api.open({
      message: "Chấp nhận theo dõi",
      description: "Giờ bạn đã có thêm 1 người theo dõi",
    });
  };

  const openRefuse = () => {
    api.open({
      message: "Từ chối theo dõi",
      description: "Bạn đã từ chối lời mời theo dõi",
    });
  };

  const handleAcceptRequestFollow = async (
    idRequest: string,
    idSender: string,
    idReciver: string,
  ) => {
    const result = await acceptRequestFollow(idRequest, idSender, idReciver);
    if (result) {
      openAccept();
      setRequestFollows((prevFollowings) =>
        prevFollowings.filter((following) => following.id !== idRequest),
      );
    }
  };

  const handleRefuseRequestFollow = async (idRequest: string) => {
    const result = await refuseRequestFollow(idRequest);
    if (result) {
      openRefuse();
      setRequestFollows((prevFollowings) =>
        prevFollowings.filter((following) => following.id !== idRequest),
      );
    }
  };

  return (
    <div className="py-7 flex flex-col gap-5 min-h-screen overflow-y-auto">
      {contextHolder}
      {requestFollows.length ? (
        requestFollows.map((item) => (
          <RequestFollowerItem
            key={item.id}
            item={item}
            handleAcceptRequestFollow={handleAcceptRequestFollow}
            handleRefuseRequestFollow={handleRefuseRequestFollow}
          />
        ))
      ) : (
        <p className="text-center">Chưa có bạn bè để xác nhận</p>
      )}
    </div>
  );
};

export default RequestFollowList;
