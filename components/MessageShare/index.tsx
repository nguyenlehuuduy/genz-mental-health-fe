import React from "react";
import { RightArrowIcon } from "../../icons";
import Image from "next/image";

const listImages = [
  {
    id: 1,
    image: "/big_logo.png",
  },
  {
    id: 2,
    image: "/big_logo.png",
  },
  {
    id: 3,
    image: "/big_logo.png",
  },
  {
    id: 4,
    image: "/logo_mental_health.png",
  },
  {
    id: 5,
    image: "/big_logo.png",
  },
  {
    id: 6,
    image: "/logo_mental_health.png",
  },
  {
    id: 7,
    image: "/big_logo.png",
  },
  {
    id: 8,
    image: "/big_logo.png",
  },
];

const MessageShare = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <div className="flex flex-col max-w-[300px] bg-white border-l min-w-[300px] rounded-md">
      <div className="relative flex flex-row items-center py-5 px-6 border-b h-[76px] shrink-0">
        <div onClick={handleClose}>
          <RightArrowIcon />
        </div>
        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-[#666666]">
          Thông tin
        </p>
      </div>
      <div className="flex flex-col justify-center items-center gap-4 py-6 mx-auto border-b w-full">
        <div className="max-w-[125px] max-h-[125px] flex justify-center items-center">
          <Image
            src="/big_logo.png"
            width={400}
            height={400}
            style={{
              maxWidth: 125,
              height: "auto",
            }}
            className="object-cover"
            alt="image"
          />
        </div>
        <p className="max-w-[180px] font-medium  text-[#4E4F50] text-center">
          Trần Kim Vũ
        </p>
      </div>
      <div className="grid grid-cols-3 w-full px-1 gap-2 overflow-auto">
        {listImages.map((item: any, index) => (
          <div
            key={item.id}
            className="max-w-[90px] max-h-[90px] flex justify-center items-center"
          >
            <Image
              src="/big_logo.png"
              width={400}
              height={400}
              style={{
                maxWidth: 90,
                height: "auto",
              }}
              className="object-cover"
              alt="image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageShare;
