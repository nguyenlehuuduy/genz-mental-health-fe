import { callGetRequest, callPostRequest, callPutRequest } from "./apiService";

interface MyselfResponse {
  id: string;
  fullName: string;
  email: string;
  aboutMe: string;
  nickName: string;
  birth: string;
  address: string;
  avata: string;
  phone: string;
  banner: string;
  favorite?: Array<{
    id: string;
    nameFavorite: string;
  }>;
}

interface DetailMyselfResponse {
  user: MyselfResponse;
  objectCount: {
    posts: number;
    followers: number;
    followings: number;
    postShares: number;
    images: number;
    RequestFollow: number;
  };
  follower: Array<{
    id: string;
    fullName: string;
    avata: string;
    nickName: string;
  }>;
  followings: Array<{
    id: string;
    fullName: string;
    avata: string;
    nickName: string;
  }>;
  image: Array<{
    path: string;
    postId: string;
    typeImage: {
      typeImageName: string;
    };
  }>;
}

export type DetailMyselfResponseForCard = {
  user: MyselfForCard;
  object_count: {
    posts: number;
    followers: number;
    followings: number;
    post_shares: number;
    images: number;
    request_follow: number;
  };
  follower: Array<{
    id: string;
    full_name: string;
    avata: string;
    nick_name: string;
  }>;
  followings: Array<{
    id: string;
    full_name: string;
    avata: string;
    nick_name: string;
  }>;
  image: Array<{
    path: string;
    post_id: string;
    type_image: {
      type_image_name: string;
    };
  }>;
};

export type MyselfForCard = {
  id: string;
  full_name: string;
  email: string;
  about_me: string;
  nick_name: string;
  birth: string;
  address: string;
  avata: string;
  banner: string;
  phone: string;
  favorite?: Array<{
    id: string;
    name_favorite: string;
  }>;
};

export const getLoginAccount = async () => {
  const result = await callGetRequest("/auth/profile");
  const data: MyselfResponse = result.response;

  if (result.status === 200) {
    return {
      about_me: data.aboutMe,
      address: data.address,
      avata: data.avata && process.env.NEXT_PUBLIC_API_BASE_URL + data.avata,
      banner: data.banner && process.env.NEXT_PUBLIC_API_BASE_URL + data.banner,
      birth: data.birth,
      email: data.email,
      full_name: data.fullName,
      id: data.id,
      nick_name: data.nickName,
      phone: data.phone,
    };
  }
};

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface DataResponse {
  response: string;
  status: number;
  message: string;
  name: string;
}

export interface InfoAccountResponse {
  profileOtherAccount: {
    user: {
      id: string;
      fullName: string;
      phone: string;
      aboutMe: string;
      nickName: string;
      birth: string;
      address: string;
      avata: string;
    };
    followerCount: number;
    followingsCount: number;
  };
  is_follow: {
    status: number;
    message: string;
    followShipIdOfFollowing: string;
    followShipIdOfFollower: string;
  };
}

export async function loginAccount(
  body: LoginRequest,
): Promise<LoginResponse | undefined> {
  const result = await callPostRequest("/auth/login", body);
  if (result.status === 201 || result.status === 200) {
    return {
      accessToken: result.response.access_token,
    };
  }
}

export async function registerAccount(
  body: LoginRequest,
): Promise<DataResponse | undefined> {
  const result = await callPostRequest("/auth/register", body);
  return result.response;
}

export type InfoAnotherAccount = {
  profile_other_account: DetailMyselfResponseForCard;
  follow_ship: {
    status: number;
    message: string;
    follow_ship_id: string;
  };
};
export async function getProfileAccount(
  accountId: string,
): Promise<InfoAnotherAccount | undefined> {
  const result = await callGetRequest(
    `/user/other-account-profile/${accountId}`,
    "get-account-another-profile",
  );
  const data: {
    profileOtherAccount: DetailMyselfResponse;
    is_follow: {
      status: number;
      message: string;
      followShipId: string;
    };
  } = result.response;

  const res: InfoAnotherAccount = {
    follow_ship: {
      message: data?.is_follow?.message,
      status: data?.is_follow?.status,
      follow_ship_id: data?.is_follow?.followShipId,
    },

    profile_other_account: {
      user: {
        about_me: data.profileOtherAccount?.user?.aboutMe,
        address: data.profileOtherAccount?.user?.address,
        avata:
          data.profileOtherAccount?.user?.avata &&
          process.env.NEXT_PUBLIC_API_BASE_URL +
            data.profileOtherAccount.user.avata,
        banner:
          data.profileOtherAccount?.user?.banner &&
          process.env.NEXT_PUBLIC_API_BASE_URL +
            data.profileOtherAccount.user.banner,
        birth: data.profileOtherAccount?.user?.birth,
        email: data.profileOtherAccount?.user?.email,
        full_name: data.profileOtherAccount?.user?.fullName,
        id: data.profileOtherAccount?.user?.id,
        nick_name: data.profileOtherAccount?.user?.nickName,
        phone: data.profileOtherAccount?.user?.phone,
      },
      follower: data.profileOtherAccount?.follower?.map((item) => {
        return {
          avata:
            item.avata && process.env.NEXT_PUBLIC_API_BASE_URL + item.avata,
          full_name: item.fullName,
          id: item.id,
          nick_name: item.nickName,
        };
      }),
      followings: data.profileOtherAccount?.followings?.map((item) => {
        return {
          avata:
            item.avata && process.env.NEXT_PUBLIC_API_BASE_URL + item.avata,
          full_name: item.fullName,
          id: item.id,
          nick_name: item.nickName,
        };
      }),
      image: data.profileOtherAccount?.image?.map((item) => {
        return {
          path: item.path,
          post_id: item.postId,
          type_image: {
            type_image_name: "post",
          },
        };
      }),
      object_count: {
        followers: data.profileOtherAccount?.objectCount?.followers,
        followings: data.profileOtherAccount?.objectCount?.followings,
        images: data.profileOtherAccount?.objectCount?.images,
        post_shares: data.profileOtherAccount?.objectCount?.postShares,
        posts: data.profileOtherAccount?.objectCount?.posts,
        request_follow: data.profileOtherAccount?.objectCount?.RequestFollow,
      },
    },
  };

  return res;
}

export async function getDetailMyselfAccount(): Promise<
  DetailMyselfResponseForCard | undefined
> {
  try {
    const result = await callGetRequest(
      `/user/my-account-profile`,
      "get-detail-myself-profile",
    );
    const data: DetailMyselfResponse = result.response;
    return {
      user: {
        about_me: data.user.aboutMe,
        address: data.user.address,
        avata:
          data.user.avata &&
          process.env.NEXT_PUBLIC_API_BASE_URL + data.user.avata,
        banner:
          data.user.banner &&
          process.env.NEXT_PUBLIC_API_BASE_URL + data.user.banner,
        birth: data.user.birth,
        email: data.user.email,
        full_name: data.user.fullName,
        id: data.user.id,
        nick_name: data.user.nickName,
        phone: data.user.phone,
        favorite: data.user.favorite?.map((item) => ({
          id: item.id,
          name_favorite: item.nameFavorite,
        })),
      },
      follower: data.follower.map((item) => {
        return {
          avata:
            item.avata && process.env.NEXT_PUBLIC_API_BASE_URL + item.avata,
          full_name: item.fullName,
          id: item.id,
          nick_name: item.nickName,
        };
      }),
      followings: data.followings.map((item) => {
        return {
          avata:
            item.avata && process.env.NEXT_PUBLIC_API_BASE_URL + item.avata,
          full_name: item.fullName,
          id: item.id,
          nick_name: item.nickName,
        };
      }),
      image: data.image.map((item) => {
        return {
          path: item.path,
          post_id: item.postId,
          type_image: {
            type_image_name: item.typeImage?.typeImageName,
          },
        };
      }),
      object_count: {
        followers: data.objectCount.followers,
        followings: data.objectCount.followings,
        images: data.objectCount.images,
        post_shares: data.objectCount.postShares,
        posts: data.objectCount.posts,
        request_follow: data.objectCount.RequestFollow,
      },
    };
  } catch (error) {
    console.error(error);
  }
}

export type UserForUpdate = {
  fullName: string;
  phone: string;
  aboutMe: string;
  nickName: string;
  birth: string;
  address: string;
  favorite: Array<string>;
};

export async function putInfoAccount(
  account: UserForUpdate,
): Promise<boolean | undefined> {
  try {
    const result = await callPutRequest("/user/update-account", account);
    if (result.status === 200) {
      return true;
    }
  } catch (error) {
    console.error(error);
    return;
  }
}
