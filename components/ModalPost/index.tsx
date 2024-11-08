"use client";

import Image from "next/image";
import TextArea from "antd/es/input/TextArea";
import { Button, Input, Modal, Select } from "antd";
import { useFormState } from "react-dom";
import { ActionPostState, post } from "./action";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/configureStore";
import AvatarAccount from "../Avata";
import { PermissionPostForResponse } from "@/service/permissionPostService";
import { PERMISSION_POST } from "@/lib/constants";

interface Modal {
  isOpen: boolean;
  closeModal: () => void;
  listPermissionPost: Array<PermissionPostForResponse>;
}
const defaultData = {
  contentText: "",
  permisionPost: "",
};
const initialState: ActionPostState = {
  validate: defaultData,
  success: false,
};

const ModalPost = ({ isOpen, closeModal, listPermissionPost }: Modal) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [data, formAction] = useFormState(post, initialState);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [permisionPost, setPermisionPost] = useState<string>(
    listPermissionPost[0]?.id ?? "",
  );
  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const images: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!isValidImage(file)) {
        console.error("Invalid image file:", file.name);
        continue;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      try {
        const dataUrl: string = await new Promise((resolve, reject) => {
          reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target?.result && typeof e.target.result === "string") {
              resolve(e.target.result);
            } else {
              reject(new Error("Failed to read image data"));
            }
          };
          reader.onerror = reject;
        });

        images.push(dataUrl);
      } catch (error) {
        console.error("Error reading image:", file.name, error);
      }
    }
    setImages(images);
  };

  function isValidImage(file: File): boolean {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
    return allowedMimeTypes.includes(file.type);
  }

  useEffect(() => {
    setLoading(false);
    if (data.success) {
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const getIcon = (id: string) => {
    switch (id) {
      case PERMISSION_POST.PUBLIC:
        return (
          <Image
            src="/icons-system/FillIcon/globe-alt.svg"
            width={24}
            height={24}
            alt="icon image gallery"
            className="rounded-none cursor-pointer"
          />
        );
      case PERMISSION_POST.FOLLOW:
        return (
          <Image
            src="/icons-system/FillIcon/user-group.svg"
            width={24}
            height={24}
            alt="icon image gallery"
            className="rounded-none cursor-pointer"
          />
        );
      case PERMISSION_POST.PRIVATE:
        return (
          <Image
          src="/icons-system/FillIcon/user-circle.svg"
          width={24}
          height={24}
          alt="icon image gallery"
          className="rounded-none cursor-pointer"
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      open={isOpen}
      width={720}
      footer={null}
      onCancel={closeModal}
      destroyOnClose
    >
      <form
        action={formAction}
        className="flex flex-col"
        onSubmit={() => setLoading(true)}
      >
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-row gap-3 items-center">
            <div className="relative">
              <AvatarAccount
                filePath={user?.avata}
                name={user?.full_name ?? "D"}
                height={40}
                width={40}
              />
            </div>

            <p className="text-xl font-bold ">{user?.full_name}</p>
          </div>
          <TextArea
            autoSize={{ minRows: 3, maxRows: 5 }}
            style={{
              border: "none",
            }}
            name="contentText"
            size="large"
            placeholder="Bạn muốn chia sẻ về vấn đề gì ?"
          />
          <Select
            value={permisionPost}
            className="w-[187px] h-[39px] shadow-md rounded-md"
            variant="borderless"
            defaultValue="PUBLIC"
            onChange={(e) => setPermisionPost(e)}
            suffixIcon={null}
            options={listPermissionPost.map((item) => ({
              label: (
                <span className="flex flex-row items-center gap-2">
                  {getIcon(item.id)} {item.code}
                </span>
              ),
              value: item.id,
            }))}
          />
          <Input name="permission" className="hidden" value={permisionPost} />
        </div>
        <div className="w-full pb-4">
          <input
            id="upload_image_multi"
            className="hidden"
            name="image"
            type="file"
            onChange={onImageChange}
            multiple
            accept="image/png, image/gif, image/jpeg"
          />

          {images.length > 0 && (
            <div className="flex flex-wrap gap-3 items-center">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="w-[100px] h-[100px] rounded-md relative overflow-hidden"
                >
                  <Image
                    className="absolute w-full h-full object-contain"
                    width={500}
                    height={500}
                    src={image}
                    alt={`preview image ${index + 1}`}
                    key={index}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-row justify-between border-t pt-6 px-4">
          <div className="flex flex-row w-full gap-8 items-center">
            <label className="cursor-pointer" htmlFor="upload_image_multi">
              <Image
                src="/icons-system/GreySolidIcon/photograph.svg"
                width={24}
                height={24}
                alt="icon image gallery"
                className="rounded-none cursor-pointer"
              />
            </label>
            <Image
              src="/icons-system/GreySolidIcon/cash.svg"
              width={24}
              height={24}
              alt="icon video"
              className="rounded-none cursor-pointer"
            />
            <Image
              src="/icons-system/GreySolidIcon/paper-clip.svg"
              width={24}
              height={24}
              alt="icon attach"
              className="rounded-none cursor-pointer"
            />
            <Image
              src="/icons-system/GreySolidIcon/dots-vertical.svg"
              width={24}
              height={24}
              alt="icon attach"
              className="rounded-none cursor-pointer"
            />
          </div>
          <Button
            loading={loading}
            size="middle"
            htmlType="submit"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "none",
            }}
            className="text-white cursor-pointer w-full h-10 font-medium bg-[#0F52BA]"
          >
            Đăng bài
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalPost;
