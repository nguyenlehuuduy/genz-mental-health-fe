"use client";

import { ImageGalleryForCard } from "@/service/imageService";
import Image from "next/image";
type PropsComponent = {
  listImagePublicOfAccount: Array<ImageGalleryForCard>;
};
export default function ListImageAccount(props: PropsComponent) {
  return (
    <div className="flex flex-wrap gap-2 justify-evenly h-[calc(100vh-90px)] overflow-y-auto">
      {props.listImagePublicOfAccount.map((item, index) => (
        <div
          className="w-[90px] h-[90px] overflow-hidden rounded-md"
          key={index}
        >
          <Image
            alt="image post"
            src={item.path}
            width={100}
            height={100}
            className="object-cover w-full h-full"
          />
        </div>
      ))}
    </div>
  );
}
