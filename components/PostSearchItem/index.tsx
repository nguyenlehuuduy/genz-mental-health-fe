"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import AvatarAccount from "../Avata";
import { SearchPostTypeForCard } from "@/service/searchService";
import { getTimeAgo } from "@/lib/utils";
import { useRouter } from "next/navigation";

const PostSearchItem = ({ post }: { post: SearchPostTypeForCard }) => {
  const [openDetailPost, setOpenDetailPost] = useState<boolean>(false);

  const router = useRouter();

  const handleShowDetailPost = () => {
    setOpenDetailPost(!openDetailPost);
  };
  return (
    <div
      className="flex justify-between w-full gap-2 p-2 cursor-pointer"
      onClick={handleShowDetailPost}
    >
      <div className="flex gap-3 w-full">
        <div className="w-[50px] h-[50px]">
          <AvatarAccount
            name={post.account.full_name}
            filePath={post.account.avata}
            height={50}
            width={50}
          />
        </div>

        <div className="flex flex-col w-full">
          <Link
            href={`/profile/${post.account.id}`}
            className="truncate text-sm font-medium cursor-pointer"
          >
            {post.account.full_name}
          </Link>
          <p className="line-clamp-3 text-base">{post.contentText}</p>
          <div className="flex gap-4">
            <span className="text-xs">{getTimeAgo(post.created_at)}</span>
            <p
              className="text-xs text-blue-600 cursor-pointer"
              onClick={() => router.push(`/new-feeds/${post.id}`)}
            >
              Xem bài viết
            </p>
          </div>
        </div>
      </div>

      <div className="relative w-[230px] rounded-md overflow-hidden">
        <Image
          src={post.images[0]}
          fill
          alt="image post"
          className="absolute object-cover w-full h-auto"
        />
      </div>
    </div>
  );
};

export default PostSearchItem;
