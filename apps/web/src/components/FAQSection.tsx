"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Shield, AlertTriangle } from "lucide-react";
import { TELEGRAM_SUPPORT_GROUP } from "@/lib/telegram";

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Tại sao tôi bắt buộc phải chọn 'Team Murphy' khi mua trong Bot?",
      a: "Monica Bot có nhiều đại lý phân phối. Khi bạn nhấp chọn 'Team Murphy', đơn hàng của bạn sẽ được kích hoạt với gói bảo hành và hỗ trợ độc quyền từ Team Murphy: hỗ trợ cài đặt qua UltraViewer/TeamViewer nếu cần, chia sẻ script cấu hình tối ưu, giải đáp thắc mắc 24/7.",
    },
    {
      q: "Sau khi chuyển khoản, bao lâu thì tôi nhận được Key bản quyền?",
      a: "Hệ thống thanh toán hoàn toàn tự động 24/7. Với khách hàng Việt Nam quét mã VietQR ngân hàng BIDV, key sẽ được gửi vào tin nhắn Telegram trong khoảng 15 giây. Với khách hàng quốc tế thanh toán qua Crypto USDT Tron (TRC-20) / Solana, key được kích hoạt sau khoảng 1 phút khi mạng xác nhận.",
    },
    {
      q: "Key Việt Nam và Key Quốc Tế khác nhau như thế nào?",
      a: "Để hỗ trợ game thủ trong nước với mức giá ưu đãi nhất, Key thanh toán bằng VND chỉ áp dụng cho người dùng trong lãnh thổ Việt Nam. Nếu phát hiện key đăng nhập từ địa chỉ IP nước ngoài, hệ thống có thể tạm khóa key theo chính sách chung của nhà phát triển. Người chơi ở nước ngoài vui lòng chọn bảng giá USD.",
    },
    {
      q: "Phần mềm chạy trên thiết bị nào? Yêu cầu cấu hình ra sao?",
      a: "Monica Bot hoạt động trên hệ điều hành Windows 10 / Windows 11 (64-bit). Cấu hình tối thiểu: Intel Core i3, RAM 4GB (khuyến nghị 8GB+ nếu mở nhiều tài khoản cùng lúc). Phần mềm hỗ trợ cả bản PC Client chính thức của Last War lẫn các trình giả lập.",
    },
    {
      q: "Tôi có thể mua thêm cửa sổ (mở nhiều tài khoản cùng lúc) không?",
      a: "Hoàn toàn có! Trong Bot Telegram, bạn chọn mục 'MUA THÊM CỬA SỔ (đa mở)' hoặc 'GIA HẠN CỬA SỔ'. Tính năng này giúp bạn vận hành đồng thời các tài khoản phụ (farm) một cách tự động và tiện lợi.",
    },
  ];

  return (
    <section id="faq" className="py-12 sm:py-16 bg-slate-950/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Giải Đáp Thắc Mắc</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-3">
            Câu Hỏi Thường Gặp (FAQ)
          </h2>
          <p className="text-sm text-slate-400">
            Mọi thông tin cần biết trước khi mua và kích hoạt phần mềm.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3 mb-10">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-slate-900/60 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left gap-4"
                >
                  <span className="text-sm sm:text-base font-bold text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? "rotate-180 text-amber-400" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Disclaimer / Safety Box */}
        <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/5 flex items-start gap-3 text-xs text-slate-400 leading-relaxed">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-300 block mb-1">
              Tuyên bố miễn trừ trách nhiệm (Disclaimer):
            </strong>
            Monica Bot là phần mềm tiện ích hỗ trợ trải nghiệm người chơi được phân phối bởi đại lý Team Murphy. Dự án không liên kết, tài trợ hay bảo trợ bởi Century Games, FirstFun hay bất kỳ nhà phát hành game chính thức nào. Người dùng vui lòng tuân thủ điều khoản của trò chơi.
          </div>
        </div>
      </div>
    </section>
  );
}
