import { PostBlogForCard } from "@/service/blogService";
import Image from "next/image";
import React from "react";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import { convertStringToSlug } from "@/lib/utils";

type PropsComponent = {
  hotBlog: PostBlogForCard;
};

const HotBlog = (props: PropsComponent) => {
  return (
    <div className="flex flex-col w-full max-w-[750px] gap-5">
      <p className="text-3xl font-bold">Bài nổi bật</p>
      <div className="relative">
        <Link
          href={`/blog/${convertStringToSlug(props.hotBlog.id, props.hotBlog.title)}`}
          className="w-full h-full absolute z-10"
        />
        <div className="relative w-full h-[400px] overflow-hidden">
          <Image
            className="absolute w-full h-full object-cover"
            width={700}
            height={400}
            alt="logo"
            src={props.hotBlog.thumbnail_blog}
          />
        </div>
        <div className="flex flex-row py-3">
          <p className="text-base font-bold ">Bởi</p>
          <p className="text-base font-bold text-[#0F52BA] px-1">Hữu Duy</p>
          <p className="px-1">|</p>
          <p className="px-2">{props.hotBlog.created_at}</p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-bold">{props.hotBlog.title}</p>
          <div
            className={
              DOMPurify.sanitize(props.hotBlog.body)?.length > 100
                ? "custom-text-dom custom-truncate truncate-mobile"
                : "custom-text-dom"
            }
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(props.hotBlog.body, {
                FORBID_TAGS: ["img", "h1", "h2", "h3", "h4"],
                KEEP_CONTENT: true,
              }),
            }}
          ></div>
        </div>
        <div className="py-5">
          <Link href={""} className="p-3 bg-[#0F52BA] text-white">
            Xem chi tiết {">"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotBlog;
