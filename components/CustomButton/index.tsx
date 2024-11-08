import React from "react";
import { CustomButtonProps } from "../../type";

const CustomButton = ({
  isDisabled,
  btnType,
  containerStyles,
  textStyles,
  title,
  rightIcon,
  leftIcon,
  iconOnly,
  minimal,
  smallSize,
  mediumSize,
  largeSize,
  handleClick,
}: CustomButtonProps) => {
  return (
    <button
      disabled={isDisabled}
      type={btnType || "button"}
      className={`${containerStyles} flex justify-center items-center text-white h-11 bg-[#3563E9] hover:shadow-button duration-100  ${
        minimal ? "bg-white" : ""
      } ${smallSize ? "h-[29px] px-4 py-[5px]" : ""} ${
        mediumSize ? "h-[37px] px-4 py-[9px]" : ""
      } ${largeSize ? "h-[53px] w-[89px] px-6 py-[13px]" : ""}`}
      onClick={handleClick}
    >
      {leftIcon && <div className="relative mr-2">{leftIcon}</div>}
      {!iconOnly ? (
        <span className={`font-semibold text-base ${textStyles}`}>{title}</span>
      ) : (
        <div className="relative w-6 h-6">{iconOnly}</div>
      )}
      {rightIcon && <div className="relative ml-2">{rightIcon}</div>}
    </button>
  );
};

export default CustomButton;
