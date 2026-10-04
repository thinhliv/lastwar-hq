import {
  Layers,
  Cpu,
  Shield,
  Zap,
  Globe2,
  Clock,
  Swords,
  Users2,
  Flame,
  Crosshair,
  Crown,
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Crosshair,
      title: "Săn Xe Tải UR 100% Chuẩn Xác",
      desc: "Tự động phát hiện và cướp trọn gói xe tải UR vàng, mang về hàng chục triệu vàng và lúa sắt mỗi ngày cho liên minh.",
      accent: "text-red-400 bg-red-500/10 border-red-500/30",
    },
    {
      icon: Swords,
      title: "Tự Động Rally & Sự Kiện VS",
      desc: "Tham gia diệt Zombie Vàng, sự kiện thủ phủ và tối ưu hóa điểm số ngày thi đấu Server vs Server không ngừng nghỉ.",
      accent: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    },
    {
      icon: Shield,
      title: "Báo Động & Kích Khiên Tức Thì",
      desc: "Phát hiện ngay khi căn cứ bị trinh sát hoặc tấn công, tự động kích hoạt khiên hòa bình bảo toàn tuyệt đối quân số.",
      accent: "text-rose-400 bg-rose-500/10 border-rose-500/30",
    },
    {
      icon: Layers,
      title: "Treo Đa ACC Mượt Mà (PC / Giả Lập)",
      desc: "Vận hành đồng thời tài khoản farm và tài khoản chiến đấu, phân bổ tài nguyên hợp lý mà không lo giật lag hay treo máy.",
      accent: "text-orange-400 bg-orange-500/10 border-orange-500/30",
    },
    {
      icon: Crown,
      title: "Đặc Quyền Đại Lý Team Murphy",
      desc: "Hỗ trợ kỹ thuật 1:1, chia sẻ preset cấu hình auto chuẩn cho từng mùa giải, bảo hành key và hỗ trợ chuyển máy nhanh chóng.",
      accent: "text-amber-300 bg-amber-500/15 border-amber-500/40",
    },
    {
      icon: Globe2,
      title: "Giao Diện Đa Ngôn Ngữ Tiếng Việt",
      desc: "Menu điều khiển trực quan bằng Tiếng Việt 100%, hỗ trợ thêm tiếng Anh, tiếng Trung, tiếng Nga cho liên minh quốc tế.",
      accent: "text-red-300 bg-red-500/10 border-red-500/25",
    },
  ];

  return (
    <section id="features" className="py-14 sm:py-20 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-red-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5 fill-red-400 text-red-400" />
            <span>HỎA LỰC TỰ ĐỘNG HÓA</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-3">
            Trang Bị Tác Chiến Cho Thủ Lĩnh Last War
          </h2>
          <p className="text-sm text-red-100/70">
            Monica Bot giải phóng 100% thời gian cày cuốc lặp lại, giúp bạn nắm chắc lợi thế điểm số trong các trận chiến lớn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-7 rounded-3xl bg-[#16080c]/80 hover:bg-[#1f0a10]/95 border border-red-500/20 hover:border-red-500/50 transition-all hover:-translate-y-1 duration-300 shadow-xl shadow-black/40 hover:shadow-red-950/40"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-5 shadow-inner ${f.accent}`}
              >
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-white mb-2">{f.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
