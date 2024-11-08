import { CateBlogForCard } from "@/service/blogService";
import Image from "next/image";
import React from "react";

type PropsComponent = {
  listCateBlog: CateBlogForCard[];
  cateBlog: string;
  onFilter: (cateId?: string) => void;
};

const CategoriesBlog = ({
  listCateBlog,
  cateBlog,
  onFilter,
}: PropsComponent) => {
  return (
    <div className="flex flex-col max-w-[360px] shrink-0 w-full mt-[60px] mb-[10px]">
      <p className="text-3xl font-bold">Danh mục</p>
      <div className="flex flex-col items-center justify-center gap-3 mt-5">
        <div
          onClick={() => onFilter(undefined)}
          className={`${!cateBlog && "bg-[#D7EFFF]"} w-full border-[1px] rounded-md relative hover:bg-[#D7EFFF] transition duration-300 cursor-pointer`}
        >
          <div className="flex items-center gap-7 p-2">
            <div className="relative w-[100px] h-[100px] rounded-md overflow-hidden">
              <Image
                className="object-contain"
                fill
                alt="logo"
                src={"/growth-hands.png"}
              />
            </div>
            <p className="font-semibold text-xl">Tất cả</p>
          </div>
        </div>
        {listCateBlog &&
          listCateBlog.map((item) => (
            <div
              onClick={() => onFilter(item.id)}
              key={item.id}
              className={`${item.id === cateBlog && "bg-[#D7EFFF]"} w-full border-[1px] rounded-md relative hover:bg-[#D7EFFF] transition duration-300 cursor-pointer`}
            >
              <div className="flex items-center gap-7 p-2">
                <div className="relative w-[100px] h-[100px] rounded-md overflow-hidden">
                  <Image
                    className="object-contain"
                    fill
                    alt="logo"
                    src={item.thumbnail_cate_blog}
                  />
                </div>
                <p className="font-semibold text-xl">{item.title}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoriesBlog;
