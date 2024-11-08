"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Collapse } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

type ExpandIconPosition = 'end';

const LandingPage5 = () => {
  const [expandIconPosition] = useState<ExpandIconPosition>("end");
  const panelStyle = { border: "2px solid #729ed8", borderRadius: "8px" };

  const questions = [
    "Dự án GenZ Mental Health là gì?",
    "Ai là đối tượng mà GenZ Mental Health hướng đến?",
    "Tại sao GenZ Mental Health lại quan trọng đối với giới trẻ hiện nay?",
    "Các dịch vụ và sản phẩm chính mà GenZ Mental Health cung cấp bao gồm những gì?",
    "Làm thế nào để tôi có thể tham gia vào cộng đồng GenZ Mental Health?"
  ];

  const answers = [
    "GenZ Mental Health là một nền tảng mạng xã hội đặc biệt, được thiết kế để hỗ trợ sức khỏe tinh thần cho thế hệ trẻ GenZ. Trước những thách thức tâm lý phức tạp mà giới trẻ phải đối mặt trong kỷ nguyên số, dự án này mang đến một không gian an toàn, nơi các bạn trẻ có thể chia sẻ cảm xúc, suy nghĩ và tìm kiếm sự hỗ trợ từ cộng đồng. GenZ Mental Health không chỉ là nơi kết nối, mà còn cung cấp các công cụ chăm sóc tinh thần như thiền, âm nhạc chữa lành, và chatbot trí tuệ nhân tạo hỗ trợ 24/7, mang lại sự đồng hành cho các bạn trong những lúc khó khăn.",
    "GenZ Mental Health tập trung vào thế hệ GenZ – những người trẻ từ 14 đến 25 tuổi – nhóm đối tượng đang chịu nhiều áp lực từ cuộc sống hiện đại, từ học tập, công việc cho đến những ảnh hưởng tiêu cực từ mạng xã hội. Đây là thế hệ đang trải qua sự chuyển đổi lớn về nhận thức và cảm xúc trong một thế giới số hóa, và cần một nơi để chia sẻ, tìm kiếm sự hỗ trợ tinh thần đáng tin cậy và gần gũi.",
    "Trong thời đại mà các vấn đề về sức khỏe tinh thần đang trở thành một cuộc khủng hoảng, GenZ Mental Health nổi lên như một giải pháp cần thiết và cấp bách. Giới trẻ ngày nay phải đối mặt với áp lực vô hình từ mạng xã hội, kỳ vọng xã hội, và sự so sánh liên tục với người khác. Điều này dẫn đến tình trạng lo âu, trầm cảm, và mất kết nối với bản thân. GenZ Mental Health không chỉ là một nền tảng hỗ trợ mà còn là cầu nối để giới trẻ tìm lại sự cân bằng, an yên trong cuộc sống qua việc chia sẻ, học hỏi và nhận sự giúp đỡ từ cộng đồng và các chuyên gia.",
    "GenZ Mental Health cung cấp một loạt các dịch vụ và tính năng nhằm chăm sóc và cải thiện sức khỏe tinh thần một cách toàn diện: Không gian tương tác và chữa lành, nơi bạn có thể kết nối với những người bạn đồng cảm, chia sẻ suy nghĩ và nhận lại sự động viên chân thành; Chatbot trí tuệ nhân tạo hoạt động 24/7, luôn sẵn sàng lắng nghe và đồng hành cùng bạn qua những tâm sự riêng tư; Gửi phiền muộn, một không gian riêng tư để bạn giải tỏa những nỗi lo, cảm xúc tiêu cực một cách an toàn và không lo bị đánh giá; Blog chuyên về sức khỏe tinh thần, nơi bạn có thể tìm thấy những bài viết hữu ích, những lời khuyên chuyên sâu về các vấn đề sức khỏe tinh thần; Nhật ký cá nhân, công cụ để ghi lại và theo dõi cảm xúc hằng ngày, giúp bạn hiểu rõ hơn về bản thân qua từng giai đoạn; Bài kiểm tra tự đánh giá sức khỏe tinh thần giúp bạn nhận biết sớm những dấu hiệu của lo âu, trầm cảm hoặc các vấn đề khác; Kết nối với chuyên gia tâm lý, dễ dàng đặt lịch và trò chuyện với những chuyên gia đáng tin cậy.",
    "Việc tham gia cộng đồng GenZ Mental Health vô cùng đơn giản. Bạn chỉ cần đăng ký tài khoản trên nền tảng và bắt đầu tham gia vào các hoạt động như chia sẻ suy nghĩ, kết nối với những thành viên khác, và sử dụng các công cụ chăm sóc sức khỏe tinh thần. Cộng đồng luôn mở cửa đón nhận mọi bạn trẻ, với tinh thần cởi mở, không phán xét và luôn sẵn sàng lắng nghe."
  ];

  return (
    <div className="flex flex-col overflow-auto">
      <div className="flex flex-col items-center justify-center">
        <p className="font-bold text-3xl text-[#0F52BA]">Q & A</p>
      </div>
      <div className="flex flex-row py-6">
        <div className="flex w-[50%] items-center justify-center px-8">
          <div className="w-[700px] space-y-1 px-5">
            <Collapse
              accordion
              collapsible="header"
              expandIconPosition={expandIconPosition}
              className="space-y-5 bg-[#D7EFFF]"
              style={{ border: "none" }}
            >
              {questions.map((question, index) => (
                <Collapse.Panel
                  header={<p className="font-bold text-lg text-[#0F52BA]">{question}</p>}
                  key={index + 1}
                  className="transition-all duration-300 hover:bg-[#F0F8FF]" // Hover effect added here
                >
                  <div className="bg-white p-4 rounded-lg shadow-lg">
                    <p className="flex items-center text-base text-gray-700">
                      <CheckCircleOutlined className="text-[#0F52BA] mr-2" />
                      {answers[index]}
                    </p>
                  </div>
                </Collapse.Panel>
              ))}
            </Collapse>
          </div>
        </div>
        <div className="flex w-[50%] items-center justify-center px-10">
          <Image
            className="object-contain"
            width={500}
            height={500}
            alt="logo"
            src={"/landing5.svg"}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage5;
