import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";

interface RealStatsStore {
  lastDate: string;
  totalHits: number;
  todaySessions: string[];
  activeSessions: Record<string, number>;
  updatedAt: number;
}

const GIST_ID = process.env.STATS_GIST_ID || "4cfd1bae1ef4c94d07c49166e16f9ee8";
const GITHUB_TOKEN = process.env.STATS_GITHUB_TOKEN || "";
const TEMP_FILE = path.join(os.tmpdir(), "monica_stats_real_v2.json");
const BASELINE_TOTAL = 49;

// Helper to get today's date in UTC+7 (Vietnam / SE Asia timezone)
function getTodayDateString(): string {
  const now = new Date();
  const utc7 = new Date(now.getTime() + 7 * 60 * 60 * 1000);
  return utc7.toISOString().split("T")[0];
}

// In-memory store for warm lambda executions
let memoryStore: RealStatsStore | null = null;
let isSyncing = false;
let hasPendingSync = false;

// Read from /tmp if available
function readFromTempFile(): RealStatsStore | null {
  try {
    if (fs.existsSync(TEMP_FILE)) {
      const data = JSON.parse(fs.readFileSync(TEMP_FILE, "utf-8"));
      if (data && typeof data.totalHits === "number") {
        return {
          lastDate: data.lastDate || getTodayDateString(),
          totalHits: Math.max(BASELINE_TOTAL, data.totalHits),
          todaySessions: Array.isArray(data.todaySessions) ? data.todaySessions : [],
          activeSessions:
            typeof data.activeSessions === "object" && data.activeSessions
              ? data.activeSessions
              : {},
          updatedAt: data.updatedAt || Date.now(),
        };
      }
    }
  } catch {}
  return null;
}

// Write to /tmp
function writeToTempFile(store: RealStatsStore) {
  try {
    fs.writeFileSync(TEMP_FILE, JSON.stringify(store), "utf-8");
  } catch {}
}

// Fetch remote persistent stats from GitHub Gist
async function fetchFromGist(): Promise<Partial<RealStatsStore> | null> {
  if (!GIST_ID) return null;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2500); // 2.5s max timeout

  try {
    const headers: Record<string, string> = {
      "User-Agent": "MonicaBot-Stats/2.0",
      Accept: "application/vnd.github+json",
    };
    if (GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
    }

    const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      headers,
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timer);
    if (!res.ok) return null;

    const data = await res.json();
    const content = data?.files?.["stats.json"]?.content;
    if (content) {
      const parsed = JSON.parse(content);
      return {
        totalHits:
          typeof parsed.totalHits === "number"
            ? parsed.totalHits
            : BASELINE_TOTAL,
        lastDate: parsed.lastDate || getTodayDateString(),
        todaySessions: Array.isArray(parsed.todaySessions)
          ? parsed.todaySessions
          : [],
        updatedAt: parsed.updatedAt || Date.now(),
      };
    }
  } catch {
    // Network or timeout error - fallback silently
  } finally {
    clearTimeout(timer);
  }
  return null;
}

// Save to GitHub Gist asynchronously
async function saveToGistAsync() {
  if (isSyncing) {
    hasPendingSync = true;
    return;
  }
  if (!GIST_ID || !GITHUB_TOKEN || !memoryStore) return;

  isSyncing = true;
  hasPendingSync = false;

  try {
    const payload = {
      description: "monicabot_real_visitor_stats",
      files: {
        "stats.json": {
          content: JSON.stringify(
            {
              totalHits: memoryStore.totalHits,
              lastDate: memoryStore.lastDate,
              todaySessions: memoryStore.todaySessions.slice(-300), // Keep last 300 unique sessions
              todayCount: memoryStore.todaySessions.length,
              updatedAt: Date.now(),
            },
            null,
            2
          ),
        },
      },
    };

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);

    await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "MonicaBot-Stats/2.0",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timer);
  } catch {
    // Ignored in background
  } finally {
    isSyncing = false;
    if (hasPendingSync) {
      hasPendingSync = false;
      saveToGistAsync();
    }
  }
}

// Ensure store is initialized
async function ensureStore(): Promise<RealStatsStore> {
  if (memoryStore) {
    return memoryStore;
  }

  // 1. Try temp file
  const local = readFromTempFile();

  // 2. Try remote gist
  const remote = await fetchFromGist();

  const currentDate = getTodayDateString();

  if (remote && typeof remote.totalHits === "number") {
    const isToday = remote.lastDate === currentDate;
    memoryStore = {
      lastDate: currentDate,
      totalHits: Math.max(BASELINE_TOTAL, remote.totalHits, local?.totalHits || 0),
      todaySessions: isToday && remote.todaySessions ? remote.todaySessions : [],
      activeSessions: local?.activeSessions || {},
      updatedAt: Date.now(),
    };
  } else if (local) {
    memoryStore = local;
  } else {
    // Clean initial fallback
    memoryStore = {
      lastDate: currentDate,
      totalHits: BASELINE_TOTAL,
      todaySessions: [],
      activeSessions: {},
      updatedAt: Date.now(),
    };
  }

  writeToTempFile(memoryStore);
  return memoryStore;
}

function pruneAndCalculate(store: RealStatsStore) {
  const currentDate = getTodayDateString();
  if (store.lastDate !== currentDate) {
    store.lastDate = currentDate;
    store.todaySessions = [];
  }

  const now = Date.now();
  // Active window: 2 minutes (120s)
  const activeWindow = now - 2 * 60 * 1000;

  const cleanedActive: Record<string, number> = {};
  for (const [sid, timestamp] of Object.entries(store.activeSessions || {})) {
    if (timestamp >= activeWindow) {
      cleanedActive[sid] = timestamp;
    }
  }
  store.activeSessions = cleanedActive;

  // 100% REAL DATA
  const online = Object.keys(cleanedActive).length;
  const today = store.todaySessions.length;
  const total = store.totalHits;

  return { total, today, online };
}

export async function GET() {
  const store = await ensureStore();
  const stats = pruneAndCalculate(store);

  return NextResponse.json(stats, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
    },
  });
}

export async function POST(req: NextRequest) {
  const store = await ensureStore();
  const body = await req.json().catch(() => ({}));

  const sessionId =
    body.sessionId ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "session_" + Math.random().toString(36).substring(2, 9);

  // Tab close / unload beacon
  if (body.action === "leave") {
    if (store.activeSessions && store.activeSessions[sessionId]) {
      delete store.activeSessions[sessionId];
    }
    const stats = pruneAndCalculate(store);
    writeToTempFile(store);
    return NextResponse.json({ ok: true, stats });
  }

  const currentDate = getTodayDateString();
  if (store.lastDate !== currentDate) {
    store.lastDate = currentDate;
    store.todaySessions = [];
  }

  const now = Date.now();

  // If this session hasn't been counted today yet, increment total and today
  let isNewVisit = false;
  if (!store.todaySessions.includes(sessionId)) {
    store.todaySessions.push(sessionId);
    store.totalHits += 1;
    store.updatedAt = now;
    isNewVisit = true;
  }

  // Update active heartbeat
  store.activeSessions[sessionId] = now;

  const stats = pruneAndCalculate(store);
  writeToTempFile(store);

  if (isNewVisit) {
    // Asynchronously sync to persistent remote Gist
    saveToGistAsync().catch(() => {});
  }

  return NextResponse.json(
    { ok: true, stats },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      },
    }
  );
}
