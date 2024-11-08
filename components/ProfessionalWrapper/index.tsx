import React from "react";
import ProfessionalCard from "../ProfessionalCard";

const ProfessionalWrapper = () => {
  const professionalCards = new Array(9).fill(null);
  return (
    <div className="flex flex-col justify-center items-center bg-white px-5 py-3 gap-4">
      <p className="text-[#0F52BA] font-bold text-2xl">
        Gặp gỡ các chuyên gia của chúng tôi
      </p>
      <div className="grid grid-cols-3 gap-3">
        {professionalCards.map((_, index) => (
          <ProfessionalCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProfessionalWrapper;
