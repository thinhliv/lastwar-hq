import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import SearchTrigger from "@/components/SearchTrigger";
import LiveStats from "@/components/LiveStats";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0c0608",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://monicabot.lol"),
  title: {
    default: "Monica Bot — Trợ Lý Tác Chiến Last War: Survival | Team Murphy",
    template: "%s | Monica Bot - Team Murphy",
  },
  description:
    "Monica Bot đại lý chính thức Team Murphy: công cụ hỗ trợ tự động hóa thông minh cho game Last War: Survival trên PC & giả lập. Kích hoạt tự động qua Telegram bot trong 15 giây.",
  icons: {
    icon: "/icon-192.png",
    shortcut: "/icon-192.png",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Monica Bot — Trợ Lý Tác Chiến Last War: Survival | Team Murphy",
    description:
      "Tối ưu sự kiện, tự động hóa farm & rally, quản lý nhiều tài khoản Last War: Survival an toàn và nhẹ máy. Mua key tự động qua Telegram Bot.",
    type: "website",
    images: ["/images/bot/monica-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} h-full antialiased overflow-x-hidden w-full`}>
      <body className="min-h-full flex flex-col bg-[#0c0608] text-slate-100 selection:bg-red-600 selection:text-white overflow-x-hidden w-full relative">
        <SearchTrigger />
        <Navbar />
        <main className="flex-1 w-full overflow-x-hidden">{children}</main>
        <div className="pb-20 md:pb-0">
          <LiveStats />
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
