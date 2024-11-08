"use server";

import { formatDate, objectToQueryParams } from "@/lib/utils";
import {
  callGetRequest,
  callPatchRequest,
  callPostRequest,
} from "./apiService";
import { PaginationForResponse } from "../../type";

interface PostBlogForResponse {
  id: string;
  title: string;
  body: string;
  thumbnailBlog: string;
  cateBlog: Array<{
    id: string;
    title: string;
    thumbnailCateBlog: string;
  }>;
  account: {
    id: string;
    fullName: string;
    avata: string;
  };
  created_at: string;
}

export type PostBlogForCard = {
  id: string;
  title: string;
  body: string;
  thumbnail_blog: string;
  cate_blog?: Array<{
    id: string;
    title: string;
    thumbnail_cate_blog: string;
  }>;
  account: {
    id: string;
    full_Name: string;
    avata: string;
  };
  created_at: string;
};

export type BlogForQuery = {
  limit?: number;
  pageNo?: number;
  sortBy?: string;
  orderBy?: string;
  contentTextKey?: string;
  nameAccountKey?: string;
  emailAccountKey?: string;
  createdDateFrom?: string;
  createdDateTo?: string;
  cateBlogId?: string;
};

export async function getListPostBlog(query: BlogForQuery): Promise<
  | {
      data: PostBlogForCard[];
      pagination: PaginationForResponse;
    }
  | undefined
> {
  try {
    const res = await callGetRequest(`/blog?${objectToQueryParams(query)}`);
    if (res.status === 200) {
      const data: {
        data: PostBlogForResponse[];
        pagination: PaginationForResponse;
      } = res.response;
      const listPostBlog: PostBlogForCard[] = [];
      for (const item of data.data) {
        listPostBlog.push({
          id: item.id,
          title: item.title,
          body: item.body,
          thumbnail_blog:
            item.thumbnailBlog &&
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.thumbnailBlog}`,
          cate_blog: item.cateBlog.map((cate) => ({
            id: cate.id,
            title: cate.title,
            thumbnail_cate_blog: `${process.env.NEXT_PUBLIC_API_BASE_URL}${item?.thumbnailBlog}`,
          })),
          account: {
            id: item.account.id,
            full_Name: item.account.fullName,
            avata: item.account.avata,
          },
          created_at: formatDate(item.created_at, "DD/MM/YYYY HH:mm"),
        });
      }

      return {
        data: listPostBlog,
        pagination: data.pagination,
      };
    }
  } catch (error) {
    console.error(error);
  }
}

export type PostBlogDetailForCard = {
  id: string;
  title: string;
  body: string;
  thumbnail_blog: string;
  rating: number;
  views: number;
  comments: Array<CommentBlogForCard>;
  cate_blog: Array<{
    id: string;
    title: string;
    thumbnail_cate_blog: string;
  }>;
  account: {
    id: string;
    full_Name: string;
    avata: string;
  };
  created_at: string;
};

interface CateBlogForResponse {
  id: string;
  title: string;
  description: string;
  thumbnailCateBlog: string;
}

export type CateBlogForCard = {
  id: string;
  title: string;
  description: string;
  thumbnail_cate_blog: string;
};
export async function getListCateBlog(): Promise<
  Array<CateBlogForCard> | undefined
> {
  const res = await callGetRequest(`/category-blog`);
  if (res.status === 200) {
    const data: Array<CateBlogForResponse> = res.response;
    const listCateBlog: Array<CateBlogForCard> = [];
    for (const item of data) {
      listCateBlog.push({
        thumbnail_cate_blog: `${process.env.NEXT_PUBLIC_API_BASE_URL}${item?.thumbnailCateBlog}`,
        id: item.id,
        title: item.title,
        description: item.description,
      });
    }
    return listCateBlog;
  }
}

export async function getHotBlog(): Promise<PostBlogForCard | undefined> {
  try {
    const res = await callGetRequest(`/blog/hot-blog`);
    if (res.status === 200) {
      const blog: PostBlogForResponse = res.response;
      return {
        id: blog.id,
        title: blog.title,
        body: blog.body,
        thumbnail_blog: `${process.env.NEXT_PUBLIC_API_BASE_URL}${blog.thumbnailBlog}`,
        cate_blog:
          blog.cateBlog.map((item) => ({
            id: item?.id,
            title: item?.title,
            thumbnail_cate_blog: `${process.env.NEXT_PUBLIC_API_BASE_URL}${item?.thumbnailCateBlog}`,
          })) ?? [],
        account: {
          id: blog.account.id,
          full_Name: blog.account.fullName,
          avata:
            blog.account.avata &&
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${blog.account.avata}`,
        },
        created_at: formatDate(blog.created_at, "DD/MM/YYYY"),
      };
    }
  } catch (error) {
    console.error(error);
  }
}

interface CommentReplyForResponse {
  id: string;
  account: {
    id: string;
    fullName: string;
    avata: string;
  };
  contentCmt: string;
  accountMention: {
    id: string;
    fullName: string;
    avata: string;
  };
  created_at: string;
}

export type CommentReplyForCard = {
  id: string;
  account: {
    id: string;
    full_name: string;
    avata: string;
  };
  content_cmt: string;
  account_mention?: {
    id: string;
    full_name: string;
    avata: string;
  };
  created_at: string;
};

interface BlogForDetailResponse {
  id: string;
  title: string;
  body: string;
  thumbnailBlog: string;
  rating?: number;
  views?: number;
  cateBlog: Array<{
    id: string;
    title: string;
    description: string;
    thumbnailCateBlog: string;
  }>;
  account: {
    id: string;
    fullName: string;
    avata?: string;
  };
  comments?: Array<{
    id: string;
    contentCmt: string;
    account: {
      id: string;
      fullName: string;
      avata: string;
    };
    commentReply: Array<CommentReplyForResponse>;
    created_at: string;
  }>;
  created_at: string;
}

export type CommentBlogForCard = {
  id: string;
  content_cmt: string;
  created_at: string;
  comment_reply?: Array<CommentReplyForCard>;
  account: {
    id: string;
    full_name: string;
    avata: string;
  };
};

export async function getDetailBlogBySlug(slug: string): Promise<
  | {
      blog: PostBlogDetailForCard;
      related_blog: Array<PostBlogForCard>;
    }
  | undefined
> {
  try {
    const res = await callGetRequest(`/blog/${slug}`, "", "no-store");
    if (res.status === 200) {
      const {
        blog,
        relatedBlog,
      }: {
        blog: BlogForDetailResponse;
        relatedBlog: Array<PostBlogForResponse>;
      } = res.response;
      return {
        blog: {
          id: blog.id,
          title: blog.title,
          body: blog.body,
          thumbnail_blog: `${process.env.NEXT_PUBLIC_API_BASE_URL}${blog.thumbnailBlog}`,
          rating: blog.rating ?? 10,
          views: blog.views ?? 10,
          comments:
            blog.comments?.map((comment) => ({
              id: comment.id ?? "",
              content_cmt: comment.contentCmt,
              created_at: formatDate(comment.created_at, "DD/MM/YYYY HH:mm:ss"),
              account: {
                id: comment.account.id ?? "",
                full_name: comment.account.fullName,
                avata:
                  comment.account.avata &&
                  (comment.account.avata.includes("guest-image")
                    ? comment.account.avata
                    : `${process.env.NEXT_PUBLIC_API_BASE_URL}${comment.account.avata}`),
              },
              comment_reply:
                comment.commentReply.map((item) => ({
                  id: item.id ?? "",
                  account: {
                    id: item.account.id ?? "",
                    full_name: item.account.fullName,
                    avata:
                      item.account.avata &&
                      item.account.avata.includes("guest-image")
                        ? item.account.avata
                        : `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.account.avata}`,
                  },
                  content_cmt: item.contentCmt,
                  account_mention: {
                    id: item.account.id ?? "",
                    full_name: item.account.fullName,
                    avata:
                      item.account.avata &&
                      item.account.avata.includes("guest-image")
                        ? item.account.avata
                        : `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.account.avata}`,
                  },
                  created_at: formatDate(
                    item.created_at,
                    "DD/MM/YYYY HH:mm:ss",
                  ),
                })) ?? [],
            })) ?? [],
          cate_blog: blog.cateBlog.map((item) => ({
            id: item?.id,
            title: item?.title,
            thumbnail_cate_blog: `${process.env.NEXT_PUBLIC_API_BASE_URL}${item?.thumbnailCateBlog}`,
          })),
          account: {
            id: blog.account.id,
            full_Name: blog.account.fullName ?? "Quản trị viên",
            avata: `${blog.account.avata ? process.env.NEXT_PUBLIC_API_BASE_URL + blog.account.avata : ""}`,
          },
          created_at: formatDate(blog.created_at, "DD/MM/YYYY HH:mm:ss"),
        },
        related_blog: relatedBlog.map((item) => ({
          account: {
            id: item.account.id,
            full_Name: item.account.fullName ?? "Quản trị viên",
            avata:
              item.account.avata &&
              `${process.env.NEXT_PUBLIC_API_BASE_URL}${item.account.avata}`,
          },
          body: item.body,
          created_at: formatDate(item.created_at, "DD/MM/YYYY HH:mm:ss"),
          id: item.id,
          thumbnail_blog: `${process.env.NEXT_PUBLIC_API_BASE_URL}${item?.thumbnailBlog}`,
          title: item.title,
        })),
      };
    }
  } catch (error) {
    console.error(error);
  }
}

export async function blogWatcher(idBlog: string) {
  try {
    await callPatchRequest(`/blog/increment-view-count/${idBlog}`, {});
  } catch (error) {
    console.error(error);
  }
}
