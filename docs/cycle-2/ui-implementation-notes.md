# Cycle 2 — UI Implementation Notes (Premium Ordering + Account UX)

Date: 2026-03-21  
Owner: Premium UI Agent

## Inputs reviewed
- `docs/cycle-1/premium-ui-spec.md`
- `docs/cycle-1/lead-feedback.md`
- `docs/cycle-1/ui-tasklist.md`

Cycle-1 lead ask was to move from broad recommendations to concrete frontend improvements. This Cycle-2 pass applies direct UX upgrades in the live prototype while preserving the existing ordering functionality (menu → basket → checkout → WhatsApp draft).

---

## Files changed
- `index.html`
- `styles.css`
- `script.js`

---

## What was implemented

## 1) Premium ordering hierarchy upgrades
1. Added **menu tools surface** (search input) above dish grid.
2. Added **sticky cart CTA** (`#stickyCart`) that appears when basket has items and shows:
   - live item count
   - live total
   - one-tap jump to checkout
3. Improved checkout confidence with:
   - clearer structure in card layout
   - persistent cost breakdown still intact
   - minor interaction polish (hover/focus states)

## 2) Account-oriented retention UX surface
Added a dedicated **Account section** (`#account`) with concrete retention components:
1. **Loyalty card** with points + progress bar.
2. **Quick reorder card** with one-click “Add Last Order to Basket”.
3. **Saved address card** with one-click “Use for Delivery” that pre-fills checkout delivery details and switches order type.

## 3) Checkout retention mechanic from lead feedback
- Added an explicit **post-checkout account intent checkbox**:
  - “Create account after checkout for faster reorder & points”
- If selected, this is included in generated WhatsApp order text as structured signal:
  - `Customer requested account setup for reorder + points.`

## 4) Validation and accessibility improvements
1. Added `aria-live="polite"` to basket updates.
2. Added accessible labels on quantity controls.
3. Added focus-visible styles for keyboard users.
4. Added invalid-field behavior on submit:
   - auto-scroll to first invalid field
   - focus the field

## 5) Visual system alignment toward premium spec
- Updated dark-surface token palette and elevated cards.
- Added subtle shadows and transitions for premium feel.
- Kept implementation lightweight and MVP-safe (no backend coupling introduced).

---

## Functionality preserved
- Existing add-to-cart / quantity updates remain functional.
- Delivery fee logic remains unchanged (`+£2.50` for delivery).
- Address required only for delivery remains functional.
- Checkout still opens WhatsApp with structured order summary.

---

## Notes on scope and trade-offs
- This pass focused on **frontend-only implementation-ready changes** to satisfy Cycle-2 lead feedback quickly.
- Reorder, loyalty, and saved address are currently prototype-level (client-side sample data), intentionally designed to be replaceable by future API/CMS integration.
- No destructive refactor done; changes are incremental and compatible with current static architecture.

---

## Suggested next implementation step (Cycle 3)
1. Wire account cards and reorder data to backend endpoints.
2. Add unavailable-item resolution in reorder flow.
3. Persist cart/account state in local storage + authenticated profile.
4. Introduce mobile fixed “Place Order” summary bar at final checkout stage.
