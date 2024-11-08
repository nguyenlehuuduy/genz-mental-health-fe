import { BasicInfoCompanyForCard } from "@/service/basicInfoCompany";
import React from "react";

type PropsComponent = {
  aboutUs: BasicInfoCompanyForCard;
  myResponsibility: BasicInfoCompanyForCard;
};
const AboutUsAndOurMission = (props: PropsComponent) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className=" w-full flex flex-row justify-end">
        <hr className="border-[10px] border-[#0F52BA] w-[800px]" />
        <hr className="border-[10px] border-black w-[300px]" />
      </div>
      <div className="bg-[#D7EFFF] w-full h-[450px] flex flex-row items-center justify-center px-5">
        <div className="flex px-5">
          <div className="w-[50%] px-5">
            <p className="text-xl font-semibold  py-5">
              {props?.aboutUs?.type_info_company?.title ?? "VỀ CHÚNG TÔI"}
            </p>
            <p className="text-2xl font-bold  py-2">
              {props?.aboutUs?.title ??
                `Chúng tôi là một cộng đồng gồm những người viết nội dung chia sẻ
              những bài học`}
            </p>
            <p className="text-lg font-thin  py-2">
              {props?.aboutUs?.content ??
                `Chào mừng bạn đến với blog Sức Khỏe Tinh Thần dành cho thế hệ
              GenZ! Chúng tôi là một nhóm những người trẻ đam mê và tận tâm với
              sức khỏe tinh thần. Với mong muốn tạo ra một không gian an toàn và
              thân thiện, chúng tôi chia sẻ những kiến thức, kinh nghiệm và câu
              chuyện thực tế để giúp bạn vượt qua những thử thách tinh thần hàng
              ngày.`}
            </p>
          </div>

          <div className="w-[50%] px-5">
            <p className="text-xl font-semibold  py-5">
              {props?.myResponsibility?.title ?? "SỨ MỆNH CỦA CHÚNG TÔI"}
            </p>
            <p className="text-2xl font-bold  py-2">
              {props?.myResponsibility?.title ??
                `Tạo nội dung có giá trị cho các bạn trẻ GenZ về sức khỏe tinh thần!`}
            </p>
            <p className="text-lg font-thin  py-2">
              {props?.myResponsibility?.content ??
                ` Sứ mệnh của chúng tôi là nâng cao nhận thức và cung cấp các công
              cụ cần thiết để giúp thế hệ GenZ duy trì và cải thiện sức khỏe
              tinh thần. Chúng tôi tin rằng sức khỏe tinh thần không chỉ là việc
              đối phó với căng thẳng hay lo âu, mà còn là việc sống một cuộc
              sống hạnh phúc và cân bằng. Hãy cùng chúng tôi trên hành trình
              này, để mỗi ngày trở nên tốt đẹp hơn và ý nghĩa hơn!`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsAndOurMission;
