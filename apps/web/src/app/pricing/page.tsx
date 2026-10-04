"use client";

import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import StepByStepGuide from "@/components/StepByStepGuide";
import { useI18n } from "@/lib/i18n";

export default function PricingPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen py-4 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 text-center">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-3">
          {t("pricing.pageTitle")}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
          {t("pricing.pageDesc")}
        </p>
      </div>

      <PricingSection />
      <StepByStepGuide />
      <FAQSection />
    </div>
  );
}
