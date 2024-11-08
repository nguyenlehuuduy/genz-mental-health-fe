import type { Metadata } from "next";
import "./globals.css";
import ProviderRedux from "../../redux/Provider";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "GenZ Mental Health",
  description: "Nền Tảng Mạng Xã Hội Hỗ Trợ Cải Thiện Sức Khỏe Tinh Thần Dành Cho Giới Trẻ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={"vn"}>
      <body>
        <Fragment>
          <ProviderRedux>{children}</ProviderRedux>
        </Fragment>
      </body>
    </html>
  );
}
