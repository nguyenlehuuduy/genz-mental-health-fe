import { FeatureForCard } from "@/service/featureService";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type PropsComponent = {
  listHotFeatureContent: Array<FeatureForCard>;
};
const NavFeature = (props: PropsComponent) => {
  return (
    <div className="pb-2">
      <div className="w-full p-3 bg-white rounded-md ">
      <div className="flex flex-col gap-3">
        {props.listHotFeatureContent.map((item, index) => (
          <div
            key={index}
            className="flex flex-row items-center gap-3 cursor-pointer relative"
          >
            <Link href={item.url} className="absolute w-full h-full" />
            <Image
              src={item.thumbnail_file_name}
              width={60}
              height={60}
              alt="feature"
              className="rounded-[10px]"
            />
            <p className="font-medium">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default NavFeature;
