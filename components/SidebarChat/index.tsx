"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const MockDataChatList = [
  { title: "Chatbot", icon: "/chatbot_icon.svg", url: "chatbot" },
  { title: "Tin nhắn", icon: "/message_icon.svg", url: "message" },
  {
    title: "Không gian ảo",
    icon: "/virtual_space_icon.svg",
    url: "virtual-space",
  },
];

const SidebarChat = () => {
  const pathName = usePathname().split("/");
  const router = useRouter();
  return (
    <div className="max-w-[300px] bg-white px-5 py-6 w-full h-screen flex flex-col  rounded-md justify-between  items-center border-r">
      <div className="flex flex-col w-full items-center gap-6 ">
        <div className="relative w-[144px] h-[42px]">
          <Image src="/logo_mental_health.png" fill alt="logo" />
        </div>
        <div className="flex flex-col gap-1 w-full">
          {MockDataChatList.map((item, index) => (
            <div
              key={index}
              className={`flex gap-6 p-3 items-center w-full cursor-pointer ${pathName.includes(item.url) && "bg-slate-50 rounded-sm border-[1px] border-opacity-85"}`}
              onClick={() => {
                router.push(item.url);
              }}
            >
              <Image
                src={item.icon}
                width={24}
                height={24}
                alt="icon message"
              />
              <span
                className={`${pathName.includes(item.url) && "text-[#0F52BA] font-bold"} text-xl font-medium`}
              >
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-row gap-6 font-bold text-xl text-[#00000099] cursor-pointer">
        <Image src="/home_icon.svg" width={24} height={24} alt="icon message" />
        <p>Trang chủ</p>
      </div>
    </div>
  );
};

export default SidebarChat;
