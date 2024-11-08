import { SuperAccountForCard } from "@/service/supperAccountService";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Author = ({
  avata,
  fullName,
  position,
  age,
  facebook,
  instagram,
  linkedin,
  twitter,
  quote,
}: SuperAccountForCard) => {
  return (
    <div className="flex justify-center items-center bg-[#D7EFFF] p-4 border rounded-[10px]">
      <div className="flex flex-col">
        <div className="flex relative aspect-video items-center justify-center py-2">
          <Image
            className="object-contain"
            width={130}
            height={50}
            alt="logo"
            src={avata}
          />
        </div>
        <div className="">
          <p className="text-lg font-semibold text-[#0F52BA] text-center">
            {fullName}
          </p>
          <p className="text-base font-semibold text-center py-2">{position}</p>
          <p className="text-center py-5">
            <em>&quot;{quote}&quot;</em>
          </p>
        </div>
        <div className="flex flex-row gap-3 justify-center items-center py-2">
          <Link href={facebook}>
            <Image
              className="object-contain"
              width={30}
              height={30}
              alt="logo"
              src={"/facebook.svg"}
            />
          </Link>
          <Link href={instagram}>
            <Image
              className="object-contain"
              width={30}
              height={30}
              alt="logo"
              src={"/instagram.svg"}
            />
          </Link>
          <Link href={linkedin}>
            <Image
              className="object-contain"
              width={30}
              height={30}
              alt="logo"
              src={"/linkedin.svg"}
            />
          </Link>
          <Link href={twitter}>
            <Image
              className="object-contain"
              width={30}
              height={30}
              alt="logo"
              src={"/twitter.svg"}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Author;
