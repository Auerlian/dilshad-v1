# Dilshad v1 — Cycle 2 Image Plan

Date: 2026-03-21

## 1) Asset Backlog by Priority (Conversion-Weighted)

| Priority | Asset Group | IDs / Scope | Why it matters for conversion | Owner | Status |
|---|---|---|---|---|---|
| P0 | Homepage Hero | `hero-home` | First-screen trust + order intent | Design + Frontend | Planned |
| P0 | Top Sellers Dishes | `ctm`, `lrj`, `gkp`, `gn`, `ob` | Drives menu CTR and add-to-cart | Content + Frontend | Planned |
| P0 | Category Covers | `category-signature-curries`, `category-seafood`, `category-breads`, `category-rice-sides`, `category-starters` | Improves scanability and menu navigation speed | Content | Planned |
| P0 | Trust Cues | `trust-storefront-day`, `trust-storefront-evening`, `trust-counter-handoff`, `trust-kitchen-hands` | Reduces perceived risk, improves checkout confidence | Content | Planned |
| P1 | Remaining Menu Dishes | All non-top-seller SKUs | Completes visual consistency | Content | Planned |
| P1 | Account/Reorder Utility Visuals | `reorder-card`, `history-empty-state` | Helps repeat-order engagement | Product Design | Planned |

---

## 2) Exact Variant Requirements by Asset Group

## Hero (`hero-home`)
- 1920x1080 (16:9)
- 1600x900 (16:9)
- 1280x720 (16:9)
- 1080x1350 (4:5)
- 828x1104 (3:4)

## Dish Top Sellers (`dish-{id}`)
Per ID (`ctm`,`lrj`,`gkp`,`gn`,`ob`):
- Card: 640x640, 960x960, 1280x1280
- Feature: 800x450, 1200x675, 1600x900

## Category Covers (`category-{slug}`)
- 960x540
- 1280x720
- 1600x900
- Optional square fallback: 800x800

## Trust Cues (`trust-{scene}`)
- 600x400
- 1200x800
- 1800x1200
- Optional portrait: 1080x1350

Formats for every variant:
- AVIF (primary)
- WebP (secondary)
- JPG (fallback)

---

## 3) Breakpoint Mapping (Frontend Contract)

- `<768px`: mobile variants (640 card, 960x540 category, 1080x1350 hero)
- `768–1023px`: tablet variants (960/1280 card, 1280x720 category, 1280x720 hero)
- `1024–1439px`: desktop default (1200/1600 feature, 1600x900 hero)
- `>=1440px`: desktop large (1920x1080 hero, 1600+ feature)

---

## 4) CMS/Data Contract Entries (per asset record)

Required fields:
- `asset_id`
- `asset_type`
- `entity_id`
- `variant`
- `width`
- `height`
- `aspect_ratio`
- `format`
- `path`
- `alt`
- `focal_point`
- `license_type`
- `source_url`
- `creator`
- `platform`
- `downloaded_at`
- `stock_temp`
- `replacement_priority`
- `status`

---

## 5) Production Sequence (MVP <4 weeks)

## Week 1
- Lock top-seller list + category slug mapping.
- Finalize hero concept and trust cue shot list.
- Confirm CMS schema fields + naming standard.

## Week 2
- Produce/source P0 masters.
- Generate responsive variants + formats.
- Upload and metadata-tag all P0 assets.

## Week 3
- Frontend wiring (`picture/srcset/sizes`, loading strategy, fallbacks).
- QA crops across mobile/tablet/desktop.
- Fix focal points and problematic crops.

## Week 4
- Ship P0 to production.
- Fill P1 backlog items.
- Run performance + conversion baseline check (CTR/add-to-cart by image slot).

---

## 6) Acceptance Checklist

- [ ] All P0 assets exist with complete variant sets.
- [ ] Every variant available in AVIF/WebP/JPG.
- [ ] Frontend uses correct breakpoint mappings and explicit width/height.
- [ ] Hero and above-fold image priority correctly configured.
- [ ] CMS contains full license/provenance metadata.
- [ ] Missing-image fallback behavior validated.
- [ ] QA sign-off on crop safety and visual consistency.
