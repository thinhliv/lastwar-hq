"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/lib/admin-auth";
import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  TrendingUp,
  Eye,
  MousePointerClick,
  Clock,
  Globe,
  Search,
  Bell,
  Edit,
  Trash2,
  Plus,
  Save,
  Server,
  MessageSquare,
  BarChart3,
  Activity,
} from "lucide-react";

// ===== MOCK ANALYTICS DATA =====
const ANALYTICS = {
  totalVisitors: 15420,
  onlineNow: 47,
  todayVisitors: 892,
  weekVisitors: 5340,
  monthVisitors: 15420,
  pageViews: 45830,
  bounceRate: 32.5,
  avgSessionTime: "4m 32s",
  topPages: [
    { path: "/", views: 12450, label: "Trang chủ" },
    { path: "/tools/calculators", views: 8230, label: "Calculators" },
    { path: "/tools/hero-tier", views: 6890, label: "Hero Tier List" },
    { path: "/tools/events", views: 5430, label: "Events" },
    { path: "/tools/maps", views: 4120, label: "Maps" },
    { path: "/guides", views: 3870, label: "Guides" },
  ],
  topCountries: [
    { flag: "🇻🇳", name: "Vietnam", visitors: 5230, percent: 34 },
    { flag: "🇺🇸", name: "USA", visitors: 3410, percent: 22 },
    { flag: "🇰🇷", name: "Korea", visitors: 2180, percent: 14 },
    { flag: "🇯🇵", name: "Japan", visitors: 1560, percent: 10 },
    { flag: "🇨🇳", name: "China", visitors: 1240, percent: 8 },
    { flag: "🌍", name: "Others", visitors: 1800, percent: 12 },
  ],
  trafficSources: [
    { source: "Direct", percent: 35, color: "bg-orange-500" },
    { source: "Google Search", percent: 28, color: "bg-blue-500" },
    { source: "Social Media", percent: 20, color: "bg-green-500" },
    { source: "Referral", percent: 12, color: "bg-purple-500" },
    { source: "Other", percent: 5, color: "bg-slate-500" },
  ],
  recentActivity: [
    { user: "Player_VN", action: "Đã xem Hero Tier List", time: "2 phút trước", icon: "👁️" },
    { user: "Killer_99", action: "Đăng nhập", time: "5 phút trước", icon: "🔑" },
    { user: "Alliance_RU", action: "Tạo alliance mới", time: "10 phút trước", icon: "🏰" },
    { user: "ProGamer", action: "Dùng Ammo Bonanza Calc", time: "15 phút trước", icon: "⚡" },
    { user: "Newbie2026", action: "Đăng ký tài khoản", time: "22 phút trước", icon: "✨" },
  ],
};

// ===== MOCK CONTENT DATA =====
const NEWS_MANAGE = [
  { id: 1, title: "Season 5 chính thức ra mắt!", status: "published", date: "10/07", views: 2340 },
  { id: 2, title: "Event: Ammo Bonanza cuối tuần", status: "published", date: "10/07", views: 1820 },
  { id: 3, title: "Bảo trì server 12/07", status: "published", date: "09/07", views: 980 },
  { id: 4, title: "Update 5.2 Patch Notes", status: "draft", date: "—", views: 0 },
];

const GUIDES_MANAGE = [
  { id: 1, title: "Best Hero Combinations S6", status: "published", category: "Heroes", views: 3210 },
  { id: 2, title: "Base Layout Guide", status: "published", category: "Beginner", views: 2150 },
  { id: 3, title: "Restricted Area Complete", status: "published", category: "Combat", views: 1890 },
  { id: 4, title: "Alliance War Strategy", status: "draft", category: "Strategy", views: 0 },
];

type AdminTab = "dashboard" | "analytics" | "content" | "users" | "events" | "settings";

// ===== ADMIN LAYOUT =====
export default function AdminPage() {
  const { admin, logout, isLoading } = useAdmin();
  const router = useRouter();
  const [tab, setTab] = useState<AdminTab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !admin) {
      router.push("/admin/login");
    }
  }, [isLoading, admin, router]);

  if (isLoading || !admin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  const navItems: { id: AdminTab; label: string; icon: typeof LayoutDashboard }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "content", label: "Content", icon: FileText },
    { id: "users", label: "Users", icon: Users },
    { id: "events", label: "Events", icon: Calendar },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-[#0a0f1a]">
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-[#0f172a] border-r border-white/5 transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-black text-orange-500">LASTWAR</h1>
              <p className="text-[9px] text-slate-500 uppercase tracking-wide">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Admin Info */}
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-xl">
              {admin.avatar}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{admin.name}</p>
              <p className="text-[10px] text-orange-400">{admin.role}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="p-2 space-y-0.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                tab === item.id
                  ? "bg-orange-500/15 text-orange-400 font-medium"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-white/5">
          <button
            onClick={() => { logout(); router.push("/"); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 flex items-center gap-3 px-4 py-3 bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/5">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10"
          >
            <Menu className="w-5 h-5 text-slate-400" />
          </button>
          <h2 className="text-lg font-bold capitalize">
            {navItems.find((n) => n.id === tab)?.label}
          </h2>
          <div className="ml-auto flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-white/10 relative">
              <Bell className="w-4 h-4 text-slate-400" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-500" />
            </button>
            <a
              href="/"
              className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-slate-400 hover:text-white hover:bg-white/10 flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5" />
              View Site
            </a>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-4 lg:p-6">
          {tab === "dashboard" && <DashboardTab />}
          {tab === "analytics" && <AnalyticsTab />}
          {tab === "content" && <ContentTab />}
          {tab === "users" && <UsersTab />}
          {tab === "events" && <EventsTab />}
          {tab === "settings" && <SettingsTab />}
        </div>
      </main>
    </div>
  );
}

// ===== DASHBOARD TAB =====
function DashboardTab() {
  const stats = [
    { label: "Total Visitors", value: ANALYTICS.totalVisitors.toLocaleString(), icon: Eye, color: "text-blue-400", bgColor: "bg-blue-500/10", trend: "+12.5%" },
    { label: "Online Now", value: ANALYTICS.onlineNow.toString(), icon: Activity, color: "text-green-400", bgColor: "bg-green-500/10", trend: "live" },
    { label: "Page Views", value: ANALYTICS.pageViews.toLocaleString(), icon: MousePointerClick, color: "text-orange-400", bgColor: "bg-orange-500/10", trend: "+8.3%" },
    { label: "Today Visitors", value: ANALYTICS.todayVisitors.toLocaleString(), icon: TrendingUp, color: "text-purple-400", bgColor: "bg-purple-500/10", trend: "+15.2%" },
  ];

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className={`p-4 rounded-2xl ${stat.bgColor} border border-white/5`}>
            <div className="flex items-center justify-between mb-2">
              <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              {stat.trend === "live" ? (
                <span className="flex items-center gap-1 text-[9px] text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  LIVE
                </span>
              ) : (
                <span className="text-[9px] text-green-400">{stat.trend}</span>
              )}
            </div>
            <p className="text-2xl font-black">{stat.value}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wide">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Two Column */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Top Pages */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
          <h3 className="text-xs font-bold uppercase tracking-wide text-slate-300 mb-3 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-orange-400" />
            Top Pages
          </h3>
          <div className="space-y-2">
            {ANALYTICS.topPages.map((page, i) => (
              <div key={page.path} className="flex items-center gap-2">
                <span className="text-[10px] text-slate-600 w-4">#{i + 1}</span>
                <span className="text-xs text-slate-300 flex-1 truncate">{page.label}</span>
                <div className="w-20 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                    style={{ width: `${(page.views / ANALYTICS.topPages[0].views) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-slate-400 w-12 text-right">{page.views.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
          <h3 className="text-xs font-bold uppercase tracking-wide text-slate-300 mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4 text-green-400" />
            Hoạt động gần đây
          </h3>
          <div className="space-y-2">
            {ANALYTICS.recentActivity.map((act, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className="text-base">{act.icon}</span>
                <div className="flex-1 min-w-0">
                  <span className="text-slate-300 font-medium">{act.user}</span>
                  <span className="text-slate-500"> {act.action}</span>
                </div>
                <span className="text-[9px] text-slate-600">{act.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-300 mb-3">
          Nguồn traffic
        </h3>
        <div className="flex h-3 rounded-full overflow-hidden mb-3">
          {ANALYTICS.trafficSources.map((src) => (
            <div
              key={src.source}
              className={src.color}
              style={{ width: `${src.percent}%` }}
              title={`${src.source}: ${src.percent}%`}
            />
          ))}
        </div>
        <div className="grid grid-cols-5 gap-2">
          {ANALYTICS.trafficSources.map((src) => (
            <div key={src.source} className="text-center">
              <div className={`w-2 h-2 rounded-full ${src.color} mx-auto mb-1`} />
              <p className="text-[9px] text-slate-500">{src.source}</p>
              <p className="text-[10px] font-bold text-slate-300">{src.percent}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <button className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 hover:bg-orange-500/20 transition-all flex flex-col items-center gap-1.5">
          <Plus className="w-5 h-5 text-orange-400" />
          <span className="text-[10px] text-orange-400">Thêm News</span>
        </button>
        <button className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 transition-all flex flex-col items-center gap-1.5">
          <Edit className="w-5 h-5 text-green-400" />
          <span className="text-[10px] text-green-400">Sửa Guide</span>
        </button>
        <button className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all flex flex-col items-center gap-1.5">
          <Calendar className="w-5 h-5 text-blue-400" />
          <span className="text-[10px] text-blue-400">Tạo Event</span>
        </button>
        <button className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-all flex flex-col items-center gap-1.5">
          <Bell className="w-5 h-5 text-purple-400" />
          <span className="text-[10px] text-purple-400">Gửi Notify</span>
        </button>
      </div>
    </div>
  );
}

// ===== ANALYTICS TAB =====
function AnalyticsTab() {
  return (
    <div className="space-y-6">
      {/* Period Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Hôm nay", value: ANALYTICS.todayVisitors, icon: Clock },
          { label: "Tuần này", value: ANALYTICS.weekVisitors, icon: TrendingUp },
          { label: "Tháng này", value: ANALYTICS.monthVisitors, icon: Calendar },
          { label: "Bounce Rate", value: `${ANALYTICS.bounceRate}%`, icon: Activity, isText: true },
        ].map((s) => (
          <div key={s.label} className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <s.icon className="w-4 h-4 text-slate-500 mb-2" />
            <p className="text-xl font-black">
              {s.isText ? s.value : (s.value as number).toLocaleString()}
            </p>
            <p className="text-[10px] text-slate-500 uppercase">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Countries */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
          <h3 className="text-xs font-bold uppercase tracking-wide text-slate-300 mb-3">
            🌍 Visitors theo quốc gia
          </h3>
          <div className="space-y-2">
            {ANALYTICS.topCountries.map((c) => (
              <div key={c.name} className="flex items-center gap-2">
                <span className="text-base">{c.flag}</span>
                <span className="text-xs text-slate-300 w-20">{c.name}</span>
                <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${c.percent * 2}%` }} />
                </div>
                <span className="text-[10px] font-mono text-slate-400 w-12 text-right">{c.visitors.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Page Performance */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
          <h3 className="text-xs font-bold uppercase tracking-wide text-slate-300 mb-3">
            📄 Hiệu suất trang
          </h3>
          <div className="space-y-2">
            {ANALYTICS.topPages.map((p) => (
              <div key={p.path} className="flex items-center gap-2">
                <span className="text-xs text-blue-400 font-mono flex-1 truncate">{p.path}</span>
                <span className="text-[10px] text-slate-400">{p.views.toLocaleString()} views</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Session Info */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/5 border border-purple-500/20">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-purple-400" />
          <div>
            <p className="text-xs text-slate-400">Thời gian trung bình trên site</p>
            <p className="text-2xl font-black text-purple-400">{ANALYTICS.avgSessionTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== CONTENT TAB =====
function ContentTab() {
  const [section, setSection] = useState<"news" | "guides">("news");
  const data = section === "news" ? NEWS_MANAGE : GUIDES_MANAGE;

  return (
    <div className="space-y-4">
      {/* Section Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-white/5 w-fit">
        <button
          onClick={() => setSection("news")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${section === "news" ? "bg-orange-500 text-white" : "text-slate-400"}`}
        >
          📰 News ({NEWS_MANAGE.length})
        </button>
        <button
          onClick={() => setSection("guides")}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${section === "guides" ? "bg-orange-500 text-white" : "text-slate-400"}`}
        >
          📖 Guides ({GUIDES_MANAGE.length})
        </button>
      </div>

      {/* Add Button */}
      <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/20 text-green-400 text-sm hover:bg-green-500/30 transition-all">
        <Plus className="w-4 h-4" />
        Thêm {section === "news" ? "News" : "Guide"} mới
      </button>

      {/* Content Table */}
      <div className="rounded-2xl bg-white/5 border border-white/5 overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-white/5">
            <tr>
              <th className="px-3 py-2 text-left font-bold text-slate-400 uppercase">Tiêu đề</th>
              <th className="px-3 py-2 text-left font-bold text-slate-400 uppercase hidden sm:table-cell">{section === "guides" ? "Danh mục" : "Ngày"}</th>
              <th className="px-3 py-2 text-right font-bold text-slate-400 uppercase">Views</th>
              <th className="px-3 py-2 text-center font-bold text-slate-400 uppercase">Status</th>
              <th className="px-3 py-2 text-right font-bold text-slate-400 uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any) => (
              <tr key={item.id} className="border-t border-white/5 hover:bg-white/5">
                <td className="px-3 py-2.5 text-slate-300 font-medium">{item.title}</td>
                <td className="px-3 py-2.5 text-slate-500 hidden sm:table-cell">
                  {section === "guides" ? item.category : item.date}
                </td>
                <td className="px-3 py-2.5 text-right font-mono text-slate-400">{item.views.toLocaleString()}</td>
                <td className="px-3 py-2.5 text-center">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                    item.status === "published" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-1.5 rounded hover:bg-white/10">
                      <Edit className="w-3.5 h-3.5 text-blue-400" />
                    </button>
                    <button className="p-1.5 rounded hover:bg-red-500/10">
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ===== USERS TAB =====
function UsersTab() {
  const mockUsers = [
    { id: 1, name: "Thịnh (Admin)", email: "thinhliv@gmail.com", role: "Admin", joined: "07/07", status: "active" },
    { id: 2, name: "Player_VN", email: "player1@gmail.com", role: "User", joined: "08/07", status: "active" },
    { id: 3, name: "Killer_99", email: "killer99@yahoo.com", role: "User", joined: "08/07", status: "active" },
    { id: 4, name: "Alliance_RU", email: "rualliance@mail.com", role: "Mod", joined: "09/07", status: "active" },
    { id: 5, name: "ProGamer", email: "pro@gamer.com", role: "User", joined: "09/07", status: "banned" },
    { id: 6, name: "Newbie2026", email: "newbie@gmail.com", role: "User", joined: "10/07", status: "active" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-blue-500/10">
          <Users className="w-4 h-4 text-blue-400 mb-1" />
          <p className="text-xl font-black">6</p>
          <p className="text-[10px] text-slate-500 uppercase">Total Users</p>
        </div>
        <div className="p-3 rounded-xl bg-green-500/10">
          <Activity className="w-4 h-4 text-green-400 mb-1" />
          <p className="text-xl font-black">5</p>
          <p className="text-[10px] text-slate-500 uppercase">Active</p>
        </div>
        <div className="p-3 rounded-xl bg-red-500/10">
          <Ban className="w-4 h-4 text-red-400 mb-1" />
          <p className="text-xl font-black">1</p>
          <p className="text-[10px] text-slate-500 uppercase">Banned</p>
        </div>
      </div>

      <div className="rounded-2xl bg-white/5 border border-white/5 overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-white/5">
            <tr>
              <th className="px-3 py-2 text-left font-bold text-slate-400 uppercase">User</th>
              <th className="px-3 py-2 text-left font-bold text-slate-400 uppercase hidden sm:table-cell">Role</th>
              <th className="px-3 py-2 text-left font-bold text-slate-400 uppercase hidden md:table-cell">Joined</th>
              <th className="px-3 py-2 text-center font-bold text-slate-400 uppercase">Status</th>
              <th className="px-3 py-2 text-right font-bold text-slate-400 uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((u) => (
              <tr key={u.id} className="border-t border-white/5 hover:bg-white/5">
                <td className="px-3 py-2.5">
                  <p className="text-slate-300 font-medium">{u.name}</p>
                  <p className="text-[10px] text-slate-500">{u.email}</p>
                </td>
                <td className="px-3 py-2.5 hidden sm:table-cell">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                    u.role === "Admin" ? "bg-orange-500/20 text-orange-400" :
                    u.role === "Mod" ? "bg-blue-500/20 text-blue-400" :
                    "bg-slate-500/20 text-slate-400"
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-3 py-2.5 text-slate-500 hidden md:table-cell">{u.joined}</td>
                <td className="px-3 py-2.5 text-center">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                    u.status === "active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                  }`}>
                    {u.status}
                  </span>
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-1.5 rounded hover:bg-white/10">
                      <Edit className="w-3.5 h-3.5 text-blue-400" />
                    </button>
                    {u.status === "active" ? (
                      <button className="p-1.5 rounded hover:bg-red-500/10">
                        <Ban className="w-3.5 h-3.5 text-red-400" />
                      </button>
                    ) : (
                      <button className="p-1.5 rounded hover:bg-green-500/10">
                        <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ===== EVENTS TAB =====
function EventsTab() {
  const events = [
    { name: "Ammo Bonanza", status: "active", ends: "23h còn lại", participants: 342 },
    { name: "Restricted Area Weekend", status: "active", ends: "6h còn lại", participants: 218 },
    { name: "Desert Treasure", status: "active", ends: "3d còn lại", participants: 156 },
    { name: "Mining Rush Week", status: "scheduled", ends: "Bắt đầu 15/07", participants: 0 },
  ];

  return (
    <div className="space-y-4">
      <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/20 text-green-400 text-sm hover:bg-green-500/30 transition-all">
        <Plus className="w-4 h-4" />
        Tạo Event mới
      </button>

      <div className="grid sm:grid-cols-2 gap-3">
        {events.map((ev) => (
          <div key={ev.name} className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-sm">{ev.name}</h3>
              <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                ev.status === "active" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
              }`}>
                {ev.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-500">
              <span>⏰ {ev.ends}</span>
              <span>👥 {ev.participants} người</span>
            </div>
            <div className="flex gap-1 mt-3">
              <button className="flex-1 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 text-[10px] hover:bg-blue-500/20 flex items-center justify-center gap-1">
                <Edit className="w-3 h-3" /> Edit
              </button>
              <button className="flex-1 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-[10px] hover:bg-red-500/20 flex items-center justify-center gap-1">
                <Trash2 className="w-3 h-3" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== SETTINGS TAB =====
function SettingsTab() {
  const [settings, setSettings] = useState({
    siteName: "LASTWAR HQ",
    siteUrl: "footzone.vn",
    maintenanceMode: false,
    registrationOpen: true,
    autoTranslate: true,
    discordWebhook: "",
    adminEmail: "thinhliv@gmail.com",
  });
  const [saved, setSaved] = useState(false);

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="max-w-lg space-y-4">
      {saved && (
        <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-xs text-green-400 text-center">
          ✅ Đã lưu cài đặt!
        </div>
      )}

      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-300">Cài đặt chung</h3>
        <div>
          <label className="text-[10px] text-slate-500 uppercase">Tên site</label>
          <input value={settings.siteName} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm mt-1" />
        </div>
        <div>
          <label className="text-[10px] text-slate-500 uppercase">Domain</label>
          <input value={settings.siteUrl} onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm mt-1" />
        </div>
        <div>
          <label className="text-[10px] text-slate-500 uppercase">Admin Email</label>
          <input value={settings.adminEmail} onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm mt-1" />
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-300">Toggles</h3>
        {[
          { key: "maintenanceMode", label: "🔧 Chế độ bảo trì", desc: "Tạm khóa site cho user thường" },
          { key: "registrationOpen", label: "✨ Cho phép đăng ký", desc: "User mới có thể tạo tài khoản" },
          { key: "autoTranslate", label: "🌐 Auto-translate", desc: "Tự động dịch chat toàn cầu" },
        ].map((t) => (
          <div key={t.key} className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">{t.label}</p>
              <p className="text-[10px] text-slate-500">{t.desc}</p>
            </div>
            <button
              onClick={() => setSettings({ ...settings, [t.key]: !settings[t.key as keyof typeof settings] })}
              className={`w-12 h-6 rounded-full transition-all relative ${settings[t.key as keyof typeof settings] ? "bg-orange-500" : "bg-slate-700"}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${settings[t.key as keyof typeof settings] ? "left-6" : "left-0.5"}`} />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={save}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm hover:from-orange-600 hover:to-orange-700 flex items-center justify-center gap-2"
      >
        <Save className="w-4 h-4" />
        Lưu cài đặt
      </button>
    </div>
  );
}

// ===== MISSING IMPORTS =====
import { Shield, Ban, CheckCircle } from "lucide-react";
