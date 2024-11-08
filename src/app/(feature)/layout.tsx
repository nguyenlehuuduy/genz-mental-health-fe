import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GenZ Mental Health",
  description: "Nền Tảng Mạng Xã Hội Hỗ Trợ Cải Thiện Sức Khỏe Tinh Thần Dành Cho Giới Trẻ",
};

export default function FeatureLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="relative bg-white w-full h-screen ">{children}</body>
    </html>
  );
}
