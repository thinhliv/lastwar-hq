import { Home, Wrench, MessageSquare, Newspaper, User } from "lucide-react";
import Link from "next/link";

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/tools", label: "Tools", icon: Wrench },
  { href: "/chat", label: "Chat", icon: MessageSquare },
  { href: "/news", label: "News", icon: Newspaper },
  { href: "/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass safe-bottom">
      <div className="mx-auto max-w-md flex items-center justify-around px-2 py-2">
        {tabs.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors hover:bg-white/5"
          >
            <Icon className="w-5 h-5 text-slate-400" />
            <span className="text-[10px] text-slate-400">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
