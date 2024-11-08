"use client";

import { DetailMyselfResponseForCard } from "@/service/accountService";
import Image from "next/image";
import { AvatarAccount } from "../../../../components";
import { UserOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import ModalUpdateBanner from "../../../../components/ModalUpdateBanner";
import { useState } from "react";
import ModalUpdateAvata from "../../../../components/ModalUpdateAvata";
import { FavoriteTagForCard } from "@/service/favoriteTagService";
import updateInfoAccount from "./action";
import moment from "moment";
import { useRouter } from "next/navigation";

type PropsComponent = {
  profile: DetailMyselfResponseForCard;
  listFavorite: Array<FavoriteTagForCard>;
};

type FieldType = {
  fullName?: string;
  phone?: string;
  aboutMe?: string;
  nickName?: string;
  birth?: string;
  address?: string;
  favorite?: Array<string>;
  email?: string;
};

export default function SettingAccountPageView(props: PropsComponent) {
  const useRoute = useRouter();
  const { user } = props.profile;
  const [showUpdateBanner, setShowUpdateBanner] = useState<boolean>(false);
  const [showUpdateAvata, setShowUpdateAvata] = useState<boolean>(false);
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    updateInfoAccount({
      aboutMe: values.aboutMe ?? "",
      address: values.address ?? "",
      birth: moment(values.birth, "DD/MM/YYYY").toISOString() ?? "",
      favorite: values.favorite ?? [],
      fullName: values.fullName ?? "",
      nickName: values.nickName ?? "",
      phone: values.phone ?? "",
    }).then((rs) => {
      if (rs) {
        useRoute.push("/myself");
      }
    });
  };
  return (
    <div className="w-full p-2 bg-white rounded-md overflow-y-auto h-[calc(100vh-70px)]">
      <div className="relative w-full h-[200px] rounded-md overflow-hidden flex items-center justify-center">
        {user.banner ? (
          <Image
            src={user.banner}
            fill
            quality={100}
            className="object-cover"
            alt="banner account"
          />
        ) : (
          <span className="text-gray-500">Chưa có thông tin banner</span>
        )}
        <div
          className="absolute bottom-2 right-2 flex gap-3 bg-white rounded-md p-2 cursor-pointer"
          onClick={() => setShowUpdateBanner(true)}
        >
          <p>Thêm ảnh bìa</p>
          <Image
            src={"icons-system/GreySolidIcon/camera.svg"}
            alt="icon"
            width={18}
            height={18}
            className=""
          />
        </div>
      </div>
      <div className="w-full flex mt-2 justify-between">
        <div className="w-[90%] flex flex-col gap-y-1">
          <div className="flex w-full gap-x-4 py-4 px-1">
            <div className="relative">
              <AvatarAccount
                width={150}
                height={150}
                filePath={user.avata}
                name={user.full_name}
              />
              <div
                onClick={() => setShowUpdateAvata(true)}
                className="absolute bottom-0 left-[79%] border w-[30px] flex gap-3 bg-slate-300 rounded-md p-1 cursor-pointer"
              >
                <Image
                   src={"icons-system/GreySolidIcon/camera.svg"}
                   alt="icon"
                   width={18}
                   height={18}
                   className=""
                />
              </div>
            </div>

            <div className="flex flex-col justify-center w-[90%]">
              <p className="text-[18px] font-medium text-[#505050]">
                {user.nick_name
                  ? user.full_name + "(" + user.nick_name + ")"
                  : user.full_name}
              </p>
              <p className="text-[#666666]">{user.about_me}</p>
              {/* TODO: favorite subject of account */}
              <div className="flex gap-3 mt-3 text-[#666666]">
                {user.favorite?.map((item, index) => (
                  <label key={index}>{item.name_favorite}</label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <span className="font-medium text-[16px]">Thông tin cá nhân</span>
        <Form
          className="grid grid-cols-2 gap-4 mt-5 justify-items-stretch w-[90%] mx-auto"
          layout="vertical"
          name="basic"
          initialValues={{
            aboutMe: user.about_me,
            address: user.address,
            birth: moment(user.birth).format("DD/MM/YYYY"),
            favorite: user?.favorite?.map((item) => item.id) ?? [],
            fullName: user.full_name,
            nickName: user.nick_name,
            phone: user.phone,
            email: user.email,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            name="fullName"
            label="Họ và tên"
            labelAlign="right"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input prefix={
              <Image
                  src={"/icons-system/GreySolidIcon/user.svg"}
                  alt="icon"
                  width={18}
                  height={18}
                />} />
          </Form.Item>

          <Form.Item<FieldType> name="nickName" label="Biệt danh">
            <Input
              prefix={
                <Image
                  src={"/icons-system/GreySolidIcon/user-circle.svg"}
                  alt="icon"
                  width={18}
                  height={18}
                />
              }
            />
          </Form.Item>

          <Form.Item<FieldType> label="Email" name="email">
            <Input
              disabled
              prefix={
                <Image
                  src={"/icons-system/GreySolidIcon/mail.svg"}
                  alt="icon"
                  width={18}
                  height={18}
                />
              }
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input
              prefix={
                <Image
                  src={"/icons-system/GreySolidIcon/phone.svg"}
                  alt="icon"
                  width={18}
                  height={18}
                />
              }
            />
          </Form.Item>

          <Form.Item<FieldType> name="birth" label="Ngày sinh nhật">
            <Input placeholder="DD/MM/YYYY" defaultValue="" />
          </Form.Item>

          <Form.Item<FieldType> name="address" label="Địa chỉ">
            <Input
              prefix={
                <Image
                  src={"/icons-system/GreySolidIcon/location.svg"}
                  alt="icon"
                  width={18}
                  height={18}
                />
              }
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="aboutMe"
            className="col-span-2"
            label="Giới thiệu bản thân"
          >
            <TextArea
              autoSize={{ minRows: 7 }}
              placeholder="Bạn nghĩ gì về chữa lành? Với tôi chữa lành chính là làm điều tôi cảm thấy là chính mình nhất"
            />
          </Form.Item>

          <Form.Item<FieldType>
            className="col-span-2"
            name={"favorite"}
            rules={[
              { required: true, message: "Vui lòng chọn sở thích của bạn!" },
            ]}
            label="Mục yêu thích"
            labelAlign="right"
          >
            <Select
              mode="multiple"
              size={"middle"}
              placeholder="Chọn lĩnh vực bạn tâm đắc"
              onChange={() => {}}
              style={{ width: "100%" }}
              options={props.listFavorite.map((item) => ({
                label: item.name_favorite,
                value: item.id,
              }))}
            />
          </Form.Item>
         <Form.Item
            wrapperCol={{ offset: 8, span: 16 }}
            className=" pr-14 w-[120px] col-start-2"
          >
           
            <Button className="bg-[#0F52BA] text-white h-[40px] w-[200px] text-lg font-semibold" htmlType="submit">
              Lưu thay đổi
            </Button>
          </Form.Item>
        </Form>
      </div>

      {showUpdateBanner && (
        <ModalUpdateBanner
          closeModal={() => setShowUpdateBanner(false)}
          isOpen={showUpdateBanner}
        />
      )}

      {showUpdateAvata && (
        <ModalUpdateAvata
          closeModal={() => setShowUpdateAvata(false)}
          isOpen={showUpdateAvata}
        />
      )}
    </div>
  );
}
