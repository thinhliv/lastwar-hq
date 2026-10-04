import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bảng So Sánh 6 Phong Cách Thiết Kế | Monica Bot - Team Murphy',
  description: 'Trực quan hóa phong cách MiniMax từ getdesign.md và 5 phong cách đặc trưng cho Last War: Survival reseller.',
};

export default function StyleShowcasePage() {
  return (
    <div className="w-full min-h-screen bg-[#080a0f]">
      <iframe
        src="/style-showcase.html"
        title="Style Showcase"
        className="w-full h-screen border-none"
      />
    </div>
  );
}
