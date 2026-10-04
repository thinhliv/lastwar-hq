"use client";

import { useState } from "react";
import { Check, Flame, Send, Sparkles, ShieldAlert, Clock, QrCode, Coins } from "lucide-react";
import { VND_PLANS, USD_PLANS } from "@/data/plans";
import { TELEGRAM_BUY_BOT } from "@/lib/telegram";

export default function PricingSection({ compact = false }: { compact?: boolean }) {
  const [currency, setCurrency] = useState<"VND" | "USD">("VND");

  const plans = currency === "VND" ? VND_PLANS : USD_PLANS;

  return (
    <section id="pricing" className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bảng Giá Niêm Yết Chính Thức</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-3">
            Chọn Gói Bản Quyền Monica Bot
          </h2>
          <p className="text-sm text-slate-400">
            Kích hoạt tự động 24/7 qua Telegram Bot. Hỗ trợ đầy đủ PC Client và Giả lập.
          </p>

          {/* Currency Toggle */}
          <div className="mt-6 inline-flex p-1 rounded-2xl bg-slate-900 border border-white/10 shadow-inner">
            <button
              onClick={() => setCurrency("VND")}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                currency === "VND"
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>🇻🇳 Khách Việt Nam (VND)</span>
            </button>
            <button
              onClick={() => setCurrency("USD")}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                currency === "USD"
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>🌍 International (USD)</span>
            </button>
          </div>
        </div>

        {/* IMPORTANT TEAM MURPHY NOTICE */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border border-amber-500/30 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center flex-shrink-0 text-amber-400 font-black">
                ★
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-300">
                  Bước Bắt Buộc: Chọn Nguồn "Team Murphy" Khi Mua Trong Bot
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Khi Bot hỏi <span className="text-white font-semibold">"Bạn biết đến Tool qua Đại lý nào?"</span>, bạn hãy bấm chọn <strong className="text-amber-400 font-bold underline">Team Murphy</strong> để hệ thống ghi nhận hoa hồng và kích hoạt dịch vụ hỗ trợ kỹ thuật tận tâm 24/7 từ team mình!
                </p>
              </div>
            </div>
            <a
              href="#guide"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white whitespace-nowrap transition-colors"
            >
              Xem ảnh mẫu
            </a>
          </div>
        </div>

        {/* Payment info bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          {currency === "VND" ? (
            <>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center gap-3">
                <QrCode className="w-5 h-5 text-green-400 flex-shrink-0" />
                <div className="text-xs">
                  <span className="font-semibold text-white">Thanh toán VietQR tự động:</span>
                  <span className="text-slate-400 ml-1">Mã QR tạo riêng từng đơn, ngân hàng BIDV, nhận key trong 15 giây.</span>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-amber-500/20 flex items-center gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div className="text-xs">
                  <span className="font-semibold text-amber-300">Quy định vùng:</span>
                  <span className="text-slate-300 ml-1">Key giá Việt Nam chỉ sử dụng trên lãnh thổ Việt Nam.</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center gap-3">
                <Coins className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <div className="text-xs">
                  <span className="font-semibold text-white">Automated Crypto Payment:</span>
                  <span className="text-slate-400 ml-1">USDT Tron (TRC-20) or Solana. Instant key delivery ~1 min.</span>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div className="text-xs">
                  <span className="font-semibold text-white">Exact Amount Notice:</span>
                  <span className="text-slate-400 ml-1">Match amount to the cent (order ID). Valid for 30 minutes.</span>
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
                    ? "bg-gradient-to-b from-amber-500/15 via-slate-900/80 to-slate-950 border-2 border-amber-500/50 shadow-2xl shadow-amber-500/10 scale-[1.02]"
                    : p.isSale
                    ? "bg-gradient-to-b from-orange-500/15 via-slate-900/80 to-slate-950 border border-orange-500/40"
                    : "bg-slate-900/60 hover:bg-slate-900/90 border border-white/10"
                }`}
              >
                {/* Badges */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {p.duration}
                  </span>
                  {p.isPopular && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-[11px] font-black uppercase">
                      <Flame className="w-3 h-3 fill-current" /> Phổ Biến Nhất
                    </span>
                  )}
                  {p.badge && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-[11px] font-bold">
                      {p.badge}
                    </span>
                  )}
                </div>

                {/* Title & Price */}
                <div className="mb-6">
                  <h3 className="text-xl font-black text-white mb-2">{p.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-white">
                      {formattedPrice}
                    </span>
                    {formattedOrigPrice && (
                      <span className="text-sm line-through text-slate-500 font-medium">
                        {formattedOrigPrice}
                      </span>
                    )}
                  </div>
                  {p.discountPercent && (
                    <span className="text-[11px] font-semibold text-green-400 mt-1 block">
                      Tiết kiệm {p.discountPercent}% so với giá gốc
                    </span>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {p.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Buy Button */}
                <a
                  href={TELEGRAM_BUY_BOT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-sm uppercase tracking-wide transition-all shadow-lg active:scale-95 ${
                    p.isPopular
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-orange-500/25"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>Mua Trên Telegram</span>
                </a>
              </div>
            );
          })}
        </div>

        {/* Footer info note */}
        <div className="mt-8 text-center text-xs text-slate-500">
          Cần mua thêm cửa sổ đa luồng (Add-on Windows) hoặc gia hạn key? Mở Bot Telegram chọn mục tương ứng.
        </div>
      </div>
    </section>
  );
}
