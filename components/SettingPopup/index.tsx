import {
  IconAboutus,
  IconAccount,
  IconContact,
  IconOnMode,
  IconPolicy,
  IconPrivate,
  IconSupport,
  ToggleIcon,
  SettingIcon,
} from "../../icons";
import React from "react";
import { Popover } from "antd";

export default function SettingPopup() {
  const content = (
    <div className="flex flex-col  w-[220px]">
      <div className="text-base font-semibold">Cài đặt</div>
      <div className="flex flex-row">
        <div className="px-2 py-2">
          <div className="flex flex-row py-2 items-center">
            <IconOnMode width={25} height={25} />
            <span className="px-4 ">Chế độ sáng</span>
            <ToggleIcon width={30} height={30} />
          </div>
          <div className="flex flex-row py-2">
            <IconPrivate width={25} height={25} />
            <span className="px-4">Quyền riêng tư</span>
          </div>
          <div className="flex flex-row py-2">
            <IconAccount width={25} height={25} />
            <span className="px-4">Tài khoản</span>
          </div>
        </div>
      </div>

      <div className="text-base font-semibold">Điều khoản</div>
      <div className="px-2 py-2">
        <div className="flex flex-row py-2">
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
        </div>
        <div className="flex flex-row py-2">
          <IconAboutus width={25} height={25} />
          <span className="px-4">Về chúng tôi</span>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Popover content={content} trigger="click">
        <div className="p-2 rounded-full border flex justify-center items-center">
          <SettingIcon width={20} height={20} />
        </div>
      </Popover>
    </div>
  );
}
