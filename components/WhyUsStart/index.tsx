import { BasicInfoCompanyForCard } from "@/service/basicInfoCompany";
import { Button } from "antd";
import Image from "next/image";
import React from "react";
type PropsComponent = {
  myReason: BasicInfoCompanyForCard;
};
const WhyUsStart = (props: PropsComponent) => {
  return (
    <div className="relative w-full min-h-[400px]">
      <Image
        className="w-full object-cover"
        width={1920}
        height={1080}
        alt="logo"
        // src={props.myReason?.thumbnail}
        src="/friends-blog.png"
      />
      <div className="absolute bottom-10 right-20 w-[750px] h-[530px] flex">
  <div className="p-8 bg-white bg-opacity-90 border border-gray-200 shadow-lg rounded-lg px-10 py-10">
    <p className="font-semibold text-xl py-2 px-10">
      {props.myReason?.type_info_company?.title ?? `TẠI SAO CHÚNG TÔI LẠI BẮT ĐẦU`}
    </p>
    <p className="font-bold text-[40px] py-2 px-10">
      {props.myReason?.title ?? `Nó bắt đầu như một ý tưởng đơn giản và phát triển thành niềm đam mê của chúng tôi`}
    </p>
    <p className="font-thin text-lg text-left py-2 px-10">
      {props.myReason?.content ?? `Chúng tôi bắt đầu blog này vì nhận thấy thế hệ GenZ đang đối mặt với rất nhiều thách thức về sức khỏe tinh thần trong cuộc sống hiện đại. Từ áp lực học tập, công việc, đến việc tìm kiếm bản thân và duy trì các mối quan hệ, tất cả đều có thể gây ra căng thẳng và lo âu.`}
    </p>
    <div className="px-10 py-5">
      <Button className="px-4 py-2 bg-[#0F52BA] w-[400px] h-[50px] text-[#FFFFFF] text-lg font-semibold">
        Khám phá về câu chuyện của chúng tôi
      </Button>
    </div>
  </div>
</div>

    </div>
  );
};

export default WhyUsStart;
