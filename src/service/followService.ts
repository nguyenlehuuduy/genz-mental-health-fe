import {
  callDeleteRequest,
  callGetRequest,
  callPostRequest,
} from "./apiService";

export interface SuggestFollowSuggestForResponse {
  idFollowShip: string;
  id: string;
  fullName: string;
  phone: string;
  aboutMe: string;
  nickName: string;
  birth: string;
  address: string;
  avata: string;
  followStatus?: boolean;
}

export type SuggestFollowForCard = {
  id: string;
  full_name: string;
  phone: string;
  about_me: string;
  nick_name: string;
  birth: string;
  address: string;
  // TODO_1214430: dont return avata in this
  avata: string;
};

export type RequestFollowerResponse = {
  id: string;
  sender: {
    id: string;
    fullName: string;
    phone: string;
    aboutMe: string;
    nickName: string;
    birth: string;
    address: string;
    avata: string;
  };
  created_at: string;
  updated_at: string;
};

export type RequestFollowers = {
  id: string;
  sender: {
    id: string;
    fullName: string;
    phone: string;
    aboutMe: string;
    nickName: string;
    birth: string;
    address: string;
    avatar: string;
  };
  createdAt: string;
};

export async function getAllSuggestFollowAccount(): Promise<
  Array<SuggestFollowForCard> | undefined
> {
  const res = await callGetRequest(
    `/user/suggest-follow`,
    "get-suggest-follow",
  );
  if (res.status === 200) {
    const data: Array<SuggestFollowSuggestForResponse> = res.response;
    const listSuggestFollow: Array<SuggestFollowForCard> = [];
    for (const item of data) {
      listSuggestFollow.push({
        id: item.id,
        about_me: item.aboutMe,
        address: item.address,
        avata: item.avata && process.env.NEXT_PUBLIC_API_BASE_URL + item.avata,
        birth: item.birth,
        full_name: item.fullName,
        nick_name: item.nickName,
        phone: item.phone,
      });
    }
    return listSuggestFollow;
  }
}

export async function getAllRequestFollowersAccount() {
  const res = await callGetRequest(
    `/follow/request-followers`,
    "get-request-follow",
  );
  if (res.status === 200 && res.response) {
    const data: Array<RequestFollowerResponse> = res.response;
    const listRequestFollowers: Array<RequestFollowers> = [];
    for (const item of data) {
      const requestFollowers: RequestFollowers = {
        id: item.id,
        sender: {
          id: item.sender.id,
          fullName: item.sender.fullName,
          phone: item.sender.phone,
          aboutMe: item.sender.aboutMe,
          nickName: item.sender.nickName,
          birth: item.sender.birth,
          address: item.sender.address,
          avatar:
            item.sender.avata &&
            process.env.NEXT_PUBLIC_API_BASE_URL + item.sender.avata,
        },
        createdAt: item.created_at,
      };
      listRequestFollowers.push(requestFollowers);
    }
    return listRequestFollowers;
  }
}

export async function acceptFollow(
  idRequest: string,
  idSender: string,
  idReciver: string,
) {
  const res = await callPostRequest(`/follow/accept/${idRequest}`, {
    senderId: idSender,
    reciverId: idReciver,
  });
  return res.status;
}

export async function followAccount(senderId: string, reciverId: string) {
  const res = await callPostRequest(`/follow`, {
    senderId: senderId,
    reciverId: reciverId,
  });
  return res.status;
}

export async function refuseFollow(idRequest: string) {
  const res = await callDeleteRequest(`/follow/${idRequest}`);
  return res.status;
}

export async function unfollowAccount(idFollow: string) {
  const res = await callDeleteRequest(`/follow/unfollow/${idFollow}`);

  return res.status;
}

export async function getListFollowing() {
  const res = await callGetRequest("/follow/followings", "get-list-followings");
  if (res.status === 200) {
    const data: Array<SuggestFollowSuggestForResponse> = res.response;
    const listFollowing: Array<SuggestFollowSuggestForResponse> = [];
    for (const item of data) {
      listFollowing.push({
        id: item.id,
        aboutMe: item.aboutMe,
        address: item.address,
        avata: item.avata && process.env.NEXT_PUBLIC_API_BASE_URL + item.avata,
        birth: item.birth,
        fullName: item.fullName,
        nickName: item.nickName,
        phone: item.phone,
        idFollowShip: "",
      });
    }
    return listFollowing;
  }
}

export async function getListFollower() {
  const res = await callGetRequest("/follow/followers", "get-list-followers");
  if (res.status === 200) {
    const data: Array<SuggestFollowSuggestForResponse> = res.response;
    const listFollower: Array<SuggestFollowSuggestForResponse> = [];
    for (const item of data) {
      listFollower.push({
        id: item.id,
        aboutMe: item.aboutMe,
        address: item.address,
        avata: item.avata && process.env.NEXT_PUBLIC_API_BASE_URL + item.avata,
        birth: item.birth,
        fullName: item.fullName,
        nickName: item.nickName,
        phone: item.phone,
        idFollowShip: "",
      });
    }
    return listFollower;
  }
}
