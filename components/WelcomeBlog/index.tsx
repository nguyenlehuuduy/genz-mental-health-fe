import { TYPE_QUOTE_BLOG } from "@/lib/constants";
import { getQuoteCurrentDate } from "@/service/quoteService";
import { Button } from "antd";
import Image from "next/image";
import React from "react";

const WelcomeBlog = async () => {
  const quoteBlogCurrentDate = await getQuoteCurrentDate(TYPE_QUOTE_BLOG);
  return (
    <div className="w-full h-[400px] flex justify-between px-10 py-5">
      <div className="flex flex-col w-1/2 justify-center gap-5">
        <p className="text-5xl font-medium">
          {quoteBlogCurrentDate?.title ??
            "Chào mừng bạn đến với Blog GenZ Mental Health"}
        </p>
        <p className="text-lg">
          <em>
            &quot;{" "}
            {quoteBlogCurrentDate?.description ??
              `Khám phá các bí quyết và phương pháp để duy trì sức khỏe
          tinh thần tốt, giúp bạn sống tích cực và hạnh phúc hơn mỗi
          ngày !`}{" "}
            &quot;
          </em>
        </p>
        <Button
          htmlType="submit"
          className="text-white text-base font-medium md:w-[250px] md:h-[45px] bg-[#0F52BA] mt-10"
        >
          Tìm hiểu thêm về chúng tôi {">"}
        </Button>
      </div>
      <div className="flex w-[50%] items-center justify-end relative overflow-hidden">
        <Image
          className="absolute w-full h-full object-contain"
          width={950}
          height={500}
          alt="logo"
          // src={quoteBlogCurrentDate?.thumbnail_quotes ?? "/bg-blog.png"}
          src={"/bg-blog.png"}
        />
      </div>
    </div>
  );
};

export default WelcomeBlog;
