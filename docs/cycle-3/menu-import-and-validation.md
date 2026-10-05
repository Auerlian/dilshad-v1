# Cycle 3 Menu Import Bundle & Validation Spec

- Generated: 2026-03-21T12:55:13Z
- Inputs: `data/cycle-2/menu.json`, `data/cycle-2/menu.csv`, `docs/cycle-2/lead-feedback.md`
- Outputs: `data/cycle-3/menu.json`, `data/cycle-3/menu.csv`

## 1) Delivery Summary
- Total records: **125** (upsert-ready).
- Canonical import schema: `dilshad_menu_import_v1`.
- Deterministic upsert key: `dilshad:{item_id}`.
- Validation hints embedded per item for allergen/ingredient/image QA routing.
- Image coverage scoring included at category level and mapped into each record.

## 2) Canonical Import Fields (v1)
Required: `item_id`, `item_slug`, `item_name`, `category`, `price`, `currency`, `product_url`, `is_in_stock`, `is_purchasable`.
Optional but recommended: normalized ingredients/allergens, dietary flags, description, image URLs, fallback policy, confidence scores.

## 3) Import Build Order (Executable)
1. Load `menu.json` and validate envelope metadata (`schema_version`, `cycle`, totals).
2. Validate required fields + uniqueness on `item_id`, `item_slug`, `product_url`.
3. Upsert records using `upsert_key` in idempotent mode.
4. Route low-confidence rows (`confidence_allergens < 0.6` or `confidence_ingredients < 0.6`) to manual QA queue.
5. Route `image_status != real` rows to image upload backlog.
6. Publish records after QA sign-off for flagged rows.

## 4) Validation Script Spec
Validation should fail hard on schema and uniqueness errors, and soft-warn on quality risks.

### Hard validations (block import)
- JSON parses and top-level fields exist: `restaurant`, `cycle`, `schema_version`, `items`.
- `schema_version == dilshad_menu_import_v1`.
- `total_items == len(items)`.
- Required per-row fields are present and non-empty (except booleans).
- `price` is numeric and `>= 0`.
- `currency` is `GBP`.
- Uniqueness checks pass for `item_id`, `item_slug`, `product_url`.

### Soft validations (warn + route)
- Missing description.
- Empty `ingredients_normalized` or `allergens_normalized`.
- `confidence_allergens < 0.6` or `confidence_ingredients < 0.6`.
- `image_status` is `fallback_only` or `missing`.
- Option-heavy templates (`has_options=true`) need variant expansion before allergen-final checkout truth.

## 5) Image Coverage Scoring by Category
Score formula: `image_coverage_score = (real_coverage * 0.85 + fallback_coverage * 0.15) * 100`

| Category | Items | Real % | Fallback % | Score | Status |
|---|---:|---:|---:|---:|---|
| House Specialities | 20 | 0.0 | 100.0 | 15.0 | critical |
| Naan | 15 | 0.0 | 100.0 | 15.0 | critical |
| Other Sundries | 12 | 0.0 | 100.0 | 15.0 | critical |
| Vegetable Side Dishes | 11 | 0.0 | 100.0 | 15.0 | critical |
| Drinks | 10 | 0.0 | 100.0 | 15.0 | critical |
| Rice | 10 | 0.0 | 100.0 | 15.0 | critical |
| Biryani Dishes | 9 | 0.0 | 100.0 | 15.0 | critical |
| Tandoori Specialities | 8 | 0.0 | 100.0 | 15.0 | critical |
| Classic Starters | 7 | 0.0 | 100.0 | 15.0 | critical |
| Speciality Starters | 7 | 0.0 | 100.0 | 15.0 | critical |
| Tandoori Starters | 6 | 0.0 | 100.0 | 15.0 | critical |
| English Dishes | 3 | 0.0 | 100.0 | 15.0 | critical |
| Ice Cream | 3 | 0.0 | 100.0 | 15.0 | critical |
| Set Meals | 2 | 0.0 | 100.0 | 15.0 | critical |
| Balti Dishes | 1 | 0.0 | 100.0 | 15.0 | critical |
| Curry Dishes | 1 | 0.0 | 100.0 | 15.0 | critical |

### Image coverage interpretation
- `ready`: score >= 80 (mostly real imagery).
- `at_risk`: score 40-79 (partial real imagery).
- `critical`: score < 40 (placeholder-dependent or missing).
- Current critical categories: **16 / 16** (all categories require real-image backfill for launch).

## 6) Operational Notes for Go-Live
- Keep placeholder keys deterministic (`category_generic:*`) to avoid broken cards during rollout.
- Do not expose inferred allergens as final legal truth without kitchen confirmation.
- Complete image backfill before paid acquisition campaigns to protect conversion rate.
