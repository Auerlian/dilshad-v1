# Cycle 2 Menu Quality Report

- Generated at: 2026-03-21T12:51:01.011336+00:00
- Source dataset: `data/cycle-1/menu.json`
- Items processed: **125**

## What improved in Cycle 2
- Added **normalized allergen taxonomy** aligned to UK FSA 14 allergens.
- Added **normalized ingredient taxonomy** (`dilshad_c2_v1`) using rule-based canonical tokens.
- Added **field-level provenance confidence** on every item for core and inferred fields.
- Added per-item **fallback policies** for missing image/allergen/ingredient data.

## Data quality snapshot
- Missing descriptions: **28 / 125**
- No inferred ingredients: **17 / 125**
- No inferred allergens: **62 / 125**
- Missing primary images: **125 / 125**

## Image gaps by category
- House Specialities: 20 missing
- Naan: 15 missing
- Other Sundries: 12 missing
- Vegetable Side Dishes: 11 missing
- Drinks: 10 missing
- Rice: 10 missing
- Biryani Dishes: 9 missing
- Tandoori Specialities: 8 missing
- Classic Starters: 7 missing
- Speciality Starters: 7 missing
- Tandoori Starters: 6 missing
- English Dishes: 3 missing
- Ice Cream: 3 missing
- Set Meals: 2 missing
- Balti Dishes: 1 missing
- Curry Dishes: 1 missing

## Confidence model (field-level)
- Direct API fields (name/category/price): high confidence (0.97–0.99).
- Description: high if present (0.95), 0.0 if absent.
- Inferred fields (ingredients/allergens/dietary): medium confidence when matched by rules (0.75–0.82), low when unknown (0.28–0.35).
- Image: high when explicit URL present (0.95), low if missing (0.10).

## Fallback policies (production recommendation)
1. **Images**: if item image missing, show category placeholder key (`category_generic:*`) with deterministic mapping per category.
2. **Allergens**: if no confident inference, render `unknown` and force “ask staff” disclaimer before checkout.
3. **Ingredients**: keep empty array instead of hallucinating; optionally backfill from category templates in CMS.
4. **Ambiguous proteins** (e.g., “meat”): keep broad token (beef/lamb unresolved) and mark for manual QA queue.
5. **Option-heavy base items** (Balti/Curry): treat base record as template; actual allergen profile should resolve after option selection.

## Known gaps to resolve in Cycle 3
- Ingredient lists still inferred from free text; no authoritative recipe source yet.
- Allergen precision remains limited for sauces/oils/marinades without kitchen recipe mapping.
- Product options/variants not fully expanded from WooCommerce, limiting final per-variant allergen truth.
- 100% image coverage gap remains; requires manual asset upload or scraping from alternative source pages.

## Suggested next actions
- Add CMS fields: `recipe_ingredients[]`, `allergens[]`, `may_contain[]`, `image_override`.
- Create QA workflow: low-confidence records (<0.6 on allergens or ingredients) routed to manager review.
- Expand parser to option matrix so template dishes can emit variant-specific allergen profiles.