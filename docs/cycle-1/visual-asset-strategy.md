# Dilshad v1 — Cycle 1 Visual Asset Strategy

## 1) Objective (Cycle 1)
Establish a fast, legally safer, premium-looking image baseline for launch while original photography is pending.

Cycle 1 priorities:
1. Cover all current menu items with coherent, appetizing imagery.
2. Add brand-supporting non-food visuals (hero, ambience, service cues).
3. Define licensing assumptions + risk controls so temporary assets can be replaced cleanly.
4. Provide frontend-ready implementation rules (sizes, formats, naming, alt text).

---

## 2) Menu/Brand Category Sourcing Matrix

| Category | Items Covered | Visual Goal | Primary Source (Cycle 1) | Secondary / Fallback | License Assumption | Risk Level | Notes |
|---|---|---|---|---|---|---|---|
| Signature Curries | Chicken Tikka Masala, Lamb Rogan Josh | Rich gravy texture, steam, garnish detail | Unsplash/Pexels editorial-style food photos | Adobe Stock/Shutterstock (paid, licensed account) | Unsplash/Pexels free commercial use, no trademark implication | Medium | Ensure dish resemblance, not exact recipe claim |
| Seafood Curry | Garlic Chilli King Prawn | High-contrast prawns, chilli/garlic visibility | Unsplash/Pexels seafood curry images | Temporary close-up ingredient shot + icon overlay | Unsplash/Pexels license terms | Medium | Hardest match; prioritize replacement by original shoot |
| Breads | Giant Naan | Scale + blistered tandoor texture | Unsplash/Pexels naan/flatbread shots | In-house neutral background naan shot | Unsplash/Pexels terms | Low-Medium | Crop for obvious “large/shareable” impression |
| Rice/Sides | Pilau Rice | Grain separation, saffron/spice cues | Unsplash/Pexels rice bowl overheads | In-house bowl macro | Unsplash/Pexels terms | Low | Easy to source acceptable substitutes |
| Starters | Onion Bhaji | Crisp texture + chutney pairing | Unsplash/Pexels fritter/pakora-style shots | In-house plated starter shot | Unsplash/Pexels terms | Medium | Label as “representative image” if not exact |
| Brand Hero | Homepage hero/banner | Premium, warm, modern South Asian dining cue | Unsplash/Pexels restaurant ambience + plated dish composite | Custom gradient/typographic hero if no suitable image | Unsplash/Pexels terms | Medium | Avoid recognizable competitors/people |
| Presence/Trust | Kitchen/process/team/location placeholders | Authenticity + local business trust | In-house originals (preferred) | Stock “hands cooking/spice prep” abstract crops | Own copyright for in-house | Low (in-house) / Medium (stock) | Prioritize replacing stock with originals in Cycle 2 |

---

## 3) Licensing Assumptions + Risk Controls

### Assumptions used in Cycle 1
- Unsplash/Pexels assets are used under their standard free-use licenses (commercial use generally allowed).
- No use of logos, watermarks, or identifiable third-party brands.
- No implication that photographed venue/person is Dilshad.

### Risks
1. **Dish mismatch risk** (image not exact product served).
2. **License interpretation drift** (terms can change by platform).
3. **Model/property release uncertainty** for identifiable people/interiors.
4. **Duplicate usage** (same common stock appears on competitor sites).

### Controls
- Maintain asset register (source URL, author, download date, license note).
- Prefer food close-ups without identifiable persons.
- Add internal flag: `stock_temp: true` for replacement backlog.
- Replace all hero + top-selling dish stock with original photos in Cycle 2.

---

## 4) Asset Gap Report + Shot List (Original Photography)

## High-priority gaps
1. **Garlic Chilli King Prawn** (most likely to feel generic with stock).
2. **Giant Naan scale shot** (needs true size context).
3. **Brand hero with real plating style** (for authenticity).
4. **Onion Bhaji texture macro** (crispness cue).

## Shot list (production-ready)

### A) Dish pack shots (all menu items)
- Angle set per dish: 45°, overhead (90°), close macro detail.
- Lighting: soft directional, warm white balance (restaurant-natural).
- Background: dark stone/wood variant + clean neutral variant.
- Framing outputs:
  - Landscape 16:9 (hero/card)
  - Square 1:1 (menu cards/social)
  - Portrait 4:5 (social/reels cover)

### B) Context shots
- “Table spread” with 3–4 dishes.
- Naan scale shot with hand/serving context.
- Rice + curry pairing composition.

### C) Brand shots
- Exterior storefront (day + evening).
- Counter/service handoff shot.
- Kitchen action details (hands only, no mandatory faces).

### D) Technical capture baseline
- Target capture: >= 4000px long edge.
- Shoot RAW + JPEG backup.
- Keep one color checker frame for batch correction.

---

## 5) Frontend/CMS Integration Guidance

## File conventions
- Folder: `/assets/images/menu/`
- Naming: `dish-{id}-{variant}-{ratio}.jpg`
  - Example: `dish-ctm-hero-16x9.jpg`, `dish-ob-card-1x1.jpg`
- Hero files: `/assets/images/brand/hero-{theme}-{ratio}.jpg`

## Suggested data model (extend MENU)
```js
{
  id: 'ctm',
  name: 'Chicken Tikka Masala',
  image: {
    src: '/assets/images/menu/dish-ctm-card-1x1.jpg',
    srcset: '/assets/images/menu/dish-ctm-card-1x1-640.jpg 640w, /assets/images/menu/dish-ctm-card-1x1-960.jpg 960w',
    alt: 'Chicken tikka masala in a copper bowl, topped with cream and coriander',
    credit: 'Photo: [Author], [Platform]',
    license: 'Unsplash License',
    stock_temp: true
  }
}
```

## Delivery/performance standards
- Preferred format order: AVIF -> WebP -> JPEG fallback.
- Max weights (target):
  - Card/thumb: <= 120 KB
  - Hero: <= 280 KB
- Use responsive sizes + lazy loading below fold.
- Use explicit width/height to prevent layout shift.

## Alt text standard
- Pattern: `"{Dish name} with {key visible characteristic}"`
- Avoid keyword stuffing.
- If decorative image only, use empty alt (`""`).

## Metadata registry (required)
Track in CMS or JSON:
- `asset_id`
- `local_path`
- `source_url`
- `creator`
- `platform`
- `license_type`
- `downloaded_at`
- `replacement_priority` (high/med/low)

---

## 6) Cycle 1 Implementation Plan (quick)
1. Approve candidate list in `data/cycle-1/image-candidates.md`.
2. Download selected assets, log metadata/licensing.
3. Generate responsive derivatives (1x/2x, AVIF/WebP/JPEG).
4. Wire `MENU` image objects into UI cards + hero section.
5. Mark temporary stock for Cycle 2 original shoot replacement.
