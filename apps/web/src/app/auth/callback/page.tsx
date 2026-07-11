"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function handleCallback() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Auth error:", error);
          router.push("/?auth_error=true");
          return;
        }
        if (data.session) {
          router.push("/");
        } else {
          router.push("/");
        }
      } catch {
        router.push("/");
      }
    }
    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-slate-400">Đang đăng nhập...</p>
      </div>
    </div>
  );
}
