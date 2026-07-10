import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hero Tier List — Season 6 | LASTWAR HQ",
  description:
    "Bảng xếp hạng hero Last War Season 6. SSR, SR, R heroes từ S+ đến C. Tìm hero mạnh nhất, synergy và meta picks.",
  openGraph: {
    title: "Hero Tier List — Season 6 | LASTWAR HQ",
    description: "Bảng xếp hạng hero mạnh nhất Last War: Survival Season 6",
    type: "website",
    locale: "vi_VN",
  },
};

export default function HeroTierLayout({ children }: { children: React.ReactNode }) {
  return children;
}
