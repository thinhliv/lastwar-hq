# 📋 KẾ HOẠCH DỰ ÁN: LASTWAR COMMUNITY PLATFORM
## "Cộng đồng toàn cầu cho game Last War: Survival"
### Phiên bản 3.1 — Bản hoàn chỉnh

---

## 🎯 TẦM NHÌN

Trở thành **nền tảng #1 toàn cầu** cho game Last War: Survival.

---

## 🏠 TRANG CHỦ (Homepage)

```
┌─────────────────────────────┐
│  ⚙️ Đổi ngôn ngữ 🇻🇳    🔔  │
├─────────────────────────────┤
│   ⚔️ LASTWAR HQ ⚔️          │
│   Cộng đồng toàn cầu         │
├─────────────────────────────┤
│  🔥 Tin nóng                │
│  ┌─────────────────────────┐│
│  │ 📰 Season 5 ra mắt!     ││
│  │ 📅 Event: Ammo Bonanza  ││
│  │ 🔧 Maintenance 12/07    ││
│  └─────────────────────────┘│
├─────────────────────────────┤
│  🧮 Công cụ nhanh           │
│  ┌────┐ ┌────┐ ┌────┐      │
│  │🗺️  │ │🧮  │ │📖  │      │
│  │Maps│ │Calc│ │Guide│     │
│  └────┘ └────┘ └────┘      │
│  ┌────┐ ┌────┐ ┌────┐      │
│  │📊  │ │📅  │ │🔍  │      │
│  │Server│ │Event│ │Clan│   │
│  └────┘ └────┘ └────┘      │
├─────────────────────────────┤
│  💬 Chat gần đây            │
│  ┌─────────────────────────┐│
│  │🌍 #global-server123     ││
│  │🏰 #war-room              ││
│  └─────────────────────────┘│
├─────────────────────────────┤
│  🏆 Alliance của bạn        │
├─────────────────────────────┤
│  🌍 Cộng đồng quốc gia      │
│  🇻🇳 🇰🇷 🇯🇵 🇺🇸 🇨🇳 🇩🇪    │
├─────────────────────────────┤
│  🏠  🧮  💬  📰  👤        │
└─────────────────────────────┘
```

**5 sections trang chủ:**
1. 🔥 Tin nóng — auto-crawl + dịch
2. 🧮 Công cụ nhanh — Maps, Calc, Guides, Server, Events, **Clan/Server Finder**
3. 💬 Chat gần đây — preview server + alliance chat
4. 🏆 Alliance của bạn
5. 🌍 Cộng đồng quốc gia

**Bottom nav:** 🏠 Home · 🧮 Tools · 💬 Chat · 📰 News · 👤 Profile

---

## 🏗️ TECH STACK

| Thành phần | Công nghệ |
|---|---|
| Web | Next.js 15 + TailwindCSS |
| Mobile | React Native (Expo) |
| Backend | Supabase (PostgreSQL + Realtime) |
| Translate | Google Cloud Translation API |
| Voice | LiveKit (Giai đoạn sau) |
| Push | OneSignal |
| Hosting | Vercel + EAS |

---

## 📱 TÍNH NĂNG

### PHẦN 1: CÔNG CỤ (Tools)

1.1. 🗺️ **Interactive Season Maps** — bản đồ tương tác từng mùa, đánh dấu lãnh thổ
1.2. 🧮 **Calculators** — Boss, Resource, Troop, Speedup, Battle Sim, Build Planner, Hero Tier List
1.3. 📅 **Event Calculators** — Ammo Bonanza, Desert Treasure + countdown timer
1.4. 📖 **Strategy Guides** — wiki cộng đồng, video, đánh giá
1.5. 🖥️ **Server Statistics** — power ranking, alliance ranking, merge predictions
1.6. 🔍 **Clan/Server Finder** (tham khảo coordinateslist.com) — tìm server/clan → bấm = mở game

### PHẦN 2: CHAT (Thay thế Discord)

2.1. 🌍 **Server Chat** — #global, #find-alliance, #q&a, tự tạo channel
2.2. 🏰 **Alliance Chat** — #general, #war-room, #officer-only, tự tạo channel
2.3. ➕ **Custom Channels** — công khai / riêng tư / chỉ mời, phân quyền
2.4. 🌐 **Auto-Translate cá nhân** — 🌐 nút dịch mỗi tin, chỉ mình thấy, game terms + daily life
2.5. 🔒 **Bảo mật** — E2E encryption, 2FA, anti-spam, report
2.6. 🎙️ **Voice Chat** (sau) — voice channel trong alliance

2.7. ⚡ **Alliance Quick Actions** (BÊN TRONG Alliance Chat)
- ⛏️ **Kho báu** — icon máy cuốc vàng — ai cũng bấm → push toàn alliance → bấm = mở game
- ✈️ **Máy bay sự cố** — icon máy bay — ai cũng bấm → push toàn alliance → bấm = mở game
- 🔔 ** Thông báo hoạt động** — rally, war, defense
- 📋 **Hướng dẫn** — cho thành viên
- 🔗 **Deep Link** — bấm = mở Last War trên điện thoại

### PHẦN 3: TIN TỨC

3.1. 📰 **News Feed** — auto-crawl trang chủ Last War, dịch theo ngôn ngữ user
3.2. 🔔 **Smart Notifications** — push, Do Not Disturb, tùy chọn chi tiết

### PHẦN 4: NGƯỜI DÙNG & CỘNG ĐỒNG

4.1. 👤 **Profile** — avatar, game card, badges
4.2. 🏆 **Leaderboards** — contributors, alliances, servers, seasonal, country
4.3. 🤝 **Alliance System** — create/join, roles (R5/R4/Member), diplomacy, war log
4.4. 🌍 **Country Communities** — community riêng từng quốc gia

### PHẦN 5: ĐA NGÔN NGỮ

5.1. 🌍 **Auto Detection** — tự nhận diện ngôn ngữ thiết bị → điều chỉnh toàn bộ app/web. Hỗ trợ **tất cả ngôn ngữ thế giới** (qua Google Translate API 100+ ngôn ngữ). Đổi bất cứ lúc nào.
5.2. 🎮 **Game Dictionary** — community-maintained, slang, auto-apply

### PHẦN 6: MOBILE

6.1. 📱 **Native Experience** — offline tools, widget, haptic, dark/light
6.2. 🔔 **Native Push** — FCM + APNs, rich notifications

### PHẦN 7: MONETIZATION

- **Ads** (AdSense/AdMob) — từ đầu
- **Tool Auto Game** (auto-farm, auto-rally, auto-shield...) — khi cộng đồng đủ lớn
- **Sponsorship** — khi có traffic

---

## 📅 LỘ TRÌNH

| Giai đoạn | Thời gian | Nội dung |
|---|---|---|
| 0: Foundation | 1 tuần | Monorepo, Supabase, i18n, design system, auth |
| 1: Tools + News | 2 tuần | Maps, 3 calculators, server stats, clan finder, news feed |
| 2: Chat + Alliance | 3 tuần | Server chat, alliance chat, custom channels, auto-translate, quick actions |
| 3: Mobile App | 3 tuần | React Native, port all features, submit App Store + Google Play |
| 4: Advanced | 2 tuần | All calculators, guides wiki, additional maps, leaderboards |
| 5: Voice + Auto Tools | Ongoing | Voice chat, E2E encryption, tool auto game |

---

## 🎨 DESIGN

- **Colors:** Cam quân sự (#f97316) + Xanh dương (#3b82f6) + Dark (#0f172a)
- **Font:** Inter
- **Style:** Dark mode default, glassmorphism, mobile-first

---

## 📋 APP STORE

- **Tên:** "LastWar HQ — Tools & Community"
- **Compliance:** GDPR, COPPA (13+), CCPA
- **Target:** 4.5+ ⭐

---

## 💰 CHI PHÍ

- **Ban đầu:** ~$0/tháng
- **Khi scale:** ~$115-165/tháng

---

_Updated: 11/07/2026 00:00 — v3.1_
