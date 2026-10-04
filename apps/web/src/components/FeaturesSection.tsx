import {
  Layers,
  Cpu,
  Shield,
  Zap,
  Globe2,
  Clock,
  Swords,
  Users2,
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Layers,
      title: "Hỗ Trợ Nhiều ACC (Đa Cửa Sổ)",
      desc: "Quản lý đồng thời nhiều tài khoản trang trại và tài khoản chiến đấu mượt mà, tối ưu CPU/RAM không giật lag.",
      accent: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      icon: Swords,
      title: "Tham Gia Rally & Sự Kiện Tự Động",
      desc: "Tự động tham gia diệt Zombie Vàng, sự kiện liên minh, tối ưu thể lực và thời gian canh sự kiện cả ngày lẫn đêm.",
      accent: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    },
    {
      icon: Shield,
      title: "Báo Động & Kích Khiên Hòa Bình",
      desc: "Cảnh báo khi lãnh địa bị soi hoặc tấn công, hỗ trợ kích hoạt khiên tự động bảo vệ tài nguyên và quân đội an toàn.",
      accent: "text-green-400 bg-green-500/10 border-green-500/20",
    },
    {
      icon: Cpu,
      title: "Tối Ưu Cực Nhẹ Trên Windows PC",
      desc: "Hỗ trợ chuẩn Windows 10/11 64-bit, tương thích cả bản Last War PC Client chính thức lẫn các trình giả lập phổ biến.",
      accent: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    },
    {
      icon: Globe2,
      title: "Giao Diện Đa Ngôn Ngữ",
      desc: "Tích hợp sẵn Tiếng Việt, Tiếng Anh, Tiếng Nga, Tiếng Trung và Tiếng Ả Rập, thân thiện với người chơi khắp thế giới.",
      accent: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      icon: Users2,
      title: "Đặc Quyền Đại Lý Team Murphy",
      desc: "Được tư vấn setup 1-1, chia sẻ profile cài đặt chuẩn, cập nhật bản vá nhanh và ưu đãi gia hạn độc quyền.",
      accent: "text-pink-400 bg-pink-500/10 border-pink-500/20",
    },
  ];

  return (
    <section id="features" className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Tính Năng Vượt Trội</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-3">
            Trợ Lý Tác Chiến Đỉnh Cao Cho Last War
          </h2>
          <p className="text-sm text-slate-400">
            Monica Bot được thiết kế để giải phóng thời gian cày cuốc lặp lại, giúp bạn tập trung vào chiến thuật liên minh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl bg-slate-900/60 hover:bg-slate-900/90 border border-white/5 hover:border-amber-500/30 transition-all hover:-translate-y-1 duration-300"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-5 ${f.accent}`}
              >
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
