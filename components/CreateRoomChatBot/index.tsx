"use client";

import Image from "next/image";
import { Fragment, useState } from "react";
import ModalCreateRoomChatBot from "../ModalCreateRoomChatBot";

type PropsComponent = {};

export default function CreateRoomChatBot(props: PropsComponent) {
  const [isShowModalCreate, setIsShowModalCreate] = useState<boolean>(false);

  return (
    <Fragment>
      {isShowModalCreate && (
        <ModalCreateRoomChatBot
          handleCancel={() => setIsShowModalCreate(false)}
          handleOk={() => {}}
          isModalOpen={isShowModalCreate}
        />
      )}

      <div
        className="relative w-full pt-5 h-[800px] flex flex-col items-center justify-center rounded-lg "
        onClick={() => setIsShowModalCreate(!isShowModalCreate)}
      >
        <div className="absolute top-16 flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-2">
            <Image
              src="/logo_mental_health.png"
              alt="logo mental health"
              width={110}
              height={20}
              className="object-contain"
            />
            <span className="font-semibold text-2xl text-[#0F52BA]">Tớ là Tâm An</span>
          </div>
          <span className=" font-bold text-gray-600">Người bạn đồng hành của bạn mỗi ngày</span>
        </div>

        <Image
          src="/banner-create-room-chat.png"
          alt="banner-create-room-chat"
          // layout="fill"
          objectFit="cover"
          height={1100}
          width={1100}
          // objectPosition="center 20%" 
        />
        <div className="absolute bottom-10 bg-blue-600 p-4 px-8 rounded-lg text-white text-lg font-semibold shadow-md hover:bg-blue-700 transition-all duration-200">
          + Tạo một cuộc trò chuyện
        </div>
      </div>
    </Fragment>
  );
}
