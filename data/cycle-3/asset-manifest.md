# Dilshad v1 — Cycle 3 Asset Manifest (Production)

Date: 2026-03-21  
Status legend: `planned | in_progress | approved | published`

This manifest is the execution source of truth for launch-critical visuals.

## 1) Format

- File pattern: `{asset_id}--{variant}--{width}x{height}--v{version}.{ext}`
- Formats per row: `avif`, `webp`, `jpg`
- Path root by type:
  - hero: `/assets/images/brand/{asset_id}/`
  - dish: `/assets/images/menu/{asset_id}/`
  - category: `/assets/images/categories/{asset_id}/`
  - trust: `/assets/images/trust/{asset_id}/`

---

## 2) P0 Asset Families

| asset_id | asset_type | entity_id | priority | owner | status |
|---|---|---|---|---|---|
| hero-home | hero | home | P0 | Design + Frontend | planned |
| dish-ctm | dish | ctm | P0 | Content + Frontend | planned |
| dish-lrj | dish | lrj | P0 | Content + Frontend | planned |
| dish-gkp | dish | gkp | P0 | Content + Frontend | planned |
| dish-gn | dish | gn | P0 | Content + Frontend | planned |
| dish-ob | dish | ob | P0 | Content + Frontend | planned |
| category-signature-curries | category | signature-curries | P0 | Content | planned |
| category-seafood | category | seafood | P0 | Content | planned |
| category-breads | category | breads | P0 | Content | planned |
| category-rice-sides | category | rice-sides | P0 | Content | planned |
| category-starters | category | starters | P0 | Content | planned |
| trust-storefront-day | trust | storefront-day | P0 | Content | planned |
| trust-storefront-evening | trust | storefront-evening | P0 | Content | planned |
| trust-counter-handoff | trust | counter-handoff | P0 | Content | planned |
| trust-kitchen-hands | trust | kitchen-hands | P0 | Content | planned |

---

## 3) Variant Requirements by Family Type

## 3.1 hero-home
| variant | width | height | aspect | formats | max_kb_target |
|---|---:|---:|---|---|---:|
| desktop-xl | 1920 | 1080 | 16:9 | avif,webp,jpg | 280 |
| desktop | 1600 | 900 | 16:9 | avif,webp,jpg | 280 |
| tablet | 1280 | 720 | 16:9 | avif,webp,jpg | 240 |
| mobile | 1080 | 1350 | 4:5 | avif,webp,jpg | 240 |
| mobile-fallback | 828 | 1104 | 3:4 | avif,webp,jpg | 200 |

## 3.2 dish-* (ctm/lrj/gkp/gn/ob)
| variant | width | height | aspect | formats | max_kb_target |
|---|---:|---:|---|---|---:|
| card | 640 | 640 | 1:1 | avif,webp,jpg | 120 |
| card | 960 | 960 | 1:1 | avif,webp,jpg | 120 |
| card | 1280 | 1280 | 1:1 | avif,webp,jpg | 150 |
| feature | 800 | 450 | 16:9 | avif,webp,jpg | 170 |
| feature | 1200 | 675 | 16:9 | avif,webp,jpg | 170 |
| feature | 1600 | 900 | 16:9 | avif,webp,jpg | 220 |

## 3.3 category-*
| variant | width | height | aspect | formats | max_kb_target |
|---|---:|---:|---|---|---:|
| cover | 960 | 540 | 16:9 | avif,webp,jpg | 140 |
| cover | 1280 | 720 | 16:9 | avif,webp,jpg | 160 |
| cover | 1600 | 900 | 16:9 | avif,webp,jpg | 210 |
| square-fallback | 800 | 800 | 1:1 | avif,webp,jpg | 150 |

## 3.4 trust-*
| variant | width | height | aspect | formats | max_kb_target |
|---|---:|---:|---|---|---:|
| thumb | 600 | 400 | 3:2 | avif,webp,jpg | 90 |
| standard | 1200 | 800 | 3:2 | avif,webp,jpg | 160 |
| retina | 1800 | 1200 | 3:2 | avif,webp,jpg | 230 |
| portrait | 1080 | 1350 | 4:5 | avif,webp,jpg | 180 |

---

## 4) Example File Inventory (v1)

| filename |
|---|
| hero-home--desktop-xl--1920x1080--v1.avif |
| hero-home--desktop-xl--1920x1080--v1.webp |
| hero-home--desktop-xl--1920x1080--v1.jpg |
| dish-ctm--card--960x960--v1.avif |
| dish-ctm--feature--1200x675--v1.avif |
| category-seafood--cover--1280x720--v1.avif |
| trust-kitchen-hands--standard--1200x800--v1.avif |

---

## 5) CDN Transformation Contract (linked to all assets)

Use canonical URL query parameters:
- `w`, `h`, `fit=cover`
- `fm` (`avif|webp|jpg`)
- `q` (format quality preset)
- `dpr` (`1|2`)
- `fp-x`, `fp-y` (from CMS focal point)

Cache policy:
- immutable 1-year caching
- new version number for any change

---

## 6) P1 Backlog Registration Rule

For each non-top-seller dish in `data/cycle-2/menu.json`:
1. Create `asset_id = dish-{item_slug}`
2. Apply dish variant matrix (card + feature sizes)
3. Set initial status `planned`
4. Set `replacement_priority` based on sales + confidence + stock_temp

This keeps all 125 menu items on the same production contract without changing naming or CDN strategy.
