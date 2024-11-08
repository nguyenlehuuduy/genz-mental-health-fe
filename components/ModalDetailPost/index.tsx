"use client";

import { abbreviateNumber, formatDate, getTimeAgo } from "@/lib/utils";
import { Input, Modal, Button } from "antd";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import AvatarAccount from "../Avata";
import { SendIcon } from "../../icons";
import CommentItem from "../CommentItem";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/configureStore";
import { PostForCard } from "@/service/postService";
import { CommentForCard } from "@/service/commentService";
import { getAllCommentOfPost } from "./action";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "iconsax-react";
interface Props {
  id: string;
  showModal: () => void;
  isLike?: boolean;
  handleLikePost: () => void;
  totalLike: number;
  totalComment: number;
  commentContent: string;
  handleCommentChange: (content: string) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleCommentPost: () => void;
  infoBasePost: PostForCard;
  handleSaveContent: () => void;
  isSave: boolean;
}

async function getPostForModal(
  idPost: string,
): Promise<Array<CommentForCard> | undefined> {
  try {
    return await getAllCommentOfPost(idPost);
  } catch (error) {
    return;
  }
}

const SlickImagesSlide: React.FC<{ images: Array<string> }> = ({ images }) => {
  const [indexSelected, setIndexSelected] = useState<number>(0);
  const onHandleChangeImage = (arrow: "left" | "right") => {
    if (arrow === "right" && indexSelected < images.length - 1) {
      setIndexSelected(indexSelected + 1);
    }

    if (arrow === "left" && indexSelected > 0) {
      setIndexSelected(indexSelected - 1);
    }
  };
  return (
    <div className="w-full min-h-[400px] relative">
      <div className="w-full h-[500px] relative">
        <Image
          src={images[indexSelected]}
          alt="image reels post"
          width={500}
          height={500}
          className="absolute h-full w-auto object-contain inset-x-0 mx-auto"
        />
      </div>
      {indexSelected !== images.length - 1 && (
        <div
          className="absolute inset-y-0 my-auto right-[30px] w-[50px] h-[50px] border-2 border-blue-400 rounded-full flex items-center justify-center cursor-pointer"
          onClick={() => onHandleChangeImage("right")}
        >
          <ArrowRight color="#0E52B8" />
        </div>
      )}
      {indexSelected !== 0 && (
        <div
          className="absolute inset-y-0 my-auto left-[30px] w-[50px] h-[50px] border-2 border-blue-400 rounded-full flex items-center justify-center cursor-pointer"
          onClick={() => onHandleChangeImage("left")}
        >
          <ArrowLeft color="#0E52B8" />
        </div>
      )}
    </div>
  );
};

export default function ModalDetailPost(props: Props) {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const [listComment, setListComment] = useState<Array<CommentForCard>>();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getPostForModal(props.id).then((rs) => {
      if (rs) {
        setListComment(rs);
      }
    });
  }, [props]);

  useEffect(() => {
    if (contentRef.current) {
      const maxHeight =
        parseFloat(getComputedStyle(contentRef.current).lineHeight) * 5;
      setIsOverflowing(contentRef.current.scrollHeight > maxHeight);
    }
  }, []);

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const onHandleCommentPost = (e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (e) {
      props.handleKeyPress(e);
    }
    if (e?.key === "Enter") {
      listComment &&
        setListComment([
          {
            account: {
              avata: currentUser?.avata ?? "",
              id: currentUser?.id ?? "",
              name: currentUser?.full_name ?? "",
              nick_name: currentUser?.nick_name ?? "",
            },
            content: props.commentContent,
            created_at: formatDate(Date(), "DD-MM-YYYY"),
          },
          ...listComment,
        ]);
    }
  };

  return (
    <Modal
      open={true}
      style={{
        top: 10,
        right:30,
        backgroundColor: "transparent",
        maxWidth: 850,
        fontSize: 16,
      }}
      width={"80%"}
      onCancel={props.showModal}
      footer={null}
       className="title-modal h-screen overflow-y-auto bg-white rounded-md"
    >
      <div className="w-full my-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center min-w-[200px] gap-4 rounded-sm">
            <AvatarAccount
              filePath={props.infoBasePost?.account.avata}
              name={props.infoBasePost?.account.name ?? ""}
            />

            <div>
              <p className="font-bold">{props.infoBasePost?.account.name}</p>
              <span>{getTimeAgo(props.infoBasePost?.created_at ?? "")}</span>
            </div>
          </div>

          <div className="flex gap-2 justify-center">
            <Image
              onClick={props.handleSaveContent}
              className="cursor-pointer"
              src={`${props.isSave ? "icons-system/FillIcon/bookmark.svg" : "icons-system/GreySolidIcon/bookmark.svg"}`}
              width={20}
              height={20}
              alt="icon save post"
            />
            <Button onClick={() => router.push(`/new-feeds/${props.id}`)}>
              xem toàn màn hình
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-4">
        <span
          className={`whitespace-pre-wrap ${isExpanded ? "" : "max-h-[calc(1.5em*5)] overflow-hidden"}`}
          ref={contentRef}
          style={{ lineHeight: "1.5em" }}
        >
          {props.infoBasePost?.content_text}
        </span>
        {isOverflowing && (
          <button onClick={toggleReadMore} className="text-blue-500">
            {isExpanded ? "Ẩn bớt" : "Xem thêm"}
          </button>
        )}
        <div className="w-full flex mb-3 gap-3">
          <SlickImagesSlide images={props.infoBasePost?.image_post || []} />
        </div>

        <div className="flex items-center justify-evenly">
          <button
            onClick={props.handleLikePost}
            className="flex gap-2 items-center font-medium cursor-pointer"
          >
            {props.isLike ? (
              <Image
              src="icons-system/FillIcon/heart.svg"
              width={20}
              height={20}
              alt="icon save post"
            />
          ) : (
            <Image
              src="icons-system/GreySolidIcon/heart.svg"
              width={20}
              height={20}
              alt="icon save post"
            />
            )}
            <span className="opacity-70">
              {props.totalLike && abbreviateNumber(props.totalLike)} Thích
            </span>
          </button>
          <div className="flex gap-3 items-center font-medium cursor-pointer">
            <Image
              src="icons-system/GreySolidIcon/chat-alt.svg"
              width={20}
              height={20}
              alt="icon save post"
            />
            <span className="opacity-70">
              {listComment?.length && abbreviateNumber(props.totalComment)} Bình
              luận
            </span>
          </div>
          <div className="flex gap-3 items-center font-medium cursor-pointer">
            <Image
              src="icons-system/GreySolidIcon/share.svg"
              width={20}
              height={20}
              alt="icon save post"
            />
            {/* TODO: update share later */}
            <span className="opacity-70">0 Chia sẻ</span>
          </div>
        </div>
        <div className="flex flex-col mt-5">
          <div className="relative flex gap-6">
            <div className="relative w-[40px] h-[40px]">
              <AvatarAccount
                filePath={currentUser?.avata}
                name={currentUser?.full_name ?? " "}
              />
            </div>

            <Input
              type="text"
              value={props.commentContent}
              onChange={(e) => props.handleCommentChange(e.target.value)}
              onKeyDown={onHandleCommentPost}
              placeholder="Viết bình luận của bạn"
              className="h-[45px]"
            />
            <div
              onClick={() => onHandleCommentPost()}
              className="flex items-center cursor-pointer"
            >
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                <SendIcon />
              </div>
            </div>
          </div>

          <Link
            href={`/new-feeds/${props.infoBasePost.post_id}`}
            className="font-medium mt-8 hover:underline"
          >
            Tất cả bình luận
          </Link>
          <div className="flex flex-col pt-2">
            {listComment?.length ? (
              listComment.map((it, index) => (
                <CommentItem comment={it} key={index} />
              ))
            ) : (
              <p>Chưa có bình luận nào</p>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
