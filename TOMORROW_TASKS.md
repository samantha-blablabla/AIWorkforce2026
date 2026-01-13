# Công việc ngày mai - Session 04

## 🎯 Mục tiêu chính

### 1. Phân tích chi tiết loading animation của cargokite.com

**Task**: Nghiên cứu và document toàn bộ animations trên https://cargokite.com/

#### Cần phân tích:
- **Timing**: Độ dài từng animation phase (ms)
- **Easing functions**: Loại ease được dùng (ease-in, ease-out, cubic-bezier...)
- **Sequence**: Thứ tự xuất hiện của từng element
- **Text animations**:
  - Font size, weight, color
  - Reveal method (fade in, slide up, character by character?)
  - Stagger timing between lines
- **Background elements**:
  - Gradient animations
  - Glow effects movement
  - Opacity transitions
- **Progress indicator**:
  - Style (line, circle, percentage?)
  - Animation curve
  - Color transitions
- **Exit animation**:
  - Method (slide, fade, scale?)
  - Duration và ease
  - Overlap với main content entrance

#### Output yêu cầu:
```markdown
## CargoKite Loading Animation Analysis

### Phase 1: Entry (0-800ms)
- Element A: [details]
- Element B: [details]
- Timing: [exact ms]
- Ease: [function]

### Phase 2: Progress (800ms-3000ms)
- [details]

### Phase 3: Exit (3000ms-4000ms)
- [details]

### Implementation Notes:
- GSAP timeline structure
- Critical CSS
- Performance considerations
```

---

## 2. Implement identical loading animation

**Task**: Làm y hệt animation của cargokite.com cho trang loading của chúng ta

#### Steps:
1. **Update Loader.tsx**:
   - Adjust GSAP timeline theo phân tích
   - Match exact timing & easing
   - Replicate text reveal style
   - Copy background animations

2. **Test & Compare**:
   - Record video của cả 2 trang
   - So sánh frame-by-frame
   - Adjust cho đến khi identical

3. **Deliverables**:
   - Updated [components/Loader.tsx](components/Loader.tsx)
   - Side-by-side comparison video/screenshots
   - Performance metrics (FPS, load time)

---

## 3. Tối ưu page transitions - Làm mượt mà hơn

**Current issues**:
- Horizontal scroll có thể lag trên một số devices
- Section transitions chưa đủ smooth
- Animation có thể bị stutter

### 3.1. Performance Audit

**Checklist**:
- [ ] Check FPS during scroll (target: 60fps constant)
- [ ] Identify animation bottlenecks
- [ ] Measure paint/composite time
- [ ] Test trên mobile device thực tế

**Tools**:
```bash
# Chrome DevTools Performance tab
# Lighthouse audit
# React DevTools Profiler
```

### 3.2. Optimization Strategies

#### A. GSAP Optimization
```typescript
// components/App.tsx - Line 36-56
// Current ScrollTrigger config

// Potential optimizations:
- Reduce scrub value (2 → 1 hoặc 0.5) cho instant response
- Add will-change CSS properties
- Use transform3d() thay vì transform()
- Enable GPU acceleration
- Optimize snap settings
```

#### B. CSS Optimizations
```css
/* src/index.css */

/* Add to animated elements: */
.panel {
  will-change: transform;
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Reduce blur radius if performance issue: */
.blur-[120px] → .blur-[80px]
```

#### C. React Performance
- Wrap expensive components trong `React.memo()`
- Use `useCallback` cho event handlers
- Lazy load sections không visible
- Optimize re-renders

#### D. Animation Reduction Techniques
**If lag persists**:
1. **Simplify background animations**:
   - Reduce glow animation complexity
   - Lower blur values
   - Disable parallax on low-end devices

2. **Progressive enhancement**:
   ```typescript
   // Detect device capability
   const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   const isLowEndDevice = navigator.hardwareConcurrency <= 4;

   if (prefersReducedMotion || isLowEndDevice) {
     // Disable heavy animations
     // Use simpler transitions
   }
   ```

3. **Optimize GSAP ScrollTrigger**:
   ```typescript
   scrollTrigger: {
     scrub: 1, // Faster response
     anticipatePin: 1, // Better pinning performance
     fastScrollEnd: true, // Snap faster on fast scroll
     preventOverlaps: true, // Avoid animation conflicts
   }
   ```

### 3.3. Testing Plan

**Test scenarios**:
1. Smooth scroll từ Section 1 → 4
2. Navigation click (jump to section)
3. Mobile swipe gestures
4. Browser back/forward buttons
5. Resize window during scroll

**Acceptance criteria**:
- Constant 60fps during all transitions
- No visual stutter hoặc jank
- Smooth snap to sections
- No layout shifts
- Fast response time (<100ms) cho interactions

---

## 📝 Notes quan trọng

### Current Status
- ✅ Website deployed: https://ai-workforce-2026.pages.dev
- ✅ All 4 sections working
- ✅ Basic loading animation (CargoKite-inspired)
- ⚠️ Loading animation chưa perfect match
- ⚠️ Transitions có thể smooth hơn

### Files cần modify

**High Priority**:
- `components/Loader.tsx` - Loading animation update
- `App.tsx` - ScrollTrigger optimization
- `src/index.css` - Performance CSS

**Medium Priority**:
- `components/Sections.tsx` - Individual section animations
- `components/Navigation.tsx` - Nếu cần optimize

### Performance Targets

| Metric | Current | Target |
|--------|---------|--------|
| FPS (scroll) | ? | 60fps |
| Loading time | ~3s | ~2.5s |
| Time to Interactive | ? | <2s |
| Lighthouse Score | ? | >90 |

### Reference Links

- CargoKite: https://cargokite.com/
- GSAP Performance: https://gsap.com/docs/v3/GSAP/gsap.config()
- Web Vitals: https://web.dev/vitals/

---

## 🚀 Deployment

Sau khi hoàn thành:
```bash
npm run deploy
```

URL kiểm tra:
- Production: https://ai-workforce-2026.pages.dev
- Latest: Check terminal output sau deploy

---

## 📊 Token Budget

- Session 03 used: 87,514 / 200,000 (43.8%)
- Remaining: 112,486 (56.2%)
- ✅ Sufficient cho session 04

---

## ✅ Success Criteria

**Session 04 hoàn thành khi**:
1. [ ] Document chi tiết cargokite.com animations (với timestamps)
2. [ ] Loader animation match 95%+ với cargokite.com
3. [ ] FPS stable ở 60fps trong mọi transitions
4. [ ] Không có visual stutter
5. [ ] Tested trên ít nhất 2 devices khác nhau
6. [ ] Deployed và verified on production

---

**Created**: 2026-01-13, 23:30
**Session**: 03 → 04 transition
**Priority**: High
**Estimated time**: 2-3 hours
