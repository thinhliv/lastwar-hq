import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import SearchTrigger from "@/components/SearchTrigger";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://footzone.vn"),
  title: {
    default: "LASTWAR HQ — Công cụ Last War: Survival",
    template: "%s | LASTWAR HQ",
  },
  description:
    "Công cụ tra cứu chính xác cho Last War: Survival: sức mạnh Boss Restricted Area, Hero EXP, và danh bạ server/alliance. Dữ liệu thật, không phỏng đoán.",
  manifest: "/manifest.json",
  openGraph: {
    title: "LASTWAR HQ — Công cụ Last War: Survival",
    description:
      "Boss power, Hero EXP và danh bạ server/alliance — dữ liệu thật cho Last War: Survival.",
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
      <body className="min-h-full flex flex-col bg-[#0f172a] text-slate-100">
        <SearchTrigger />
        <main className="flex-1 pb-20">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
