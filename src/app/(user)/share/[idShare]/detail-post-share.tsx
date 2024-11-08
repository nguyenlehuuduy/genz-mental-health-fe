"use client";

import { PostShareDetailForCard } from "@/service/postService";
import { AvatarAccount, CommentItem } from "../../../../../components";
import { abbreviateNumber, formatDate, getTimeAgo } from "@/lib/utils";
import Image from "next/image";
import { Input, Image as ImageAnt, Button } from "antd";
import { SendIcon } from "../../../../../icons";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/configureStore";
import { useState } from "react";
import { PERMISSION_POST } from "@/lib/constants";
import { CommentForCard } from "@/service/commentService";
import {
  commentShare,
  likePostSharing,
} from "../../../../../components/PostCard/action";
import Link from "next/link";
import { ArrowSquareRight, BackSquare } from "iconsax-react";
import { useRouter } from "next/navigation";

type PropsComponent = {
  detailPost: PostShareDetailForCard;
};

export default function DetailPostSharePageView(props: PropsComponent) {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const [commentContent, setCommentContent] = useState<string>("");
  const [isLike, setIsLike] = useState<boolean>(props.detailPost.is_liked);
  const [totalLike, setTotalLike] = useState<number>(
    props.detailPost.total_reaction || 0,
  );
  const [totalComment, setTotalComment] = useState<number>(
    props.detailPost.total_comment ?? 0,
  );
  const [permissionPost, setPermissionPost] = useState<string>(
    props.detailPost.info_author_and_post.postInf.permission_post?.id ??
      PERMISSION_POST.PRIVATE,
  );

  const router = useRouter();

  const [allComment, setAllComment] = useState<Array<CommentForCard>>(
    props.detailPost.comments,
  );

  const RenderIconPermissionPost = () =>
    (permissionPost === PERMISSION_POST.PUBLIC && (
      <Image
      src="/icons-system/GreySolidIcon/globe-alt.svg"
      width={16}
      height={16}
      alt="icon image gallery"
      className="rounded-none cursor-pointer"
      />
    )) ||
    (permissionPost === PERMISSION_POST.FOLLOW && (
      <Image
      src="/icons-system/GreySolidIcon/mail.svg"
      width={16}
      height={16}
      alt="icon image gallery"
      className="rounded-none cursor-pointer"
      />
    )) ||
    (permissionPost === PERMISSION_POST.PRIVATE && (
      <Image
      src="/icons-system/GreySolidIcon/lock-closed.svg"
      width={16}
      height={16}
      alt="icon image gallery"
      className="rounded-none cursor-pointer"
      />
    ));

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentContent(e.target.value);
  };

  const handleLikePost = async (idPost: string) => {
    isLike ? setTotalLike(totalLike - 1) : setTotalLike(totalLike + 1);
    setIsLike(!isLike);
    await likePostSharing(idPost);
  };

  const handleCommentPost = async (idPost: string, commentContent: string) => {
    currentUser?.id &&
      (await commentShare(idPost, currentUser.id, commentContent));

    setTotalComment(totalComment + 1);
    setAllComment([
      {
        content: commentContent,
        account: {
          avata: currentUser?.avata ?? "",
          id: currentUser?.id ?? "",
          name: currentUser?.full_name ?? "",
          nick_name: currentUser?.nick_name ?? "",
        },
        created_at: formatDate(Date(), "DD-MM-YYYY"),
      },
      ...allComment,
    ]);
    setCommentContent("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommentPost(props.detailPost.id, commentContent);
    }
  };

  return (
    <div className="w-full flex justify-between">
      <div className="w-[70%] rounded-md bg-white h-[calc(100vh-70px)] overflow-y-auto p-3">
        <Button
          className="mb-3 items-center flex"
          icon={<BackSquare />}
          onClick={() => router.back()}
        >
          <p>Quay lại</p>
        </Button>
        <div className="flex flex-col gap-3 my-5">
          <div className="flex items-center min-w-[200px] gap-4 rounded-sm">
            <AvatarAccount
              filePath={props.detailPost?.account.avata}
              name={props.detailPost?.account.full_Name ?? ""}
            />

            <div>
              <Link
                href={`/profile/${props.detailPost.account.id}`}
                className="font-bold  hover:underline"
              >
                {props.detailPost?.account.full_Name}
              </Link>
              <div className="flex gap-3 items-center">
                <span>{getTimeAgo(props.detailPost?.created_at ?? "")}</span>

                <div className="flex gap-2 items-center">
                  <RenderIconPermissionPost />
                  <span>
                    {props.detailPost.permission_post.code ?? "riêng tư"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <span className="whitespace-pre-wrap">
            {props.detailPost?.content_text}
          </span>
        </div>
        <div className="w-[99%] m-auto border rounded-md p-2">
          <div className="mb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center min-w-[200px] gap-4 rounded-sm">
                <AvatarAccount
                  filePath={props.detailPost?.info_author_and_post.author.avata}
                  name={
                    props.detailPost?.info_author_and_post.author.full_Name ??
                    ""
                  }
                />

                <div>
                  <Link
                    href={`/profile/${props.detailPost.info_author_and_post.author.id}`}
                    className="font-bold  hover:underline"
                  >
                    {props.detailPost?.info_author_and_post.author.full_Name}
                  </Link>
                  <div className="flex gap-3 items-center">
                    <span>
                      {getTimeAgo(
                        props.detailPost?.info_author_and_post.postInf
                          .created_at ?? "",
                      )}
                    </span>

                    <div className="flex gap-2 items-center">
                      <RenderIconPermissionPost />
                      <span>
                        {props.detailPost.info_author_and_post.postInf
                          .permission_post.code ?? "riêng tư"}
                      </span>
                      <Button
                        className="flex items-center justify-center"
                        icon={<ArrowSquareRight />}
                        onClick={() =>
                          router.push(
                            `/new-feeds/${props.detailPost.info_author_and_post?.postInf.id}`,
                          )
                        }
                      >
                        Xem bài viết gốc
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 flex flex-col gap-4">
            <span className="whitespace-pre-wrap">
              {props.detailPost?.info_author_and_post.postInf.content_text}
            </span>
            <div className="w-full h-[400px] flex mb-3 gap-3">
              <ImageAnt.PreviewGroup>
                {props.detailPost?.info_author_and_post.postInf.images.map(
                  (image, index) => (
                    <div
                      key={index}
                      className={`relative flex justify-center items-center h-full w-full overflow-hidden`}
                    >
                      <ImageAnt
                        src={image.path}
                        style={{
                          width: "100%",
                          height: "400px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </div>
                  ),
                )}
              </ImageAnt.PreviewGroup>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-evenly mt-6">
          <button
            onClick={() => handleLikePost(props.detailPost.id)}
            className="flex gap-2 items-center font-medium cursor-pointer"
          >
            {isLike ? (
              <Image
                src="/loved_icon.svg"
                width={20}
                height={20}
                alt="icon save post"
              />
            ) : (
              <Image
                src="/love_icon.svg"
                width={20}
                height={20}
                alt="icon save post"
              />
            )}
            <span className="opacity-70">
              {totalLike && abbreviateNumber(totalLike)} Thích
            </span>
          </button>
          <div className="flex gap-3 items-center font-medium cursor-pointer">
            <Image
              src="/comment_icon.svg"
              width={20}
              height={20}
              alt="icon save post"
            />
            <span className="opacity-70">
              {totalComment && abbreviateNumber(totalComment)} Bình luận
            </span>
          </div>
          <div className="flex gap-3 items-center font-medium cursor-pointer">
            <Image
              src="/icons-system/GreySolidIcon/share.svg"
              width={20}
              height={20}
              alt="icon save post"
            />
            {/* TODO: update share later */}
            <span className="opacity-70">0 Chia sẻ</span>
          </div>
        </div>
      </div>

      <div className="w-[29%]  flex flex-col gap-3">
        <div className="flex flex-col h-[calc(100vh-130px)] overflow-y-auto p-3 rounded-md bg-white">
          {allComment.map((it, index) => (
            <CommentItem comment={it} key={index} />
          ))}
        </div>

        <div className="relative flex gap-4 ">
          <div className="relative w-[40px] h-[40px]">
            <AvatarAccount
              filePath={currentUser?.avata}
              name={currentUser?.full_name ?? " "}
            />
          </div>

          <Input
            type="text"
            value={commentContent}
            onChange={(e) => handleCommentChange(e)}
            onKeyDown={handleKeyPress}
            placeholder="Viết bình luận của bạn"
            className="h-[45px]"
          />
          <div
            onClick={() =>
              handleCommentPost(props.detailPost.id, commentContent)
            }
            className="flex items-center cursor-pointer"
          >
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
              <SendIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
