import Image from "next/image";
import { Send, CheckCircle2, AlertTriangle, ArrowRight, Flame, Crown, Download } from "lucide-react";
import { TELEGRAM_BUY_BOT } from "@/lib/telegram";

export default function StepByStepGuide() {
  const steps = [
    {
      num: 1,
      title: "Mở Bot Thanh Toán Telegram",
      desc: "Nhấp vào nút Mua Key trên website để mở trực tiếp bot @tool_lastwar_buysell_bot trên Telegram của bạn.",
      image: "/images/bot/step-language.png",
      alt: "Chọn ngôn ngữ trong bot",
      highlight: "Hỗ trợ 5 ngôn ngữ: Tiếng Việt, English, Русский, 中文, العربية",
    },
    {
      num: 2,
      title: "Chọn Nhu Cầu Mua Hoặc Gia Hạn",
      desc: "Chọn Mua Key Mới, Gia hạn key đang dùng, hoặc Mua thêm cửa sổ (đa mở tài khoản) tùy theo nhu cầu của bạn.",
      image: "/images/bot/step-menu.png",
      alt: "Tùy chọn mua key hoặc gia hạn",
      highlight: "Quy định: Key Việt Nam thanh toán VND chỉ áp dụng cho người dùng trong nước.",
    },
    {
      num: 3,
      title: "BẮT BUỘC: Chọn 'Team Murphy'",
      desc: "Khi Bot hỏi 'Bạn biết đến Tool qua Đại lý / Nguồn nào?', hãy nhấp chọn nút 'Team Murphy'.",
      image: "/images/bot/step-team-murphy.png",
      alt: "Chọn đại lý Team Murphy",
      highlight: "★ Bước quan trọng để ghi nhận giao dịch và kích hoạt đặc quyền hỗ trợ VIP 24/7 từ Team Murphy!",
      isWarning: true,
    },
    {
      num: 4,
      title: "Thanh Toán Tự Động & Nhận Key",
      desc: "Quét mã VietQR chuyển khoản (Việt Nam) nhận key sau 15 giây, hoặc gửi Crypto USDT (Quốc tế) nhận key sau ~1 phút.",
      image: "/images/bot/pricing-usd.png",
      alt: "Bảng giá và thanh toán",
      highlight: "Key và hướng dẫn kích hoạt được gửi trực tiếp vào tin nhắn Telegram của bạn.",
    },
  ];

  return (
    <section id="guide" className="py-14 sm:py-20 bg-[#0d0508]/80 border-y border-red-500/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5 fill-red-400 text-red-400" />
            <span>QUY TRÌNH TIẾP NHẬN KEY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-3">
            Hướng Dẫn Mua & Kích Hoạt Key
          </h2>
          <p className="text-sm sm:text-base text-red-100/70">
            Xem ảnh chụp thực tế từng bước để kích hoạt nhanh chóng và chuẩn xác nhất.
          </p>
        </div>

        {/* Direct Download Banner */}
        <div className="mb-10 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-950/40 via-[#15080c] to-red-950/30 border border-amber-500/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 border border-amber-500/30 shadow-lg shadow-amber-500/10">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2 justify-center sm:justify-start">
                Tải Bộ Cài Đặt Monica Bot
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold">
                  Bản Mới Nhất
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                File nén <code className="text-amber-300 font-mono">Setup_Monica.rar</code> (46.3 MB) — Dành cho máy tính Windows PC & các trình giả lập.
              </p>
            </div>
          </div>
          <a
            href="/downloads/Setup_Monica.rar"
            download="Setup_Monica.rar"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm uppercase tracking-wide shadow-lg shadow-amber-500/25 transition-all hover:scale-105 active:scale-95 flex-shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Tải File .RAR (46MB)</span>
          </a>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {steps.map((s) => (
            <div
              key={s.num}
              className={`rounded-3xl p-6 sm:p-7 bg-[#15080c]/85 border flex flex-col justify-between transition-all ${
                s.isWarning
                  ? "border-amber-500/60 shadow-xl shadow-amber-950/40 ring-1 ring-amber-500/40 bg-gradient-to-b from-amber-950/30 to-[#15080c]"
                  : "border-red-500/20 hover:border-red-500/40 shadow-lg shadow-black/40"
              }`}
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm ${
                      s.isWarning
                        ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}
                  >
                    0{s.num}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {s.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                  {s.desc}
                </p>

                {/* Screenshot Frame */}
                <div className="relative rounded-2xl overflow-hidden border border-red-500/20 bg-black/60 my-4 shadow-inner">
                  <div className="relative w-full h-56 sm:h-64">
                    <Image
                      src={s.image}
                      alt={s.alt}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>

              {/* Highlight Note */}
              <div
                className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                  s.isWarning
                    ? "bg-amber-500/15 border border-amber-500/30 text-amber-200"
                    : "bg-red-950/40 border border-red-500/20 text-slate-300"
                }`}
              >
                {s.isWarning ? (
                  <Crown className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                )}
                <span>{s.highlight}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-12 text-center">
          <a
            href={TELEGRAM_BUY_BOT}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-red-600/35 transition-all hover:scale-105 active:scale-95 border border-red-400/30"
          >
            <Send className="w-4 h-4" />
            <span>Mở Bot Telegram & Bắt Đầu Ngay</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
