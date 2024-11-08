"use client";

import Image from "next/image";
import CustomButton from "../CustomButton";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="w-full h-screen flex flex-col bg-[#F3F3F3]">
      <div className="w-full h-screen flex">
        <div className="w-1/3 flex flex-col justify-center items-center">
          <div className="flex flex-col gap-8">
            <p className="text-7xl font-bold">Ooops...</p>
            <p className="text-4xl font-normal">Trang này không tìm thấy</p>
            <div className="flex py-10" onClick={() => router.back()}>
              <CustomButton
                rightIcon={
                  <Image
                    src="/arrowright.svg"
                    width={20}
                    height={20}
                    alt="arrowright"
                    className="justify-items-center mt-1"
                  />
                }
                title="Quay trở lại"
                containerStyles="py-6 rounded-[15px] bg-[#0F52BA] border gap-2 w-[200px] "
                textStyles="text-xl font-semibold text-[#FFFFFF]"
              />
            </div>
          </div>
        </div>
        <div className="w-2/3 flex justify-center items-center">
          <Image
            className="object-contain"
            width={800}
            height={800}
            alt="logo"
            src={"/notfound.svg"}
          />
        </div>
      </div>
    </div>
  );
}
