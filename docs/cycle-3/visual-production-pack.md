# Dilshad v1 — Cycle 3 Visual Production Pack

Date: 2026-03-21  
Prepared from Cycle 2 outputs: `docs/cycle-2/visual-priority-spec.md`, `docs/cycle-2/lead-feedback.md`, `data/cycle-2/image-plan.md`, `docs/cycle-1/visual-asset-strategy.md`

## 1) Cycle 3 Finalization Goals

This pack converts Cycle 2 visual planning into a delivery-ready production spec with:
1. Final canonical naming and asset IDs
2. Explicit production asset manifest structure
3. CDN/transformation strategy (implementation-level)
4. Build order and go-live checklist

Lead feedback addressed:
- ✅ Final production asset manifest and naming convention
- ✅ Explicit CDN/transformation strategy
- ✅ Executable implementation checklist and definition of done

---

## 2) Final Scope Lock (Cycle 3)

## P0 (Launch-critical)
1. `hero-home`
2. Top sellers dish families: `dish-ctm`, `dish-lrj`, `dish-gkp`, `dish-gn`, `dish-ob`
3. Category covers:
   - `category-signature-curries`
   - `category-seafood`
   - `category-breads`
   - `category-rice-sides`
   - `category-starters`
4. Trust cues:
   - `trust-storefront-day`
   - `trust-storefront-evening`
   - `trust-counter-handoff`
   - `trust-kitchen-hands`

## P1 (Immediately after P0)
- Remaining menu dish image families (all non-top-seller SKUs)
- Utility visuals: `reorder-card`, `history-empty-state`

---

## 3) Canonical Naming Convention (Locked)

## 3.1 Asset ID
Use immutable asset family ID:
- `hero-home`
- `dish-{dish_slug}`
- `category-{category_slug}`
- `trust-{scene_slug}`
- `utility-{slug}`

## 3.2 File Name
`{asset_id}--{variant}--{width}x{height}--v{version}.{ext}`

Examples:
- `dish-ctm--card--960x960--v1.avif`
- `dish-gkp--feature--1200x675--v1.webp`
- `category-seafood--cover--1280x720--v1.jpg`
- `hero-home--mobile--1080x1350--v2.avif`

## 3.3 Path Convention
- `/assets/images/brand/{asset_id}/`
- `/assets/images/menu/{asset_id}/`
- `/assets/images/categories/{asset_id}/`
- `/assets/images/trust/{asset_id}/`
- `/assets/images/utility/{asset_id}/`

## 3.4 Extension Priority
Primary: `avif`  
Secondary: `webp`  
Fallback: `jpg`

---

## 4) Final Variant Matrix

## 4.1 Hero (`hero-home`)
- `desktop-xl`: 1920x1080
- `desktop`: 1600x900
- `tablet`: 1280x720
- `mobile`: 1080x1350
- `mobile-fallback`: 828x1104

## 4.2 Dish Top Sellers (`dish-{id}` for ctm/lrj/gkp/gn/ob)
- `card`: 640x640, 960x960, 1280x1280
- `feature`: 800x450, 1200x675, 1600x900

## 4.3 Category Covers (`category-{slug}`)
- `cover`: 960x540, 1280x720, 1600x900
- `square-fallback`: 800x800

## 4.4 Trust Cues (`trust-{scene}`)
- `thumb`: 600x400
- `standard`: 1200x800
- `retina`: 1800x1200
- `portrait` (optional): 1080x1350

Formats for each variant: AVIF + WebP + JPG.

---

## 5) CDN + Transformation Strategy (Production)

## 5.1 Origin Model
- Store only **master assets** in origin bucket/CMS (`masters/` namespace).
- Serve transformed derivatives via CDN URL parameters.
- Cache derivatives at edge.

## 5.2 Canonical Delivery URL Contract
`/cdn/{asset_id}/{variant}?w={width}&h={height}&fit=cover&fm={format}&q={quality}&dpr={dpr}&fp-x={x}&fp-y={y}`

Required parameters:
- `w`, `h`: exact target size
- `fit=cover`
- `fm`: `avif|webp|jpg`
- `q`: quality preset by format
- `dpr`: `1|2`
- `fp-x`, `fp-y`: focal point from CMS (0..1)

## 5.3 Quality Presets
- AVIF: `q=45` (hero), `q=42` (cards/covers)
- WebP: `q=68`
- JPG fallback: `q=76`

## 5.4 Cache Policy
- Immutable fingerprinted URLs (`--v{n}` in filename or `?v=` param)
- `Cache-Control: public, max-age=31536000, immutable`
- Purge only on version bump (no mutable overwrite)

## 5.5 Responsive Serving Contract
Use `<picture>` with AVIF/WebP/JPG and explicit `srcset`/`sizes`.
- Hero: eager + high priority
- First 1–2 above-fold cards: eager
- All remaining images: lazy

## 5.6 Provider Mapping (choose one)
- Cloudinary: map `w/h/c_fill/f_auto/q_auto:good/dpr_auto/g_xy_center`
- Imgix: map `w/h/fit=crop/auto=format/q/dpr/crop=focalpoint/fp-x/fp-y`
- S3 + CloudFront + Lambda/Thumbor: implement same query contract above

---

## 6) CMS Metadata Contract (Locked)

Each published variant must include:
- `asset_id`, `asset_type`, `entity_id`, `variant`
- `width`, `height`, `aspect_ratio`, `format`, `path`
- `alt`, `focal_point.x`, `focal_point.y`
- `source_url`, `creator`, `platform`, `license_type`, `downloaded_at`
- `stock_temp`, `replacement_priority`, `status`
- `version`

Status lifecycle: `draft -> approved -> published -> retired`

---

## 7) Build Order (Executable)

1. **Schema lock**: freeze naming + metadata contract + folder contract
2. **Master ingest**: upload/approve all P0 masters in CMS
3. **Transformation config**: enable canonical query contract in CDN/image service
4. **Frontend wiring**: hero, top-sellers, categories, trust modules
5. **Fallback logic**:
   - dish missing -> category cover + “Image coming soon”
   - category missing -> neutral gradient token
6. **QA + perf**:
   - crop-safety at 360/768/1024/1440
   - Lighthouse no oversized-image failures
   - verify byte budgets
7. **Publish P0** and tag release
8. **Start P1** immediately using same naming/contract

---

## 8) Implementation Checklist

## Engineering
- [ ] Add image helper to generate canonical CDN URLs from `asset_id + variant + format + dpr`
- [ ] Implement `<picture>` components for hero/card/category/trust
- [ ] Enforce width/height attrs and CSS aspect-ratio tokens
- [ ] Add fallback map for missing assets

## CMS/Content Ops
- [ ] Enforce required metadata fields on upload
- [ ] Add upload validation for allowed aspect ratios by variant
- [ ] Require alt text for non-decorative assets
- [ ] Record license provenance for every published asset

## QA
- [ ] Visual crop sign-off for all P0 variants
- [ ] Byte-size checks pass against targets
- [ ] Format fallback test (AVIF disabled -> WebP -> JPG)
- [ ] Mobile ordering flow remains performant with image payloads

## Go-Live Gate (DoD)
- [ ] All P0 asset families fully published with complete variant sets
- [ ] CDN URLs stable and immutable
- [ ] Frontend consuming only `published` variants
- [ ] Performance and responsive QA passed

---

## 9) Final Notes for Cycle 3 Handoff

- Keep all temporary stock clearly marked `stock_temp=true` for replacement tracking.
- Any newly created asset family must follow the locked naming and metadata schema exactly.
- `data/cycle-3/asset-manifest.md` is the source-of-truth launch manifest for execution tracking.
