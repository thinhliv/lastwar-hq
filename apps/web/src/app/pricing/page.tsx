import type { Metadata } from "next";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import StepByStepGuide from "@/components/StepByStepGuide";

export const metadata: Metadata = {
  title: "Bảng Giá Monica Bot — Mua Key Tự Động | Team Murphy",
  description:
    "Bảng giá chính thức các gói Monica Bot cho Last War: Survival: Gói 7 ngày, 1 tháng, 3 tháng, 6 tháng, 1 năm và trọn đời vĩnh viễn. Kích hoạt tự động qua Telegram bot.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white text-center mb-3">
          Bảng Giá & Gói Cước Bản Quyền
        </h1>
        <p className="text-sm sm:text-base text-slate-300 text-center max-w-xl mx-auto">
          Chọn gói phù hợp với nhu cầu của bạn. Kích hoạt key tự động 24/7 qua Telegram Bot. Hỗ trợ độc quyền bởi Team Murphy.
        </p>
      </div>

      <PricingSection />
      <StepByStepGuide />
      <FAQSection />
    </div>
  );
}
