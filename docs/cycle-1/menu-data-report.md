# Dilshad Menu Data Report — Cycle 1

- Source: https://dilshadrestau.com (WooCommerce Store API + linked product pages)
- Extracted items: **125**

## Coverage
- Categories discovered: **16**
  - House Specialities: 20
  - Naan: 15
  - Other Sundries: 12
  - Vegetable Side Dishes: 11
  - Drinks: 10
  - Rice: 10
  - Biryani Dishes: 9
  - Tandoori Specialities: 8
  - Classic Starters: 7
  - Speciality Starters: 7
  - Tandoori Starters: 6
  - English Dishes: 3
  - Ice Cream: 3
  - Set Meals: 2
  - Balti Dishes: 1
  - Curry Dishes: 1

## Data Quality Summary
- Missing price: **0** (0.0%)
- Missing description: **28** (22.4%)
- Missing primary image: **125** (100.0%)
- Missing category: **0** (0.0%)
- Missing ingredients note: **125** (100.0%)
- Missing allergens note: **103** (82.4%)

## Duplicates / Inconsistencies
- Potential duplicate names (case-insensitive):
  - chicken tikka (2 entries)
  - king prawn kebab (2 entries)
  - lamb tikka (2 entries)
  - pathia puri (2 entries)
  - salmon tikka (2 entries)

## Notes
- Ingredients/allergens are rarely provided explicitly in the source. Fields are mostly null unless keyword-based notes were detected in descriptions.
- Many products have no image attached in the API payload; image coverage is partial.
- Variants/add-ons are represented via WooCommerce `has_options`, `attributes`, and `variations`. Most products are simple with no option structures exposed.
- Product slugs include legacy duplicates with numeric suffixes (e.g., `-2`, `-3`), likely from catalog revisions.