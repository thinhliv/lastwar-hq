import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import SearchTrigger from "@/components/SearchTrigger";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://footzone.vn"),
  title: {
    default: "Monica Bot — Trợ Lý Tác Chiến Last War: Survival | Team Murphy",
    template: "%s | Monica Bot - Team Murphy",
  },
  description:
    "Monica Bot đại lý chính thức Team Murphy: công cụ hỗ trợ tự động hóa thông minh cho game Last War: Survival trên PC & giả lập. Kích hoạt tự động qua Telegram bot trong 15 giây.",
  manifest: "/manifest.json",
  openGraph: {
    title: "Monica Bot — Trợ Lý Tác Chiến Last War: Survival | Team Murphy",
    description:
      "Tối ưu sự kiện, tự động hóa farm & rally, quản lý nhiều tài khoản Last War: Survival an toàn và nhẹ máy. Mua key tự động qua Telegram Bot.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0c0608] text-slate-100 selection:bg-red-600 selection:text-white">
        <SearchTrigger />
        <Navbar />
        <main className="flex-1 pb-20 md:pb-8">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
