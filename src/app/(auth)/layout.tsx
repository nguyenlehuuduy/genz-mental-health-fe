import type { Metadata } from "next";
import { FooterLanding, HeaderLanding } from "../../../components";
import { cookies } from "next/headers";
import { COOKIE_ACCESS_TOKEN_KEY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "GenZ Mental Health",
  description: "Nền Tảng Mạng Xã Hội Hỗ Trợ Cải Thiện Sức Khỏe Tinh Thần Dành Cho Giới Trẻ",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const sessionKey = cookieStore.get(COOKIE_ACCESS_TOKEN_KEY)?.value;
  
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="relative bg-white w-full h-full ">
        <div className="px-4 bg-[#D7EFFF]">
          <HeaderLanding sessionKey={sessionKey} />
        </div>
        {children}
        <div className="bg-[#D7EFFF] px-5">
          <FooterLanding />
        </div>
      </body>
    </html>
  );
}
