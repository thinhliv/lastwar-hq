"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // With implicit grant or PKCE handled by supabase-js client,
    // the session is automatically detected in the URL hash if detectSessionInUrl is true.
    // We just wait for the auth state to be resolved and then redirect.
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        router.push("/");
      }
    });

    // Timeout fallback just in case
    const timeout = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => {
      authListener.subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
        <p className="text-slate-400 text-sm">Đang xử lý đăng nhập...</p>
      </div>
    </div>
  );
}
