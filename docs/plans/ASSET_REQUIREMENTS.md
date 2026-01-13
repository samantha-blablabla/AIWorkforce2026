# ASSET REQUIREMENTS - AI Workforce 2026

**Version:** 1.0
**Date:** 2026-01-13
**Status:** Awaiting Assets from User

---

## 🎨 Color Palette (UPDATED)

### Primary Purple Scale:
```css
'dark-blue': {
  '50': '#f3f0ff',   /* Lightest - For highlights */
  '100': '#ebe4ff',  /* Very light - Subtle backgrounds */
  '200': '#d8ccff',  /* Light - Hover states */
  '300': '#bca4ff',  /* Medium-light - Secondary text */
  '400': '#9e70ff',  /* Medium - Borders, icons */
  '500': '#8237ff',  /* Base purple - Primary buttons */
  '600': '#780fff',  /* Medium-dark - Active states */
  '700': '#6b00ff',  /* Primary - Main brand color */
  '800': '#5900da',  /* Dark - Pressed states */
  '900': '#5000bf',  /* Darker - Shadows */
  '950': '#2b007a',  /* Darkest - Deep shadows */
}
```

### Background:
- **Main Background**: `#060606` (near-black with slight warmth)
- **Grid Pattern**: `rgba(255, 255, 255, 0.015)` (subtle white grid)
- **Overlay**: `rgba(6, 6, 6, 0.9)` (for modals)

### Text Colors:
- **Primary Text**: `#FFFFFF` (pure white)
- **Secondary Text**: `#A0A0A0` (medium gray)
- **Tertiary Text**: `#606060` (dark gray)
- **Inactive**: `#404040` (very dark gray)

---

## 📐 Logo Requirements

### GEARVN Logo (Footer)

**Purpose**: Brand identification in footer

**Specifications:**
- **Format**: SVG (preferred) or PNG with transparency
- **Dimensions**:
  - Width: 160px-200px (desktop)
  - Height: Auto-maintain aspect ratio
  - Mobile: Scale down to 120px width
- **Color Variants Needed**:
  - White version (for dark background)
  - Purple version (optional, for hover state)
- **Resolution**:
  - SVG: Vector (scales infinitely)
  - PNG: @2x (320-400px width) for retina displays
- **Background**: Transparent
- **File naming**:
  - `logo-gearvn-white.svg` or `logo-gearvn-white@2x.png`
  - `logo-gearvn-purple.svg` (optional)

**Placement**:
- Bottom left corner
- With text "GEARVN.COM" below
- Padding: 40px from edges on desktop, 20px on mobile

---

## 🖼️ Background Images

### 1. Main Background Image (BG.png)

**Purpose**: Visual element for Intro section (right side)

**Current File**: `/Template/BG.png` (exists, may need optimization)

**Specifications:**
- **Format**: WebP (modern) or PNG/JPG
- **Dimensions**:
  - Original: 1920px × 1080px (16:9 ratio)
  - For web: 1600px × 900px (compressed)
- **File Size**: < 500KB (optimized)
- **Treatment**:
  - Grayscale filter applied via CSS
  - Opacity: 30-40%
  - Gradient overlay: left to right, dark to transparent
- **Resolution**: @2x for retina (3200px × 1800px source)

**Optimization:**
```bash
# If you provide high-res, I'll compress with:
# - WebP conversion (80% quality)
# - Lazy loading
# - Responsive srcset
```

### 2. OG Image (Social Sharing)

**Purpose**: When website is shared on social media

**Specifications:**
- **Format**: PNG or JPG
- **Dimensions**: 1200px × 630px (Facebook/Twitter standard)
- **Content**:
  - Logo
  - Title: "AI Workforce 2026"
  - Subtitle: "Rước Bot Về Nhà - Chăm Lo Việc Nhà"
  - Purple glow background
- **File Size**: < 1MB
- **Text**: Readable at small sizes

**If you don't have this, I can generate it from existing assets**

---

## 🔲 Favicon Set

**Purpose**: Browser tab icon, bookmarks, mobile home screen

**Specifications:**

### Sizes Needed:
- `favicon.ico` - 16×16, 32×32, 48×48 (multi-size ICO)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` - 180×180 (iOS)
- `android-chrome-192x192.png` - 192×192
- `android-chrome-512x512.png` - 512×512

**Design:**
- Simple, recognizable at tiny sizes
- Options:
  1. GEARVN logo simplified
  2. "AI" text on purple background
  3. Robot icon silhouette
- **Background**: Purple (#6b00ff) or transparent
- **Foreground**: White

**If you provide a simple logo/icon, I can generate all sizes**

---

## 🎭 Icons & Graphics

### 1. Social Media Icons

**Purpose**: Footer social links

**Required Icons:**
- Facebook
- Zalo (Vietnamese messaging)
- (Optional): Instagram, LinkedIn, YouTube

**Specifications:**
- **Format**: SVG (preferred)
- **Size**: 32×32px or 24×24px
- **Style**: Line icons or minimal solid
- **Color**: White (default), Purple (#6b00ff) on hover
- **Stroke Width**: 2px (for line icons)

**If not provided, I can use Font Awesome or similar icon library**

### 2. Arrow Icon (Success Screen)

**Purpose**: CTA button on success modal (bottom right)

**Specifications:**
- **Format**: SVG
- **Size**: 24×24px
- **Style**: Simple arrow pointing right or diagonal up-right
- **Color**: White
- **Background**: Purple circle or square (40×40px button)

**I can create this if you don't have it**

---

## 📧 Email Assets

### Email Banner

**Purpose**: Top of registration confirmation email

**Specifications:**
- **Dimensions**: 600px × 200px (email-safe width)
- **Format**: PNG or JPG (email compatibility)
- **Content**:
  - Logo
  - "AI Workforce 2026"
  - Purple gradient background
- **File Size**: < 200KB
- **Inline CSS**: Required for email

**I can design this from other assets**

### QR Code Placeholder

**Purpose**: Dynamically generated per registration

**Specifications:**
- **Size**: 200×200px (standard)
- **Format**: PNG or SVG
- **Error Correction**: High (30% recovery)
- **Colors**:
  - Data: Black or Purple (#6b00ff)
  - Background: White
  - Optional: Logo in center (40×40px)
- **Border**: 20px quiet zone (white space around QR)

**This will be generated dynamically, no asset needed from you**

---

## 🎬 Loading Animation Assets (cargokite.com Style)

### Reference: cargokite.com Loading

**Key Characteristics to Replicate:**
1. **Percentage Counter**:
   - Large, bold numbers (120-200px font size)
   - Smooth counting animation (0 → 100)
   - Easing: Starts fast, slows dramatically near 100
   - Realistic loading feel (not linear)

2. **Progress Line**:
   - Thin horizontal line (1-2px)
   - Width grows with percentage
   - Color: White or purple
   - Smooth, continuous animation

3. **Text Reveals**:
   - Stage 1 (0-60%): "AI Workforce 2026" fades in
   - Stage 2 (60-100%): Subtitle lines fade in sequentially
   - Animations: Fade + slight upward motion (y: 20px → 0)

4. **Background**:
   - Black base (#060606)
   - Purple radial glow (subtle, moves slightly)
   - Grid pattern (optional, very subtle)

5. **Exit Animation**:
   - Entire loader slides up or fades out
   - Duration: 800-1200ms
   - Easing: Smooth (ease-in-out)

**No assets needed - implemented with GSAP animations**

---

## 📊 Asset Priority

### High Priority (Need for MVP):
1. ✅ **Color Palette** (provided by you)
2. 🔴 **GEARVN Logo** (SVG or PNG @2x, white version)
3. 🔴 **Background Image** (optimized BG.png or new)
4. 🟡 **Favicon** (can generate from logo)

### Medium Priority (Can use placeholders):
5. 🟡 **Social Icons** (can use Font Awesome)
6. 🟡 **OG Image** (can generate)
7. 🟡 **Email Banner** (can generate)

### Low Priority (Generated/Optional):
8. 🟢 **Arrow Icon** (can create with CSS or SVG)
9. 🟢 **QR Code** (dynamically generated)
10. 🟢 **Loading Animation** (pure code, no assets)

---

## 📥 Asset Delivery Checklist

Please provide the following (in order of priority):

### Immediately Needed:
- [ ] **GEARVN Logo**
  - File format: SVG or PNG @2x
  - Color: White on transparent
  - Dimensions: ~200px width recommended

- [ ] **Background Image** (or confirm use of existing `/Template/BG.png`)
  - High resolution source file
  - I'll optimize for web

### Nice to Have:
- [ ] **Simplified Icon/Logo** for favicon
  - Square aspect ratio
  - Recognizable at 32px size

- [ ] **Social Media Icons** (if custom style preferred)
  - Otherwise I'll use standard icon library

### Optional (I can create):
- [ ] Email banner design preferences
- [ ] Any other brand guidelines

---

## 📁 Recommended File Structure

When you provide assets, please organize like this:

```
public/assets/
├── images/
│   ├── logo-gearvn-white.svg           # Main logo
│   ├── logo-gearvn-white@2x.png        # PNG fallback
│   ├── bg-intro.webp                   # Background (optimized)
│   ├── bg-intro@2x.webp                # Retina background
│   └── og-image.png                    # Social sharing
├── icons/
│   ├── favicon.ico                     # Multi-size favicon
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png            # iOS
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   └── social/
│       ├── facebook.svg
│       └── zalo.svg
└── email/
    ├── banner.png                      # Email header
    └── qr-placeholder.png              # Example QR
```

---

## 🎨 Design Tokens for Reference

When creating assets, use these values for consistency:

### Typography:
- **Font Family**: Space Grotesk (already loaded)
- **Weights**: 300 (light), 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Spacing:
- **Small**: 8px, 16px
- **Medium**: 24px, 32px, 40px
- **Large**: 60px, 80px, 120px

### Border Radius:
- **Small**: 4px (buttons, inputs)
- **Medium**: 8px (cards)
- **Large**: 16px (modals)
- **Circle**: 50% (avatars, icons)

### Shadows:
- **Purple Glow**: `0 0 40px rgba(107, 0, 255, 0.3)`
- **Soft Shadow**: `0 4px 20px rgba(0, 0, 0, 0.5)`
- **Deep Shadow**: `0 8px 40px rgba(0, 0, 0, 0.8)`

---

## ✅ Next Steps

1. **You provide**: Logo + background image (high priority)
2. **I will**:
   - Optimize images for web
   - Generate favicon set
   - Create OG image from assets
   - Implement loading animation (no assets needed)
   - Setup color scheme (#060606 + purple palette)

3. **Once assets received**:
   - Integrate into components
   - Update siteContent.ts
   - Match template designs exactly

---

## 📞 Questions?

If you have assets in different formats or sizes, send them anyway and I'll adapt them. I can work with:
- AI files (Adobe Illustrator) - describe and I'll recreate
- PSD (Photoshop) - describe and I'll recreate
- PDF - can extract vectors
- High-res JPG/PNG - will optimize
- SVG - perfect!

**Just upload to the Template folder or provide links, and let me know what each file is for.**

---

**End of Asset Requirements Document**

*This document will be updated as assets are received and integrated.*
