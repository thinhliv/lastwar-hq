import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculators — Boss & Hero EXP",
  description:
    "Tra cứu sức mạnh boss Restricted Area và tính Hero EXP cho Last War: Survival. Dữ liệu thật từ cpt-hedge.com.",
};

export default function CalculatorsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
