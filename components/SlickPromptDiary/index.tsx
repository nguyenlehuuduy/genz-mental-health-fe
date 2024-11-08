"use client";

import Slider from "react-slick";
import { NextArrowIcon, PrevArrowIcon } from "../../icons";
import { useRef } from "react";
import { PromtDiaryForCard } from "@/service/diaryService";

export default function SlickPromptDiary({
  listPromt,
}: {
  listPromt: PromtDiaryForCard[];
}) {
  const sliderRef = useRef<Slider>(null);

  const renderArrows = () => {
    return (
      <div className="slider-arrow">
        <button
          className="arrow-btn prev"
          onClick={() => sliderRef.current?.slickPrev()}
        >
          <PrevArrowIcon width={25} height={25} />
        </button>
        <button
          className="arrow-btn next"
          onClick={() => sliderRef.current?.slickNext()}
        >
          <NextArrowIcon width={25} height={25} />
        </button>
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    customPaging: function () {
      return (
        <div className={`w-4 h-4 rounded-full border border-[#02607E]`}></div>
      );
    },
  };
  return (
    <div className="bg-[#F3FAFF] w-full relative pb-10 flex justify-center">
      {renderArrows()}
      <Slider ref={sliderRef} {...settings} className="w-full">
        {listPromt.map((item) => (
          <div key={item.id}>
            <div className="flex items-center justify-center">
              <i className="font-medium text-xl text-[#0F52BA] p-2">
                {item.content_prompt}
              </i>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
