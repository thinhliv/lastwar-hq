import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Auto-create table on first run
let tableReady = false;
async function ensureTable() {
  if (tableReady) return;
  try {
    await supabase.rpc("exec_sql", {
      sql: `CREATE TABLE IF NOT EXISTS page_views (
        id BIGSERIAL PRIMARY KEY,
        session_id TEXT NOT NULL,
        page TEXT DEFAULT '/',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_pv_created ON page_views(created_at);
      CREATE INDEX IF NOT EXISTS idx_pv_session ON page_views(session_id);`
    });
    tableReady = true;
  } catch {
    // Table might already exist or rpc not available
    tableReady = true;
  }
}

export async function GET(req: NextRequest) {
  await ensureTable();

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();

  // Total views
  const { count: totalViews } = await supabase
    .from("page_views")
    .select("*", { count: "exact", head: true });

  // Today views
  const { count: todayViews } = await supabase
    .from("page_views")
    .select("*", { count: "exact", head: true })
    .gte("created_at", todayStart);

  // Online (unique sessions in last 5 min)
  const { data: recentSessions } = await supabase
    .from("page_views")
    .select("session_id")
    .gte("created_at", fiveMinAgo);

  const onlineCount = new Set(recentSessions?.map((r) => r.session_id) || []).size;

  return NextResponse.json({
    total: totalViews || 0,
    today: todayViews || 0,
    online: onlineCount,
  });
}

export async function POST(req: NextRequest) {
  await ensureTable();

  const body = await req.json().catch(() => ({}));
  const sessionId = body.sessionId || req.headers.get("x-forwarded-for") || "unknown";
  const page = body.page || "/";

  const { error } = await supabase.from("page_views").insert({
    session_id: sessionId,
    page,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
