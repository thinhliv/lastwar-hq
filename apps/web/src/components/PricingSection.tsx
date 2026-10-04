"use client";

import { useState } from "react";
import { Check, Flame, Send, Sparkles, ShieldAlert, Clock, QrCode, Coins, Crown } from "lucide-react";
import { VND_PLANS, USD_PLANS } from "@/data/plans";
import { TELEGRAM_BUY_BOT } from "@/lib/telegram";

export default function PricingSection({ compact = false }: { compact?: boolean }) {
  const [currency, setCurrency] = useState<"VND" | "USD">("VND");

  const plans = currency === "VND" ? VND_PLANS : USD_PLANS;

  return (
    <section id="pricing" className="py-14 sm:py-20 relative">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5 fill-red-400 text-red-400" />
            <span>CHI PHÍ ĐẦU TƯ TÁC CHIẾN</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-3">
            Bảng Giá Bản Quyền Monica Bot
          </h2>
          <p className="text-sm text-red-100/70">
            Kích hoạt tự động 24/7 qua Telegram Bot. Hỗ trợ đầy đủ PC Client và mọi trình giả lập.
          </p>

          {/* Currency Toggle */}
          <div className="mt-6 inline-flex p-1 rounded-2xl bg-[#14080c] border border-red-500/30 shadow-inner">
            <button
              onClick={() => setCurrency("VND")}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                currency === "VND"
                  ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>🇻🇳 Khách Việt Nam (VND)</span>
            </button>
            <button
              onClick={() => setCurrency("USD")}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                currency === "USD"
                  ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>🌍 International (USD)</span>
            </button>
          </div>
        </div>

        {/* IMPORTANT TEAM MURPHY NOTICE */}
        <div className="mb-10 p-5 rounded-2xl bg-gradient-to-r from-red-950/60 via-[#1e0a10] to-red-950/60 border border-red-500/40 backdrop-blur-md shadow-xl shadow-red-950/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-red-600/25 border border-red-500/50 flex items-center justify-center flex-shrink-0 text-amber-400 font-black shadow-inner">
                <Crown className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h4 className="text-sm font-black text-amber-300 uppercase tracking-wide">
                  Bước Bắt Buộc: Chọn Nguồn "Team Murphy" Khi Mua Trong Bot
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Khi Bot hỏi <span className="text-white font-bold">"Bạn biết đến Tool qua Đại lý nào?"</span>, bạn hãy bấm chọn <strong className="text-amber-400 font-extrabold underline">Team Murphy</strong> để hệ thống kích hoạt chính sách bảo hành và hỗ trợ kỹ thuật tận tâm 24/7 từ team mình!
                </p>
              </div>
            </div>
            <a
              href="#guide"
              className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-xs font-bold text-red-200 whitespace-nowrap transition-colors"
            >
              Xem ảnh hướng dẫn
            </a>
          </div>
        </div>

        {/* Payment info bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-8">
          {currency === "VND" ? (
            <>
              <div className="p-4 rounded-xl bg-[#16080c]/80 border border-red-500/20 flex items-center gap-3">
                <QrCode className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-white">Thanh toán VietQR tự động:</span>
                  <span className="text-slate-300 ml-1">Mã QR riêng từng đơn, ngân hàng BIDV, nhận key sau 15 giây.</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#16080c]/80 border border-amber-500/30 flex items-center gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-amber-300">Quy định vùng:</span>
                  <span className="text-slate-300 ml-1">Key mua theo giá VND chỉ sử dụng trên lãnh thổ Việt Nam.</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="p-4 rounded-xl bg-[#16080c]/80 border border-red-500/20 flex items-center gap-3">
                <Coins className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-white">Automated Crypto Payment:</span>
                  <span className="text-slate-300 ml-1">USDT Tron (TRC-20) or Solana. Instant key delivery ~1 min.</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#16080c]/80 border border-amber-500/30 flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-white">Exact Amount Notice:</span>
                  <span className="text-slate-300 ml-1">Match amount to the cent (order ID). Valid for 30 minutes.</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((p) => {
            const formattedPrice =
              currency === "VND"
                ? `${p.price.toLocaleString("vi-VN")}đ`
                : `$${p.price}`;
            const formattedOrigPrice = p.originalPrice
              ? currency === "VND"
                ? `${p.originalPrice.toLocaleString("vi-VN")}đ`
                : `$${p.originalPrice}`
              : null;

            return (
              <div
                key={p.id}
                className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  p.isPopular
                    ? "bg-gradient-to-b from-red-950/50 via-[#18080d] to-[#120508] border-2 border-red-500 shadow-2xl shadow-red-950/60 scale-[1.02]"
                    : p.isSale
                    ? "bg-gradient-to-b from-amber-950/40 via-[#18080d] to-[#120508] border-2 border-amber-500/60 shadow-xl shadow-amber-950/40"
                    : "bg-[#15080c]/85 hover:bg-[#1c0a10] border border-red-500/20 hover:border-red-500/40 shadow-lg"
                }`}
              >
                {/* Badges */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                    {p.duration}
                  </span>
                  {p.isPopular && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white text-[11px] font-black uppercase shadow-md shadow-red-600/30">
                      <Flame className="w-3 h-3 fill-current" /> Phổ Biến Nhất
                    </span>
                  )}
                  {p.badge && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-black">
                      {p.badge}
                    </span>
                  )}
                </div>

                {/* Title & Price */}
                <div className="mb-6">
                  <h3 className="text-lg font-black text-white mb-2">{p.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-3xl font-black ${p.isSale ? "text-amber-400" : "text-white"}`}>
                      {formattedPrice}
                    </span>
                    {formattedOrigPrice && (
                      <span className="text-sm text-slate-500 line-through">
                        {formattedOrigPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features List */}
                <div className="mb-6 pt-5 border-t border-red-500/15">
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    {p.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <a
                  href={TELEGRAM_BUY_BOT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all hover:scale-102 active:scale-98 ${
                    p.isPopular
                      ? "bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-xl shadow-red-600/35 border border-red-400/40"
                      : p.isSale
                      ? "bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-xl shadow-amber-500/25 border border-amber-400/40"
                      : "bg-red-950/40 hover:bg-red-900/50 text-white border border-red-500/30"
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Mua Key Telegram (Team Murphy)</span>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
