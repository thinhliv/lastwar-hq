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
  Crown,
  Download,
} from "lucide-react";
import PricingSection from "@/components/PricingSection";
import FeaturesSection from "@/components/FeaturesSection";
import StepByStepGuide from "@/components/StepByStepGuide";
import VideoSection from "@/components/VideoSection";
import FAQSection from "@/components/FAQSection";
import { TELEGRAM_BUY_BOT, TELEGRAM_SUPPORT_GROUP } from "@/lib/telegram";

export default function HomePage() {
  return (
    <div className="min-h-screen text-slate-100 selection:bg-red-600 selection:text-white">
      {/* ===== HERO SECTION (STYLE 8: CRIMSON DUEL WAR ROOM) ===== */}
      <section className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 overflow-hidden border-b border-red-500/20 bg-gradient-to-b from-[#13060a] via-[#0d0407] to-[#080204]">
        {/* Burning Ember Glow Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[380px] bg-gradient-to-tr from-red-600/20 via-rose-600/15 to-amber-500/10 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-red-600/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Headline & CTA */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* War Campaign Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/35 text-red-300 text-xs font-bold tracking-wide uppercase mb-6 shadow-md shadow-red-950/40">
                <Flame className="w-3.5 h-3.5 fill-red-400 text-red-400 animate-pulse" />
                <span>CHIẾN DỊCH HUYẾT CHIẾN VS · ĐẠI LÝ ỦY QUYỀN TEAM MURPHY</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-5 uppercase">
                THỐNG TRỊ CHIẾN TRƯỜNG.{" "}
                <span className="bg-gradient-to-r from-red-400 via-rose-300 to-amber-400 bg-clip-text text-transparent drop-shadow-sm">
                  KHÔNG BAO GIỜ THỌT ĐIỂM VS.
                </span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 font-medium">
                Monica Bot tự động hóa 100% việc săn xe tải UR vàng, nhiệm vụ bí mật, chi viện hỏa lực liên minh và kích hoạt khiên hòa bình. Treo đa ACC siêu nhẹ máy trên Windows PC & Giả lập. Kích hoạt key tự động trong 15 giây.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-8">
                <a
                  href={TELEGRAM_BUY_BOT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto min-h-[48px] flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-red-600/35 transition-all hover:scale-105 active:scale-95 border border-red-400/40"
                >
                  <Send className="w-4 h-4 fill-white" />
                  <span>Mua Key Telegram (Team Murphy)</span>
                </a>

                <a
                  href="/downloads/Setup_Monica.rar"
                  download="Setup_Monica.rar"
                  className="w-full sm:w-auto min-h-[48px] flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 hover:text-amber-200 font-bold text-sm border border-amber-500/40 transition-all shadow-lg shadow-amber-950/30 group"
                >
                  <Download className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>Tải Tool (Setup_Monica.rar - 46MB)</span>
                </a>

                <a
                  href="#video"
                  className="w-full sm:w-auto min-h-[48px] flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-[#1a080d]/90 hover:bg-[#250b13] text-white font-bold text-sm border border-red-500/30 transition-colors shadow-lg"
                >
                  <Play className="w-4 h-4 fill-white text-white" />
                  <span>Xem 3 Video Demo</span>
                </a>

                <Link
                  href="/pricing"
                  className="w-full sm:w-auto min-h-[48px] flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-2xl text-amber-300 hover:text-amber-200 font-bold text-sm transition-colors"
                >
                  <span>Bảng Giá</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust & Guarantee Callout */}
              <div className="pt-4 border-t border-red-500/15 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-slate-300">VietQR BIDV nhận key 15s</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-slate-300">Crypto USDT TRC-20/Solana</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-amber-300 font-bold">Đại lý chính thức: Team Murphy</span>
                </div>
              </div>
            </div>

            {/* Right Column: App Showcase Preview */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-3xl overflow-hidden border-2 border-red-500/50 bg-[#120508] p-2.5 sm:p-3.5 shadow-2xl shadow-red-950/70">
                  {/* Top Bar simulation */}
                  <div className="flex items-center justify-between px-3 py-2 bg-[#1a080d] rounded-2xl border border-red-500/20 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      <span className="text-[11px] font-extrabold text-emerald-400">
                        TRẠNG THÁI: TÁC CHIẾN ONLINE
                      </span>
                    </div>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40">
                      BẢN BIG UPDATE 2309
                    </span>
                  </div>

                  {/* App Screen Image */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-red-500/20">
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
                  <div className="mt-2.5 p-3 rounded-xl bg-[#1a080d] border border-red-500/20 flex items-center justify-between text-[11px]">
                    <span className="text-slate-300">
                      Đại lý phân phối:{" "}
                      <strong className="text-amber-400 font-black">Team Murphy</strong>
                    </span>
                    <a
                      href={TELEGRAM_BUY_BOT}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-400 font-extrabold hover:underline flex items-center gap-1"
                    >
                      Kích hoạt ngay <ExternalLink className="w-3 h-3" />
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
      <section className="py-14 sm:py-20 bg-[#090305] border-t border-red-500/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-bold mb-2">
                <Swords className="w-3.5 h-3.5 text-red-400" />
                <span>TIỆN ÍCH MIỄN PHÍ CHO ANH EM</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
                Bộ Công Cụ Tra Cứu Game Thủ
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Dữ liệu tra cứu boss, tính EXP hero và tìm kiếm liên minh dành cho cộng đồng Last War.
              </p>
            </div>
            <Link
              href="/tools"
              className="text-xs sm:text-sm text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 whitespace-nowrap min-h-[44px]"
            >
              Xem tất cả công cụ <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/tools/calculators"
              className="p-5 rounded-2xl bg-[#15080c]/80 border border-red-500/20 hover:border-red-500/50 transition-all hover:-translate-y-0.5 block shadow-lg min-h-[48px]"
            >
              <div className="w-10 h-10 rounded-xl bg-red-500/15 text-red-400 flex items-center justify-center mb-3 border border-red-500/30">
                <Skull className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                Boss Restricted Area
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Tra cứu sức mạnh boss chính xác theo từng level và stage.
              </p>
            </Link>

            <Link
              href="/tools/calculators"
              className="p-5 rounded-2xl bg-[#15080c]/80 border border-amber-500/20 hover:border-amber-500/50 transition-all hover:-translate-y-0.5 block shadow-lg min-h-[48px]"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-3 border border-amber-500/30">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                Hero EXP Calculator
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Tính toán lượng EXP cần thiết để nâng cấp tướng giữa hai cấp độ bất kỳ.
              </p>
            </Link>

            <Link
              href="/tools/clan-finder"
              className="p-5 rounded-2xl bg-[#15080c]/80 border border-rose-500/20 hover:border-rose-500/50 transition-all hover:-translate-y-0.5 block shadow-lg min-h-[48px]"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center mb-3 border border-rose-500/30">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                Danh Bạ Server / Alliance
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Tra cứu mã server và alliance để liên kết cùng đồng đội.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <FAQSection />

      {/* ===== GLOBAL FOOTER ===== */}
      <footer className="py-12 border-t border-red-500/20 bg-[#060203] text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-black text-white tracking-wide">MONICA BOT</span>
              <span className="text-red-500">·</span>
              <span className="text-slate-300">Đại lý ủy quyền chính thức: <strong className="text-amber-400">Team Murphy</strong></span>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <Link href="/pricing" className="hover:text-red-400 transition-colors">
                Bảng giá
              </Link>
              <Link href="/guide" className="hover:text-red-400 transition-colors">
                Hướng dẫn
              </Link>
              <Link href="/about" className="hover:text-red-400 transition-colors">
                Về chúng tôi
              </Link>
              <a
                href={TELEGRAM_SUPPORT_GROUP}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline flex items-center gap-1"
              >
                Nhóm Hỗ Trợ Telegram <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
          <div className="mt-4 text-center sm:text-left text-[11px] text-slate-500">
            © 2026 Team Murphy · Monica Bot Reseller. Fan-made utility site cho cộng đồng game thủ Last War: Survival.
          </div>
        </div>
      </footer>
    </div>
  );
}
