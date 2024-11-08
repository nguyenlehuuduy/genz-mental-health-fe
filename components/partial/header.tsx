"use client";

import { Input, Popover } from "antd";
import Image from "next/image";
import Link from "next/link";
import { MessageIcon, NotifyIcon, SearchIcon, SettingIcon } from "../../icons";
import NotifyPopup from "../NotifyPopup";
import { MyselfForCard } from "@/service/accountService";
import ProfilePopup from "../ProfilePopup";
import ModalSetting from "../ModalSetting";
import React, { useState, useEffect, Fragment } from "react";
import { RootState } from "../../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../redux/actions/auth";
import useDebounce from "../UseDebounce";
import SearchWrapper from "../SearchWrapper";
import { getAccountsByName, getPostsByName } from "../SearchWrapper/action";
import AvatarAccount from "../Avata";
import { memo } from "react";

import {
  SearchAccountForCard,
  SearchPostTypeForCard,
} from "@/service/searchService";
import { NotificationForCard } from "@/service/notificationService";
import { socketService } from "@/socket";
import ChatList from "../ChatList";
import { GuestAccountType } from "@/lib/type";
import FormLogin from "../FormLogin";
import FormRegister from "../FormRegister";

type PropsComponent = {
  profile: MyselfForCard;
  listNotification: Array<NotificationForCard>;
  sessionKey: string;
  guestAccountInfo?: GuestAccountType;
};

export default memo(
  function Header({
    profile,
    listNotification,
    sessionKey,
    guestAccountInfo,
  }: PropsComponent) {
    const dispatch = useDispatch();
    dispatch(getCurrentUser(profile));
    const user = useSelector((state: RootState) => state.auth.user);
    const roomsMessage = useSelector((state: RootState) => state.rooms.rooms);
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [open, setOpen] = useState(false);

    socketService.connectWithAuthToken(sessionKey ?? "");

    const [searchAccountResult, setSearchAccountResult] = useState<
      SearchAccountForCard[]
    >([]);
    const [searchPostResult, setSearchPostResult] = useState<
      SearchPostTypeForCard[]
    >([]);

    const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    };

    const debounced = useDebounce(searchValue, 800);

    useEffect(() => {
      if (!debounced) {
        setOpen(false);
        setSearchAccountResult([]);
        return;
      }
      const fetchApi = async () => {
        const resultAccounts = await getAccountsByName(debounced);
        const resultPosts = await getPostsByName(debounced);
        setSearchAccountResult(resultAccounts ?? []);
        setSearchPostResult(resultPosts ?? []);
        setOpen(true);
      };
      fetchApi();
    }, [debounced]);

    const handleVisibleChange = (visible: boolean) => {
      setOpen(visible);
    };

    const handleInputOpen = () => {
      if (searchValue) {
        setOpen(true);
      }
    };

    const unseenCount = roomsMessage.filter(
      (room) => room.isSeen === false && room.idLastSendingUser !== user?.id,
    ).length;

    useEffect(() => {
      socketService.joinRoomNotification(user?.id);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [isOpenRegister, setIsOpenRegister] = useState<boolean>(false);
    const [isOpenLogin, setIsOpenLogin] = useState<boolean>(false);

    const openLogin = () => {
      setIsOpenLogin(true);
      setIsOpenRegister(false);
    };

    const openRegister = () => {
      setIsOpenRegister(true);
      setIsOpenLogin(false);
    };

    return (
      <div className="w-full h-[60px] fixed inset-0 flex items-center bg-white z-[10]">
        <div className="w-[1140px] mx-auto flex justify-evenly items-center py-3 gap-3">
          <Link
            className="flex-none"
            href={`${sessionKey ? "/home" : "/landingpage"}`}
          >
            <Image
              src="/logo_mental_health.png"
              alt="logo mental health"
              width={110}
              height={30}
              className="object-contain"
            />
          </Link>
          <Popover
            trigger="contextMenu"
            className={`${sessionKey ? "w-[500px]" : "w-[200px]"}`}
            content={
              <SearchWrapper
                listAccounts={searchAccountResult}
                listPosts={searchPostResult}
                onItemSelect={() => setOpen(false)}
              />
            }
            open={open}
            onOpenChange={handleVisibleChange}
          >
            <Input
              className="max-w-[500px] h-[40px] text-[#666666] bg-gray-100 rounded-3xl"
              value={searchValue}
              variant="borderless"
              onChange={onSearchChange}
              onFocus={handleInputOpen}
              onClick={handleInputOpen}
              size="middle"
              placeholder="Tìm kiếm bài viết và tài khoản"
              prefix={
                <Image
                  src="icons-system/GreySolidIcon/search.svg"
                  width={24}
                  height={24}
                  alt="icon image gallery"
                  className="rounded-none cursor-pointer"
                />
              }
              suffix={
                <Image
                  src="icons-system/GreySolidIcon/adjustments.svg"
                  width={24}
                  height={24}
                  alt="icon image gallery"
                  className="rounded-none cursor-pointer"
                />
              }
              style={{ paddingLeft: "24px", paddingRight: "12px" }}
            />
          </Popover>
          <div
            className={`flex gap-3 ${sessionKey && "max-w-[300px]"} w-full h-full justify-end items-center`}
          >
            {!sessionKey && (
              <div className="flex gap-5 mr-10">
                <Link href={"/landingpage"} className="font-bold text-blue-600">
                  GenZ MTH
                </Link>
                <Link href={"/blog"}>Dịch vụ</Link>
                <Link href={"/blog"}>Kết nối</Link>
                <Link href={"/blog"}>Blog</Link>
                <Link href={"/blog"}>Về chúng tôi</Link>
              </div>
            )}
            {sessionKey ? (
              <Fragment>
                <Popover trigger="click" content={<ChatList />}>
                  <div className="relative p-2 rounded-full border flex justify-center items-center">
                    <Image
                      src="icons-system/GreySolidIcon/chat-header.svg"
                      width={20}
                      height={20}
                      alt="icon save post"
                    />
                    {unseenCount > 0 && (
                      <span className="absolute w-4 h-4 top-0 right-0 bg-[#0866FF] text-center font-medium text-xs text-white rounded-full">
                        {unseenCount}
                      </span>
                    )}
                  </div>
                </Popover>
                <NotifyPopup listNotifi={listNotification ?? []}>
                  <div className="p-2 rounded-full border flex justify-center items-center cursor-pointer">
                    <NotifyIcon width={20} height={20} />
                  </div>
                </NotifyPopup>
                <div
                  className="p-2 rounded-full border flex justify-center items-center"
                  onClick={() => setIsOpen(true)}
                >
                  <Image
                    src="icons-system/GreySolidIcon/cog.svg"
                    width={20}
                    height={20}
                    alt="icon save post"
                  />
                </div>
              </Fragment>
            ) : (
              <div className="flex gap-3">
                <div
                  className="text-white w-[140px] h-[35px] text-center cursor-pointer flex items-center justify-center rounded-[28px] bg-[#0A68EB]"
                  onClick={openLogin}
                >
                  Đăng nhập
                </div>
                <p
                  className="text-white w-[140px] h-[35px] text-center cursor-pointer flex items-center justify-center rounded-[28px] bg-[#0A68EB]"
                  onClick={openRegister}
                >
                  Đăng ký
                </p>
              </div>
            )}

            <ProfilePopup
              guestAccountInfo={guestAccountInfo}
              openLogin={openLogin}
              openRegister={openRegister}
            >
              <div className="relative cursor-pointer">
                <AvatarAccount
                  filePath={user?.avata ?? guestAccountInfo?.avatar}
                  name={user?.full_name ?? guestAccountInfo?.name ?? "MH"}
                />
              </div>
            </ProfilePopup>
          </div>
          <ModalSetting isOpen={isOpen} closeModal={() => setIsOpen(false)} />
        </div>

        <FormLogin
          isOpenLogin={isOpenLogin}
          closeModalLogin={() => setIsOpenLogin(false)}
          openRegister={openRegister}
        />
        <FormRegister
          isOpenRegister={isOpenRegister}
          closeModalRegister={() => setIsOpenRegister(false)}
          openLogin={openLogin}
        />
      </div>
    );
  },
  (prevProps, nextProps) =>
    JSON.stringify(prevProps) === JSON.stringify(nextProps),
);
