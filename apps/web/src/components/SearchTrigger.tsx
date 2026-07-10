"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import CommandPalette from "@/components/CommandPalette";

export default function SearchTrigger() {
  const [open, setOpen] = useState(false);

  // Listen for Ctrl/Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-3 right-3 z-40 w-9 h-9 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors"
        aria-label="Search"
      >
        <Search className="w-4 h-4 text-slate-400" />
      </button>
      <CommandPalette open={open} onClose={() => setOpen(false)} />
    </>
  );
}
