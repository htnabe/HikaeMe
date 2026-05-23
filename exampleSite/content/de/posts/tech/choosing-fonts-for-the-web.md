---
title: "Web-Schriftarten waehlen: Ein praxisnaher Leitfaden"
date: 2026-02-22T10:00:00+09:00
draft: false
toc: true
tags: [typography, css, webfonts]
categories: [Tech]
thumbnail: ""
---

Typografie wird im Web oft unterschaetzt, beeinflusst aber Lesbarkeit, Stimmung und Vertrauen stark. Dieser Beitrag zeigt die wichtigsten Entscheidungen zwischen Systemschriften und Webfonts.

## 1. Systemschriften

Systemschriften sind bereits auf dem Geraet installiert. Dadurch entfallen zusaetzliche Requests und die Seite laedt schneller.

```css
font-family:
  "Hiragino Sans", "Yu Gothic UI", "Meiryo",
  "Noto Sans CJK JP", system-ui, -apple-system,
  sans-serif;
```

## 2. Google Fonts

Google Fonts bietet viele Schriftfamilien und laesst sich per `<link>` einbinden:

```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap" rel="preload stylesheet" as="style" />
```

`display=swap` sorgt dafuer, dass Text waehrend des Ladens sichtbar bleibt.

## 3. Mehrsprachigkeit

Bei mehrsprachigen Seiten ist ein Font mit guter Abdeckung wichtig. Noto Sans / Noto Sans JP ist oft eine solide Kombination.

## 4. Performance-Tipps

- Lade nur wirklich benoetigte Gewichte
- Nutze `preconnect` fuer Font-Domains
- Definiere immer eine Fallback-Kette

## Fazit

Die beste Schriftwahl ist ein Kompromiss aus Design, Performance und Lesbarkeit. Starte einfach und optimiere mit Messdaten.
