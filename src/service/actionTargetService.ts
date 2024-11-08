import { formatDate } from "@/lib/utils";
import { callGetRequest, callPostRequest } from "./apiService";

export interface TargetAccountForCreate {
  content: string;
  accountId: string;
  actionUserId: string;
  postId?: string;
  targetAccountId?: string;
  blogId?: string;
}
export async function createActionTarget(
  targetAccount: TargetAccountForCreate,
): Promise<boolean | undefined> {
  try {
    const result = await callPostRequest("/action-user/targets", targetAccount);
    if (result.status === 201) {
      return true;
    }
  } catch (error) {
    console.error(error);
  }
}

interface TargetAccountForResponse {
  id: string;
  content: string;
  accountId: string;
  actionUserId: string;
  postId?: string;
  targetAccountId?: string;
  blogId?: string;
  created_at: string;
  updated_at: string;
  targetAccount?: {
    id: string;
    avata: string;
    fullName: string;
  };
  post?: {
    id: string;
    image: string;
    content: string;
  };
  blog?: {
    id: string;
    title: string;
  };
}

export type TargetAccountForCard = {
  id: string;
  content: string;
  account_id: string;
  action_user_id: string;
  post_id?: string;
  target_account_id?: string;
  blog_id?: string;
  created_at: string;
  updated_at: string;
  target_account?: {
    id: string;
    avata: string;
    full_name: string;
  };
  post?: {
    id: string;
    image: string;
    content: string;
  };
  blog?: {
    id: string;
    title: string;
  };
};

export async function getAllActionTargetAccount(): Promise<
  Array<TargetAccountForCard> | undefined
> {
  try {
    const res = await callGetRequest("/action-user/targets", "", "no-store");
    if (res.status === 200) {
      const data: TargetAccountForResponse[] = res.response;
      const result: TargetAccountForCard[] = [];
      for (const target of data) {
        result.push({
          post: {
            content: target.post?.content ?? "",
            id: target.post?.id ?? "",
            image: target?.post?.image
              ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${target.post.image}`
              : "",
          },
          blog: {
            id: target.blog?.id ?? "",
            title: target.blog?.title ?? "",
          },
          target_account: {
            avata: target.targetAccount?.avata
              ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${target.targetAccount.avata}`
              : "",
            full_name: target.targetAccount?.fullName ?? "",
            id: target.targetAccount?.id ?? "",
          },
          account_id: target.accountId,
          action_user_id: target.actionUserId,
          content: target.content,
          created_at: formatDate(target.created_at, "DD/MM/YYYY"),
          id: target.id,
          updated_at: formatDate(target.updated_at, "DD/MM/YYYY"),
        });
      }
      return result;
    }
  } catch (error) {
    console.error(error);
  }
}
