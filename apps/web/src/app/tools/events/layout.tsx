import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events — Countdown Timers | LASTWAR HQ",
  description:
    "Lịch sự kiện Last War: Survival với countdown timer real-time. Ammo Bonanza, Desert Treasure, Alliance War và nhiều sự kiện khác.",
  openGraph: {
    title: "Events — LASTWAR HQ",
    description: "Countdown timer và lịch sự kiện Last War: Survival",
    type: "website",
    locale: "vi_VN",
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
