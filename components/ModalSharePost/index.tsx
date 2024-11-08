"use client";

import { Modal, Button, Select } from "antd";
import AvatarAccount from "../Avata";
import { getTimeAgo } from "@/lib/utils";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { PostForCard } from "@/service/postService";
import Image from "next/image";
import Link from "next/link";
import { PermissionPostForResponse } from "@/service/permissionPostService";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/configureStore";
import { PERMISSION_POST } from "@/lib/constants";
import { OnlyMeIcon, PeopleIcon, WorldIcon } from "../../icons";

type PropsComponent = {
  showModal: () => void;
  infoBasePost: PostForCard;
  listPermissionPost: PermissionPostForResponse[];
  handleSharePost: (postId: string, content: string) => void;
};

const ModalSharePost = (props: PropsComponent) => {
  const [contentText, setContentText] = useState<string>("");
  const [permisionPost, setPermisionPost] = useState<string>(
    props.listPermissionPost[0]?.id ?? "",
  );

  const currentUser = useSelector((state: RootState) => state.auth.user);

  const getIcon = (id: string) => {
    switch (id) {
      case PERMISSION_POST.PUBLIC:
        return <WorldIcon width={18} height={18} />;
      case PERMISSION_POST.FOLLOW:
        return <PeopleIcon width={18} height={18} />;
      case PERMISSION_POST.PRIVATE:
        return <OnlyMeIcon width={18} height={18} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Modal
        title="Chia sẻ bài viết"
        open={true}
        style={{ top: 10, backgroundColor: "transparent" }}
        width={720}
        onCancel={props.showModal}
        footer={
          <div className="flex flex-row justify-between items-center">
            <Select
              value={permisionPost}
              className="w-[200px]"
              defaultValue="PUBLIC"
              onChange={(e) => setPermisionPost(e)}
              options={props.listPermissionPost.map((item) => ({
                label: (
                  <span className="flex flex-row items-center gap-2">
                    {getIcon(item.id)} {item.code}
                  </span>
                ),
                value: item.id,
              }))}
            />
            <Button
              onClick={() =>
                props.handleSharePost(props.infoBasePost.post_id, contentText)
              }
            >
              Chia sẻ
            </Button>
          </div>
        }
        className="title-modal h-screen overflow-y-auto bg-white rounded-md"
      >
        <div className="w-full mb-2">
          <div className="flex flex-col gap-6">
            <div className="flex items-center min-w-[200px] gap-4 rounded-sm">
              <AvatarAccount
                filePath={currentUser?.avata}
                name={currentUser?.full_name ?? ""}
              />

              <div>
                <p className="font-bold">{currentUser?.full_name}</p>
              </div>
            </div>
            <TextArea
              value={contentText}
              onChange={(e) => setContentText(e.target.value)}
              rows={1}
              style={{
                border: "none",
              }}
              name="contentText"
              size="large"
              placeholder="Bạn muốn chia sẻ về vấn đề gì ?"
            />
          </div>
        </div>
        <div className="mt-3 flex flex-col gap-4 p-4 rounded-md border">
          <div className="flex items-center justify-between">
            <div className="flex items-center min-w-[200px] gap-4 rounded-sm">
              <AvatarAccount
                filePath={props.infoBasePost.account.avata}
                name={props.infoBasePost.account.name}
              />

              <div>
                <Link
                  href={`/profile/${props.infoBasePost.account.id}`}
                  className="font-bold  hover:underline"
                >
                  {props.infoBasePost.account.name}
                </Link>
                <div className="flex gap-3 items-center">
                  <span>{getTimeAgo(props.infoBasePost.created_at)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 flex flex-col gap-4">
            <span className="whitespace-pre-wrap">
              {props.infoBasePost.content_text}
            </span>
            <div className={`w-full flex mb-3 flex-wrap justify-evenly`}>
              {props.infoBasePost.image_post &&
                props.infoBasePost.image_post.map((image, index) => (
                  <div
                    key={index}
                    className={`relative min-h-[500px] mb-2 -pb-[80px] ${
                      (props.infoBasePost.image_post &&
                        props.infoBasePost.image_post.length === 1 &&
                        "w-full") ||
                      (props.infoBasePost.image_post &&
                        props.infoBasePost.image_post.length === 2 &&
                        "w-[48%]") ||
                      (props.infoBasePost.image_post &&
                        props.infoBasePost.image_post.length === 3 &&
                        "w-[30%]") ||
                      (props.infoBasePost.image_post &&
                        props.infoBasePost.image_post.length === 4 &&
                        "w-[48%]")
                    } rounded-md overflow-hidden`}
                  >
                    <Image
                      key={index}
                      src={image}
                      fill
                      quality={100}
                      alt="avata"
                      className="absolute w-full object-cover"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalSharePost;
