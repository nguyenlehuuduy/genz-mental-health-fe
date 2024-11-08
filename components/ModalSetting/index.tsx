"use client";
import React from "react";
import ReactDOM from "react-dom";
import { Modal } from "antd";
import {
  IconAboutus,
  IconAccount,
  IconContact,
  IconOnMode,
  IconPolicy,
  IconPrivate,
  IconSupport,
  ToggleIcon,
} from "../../icons";
import { useRouter } from "next/navigation";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const ModalSetting: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
  const router = useRouter();
  const modalContent = (
    <Modal
      open={isOpen}
      onCancel={closeModal}
      width={300}
      footer={null}
      closable={false}
      mask={false}
      getContainer={false}
      style={{ top: 60, left: 500 }}
    >
      <div className="flex flex-col">
        <div className="text-base font-semibold">Cài đặt</div>
        <div className="flex flex-row">
          <div className="px-2 py-2">
            {/* <div className="flex flex-row py-2 items-center">
              <IconOnMode width={25} height={25} />
              <span className="px-4 ">Chế độ sáng</span>
              <ToggleIcon width={30} height={30} />
            </div>
            <div className="flex flex-row py-2">
              <IconPrivate width={25} height={25} />
              <span className="px-4">Quyền riêng tư</span>
            </div> */}
            <div
              className="flex flex-row py-2 cursor-pointer"
              onClick={() => router.push("/setting-account")}
            >
              <IconAccount width={25} height={25} />
              <span className="px-4">Tài khoản</span>
            </div>
          </div>
        </div>

        <div className="text-base font-semibold">Điều khoản</div>
        <div className="px-2 py-2">
          {/* <div className="flex flex-row py-2">
            <IconPolicy width={25} height={25} />
            <span className="px-4">Chính sách</span>
          </div>
          <div className="flex flex-row py-2">
            <IconSupport width={25} height={25} />
            <span className="px-4">Hỗ trợ</span>
          </div>
          <div className="flex flex-row py-2">
            <IconContact width={25} height={25} />
            <span className="px-4">Liên hệ</span>
          </div> */}
          <div
            className="flex flex-row py-2 cursor-pointer"
            onClick={() => router.push("/home")}
          >
            <IconAboutus width={25} height={25} />
            <span className="px-4">Về chúng tôi</span>
          </div>
        </div>
      </div>
    </Modal>
  );

  return typeof document !== "undefined"
    ? ReactDOM.createPortal(modalContent, document.body)
    : null;
};
export default ModalSetting;
