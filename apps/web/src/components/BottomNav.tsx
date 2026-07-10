"use client";

import { Home, Calculator, MessageCircle, Newspaper, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/tools", label: "Tools", icon: Calculator },
  { href: "/chat", label: "Chat", icon: MessageCircle },
  { href: "/news", label: "News", icon: Newspaper },
  { href: "/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-bottom">
      <div className="mx-auto max-w-md">
        <div className="mx-2 mb-2 flex items-center justify-around px-2 py-2 rounded-2xl bg-[#0f172a]/80 backdrop-blur-2xl border border-white/10 shadow-2xl">
          {tabs.map(({ href, label, icon: Icon }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-all ${
                  isActive
                    ? "bg-orange-500/15"
                    : "hover:bg-white/5"
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive
                      ? "text-orange-500"
                      : "text-slate-500"
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
