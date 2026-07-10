// LASTWAR HQ — Supabase Client
// Uses env placeholders — real keys added later
// Falls back to dummy URL so SSR/build doesn't crash

import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwbGFjZWhvbGRlciJ9.placeholder";

let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (_client) return _client;
  _client = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
  });
  return _client;
}

// Export a getter for use in client components
export const supabase = {
  get auth() {
    return getClient().auth;
  },
  get from() {
    return getClient().from.bind(getClient());
  },
  get channel() {
    return getClient().channel.bind(getClient());
  },
  get removeChannel() {
    return getClient().removeChannel.bind(getClient());
  },
} as unknown as SupabaseClient;

// Types
export interface AppUser {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  gameName?: string;
  serverId?: string;
  allianceId?: string;
}

// Helper: get current user
export async function getCurrentUser(): Promise<AppUser | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  return {
    id: user.id,
    email: user.email || "",
    displayName:
      (user.user_metadata?.displayName as string) ||
      (user.user_metadata?.full_name as string) ||
      (user.user_metadata?.name as string) ||
      user.email?.split("@")[0] ||
      "Commander",
    avatarUrl: user.user_metadata?.avatar_url || user.user_metadata?.picture,
    gameName: user.user_metadata?.gameName,
    serverId: user.user_metadata?.serverId,
    allianceId: user.user_metadata?.allianceId,
  };
}

// Auth helpers
export async function signInWithGoogle() {
  const redirectTo =
    typeof window !== "undefined"
      ? `${window.location.origin}/auth/callback`
      : undefined;

  return getClient().auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo },
  });
}

export async function signInWithEmail(email: string, password: string) {
  return getClient().auth.signInWithPassword({ email, password });
}

export async function signUpWithEmail(email: string, password: string) {
  return getClient().auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });
}

export async function signOut() {
  return getClient().auth.signOut();
}
