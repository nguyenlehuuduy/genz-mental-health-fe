import React from "react";
import {
  LandingPage1,
  LandingPage2,
  LandingPage3,
  LandingPage4,
  LandingPage5,
  LandingPage6,
} from "../../../../components";

const LandingPage = () => {
  return (
    <div>
      <div className="w-full h-[550px] bg-[#D7EFFF]">
        <div className="px-5">
          <LandingPage1 />
        </div>
      </div>
      <div className="w-full h-[700px] bg-[#ffffff] px-5 py-5">
        <LandingPage2 />
      </div>
      <div className="w-full h-[700px] bg-[#D7EFFF] px-5 py-5">
        <LandingPage3 />
      </div>
      <div className="w-full h-[700px] bg-[#ffffff] px-5 py-5">
        <LandingPage4 />
      </div>
      <div className="w-full min-h-[700px] bg-[#D7EFFF] px-5 py-5">
        <LandingPage5 />
      </div>
      <div id="services" className="w-full h-[600px] bg-[#ffffff] px-5 py-5">
        <LandingPage6 />
      </div>
    </div>
  );
};
export default LandingPage;
