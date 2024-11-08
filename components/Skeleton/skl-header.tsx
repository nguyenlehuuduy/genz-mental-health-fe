"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeaderSkeleton() {
  return (
    <div className="w-full h-[60px] fixed inset-0 flex items-center bg-white z-[999999]">
      <div className="max-w-[1140px] h-[60px] mx-auto flex items-center py-3">
        <div className="max-w-[300px] w-full flex ">
          <Link
            href="/home"
            className="flex justify-start items-start max-md:w-[108px] max-md:h-[28px] grow"
          >
            <Image
              src="/logo_mental_health.png"
              alt="logo mental health"
              width={110}
              height={20}
              className="object-contain"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
