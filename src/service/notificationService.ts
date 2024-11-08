import { callDeleteRequest, callGetRequest } from "./apiService";
import { formatDate } from "@/lib/utils";

export interface NotificationForResponse {
  id: string;
  messageNotifications: string;
  typeNotificationId: string;
  typeNotification: {
    id: string;
    thumbnailNoti: string;
    typeName: string;
    description: string;
  };
  postId: string;
  postShareId: string;
  commentId: string;
  followerId: string;
  created_at: string;
  updated_at: string;
  accountInfo: {
    id: string;
    avata: string;
    fullName: string;
  };
}

export type NotificationForCard = {
  id: string;
  message_notifications: string;
  type_notification_id: string;
  type_Notification: {
    id: string;
    thumbnail_Noti: string;
    type_Name: string;
    description: string;
  };
  post_id: string;
  post_share_id: string;
  comment_id: string;
  follower_id: string;
  created_at: string;
  updated_at: string;
  account_info: {
    id: string;
    full_name: string;
    avatar: string;
  };
};
export async function getListNotification(): Promise<
  Array<NotificationForCard> | undefined
> {
  const res = await callGetRequest(
    `/notifications`,
    "get-valid-notification-cache",
  );
  if (res.status === 200) {
    const data: Array<NotificationForResponse> = res.response;
    const result: Array<NotificationForCard> = [];
    for (const item of data) {
      result.push({
        comment_id: item.commentId,
        message_notifications: item.messageNotifications,
        type_notification_id: item.typeNotificationId,
        type_Notification: {
          id: item.typeNotification.id,
          // thumbnail_Noti: item.typeNotification.thumbnailNoti ,
          thumbnail_Noti:
            "https://cdn.dummyjson.com/cache/100x100/bitter-16/cccccc-black/2535838d9d0ccf91d287ae796ce1a914.webp",
          type_Name: item.typeNotification.typeName,
          description: item.typeNotification.description,
        },
        id: item.id,
        post_id: item.postId,
        post_share_id: item.postShareId,
        follower_id: item.followerId,
        created_at: formatDate(item.created_at, "DD/MM/YYYY HH:mm"),
        updated_at: formatDate(item.updated_at, "DD/MM/YYYY HH:mm"),
        account_info: {
          id: item.accountInfo?.id,
          full_name: item.accountInfo?.fullName,
          avatar:
            item.accountInfo?.avata &&
            process.env.NEXT_PUBLIC_API_BASE_URL + item.accountInfo?.avata,
        },
      });
    }
    return result;
  }
}

export async function deleteNotify(idNoti: string) {
  const res = await callDeleteRequest(`/notifications/${idNoti}`);
  if ((res.status = 200)) {
    return true;
  }
  return false;
}
