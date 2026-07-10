# 📋 KẾ HOẠCH THỰC THI TỪNG BƯỚC
## Dự án: LastWar HQ cho footzone.vn

---

## ⚡ CHIẾN LƯỢC TRÁNH RATE-LIMIT

- **Chia nhỏ task:** Mỗi session chỉ làm 1-2 file, commit ngay
- **Subagent:** Dùng subagent cho task nặng (nhiều file)
- **Session mới:** Khi context ~80%, tự mở session mới
- **Không đọc file lớn không cần thiết:** Chỉ đọc phần cần sửa
- **Batch work:** Gom việc lại làm 1 lần, đỡ call tool nhiều

---

## 🔧 DEPLOY LÊN footzone.vn

**Cách deploy (giữ domain cũ):**
```
cd F:\5. LASTWAR\apps\web
npx vercel --prod --yes
```
→ Vercel tự nhận project `football-predictor` → alias `footzone.vn`

**Lưu ý:**
- Giữ nguyên Vercel project hiện tại (đã link footzone.vn)
- Khi code mới sẵn sàng → deploy thẳng lên, thay thế app cũ
- App cũ đã backup tại `F:\football-predictor`

---

## 📅 TỪNG BƯỚC CHI TIẾT

### BƯỚC 1: Setup dự án (Session 1 — ~2 tiếng)
**Mục tiêu:** Project sẵn sàng để code

- [ ] Tạo `F:\5. LASTWAR\apps\web` — Next.js 15 + TailwindCSS
- [ ] Tạo `F:\5. LASTWAR\apps\mobile` — Expo React Native (scaffold)
- [ ] Tạo `F:\5. LASTWAR\packages\shared` — types, i18n, utils
- [ ] Setup Supabase project (tự tạo trên supabase.com)
- [ ] Tạo `.env.local` với API keys
- [ ] Git init + push lên GitHub repo mới
- [ ] Deploy skeleton lên Vercel → footzone.vn

**Deploy check:** footzone.vn hiện trang "Coming Soon" với logo ⚔️

---

### BƯỚC 2: Design System + Auth (Session 2 — ~2 tiếng) ✅
**Mục tiêu:** Giao diện nền + đăng nhập

- [x] Colors, fonts, components cơ bản (Button, Card, Input, Modal)
- [x] Dark mode default
- [x] Bottom navigation (🏠 🧮 💬 📰 👤) — active state cam quân sự
- [x] Auth: Google + Email (Supabase Auth) — AuthModal glassmorphism
- [x] i18n setup (VN, EN, KR, JP, CN — auto-detect tất cả ngôn ngữ)
- [x] Trang chủ 5 sections: Tin nóng carousel, Tools grid, Chat preview, Alliance, Country
- [x] Deploy footzone.vn

---

### BƯỚC 3: Trang chủ + News Feed (Session 3 — ~2 tiếng)
**Mục tiêu:** Trang chủ đẹp + tin tức

- [ ] Section 1: 🔥 Tin nóng (carousel)
- [ ] Section 2: 🧮 Công cụ nhanh (grid 6 icon)
- [ ] Section 3: 💬 Chat preview (fake data)
- [ ] Section 4: 🏆 Alliance preview (fake data)
- [ ] Section 5: 🌍 Country communities
- [ ] Auto-crawl news từ trang chủ Last War
- [ ] Auto-translate theo ngôn ngữ
- [ ] Deploy

---

### BƯỚC 4: Interactive Season Map (Session 4 — ~2 tiếng)
**Mục tiêu:** Bản đồ mùa giải hoạt động

- [ ] Research cpt-hedge map logic (cách họ làm)
- [ ] Tự code map với Leaflet/Mapbox
- [ ] 1 map mẫu (Season 5 hoặc Season 0)
- [ ] Zoom, pan, tap zone
- [ ] Deploy

---

### BƯỚC 5: Calculators (Session 5-6 — ~4 tiếng)
**Mục tiêu:** 3 calculator đầu tiên

- [ ] Research công thức từ cpt-hedge (Restricted Area, Resource, Troop)
- [ ] Tự code formulas (không copy)
- [ ] UI: input → result, clean & modern
- [ ] Deploy

---

### BƯỚC 6: Clan/Server Finder (Session 7 — ~2 tiếng)
**Mục tiêu:** Tìm server/clan

- [ ] Research cách coordinateslist hoạt động
- [ ] Database: community-contributed servers
- [ ] Search UI: theo tên, region, ngôn ngữ
- [ ] Deep link: bấm = mở game
- [ ] Deploy

---

### BƯỚC 7: Server Chat (Session 8-9 — ~4 tiếng)
**Mục tiêu:** Chat realtime hoạt động

- [ ] Supabase Realtime setup
- [ ] #global channel per server
- [ ] Message input + display
- [ ] Push notifications (OneSignal)
- [ ] Deploy

---

### BƯỚC 8: Alliance System + Alliance Chat (Session 10-12 — ~6 tiếng)
**Mục tiêu:** Alliance đầy đủ

- [ ] Create/join/leave alliance
- [ ] Roles (R5/R4/Member)
- [ ] Alliance chat (private channels)
- [ ] Custom channels
- [ ] Deploy

---

### BƯỚC 9: Auto-Translate (Session 13 — ~2 tiếng)
**Mục tiêu:** 🌐 dịch cá nhân trong chat

- [ ] Google Cloud Translation API setup
- [ ] 🌐 nút dịch trên mỗi tin nhắn
- [ ] Chỉ mình thấy bản dịch
- [ ] Game terms dictionary
- [ ] Cache bản dịch
- [ ] Deploy

---

### BƯỚC 10: Alliance Quick Actions (Session 14 — ~2 tiếng)
**Mục tiêu:** ⛏️ kho báu + ✈️ APC bên trong alliance chat

- [ ] ⛏️ Icon máy cuốc vàng → push toàn alliance → deep link mở game
- [ ] ✈️ Icon máy bay → push toàn alliance → deep link mở game
- [ ] 🔔 Thông báo hoạt động
- [ ] Deploy

---

### BƯỚC 11: Mobile App (Session 15-18 — ~8 tiếng)
**Mục tiêu:** App iOS + Android

- [ ] Expo setup
- [ ] Port trang chủ + tools
- [ ] Port chat + alliance
- [ ] Native push (FCM + APNs)
- [ ] Submit App Store + Google Play

---

### BƯỚC 12: Advanced + Polish (Ongoing)
- [ ] Tất cả calculators
- [ ] Event calculators + countdown
- [ ] Strategy guides (wiki)
- [ ] Leaderboards
- [ ] Server statistics
- [ ] Additional maps
- [ ] Voice chat (sau)

---

## 📊 TỔNG THỜI GIAN DỰ KIẾN

| Phần | Sessions | Thời gian |
|---|---|---|
| Bước 1-3 (Foundation + Home) | 3 | ~6 tiếng |
| Bước 4-6 (Tools) | 3 | ~6 tiếng |
| Bước 7-10 (Chat + Alliance) | 7 | ~14 tiếng |
| Bước 11 (Mobile) | 4 | ~8 tiếng |
| **Tổng** | **17** | **~34 tiếng code** |

**Nếu làm 4-5 tiếng/ngày → ~7-8 ngày hoàn thành MVP**

---

## ✅ QUIK START MAI

1. Mở session mới
2. Làm Bước 1 (Setup)
3. Deploy skeleton lên footzone.vn
4. Báo anh Thịnh xem

---

_Updated: 11/07/2026 00:04_
