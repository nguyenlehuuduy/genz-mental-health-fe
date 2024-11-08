import Image from "next/image";
import React from "react";
import { Button } from "antd";
export default function LandingPage4() {
  return (
    <div className="flex flex-row  py-10 ">
      <div className="flex w-[50%] items-center justify-end px-10">
        <Image
          className="object-contain"
          width={600}
          height={600}
          alt="logo"
          src={"/landingicon4.svg"}
        />
      </div>
      <div className="flex w-[50%] items-center px-10">
        <div className=" space-y-4 text-center">
          <p className="font-bold text-3xl ">Khám phá những điều tuyệt vời ở</p>
          <p className="font-bold text-3xl text-[#0F52BA]">
            GenZ Mental Health
          </p>
          <div className="py-10">
            <Button
              htmlType="submit"
              className="text-white text-base font-semibold md:w-[200px] md:h-[45px] bg-[#0A68EB]  border border-solid border-[#0A68EB] rounded-full"
            >
              Khám phá ngay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
