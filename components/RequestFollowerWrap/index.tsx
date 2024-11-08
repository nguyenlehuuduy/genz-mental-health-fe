"use client";
import React, { useEffect, useState } from "react";
import RequestFollowers from "../RequestFollowers";
import { getAllRequestFollowersAccount } from "@/service/followService";
import {
  acceptRequestFollow,
  getRequestFollowers,
  refuseRequestFollow,
} from "../RequestFollowers/action";
import { notification } from "antd";

const RequestFollowerWrap = () => {
  const [api, contextHolder] = notification.useNotification();
  const [requestFollowers, setRequestFollowers] = useState<
    RequestFollowers[] | undefined
  >([]);

  const openNotification = () => {
    api.open({
      message: "Chấp nhận theo dõi",
      description: "Giờ bạn đã có thêm 1 người theo dõi",
    });
  };

  const handleGetRequestFollower = async () => {
    const listRequestFollowers = await getRequestFollowers();
    setRequestFollowers(listRequestFollowers);
  };

  const handleAcceptRequestFollow = async (
    idRequest: string,
    idSender: string,
    idReciver: string,
  ) => {
    const result = await acceptRequestFollow(idRequest, idSender, idReciver);

    if (result) {
      openNotification();
      handleGetRequestFollower();
    }
  };

  const handleRefuseRequestFollow = async (idRequest: string) => {
    const result = await refuseRequestFollow(idRequest);

    if (result) {
      handleGetRequestFollower();
    }
  };

  useEffect(() => {
    handleGetRequestFollower();
  }, []);

  return (
    <div>
      {contextHolder}
      {requestFollowers && (
        <RequestFollowers
          listRequestFollowers={requestFollowers}
          handleAcceptRequestFollow={handleAcceptRequestFollow}
          handleRefuseRequestFollow={handleRefuseRequestFollow}
        />
      )}
    </div>
  );
};

export default RequestFollowerWrap;
