# LookLab · homepage

Trang giới thiệu của LookLab ở https://looklab.space, gồm trang chủ, Chính sách quyền riêng tư và Điều khoản sử dụng,
song ngữ: tiếng Anh ở `/`, tiếng Việt ở `/vi/`. App nằm ở https://app.looklab.space (repo `sunn-v/looklab`).

Site hoàn toàn tĩnh: `src/build.ts` sinh HTML vào `dist/`, Cloudflare Workers phục vụ bằng static assets (không có Worker
script, không có JavaScript phía trình duyệt ngoài một dòng chuyển PWA cũ sang app).

## Chạy trên máy

Cần Node 22.18 trở lên (chạy thẳng file `.ts`) và pnpm 10.

```sh
pnpm install
pnpm dev          # build rồi wrangler dev: http://localhost:8787, có _redirects và _headers như production
```

| Lệnh             | Việc                                                                      |
| ---------------- | ------------------------------------------------------------------------- |
| `pnpm build`     | Sinh `dist/`                                                              |
| `pnpm test`      | Build rồi kiểm tra: đủ trang, hreflang, link nội bộ, CSP, song ngữ đủ mục |
| `pnpm typecheck` | TypeScript (vi phải có đủ mọi key của en)                                 |

## Thư mục

```text
src/content/site.ts   Chữ trên trang chủ, song ngữ
src/content/legal.ts  Chính sách quyền riêng tư và Điều khoản sử dụng
src/build.ts          Sinh HTML, sitemap.xml, robots.txt, _headers (CSP)
src/tokens.css        Token màu, font: chép từ app (design/tokens.json → src/styles/tokens.css)
src/components.css    Button, Tag, ItemCard, Countdown: chép từ app (src/styles/components.css)
src/icons.ts          Bộ icon: chép từ app (src/ui/icons.ts)
public/_redirects     Link cũ của app ở looklab.space → app.looklab.space
public/sw.js          Gỡ service worker của PWA cũ từng cài ở looklab.space
```

Sửa cách app thu thập hay lưu dữ liệu thì sửa `src/content/legal.ts` và đổi `LEGAL_UPDATED`. Đổi bảng màu, component
hay icon trong app thì chép lại ba file tương ứng.

## Deploy

```text
feature/* ──PR──▶ preview trên workers.dev
                   └── merge vào main ──▶ production https://looklab.space
```

Cấu hình lần đầu (dùng chung tài khoản Cloudflare với app):

1. Trong repo app, deploy bản đã chuyển production sang `app.looklab.space` trước. Custom domain `looklab.space`
   chỉ gắn được cho một Worker, nên phải gỡ khỏi Worker `looklab` rồi mới gắn cho `looklab-homepage`.
2. GitHub → Settings → Secrets and variables → Actions: Secrets `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
   (dùng lại token của app), Variables `DEPLOY_ENABLED` = `true`.
3. Merge vào `main`, hoặc chạy tay workflow **Deploy**.
