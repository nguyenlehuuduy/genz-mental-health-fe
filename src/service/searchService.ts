import { formatDate } from "@/lib/utils";
import { callGetRequest } from "./apiService";

interface SearchAccountType {
  id: string;
  fullName: string;
  aboutMe: string;
  nickName: string;
  address: string;
  avatar: string;
}

interface SearchPostType {
  id: string;
  contentText: string;
  account: {
    fullName: string;
    id: string;
    avata: string;
  };
  created_at: string;
  updated_at: string;
  images: [
    {
      path: string;
    },
  ];
}

export type SearchPostTypeForCard = {
  id: string;
  contentText: string;
  account: {
    full_name: string;
    id: string;
    avata: string;
  };
  created_at: string;
  updated_at: string;
  images: Array<string>;
};

export type SearchAccountForCard = {
  id: string;
  full_name: string;
  about_me: string;
  nick_name: string;
  address: string;
  avatar: string;
};

export async function getSearchAccount(
  keyword: string,
): Promise<Array<SearchAccountForCard> | undefined> {
  try {
    const result = await callGetRequest(
      `/search/accounts?keyword=${keyword}`,
      "get-search-accounts",
    );
    const data: Array<SearchAccountType> = result.response;
    const res: Array<SearchAccountForCard> = [];
    if (result.status === 200) {
      for (const item of data) {
        res.push({
          about_me: item.aboutMe,
          address: item.address,
          avatar:
            item.avatar && process.env.NEXT_PUBLIC_API_BASE_URL + item.avatar,
          full_name: item.fullName,
          id: item.id,
          nick_name: item.nickName,
        });
      }
      return res;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getSearchPost(
  keyword: string,
): Promise<Array<SearchPostTypeForCard> | undefined> {
  try {
    const result = await callGetRequest(
      `/search/posts?keyword=${keyword}`,
      "get-search-posts",
    );
    const data: Array<SearchPostType> = result.response;
    const res: Array<SearchPostTypeForCard> = [];
    if (result.status === 200) {
      for (const item of data) {
        res.push({
          account: {
            avata:
              item.account.avata &&
              process.env.NEXT_PUBLIC_API_BASE_URL + item.account.avata,
            id: item.account.id,
            full_name: item.account.fullName,
          },
          contentText: item.contentText,
          created_at: formatDate(item.created_at, "DD/MM/YYYY HH:mm"),
          id: item.id,
          images: item.images.map(
            (item) =>
              item.path && process.env.NEXT_PUBLIC_API_BASE_URL + item.path,
          ),
          updated_at: formatDate(item.updated_at, "DD/MM/YYYY HH:mm"),
        });
      }
      return res;
    }
  } catch (error) {
    console.error(error);
  }
}
