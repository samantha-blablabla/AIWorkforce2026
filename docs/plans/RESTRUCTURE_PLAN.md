# AI WORKFORCE 2026 - RESTRUCTURE PLAN
**Version:** 1.0
**Date:** 2026-01-13
**Status:** Planning Phase

---

## 📋 Executive Summary

Dự án tái cấu trúc website AI Workforce 2026 với mục tiêu:
- Tích hợp Cloudflare D1 Database để lưu trữ đăng ký
- Deploy lên Cloudflare Workers với Wrangler CLI
- Tối ưu hóa quản lý nội dung qua `siteContent.ts`
- Tự động hóa email & QR code qua n8n workflow
- Responsive design dựa trên template thiết kế chuẩn

---

## 🎨 Design Analysis (Based on Templates)

### Template Screens Analyzed:
1. **Home-screen.png** - Landing page with navigation
2. **overview-screen.png** - Content sections with numbered cards
3. **sign-in-screen.png** - Registration form with purple glow
4. **sign-in-successfully-screen.png** - Success state
5. **Download-screen-1.png & 2.png** - Loading states (60%, 89%)

### Key Design Elements:
- **Navigation**: Top bar with sections - "Giới Thiệu", "Tổng Quan", "RoadMap", "Đăng Ký"
- **Colors**:
  - Background: Pure Black (#000000)
  - Primary: Electric Purple (#6B00FF, #8237FF)
  - Text: White (#FFFFFF), Gray for secondary
  - Glow: Purple radial gradients
- **Typography**:
  - Large display text (AI Workforce 2026, Rước Bot Về Nhà...)
  - Clean sans-serif (Space Grotesk or similar)
- **Grid**: Subtle grid pattern throughout
- **Progress Bar**: Bottom of screen, purple fill
- **Loading**: Percentage counter (60%, 89%) with smooth animation

### Loading Screen Requirements (Inspired by cargokite.com):
- Smooth percentage counter animation (0-100%)
- Horizontal progress line
- Text reveals in stages
- Purple glow background effect
- Professional, minimal aesthetic
- Smooth exit transition

---

## 🏗️ Architecture Restructure

### Current Structure:
```
AIWorkforce/
├── App.tsx
├── components/
├── siteContent.ts
├── index.html
├── package.json
└── vite.config.ts
```

### New Structure:
```
AIWorkforce/
├── src/
│   ├── components/
│   │   ├── Loader/
│   │   │   ├── Loader.tsx
│   │   │   └── LoaderAnimation.tsx
│   │   ├── Navigation/
│   │   │   ├── Navigation.tsx
│   │   │   └── ProgressBar.tsx
│   │   ├── Sections/
│   │   │   ├── IntroSection.tsx
│   │   │   ├── OverviewSection.tsx
│   │   │   ├── RoadmapSection.tsx
│   │   │   └── RegistrationSection.tsx
│   │   └── Form/
│   │       ├── RegisterForm.tsx
│   │       └── SuccessModal.tsx
│   ├── content/
│   │   ├── siteContent.ts          # Main content file
│   │   └── contentSchema.ts        # TypeScript types
│   ├── lib/
│   │   ├── cloudflare-d1.ts        # D1 database client
│   │   ├── n8n-webhook.ts          # n8n integration
│   │   └── qr-generator.ts         # QR code generation
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── public/
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   └── Template/                   # Design references
├── functions/
│   └── api/
│       ├── register.ts             # Cloudflare Worker endpoint
│       └── verify.ts               # Email verification
├── docs/
│   ├── plans/
│   │   └── RESTRUCTURE_PLAN.md     # This file
│   └── reports/
│       └── session-reports/        # Token usage reports
├── wrangler.toml                   # Cloudflare config
├── schema.sql                      # D1 database schema
├── .dev.vars                       # Local env variables
├── package.json
├── vite.config.ts
└── README.md
```

---

## 🗄️ Cloudflare D1 Integration

### Database Schema:
```sql
-- schema.sql
CREATE TABLE IF NOT EXISTS registrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  qr_code TEXT,
  verification_token TEXT,
  verified BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_email ON registrations(email);
CREATE INDEX idx_verification_token ON registrations(verification_token);
```

### Wrangler Configuration:
```toml
# wrangler.toml
name = "ai-workforce-2026"
main = "functions/api/register.ts"
compatibility_date = "2024-01-01"

[[ d1_databases ]]
binding = "DB"
database_name = "ai-workforce-2026-db"
database_id = "<TO_BE_CREATED>"

[vars]
N8N_WEBHOOK_URL = "https://your-n8n-instance.com/webhook/..."
FRONTEND_URL = "http://localhost:3000"
```

### Setup Commands:
```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Create D1 Database
wrangler d1 create ai-workforce-2026-db

# Execute Schema
wrangler d1 execute ai-workforce-2026-db --file=./schema.sql

# Local Development
wrangler dev

# Deploy
wrangler deploy
```

---

## 📝 siteContent.ts Strategy

### Enhanced Content Structure:
```typescript
// src/content/siteContent.ts
export const siteContent = {
  // Meta Information
  meta: {
    title: "AI Workforce 2026 - Rước Bot Về Nhà",
    description: "Workshop tiên phong về ứng dụng AI vào đời sống",
    keywords: ["AI", "Workforce", "Automation", "Workshop"],
    ogImage: "/assets/og-image.png"
  },

  // Loading Screen (Inspired by cargokite.com)
  loading: {
    stages: [
      {
        percentage: { start: 0, end: 60 },
        texts: ["AI Workforce 2026"]
      },
      {
        percentage: { start: 60, end: 100 },
        texts: ["Rước Bot Về Nhà", "Chăm Lo Việc Nhà"]
      }
    ],
    animation: {
      duration: 4000, // milliseconds
      easing: "expo.out",
      glowColor: "#6B00FF"
    }
  },

  // Navigation
  navigation: {
    items: [
      { id: "intro", label: "Giới Thiệu", href: "#intro" },
      { id: "overview", label: "Tổng Quan", href: "#overview" },
      { id: "roadmap", label: "RoadMap", href: "#roadmap" },
      { id: "register", label: "Đăng Ký", href: "#register" }
    ],
    activeColor: "#6B00FF",
    inactiveColor: "#808080"
  },

  // Section 1: Intro
  intro: {
    title: {
      line1: "AI Workforce 2026",
      line2: "Rước Bot Về Nhà",
      line3: "Chăm Lo Việc Nhà"
    },
    backgroundImage: "/Template/BG.png",
    overlayOpacity: 0.3
  },

  // Section 2: Overview (Based on overview-screen.png)
  overview: {
    title: "Tổng Quan",
    items: [
      {
        id: "01",
        title: "Content Title 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut"
      },
      {
        id: "02",
        title: "Content Title 2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut"
      },
      {
        id: "03",
        title: "Content Title 3",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut"
      },
      {
        id: "04",
        title: "Content Title 4",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut"
      }
    ]
  },

  // Section 3: Roadmap
  roadmap: {
    title: "RoadMap",
    timeline: [
      {
        quarter: "Q1 2026",
        title: "Khởi tạo & Tích hợp",
        details: "Đánh giá hạ tầng, tích hợp core AI vào hệ thống"
      },
      // ... more items
    ]
  },

  // Section 4: Registration (Based on sign-in-screen.png)
  registration: {
    title: {
      line1: "AI Workforce 2026",
      line2: "Rước Bot Về Nhà",
      line3: "Chăm Lo Việc Nhà"
    },
    form: {
      title: "Đăng ký tham gia",
      subtitle: "*Thông tin cần điền",
      fields: [
        { name: "fullName", label: "Họ và Tên*", type: "text", required: true },
        { name: "email", label: "Email Đăng Ký*", type: "email", required: true },
        { name: "phone", label: "Số điện thoại*", type: "tel", required: true }
      ],
      submitButton: "Gửi Thông Tin",
      processingText: "Đang xử lý..."
    },
    success: {
      title: "Bạn đã đăng ký thành công,",
      message: "kiểm tra E-mail để nhận mã tham dự bạn nhé",
      footer: "Hẹn gặp bạn tại Workshop!",
      ctaButton: {
        text: "Về trang chủ",
        icon: "arrow-right"
      }
    }
  },

  // Footer
  footer: {
    logo: {
      src: "/assets/logo.png",
      alt: "GEARVN",
      text: "GEARVN.COM"
    },
    social: {
      facebook: "https://facebook.com/gearvn",
      zalo: "https://zalo.me/gearvn"
    }
  }
};
```

### Content Update Rules:
1. **Never modify component structure when updating content**
2. **All text, images, colors managed through this file**
3. **TypeScript types ensure data integrity**
4. **Version control for content changes**
5. **AI reads this file for all content operations**

---

## 🤖 n8n Automation Workflow

### Workflow Architecture:
```
User Submits Form
    ↓
Save to D1 Database
    ↓
Generate QR Code (UUID-based)
    ↓
Trigger n8n Webhook
    ↓
n8n Receives Data:
    - full_name
    - email
    - phone
    - qr_code (base64 or URL)
    ↓
n8n Processes:
    1. Generate HTML Email
    2. Attach QR Code
    3. Send Email via SMTP/Gmail
    ↓
Update verification_token in D1
    ↓
Return Success to Frontend
```

### n8n Webhook Payload:
```json
{
  "event": "registration",
  "data": {
    "id": 123,
    "full_name": "Nguyen Van A",
    "email": "nguyenvana@example.com",
    "phone": "0901234567",
    "qr_code_url": "https://worker.dev/qr/abc-xyz-123",
    "qr_code_base64": "data:image/png;base64,iVBORw0KGgoAAAANS...",
    "verification_link": "https://worker.dev/verify/token-123",
    "registered_at": "2026-01-13T10:30:00Z"
  }
}
```

### Email Template Requirements:
- Dark theme (black/purple)
- Responsive HTML (inline CSS)
- QR code embedded
- Workshop details
- Social links
- Unsubscribe option

---

## 🎯 Implementation Phases

### Phase 1: Foundation Setup (Day 1)
- [ ] Create new folder structure
- [ ] Setup Wrangler and Cloudflare account
- [ ] Create D1 database
- [ ] Setup local development environment
- [ ] Migrate existing components to new structure

### Phase 2: Content Management (Day 1-2)
- [ ] Enhance `siteContent.ts` with all template data
- [ ] Create TypeScript schemas
- [ ] Document content update workflow
- [ ] Test content hot-reload

### Phase 3: UI Refinement (Day 2-3)
- [ ] **Loading Screen**: Match cargokite.com style
  - Smooth percentage animation
  - Purple glow effect
  - Text stage reveals
- [ ] **Navigation**: Active state highlighting
- [ ] **Overview Section**: Numbered cards (01, 02, 03, 04)
- [ ] **Registration Form**: Purple glow, dark theme
- [ ] **Success Modal**: Match template design
- [ ] Responsive mobile layout

### Phase 4: Backend Integration (Day 3-4)
- [ ] Create Cloudflare Worker API endpoints
- [ ] Implement D1 database operations
- [ ] QR code generation logic
- [ ] Form validation and error handling
- [ ] Test local with Wrangler dev

### Phase 5: n8n Automation (Day 4-5)
- [ ] Design n8n workflow
- [ ] Create email HTML template
- [ ] Setup webhook integration
- [ ] Test email delivery
- [ ] Configure error handling

### Phase 6: Testing & Deployment (Day 5-6)
- [ ] End-to-end testing
- [ ] Mobile responsiveness check
- [ ] Performance optimization
- [ ] Deploy to Cloudflare Workers
- [ ] Setup custom domain (if needed)

---

## 📊 Token Usage Tracking System

### Session Report Format:
```markdown
# Session Report - [Date]

## Session Info
- **Start Time**: HH:MM
- **End Time**: HH:MM
- **Duration**: XX minutes

## Tasks Completed
1. Task description
2. Task description

## Token Usage
- **Starting Balance**: 200,000
- **Tokens Used**: XX,XXX
- **Remaining**: XXX,XXX
- **Usage Percentage**: XX%

## Files Modified
- /path/to/file1.tsx
- /path/to/file2.ts

## Next Steps
- [ ] Task 1
- [ ] Task 2
```

### Tracking Rules:
1. Create report at end of each work session
2. Save to `docs/reports/session-reports/YYYY-MM-DD_HHMM.md`
3. Include token usage from system messages
4. Document all file changes
5. Track progress against plan

---

## 🎨 Design Implementation Checklist

### Loading Screen (cargokite.com inspired):
- [ ] Percentage counter (0-100%) with smooth easing
- [ ] Horizontal progress line (2px, purple)
- [ ] Stage 1 (0-60%): Show "AI Workforce 2026"
- [ ] Stage 2 (60-100%): Show "Rước Bot Về Nhà" + "Chăm Lo Việc Nhà"
- [ ] Purple radial glow in background
- [ ] Smooth exit animation (slide up or fade out)

### Navigation (Home-screen.png):
- [ ] Fixed top bar
- [ ] Four sections: Giới Thiệu, Tổng Quan, RoadMap, Đăng Ký
- [ ] Active section: Purple background (#6B00FF)
- [ ] Inactive sections: Gray text
- [ ] Smooth transition on click
- [ ] Match horizontal scroll position

### Overview Section (overview-screen.png):
- [ ] Large numbered prefixes: 01, 02, 03, 04 (purple)
- [ ] Title: "Content" (white, large font)
- [ ] Description: Lorem ipsum text (gray)
- [ ] Grid layout: 4 columns on desktop
- [ ] Vertical stack on mobile
- [ ] Hover effect: subtle glow

### Registration Form (sign-in-screen.png):
- [ ] Split layout: Left text, Right form
- [ ] Purple radial glow background
- [ ] Dark input fields with purple border on focus
- [ ] Three fields: Họ và Tên, Email Đăng Ký, Số điện thoại
- [ ] Purple submit button: "Gửi Thông Tin"
- [ ] Form validation with error messages

### Success Screen (sign-in-successfully-screen.png):
- [ ] Full-screen overlay with purple glow
- [ ] Large text: "Bạn đã đăng ký thành công,"
- [ ] Sub-text: "kiểm tra E-mail để nhận mã tham dự bạn nhé"
- [ ] Footer text: "Hẹn gặp bạn tại Workshop!"
- [ ] Arrow button (bottom right) - optional CTA
- [ ] Smooth fade-in animation

### Progress Bar:
- [ ] Fixed bottom position
- [ ] Full width, thin (2px)
- [ ] Purple fill matches scroll progress
- [ ] Smooth lerp animation

---

## 🔧 Technical Requirements

### Dependencies to Add:
```json
{
  "dependencies": {
    "qrcode": "^1.5.3",
    "@cloudflare/workers-types": "^4.20240925.0"
  },
  "devDependencies": {
    "wrangler": "^3.78.12"
  }
}
```

### Environment Variables:
```bash
# .dev.vars (local)
N8N_WEBHOOK_URL=http://localhost:5678/webhook/registration
DATABASE_URL=local
FRONTEND_URL=http://localhost:3000

# Cloudflare Workers Dashboard (production)
N8N_WEBHOOK_URL=https://n8n.production.com/webhook/registration
FRONTEND_URL=https://aiworkforce2026.pages.dev
```

---

## 📸 Image Asset Management

### Required Images:
1. **Background Image** (`/Template/BG.png`) - Already available
2. **Logo** - GEARVN logo for footer
3. **OG Image** - For social sharing (1200x630px)
4. **Favicon** - 32x32px, 64x64px
5. **QR Code Template** - Generated dynamically

### Image Optimization:
- Use WebP format for web delivery
- Lazy load images below fold
- Responsive srcset for different screen sizes
- Compress with tools like Squoosh

---

## 🚀 Deployment Strategy

### Local Development:
```bash
npm run dev          # Vite dev server (port 3000)
wrangler dev         # Test Workers locally
```

### Staging:
```bash
wrangler deploy --env staging
```

### Production:
```bash
npm run build
wrangler deploy --env production
```

### Domain Setup:
- Option 1: Cloudflare Pages (auto SSL)
- Option 2: Custom domain via Workers Routes

---

## ✅ Success Criteria

1. **Visual Accuracy**: Match templates 95%+
2. **Performance**:
   - Loading screen: < 4 seconds
   - Page load: < 2 seconds
   - Smooth 60fps animations
3. **Functionality**:
   - Form submission success rate: 99%+
   - Email delivery: < 30 seconds
   - QR code generation: 100% valid
4. **Responsive**: Perfect on mobile, tablet, desktop
5. **Database**: All registrations saved to D1
6. **Automation**: n8n workflow executes flawlessly

---

## 📝 Next Steps for AI Assistant

1. **Await User Confirmation** on this plan
2. **Request Images**: Ask user to provide specific images referenced in templates
3. **Begin Phase 1**: Create folder structure
4. **Setup Wrangler**: Guide user through Cloudflare setup
5. **Implement Content System**: Build enhanced siteContent.ts
6. **Create Components**: Match template designs exactly
7. **Integrate Backend**: D1 + Workers + n8n
8. **Track Progress**: Update todos and create session reports

---

## 📞 Questions for User

Before starting implementation:

1. **n8n Instance**: Do you have an existing n8n instance? URL?
2. **Cloudflare Account**: Do you have Cloudflare account ready?
3. **Domain**: Will you use Cloudflare Pages subdomain or custom domain?
4. **Email Provider**: Which email service for n8n? (Gmail, SMTP, SendGrid?)
5. **Content**: Should I use the Lorem Ipsum from templates or do you have real content?
6. **QR Code**: What data should be encoded? (URL, ID, token?)

---

**End of Plan**

*This document will be updated as implementation progresses.*
