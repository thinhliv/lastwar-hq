"use client";

import { Home, Calculator, Server, Info } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";

const tabs = [
  { href: "/", labelKey: "nav.home", icon: Home, match: (p: string) => p === "/" },
  {
    href: "/tools/calculators",
    labelKey: "nav.calculators",
    icon: Calculator,
    match: (p: string) => p.startsWith("/tools/calculators"),
  },
  {
    href: "/tools/clan-finder",
    labelKey: "nav.servers",
    icon: Server,
    match: (p: string) =>
      p.startsWith("/tools/clan-finder") || p.startsWith("/tools/server-stats"),
  },
  { href: "/about", labelKey: "nav.about", icon: Info, match: (p: string) => p.startsWith("/about") },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-bottom">
      <div className="mx-auto max-w-md">
        <div className="mx-2 mb-2 flex items-center justify-around px-2 py-2 rounded-2xl bg-[#0f172a]/80 backdrop-blur-2xl border border-white/10 shadow-2xl">
          {tabs.map(({ href, labelKey, icon: Icon, match }) => {
            const isActive = match(pathname);
            const label = t(labelKey);

            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-all ${
                  isActive ? "bg-orange-500/15" : "hover:bg-white/5"
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? "text-orange-500" : "text-slate-500"
                  }`}
                  fill={isActive ? "currentColor" : "none"}
                  strokeWidth={isActive ? 0 : 2}
                />
                <span
                  className={`text-[10px] font-medium transition-colors ${
                    isActive ? "text-orange-500" : "text-slate-500"
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
