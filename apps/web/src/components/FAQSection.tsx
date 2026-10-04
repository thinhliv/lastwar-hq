"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Shield, AlertTriangle, Flame } from "lucide-react";
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
      a: "Monica Bot hoạt động trên hệ điều hành Windows 10 / Windows 11 (64-bit). Cấu hình tối thiểu: Intel Core i3, RAM 4GB (khuyến nghị 8GB+ nếu mở nhiều tài khoản cùng lúc). Phần mềm hỗ trợ cả bản PC Client chính thức của Last War lẫn các trình giả lập phổ biến.",
    },
    {
      q: "Tôi có thể mua thêm cửa sổ (mở nhiều tài khoản cùng lúc) không?",
      a: "Hoàn toàn có! Trong Bot Telegram, bạn chọn mục 'MUA THÊM CỬA SỔ (đa mở)' hoặc 'GIA HẠN CỬA SỔ'. Tính năng này giúp bạn vận hành đồng thời các tài khoản phụ (farm) một cách tự động và tiện lợi.",
    },
  ];

  return (
    <section id="faq" className="py-14 sm:py-20 bg-[#0a0406]/70 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5 fill-red-400 text-red-400" />
            <span>GIẢI ĐÁP THẮC MẮC CHIẾN TƯỚNG</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-3">
            Câu Hỏi Thường Gặp (FAQ)
          </h2>
          <p className="text-sm sm:text-base text-red-100/70">
            Mọi thông tin cần biết trước khi mua và kích hoạt phần mềm.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3.5 mb-10">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="rounded-2xl border border-red-500/20 bg-[#15080c]/80 overflow-hidden transition-all shadow-md"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full min-h-[48px] flex items-center justify-between p-4 sm:p-5 text-left gap-4 active:bg-white/5 transition-colors"
                >
                  <span className={`text-sm sm:text-base font-bold ${isOpen ? "text-red-400" : "text-white"}`}>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? "rotate-180 text-red-400" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-red-500/15">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Disclaimer / Safety Box */}
        <div className="p-5 rounded-2xl bg-[#16080c]/50 border border-amber-500/25 flex items-start gap-3.5 text-xs text-slate-400 leading-relaxed">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300 block mb-1">
              Tuyên bố miễn trừ trách nhiệm (Disclaimer):
            </strong>
            Monica Bot là phần mềm tiện ích hỗ trợ trải nghiệm người chơi được phân phối bởi đại lý Team Murphy. Dự án không liên kết, tài trợ hay bảo trợ bởi Century Games, FirstFun hay bất kỳ nhà phát hành game chính thức nào. Người dùng vui lòng tuân thủ điều khoản của trò chơi.
          </div>
        </div>
      </div>
    </section>
  );
}
