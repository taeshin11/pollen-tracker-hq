# PollenTrackerHQ — PRD
**Folder:** `pollen-tracker-hq`
**Tagline:** Daily Pollen Forecast by ZIP Code — Know Before You Go Outside

---

## 1. Overview

PollenTrackerHQ provides real-time and forecasted pollen and allergy index data by ZIP code and city across the United States. Users can look up tree, grass, and weed pollen levels for their area, view multi-day forecasts, browse allergen-specific guides, and receive symptom management tips. The product is SEO-first: thousands of programmatic pages (per ZIP, per city, per state, per allergen type) drive organic search traffic.

**Target Users:**
- Allergy sufferers (hay fever, asthma, rhinitis)
- Parents of children with pollen allergies
- Outdoor athletes and hikers planning activity around pollen levels
- Healthcare professionals seeking reference data

---

## 2. Core Features

1. ZIP / city pollen index lookup (real-time + 5-day forecast)
2. Tree, grass, weed, and mold pollen breakdown by type
3. Daily allergy risk level (Low / Moderate / High / Very High) with color indicators
4. 5-day pollen forecast chart (Chart.js line chart)
5. Symptom severity guide per allergen
6. Seasonal calendar: peak pollen months by region/state
7. City-to-city comparison widget
8. Share button (copy link / social)
9. Visitor counter (today + total) in footer
10. Adsterra ad placements (Social Bar, Native Banner, Display)
11. Google Sheets webhook on every ZIP search interaction
12. Full i18n: en, ko, ja, zh, es, fr, de, pt
13. hreflang tags on every page
14. schema.org structured data (WebPage, FAQPage, BreadcrumbList)
15. Auto-generated sitemap.xml

---

## 3. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router, ISR) | ISR for pollen data freshness (revalidate: 3600) |
| Styling | Tailwind CSS | Utility-first, responsive |
| Charts | Chart.js + react-chartjs-2 | Free, lightweight |
| Data | Open-Meteo Pollen API | Free, no key required |
| Fallback | Static seasonal JSON | Offline / API failure resilience |
| Deployment | Vercel (free hobby tier) | `npx vercel --prod` |
| Backend (optional) | Railway free tier | Visitor counter persistence |
| Version Control | GitHub via `gh` CLI | `gh repo create taeshin11/pollen-tracker-hq` |
| i18n | next-intl | |
| SEO | next-sitemap | Auto sitemap + robots.txt |

---

## 4. Free Data Sources

### Primary: Open-Meteo Air Quality API
- **URL:** `https://air-quality-api.open-meteo.com/v1/air-quality`
- **Parameters:** `latitude`, `longitude`, `hourly=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen`
- **Rate limit:** None (free, no API key)
- **Geo-coding:** Open-Meteo Geocoding API (`https://geocoding-api.open-meteo.com/v1/search?name={city}`)
- **ZIP to lat/lon:** Use free `zippopotam.us` API: `https://api.zippopotam.us/us/{zip}`

### Secondary: Static Seasonal Reference Data
- File: `data/seasonal-pollen.json` — curated from AAAAI (American Academy of Allergy, Asthma & Immunology) public tables
- Contains: peak months per state per allergen type

### Allergen Info
- File: `data/allergens.json` — static descriptions, symptoms, tips for ~20 allergen types

---

## 5. Page Structure

### `/` — Home
- Hero: ZIP / city search bar (large, centered)
- "How it works" 3-step explainer
- Sample forecast cards for 5 major cities (New York, Los Angeles, Chicago, Houston, Phoenix)
- Allergen type quick links
- SEO: H1 "Pollen Forecast by ZIP Code — PollenTrackerHQ", meta description, FAQ schema

### `/zip/[zipcode]` — ZIP Forecast Page (ISR, revalidate: 3600)
- Page H1: "Pollen Forecast for [City, State] ([ZIP])"
- Today's pollen index card: Large risk badge, tree/grass/weed breakdown
- 5-day forecast chart (Chart.js line chart, pastel colored)
- Allergen tip cards (seasonal tips based on current dominant pollen)
- "Nearby ZIPs" sidebar links (generated from static neighbor-zip data)
- Breadcrumb: Home > States > [State] > [ZIP]
- Schema: WebPage + FAQPage + BreadcrumbList

### `/cities/[city-state]` — City Page (ISR, revalidate: 3600)
- Same as ZIP page but city-slug based (e.g., `/cities/austin-tx`)
- Title: "Pollen Count Today in [City], [State]"
- Links to top ZIPs within city

### `/states/[state]` — State Page (SSG)
- State pollen overview: seasonal calendar (bar chart)
- Top cities in state with current pollen level badges
- Internal links to city pages
- Static data: seasonal peak months from `data/seasonal-pollen.json`

### `/allergens/[type]` — Allergen Detail Page (SSG)
- Types: tree, grass, weed, mold, ragweed, birch, oak, cedar, etc.
- Symptom guide, peak season calendar, management tips
- List of top affected cities / states
- FAQ schema

### `/blog/[slug]` — Optional static blog posts
- Seasonal allergy guides, city-specific allergy articles
- Pre-written: 10 articles in `data/blog-posts.json`

---

## 6. UI/UX Design

### Color Palette (soft pastels)
- Background: `#f0f4ff` (lavender-white)
- Primary card: `#ffffff` with shadow
- Low pollen: `#d4edda` (soft green)
- Moderate: `#fff3cd` (soft yellow)
- High: `#fde8d8` (soft orange)
- Very High: `#f8d7da` (soft red)
- Accent: `#7c9ef8` (pastel blue)
- Text: `#2d3748` (dark charcoal)

### Layout
- Mobile-first Tailwind grid
- Sticky top navbar: logo + search bar + language picker
- Footer: visitor counter badge (non-intrusive), ad slot, site links

### Pollen Risk Color Badges
```
Low     → green badge (#6bcb77)
Moderate → yellow badge (#ffd166)
High    → orange badge (#ff9a3c)
Very High → red badge (#ef476f)
```

### Chart
- Line chart with smooth bezier curves
- X-axis: Day names (Mon, Tue, …)
- Y-axis: Pollen count (grains/m³)
- Separate colored lines per allergen type
- Pastel fill area under lines

---

## 7. SEO Architecture

### Programmatic Pages at Scale
- ~33,000 US ZIP codes → `/zip/[zipcode]`
- ~500 major US cities → `/cities/[city-state]`
- 50 states → `/states/[state]`
- ~20 allergen types → `/allergens/[type]`
- Total: ~33,500+ indexable pages

### Meta Tags Template (ZIP page)
```
title: "Pollen Forecast {City}, {State} ({ZIP}) — Today & 5-Day | PollenTrackerHQ"
description: "Check today's pollen count in {City}, {State} ZIP {ZIP}. Tree, grass & weed pollen levels, allergy risk index, and 5-day forecast."
canonical: "https://pollen-tracker-hq.vercel.app/zip/{zipcode}"
```

### hreflang
- Every page includes hreflang tags for all 8 supported languages
- Default: `en` with `x-default`

### Schema.org (ZIP page)
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Pollen Forecast {City} {ZIP}",
  "url": "https://pollen-tracker-hq.vercel.app/zip/{zipcode}",
  "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [...] },
  "mainEntity": {
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is today's pollen count in {City}?", "acceptedAnswer": {...} },
      { "@type": "Question", "name": "When is pollen season in {State}?", "acceptedAnswer": {...} }
    ]
  }
}
```

### Sitemap
- Use `next-sitemap` to auto-generate `/sitemap.xml` and `/sitemap-*.xml` (split by category)
- Priority: home=1.0, ZIP pages=0.8, city=0.8, state=0.7, allergen=0.7
- robots.txt: Allow all, Sitemap reference

---

## 8. i18n

**Supported languages:** en, ko, ja, zh, es, fr, de, pt

**Implementation:** `next-intl` with `[locale]` route prefix

**File structure:**
```
messages/
  en.json
  ko.json
  ja.json
  zh.json
  es.json
  fr.json
  de.json
  pt.json
```

**Key translation keys:**
```json
{
  "home.hero.title": "Pollen Forecast by ZIP Code",
  "home.hero.subtitle": "Know your pollen risk before you step outside",
  "home.search.placeholder": "Enter ZIP code or city name",
  "pollen.level.low": "Low",
  "pollen.level.moderate": "Moderate",
  "pollen.level.high": "High",
  "pollen.level.very_high": "Very High",
  "forecast.title": "5-Day Pollen Forecast",
  "allergen.tree": "Tree Pollen",
  "allergen.grass": "Grass Pollen",
  "allergen.weed": "Weed Pollen",
  "allergen.mold": "Mold Spores",
  "footer.visitors.today": "Today's visitors: {count}",
  "footer.visitors.total": "Total visitors: {count}",
  "nav.home": "Home",
  "nav.states": "States",
  "nav.allergens": "Allergens"
}
```

**Language Switcher:** Dropdown in navbar, stores preference in localStorage, updates URL prefix

---

## 9. Ads (Adsterra)

**Placement 1 — Social Bar (global, bottom of page)**
```html
<!-- Adsterra Social Bar -->
<div id="adsterra-social-bar" class="adsterra-social-bar-placeholder">
  <!-- Social Bar Script goes here -->
</div>
```

**Placement 2 — Native Banner (below forecast chart)**
```html
<!-- Adsterra Native Banner -->
<div id="adsterra-native-banner" class="w-full my-4 min-h-[90px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
  <!-- Native Banner Ad -->
</div>
```

**Placement 3 — Display Banner (sidebar / below fold on mobile)**
```html
<!-- Adsterra Display 300x250 -->
<div id="adsterra-display" class="adsterra-display-placeholder mx-auto my-4" style="min-width:300px;min-height:250px;">
  <!-- Display Ad -->
</div>
```

All ad divs use Tailwind for responsive sizing. Ads are lazy-loaded after interactive content.

---

## 10. Google Sheets Webhook

**Trigger:** Every time a user searches a ZIP code or city

**Apps Script Web App URL:** Stored in `NEXT_PUBLIC_WEBHOOK_URL` env var

**Payload (POST, JSON):**
```json
{
  "event": "zip_search",
  "zip": "10001",
  "city": "New York",
  "state": "NY",
  "timestamp": "2026-04-13T10:00:00Z",
  "locale": "en",
  "referrer": "https://pollen-tracker-hq.vercel.app/"
}
```

**Apps Script handler:**
```javascript
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Events') || 
                SpreadsheetApp.getActiveSpreadsheet().insertSheet('Events');
  sheet.appendRow([new Date(), data.event, data.zip, data.city, data.state, data.locale, data.referrer]);
  return ContentService.createTextOutput(JSON.stringify({status:'ok'})).setMimeType(ContentService.MimeType.JSON);
}
```

**Client-side hook (non-blocking):**
```typescript
async function trackSearch(zip: string, city: string, state: string) {
  try {
    await fetch(process.env.NEXT_PUBLIC_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'zip_search', zip, city, state, timestamp: new Date().toISOString(), locale: navigator.language }),
    });
  } catch { /* silent fail */ }
}
```

---

## 11. Visitor Counter

**Implementation:** Vercel KV (free tier) or Railway Redis

**API route:** `app/api/visitors/route.ts`
```typescript
// GET: return { today: number, total: number }
// POST: increment both counters, reset today at midnight UTC
```

**Display:** Footer, non-intrusive small text
```html
<p class="text-xs text-gray-400">
  👥 Today: {todayCount} | Total: {totalCount}
</p>
```

**Daily reset:** Cron job via Vercel Cron (`vercel.json`) at `0 0 * * *`

---

## 12. Milestones

### Milestone 1 — Project Scaffold
- [ ] Run `init.sh` to create Next.js app with Tailwind, next-intl, next-sitemap
- [ ] Set up folder structure per File Structure spec
- [ ] Create `feature_list.json`, `claude-progress.txt`
- [ ] Initialize git: `git init && git add . && git commit -m "chore: initial scaffold"`
- [ ] Create GitHub repo: `gh repo create taeshin11/pollen-tracker-hq --public --source=. --push`
- [ ] Log to `research_history/milestone-1.md`

### Milestone 2 — Data Layer
- [ ] Create `data/zips.json` (33k ZIPs with lat/lon/city/state from free dataset)
- [ ] Create `data/cities.json` (500 major US cities)
- [ ] Create `data/states.json` (50 states with metadata)
- [ ] Create `data/allergens.json` (20 allergen types with descriptions)
- [ ] Create `data/seasonal-pollen.json` (peak months per state)
- [ ] Create `lib/openmeteo.ts` — Open-Meteo API client
- [ ] Create `lib/geocode.ts` — ZIP to lat/lon resolver
- [ ] Unit test API client with sample ZIPs
- [ ] `git commit -m "feat: data layer and API clients"` + push

### Milestone 3 — Core Pages
- [ ] Build `/` home page with search bar, hero, city cards
- [ ] Build `/zip/[zipcode]` ISR page with pollen forecast
- [ ] Build `/cities/[city-state]` ISR page
- [ ] Build `/states/[state]` SSG page
- [ ] Build `/allergens/[type]` SSG page
- [ ] Integrate Chart.js for 5-day forecast line chart
- [ ] `git commit -m "feat: core pages complete"` + push

### Milestone 4 — SEO + i18n
- [ ] Add all 8 language message files in `messages/`
- [ ] Configure next-intl with `[locale]` routing
- [ ] Add hreflang meta tags to all page layouts
- [ ] Add schema.org JSON-LD to all page types
- [ ] Configure next-sitemap (generate 33k+ URLs)
- [ ] Add robots.txt
- [ ] `git commit -m "feat: SEO and i18n complete"` + push

### Milestone 5 — Ads, Webhook, Visitor Counter
- [ ] Add Adsterra placeholder divs (3 placements per page)
- [ ] Implement Google Sheets webhook trigger on search
- [ ] Implement visitor counter API route + Vercel KV
- [ ] Add footer visitor counter display
- [ ] `git commit -m "feat: ads, webhook, visitor counter"` + push

### Milestone 6 — Polish + Deploy
- [ ] Responsive QA: mobile, tablet, desktop
- [ ] Lighthouse audit (target: Performance >85, SEO 100)
- [ ] Deploy: `npx vercel --prod`
- [ ] Verify sitemap at `/sitemap.xml`
- [ ] Final `git commit -m "chore: production deploy"` + push
- [ ] Log to `research_history/milestone-6.md`

---

## 13. File Structure

```
pollen-tracker-hq/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx                          # Home
│   │   ├── zip/[zipcode]/page.tsx            # ZIP forecast
│   │   ├── cities/[city-state]/page.tsx      # City page
│   │   ├── states/[state]/page.tsx           # State page
│   │   └── allergens/[type]/page.tsx         # Allergen detail
│   └── api/
│       └── visitors/route.ts
├── components/
│   ├── SearchBar.tsx
│   ├── PollenCard.tsx
│   ├── ForecastChart.tsx
│   ├── RiskBadge.tsx
│   ├── AllergenCard.tsx
│   ├── AdSlot.tsx
│   ├── VisitorCounter.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── LanguageSwitcher.tsx
├── data/
│   ├── zips.json
│   ├── cities.json
│   ├── states.json
│   ├── allergens.json
│   └── seasonal-pollen.json
├── lib/
│   ├── openmeteo.ts
│   ├── geocode.ts
│   └── webhook.ts
├── messages/
│   ├── en.json
│   ├── ko.json
│   ├── ja.json
│   ├── zh.json
│   ├── es.json
│   ├── fr.json
│   ├── de.json
│   └── pt.json
├── public/
│   └── icons/
├── research_history/
│   ├── milestone-1.md
│   └── ...
├── feature_list.json
├── claude-progress.txt
├── init.sh
├── next.config.ts
├── next-sitemap.config.js
├── tailwind.config.ts
├── vercel.json
└── package.json
```

---

## 14. Harness Spec

### `feature_list.json`
```json
{
  "project": "pollen-tracker-hq",
  "version": "1.0.0",
  "features": [
    { "id": "F01", "name": "ZIP Pollen Forecast", "status": "pending", "milestone": 3 },
    { "id": "F02", "name": "5-Day Chart", "status": "pending", "milestone": 3 },
    { "id": "F03", "name": "City Pages", "status": "pending", "milestone": 3 },
    { "id": "F04", "name": "State Pages", "status": "pending", "milestone": 3 },
    { "id": "F05", "name": "Allergen Pages", "status": "pending", "milestone": 3 },
    { "id": "F06", "name": "i18n (8 languages)", "status": "pending", "milestone": 4 },
    { "id": "F07", "name": "hreflang", "status": "pending", "milestone": 4 },
    { "id": "F08", "name": "Schema.org JSON-LD", "status": "pending", "milestone": 4 },
    { "id": "F09", "name": "Sitemap", "status": "pending", "milestone": 4 },
    { "id": "F10", "name": "Adsterra Ads", "status": "pending", "milestone": 5 },
    { "id": "F11", "name": "Google Sheets Webhook", "status": "pending", "milestone": 5 },
    { "id": "F12", "name": "Visitor Counter", "status": "pending", "milestone": 5 },
    { "id": "F13", "name": "Vercel Deploy", "status": "pending", "milestone": 6 }
  ]
}
```

### `claude-progress.txt`
```
Project: PollenTrackerHQ
Started: [DATE]
Current Milestone: 1
Last Completed Step: Project initialized
Next Step: Create data layer files
Notes: Use Open-Meteo free API. No API key needed.
```

### `init.sh`
```bash
#!/bin/bash
set -e
echo "=== Initializing PollenTrackerHQ ==="

# Create Next.js app
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --yes

# Install dependencies
npm install next-intl next-sitemap react-chartjs-2 chart.js @vercel/kv

# Create folder structure
mkdir -p app/api/visitors
mkdir -p components data lib messages public/icons research_history

# Create harness files
echo "Project: PollenTrackerHQ" > claude-progress.txt
echo "Started: $(date)" >> claude-progress.txt
echo "Current Milestone: 1" >> claude-progress.txt

# Init git
git init
git add .
git commit -m "chore: initial scaffold via init.sh"

# Create GitHub repo and push
gh repo create taeshin11/pollen-tracker-hq --public --source=. --push

echo "=== Init complete. Next: run milestone 2 data layer setup ==="
```

### `vercel.json`
```json
{
  "crons": [
    {
      "path": "/api/visitors/reset",
      "schedule": "0 0 * * *"
    }
  ]
}
```

---

## 15. Environment Variables

```
NEXT_PUBLIC_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
NEXT_PUBLIC_SITE_URL=https://pollen-tracker-hq.vercel.app
```

All variables must be added to Vercel dashboard and local `.env.local`. Never commit `.env.local`.

---

## 16. Key Implementation Notes

1. **Open-Meteo pollen data** returns hourly values — aggregate to daily max for "today's pollen level"
2. **ISR revalidation** set to 3600s (1 hour) for ZIP and city pages — pollen changes hourly
3. **ZIP data** source: use `https://raw.githubusercontent.com/millbj92/US-Zip-Codes-JSON/master/USCities.json` (public domain) for ZIP→city→state→lat→lon mapping
4. **generateStaticParams** for allergen and state pages (small set); ZIP/city pages use ISR with `dynamicParams: true`
5. **Chart.js** must be registered with `Chart.register(...)` in a client component; use `'use client'` directive
6. **next-sitemap** config: set `sitemapSize: 5000` to split large sitemap; exclude `/api/*`
7. **Tailwind** dark mode: disabled (pastel design is light-only)
8. **Language detection:** auto-detect from `Accept-Language` header via next-intl middleware; fallback to `en`
