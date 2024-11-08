"use client";

import { TabMenuForCard } from "@/service/tabMenuService";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

type PropsComponent = {
  listMenuTab: Array<TabMenuForCard>;
};

export default function MenuList(props: PropsComponent) {
  const pathname = usePathname();

  const router = useRouter();

  const getFileName = (url: string) => {
    return url.split("/").pop();
  };

  return (
    <div className="flex flex-col w-full justify-between">
      <div className="flex flex-col gap-1 p-2 w-full">
        {props.listMenuTab &&
          props.listMenuTab.map((item, index) => (
            <div
              key={index}
              className={`flex gap-6 py-5 items-center px-12 cursor-pointer ${pathname.includes(item.url) && "bg-[#E7EFFF] rounded-sm border-[1px] border-opacity-85"}`}
              onClick={() => {
                router.push(item.url);
              }}
            >
              <Image
                src={
                  pathname.includes(item.url)
                    ? "/icons-system/FillIcon/" + getFileName(item.icon_url)
                    : item.icon_url
                }
                width={24}
                height={24}
                alt="icon tab menu"
              />
              <span
                className={`${pathname.includes(item.url) && "text-[#0F52BA] font-bold"} text-lg`}
              >
                {item.name}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
