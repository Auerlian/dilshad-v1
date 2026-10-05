# Dilshad v1 — Cycle 2 Visual Priority Spec

Date: 2026-03-21  
Input sources reviewed: `docs/cycle-1/lead-feedback.md`, `docs/cycle-1/visual-asset-strategy.md`, `data/cycle-1/image-candidates.md`, `docs/cycle-1/premium-ui-spec.md`, `docs/cycle-1/cms-spec.md`

## 1) Cycle 2 Goal
Shift from broad strategy to implementation-ready visual specs that directly improve conversion.

Lead feedback alignment:
- Prioritize by conversion impact (hero, top sellers, category covers, trust cues)
- Define exact dimensions + responsive breakpoints
- Make frontend/CMS integration explicit

---

## 2) Conversion-Impact Priority Ladder

## P0 (must ship first)
1. **Homepage Hero** (first impression + order intent)
2. **Top Sellers dish images** (menu CTR + add-to-cart uplift)
3. **Category cover images** (faster scan/discovery)
4. **Trust cue images** (authenticity: real kitchen/service/storefront)

## P1 (ship immediately after P0)
5. Remaining menu item images (non-top-sellers)
6. Reorder/account utility visuals (order history/reorder cards)

## P2 (optional in this cycle)
7. Lifestyle/editorial variants for seasonal campaigns
8. Additional social-first crops beyond core website needs

---

## 3) Priority Asset Specs (Exact Dimensions + Breakpoints)

## 3.1 Homepage Hero (P0)
**Use case:** landing hero on Home page, desktop + mobile.

**Master source:** 3840x2160 (16:9), sRGB, high quality (for future-proofing).  
**Delivery variants:**
- Desktop XL: **1920x1080** (16:9) — `hero-home-1920.avif/webp/jpg`
- Desktop/Laptop: **1600x900** (16:9) — `hero-home-1600.*`
- Tablet: **1280x720** (16:9) — `hero-home-1280.*`
- Mobile wide: **1080x1350** (4:5) — `hero-home-1080x1350.*`
- Mobile compact fallback: **828x1104** (3:4) — `hero-home-828x1104.*`

**Breakpoint mapping:**
- `>= 1440px viewport`: use 1920x1080
- `1024–1439px`: use 1600x900
- `768–1023px`: use 1280x720
- `< 768px`: use 1080x1350 (preferred), fallback 828x1104

**Performance target:**
- Hero image <= 280 KB (AVIF), <= 420 KB (WebP/JPEG fallback)

---

## 3.2 Top Sellers Dish Cards (P0)
Top sellers from current menu baseline: `ctm`, `lrj`, `gkp`, `gn`, `ob`.

**Use case:** menu grid cards, featured modules, quick add.

**Master source per dish:** 3000x3000 (1:1) + 3000x1688 (16:9) capture/crop.

**Card (1:1) variants:**
- 640x640 — small mobile list
- 960x960 — default card
- 1280x1280 — retina/high-density

**Featured strip (16:9) variants:**
- 800x450
- 1200x675
- 1600x900

**Breakpoint mapping (card usage):**
- `< 768px`: serve 640/960 set
- `>= 768px`: serve 960/1280 set

**Performance target:**
- Card <= 120 KB (AVIF), <= 180 KB (WebP/JPEG)
- Featured <= 170 KB (AVIF), <= 240 KB (WebP/JPEG)

---

## 3.3 Category Covers (P0)
Planned categories: Signature Curries, Seafood, Breads, Rice/Sides, Starters.

**Use case:** horizontal category rail, category header tiles.

**Master source:** 3200x1800 (16:9)

**Variants:**
- 960x540 (mobile/compact)
- 1280x720 (tablet/default)
- 1600x900 (desktop)

**Optional square fallback for tight layouts:**
- 800x800

**Performance target:**
- <= 140 KB (AVIF), <= 210 KB (WebP/JPEG)

---

## 3.4 Trust Cues (P0)
Assets: storefront (day/evening), handoff counter, kitchen action (hands-only), hygiene/process detail.

**Use case:** home trust section, about strip, checkout reassurance panel.

**Master source:** 3000x2000 (3:2)

**Variants:**
- Landscape: 1200x800, 1800x1200
- Portrait (optional cards): 1080x1350 (4:5)
- Thumbnail: 600x400

**Performance target:**
- Standard <= 160 KB (AVIF), <= 230 KB (WebP/JPEG)

---

## 4) Canonical Naming + Folder Standard

## Paths
- Menu dishes: `/assets/images/menu/`
- Category covers: `/assets/images/categories/`
- Hero: `/assets/images/brand/`
- Trust cues: `/assets/images/trust/`

## Filename standard
`{asset_type}-{entity}-{variant}-{width}x{height}.{ext}`

Examples:
- `dish-ctm-card-960x960.avif`
- `dish-gkp-feature-1200x675.webp`
- `category-seafood-cover-1280x720.jpg`
- `hero-home-default-1600x900.avif`
- `trust-kitchen-hands-1200x800.webp`

Allowed ext: `avif`, `webp`, `jpg`

---

## 5) Frontend Integration Checklist (Implementation-Ready)

1. **Picture/srcset implementation**
   - Use `<picture>` with AVIF -> WebP -> JPG fallback.
   - Provide `srcset` + `sizes` for each component type.

2. **Prevent CLS**
   - Always set explicit `width` and `height` attributes.
   - Match rendered aspect-ratio via CSS (`aspect-ratio` token per component).

3. **Lazy/eager rules**
   - Hero: `loading="eager"`, `fetchpriority="high"`
   - Above-fold top sellers: eager for first 1–2 cards only
   - All remaining images: `loading="lazy"`

4. **Component mapping**
   - Home hero -> `hero-home-*`
   - Featured top sellers -> `dish-*-feature-*`
   - Standard menu cards -> `dish-*-card-*`
   - Category rail/header -> `category-*-cover-*`
   - Trust section -> `trust-*-*`

5. **Fallback behavior**
   - If dish image missing, fallback to category cover + subtle “Image coming soon”.
   - If category cover missing, fallback to neutral gradient background token.

6. **Alt text rules**
   - Product image: `"{Dish name} with {visible key characteristic}"`
   - Category cover: `"{Category} dishes"`
   - Decorative only: empty alt `""`

7. **QA gates**
   - Lighthouse image audit pass (no oversized images).
   - Check mobile 360px, tablet 768px, desktop 1440px for crop safety.

---

## 6) CMS Integration Checklist (Implementation-Ready)

Add/confirm these fields in CMS media schema (per asset):
- `asset_id` (unique)
- `asset_type` (`hero|dish|category|trust`)
- `entity_id` (dish/category/section key)
- `variant` (`card|feature|cover|default|thumb`)
- `width`, `height`, `aspect_ratio`
- `format` (`avif|webp|jpg`)
- `path`
- `alt`
- `focal_point` (`x`, `y`) for smart crops
- `source_url`, `creator`, `platform`, `license_type`, `downloaded_at`
- `stock_temp` (bool)
- `replacement_priority` (`high|medium|low`)
- `status` (`draft|approved|published|retired`)

Operational checklist:
1. Upload master + generated variants in Media Library.
2. Validate dimensions automatically on upload (reject mismatched aspect for target slot).
3. Enforce alt text requirement on non-decorative assets.
4. Auto-link variant set by naming pattern + `asset_id`.
5. Expose only `published` assets to frontend API.
6. Keep audit log entries for create/update/replace actions.

---

## 7) Definition of Done (Cycle 2 Visual)
- P0 assets complete and wired: hero, top sellers, category covers, trust cues.
- Every slot serves correct breakpoint variants with AVIF/WebP/JPG fallback.
- CMS stores full metadata + licensing provenance for all published assets.
- Frontend passes responsive/crop/performance QA gates across mobile/tablet/desktop.
