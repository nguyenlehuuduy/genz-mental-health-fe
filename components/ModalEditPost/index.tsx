"use client";

import { Input, Modal, Image as ImageAnt, Button } from "antd";
import React, { useState } from "react";
import AvatarAccount from "../Avata";
import { getTimeAgo } from "@/lib/utils";
import { PostForCard } from "@/service/postService";
import TextArea from "antd/es/input/TextArea";
import { editPostById } from "./action";

type PropsComponent = {
  showModal: () => void;
  infoBasePost: PostForCard;
  handleEditPost: (idPost: string, content: string) => void;
};

const ModalEditPost = (props: PropsComponent) => {
  const [contentText, setContentText] = useState<string>(
    props.infoBasePost?.content_text,
  );

  return (
    <Modal
      title="Chỉnh sửa bài đăng"
      open={true}
      style={{ top: 10, backgroundColor: "transparent" }}
      width={720}
      onCancel={props.showModal}
      footer={
        <Button
          onClick={() =>
            props.handleEditPost(props.infoBasePost.post_id, contentText)
          }
        >
          Lưu thay đổi
        </Button>
      }
      className="title-modal h-screen overflow-y-auto bg-white rounded-md"
    >
      <div className="w-full mb-2">
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
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-4">
        <TextArea
          value={contentText}
          onChange={(e) => setContentText(e.target.value)}
          rows={6}
          style={{
            border: "none",
          }}
          name="contentText"
          size="large"
          placeholder="Bạn muốn chia sẻ về vấn đề gì ?"
        />
        <div className="w-full h-[400px] flex mb-3 gap-3">
          <ImageAnt.PreviewGroup>
            {props.infoBasePost?.image_post && props.infoBasePost?.image_post.map((image, index) => (
              <div
                key={index}
                className={`relative flex justify-center items-center h-full w-full overflow-hidden`}
              >
                <ImageAnt
                  src={image}
                  style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </div>
            ))}
          </ImageAnt.PreviewGroup>
        </div>
      </div>
    </Modal>
  );
};

export default ModalEditPost;
