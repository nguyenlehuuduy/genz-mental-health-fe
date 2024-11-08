"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import CustomButton from "../CustomButton";
import {
  BT_LOGIN,
  LB_ALERT_ACCOUNT_YET,
  LB_OR,
  LB_WELCOME_LOGIN,
  L_FORGOT_PASS,
  L_REGISTER,
  PL_EMAIL,
  PL_PASSWORD,
  P_FORGOT_PASS,
  L_CONTENT_WEB,
} from "@/util/TextContants";
import { Button, Input, Modal } from "antd";
import { ActionLoginState, login } from "./action";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";

interface FormLoginProps {
  isOpenLogin: boolean;
  closeModalLogin: () => void;
  openRegister: () => void;
}

const defaultData = {
  email: "",
  password: "",
};
const initialState: ActionLoginState = {
  validate: defaultData,
  success: false,
};

const FormLogin: React.FC<FormLoginProps> = ({
  isOpenLogin,
  closeModalLogin,
  openRegister,
}) => {
  const [{ validate, success }, formAction] = useFormState(login, initialState);
  const router = useRouter();
  useEffect(() => {
    if (success) {
      router.replace("/home");
      closeModalLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);
  return (
    <Modal
      open={isOpenLogin}
      onCancel={closeModalLogin}
      width={500}
      footer={null}
      closable={false}
      style={{ top: 80 }}
    >
      <div className="max-w-[600px] max-h-[600px] items-center">
        <div className="flex flex-col justify-center md:p-8 ">
          <div className="flex flex-col items-center md:mb-0 mb-10">
            <p className="text-[#3D3D3D] text-[40px] font-bold items-center">
              {LB_WELCOME_LOGIN}
            </p>
            <span className=" mt-[-2px] top-[55px] text-[#3D3D3D] ">
              {L_CONTENT_WEB}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center md:w-[400px] mx-auto ">
          <form action={formAction}>
            <div className="flex flex-col gap-4">
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

              <Button
                htmlType="submit"
                className="bg-[#0A68EB] text-white text-lg h-[50px] md:h-[50px]"
              >
                {BT_LOGIN}
              </Button>
            </div>
          </form>
          <p className="md:text-lg text-[#3D3D3D] text-center my-3">
            {P_FORGOT_PASS}
            <span className="text-[#0F52BA] font-bold cursor-pointer ml-2">
              {L_FORGOT_PASS}
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

          <p className="md:text-lg text-[#3D3D3D] text-center my-5">
            {LB_ALERT_ACCOUNT_YET}
            <span
              className="md:text-[#0F52BA] font-bold cursor-pointer ml-2"
              onClick={openRegister}
            >
              {L_REGISTER}
            </span>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default FormLogin;
