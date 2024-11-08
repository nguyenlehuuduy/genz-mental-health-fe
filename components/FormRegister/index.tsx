"use client";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterType } from "../../type";
import InputControl from "../InputControl";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import CustomButton from "../CustomButton";
import {
  BT_REGISTER,
  ERROR_EMAIL_FORMAT,
  ERROR_EMAIL_NULL,
  ERROR_NAME,
  ERROR_PASSWORD_NULL,
  ERROR_REPASS,
  ERROR_REPASS_VALID,
  LB_ALERT_ACCOUNT_LOGIN_YET,
  LB_OR,
  LB_WELCOME_REGISTRATION,
  LB_WELCOME_REGISTER,
  L_LOGIN,
  PL_EMAIL,
  PL_NAME,
  PL_PASSWORD,
  PL_RE_PASSWORD,
  PL_FULLNAME,
} from "@/util/TextContants";
import { Button, Input, Modal } from "antd";
import { useRouter } from "next/navigation";
import { ActionRegisterState, register } from "./action";
import { useFormState } from "react-dom";
import { useEffect } from "react";

interface FormRegisterProps {
  isOpenRegister: boolean;
  closeModalRegister: () => void;
  openLogin: () => void;
}

const defaultData = {
  fullName: "",
  email: "",
  password: "",
};

const initialState: ActionRegisterState = {
  validate: defaultData,
  success: false,
};

const FormRegister: React.FC<FormRegisterProps> = ({
  isOpenRegister,
  closeModalRegister,
  openLogin,
}) => {
  const [{ validate, success }, formAction] = useFormState(
    register,
    initialState,
  );

  useEffect(() => {
    if (success) {
      openLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);
  return (
    <Modal
      open={isOpenRegister}
      onCancel={closeModalRegister}
      width={500}
      footer={null}
      closable={false}
      style={{ top: 80 }}
    >
      <div className="max-w-[600px] max-h-[600px]">
        <div className="flex flex-col justify-center mx-auto ">
          <div className="flex flex-col items-center md:mb-0 md:p-8">
            <p className="text-[#3D3D3D] text-[40px] font-bold items-center">
              {LB_WELCOME_REGISTRATION}
            </p>
            <span className="mt-[-2px] top-[55px] text-[#3D3D3D]">
              {LB_WELCOME_REGISTER}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center w-full md:w-[400px] mx-auto ">
          <form action={formAction}>
            <div className="flex flex-col gap-3">
              <Input
                name="fullName"
                placeholder={PL_FULLNAME}
                height={50}
                className="h-[50px] text-base "
              />
              <span className="invalid_err">{validate?.fullName}</span>
              <Input
                name="email"
                placeholder={PL_EMAIL}
                height={50}
                className="h-[50px] text-base "
              />
              <span className="invalid_err">{validate?.email}</span>
              <Input.Password
                name="password"
                placeholder={PL_PASSWORD}
                height={50}
                type="password"
                className="h-[50px] text-base"
              />
              <span className="invalid_err">{validate?.password}</span>
              <Input.Password
                name="confirmPassword"
                placeholder={PL_RE_PASSWORD}
                height={50}
                type="password"
                className="h-[50px] text-base"
              />
              <span className="invalid_err">{validate?.confirmPassword}</span>
              <Button
                htmlType="submit"
                className="bg-[#0A68EB] text-white text-lg h-[50px] md:h-[50px]"
              >
                {BT_REGISTER}
              </Button>
            </div>
          </form>
          <p className="md:text-lg text-[#3D3D3D] text-center my-3">
            {LB_ALERT_ACCOUNT_LOGIN_YET}
            <span
              className="md:text-[#0F52BA] font-bold cursor-pointer ml-2"
              onClick={openLogin}
            >
              {L_LOGIN}
            </span>
          </p>
          <div className="flex flex-row justify-center items-center gap-2 mb-3">
            <div className="w-full h-[1px] border border-[#00000080]"></div>
            <p className="md:text-lg text-[#00000080] text-center">{LB_OR}</p>
            <div className="w-full h-[1px] border border-[#00000080]"></div>
          </div>

          <CustomButton
            leftIcon={
              <Image
                src="/google_icon.png"
                width={35}
                height={35}
                alt="google icon"
              />
            }
            title="Tiếp tục với google"
            containerStyles="py-6 rounded-[10px] bg-[#F9F9F9] border gap-2"
            textStyles="text-[24px] font-bold text-[#3D3D3D]"
          />
        </div>
      </div>
    </Modal>
  );
};

export default FormRegister;
