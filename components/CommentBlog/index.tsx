"use client";

import {
  BlogCommentForCreate,
  CommentReplyForCreate,
} from "@/service/commentService";
import { Button, Input } from "antd";
import { postCommentBlog, postCommentReplyBlog } from "./action";
import { GuestAccountType } from "@/lib/type";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/configureStore";
import { CommentBlogForCard, CommentReplyForCard } from "@/service/blogService";
import { formatDate } from "@/lib/utils";
import AvatarAccount from "../Avata";
import { MyselfForCard } from "@/service/accountService";

type PropsComponent = {
  blogId: string;
  accountGuestInfo: GuestAccountType;
  commentList: Array<CommentBlogForCard>;
};

export default function CommentForBlog(props: PropsComponent) {
  const [commentContent, setCommentContent] = useState<string>("");
  const user = useSelector((state: RootState) => state.auth.user);
  const [listComment, setListComment] = useState<Array<CommentBlogForCard>>(
    props.commentList,
  );
  const onHandleCommentBlog = async (body: BlogCommentForCreate) => {
    if (body.contentCmt) {
      const idCommentCreated = await postCommentBlog(body);
      if (idCommentCreated) {
        setListComment([
          {
            account: {
              avata: user ? user.avata : props.accountGuestInfo.avatar,
              full_name: user ? user.full_name : props.accountGuestInfo.name,
              id: user ? user.id : props.accountGuestInfo.id,
            },
            content_cmt: commentContent,
            created_at: formatDate(
              new Date().toISOString(),
              "DD/MM/YYYY HH:mm:ss",
            ),
            id: idCommentCreated,
          },
          ...listComment,
        ]);
        setCommentContent("");
      }
    }
  };

  const [listInputCommentReply, setListInputCommentReply] = useState<
    Array<string>
  >([]);

  const onHandleCommentReplyBlog = async (
    body: CommentReplyForCreate,
    nameTargetCommentAccount: string,
    idInputComment: string,
  ) => {
    if (body.contentReply) {
      const result = await postCommentReplyBlog(body);
      if (result) {
        const targetCommentReply = listComment.find(
          (item) => item.id === body.commentId,
        );

        if (targetCommentReply) {
          const newListComment = listComment.map((item) => {
            if (item.id === body.commentId) {
              return {
                ...item,
                comment_reply: [
                  {
                    account: {
                      avata: user ? user.avata : props.accountGuestInfo.avatar,
                      full_name: user
                        ? user.full_name
                        : props.accountGuestInfo.name,
                      id: user ? user.id : props.accountGuestInfo.id,
                    },
                    content_cmt: body.contentReply,
                    created_at: formatDate(
                      new Date().toISOString(),
                      "DD/MM/YYYY HH:mm:ss",
                    ),
                    id: "",
                    account_mention: {
                      avata: "",
                      full_name: nameTargetCommentAccount,
                      id: body.accountMentionId,
                    },
                  },
                  ...(targetCommentReply.comment_reply ?? []),
                ],
              };
            }
            return item;
          });

          setListComment(newListComment);
          setListInputCommentReply(
            listInputCommentReply.filter((it) => it != idInputComment),
          );
        }
      }
    }
  };

  const ReplyComponent: React.FC<{
    listInputCommentReply: Array<string>;
    mainComment?: CommentBlogForCard;
    targetAccountReply: CommentBlogForCard | CommentReplyForCard;
    account?: MyselfForCard;
    accountGuestInfo?: GuestAccountType;
    idInputComment: string;
  }> = ({
    listInputCommentReply,
    targetAccountReply,
    account,
    accountGuestInfo,
    idInputComment,
    mainComment,
  }) => {
    if (!listInputCommentReply.find((idInput) => idInput === idInputComment)) {
      return <Fragment></Fragment>;
    }

    return (
      <div className="flex items-center gap-2 border rounded-md p-2">
        <p className="bg-blue-500 flex-none p-1 rounded-md text-white">
          @{targetAccountReply.account.full_name}
        </p>

        <Input
          id={idInputComment}
          placeholder="Viết bình luận của bạn..."
          className="border-0 h-[40px]"
        />
        <Button
          onClick={() => {
            const content = document.getElementById(
              idInputComment,
            ) as HTMLInputElement;

            onHandleCommentReplyBlog(
              {
                accountId: account?.id || accountGuestInfo?.id || "",
                accountMentionId: targetAccountReply?.account?.id,
                commentId: mainComment
                  ? mainComment.id
                  : targetAccountReply?.id,
                contentReply:
                  content?.value ?? "Có lỗi xảy ra khi bình luận! Thử lại",
              },
              targetAccountReply?.account?.full_name,
              idInputComment,
            );
          }}
        >
          Trả lời
        </Button>
        <Button
          danger
          onClick={() =>
            setListInputCommentReply(
              listInputCommentReply.filter((it) => it != idInputComment),
            )
          }
        >
          Hủy
        </Button>
      </div>
    );
  };

  return (
    <div className="w-full min-h-[300px] mx-auto">
      <p className="font-medium text-2xl my-5">
        Bình luận
        {` (${
          listComment.length +
          listComment.reduce((i, j) => {
            return i + (j?.comment_reply ? j.comment_reply?.length : 0);
          }, 0)
        })`}
      </p>
      <div className="flex gap-2 items-center">
        <div>
          <AvatarAccount
            filePath={user ? user.avata : props?.accountGuestInfo?.avatar}
            name={
              user ? user?.full_name : props?.accountGuestInfo?.name ?? "MH"
            }
          />
        </div>

        <Input
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Viết bình luận của bạn..."
          className="h-[50px]"
        />
        <Button
          className="bg-[#0F52BA] text-white h-[50px] w-[100px] text-xl font-semibold"
          onClick={() =>
            onHandleCommentBlog({
              accountId: user?.id || props.accountGuestInfo.id,
              blogId: props.blogId,
              contentCmt: commentContent,
            })
          }
        >
          Gửi
        </Button>
      </div>
      <div className="w-full border-2 mt-5 p-5 overflow-y-auto over max-h-[600px] rounded-md">
        {listComment.map((item, index) => (
          <div className="flex gap-2 mt-5" key={index}>
            <div className="w-[50px] h-[50px] rounded-full flex-none">
              <AvatarAccount
                filePath={item.account.avata}
                name={item.account.full_name ?? "MH"}
              />
            </div>
            <div className="flex flex-col min-h-[40px] w-[90%]">
              <p className="font-medium">{item.account.full_name}</p>
              <span className="text-sm text-[#6D6E76]">{item.created_at}</span>
              <p className="mt-2">{item.content_cmt}</p>
              <a
                className="mt-2 font-medium cursor-pointer hover:underline"
                onClick={() => {
                  setListInputCommentReply([
                    ...listInputCommentReply,
                    `reply-input-${item.id}`,
                  ]);
                }}
              >
                Trả lời
              </a>
              <ReplyComponent
                listInputCommentReply={listInputCommentReply}
                targetAccountReply={item}
                account={user}
                accountGuestInfo={props.accountGuestInfo}
                idInputComment={`reply-input-${item.id}`}
              />
              <div>
                {item.comment_reply?.map((cmtReply, index) => (
                  <div className="mt-5 flex gap-2" key={index}>
                    <div className="w-[50px] h-[50px] rounded-full bg-blue-600 flex-none">
                      <AvatarAccount
                        filePath={cmtReply.account.avata}
                        name={cmtReply.account.full_name ?? "MH"}
                      />
                    </div>
                    <div className="flex flex-col min-h-[40px]">
                      <p className="font-medium">
                        {cmtReply.account.full_name}
                      </p>
                      <span className="text-sm text-[#6D6E76]">
                        {cmtReply.created_at}
                      </span>
                      <div className="flex items-center gap-1 mt-1">
                        <p className="bg-blue-400 flex-none p-1 rounded-md text-white">
                          @{cmtReply.account_mention?.full_name}
                        </p>
                        <p className="p-1">{cmtReply.content_cmt}</p>
                      </div>
                      <a
                        className="mt-2 font-medium cursor-pointer hover:underline"
                        onClick={() => {
                          setListInputCommentReply([
                            ...listInputCommentReply,
                            `reply-input-${item.id}-${cmtReply.id}`,
                          ]);
                        }}
                      >
                        Trả lời
                      </a>
                      <ReplyComponent
                        listInputCommentReply={listInputCommentReply}
                        targetAccountReply={cmtReply}
                        account={user}
                        accountGuestInfo={props.accountGuestInfo}
                        idInputComment={`reply-input-${item.id}-${cmtReply.id}`}
                        mainComment={item}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
