"use client"

import { Modal } from "antd";
import AvatarAccount from "../Avata";
import { useRouter } from "next/navigation";

type Follow = {
  id: string,
  full_name: string,
  avata: string,
  nick_name: string
}

type PropsComponent = {
  isOpen: boolean,
  closeModal: () => void,
  listFollowShip: Array<Follow>,
  followShip: "follower" | "following"
}
export default function ModalListFollowShip({ isOpen, closeModal, listFollowShip, followShip }: PropsComponent) {
  const router = useRouter();
  return (<Modal
    open={isOpen}
    width={500}
    footer={false}
    onCancel={closeModal}
    destroyOnClose
  >
    <span className="text-[17px]">
      Danh sách tài khoản {followShip === "following" ?
        "bạn đang theo dõi"
        : "đang theo dõi bạn"}</span>
    <div className="flex flex-col gap-3 mt-5">
      {listFollowShip.length === 0 && (
        <span className="text-gray-600">Chưa có thông tin, hãy follow những người cùng tần số với bạn nhé.</span>
      )}
      {listFollowShip.map((item, index) => (
        <div className="flex items-center gap-3" key={index}>
          <AvatarAccount
            width={50}
            height={50}
            filePath={item.avata}
            name={item.full_name}
          />
          <div className="flex flex-col">
            <label className="font-medium cursor-pointer underline" onClick={() => router.push(`/profile/${item.id}`)}>{item.full_name}</label>
            <label>{item.nick_name}</label>
            <div className="flex gap-8 text-[12px]">
              <p className="border rounded-md border-[#243123] px-1 cursor-pointer">Nhắn tin</p>
              <p className="text-blue-600 underline cursor-pointer" onClick={() => router.push(`/profile/${item.id}`)}>Xem chi tiết</p>
              <p className="text-[#ef6c6c] cursor-pointer">Hủy theo dõi</p>
            </div>
          </div>
        </div>

      ))}

    </div>
  </Modal>)
}