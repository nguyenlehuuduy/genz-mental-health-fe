"use client";
import { Button } from "antd";
import Image from "next/image";
import { useState } from "react";

const LandingPage6 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      description:
        "GenZ Mental Health thực sự đã thay đổi hoàn toàn cách nhìn của tôi về sức khỏe tinh thần. Nhờ sự kết nối, chia sẻ và các tính năng hữu ích, tôi ngày càng cảm thấy sức khỏe tinh thần của mình được cải thiện đáng kể. Cảm ơn các bạn đã tạo ra một không gian tuyệt vời đến vậy!",
      name: "Nguyễn Lê Hữu Duy",
      age: 20,
      imgSrc: "/huuduy.svg", 
    },
    
    {
      description:
        "Ứng dụng này đã giúp tôi tìm thấy những người bạn cùng hoàn cảnh và chia sẻ với nhau những kinh nghiệm quý báu. Tôi cảm thấy mình không còn đơn độc trong cuộc chiến này.",
      name: "Nguyễn Khắc Thịnh",
      age: 22,
      imgSrc: "/khacthinh.svg",
    },
    {
      description:
        "Tôi đã thử nhiều ứng dụng khác nhau nhưng GenZ Mental Health là ứng dụng đầu tiên tôi thực sự thấy hiệu quả. Cảm ơn các bạn!",
      name: "Nguyễn Hải Dương",
      age: 25,
      imgSrc: "/haiduong.svg",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <p className="font-bold text-3xl py-5">Chia sẻ từ người dùng</p>
      </div>
      <div className="flex flex-row w-[1200px] h-[400px] bg-[#D7EFFF]">
        <div className="flex flex-col w-[40%] justify-center mb-10 py-5">
          <div className="border-r-[1px] border-[#a4a5aa] justify-items-center px-20">
            <div className="">
              <p className="font-semibold text-lg py-2">LỜI CHỨNG THỰC</p>
              <p className="font-bold text-3xl py-2">
                Mọi người nói gì về GenZ Mental Health
              </p>
              <p className="font-thin text-lg py-2">
                Thật tuyệt vời khi nhận được những lời động viên và góp ý của
                các bạn
              </p>
            </div>
          </div>
        </div>
        <div className="relative flex flex-col w-[60%] items-center justify-center ">
          <div className="relative w-full h-full flex items-center justify-center">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`${
                  index === currentSlide ? "block" : "hidden"
                } w-full h-full flex flex-col items-start justify-center px-10 transition-opacity duration-500`}
              >
                <p className="font-light text-lg py-2 px-10">{slide.description}</p>
                <div className="flex items-center py-5 px-10">
                  <Image
                    className="object-contain"
                    width={50}
                    height={50}
                    alt="logo"
                    src={slide.imgSrc}
                  />
                  <div className="flex flex-col px-5">
                    <p className="font-bold text-lg">{slide.name}</p>
                    <p>{slide.age} Tuổi</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute flex bottom-10 justify-end w-full px-20  gap-5" >
            <Button
              onClick={prevSlide}
              className="p-0 border-none w-[50px] h-[50px] bg-transparent rounded-full"
            >
              <Image
                className="object-contain"
                width={35}
                height={35}
                alt="previous"
                src="/icons-system/GreySolidIcon/arrow-sm-left.svg"
              />
            </Button>
            <Button
              onClick={nextSlide}
              className="p-0 border-none w-[50px] h-[50px] bg-transparent rounded-full"
            >
              <Image
                className="object-contain"
                width={35}
                height={35}
                alt="next"
                src="/icons-system/GreySolidIcon/arrow-sm-right.svg"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage6;
