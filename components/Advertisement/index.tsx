import { QuotesForCard } from "@/service/quoteService";
import Image from "next/image";
import React from "react";

const Advertisement = ({ quoteHome }: { quoteHome: QuotesForCard }) => {
  return (
    <div className="flex justify-center pb-3">
    <div className="w-[850px] h-[230px] p-4 flex justify-center items-center gap-3 bg-white rounded-md shadow-lg border border-gray-200">
      <div className="w-[50%] pl-16 h-full flex flex-col justify-center items-start">

        <span className="pl-10">Thông điệp hôm nay dành cho bạn là : </span>
        {/* <i className="text-[#0f52ba] font-medium text-center">
        "Chậm chạp cũng được, không quá giỏi giang cũng được, điều quan trọng là phải nỗ lực.”
        </i> */}
        <i className="text-[#0f52ba] font-medium text-center">
  &quot;Chậm chạp cũng được, không quá giỏi giang cũng được, điều quan trọng là phải nỗ lực.&quot;
</i>

      </div>
      <div className="relative w-[50%] h-full">
        <Image
          // src={
          //   quoteHome.thumbnail_quotes
          //     ? quoteHome.thumbnail_quotes
          //     : "/banner-message1.png"
          // }
          src={"/banner-message1.png"}
          width={500}
          height={500}
          alt="avatar"
          className="rounded-full w-full h-full object-contain"
        />
      </div>
    </div>
     </div>
  );
};

export default Advertisement;
