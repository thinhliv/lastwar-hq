import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import { AuthProvider } from "@/components/auth/AuthProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LASTWAR HQ — Tools & Community",
  description:
    "Cộng đồng toàn cầu cho game Last War: Survival. Tools, Chat, News, Guides và nhiều hơn nữa.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0f172a] text-slate-100">
        <AuthProvider>
          <main className="flex-1 pb-20">{children}</main>
          <BottomNav />
        </AuthProvider>
      </body>
    </html>
  );
}
