---
title: "Choosing Fonts for the Web: A Practical Guide"
date: 2026-02-22T10:00:00+09:00
draft: false
toc: true
tags: [typography, css, webfonts]
categories: [Tech]
thumbnail: ""
---

Typography is one of the most overlooked aspects of web design, yet it profoundly affects readability, mood, and user trust. This article walks through the key considerations when choosing fonts for a website — from system fonts to Google Fonts.

## 1. System Fonts: The Zero-Cost Option

System fonts are pre-installed on the user's operating system. Using them avoids any network requests, which means faster page loads and no layout shift caused by font loading.

A typical system font stack looks like this:

```css
font-family:
  "Hiragino Sans", "Hiragino Kaku Gothic ProN", /* macOS / iOS */
  "Yu Gothic UI", "Yu Gothic", "Meiryo",         /* Windows */
  "Noto Sans CJK JP",                            /* Linux / Android */
  system-ui, -apple-system,
  sans-serif;
```

**Pros:**
- No external requests
- Instantly available
- Matches the OS look and feel

**Cons:**
- Less visual distinctiveness
- Inconsistent rendering across platforms

## 2. Google Fonts: Broad Selection, Easy Integration

Google Fonts provides over 1,500 free font families. You include them via a `<link>` tag in your HTML `<head>`:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap"
  rel="preload stylesheet"
  as="style"
/>
```

The `display=swap` parameter ensures text remains visible during font loading by falling back to a system font until the web font is ready.

**Pros:**
- Huge variety
- Free to use
- CDN-hosted with good performance

**Cons:**
- External network dependency
- Privacy implications (requests go to Google servers)
- Can cause a flash of unstyled text (FOUT) if not handled properly

## 3. Multilingual Considerations

If your site targets both English and Japanese readers, you need a font that covers both scripts well.

| Use Case | Recommended Font | Notes |
|---|---|---|
| Body text (Latin) | Noto Sans | Clean and neutral |
| Body text (Japanese) | Noto Sans JP | Matches Noto Sans visually |
| Display / headings | Orbitron, Raleway | Latin only |

Noto Sans JP is a good default because it covers both Latin and Japanese glyphs in a single font file, making it easy to reason about rendering.

## 4. Performance Tips

### Subset Your Fonts

Google Fonts automatically subsets fonts based on the `unicode-range` descriptor. For Japanese, use the `&subset=japanese` parameter or specify the `unicode-range` in your CSS.

### Limit Weights

Each weight you request is a separate network request. Stick to what you actually use:

```
family=Noto+Sans+JP:wght@400;700
```

Avoid loading 100, 200, 300, 400, 500, 600, 700, 800, 900 unless you genuinely use all of them.

### Preconnect

Add a `preconnect` hint to establish the connection to the Google Fonts server early:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

## 5. The CSS `font-feature-settings` Property

For Japanese text, `font-feature-settings: "palt"` enables proportional alternate glyphs, which tightens spacing around punctuation and produces more natural-looking Japanese typesetting:

```css
body {
  font-feature-settings: "palt";
  letter-spacing: 0.05em;
}
```

This small addition can noticeably improve reading comfort for Japanese content.

## 6. Fallback Strategy

A robust font stack always ends with a generic family (`sans-serif`, `serif`, or `monospace`). The browser will use the system's default font for that category if none of the named fonts are available.

```css
font-family:
  "Noto Sans JP",   /* preferred */
  "Hiragino Sans",  /* macOS fallback */
  "Yu Gothic UI",   /* Windows fallback */
  sans-serif;       /* last resort */
```

## Summary

- Use **system fonts** when performance is the top priority and visual uniqueness is not required.
- Use **Google Fonts** (e.g., Noto Sans JP) when you want consistent cross-platform rendering and can tolerate a small network overhead.
- Always define a **fallback chain** ending with a generic family.
- Apply `font-feature-settings: "palt"` and `letter-spacing` to improve Japanese readability.

Choosing fonts is ultimately a balance between aesthetics, performance, and accessibility. Start simple, measure the impact, and refine from there.
