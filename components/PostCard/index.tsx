"use client";

import { abbreviateNumber, formatDate, getTimeAgo } from "@/lib/utils";
import { PostForCard } from "@/service/postService";
import { Button, Input, Popover, notification } from "antd";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import CommentItem from "../CommentItem";
import { comment, commentShare, like, likePostSharing } from "./action";
import { SendIcon } from "../../icons";
import AvatarAccount from "../Avata";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/configureStore";
import { PERMISSION_POST, TYPE_ACTION_USER } from "@/lib/constants";
import ModalDetailPost from "../ModalDetailPost";
import Link from "next/link";
import PopupSettingPost from "../ModalSettingPost";
import ModalEditPost from "../ModalEditPost";
import { editPostById } from "../ModalEditPost/action";
import ModalSharePost from "../ModalSharePost";
import { PermissionPostForResponse } from "@/service/permissionPostService";
import { actionSharePost } from "../ModalSharePost/action";
import { useRouter } from "next/navigation";
import { ArrowSquareRight } from "iconsax-react";
import ModalReport from "../ModalReport";
import { createTarget } from "@/service/commonAction";
import ModalSaveContent from "../ModalSaveContent";
import ModalDeleteContentSave from "../ModalDeleteContentSave";
import LayoutPostReel from "../LayoutPostReel";
import ImageGrid from "../ImageGrid";

const PostCard = ({
  item,
  handleDeletePost,
  listPermissionPost,
}: {
  item: PostForCard;
  handleDeletePost: (idPost: string) => void;
  listPermissionPost: PermissionPostForResponse[];
}) => {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const [post, setPost] = useState<PostForCard>(item);
  const [commentContent, setCommentContent] = useState<string>("");
  //LIKE FOR POST AND SHARE POST
  const [isLike, setIsLike] = useState<boolean>(item.is_like);
  const [totalLike, setTotalLike] = useState<number>(item.total_reaction || 0);
  const [openDetailPost, setOpenDetailPost] = useState<boolean>(false);
  const [openEditPost, setOpenEditPost] = useState<boolean>(false);
  const [openSharePost, setOpenSharePost] = useState<boolean>(false);
  const [openReport, setOpenReport] = useState<boolean>(false);
  const [totalComment, setTotalComment] = useState<number>(
    item.total_comment ?? 0,
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExpandedShare, setIsExpandedShare] = useState(false);
  const [isOverflowingShare, setIsOverflowingShare] = useState(false);
  const contentShareRef = useRef<HTMLDivElement>(null);
  const [isSave, setIsSave] = useState<boolean>(item.is_save ?? false);
  const [showOptionSaveContent, setShowOptionSaveContent] =
    useState<boolean>(false);

  const [
    showModalConfirmDeleteSaveContent,
    setShowModalConfirmDeleteSaveContent,
  ] = useState<boolean>(false);

  useEffect(() => {
    if (contentRef.current) {
      const maxHeight =
        parseFloat(getComputedStyle(contentRef.current).lineHeight) * 5;
      setIsOverflowing(contentRef.current.scrollHeight > maxHeight);
    }
  }, []);

  useEffect(() => {
    if (contentShareRef.current) {
      const maxHeight =
        parseFloat(getComputedStyle(contentShareRef.current).lineHeight) * 5;
      setIsOverflowingShare(contentShareRef.current.scrollHeight > maxHeight);
    }
  }, []);

  const router = useRouter();
  const permissionPost = item.permission_post?.id ?? PERMISSION_POST.PRIVATE;

  const handleShowDetailPost = () => {
    setOpenDetailPost(!openDetailPost);
  };

  const handleOpenEditPost = () => {
    setOpenEditPost(!openEditPost);
  };

  const handleOpenSharePost = () => {
    setOpenSharePost(!openSharePost);
  };

  const handleOpenReport = () => {
    setOpenReport(!openReport);
  };

  const [recentComment, setRecentComment] = useState<
    Array<{
      account: {
        id: string;
        name: string;
        nick_name: string;
        avata: string;
      };
      created_at: string;
      content: string;
    }>
  >(item.comment_recent);

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

  //ACTION FOR POST AND POST SHARE
  const handleLikePost = async (idPost: string) => {
    isLike ? setTotalLike(totalLike - 1) : setTotalLike(totalLike + 1);
    setIsLike(!isLike);
    if (item.is_share) {
      await likePostSharing(idPost);
      await createTarget({
        accountId: currentUser?.id ?? "",
        actionUserId: TYPE_ACTION_USER.LIKE_POST,
        content: `Bạn đã thích bài viết chia sẻ của ${currentUser?.id === item.account.id ? "chính mình" : item.account.name}`,
        postId: item.post_id,
      });
    } else {
      await like(idPost);
      await createTarget({
        accountId: currentUser?.id ?? "",
        actionUserId: TYPE_ACTION_USER.LIKE_POST,
        content: `Bạn đã thích bài viết của ${currentUser?.id === item.account.id ? "chính mình" : item.account.name}`,
        postId: item.post_id,
      });
    }
  };

  //ACTION FOR POST AND POST SHARE
  const handleCommentPost = async (idPost: string, commentContent: string) => {
    if (item.is_share) {
      currentUser?.id &&
        (await commentShare(idPost, currentUser.id, commentContent));
      await createTarget({
        accountId: currentUser?.id ?? "",
        actionUserId: TYPE_ACTION_USER.COMMENT_POST,
        content: `Bạn đã bình luận bài viết chia sẻ của ${currentUser?.id === item.account.id ? "chính mình" : item.account.name} 
        \n ${commentContent}`,
        postId: item.post_id,
      });
    } else {
      currentUser?.id &&
        (await comment(idPost, currentUser.id, commentContent));
      await createTarget({
        accountId: currentUser?.id ?? "",
        actionUserId: TYPE_ACTION_USER.COMMENT_POST,
        content: `Bạn đã bình luận bài viết của ${currentUser?.id === item.account.id ? "chính mình" : item.account.name} 
          \n ${commentContent}`,
        postId: item.post_id,
      });
    }
    setTotalComment(totalComment + 1);
    setRecentComment([
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
      ...recentComment,
    ]);
    setCommentContent("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommentPost(item.post_id, commentContent);
    }
  };

  const handleEditPost = async (idPost: string, contentText: string) => {
    const res = await editPostById(idPost, contentText);
    setPost((prev) => ({
      ...prev,
      content_text: res?.contentText,
    }));
    setOpenEditPost(false);
  };

  const [api, contextHolder] = notification.useNotification();

  const openSuccess = () => {
    api.success({
      message: "Đã chia sẻ về trang cá nhân",
      description: "",
    });
  };

  const openFail = () => {
    api.error({
      message: "Chia sẻ thất bại",
      description: "",
    });
  };

  const openReportSuccess = () => {
    api.success({
      message: "Đã gửi báo cáo",
      description: "",
    });
  };

  const openReportFail = () => {
    api.error({
      message: "Gửi báo cáo thất bại",
      description: "",
    });
  };

  const handleSharePost = async (postId: string, content: string) => {
    const res = await actionSharePost(postId, content);
    if (res) {
      await createTarget({
        accountId: currentUser?.id ?? "",
        actionUserId: TYPE_ACTION_USER.SHARE_POST,
        content: `Bạn đã chia sẻ bài viết của ${currentUser?.id === item.account.id ? "chính mình" : item.account.name}`,
        postId: item.post_id,
      });
      openSuccess();
      setOpenSharePost(false);
    } else {
      openFail();
    }
  };

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleReadMoreShare = () => {
    setIsExpandedShare(!isExpandedShare);
  };

  const handleSaveContent = () => {
    if (!isSave) {
      setShowOptionSaveContent(true);
      return;
    }
    setShowModalConfirmDeleteSaveContent(true);
  };

  return (
    <div className="flex justify-center pb-3">
    <div className="w-[850px] bg-white rounded-md p-3 mb-2">
      {contextHolder}
      {showModalConfirmDeleteSaveContent && (
        <ModalDeleteContentSave
          idSaveContent={item.post_id}
          showModal={setShowModalConfirmDeleteSaveContent}
          visible={showModalConfirmDeleteSaveContent}
          setIsSave={setIsSave}
        />
      )}
      {showOptionSaveContent && (
        <ModalSaveContent
          setIsSave={setIsSave}
          idContent={item.post_id}
          typeContent={`${item.is_share ? "postShare" : "post"}`}
          showModal={setShowOptionSaveContent}
          visible={showOptionSaveContent}
        />
      )}
      {openDetailPost && (
        <ModalDetailPost
          infoBasePost={post}
          id={post.post_id}
          showModal={handleShowDetailPost}
          commentContent={commentContent}
          isLike={isLike}
          handleLikePost={() => handleLikePost(item.post_id)}
          handleCommentChange={(e) => setCommentContent(e)}
          handleCommentPost={() =>
            handleCommentPost(item.post_id, commentContent)
          }
          handleSaveContent={() => handleSaveContent}
          handleKeyPress={(e) => handleKeyPress(e)}
          totalComment={totalComment}
          totalLike={totalLike}
          isSave={isSave}
        />
      )}
      {openEditPost && (
        <ModalEditPost
          handleEditPost={handleEditPost}
          showModal={handleOpenEditPost}
          infoBasePost={post}
        />
      )}
      {openSharePost && (
        <ModalSharePost
          showModal={handleOpenSharePost}
          infoBasePost={item}
          listPermissionPost={listPermissionPost}
          handleSharePost={handleSharePost}
        />
      )}
      {openReport && (
        <ModalReport
          showModal={handleOpenReport}
          postId={!post.is_share ? post.post_id : undefined}
          postShareId={post.is_share ? post.post_id : undefined}
          openReportSuccess={openReportSuccess}
          openReportFail={openReportFail}
        />
      )}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center min-w-[200px] gap-4 rounded-sm">
            <AvatarAccount
              filePath={post.account.avata}
              name={post.account.name}
            />

            <div>
              <Link
                href={`/profile/${post.account.id}`}
                className="font-bold  hover:underline"
              >
                {post.account.name}
              </Link>
              <div className="flex gap-3 items-center">
                <span>{getTimeAgo(item.created_at)}</span>
                <div className="flex gap-2 items-center">
                  <RenderIconPermissionPost />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Image
              onClick={handleSaveContent}
              className="cursor-pointer"
              src={`${isSave ? "/icons-system/FillIcon/bookmark1.svg" : "/icons-system/GreySolidIcon/bookmark.svg"}`}
              width={20}
              height={20}
              alt="icon save post"
            />
            <Popover
              placement="rightTop"
              content={
                <PopupSettingPost
                  idUserPost={post.account.id}
                  handleOpenEditPost={handleOpenEditPost}
                  handleOpenReport={handleOpenReport}
                  idPost={post.post_id}
                  handleDeletePost={handleDeletePost}
                />
              }
              trigger="click"
            >
              <Image
                className="cursor-pointer"
                src="/icons-system/GreySolidIcon/dots-horizontal.svg"
                width={20}
                height={20}
                alt="icon save post"
              />
            </Popover>

            <Image
              src="/icons-system/GreySolidIcon/x.svg"
              width={20}
              height={20}
              alt="icon save post"
            />
          </div>
        </div>
        {item.is_share && (
          <div className="flex flex-col">
            <span
              className={`whitespace-pre-wrap ${isExpandedShare ? "" : "max-h-[calc(1.5em*5)] overflow-hidden"}`}
              ref={contentShareRef}
              style={{ lineHeight: "1.5em" }}
            >
              {item.content_text}
            </span>
          </div>
        )}
        {isOverflowingShare && (
          <button onClick={toggleReadMoreShare} className="text-blue-500">
            {isExpanded ? "Ẩn bớt" : "Xem thêm"}
          </button>
        )}
      </div>
      {item.is_share ? (
        <div className="mt-3 flex flex-col gap-4 p-4 rounded-md border">
          <div className="flex items-center justify-between">
            <div className="flex items-center min-w-[200px] gap-4 rounded-sm">
              <AvatarAccount
                filePath={item.info_author_and_post?.author.avata}
                name={item.info_author_and_post?.author.name ?? "D"}
              />

              <div>
                <Link
                  href={`/profile/${item.info_author_and_post?.author.id}`}
                  className="font-bold  hover:underline"
                >
                  {item.info_author_and_post?.author.name}
                </Link>
                <div className="flex gap-3 items-center">
                  <span>
                    {getTimeAgo(
                      item.info_author_and_post?.postInf.created_at ?? "",
                    )}
                  </span>
                  <div className="flex gap-2 items-center">
                    <Button
                      className="flex items-center justify-center"
                      icon={<ArrowSquareRight />}
                      onClick={() =>
                        router.push(
                          `/new-feeds/${item.info_author_and_post?.postInf.id}`,
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
          <div className="mt-3 flex flex-col gap-4">
            <span
              className={`whitespace-pre-wrap ${isExpanded ? "" : "max-h-[calc(1.5em*5)] overflow-hidden"}`}
              ref={contentRef}
              style={{ lineHeight: "1.5em" }}
            >
              {item.info_author_and_post?.postInf.content_text}
            </span>
            {isOverflowing && (
              <button onClick={toggleReadMore} className="text-blue-500">
                {isExpanded ? "Ẩn bớt" : "Xem thêm"}
              </button>
            )}
            <div
              className="w-full mb-3 grid gap-2"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              }}
            >
              {item.info_author_and_post?.postInf.images && (
                <LayoutPostReel
                  handleShowDetailPost={() => {
                    router.push(
                      `/new-feeds/${item.info_author_and_post?.postInf.id}`,
                    );
                  }}
                  images={item.info_author_and_post?.postInf.images ?? []}
                />
              )}
            </div>
          </div>

          <div className="flex items-center justify-evenly">
            <button
              onClick={() => handleLikePost(item.post_id)}
              className="flex gap-2 items-center font-medium cursor-pointer"
            >
              {isLike ? (
                <Image
                  src="/icons-system/FillIcon/heart.svg"
                  width={20}
                  height={20}
                  alt="icon save post"
                />
              ) : (
                <Image
                  src="/icons-system/GreySolidIcon/heart.svg"
                  width={20}
                  height={20}
                  alt="icon save post"
                />
              )}
              <span className="opacity-70">
                {totalLike && abbreviateNumber(totalLike)} Thích
              </span>
            </button>
            <div className="flex gap-3 items-center font-medium">
              <Image
                src="/icons-system/GreySolidIcon/lock-closed.svg"
                width={20}
                height={20}
                alt="icon save post"
              />
              <span className="opacity-70">
                {totalComment && abbreviateNumber(totalComment)} Bình luận trên
                bài chia sẻ
              </span>
            </div>
          </div>
          <Button onClick={() => router.push(`/share/${item.post_id}`)}>
            Xem chi tiết bài chia sẻ
          </Button>

          <div className="flex flex-col mt-5">
            <div className="relative flex gap-4 ">
              <div className="relative w-[40px] h-[40px]">
                <AvatarAccount
                  filePath={currentUser?.avata}
                  name={currentUser?.full_name ?? "D"}
                />
              </div>

              <Input
                type="text"
                value={commentContent}
                onChange={handleCommentChange}
                onKeyDown={handleKeyPress}
                placeholder="Viết bình luận của bạn"
                className="h-[45px]"
              />
              <div
                onClick={() => handleCommentPost(item.post_id, commentContent)}
                className="flex items-center cursor-pointer"
              >
                <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                  <SendIcon />
                </div>
              </div>
            </div>
            <Link
              href={`/new-feeds/${post.post_id}`}
              className="font-medium my-5 hover:underline"
            >
              Tất cả bình luận
            </Link>

            {recentComment.length ? (
              recentComment.map((it, index) => (
                <CommentItem comment={it} key={index} />
              ))
            ) : (
              <p>Chưa có bình luận nào</p>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-3 flex flex-col gap-4">
          <span
            className={`whitespace-pre-wrap ${isExpanded ? "" : "max-h-[calc(1.5em*5)] overflow-hidden"}`}
            ref={contentRef}
            style={{ lineHeight: "1.5em" }}
          >
            {post.content_text}
          </span>
          {isOverflowing && (
            <button onClick={toggleReadMore} className="text-blue-500">
              {isExpanded ? "Ẩn bớt" : "Xem thêm"}
            </button>
          )}

          <LayoutPostReel
            images={post.image_post ?? []}
            handleShowDetailPost={handleShowDetailPost}
          />

          <div className="flex items-center justify-evenly">
            <button
              onClick={() => handleLikePost(item.post_id)}
              className="flex gap-2 items-center font-medium cursor-pointer"
            >
              {isLike ? (
                <Image
                  src="/icons-system/FillIcon/heart.svg"
                  width={20}
                  height={20}
                  alt="icon save post"
                />
              ) : (
                <Image
                  src="/icons-system/GreySolidIcon/heart.svg"
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
                src="/icons-system/GreySolidIcon/chat-alt.svg"
                width={20}
                height={20}
                alt="icon save post"
              />
              <span className="opacity-70">
                {totalComment && abbreviateNumber(totalComment)} Bình luận
              </span>
            </div>
            <div
              onClick={() => handleOpenSharePost()}
              className="flex gap-3 items-center font-medium cursor-pointer"
            >
              <Image
                src="/icons-system/GreySolidIcon/share.svg"
                width={20}
                height={20}
                alt="icon save post"
              />
              <span className="opacity-70">
                {post.total_share ? abbreviateNumber(post.total_share) : 0} Chia
                sẻ
              </span>
            </div>
          </div>
          <div className="flex flex-col mt-5">
            <div className="relative flex gap-4 ">
              <div className="relative w-[40px] h-[40px]">
                <AvatarAccount
                  filePath={currentUser?.avata}
                  name={currentUser?.full_name ?? "D"}
                />
              </div>

              <Input
                type="text"
                value={commentContent}
                onChange={handleCommentChange}
                onKeyDown={handleKeyPress}
                placeholder="Viết bình luận của bạn"
                className="h-[45px]"
              />
              <div
                onClick={() => handleCommentPost(item.post_id, commentContent)}
                className="flex items-center cursor-pointer"
              >
                <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                  <SendIcon />
                </div>
              </div>
            </div>
            <Link
              href={`/new-feeds/${post.post_id}`}
              className="font-medium my-5 cursor-pointer hover:underline"
            >
              Tất cả bình luận
            </Link>
            {recentComment.length ? (
              recentComment.map((it, index) => (
                <CommentItem comment={it} key={index} />
              ))
            ) : (
              <p>Chưa có bình luận nào</p>
            )}
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default PostCard;
