"use client"
import React from "react";
import Image from "next/image";
import { Button } from "antd";
import { useRouter } from "next/navigation";

export default function LandingPage3() {
  const router = useRouter();
  const handleAboutUsClick = () => {
    router.push('/aboutus');
  };
  return (
    <div className="flex flex-col py-6 px-10">
      <div className="flex flex-col items-center justify-center">
        <p className="font-bold text-3xl text-[#000000]">Về chúng tôi</p>
      </div>
      <div className="flex flex-row py-10 ">
        <div className="flex flex-row w-[50%] items-center justify-end">
          <div className="flex flex-col w-[250px] h-[416px] bg-[#1180FF]">
            <p className="items-center text-center text-[#FFFFFF] text-3xl px-16 py-5">
              &quot;
              <span className="font-sans">
                <span className="font-semibold"> Trust yourself.</span> You know
                more than you think you do.
              </span>
              &quot;
            </p>
            <p className="text-semibold text-[#FFFFFF] text-center py-3">
              - BENJAMIN SPOCK
            </p>
          </div>
          <div className="flex flex-col space-x-2 space-y-2">
            <Image
              className="object-contain"
              width={300}
              height={330}
              alt="logo"
              src={"/landing3.svg"}
            />
            <Image
              className="object-contain"
              width={300}
              height={330}
              alt="logo"
              src={"/landingpage3_2.svg"}
            />
          </div>
        </div>
        <div className="flex flex-col w-[50%] space-y-1 justify-center mx-auto">
          <p className="font-bold text-3xl"> Khám phá đội ngũ của</p>
          <p className="font-bold text-3xl text-[#0F52BA]">
            {" "}
            GenZ Mental Health
          </p>
          <p className="py-10 pr-10 text-1xl text-[#000000]">
            Gặp gỡ những người bạn đầy lòng nhân ái của chúng tôi tại GenZ
            Mental Health. Với kiến ​thức chuyên môn trong nhiều lĩnh vực khác
            nhau, chúng tôi sẵn sàng hỗ trợ bạn trên hành trình hướng tới sức
            khỏe tinh thần.
          </p>
          <Button
          htmlType="submit"
          className="text-white text-base font-semibold md:w-[200px] md:h-[45px] bg-[#0A68EB]  border border-solid border-[#0A68EB] rounded-full"
          onClick={handleAboutUsClick}
        >
          Khám phá ngay thôi !!
        </Button>

        </div>
      </div>
    </div>
  );
}
