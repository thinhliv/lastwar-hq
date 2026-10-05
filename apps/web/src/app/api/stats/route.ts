import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";

interface StatsStore {
  baseTotal: number;
  baseToday: number;
  lastDate: string;
  realTotalHits: number;
  realTodayHits: number;
  activeSessions: Record<string, number>;
}

const TEMP_FILE = path.join(os.tmpdir(), "monica_stats_v2.json");

// Helper to get today's date in UTC+7 (Vietnam / SE Asia timezone)
function getTodayDateString(): string {
  const now = new Date();
  const utc7 = new Date(now.getTime() + 7 * 60 * 60 * 1000);
  return utc7.toISOString().split("T")[0];
}

// Global in-memory cache to maintain state across warm lambda requests
let memoryStore: StatsStore | null = null;

function loadStore(): StatsStore {
  if (memoryStore) {
    return memoryStore;
  }

  // Try reading from temp file
  try {
    if (fs.existsSync(TEMP_FILE)) {
      const data = JSON.parse(fs.readFileSync(TEMP_FILE, "utf-8"));
      if (data && typeof data.baseTotal === "number") {
        memoryStore = data;
        return memoryStore!;
      }
    }
  } catch {}

  // Fallback default
  memoryStore = {
    baseTotal: 18520,
    baseToday: 1285,
    lastDate: getTodayDateString(),
    realTotalHits: 42,
    realTodayHits: 35,
    activeSessions: {},
  };

  return memoryStore;
}

function saveStore(store: StatsStore) {
  memoryStore = store;
  try {
    fs.writeFileSync(TEMP_FILE, JSON.stringify(store), "utf-8");
  } catch {}
}

function pruneAndCalculate(store: StatsStore) {
  const currentDate = getTodayDateString();
  if (store.lastDate !== currentDate) {
    store.lastDate = currentDate;
    store.realTodayHits = 0;
    // Base today resets with realistic early-day seed
    store.baseToday = 380 + Math.floor(Math.random() * 120);
  }

  const now = Date.now();
  const fiveMinAgo = now - 5 * 60 * 1000;

  // Clean old sessions
  const activeSessions: Record<string, number> = {};
  for (const [sid, timestamp] of Object.entries(store.activeSessions || {})) {
    if (timestamp >= fiveMinAgo) {
      activeSessions[sid] = timestamp;
    }
  }
  store.activeSessions = activeSessions;

  const realOnline = Object.keys(activeSessions).length;
  // Realistic online calculation: dynamic baseline (28-46 players) + real online visitors
  const hour = (new Date().getUTCHours() + 7) % 24;
  const timeWeight = hour >= 10 && hour <= 23 ? 34 : 22; // peak gaming hours
  const online = Math.max(16, timeWeight + realOnline);

  const total = store.baseTotal + store.realTotalHits;
  const today = store.baseToday + store.realTodayHits;

  return { total, today, online };
}

export async function GET() {
  const store = loadStore();
  const stats = pruneAndCalculate(store);

  return NextResponse.json(stats, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
    },
  });
}

export async function POST(req: NextRequest) {
  const store = loadStore();
  const body = await req.json().catch(() => ({}));

  const sessionId =
    body.sessionId ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "session_" + Math.random().toString(36).substring(2, 9);

  // Register or update active session
  store.activeSessions[sessionId] = Date.now();
  store.realTotalHits += 1;
  store.realTodayHits += 1;

  const stats = pruneAndCalculate(store);
  saveStore(store);

  return NextResponse.json(
    { ok: true, stats },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      },
    }
  );
}
