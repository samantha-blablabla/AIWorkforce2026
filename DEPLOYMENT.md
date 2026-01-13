# Hướng dẫn Deploy lên Cloudflare Pages

## Yêu cầu
- Tài khoản Cloudflare (đã có ✓)
- Wrangler CLI (đã cài đặt qua npm ✓)

## Bước 1: Xác thực Wrangler với Cloudflare

Chạy lệnh để đăng nhập vào Cloudflare:

```bash
npx wrangler login
```

Lệnh này sẽ mở trình duyệt để bạn đăng nhập vào tài khoản Cloudflare.

## Bước 2: Deploy lên Production

### Deploy Production (branch main)
```bash
npm run deploy
```

Lệnh này sẽ:
1. Build project (`npm run build`)
2. Deploy thư mục `dist` lên Cloudflare Pages
3. Tạo production deployment

### Deploy Preview (branch preview/testing)
```bash
npm run deploy:preview
```

Lệnh này tạo preview deployment (không phải production), hữu ích để test trước khi deploy chính thức.

## Bước 3: Kiểm tra Deployment

Sau khi deploy thành công, Wrangler sẽ trả về:
- **Production URL**: `https://ai-workforce-2026.pages.dev`
- **Preview URL**: `https://[commit-hash].ai-workforce-2026.pages.dev`

## Cấu hình Project

### wrangler.toml
```toml
name = "ai-workforce-2026"
compatibility_date = "2024-01-01"
pages_build_output_dir = "dist"

[site]
bucket = "./dist"
```

### Build Settings
- **Build Command**: `npm run build`
- **Build Output**: `dist/`
- **Node Version**: 18+

## Tự động Deploy với GitHub Actions (Tùy chọn)

Nếu muốn tự động deploy mỗi khi push lên GitHub, tạo file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
    name: Deploy to Cloudflare Pages
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: \${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: \${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: ai-workforce-2026
          directory: dist
          gitHubToken: \${{ secrets.GITHUB_TOKEN }}
```

### Setup GitHub Secrets (nếu dùng GitHub Actions)
1. Vào Cloudflare Dashboard > API Tokens
2. Tạo token với permission "Cloudflare Pages - Edit"
3. Thêm vào GitHub repo secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID` (tìm trong Cloudflare Dashboard URL)

## Custom Domain (Tùy chọn)

Để thêm custom domain:

1. Vào Cloudflare Pages Dashboard
2. Chọn project `ai-workforce-2026`
3. Vào tab "Custom domains"
4. Click "Set up a custom domain"
5. Nhập domain của bạn
6. Cập nhật DNS records theo hướng dẫn

## Troubleshooting

### Lỗi Build
```bash
npm run build
```
Kiểm tra xem build có thành công locally không.

### Lỗi Authentication
```bash
npx wrangler logout
npx wrangler login
```
Đăng xuất và đăng nhập lại.

### Xem Logs
```bash
npx wrangler pages deployment list
npx wrangler pages deployment tail
```

## Commands Tóm tắt

| Command | Mô tả |
|---------|-------|
| `npm run dev` | Chạy dev server local (port 5173) |
| `npm run build` | Build production (output: dist/) |
| `npm run preview` | Preview production build locally |
| `npm run deploy` | Deploy production lên Cloudflare Pages |
| `npm run deploy:preview` | Deploy preview branch |
| `npx wrangler login` | Đăng nhập Cloudflare |
| `npx wrangler pages deployment list` | Xem danh sách deployments |

## Lưu ý

- Mỗi lần deploy, Cloudflare Pages tự động tạo preview URL
- Production URL sẽ được cập nhật sau khi deploy thành công
- File tĩnh (images, fonts) trong `public/` hoặc `Template/` sẽ được copy vào `dist/`
- Build time trung bình: ~2-3 giây
- Deploy time: ~30-60 giây

---

**Status**: ✅ Deployment setup hoàn tất
**Next step**: Chạy `npm run deploy` để deploy lần đầu
