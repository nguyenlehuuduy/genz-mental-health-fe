"use client";

import React from "react";
import MenuList from "../partial/menu-list";
import ChatRoomArea from "../ChatRoomArea";
import { TabMenuForCard } from "@/service/tabMenuService";
import { RoomMessageForCard } from "@/service/roomMessageService";
import { usePathname, useRouter } from "next/navigation";
import { URL_PAGE_NOT_AUTH } from "@/lib/constants";
import DiaryRepository from "../DiaryRepository";
import FooterLanding from "../FooterLanding";

type Props = {
  children: React.ReactNode;
  listMenuTab?: TabMenuForCard[];
  listRoomChat?: RoomMessageForCard[];
  sessionKey?: string;
};

function UserSubLayout({
  children,
  listMenuTab,
  listRoomChat,
  sessionKey,
}: Props) {
  const pathName = usePathname();
  const router = useRouter();
  const checkTypeLayout = URL_PAGE_NOT_AUTH.map((item) =>
    pathName.includes(item),
  ).filter(Boolean).length;
  const checkTypeLayoutDiary = pathName.includes("diary");
  if (!sessionKey && !checkTypeLayout) {
    router.replace("/landingpage");
  }
  return (
    <main className="mt-[60px]">
      <div className="flex justify-between gap-2 mx-auto">
        {!checkTypeLayout && (
          <div className="flex flex-col w-[22%] gap-3 bg-white rounded-md overflow-y-auto h-[calc(100vh-60px)] mt-1 sticky top-[63px]">
            <MenuList listMenuTab={listMenuTab ?? []} />
            {checkTypeLayoutDiary ? (
              <DiaryRepository />
            ) : (
              <ChatRoomArea
                listRoomChat={listRoomChat ?? []}
                sessionKey={sessionKey || ""}
              />
            )}
          </div>
        )}
        <div className={`mt-1 mx-auto ${!checkTypeLayout ? "w-[78%]" : ""}`}>
          {children}
        </div>
      </div>
      {!pathName.includes('chat-bot') && <FooterLanding />}

    </main>
  );
}

export default UserSubLayout;
