"use client";
import React, { Fragment } from "react";
import { Button, Popover } from "antd";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { RootState } from "../../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import AvatarAccount from "../Avata";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { GuestAccountType } from "@/lib/type";
import { getCurrentUser } from "../../redux/actions/auth";

type PropComponent = {
  guestAccountInfo?: GuestAccountType;
  openLogin: () => void;
  openRegister: () => void;
};

const ProfileCard = (prop: PropComponent) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const cookies = new Cookies(null, { path: "/" });
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = () => {
    cookies.remove("access_token");
    dispatch(getCurrentUser(undefined));
    router.replace("/landingpage");
  };
  return (
    <div className="w-[300px] min-h-[400px]">
      <div className="relative">
        <Image
          src={
            user?.banner ??
            prop.guestAccountInfo?.banner ??
            "https://cdn.dummyjson.com/cache/100x100/bitter-16/cccccc-black/2535838d9d0ccf91d287ae796ce1a914.webp"
          }
          width={200}
          height={200}
          alt="image banner account"
          className="w-full object-cover h-[100px] rounded-md"
        />

        <div className="relative w-[80px] h-[80px] mx-auto mt-1">
          <AvatarAccount
            width={80}
            height={80}
            filePath={user?.avata ?? prop.guestAccountInfo?.avatar}
            name={user?.full_name ?? prop.guestAccountInfo?.name ?? "MTH"}
          />
        </div>

        <div className="absolute m-auto right-0 left-0 top-[190px] flex flex-col justify-center items-center text-center">
          <p className="font-medium text-[15px]">{user?.full_name}</p>
          <label>{user?.nick_name}</label>
          <div>{user?.about_me}</div>
          <div className="flex flex-col justify-start items-start w-full">
            <label className="font-medium my-3">Thông tin: </label>
            {user ? (
              <Fragment>
                <p className="truncate w-full">Email: {user?.email}</p>
                <p className="truncate w-full">
                  Ngày sinh: {formatDate(user?.birth, "DD/MM/YYYY")}
                </p>
                <p className="truncate w-full">Số điện thoại: {user?.phone}</p>
              </Fragment>
            ) : (
              <Fragment>
                <b>Tài khoản khách tham quan</b>
                <p>Tên tài khoản khách: {prop.guestAccountInfo?.name}</p>
                <i className="mt-3">
                  Đăng ký tài khoản để trải nghiệm nhiều hơn nhé các cậu!
                </i>
              </Fragment>
            )}
          </div>
          {user ? (
            <div className="w-full flex mt-5 justify-between">
              <Button>
                <Link href={"/myself"}>Xem chi tiết</Link>
              </Button>
              <Button danger onClick={() => handleLogout()}>
                Đăng xuất
              </Button>
            </div>
          ) : (
            <div className="w-full flex mt-5 justify-between">
              <Button onClick={prop.openRegister}>Đăng kí</Button>
              <Button onClick={prop.openLogin} type="primary">
                Đăng nhập
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProfilePopup = ({
  children,
  guestAccountInfo,
  openLogin,
  openRegister,
}: Readonly<{
  children: React.ReactNode;
  guestAccountInfo?: GuestAccountType;
  openLogin: () => void;
  openRegister: () => void;
}>) => (
  <Popover
    content={
      <ProfileCard
        openLogin={openLogin}
        openRegister={openRegister}
        guestAccountInfo={guestAccountInfo}
      />
    }
    trigger="click"
  >
    {children}
  </Popover>
);

export default ProfilePopup;
