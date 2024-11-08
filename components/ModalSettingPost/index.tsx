"use client";
import React from "react";
import { IconAccount, IconPolicy, IconPrivate } from "../../icons";
import { notification } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/configureStore";
import Image from "next/image";

type PropsComponent = {
  idUserPost: string;
  idPost: string;
  handleOpenEditPost: () => void;
  handleOpenReport: () => void;
  handleDeletePost: (postId: string) => void;
};

export default function PopupSettingPost({
  idUserPost,
  idPost,
  handleOpenEditPost,
  handleOpenReport,
  handleDeletePost,
}: PropsComponent) {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.success({
      message: "Đã sao chép liên kết",
      description: "",
    });
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/new-feeds/${idPost}`,
    );
  };

  const currentUser = useSelector((state: RootState) => state.auth.user);
  return (
    <div className="flex flex-col">
      {contextHolder}
      <div className="text-base font-semibold">Tác vụ</div>
      <div className="flex flex-row">
        <div className="px-2 py-2">
          <div
            onClick={() => {
              copyUrl();
              openNotification();
            }}
            className="flex flex-row py-2 cursor-pointer"
          >
            <Image
              src="icons-system/GreySolidIcon/link.svg"
              width={24}
              height={24}
              alt="icon copy"
              className="rounded-none cursor-pointer"
            />
            <span className="px-4">Sao chép liên kết</span>
          </div>
          <div
            onClick={() => {
              handleOpenReport();
            }}
            className="flex flex-row py-2 cursor-pointer"
          >
            <Image
              src="icons-system/GreySolidIcon/document-report.svg"
              width={24}
              height={24}
              alt="icon copy"
              className="rounded-none cursor-pointer"
            />
            <span className="px-4">Báo cáo vi phạm</span>
          </div>
        </div>
      </div>

      {idUserPost === currentUser?.id && (
        <>
          <div className="text-base font-semibold">Quyền người sở hữu</div>
          <div className="px-2 py-2">
            <div
              onClick={handleOpenEditPost}
              className="flex flex-row py-2 cursor-pointer"
            >
              <Image
                src="icons-system/GreySolidIcon/pencil-alt.svg"
                width={24}
                height={24}
                alt="icon copy"
                className="rounded-none cursor-pointer"
              />
              <span className="px-4">Chỉnh sửa bài viết</span>
            </div>
            <div className="flex flex-row py-2">
              <Image
                src="icons-system/GreySolidIcon/pencil.svg"
                width={24}
                height={24}
                alt="icon copy"
                className="rounded-none cursor-pointer"
              />
              <span className="px-4">Chỉnh sửa quyền xem</span>
            </div>
            <div
              onClick={() => handleDeletePost(idPost)}
              className="flex flex-row py-2 cursor-pointer"
            >
              <Image
                src="icons-system/GreySolidIcon/x.svg"
                width={24}
                height={24}
                alt="icon copy"
                className="rounded-none cursor-pointer"
              />
              <span className="px-4">Xóa bài viết này</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
