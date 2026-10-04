import Image from "next/image";
import { Send, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
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
    <section id="guide" className="py-12 sm:py-16 bg-slate-950/60 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
            <span>Quy Trình 4 Bước Đơn Giản</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-3">
            Hướng Dẫn Mua & Kích Hoạt Key
          </h2>
          <p className="text-sm text-slate-400">
            Xem ảnh chụp thực tế từng bước để thực hiện nhanh chóng và chính xác.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {steps.map((s) => (
            <div
              key={s.num}
              className={`rounded-3xl p-6 bg-slate-900/80 border flex flex-col justify-between transition-all ${
                s.isWarning
                  ? "border-amber-500/50 shadow-xl shadow-amber-500/10 ring-1 ring-amber-500/30"
                  : "border-white/10"
              }`}
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm ${
                      s.isWarning
                        ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30"
                        : "bg-white/10 text-white"
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
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-950 my-4 shadow-inner">
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

              {/* Highlight callout */}
              <div
                className={`mt-3 p-3 rounded-xl text-xs flex items-start gap-2 ${
                  s.isWarning
                    ? "bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold"
                    : "bg-white/5 border border-white/5 text-slate-400"
                }`}
              >
                {s.isWarning ? (
                  <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                )}
                <span>{s.highlight}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Big Bottom Action Box */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-slate-900 border border-amber-500/30 text-center max-w-3xl mx-auto shadow-2xl">
          <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
            Đã Sẵn Sàng Trải Nghiệm Monica Bot?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mb-6 max-w-lg mx-auto">
            Nhấp nút bên dưới để mở Telegram Bot và bắt đầu chọn gói phù hợp ngay bây giờ. Đừng quên chọn nguồn <strong className="text-amber-400">Team Murphy</strong>!
          </p>
          <a
            href={TELEGRAM_BUY_BOT}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-orange-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>Mở Bot Thanh Toán Ngay</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
