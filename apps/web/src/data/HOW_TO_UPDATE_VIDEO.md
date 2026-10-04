# HƯỚNG DẪN ĐỔI VIDEO TÍNH NĂNG UPDATE / HOW TO UPDATE YOUTUBE VIDEO

Dành cho Người dùng & OpenClaw qua Telegram:

### 1. File cấu hình duy nhất:
👉 Đường dẫn file: `apps/web/src/data/upcoming-update.json`

```json
{
  "youtubeUrl": "https://youtu.be/tTURTqzi8nY",
  "version": "v2401 NEXT-GEN",
  "status": "In Development"
}
```

### 2. Các định dạng link YouTube được hỗ trợ tự động:
Hệ thống tự động nhận diện và bóc tách ID cho mọi dạng link:
- Link ngắn: `https://youtu.be/tTURTqzi8nY`
- Link có tham số chia sẻ: `https://youtu.be/tTURTqzi8nY?si=xxx`
- Link xem bình thường: `https://www.youtube.com/watch?v=tTURTqzi8nY`
- Link YouTube Shorts: `https://www.youtube.com/shorts/tTURTqzi8nY`
- Mã video ID trực tiếp: `tTURTqzi8nY`

### 3. Cách nhờ OpenClaw trên Telegram đổi video khi bạn tắt máy:
Bạn chỉ cần nhắn cho OpenClaw:
> *"Đổi video tính năng update sắp tới trên web thành link này nhé: https://youtu.be/... rồi đẩy lên github và vercel"*

OpenClaw chỉ việc mở `apps/web/src/data/upcoming-update.json`, thay giá trị `"youtubeUrl"`, rồi `git commit` & `git push origin master`. Vercel sẽ tự động cập nhật web `monicabot.lol` trong 1-2 phút!

### 4. API kiểm tra trực tiếp:
Có thể kiểm tra video đang chạy tại endpoint:
- `https://monicabot.lol/api/upcoming-update`
