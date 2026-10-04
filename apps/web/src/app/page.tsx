import Image from "next/image";
import Link from "next/link";
import {
  Send,
  Play,
  Shield,
  Zap,
  Layers,
  ChevronRight,
  ExternalLink,
  Flame,
  Clock,
  Coins,
  Swords,
  Skull,
  Server,
  Sparkles,
} from "lucide-react";
import PricingSection from "@/components/PricingSection";
import FeaturesSection from "@/components/FeaturesSection";
import StepByStepGuide from "@/components/StepByStepGuide";
import VideoSection from "@/components/VideoSection";
import FAQSection from "@/components/FAQSection";
import { TELEGRAM_BUY_BOT, TELEGRAM_SUPPORT_GROUP } from "@/lib/telegram";

export default function HomePage() {
  return (
    <div className="min-h-screen text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 overflow-hidden border-b border-white/5 bg-gradient-to-b from-[#0e1629] via-[#0b1120] to-[#080d19]">
        {/* Glow gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-500/10 to-orange-500/15 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Headline & CTA */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-6">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Phiên Bản 2309_BigUpdate · Phân Phối Bởi Team Murphy</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-5">
                Trợ Lý Tác Chiến Đỉnh Cao Cho{" "}
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                  Last War: Survival
                </span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
                Tự động tham gia Rally, quản lý sự kiện, hỗ trợ nhiều tài khoản (Đa ACC) nhẹ máy trên PC. Kích hoạt key tự động 24/7 chỉ sau 15 giây qua Telegram.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-8">
                <a
                  href={TELEGRAM_BUY_BOT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-orange-500/25 transition-all hover:scale-105 active:scale-95"
                >
                  <Send className="w-4 h-4 fill-slate-950" />
                  <span>Mua Key Telegram</span>
                </a>

                <a
                  href="#video"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-sm border border-white/10 transition-colors"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Xem Video Demo</span>
                </a>

                <Link
                  href="/pricing"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-slate-300 hover:text-amber-400 font-semibold text-sm transition-colors"
                >
                  <span>Bảng Giá</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust & Guarantee Callout */}
              <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span>Kích hoạt 15s (VietQR)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Crypto USDT Tron/Solana</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>Đại lý chính thức: Team Murphy</span>
                </div>
              </div>
            </div>

            {/* Right Column: App Showcase Preview */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/30 bg-slate-950 p-2 sm:p-3 shadow-2xl shadow-orange-500/10">
                  {/* Top Bar simulation */}
                  <div className="flex items-center justify-between px-3 py-2 bg-slate-900/90 rounded-2xl border border-white/5 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                      <span className="text-[11px] font-bold text-green-400">
                        Trạng thái: Game đã mở
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      Phiên bản 2309
                    </span>
                  </div>

                  {/* App Screen Image */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/bot/monica-app-preview.png"
                      alt="Giao diện Monica Bot Last War"
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 500px"
                    />
                  </div>

                  {/* Bottom App Bar snippet */}
                  <div className="mt-2 p-2.5 rounded-xl bg-slate-900/90 border border-white/5 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">
                      Bản quyền phân phối:{" "}
                      <strong className="text-amber-400">Team Murphy</strong>
                    </span>
                    <a
                      href={TELEGRAM_BUY_BOT}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 font-bold hover:underline flex items-center gap-1"
                    >
                      Kích hoạt <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <FeaturesSection />

      {/* ===== STEP BY STEP GUIDE (WITH ACTUAL SCREENSHOTS) ===== */}
      <StepByStepGuide />

      {/* ===== VIDEO TUTORIAL & DEMO SECTION ===== */}
      <VideoSection />

      {/* ===== PRICING SECTION ===== */}
      <PricingSection />

      {/* ===== FREE COMMUNITY TOOLS SECTION ===== */}
      <section className="py-12 sm:py-16 bg-[#080d19] border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-semibold mb-2">
                <Swords className="w-3.5 h-3.5 text-orange-500" />
                <span>Tiện Ích Miễn Phí Đi Kèm</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-white">
                Bộ Công Cụ Tra Cứu Game Thủ
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Dữ liệu tra cứu boss, tính exp hero và tìm kiếm liên minh dành cho cộng đồng.
              </p>
            </div>
            <Link
              href="/tools"
              className="text-xs sm:text-sm text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 whitespace-nowrap"
            >
              Xem tất cả công cụ <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/tools/calculators"
              className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-orange-500/30 transition-all hover:-translate-y-0.5 block"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-3">
                <Skull className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">
                Boss Restricted Area
              </h3>
              <p className="text-xs text-slate-400">
                Tra cứu sức mạnh boss chính xác theo từng level và stage.
              </p>
            </Link>

            <Link
              href="/tools/calculators"
              className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-amber-500/30 transition-all hover:-translate-y-0.5 block"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">
                Hero EXP Calculator
              </h3>
              <p className="text-xs text-slate-400">
                Tính toán lượng EXP cần thiết để nâng cấp tướng giữa hai cấp độ bất kỳ.
              </p>
            </Link>

            <Link
              href="/tools/clan-finder"
              className="p-5 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-pink-500/30 transition-all hover:-translate-y-0.5 block"
            >
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center mb-3">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">
                Danh Bạ Server / Alliance
              </h3>
              <p className="text-xs text-slate-400">
                Tra cứu mã server và alliance để liên kết cùng đồng đội.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <FAQSection />

      {/* ===== GLOBAL FOOTER ===== */}
      <footer className="py-10 border-t border-white/5 bg-[#050914] text-slate-400 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-black text-white">MONICA BOT</span>
              <span className="text-slate-600">·</span>
              <span>Đại lý chính thức: Team Murphy</span>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <Link href="/pricing" className="hover:text-white transition-colors">
                Bảng giá
              </Link>
              <Link href="/guide" className="hover:text-white transition-colors">
                Hướng dẫn
              </Link>
              <Link href="/about" className="hover:text-white transition-colors">
                Về chúng tôi
              </Link>
              <a
                href={TELEGRAM_SUPPORT_GROUP}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline"
              >
                Nhóm Hỗ Trợ Telegram
              </a>
            </div>
          </div>
          <div className="mt-4 text-center sm:text-left text-[11px] text-slate-500">
            © 2026 Team Murphy · Monica Bot Reseller. Fan-made utility site, không liên kết chính thức với Century Games hay FirstFun.
          </div>
        </div>
      </footer>
    </div>
  );
}
