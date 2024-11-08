import { formatDate } from "@/lib/utils";
import { PaginationForResponse } from "../../type";
import {
  callDeleteRequest,
  callGetRequest,
  callPostRequest,
  callPutRequest,
} from "./apiService";
import { CommentForCard } from "./commentService";

interface PostModel {
  id: string;
  contentText: string;
  accountId: string;
  account: {
    id: string;
    fullName: string;
    phone: string;
    aboutMe: string;
    nickName: string;
    birth: string;
    address: string;
    avata: string;
  };
  is_liked: boolean;
  created_at: string;
  updated_at: string;
  totalReaction: number;
  totalComment: number;
  totalShare: number;
  images: Array<{
    accountId: string;
    postId: string;
    path: string;
  }>;
  comment_recent: Array<{
    account: {
      id: string;
      name: string;
      nick_name: string;
      avata: string;
    };
    created_at: string;
    content: string;
  }>;
  permissionPost: {
    id: string;
    description: string;
    code: string;
  };
  is_share?: boolean;
  infoAuthorAndPost?: {
    author: {
      id: string;
      fullName: string;
      phone: string;
      aboutMe: string;
      nickName: string;
      birth: string;
      address: string;
      avata: string;
    };
    postInf: {
      id: string;
      images?: Array<{
        accountId: string;
        postId: string;
        path: string;
      }>;
      contentText: string;
      created_at: string;
    };
  };
  isSave: boolean;
}

export type PostForCard = {
  post_id: string;
  content_text: string;
  created_at: string;
  total_reaction?: number;
  total_comment?: number;
  total_share?: number;
  image_post?: Array<string>;
  account: {
    id: string;
    name: string;
    nick_name: string;
    avata: string;
  };
  is_like: boolean;
  comment_recent: Array<{
    account: {
      id: string;
      name: string;
      nick_name: string;
      avata: string;
    };
    created_at: string;
    content: string;
  }>;
  permission_post: {
    id: string;
    description: string;
    code: string;
  };
  //FOR POST SHARE
  is_share?: boolean;
  info_author_and_post?: {
    author: {
      id: string;
      name: string;
      nick_name: string;
      avata?: string;
    };
    postInf: {
      id: string;
      images?: Array<string>;
      content_text: string;
      created_at: string;
    };
  };
  is_save: boolean;
};

export async function getListValidPostByAccount(page?: number | 1) {
  const res = await callGetRequest(
    `/post/valid-post?pageNo=${page}&limit=2`,
    "get-valid-post-cache",
  );

  if (res.status === 200) {
    const data: {
      data: PostModel[];
      pagination: PaginationForResponse;
    } = res.response;

    const result: PostForCard[] = [];
    for (const post of data.data) {
      if (post.is_share) {
        result.push({
          is_save: post.isSave,
          is_share: true,
          account: {
            id: post.account.id,
            name: post.account.fullName,
            nick_name: post.account.nickName,
            avata:
              post.account.avata &&
              `${process.env.NEXT_PUBLIC_API_BASE_URL}${post.account.avata}`,
          },
          content_text: post.contentText,
          created_at: post.created_at,
          is_like: post.is_liked,
          post_id: post.id,
          total_comment: post.totalComment,
          total_reaction: post.totalReaction,
          comment_recent:
            post?.comment_recent?.map((item) => ({
              ...item,
              account: {
                avata:
                  item.account.avata &&
                  process.env.NEXT_PUBLIC_API_BASE_URL + item.account.avata,
                id: item.account.id,
                name: item.account.name,
                nick_name: item.account.nick_name,
              },
            })) ?? [],
          permission_post: post.permissionPost,
          info_author_and_post: {
            author: {
              avata:
                post.infoAuthorAndPost?.author.avata &&
                process.env.NEXT_PUBLIC_API_BASE_URL +
                  post.infoAuthorAndPost?.author.avata,
              id: post.infoAuthorAndPost?.author.id ?? "",
              name: post.infoAuthorAndPost?.author.fullName ?? "",
              nick_name: post.infoAuthorAndPost?.author.nickName ?? "",
            },
            postInf: {
              content_text: post.infoAuthorAndPost?.postInf.contentText ?? "",
              created_at: formatDate(
                post.infoAuthorAndPost?.postInf.created_at,
                "dd/mm/yyyy",
              ),
              id: post.infoAuthorAndPost?.postInf.id ?? "",
              images: post.infoAuthorAndPost?.postInf.images?.map(
                (img) =>
                  img.path && process.env.NEXT_PUBLIC_API_BASE_URL + img.path,
              ),
            },
          },
        });
      } else {
        result.push({
          is_save: post.isSave,
          is_share: false,
          account: {
            id: post.account.id,
            name: post.account.fullName,
            nick_name: post.account.nickName,
            avata:
              post.account.avata &&
              `${process.env.NEXT_PUBLIC_API_BASE_URL}${post.account.avata}`,
          },
          content_text: post.contentText,
          created_at: post.created_at,
          image_post: post.images.map(
            (item) => `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.path}`,
          ),
          is_like: post.is_liked,
          post_id: post.id,
          total_comment: post.totalComment,
          total_reaction: post.totalReaction,
          total_share: post.totalShare,
          comment_recent:
            post?.comment_recent?.map((item) => ({
              ...item,
              account: {
                avata:
                  item.account.avata &&
                  process.env.NEXT_PUBLIC_API_BASE_URL + item.account.avata,
                id: item.account.id,
                name: item.account.name,
                nick_name: item.account.nick_name,
              },
            })) ?? [],
          permission_post: post.permissionPost,
        });
      }
    }
    return {
      data: result,
    };
  }
}

export type PostForRequest = {
  contentText: string;
  imagePaths?: Array<string>;
  permissionPostId?: string;
};

export async function uploadPost(
  body: PostForRequest,
): Promise<boolean | undefined> {
  const result = await callPostRequest("/post", body);
  if (result.status === 201) {
    return true;
  }
}

export async function likePost(postId: string) {
  const result = await callPostRequest("/likes", { postId: postId });
  if (result.status === 201) {
    return true;
  } else {
    return false;
  }
}

export async function likePostShare(postId: string) {
  const result = await callPostRequest("/likes/post-share", { postId: postId });
  if (result.status === 201) {
    return true;
  } else {
    return false;
  }
}

export async function commentPost(
  postId: string,
  accountId: string,
  contentComment: string,
) {
  const result = await callPostRequest("/comment", {
    accountId: accountId,
    postId: postId,
    contentCmt: contentComment,
  });
  if (result.status === 201) {
    return true;
  } else {
    return false;
  }
}

export async function commentSharePost(
  postId: string,
  accountId: string,
  contentComment: string,
) {
  const result = await callPostRequest("/comment/post-share", {
    accountId: accountId,
    postId: postId,
    contentCmt: contentComment,
  });
  if (result.status === 201) {
    return true;
  } else {
    return false;
  }
}

export async function getPostMyProfile(page?: number | 1) {
  const res = await callGetRequest(
    `/post/get-posts-account?pageNo=${page}&limit=2`,
    "",
    "no-store",
  );

  if (res.status === 200) {
    const data: {
      data: PostModel[];
      pagination: PaginationForResponse;
    } = res.response;

    const result: PostForCard[] = [];
    for (const post of data.data) {
      result.push({
        is_save: post.isSave,
        is_share: false,
        account: {
          id: post.account.id,
          name: post.account.fullName,
          nick_name: post.account.nickName,
          avata:
            post.account.avata &&
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${post.account.avata}`,
        },
        content_text: post.contentText,
        created_at: post.created_at,
        image_post: post.images.map(
          (item) => `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.path}`,
        ),
        is_like: post.is_liked,
        post_id: post.id,
        total_comment: post.totalComment,
        total_reaction: post.totalReaction,
        total_share: post.totalShare,
        comment_recent:
          post?.comment_recent?.map((item) => ({
            ...item,
            account: {
              avata:
                item.account.avata &&
                process.env.NEXT_PUBLIC_API_BASE_URL + item.account.avata,
              id: item.account.id,
              name: item.account.name,
              nick_name: item.account.nick_name,
            },
          })) ?? [],
        permission_post: post.permissionPost,
      });
    }
    return {
      data: result,
    };
  }
}

export async function getSharePostMySelf(page?: number | 1) {
  const res = await callGetRequest(
    `/postshare/myself?pageNo=${page}&limit=2`,
    "",
    "no-store",
  );

  if (res.status === 200) {
    const data: {
      data: PostModel[];
      pagination: PaginationForResponse;
    } = res.response;

    const result: PostForCard[] = [];
    for (const post of data.data) {
      result.push({
        is_save: post.isSave,
        is_share: true,
        account: {
          id: post.account.id,
          name: post.account.fullName,
          nick_name: post.account.nickName,
          avata:
            post.account.avata &&
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${post.account.avata}`,
        },
        content_text: post.contentText,
        created_at: post.created_at,
        is_like: post.is_liked,
        post_id: post.id,
        total_comment: post.totalComment,
        total_reaction: post.totalReaction,
        comment_recent:
          post?.comment_recent?.map((item) => ({
            ...item,
            account: {
              avata:
                item.account.avata &&
                process.env.NEXT_PUBLIC_API_BASE_URL + item.account.avata,
              id: item.account.id,
              name: item.account.name,
              nick_name: item.account.nick_name,
            },
          })) ?? [],
        permission_post: post.permissionPost,
        info_author_and_post: {
          author: {
            avata:
              post.infoAuthorAndPost?.author.avata &&
              process.env.NEXT_PUBLIC_API_BASE_URL +
                post.infoAuthorAndPost?.author.avata,
            id: post.infoAuthorAndPost?.author.id ?? "",
            name: post.infoAuthorAndPost?.author.fullName ?? "",
            nick_name: post.infoAuthorAndPost?.author.nickName ?? "",
          },
          postInf: {
            content_text: post.infoAuthorAndPost?.postInf.contentText ?? "",
            created_at: formatDate(
              post.infoAuthorAndPost?.postInf.created_at,
              "dd/mm/yyyy",
            ),
            id: post.infoAuthorAndPost?.postInf.id ?? "",
            images: post.infoAuthorAndPost?.postInf.images?.map(
              (img) =>
                img.path && process.env.NEXT_PUBLIC_API_BASE_URL + img.path,
            ),
          },
        },
      });
    }
    return {
      data: result,
    };
  }
}

export async function getPostOtherAccount(
  idAccount: string,
  page?: number | 1,
) {
  const res = await callGetRequest(
    `/post/get-posts-other-account/${idAccount}?pageNo=${page}&limit=2`,
    "",
    "no-cache",
  );
  if (res.status === 200) {
    const data: {
      data: PostModel[];
      pagination: PaginationForResponse;
    } = res.response;

    const result: PostForCard[] = [];
    for (const post of data.data) {
      result.push({
        is_save: post.isSave,
        is_share: false,
        account: {
          id: post.account.id,
          name: post.account.fullName,
          nick_name: post.account.nickName,
          avata:
            post.account.avata &&
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${post.account.avata}`,
        },
        content_text: post.contentText,
        created_at: post.created_at,
        image_post: post.images.map(
          (item) => `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.path}`,
        ),
        is_like: post.is_liked,
        post_id: post.id,
        total_comment: post.totalComment,
        total_reaction: post.totalReaction,
        total_share: post.totalShare,
        comment_recent:
          post?.comment_recent?.map((item) => ({
            ...item,
            account: {
              avata:
                item.account.avata &&
                process.env.NEXT_PUBLIC_API_BASE_URL + item.account.avata,
              id: item.account.id,
              name: item.account.name,
              nick_name: item.account.nick_name,
            },
          })) ?? [],
        permission_post: post.permissionPost,
      });
    }
    return {
      data: result,
    };
  }
}

export type DetailPostForResponse = {
  id: string;
  contentText: string;
  accountId: string;
  account: {
    avata?: string;
    id: string;
    email: string;
    fullName: string;
    nickName?: string;
    birth?: string;
    address?: string;
    aboutMe?: string;
    phone?: string;
  };
  created_at: string;
  updated_at: string;
  reactions: Array<{
    account: {
      avata?: string;
      id: string;
      fullName: string;
      nickName?: string;
    };
    created_at: string;
    updated_at: string;
  }>;
  comments: Array<{
    account: {
      avata?: string;
      id: string;
      fullName: string;
      nickName?: string;
    };
    contentCmt: string;
    created_at: string;
    updated_at: string;
  }>;

  permissionPost: {
    id: string;
    code: string;
    description: string;
  };
  images: Array<{
    accountId: string;
    postId: string;
    path: string;
  }>;
  totalComment: number;
  totalShare: number;
  totalReaction: number;
  is_liked: boolean;
  all_comment: Array<CommentForCard>;
  all_like_info: Array<{
    account: {
      avata?: string;
      id: string;
      name: string;
      nick_name?: string;
    };
    created_at: string;
    updated_at: string;
  }>;
};

export type PostDetailForCard = {
  post_id: string;
  content_text: string;
  created_at: string;
  total_reaction: number;
  total_comment: number;
  total_share: number;
  image_post: Array<string>;
  account: {
    id: string;
    name: string;
    nick_name: string;
    avata?: string;
  };
  is_like: boolean;
  all_comment: Array<{
    content: string;
    account: {
      avata?: string;
      id: string;
      name: string;
      nick_name?: string;
    };
    created_at: string;
    updated_at?: string;
  }>;
  all_like_info: Array<{
    account: {
      avata?: string;
      id: string;
      name: string;
      nick_name?: string;
    };
    created_at: string;
    updated_at: string;
  }>;
  permission_post: {
    id: string;
    description: string;
    code: string;
  };
};

export async function getDetailPost(
  idPost: string,
): Promise<PostDetailForCard | undefined> {
  try {
    const res = await callGetRequest(
      `/post/${idPost}`,
      "get-detail-post",
      "no-store",
    );
    if (res.status === 200) {
      const post: DetailPostForResponse = res.response;

      const result: PostDetailForCard = {
        account: {
          avata:
            post.account.avata &&
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${post.account.avata}`,
          id: post.account.id,
          name: post.account.fullName,
          nick_name: post.account.nickName ?? "",
        },
        all_comment:
          post.all_comment.map((item) => ({
            ...item,
            account: {
              avata:
                item.account.avata &&
                process.env.NEXT_PUBLIC_API_BASE_URL + item.account.avata,
              id: item.account.id,
              name: item.account.name,
              nick_name: item.account.nick_name,
            },
          })) ?? [],
        all_like_info: post.all_like_info,
        content_text: post.contentText,
        created_at: formatDate(post.created_at, "DD/MM/YYYY"),
        image_post: post.images.map(
          (item) => `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.path}`,
        ),
        is_like: post.is_liked,
        permission_post: post.permissionPost,
        post_id: post.id,
        total_comment: post.totalComment,
        total_reaction: post.totalReaction,
        total_share: post.totalShare,
      };
      return result;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function editPost(idPost: string, content: string) {
  const res = await callPutRequest("/post", {
    id: idPost,
    contentText: content,
  });

  const data: any = res.response;
  if (res.status === 200) {
    return data;
  }
}

export async function deletePost(idPost: string) {
  const res = await callDeleteRequest(`/post/${idPost}`);

  if (res.status === 200) {
    return true;
  }
  return false;
}

export async function sharePost(postId: string, content: string) {
  const res = await callPostRequest(`/postshare`, {
    content,
    postId,
  });

  // TODO: Check logic if necessary
  if (res.status === 201) {
    return true;
  }
  return false;
}

export type ReportRequest = {
  postId?: string;
  postShareId?: string;
  reason: string;
};

export async function reportPost(request: ReportRequest) {
  const res = await callPostRequest("/report", {
    reason: request.reason,
    postId: request.postId && request.postId,
    postShareId: request.postShareId && request.postShareId,
  });

  if (res.status === 201) {
    return true;
  }
  return false;
}

interface PostShareDetailForResponse {
  is_share: boolean;
  account: {
    id: string;
    fullName: string;
    phone?: string;
    aboutMe?: string;
    nickName?: string;
    birth?: string;
    address?: string;
    avata?: string;
  };
  accountId: string;
  contentText: string;
  created_at: string;
  id: string;
  is_liked: boolean;
  totalComment: number;
  totalReaction: number;
  updated_at: string;
  permissionPost: {
    id: string;
    description: string;
    code: string;
  };
  comments: Array<{
    account: {
      avata: string;
      id: string;
      name: string;
      nick_name: string;
    };
    content: string;
    created_at: string;
  }>;
  infoAuthorAndPost: {
    author: {
      avata: string;
      id: string;
      fullName: string;
      nickName: string;
      aboutMe: string;
      address: string;
      birth: string;
      phone: string;
    };
    postInf: {
      id: string;
      images: Array<{
        accountId: string;
        path: string;
        postId: string;
      }>;
      contentText: string;
      created_at: string;
      permissionPost: {
        id: string;
        code: string;
      };
    };
  };
}

export type PostShareDetailForCard = {
  is_share: boolean;
  account: {
    id: string;
    full_Name: string;
    phone?: string;
    about_me?: string;
    nick_name?: string;
    birth?: string;
    address?: string;
    avata?: string;
  };
  account_id: string;
  content_text: string;
  created_at: string;
  id: string;
  is_liked: boolean;
  total_comment: number;
  total_reaction: number;
  updated_at: string;
  permission_post: {
    id: string;
    description: string;
    code: string;
  };
  comments: Array<{
    account: {
      avata: string;
      id: string;
      name: string;
      nick_name: string;
    };
    content: string;
    created_at: string;
  }>;
  info_author_and_post: {
    author: {
      id: string;
      full_Name: string;
      phone?: string;
      about_me?: string;
      nick_name?: string;
      birth?: string;
      address?: string;
      avata?: string;
    };
    postInf: {
      id: string;
      images: Array<{
        account_id: string;
        path: string;
        postId: string;
      }>;
      permission_post: {
        id: string;
        code: string;
      };
      content_text: string;
      created_at: string;
    };
  };
};

export async function getDetailPostShare(
  idPostShare: string,
): Promise<PostShareDetailForCard | undefined> {
  try {
    const res = await callGetRequest(
      `/postshare/${idPostShare}`,
      "",
      "no-store",
    );
    const data: PostShareDetailForResponse = res.response;
    if (res.status === 200) {
      return {
        account: {
          full_Name: data.account.fullName,
          id: data.account.id,
          about_me: data.account.aboutMe,
          address: data.account.address,
          avata:
            data.account.avata &&
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${data.account.avata}`,
          birth: formatDate(data.account.birth, "DD/MM/YYYY"),
          nick_name: data.account.nickName,
        },
        account_id: data.accountId,
        comments: data.comments.map((item) => ({
          account: {
            avata:
              item.account.avata &&
              `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.account.avata}`,
            id: item.account.id,
            name: item.account.name,
            nick_name: item.account.nick_name,
          },
          content: item.content,
          created_at: formatDate(item.created_at, "DD/MM/YYYY"),
        })),
        content_text: data.contentText,
        created_at: formatDate(data.created_at, "DD/MM/YYYY"),
        id: data.id,
        info_author_and_post: {
          author: {
            full_Name: data.infoAuthorAndPost.author.fullName,
            id: data.infoAuthorAndPost.author.id,
            about_me: data.infoAuthorAndPost.author.aboutMe,
            address: data.infoAuthorAndPost.author.address,
            avata:
              data.infoAuthorAndPost.author.avata &&
              `${process.env.NEXT_PUBLIC_API_BASE_URL}${data.infoAuthorAndPost.author.avata}`,
            birth: formatDate(
              data.infoAuthorAndPost.author.birth,
              "DD/MM/YYYY",
            ),
            nick_name: data.infoAuthorAndPost.author.nickName,
            phone: data.infoAuthorAndPost.author.phone,
          },
          postInf: {
            content_text: data.infoAuthorAndPost.postInf.contentText,
            created_at: formatDate(
              data.infoAuthorAndPost.postInf.created_at,
              "DD/MM/YYYY",
            ),
            id: data.infoAuthorAndPost.postInf.id,
            images: data.infoAuthorAndPost.postInf.images.map((item) => ({
              account_id: item.accountId,
              path:
                item.path &&
                `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.path}`,
              postId: item.postId,
            })),
            permission_post: data.infoAuthorAndPost.postInf.permissionPost,
          },
        },
        is_liked: !!data.is_liked,
        is_share: !!data.is_share,
        permission_post: {
          code: data.permissionPost.code,
          description: data.permissionPost.description,
          id: data.permissionPost.id,
        },
        total_comment: data.totalComment,
        total_reaction: data.totalReaction,
        updated_at: formatDate(data.updated_at, "DD/MM/YYYY"),
      };
    }
  } catch (error) {
    console.error(error);
  }
}
