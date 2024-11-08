import { COOKIE_ACCESS_TOKEN_KEY, COOKIE_ACCOUNT_GUEST } from "@/lib/constants";
import { getLoginAccount } from "@/service/accountService";
import { getListNotification } from "@/service/notificationService";
import { getAllRoomMessageAccount } from "@/service/roomMessageService";
import { getListTabMenu } from "@/service/tabMenuService";
import type { Metadata } from "next";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FooterLanding, HeaderSkeleton } from "../../../components";
import ProviderRedux from "../../../redux/Provider";
import dynamic from "next/dynamic";
import { convertParserString } from "@/lib/utils";
import { GuestAccountType } from "@/lib/type";

export const metadata: Metadata = {
  title: "GenZ Mental Health",
  description: "Nền Tảng Mạng Xã Hội Hỗ Trợ Cải Thiện Sức Khỏe Tinh Thần Dành Cho Giới Trẻ",
};

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  revalidateTag("get-valid-notification-cache");
  const listMenuTab = await getListTabMenu();
  const listRoomChat = await getAllRoomMessageAccount();
  const profile = await getLoginAccount();
  const listNotification = await getListNotification();
  const cookieStore = cookies();
  const sessionKey = cookieStore.get(COOKIE_ACCESS_TOKEN_KEY)?.value;
  const guestAccountInfo = convertParserString(
    cookieStore.get(COOKIE_ACCOUNT_GUEST)?.value ?? "[]",
  ) as GuestAccountType;
  const Header = dynamic(() => import("../../../components/partial/header"), {
    ssr: false,
    loading: () => <HeaderSkeleton />,
  });
  const UserSubLayout = dynamic(() => import("../../../components/UserSubLayout"), {
    ssr: false,
    loading: () => <HeaderSkeleton />,
  });

  return (
    <ProviderRedux>
      <body className="relative bg-[#f5f6f8]  overflow-y-auto">
        <Header
          guestAccountInfo={guestAccountInfo}
          sessionKey={sessionKey ?? ""}
          profile={profile!}
          listNotification={listNotification ?? []}
        />
        <UserSubLayout
          listMenuTab={listMenuTab}
          listRoomChat={listRoomChat}
          sessionKey={sessionKey}
        >
          {children}
        </UserSubLayout>
      </body>
    </ProviderRedux>
  );
}
