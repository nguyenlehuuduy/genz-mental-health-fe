"use client";

import { Popconfirm, notification } from "antd";
import React, { memo, useEffect, useMemo } from "react";
import {
  NotificationForCard,
  NotificationForResponse,
} from "@/service/notificationService";
import { EVENTS, TYPE_NOTIFY } from "@/lib/constants";
import { NotificationPlacement } from "antd/es/notification/interface";
import { socketService } from "@/socket";
import {
  acceptRequestFollow,
  refuseRequestFollow,
} from "../RequestFollowers/action";
import NotifyItem from "../NotifyItem";
import { deleteNotification, revalidate } from "./action";

type PropsComponent = {
  children: React.ReactNode;
  listNotifi: Array<NotificationForCard>;
};

export default memo(
  function NotifyPopup(props: PropsComponent) {
    const handleAcceptRequestFollow = async (
      idRequest: string,
      idSender: string,
      idReciver: string,
      idNoti: string,
    ) => {
      const result = await acceptRequestFollow(idRequest, idSender, idReciver);

      if (result) {
        await deleteNotification(idNoti);
        openAcceptFollow();
      }
    };

    const handleRefuseRequestFollow = async (
      idNoti: string,
      idRequest: string,
    ) => {
      const result = await refuseRequestFollow(idRequest);

      if (result) {
        await deleteNotification(idNoti);
        openRefuseFollow();
      }
    };

    const openAcceptFollow = () => {
      api.open({
        message: "Chấp nhận theo dõi",
        description: "Giờ bạn đã có thêm 1 người theo dõi",
      });
    };

    const openRefuseFollow = () => {
      api.open({
        message: "Từ chối theo dõi",
        description: "Bạn đã từ chối lời mời theo dõi",
      });
    };
    useEffect(() => {
      const handleNotification = (data: NotificationForResponse) => {
        const notifi: NotificationForCard = {
          id: data.id,
          comment_id: data.commentId ?? "",
          created_at: data.created_at,
          follower_id: data.followerId ?? "",
          message_notifications: data.messageNotifications ?? "",
          post_id: data.postId ?? "",
          post_share_id: data.postShareId ?? "",
          type_Notification: {
            description: data.typeNotification?.description ?? "",
            id: data.typeNotification?.id ?? "",
            thumbnail_Noti: data.typeNotification?.thumbnailNoti ?? "",
            type_Name: data.typeNotification?.typeName ?? "",
          },
          type_notification_id: data.typeNotification?.id ?? "",
          updated_at: data.updated_at,
          account_info: {
            id: data.accountInfo?.id ?? "",
            full_name: data.accountInfo?.fullName ?? "",
            avatar: data.accountInfo?.avata ?? "",
          },
        };
        openNotification("bottomRight", notifi);
        revalidate();
      };

      socketService.on(
        EVENTS.CLIENT.JOIN_NOTIFICATION_IDENTIFY,
        handleNotification,
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const Context = React.createContext({ name: "Thông báo" });
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (
      placement: NotificationPlacement,
      data: NotificationForCard,
    ) => {
      api.info({
        message: `${data.type_Notification.description}`,
        description: (
          <Context.Consumer>
            {() => `Xin chào, ${data.message_notifications}!`}
          </Context.Consumer>
        ),
        placement,
      });
    };

    const contextValue = useMemo(() => ({ name: "Ant Design" }), []);
    return (
      <Context.Provider value={contextValue}>
        {contextHolder}
        <div>
          <Popconfirm
            placement="bottom"
            title={<p className="text-lg font-bold">Thông báo</p>}
            className="w-full"
            showCancel={false}
            cancelButtonProps={{ style: { display: "none" } }}
            okButtonProps={{ style: { display: "none" } }}
            icon={<div></div>}
            description={
              <div className="max-h-[500px] max-w-[320px] overflow-y-auto">
                {props.listNotifi.map((item, index) =>
                  item.type_Notification.id === TYPE_NOTIFY.LIKE ? (
                    <NotifyItem key={index} item={item} isLike />
                  ) : item.type_Notification.id === TYPE_NOTIFY.COMMENT ? (
                    <NotifyItem key={index} item={item} isComment />
                  ) : item.type_Notification.id === TYPE_NOTIFY.SHARE ? (
                    <NotifyItem key={index} item={item} isShare />
                  ) : item.type_Notification.id === TYPE_NOTIFY.ACCEPT_FL ? (
                    <NotifyItem key={index} item={item} isFriend />
                  ) : (
                    <NotifyItem
                      key={index}
                      item={item}
                      handleAcceptRequestFollow={handleAcceptRequestFollow}
                      handleRefuseRequestFollow={handleRefuseRequestFollow}
                    />
                  ),
                )}
              </div>
            }
          >
            {props.children}
          </Popconfirm>
        </div>
      </Context.Provider>
    );
  },
  (prevProps, nextProps) => prevProps === nextProps,
);
