"use client";

import { Button } from "antd";
import { Book, Save2, Share } from "iconsax-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function OptionPost() {
  const pathname = usePathname();
  return (
    <div className="flex w-fit gap-4 bg-white rounded-md p-2">
      <Link href={"/myself"}>
        <Button
          className={`flex items-center ${pathname?.split("/").filter(Boolean).length === 1 && "bg-blue-500 text-white"} `}
          size="middle"
          icon={<Book />}
        >
          Bài viết
        </Button>
      </Link>
      <Link href={"/myself/shares"}>
        <Button
          className={`flex items-center ${pathname?.includes("shares") && "bg-blue-500 text-white"}`}
          icon={<Share />}
          size="middle"
        >
          Bài chia sẻ
        </Button>
      </Link>
      <Link href={"/myself/saves"}>
        <Button
          icon={<Save2 />}
          className={`flex items-center ${pathname?.includes("saves") && "bg-blue-500 text-white"}`}
          size="middle"
        >
          Đã Lưu
        </Button>
      </Link>
    </div>
  );
}
