import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculators — Boss, Hero, Resource, Troop | LASTWAR HQ",
  description:
    "Bộ công cụ tính toán cho Last War: Survival. Tính boss damage, hero EXP, resource production, troop cost.",
};

export default function CalculatorsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
