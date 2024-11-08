"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PostBlogForCard } from "@/service/blogService";
import Image from "next/image";
import Link from "next/link";
import { convertStringToSlug } from "@/lib/utils";

type PropsComponent = {
  relatedBlog: Array<PostBlogForCard>;
};
export default function SlickBlog(props: PropsComponent) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    customPaging: function () {
      return (
        <div className={`w-4 h-4 rounded-full border border-[#02607E]`}></div>
      );
    },
  };

  return (
    <Slider {...settings}>
      {props.relatedBlog.map((item) => (
        <div key={item.id}>
          <div className="flex flex-col w-full h-[500px] px-5 relative">
            <div className="relative h-full w-full">
              <Image
                className="absolute h-full w-full object-contain"
                width={400}
                height={300}
                alt="logo"
                src={item.thumbnail_blog}
              />
            </div>
            <Link
              className="font-medium hover:underline"
              href={`/blog/${convertStringToSlug(item.id, item.title)}`}
            >
              {item.title}
            </Link>
            <div className="flex py-3">
              <p className="text-base font-bold">Bởi</p>
              <p className="text-base font-bold  text-[#0F52BA] px-1">
                {item.account.full_Name}
              </p>
              <p className="px-1"> - </p>
              <p className="px-2">{item.created_at}</p>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}
