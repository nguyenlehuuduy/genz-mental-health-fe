"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "antd";
import FormLogin from "../FormLogin";
import FormRegister from "../FormRegister";
import { useRouter } from "next/navigation";
type Props = {
  sessionKey?: string;
};
export default function HeaderLanding(props: Props) {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const router = useRouter();

  const openLogin = () => {
    setIsOpenLogin(true);
    setIsOpenRegister(false);
  };

  const openRegister = () => {
    setIsOpenRegister(true);
    setIsOpenLogin(false);
  };
  const handleAboutUsClick = () => {
    router.push("/aboutus");
  };
  const handleLandingPageClick = () => {
    router.push("/landingpage");
  };

  return (
    <div className="w-full flex items-center justify-evenly p-2">
      <div className="flex relative aspect-video">
        <Image
          className="object-contain"
          width={110}
          height={50}
          alt="logo"
          src={"/logo.svg"}
        />
      </div>
      <div className="flex gap-12">
        <a
          onClick={handleLandingPageClick}
          className="text-md font-semibold text-center hover:text-blue-500 cursor-pointer"
        >
          Trang chủ
        </a>
        <a
          href="#"
          className="text-md font-semibold text-center hover:text-blue-500"
        >
          Dịch vụ
        </a>
        <a
          href="#"
          className="text-md font-semibold text-center hover:text-blue-500"
        >
          Kết nối
        </a>
        <a
          onClick={handleAboutUsClick}
          className="text-md font-semibold text-center hover:text-blue-500 cursor-pointer"
        >
          Về chúng tôi
        </a>
      </div>
      {props.sessionKey ? (
        <Button
          htmlType="submit"
          className="text-white font-semibold md:w-[150px] h-[35px] bg-[#0A68EB] border border-solid border-[#0A68EB] rounded-full"
          onClick={() => router.push("/home")}
        >
          Quay lại
        </Button>
      ) : (
        <div className="flex items-center space-x-4">
          <Button
            htmlType="submit"
            className="text-white font-semibold md:w-[150px] h-[35px] bg-[#0A68EB] border border-solid border-[#0A68EB] rounded-full"
            onClick={openRegister}
          >
            Đăng ký
          </Button>
          <Button
            htmlType="submit"
            className="text-white font-semibold md:w-[150px] h-[35px] bg-[#0A68EB] border border-solid border-[#0A68EB] rounded-full"
            onClick={openLogin}
          >
            Đăng nhập
          </Button>
        </div>
      )}

      <FormLogin
        isOpenLogin={isOpenLogin}
        closeModalLogin={() => setIsOpenLogin(false)}
        openRegister={openRegister}
      />
      <FormRegister
        isOpenRegister={isOpenRegister}
        closeModalRegister={() => setIsOpenRegister(false)}
        openLogin={openLogin}
      />
    </div>
  );
}
