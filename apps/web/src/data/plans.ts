export interface Plan {
  id: string;
  name: string;
  duration: string;
  price: number;
  originalPrice?: number;
  currency: "VND" | "USD";
  badge?: string;
  isPopular?: boolean;
  isSale?: boolean;
  discountPercent?: number;
  features: string[];
}

export const VND_PLANS: Plan[] = [
  {
    id: "vn_7d",
    name: "Dùng Thử",
    duration: "7 Ngày",
    price: 99999,
    currency: "VND",
    features: [
      "Đầy đủ tính năng Monica Bot",
      "Hỗ trợ cài đặt trên PC & Giả lập",
      "Hỗ trợ kỹ thuật qua Team Murphy",
    ],
  },
  {
    id: "vn_30d",
    name: "Gói Tháng",
    duration: "30 Ngày",
    price: 299999,
    originalPrice: 399999,
    currency: "VND",
    isPopular: true,
    discountPercent: 25,
    features: [
      "Toàn bộ tính năng tự động sự kiện & farm",
      "Quản lý đa tài khoản (Nhiều ACC)",
      "Cập nhật phiên bản mới nhất",
      "Kích hoạt tự động 15 giây qua VietQR",
    ],
  },
  {
    id: "vn_90d",
    name: "3 Tháng",
    duration: "3 Tháng",
    price: 799999,
    originalPrice: 899999,
    currency: "VND",
    features: [
      "Tiết kiệm chi phí so với gói tháng",
      "Ưu tiên hỗ trợ kỹ thuật từ Team Murphy",
      "Hỗ trợ cấu hình tối ưu nhẹ máy 24/7",
    ],
  },
  {
    id: "vn_180d",
    name: "6 Tháng",
    duration: "6 Tháng",
    price: 1399000,
    originalPrice: 1799999,
    currency: "VND",
    discountPercent: 22,
    features: [
      "Thích hợp chiến mùa giải dài hạn",
      "Hỗ trợ setup tối ưu đa luồng",
      "Tặng script & profile chuẩn SLG",
    ],
  },
  {
    id: "vn_365d",
    name: "1 Năm",
    duration: "1 Năm",
    price: 2345000,
    originalPrice: 3599999,
    currency: "VND",
    discountPercent: 35,
    features: [
      "Chi phí trung bình chỉ ~195k / tháng",
      "Hỗ trợ đặc quyền VIP Team Murphy",
      "Bảo hành xuyên suốt thời gian sử dụng",
    ],
  },
  {
    id: "vn_lifetime",
    name: "Vĩnh Viễn",
    duration: "Trọn Đời",
    price: 3999000,
    currency: "VND",
    features: [
      "Sở hữu key vĩnh viễn không lo gia hạn",
      "Mọi bản cập nhật lớn trong tương lai",
      "Hỗ trợ 1-1 từ Admin Team Murphy",
      "Nhận key tự động trong 15 giây",
    ],
  },
];

export const USD_PLANS: Plan[] = [
  {
    id: "usd_7d",
    name: "Trial Plan",
    duration: "7 Days",
    price: 9,
    currency: "USD",
    features: [
      "Full Monica Bot feature suite",
      "PC Client & Emulator support",
      "Global multilingual assistance",
    ],
  },
  {
    id: "usd_1m",
    name: "Starter Plan",
    duration: "1 Month",
    price: 19,
    currency: "USD",
    isPopular: true,
    features: [
      "All automated drills & SLG helpers",
      "Multi-account management",
      "Fast instant activation in 1 min",
      "Instant key via Crypto TRC-20 / Solana",
    ],
  },
  {
    id: "usd_3m",
    name: "Basic Plan",
    duration: "3 Months",
    price: 49,
    currency: "USD",
    features: [
      "Ideal for full season tournaments",
      "Low CPU/RAM resource tuning",
      "Priority update patch delivery",
    ],
  },
  {
    id: "usd_1y",
    name: "Premium Plan",
    duration: "1 Year",
    price: 169,
    currency: "USD",
    features: [
      "Best value: just ~$14 / month",
      "Dedicated VIP support from Team Murphy",
      "All future big updates included",
    ],
  },
  {
    id: "usd_lifetime",
    name: "Ultimate Plan",
    duration: "Lifetime",
    price: 299,
    currency: "USD",
    features: [
      "Lifetime unlimited access & updates",
      "Crypto auto-confirm in ~1 minute",
      "VIP Discord & Telegram community perks",
      "Direct 1-on-1 team assistance",
    ],
  },
];
