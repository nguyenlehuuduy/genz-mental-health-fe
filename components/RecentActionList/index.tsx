"use client";
import { TargetAccountForCard } from "@/service/actionTargetService";
import Image from "next/image";
import Link from "next/link";
import { TYPE_ACTION_USER } from "@/lib/constants";
type PropsComponent = {
  listTargetAccount: Array<TargetAccountForCard>;
};
export default function RecentActionList(props: PropsComponent) {
  return (
    <div className="w-full h-[calc(100vh-100px)] overflow-y-auto flex flex-col gap-5">
      {props.listTargetAccount.map((item, index) => (
        <ItemTargetAccount item={item} key={index} />
      ))}
    </div>
  );
}

const ItemTargetAccount = ({ item }: { item: TargetAccountForCard }) => {
  const actionForPost = [
    TYPE_ACTION_USER.COMMENT_POST,
    TYPE_ACTION_USER.LIKE_POST,
    TYPE_ACTION_USER.SHARE_POST,
  ];
  return (
    <div className="w-full  flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-2 items-center text-[14px] w-full">
        <p className="col-span-2 font-medium">{item.content}</p>
        <p className="font-medium  text-right">{item.created_at}</p>
        <div className="col-span-3 gap-2 flex h-[110px] overflow-hidden justify-between">
          <p>
            {actionForPost.includes(item.action_user_id) && item.post?.content}
          </p>
          <Image
            src={item.post?.image ?? ""}
            alt="image post"
            width={100}
            height={100}
            className="object-contain rounded-md"
          />
        </div>

        <Link
          className="block col-span-3 text-right w-full text-[#0A68EB]"
          href={`/new-feeds/${item.post?.id}`}
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};
