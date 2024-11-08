import { convertStringToSlug } from "@/lib/utils";
import { PostBlogForCard } from "@/service/blogService";
import Link from "next/link";
import React from "react";

type PropsComponent = {
  listBlogs: PostBlogForCard[];
};

const NewBlogs = ({ listBlogs }: PropsComponent) => {
  return (
    <div className="flex flex-col max-w-[520px] w-full gap-5">
      <div className="flex flex-row justify-between items-center ">
        <p className="text-3xl font-bold">Bài viết mới nhất</p>
      </div>
      <div className="flex flex-col gap-5">
        {listBlogs &&
          listBlogs.map((item) => (
            <Link
              href={`/blog/${convertStringToSlug(item.id, item.title)}`}
              key={item.id}
              className="flex flex-col gap-3 px-3 py-1 transition duration-300 ease-in-out hover:bg-[#D7EFFF] cursor-pointer rounded-md"
            >
              <div>
                <p className="text-xl font-medium hover:underline">
                  {item.title}
                </p>
              </div>
              <div className="flex">
                <p className="text-base font-bold">Bởi</p>
                <p className="text-base font-bold text-[#0F52BA] px-1">
                  {item.account.full_Name ?? "Quản trị"}
                </p>
                <p className="px-1"> - </p>
                <p className="px-2">{item.created_at}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default NewBlogs;
