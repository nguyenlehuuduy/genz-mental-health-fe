import { formatDate } from "@/lib/utils";
import {
  callDeleteRequest,
  callGetRequest,
  callPatchRequest,
  callPostRequest,
} from "./apiService";

interface ContentSaveForResponse {
  accountId: string;
  blog?: {
    title: string;
    account: {
      fullName: string;
      avata: string;
      id: string;
    };
    image: string;
    id: string;
  };
  post?: {
    contentText: string;
    account: {
      fullName: string;
      avata: string;
      id: string;
    };
    id: string;
    images: string;
  };
  postShare?: {
    content: string;
    account: {
      fullName: string;
      avata: string;
      id: string;
    };
    id: string;
  };
  created_at: string;
}

export type ContentSaveForCard = {
  account_id: string;
  blog?: {
    title: string;
    account: {
      full_name: string;
      avata: string;
      id: string;
    };
    image: string;
    id: string;
  };
  post?: {
    content_text: string;
    account: {
      full_name: string;
      avata: string;
      id: string;
    };
    id: string;
    images: string;
  };
  post_share?: {
    content: string;
    account: {
      full_name: string;
      avata: string;
      id: string;
    };
    id: string;
  };
  created_at: string;
};

export async function getAllSaveContentByCate(
  cateSaveId: string,
): Promise<Array<ContentSaveForCard> | undefined> {
  try {
    const res = await callGetRequest(
      `/save-content/${cateSaveId}`,
      "",
      "no-store",
    );
    const data: Array<ContentSaveForResponse> = res.response;
    const result: Array<ContentSaveForCard> = [];
    if (res.status === 200) {
      for (const item of data) {
        if (item.blog?.id) {
          result.push({
            account_id: item.accountId,
            blog: {
              account: {
                avata: item?.blog?.account?.avata
                  ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.blog.account.avata}`
                  : "",
                full_name: item?.blog?.account?.fullName ?? "",
                id: item?.blog?.account.id ?? "",
              },
              title: item?.blog?.title ?? "",
              id: item?.blog?.id ?? "",
              image: item?.blog?.image
                ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.blog?.image}`
                : "",
            },
            created_at: formatDate(item.created_at, "DD/MM/YYYY"),
          });
        }

        if (item.post?.id) {
          result.push({
            account_id: item.accountId,
            created_at: formatDate(item.created_at, "DD/MM/YYYY"),
            post: {
              account: {
                avata: item?.post?.account.avata
                  ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.post.account.avata}`
                  : "",
                full_name: item?.post?.account.fullName ?? "",
                id: item.post?.account?.id ?? "",
              },
              content_text: item?.post?.contentText ?? "",
              id: item?.post?.id ?? "",
              images: item.post?.images
                ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.post?.images}`
                : "",
            },
          });
        }

        if (item.postShare?.id) {
          result.push({
            account_id: item.accountId,
            created_at: formatDate(item.created_at, "DD/MM/YYYY"),
            post_share: {
              account: {
                avata: item?.postShare?.account.avata
                  ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.postShare.account.avata}`
                  : "",
                full_name: item?.postShare?.account.fullName ?? "",
                id: item?.postShare?.account.id ?? "",
              },
              content: item?.postShare?.content ?? "",
              id: item?.postShare?.id ?? "",
            },
          });
        }
      }
      return result;
    }
  } catch (error) {
    console.error(error);
  }
}

export interface ContentSaveForCreate {
  categorySaveId: string;
  blogId?: string;
  postId?: string;
  postShareId?: string;
}

export async function createContentSave(body: ContentSaveForCreate) {
  try {
    const result = await callPostRequest("/save-content", body);
    if (result.status === 201) {
      return true;
    }
  } catch (error) {
    console.error(error);
  }
}

export interface ContentSaveForUpdate {
  categorySaveId: string;
}

export async function updateContentSave(
  id: string,
  body: ContentSaveForUpdate,
) {
  try {
    const result = await callPatchRequest(`/save-content/${id}`, body);
    if (result.status === 200) {
      return true;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function deleteContentSave(id: string) {
  try {
    const result = await callDeleteRequest(`/save-content/${id}`);
    if (result.status === 200) {
      return true;
    }
  } catch (error) {
    console.error(error);
  }
}
