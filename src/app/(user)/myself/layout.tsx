import { getDetailMyselfAccount } from "@/service/accountService";
import { notFound } from "next/navigation";
import { getAllImagePublicByMyself } from "@/service/imageService";
import type { Metadata } from "next";
import Image from "next/image";
import { AvatarAccount } from "../../../../components";
import Link from "next/link";
import OptionManageAccount from "../../../../components/OptionManageAccount";
import OptionPost from "./optionPost";
import { getAllActionTargetAccount } from "@/service/actionTargetService";

export const metadata: Metadata = {
  title: "GenZ Mental Health",
  description: "Trang cá nhân",
};

export default async function FeatureLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getDetailMyselfAccount();
  const listImagePost = await getAllImagePublicByMyself();
  const listTargetAccount = await getAllActionTargetAccount();
  if (!profile) {
    notFound();
  }
  const { user } = profile;
  return (
    <div className="w-full">
      <div className="w-full p-2">
        <div className="relative w-full h-[200px] rounded-md overflow-hidden flex items-center justify-center border">
          {user.banner ? (
            <Image
              src={user.banner}
              fill
              quality={100}
              className="object-cover"
              alt="banner account"
            />
          ) : (
            <Image
              src="/banner_default.jpg"
              fill
              quality={100}
              className="object-cover"
              alt="banner account"
            />
          )}
        </div>
        <div className="w-full flex mt-2 justify-between">
          <div className="w-[65%] flex flex-col gap-y-1">
            <div className="flex w-full gap-4 bg-white rounded-md py-4 px-1">
              <AvatarAccount
                width={150}
                height={150}
                filePath={user.avata}
                name={user.full_name}
              />
              <div className="flex flex-col justify-center w-[70%]">
                <p className="text-[18px] font-medium text-[#505050]">
                  {user.nick_name
                    ? user.full_name + "(" + user.nick_name + ")"
                    : user.full_name}
                </p>
                <p className="text-[#666666]">{user.about_me}</p>
                <div className="flex gap-3 mt-3 text-[#666666]">
                  {profile.user.favorite?.map((item, index) => (
                    <label key={index}>{item.name_favorite}</label>
                  ))}
                </div>
              </div>
            </div>
            <OptionPost />
            <div className="flex flex-col gap-1 pb-20">{children}</div>
          </div>
          <div className="w-[33%]">
            <div className="w-full flex flex-col gap-1 overflow-y-auto  h-[calc(100vh-60px)] sticky top-0 bg-white p-3 rounded-md">
              <div className="flex w-full items-center gap-2 text-[14px] mb-2 justify-end">
                <div className="rounded-md border border-black px-3 py-1">
                  Tin nhắn
                </div>
                <Link
                  href={"/setting-account"}
                  className="rounded-md border border-black px-3 py-1"
                >
                  Chỉnh sửa
                </Link>
                <div className="flex items-center justify-center cursor-pointer gap-2 text-white bg-blue-500 h-full px-2 rounded-md">
                  <label className="text-sm cursor-pointer">Tạo bài viết</label>
                </div>
              </div>
              <OptionManageAccount
                profile={profile}
                listImagePost={listImagePost ?? []}
                listTargetAccount={listTargetAccount ?? []}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
