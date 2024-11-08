import Image from "next/image";
import React from "react";

const ProfessionalCard = () => {
  return (
    <div className="max-w-[248px] h-auto flex flex-col items-center p-4 border rounded-[20px] gap-2">
      <div className="relative w-[200px] h-[160px]">
        <Image
          src="https://i.pinimg.com/564x/93/ed/71/93ed71f506e89bc5adc32020056afe97.jpg"
          fill
          alt="avatar"
          objectFit="cover"
          className="rounded-2xl"
        />
      </div>
      <p className="font-medium text-[#222222] text-lg">Dr. Thùy Trang</p>
      <p className="font-bold text-sm text-[#3973E1]">
        Nhà tâm lý học lâm sàng
      </p>
      <p className="font-normal text-[#222222] text-xs text-center">
        Xuất sắc lâm sàng về sức khỏe tâm thần. Bác sĩ tâm lý xuất sắc
      </p>
      <button className="bg-[#0F52BA] px-10 py-2 rounded-full text-xs text-white font-bold">
        Kết nối
      </button>
    </div>
  );
};

export default ProfessionalCard;
