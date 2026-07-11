"use client";

import { useState, useRef, useMemo } from "react";
import {
  Map as MapIcon,
  ZoomIn,
  ZoomOut,
  Maximize2,
  X,
  Info,
} from "lucide-react";

// ===== TYPES =====
type ZoneType = "alliance" | "neutral" | "fortress" | "capital" | "resource";

interface Zone {
  id: number;
  x: number;
  y: number;
  name: string;
  type: ZoneType;
  alliance?: string;
}

interface SeasonData {
  season: number;
  name: string;
  zones: Zone[];
}

// ===== ZONE CONFIG =====
const ZONE_COLORS: Record<ZoneType, string> = {
  alliance: "#3b82f6",
  neutral: "#475569",
  fortress: "#f97316",
  capital: "#ef4444",
  resource: "#22c55e",
};

const ZONE_LABELS: Record<ZoneType, string> = {
  alliance: "Lãnh thổ Alliance",
  neutral: "Khu trung lập",
  fortress: "Pháo đài",
  capital: "Thủ đô",
  resource: "Resource Area",
};

const GRID_SIZE = 8;
const CELL_SIZE = 56;

// ===== SEASON DATA GENERATOR =====
function generateSeasonData(season: number): SeasonData {
  const zones: Zone[] = [];
  const alliances = ["VK Thunder", "Rising Sun", "Wolf Pack", "Iron Fist", "Red Dragon"];
  const isPreSeason = season === 0;

  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const id = y * GRID_SIZE + x;
      const cx = GRID_SIZE / 2;
      const cy = GRID_SIZE / 2;
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);

      let type: ZoneType = "neutral";
      let alliance: string | undefined;

      // Thủ đô at center
      if (Math.abs(x - cx) < 1 && Math.abs(y - cy) < 1) {
        type = "capital";
      }
      // Pháo đài ring around capital
      else if (dist < 2.5) {
        type = "fortress";
      }
      // Resource zones scattered
      else if ((x + y) % 5 === 0 && dist > 3) {
        type = "resource";
      }
      // Alliance territories in outer rings
      else if (dist > 1.5) {
        if (isPreSeason) {
          type = "neutral";
        } else {
          // Assign alliance based on quadrant + season variation
          const quadrant = Math.floor((x / GRID_SIZE) * 3) + Math.floor((y / GRID_SIZE) * 3) * 3;
          const allianceIdx = (quadrant + season) % alliances.length;
          type = "alliance";
          alliance = alliances[allianceIdx];
        }
      }

      zones.push({
        id,
        x,
        y,
        name: `Zone ${String.fromCharCode(65 + x)}${y + 1}`,
        type,
        alliance: type === "alliance" ? alliance : undefined,
      });
    }
  }

  return {
    season,
    name: season === 0 ? "Pre-Season" : `Season ${season}`,
    zones,
  };
}

const SEASONS = [0, 1, 2, 3, 4, 5];

// ===== COMPONENT =====
export default function MapsPage() {
  const [selectedSeason, setSelectedSeason] = useState(5);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ startX: number; startY: number; panX: number; panY: number } | null>(null);

  const seasonData = useMemo(() => generateSeasonData(selectedSeason), [selectedSeason]);

  const mapSize = GRID_SIZE * CELL_SIZE;

  function handleZoomIn() {
    setZoom((z) => Math.min(z + 0.25, 2.5));
  }
  function handleZoomOut() {
    setZoom((z) => Math.max(z - 0.25, 0.5));
  }
  function handleReset() {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }

  function handlePointerDown(e: React.PointerEvent) {
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      panX: pan.x,
      panY: pan.y,
    };
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPan({ x: dragRef.current.panX + dx, y: dragRef.current.panY + dy });
  }

  function handlePointerUp(e: React.PointerEvent) {
    dragRef.current = null;
  }

  return (
    <div className="min-h-screen px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <MapIcon className="w-6 h-6 text-blue-400" />
        <h1 className="text-2xl font-bold">Bản đồ mùa giảis</h1>
      </div>
      <p className="text-slate-400 text-sm mb-4">
        Khám phá bản đồ lĩnh thổ từng mùa giải
      </p>

      {/* Season Selector */}
      <div className="mb-4">
        <label className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-1.5 block">
          Chọn mùa giải
        </label>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {SEASONS.map((s) => (
            <button
              key={s}
              onClick={() => {
                setSelectedSeason(s);
                setSelectedZone(null);
              }}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                selectedSeason === s
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                  : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
              }`}
            >
              {s === 0 ? "Pre-Season" : `Season ${s}`}
            </button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="relative rounded-2xl bg-slate-950/50 backdrop-blur-xl border border-white/10 overflow-hidden">
        {/* Toolbar */}
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5">
          <button
            onClick={handleZoomIn}
            className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:bg-white/10 transition-colors"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4 text-slate-300" />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:bg-white/10 transition-colors"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4 text-slate-300" />
          </button>
          <button
            onClick={handleReset}
            className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:bg-white/10 transition-colors"
            aria-label="Reset view"
          >
            <Maximize2 className="w-4 h-4 text-slate-300" />
          </button>
        </div>

        {/* Zoom indicator */}
        <div className="absolute top-3 left-3 z-20 px-2 py-1 rounded-lg glass text-[10px] text-slate-400 font-mono">
          {Math.round(zoom * 100)}%
        </div>

        {/* Scrollable Map Area */}
        <div
          className="relative w-full overflow-hidden touch-none cursor-grab active:cursor-grabbing"
          style={{ height: "60vh", minHeight: "400px" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transition: dragRef.current ? "none" : "transform 0.1s ease-out",
            }}
          >
            <div className="relative" style={{ width: mapSize, height: mapSize }}>
              {/* SVG Grid + Zones */}
              <svg
                width={mapSize}
                height={mapSize}
                className="absolute inset-0"
                style={{ background: "#0a0f1c" }}
              >
                {/* Grid lines */}
                {Array.from({ length: GRID_SIZE + 1 }).map((_, i) => (
                  <g key={`line-${i}`}>
                    <line
                      x1={i * CELL_SIZE}
                      y1={0}
                      x2={i * CELL_SIZE}
                      y2={mapSize}
                      stroke="rgba(148, 163, 184, 0.08)"
                      strokeWidth={1}
                    />
                    <line
                      x1={0}
                      y1={i * CELL_SIZE}
                      x2={mapSize}
                      y2={i * CELL_SIZE}
                      stroke="rgba(148, 163, 184, 0.08)"
                      strokeWidth={1}
                    />
                  </g>
                ))}

                {/* Zones */}
                {seasonData.zones.map((zone) => {
                  const isSelected = selectedZone?.id === zone.id;
                  return (
                    <g
                      key={zone.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedZone(zone);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <rect
                        x={zone.x * CELL_SIZE + 2}
                        y={zone.y * CELL_SIZE + 2}
                        width={CELL_SIZE - 4}
                        height={CELL_SIZE - 4}
                        rx={6}
                        fill={ZONE_COLORS[zone.type]}
                        fillOpacity={isSelected ? 0.55 : 0.25}
                        stroke={ZONE_COLORS[zone.type]}
                        strokeWidth={isSelected ? 2.5 : 1}
                        strokeOpacity={isSelected ? 1 : 0.5}
                      />
                      {/* Zone type icon */}
                      {zone.type === "capital" && (
                        <text
                          x={zone.x * CELL_SIZE + CELL_SIZE / 2}
                          y={zone.y * CELL_SIZE + CELL_SIZE / 2 + 5}
                          textAnchor="middle"
                          fontSize={16}
                        >
                          👑
                        </text>
                      )}
                      {zone.type === "fortress" && (
                        <text
                          x={zone.x * CELL_SIZE + CELL_SIZE / 2}
                          y={zone.y * CELL_SIZE + CELL_SIZE / 2 + 5}
                          textAnchor="middle"
                          fontSize={14}
                        >
                          🏰
                        </text>
                      )}
                      {zone.type === "resource" && (
                        <text
                          x={zone.x * CELL_SIZE + CELL_SIZE / 2}
                          y={zone.y * CELL_SIZE + CELL_SIZE / 2 + 5}
                          textAnchor="middle"
                          fontSize={14}
                        >
                          ⛏️
                        </text>
                      )}
                      {/* Zone label */}
                      <text
                        x={zone.x * CELL_SIZE + CELL_SIZE / 2}
                        y={zone.y * CELL_SIZE + CELL_SIZE - 8}
                        textAnchor="middle"
                        fontSize={9}
                        fill="rgba(241, 245, 249, 0.5)"
                        fontWeight={600}
                      >
                        {zone.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Chú thích */}
      <div className="mt-4 p-4 rounded-2xl glass">
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-300 mb-3">
          Chú thích
        </h3>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {(Object.keys(ZONE_COLORS) as ZoneType[]).map((type) => (
            <div key={type} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{
                  background: ZONE_COLORS[type],
                  fillOpacity: 0.3,
                  border: `1px solid ${ZONE_COLORS[type]}`,
                }}
              />
              <span className="text-xs text-slate-400">{ZONE_LABELS[type]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Thông tin khu vực Panel */}
      {selectedZone && (
        <div className="fixed bottom-24 left-4 right-4 z-40 mx-auto max-w-md">
          <div className="rounded-2xl glass border border-orange-500/20 p-4 shadow-2xl animate-in">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded"
                  style={{
                    background: ZONE_COLORS[selectedZone.type],
                    border: `1px solid ${ZONE_COLORS[selectedZone.type]}`,
                  }}
                />
                <h3 className="font-bold text-base">{selectedZone.name}</h3>
              </div>
              <button
                onClick={() => setSelectedZone(null)}
                className="p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Loại</span>
                <span className="font-medium" style={{ color: ZONE_COLORS[selectedZone.type] }}>
                  {ZONE_LABELS[selectedZone.type]}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Tọa độ</span>
                <span className="font-mono text-slate-300">
                  ({selectedZone.x}, {selectedZone.y})
                </span>
              </div>
              {selectedZone.alliance && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Alliance</span>
                  <span className="font-medium text-blue-400">{selectedZone.alliance}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Info banner */}
      <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
        <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-slate-400 leading-relaxed">
          Dữ liệu bản đồ mang tính minh họa. Cập nhật real-time khi tích hợp API.
        </p>
      </div>
    </div>
  );
}
