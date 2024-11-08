"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import ModalPost from "../ModalPost";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/configureStore";
import AvatarAccount from "../Avata";
import { PermissionPostForResponse } from "@/service/permissionPostService";

type PropsComponent = {
  listPermissionPost: Array<PermissionPostForResponse>;
};

const PostFeature = (props: PropsComponent) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-center pb-3">
    <div className="w-[850px] p-4 rounded-sm bg-white">
      <div className="flex gap-2 items-start justify-between">
        <div className="relative w-[40px] h-[40px]">
          <AvatarAccount filePath={user?.avata} name={user?.full_name ?? "D"} />
        </div>

        <div className="flex flex-col gap-3 justify-between w-[90%]">
          <Input
            variant="borderless"
            size="large"
            placeholder={"Bạn đang nghĩ gì vậy?"}
            className="bg-gray-100"
            onClick={() => setIsOpen(true)}
          />

          <div className="flex flex-row flex-grow items-center justify-between py-2 space-x-3">
            <div className="flex gap-4" onClick={() => setIsOpen(true)}>
              <Image
                src="icons-system/GreySolidIcon/photograph.svg"
                width={24}
                height={24}
                alt="icon image gallery"
                className="rounded-none cursor-pointer"
              />
              <Image
                src="icons-system/GreySolidIcon/cash.svg"
                width={24}
                height={24}
                alt="icon video"
                className="rounded-none cursor-pointer"
              />
              <Image
                src="icons-system/GreySolidIcon/paper-clip.svg"
                width={24}
                height={24}
                alt="icon attach"
                className="rounded-none cursor-pointer"
              />
            </div>
            <Button
              size="middle"
              htmlType="submit"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 120,
                height: 34,
              }}
              className="text-white bg-[#0F52BA] text-base leading-6 cursor-pointer font-medium"
            >
              Đăng
            </Button>
          </div>
        </div>
      </div>
      {isOpen && (
        <ModalPost
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          listPermissionPost={props.listPermissionPost}
        />
      )}
    </div>
    </div>
  );
};

export default PostFeature;
