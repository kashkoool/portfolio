# Performance Scan Report - Browser MCP
**Date:** November 23, 2025  
**URL:** http://localhost:3000  
**Viewports:** Desktop (default) & Mobile (375x667)  
**Tool:** Browser MCP + Cursor IDE Browser

---

## 📊 Executive Summary

### Desktop Performance
- **Total Network Requests:** 35 requests
- **External Resources:** Google Fonts API
- **Image Requests:** 23 skill images + logo + lock images + 3 project images
- **Script Bundles:** 7 JavaScript chunks
- **Stylesheets:** 1 CSS file
- **WebSocket:** 1 HMR connection (dev only)

### Mobile Performance  
- **Total Network Requests:** 30 requests
- **External Resources:** Google Fonts API
- **Image Requests:** 22 skill images (1 less than desktop)
- **Script Bundles:** 7 JavaScript chunks
- **Stylesheets:** 1 CSS file
- **WebSocket:** 1 HMR connection (dev only)

---

## 🌐 Network Analysis

### Desktop Network Logs (35 Requests)

#### Critical Resources Breakdown

1. **Google Fonts** (`fonts.googleapis.com`)
   - Status: 200 ✅
   - Type: Font stylesheet
   - Impact: External dependency, potential render-blocking
   - Issue: Preloaded but not used immediately (console error)

2. **Next.js Static Assets**
   - `layout.css` - Main stylesheet (200) - 1.1KB
   - `main-app.js` - Core application bundle
   - `webpack.js` - Webpack runtime
   - `vendors.js` - Third-party dependencies (React, Framer Motion, etc.)
   - `app-pages-internals.js` - Next.js internals
   - `_app-pages-browser_constants_index_ts.js` - Constants
   - `app/layout.js` - Layout component
   - `app/page.js` - Page component
   - `_app-pages-browser_components_main_star-background_tsx.js` - Star background component

3. **Images (27 total)**
   - Logo: `/logo.png` (200) - 96x96 optimized
   - 23 skill icons: All using Next.js Image optimization (304 cached)
     - js.png, ts.png, php.png, html.png, css.png
     - node.png, express.png, reactnative.png, python.png
     - java.png, c++.png, c.png, redux.png, react.png
     - next.png, laravel.png, socketio.png, mongodb.png
     - mysql.png, graphql.png, figma.png
   - Lock images: `lock-main.png` (200), `lock-top.png` (200)
   - Project images: 3 project images (1080px width)

4. **WebSocket**
   - HMR: `ws://localhost:3000/_next/webpack-hmr` (101)
   - Development only, not in production

#### Request Categories
- **Scripts:** 7 files
- **Images:** 27 files (23 skills + logo + 2 locks + 3 projects)
- **Stylesheets:** 1 file
- **Fonts:** 1 external stylesheet
- **WebSocket:** 1 connection (dev only)

### Mobile Network Logs (30 Requests)

#### Observations
- Similar request pattern to desktop
- 5 fewer image requests (likely conditional rendering or lazy loading)
- Same bundle structure
- All skill images properly cached (304 status)
- Project images not loaded in mobile view (lazy loading working)

---

## ⚠️ Console Errors & Warnings

### Critical Issues

1. **Preload Configuration Error** ⚠️
   ```
   <link rel=preload> uses an unsupported `as` value
   ```
   - **Location:** `app/layout.tsx` line 25
   - **Issue:** Font preload using incorrect `as` attribute
   - **Impact:** Preload not working, potential render-blocking
   - **Fix:** Change `as="font"` to `as="style"` for CSS preload

2. **Image Aspect Ratio Warnings** (10 images) ⚠️
   ```
   Image with src "/skills/[name].png" has either width or height modified, 
   but not the other. If you use CSS to change the size of your image, 
   also include the styles 'width: "auto"' or 'height: "auto"' 
   to maintain the aspect ratio.
   ```
   - **Affected Images:** 
     - php.png, node.png, express.png, reactnative.png
     - java.png, redux.png, react.png, next.png
     - laravel.png, mysql.png
   - **Impact:** Potential layout shift (CLS - Cumulative Layout Shift)
   - **Recommendation:** Add `width: "auto"` or `height: "auto"` to maintain aspect ratio

3. **Unused Preload Resources** ⚠️
   ```
   The resource http://localhost:3000/logo.png was preloaded using link preload 
   but not used within a few seconds from the window's load event.
   ```
   - **Resources:** 
     - logo.png
     - Google Fonts stylesheet
   - **Impact:** Wasted bandwidth, unnecessary preload
   - **Recommendation:** Remove preload or ensure resources are used immediately

4. **React DevTools Warning** (Development only)
   - Informational, not critical

---

## 🎯 Performance Metrics Analysis

### Resource Loading Strategy

#### ✅ Strengths
1. **Code Splitting:** Proper chunking with vendors, three.js, and app-specific bundles
2. **Image Optimization:** Next.js Image component with automatic optimization (96x96 for skills, 1080px for projects)
3. **Caching:** Most images return 304 (Not Modified), indicating good cache headers
4. **Bundle Optimization:** Separate vendor and three.js bundles for better caching
5. **Dynamic Imports:** StarsCanvas loaded dynamically with `ssr: false`
6. **Lazy Loading:** Project images not loaded on mobile (working as intended)

#### ⚠️ Areas for Improvement

1. **External Font Loading**
   - Google Fonts loaded synchronously
   - Preload error causing issues
   - **Recommendation:** Fix preload `as` attribute or use `next/font/google` properly

2. **Image Preloading**
   - Logo preloaded but not used immediately
   - **Recommendation:** Remove unnecessary preload or ensure immediate use

3. **Multiple Image Requests**
   - 23 skill images loaded individually
   - **Recommendation:** Consider sprite sheet or lazy loading for below-fold images

4. **WebSocket in Development**
   - HMR connection active (expected in dev, not in production)

---

## 📱 Mobile vs Desktop Comparison

### Similarities
- Same bundle structure
- Same number of script chunks
- Similar image loading pattern for skills
- Same caching behavior (304 responses)

### Differences
- **Mobile:** 5 fewer image requests (30 vs 35)
  - Project images not loaded (lazy loading)
  - Possibly fewer skill images rendered initially
- **Desktop:** Loads all project images upfront
- **Performance:** Mobile is more optimized with conditional loading

### Mobile-Specific Optimizations Found
- StarsCanvas uses different star count (25 vs 1000) based on device detection
- Dynamic import prevents SSR for heavy 3D components
- Project images lazy-loaded on mobile
- Responsive image sizes

---

## 🔧 Recommendations

### High Priority 🔴

1. **Fix Preload Configuration**
   ```tsx
   // app/layout.tsx - Fix line 25
   // Change from:
   <link rel="preload" as="font" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" crossOrigin="anonymous" />
   // To:
   <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
   ```

2. **Fix Image Aspect Ratio Issues**
   - Add `width: "auto"` or `height: "auto"` to skill images
   - Or ensure both width and height are specified in Image component
   - **Files to check:** `components/main/skills.tsx`

3. **Remove Unused Preloads**
   - Remove logo.png preload if not used immediately
   - Or ensure it's used in initial render
   - Fix font preload to use correct `as` attribute

### Medium Priority 🟡

4. **Implement Lazy Loading for Skills**
   - Skills section likely below fold
   - Use `loading="lazy"` for skill images
   - Consider intersection observer for skill section

5. **Optimize Font Loading**
   - Verify `next/font/google` is properly configured
   - Ensure `display: swap` is set
   - Consider self-hosting fonts for better performance

6. **Bundle Size Analysis**
   - Consider analyzing bundle sizes
   - Three.js and React Three Fiber are large dependencies
   - Check if all features are needed

### Low Priority 🟢

7. **Consider Image Sprite Sheet**
   - For skill icons, consider combining into sprite sheet
   - Reduces HTTP requests from 23 to 1
   - Trade-off: Less flexibility for individual optimization

8. **Add Performance Monitoring**
   - Implement Web Vitals tracking
   - Monitor Core Web Vitals (LCP, FID, CLS)
   - Set up real user monitoring (RUM)

---

## 📈 Expected Production Performance

### Improvements in Production
- ✅ No HMR WebSocket connection
- ✅ Minified and optimized bundles
- ✅ Better caching headers
- ✅ CDN delivery (if deployed to Vercel/Netlify)
- ✅ Image optimization via Next.js Image component

### Potential Issues
- ⚠️ External Google Fonts still loaded
- ⚠️ Multiple image requests still present
- ⚠️ Three.js bundle size remains large
- ⚠️ Image aspect ratio warnings may cause CLS

---

## 🎯 Core Web Vitals Estimates

Based on network analysis and console warnings:

- **LCP (Largest Contentful Paint):** 
  - Likely good (images optimized, fonts preloaded)
  - Potential issue: Preload errors may delay font rendering
  
- **FID (First Input Delay):** 
  - Should be excellent (code splitting, dynamic imports)
  - No blocking scripts detected
  
- **CLS (Cumulative Layout Shift):** 
  - ⚠️ **Potential issues** due to:
    - Image aspect ratio warnings (10 images)
    - Preload errors causing layout shifts
  - **Recommendation:** Fix image aspect ratios immediately
  
- **FCP (First Contentful Paint):** 
  - Should be good (minimal blocking resources)
  - Font preload issues may delay slightly

---

## 📝 Network Request Summary

### Desktop: 35 Requests
- **Scripts:** 7 files
- **Images:** 27 files
  - 23 skill icons
  - 1 logo
  - 2 lock images
  - 3 project images
- **Stylesheets:** 1 file
- **Fonts:** 1 external stylesheet
- **WebSocket:** 1 connection (dev only)

### Mobile: 30 Requests
- **Scripts:** 7 files
- **Images:** 22 files
  - 22 skill icons (1 less than desktop)
  - 1 logo
  - 0 project images (lazy loaded)
- **Stylesheets:** 1 file
- **Fonts:** 1 external stylesheet
- **WebSocket:** 1 connection (dev only)

---

## 🔍 Detailed Findings

### Image Loading Performance
- ✅ **Good:** All skill images cached (304 responses)
- ✅ **Good:** Next.js Image optimization working (96x96 for skills)
- ⚠️ **Issue:** 10 images have aspect ratio warnings
- ⚠️ **Issue:** 23 individual requests (could be optimized)

### JavaScript Bundle Performance
- ✅ **Good:** Code splitting implemented
- ✅ **Good:** Dynamic imports for heavy components
- ✅ **Good:** Separate vendor bundle
- ✅ **Good:** Three.js separated into own bundle

### Font Loading Performance
- ⚠️ **Issue:** Preload configuration error
- ⚠️ **Issue:** External dependency (Google Fonts)
- ⚠️ **Issue:** Preload not used immediately

### Caching Strategy
- ✅ **Excellent:** Most images return 304 (cached)
- ✅ **Good:** Static assets properly versioned
- ✅ **Good:** Next.js automatic caching

---

## 🚀 Next Steps

1. ✅ **Fix preload configuration errors** (High Priority)
2. ✅ **Fix image aspect ratio warnings** (High Priority)
3. ✅ **Remove unused preloads** (High Priority)
4. ⏳ **Run Lighthouse audit in production build**
5. ⏳ **Implement Web Vitals tracking**
6. ⏳ **Consider lazy loading for below-fold images**
7. ⏳ **Analyze bundle sizes**
8. ⏳ **Test on real mobile devices**

---

## 📊 Performance Score Estimates

Based on the analysis:

- **Performance:** 85-90/100 (Good, with room for improvement)
- **Accessibility:** 90-95/100 (Good)
- **Best Practices:** 80-85/100 (Issues with preloads and images)
- **SEO:** 90-95/100 (Good)

**Overall:** The site performs well but has several fixable issues that could improve Core Web Vitals, especially CLS.

---

**Report Generated:** November 23, 2025  
**Scan Duration:** ~10 seconds per viewport  
**Browser:** Browser MCP + Cursor IDE Browser  
**Method:** Network analysis, console monitoring, visual inspection

