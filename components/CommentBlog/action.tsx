"use server";

import {
  BlogCommentForCreate,
  commentBlog,
  commentReplyBlog,
  CommentReplyForCreate,
} from "@/service/commentService";

export async function postCommentBlog(body: BlogCommentForCreate) {
  return await commentBlog(body);
}

export async function postCommentReplyBlog(body: CommentReplyForCreate) {
  return await commentReplyBlog(body);
}
