import { getTimeAgo } from "@/lib/utils";
import React from "react";
import AvatarAccount from "../Avata";
import Link from "next/link";
import { CommentForCard } from "@/service/commentService";

const CommentItem = ({ comment }: { comment: CommentForCard }) => {
  return (
    <div className="flex gap-6 items-start mb-5">
      <div className="relative w-[40px] h-[40px]">
        <AvatarAccount
          name={comment.account.name}
          filePath={comment.account.avata}
        />
      </div>

      <div className="flex flex-col">
        <Link
          href={`/profile/${comment.account.id}`}
          className="font-medium hover:underline"
        >
          {comment.account.name}
        </Link>
        <span>{comment.content}</span>
        <div className="text-[14px] flex gap-5">
          <span className="text-gray-500 text-sm">
            {getTimeAgo(comment.created_at)}
          </span>
          <span>Thích</span>
          <span>Trả lời</span>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
