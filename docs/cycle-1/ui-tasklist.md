# Cycle 1 UI Tasklist (Prioritized) — Dilshad Premium UX

Date: 2026-03-21

Scoring model: **P0 = critical now**, **P1 = high impact**, **P2 = nice next**  
Each task includes: objective, scope, acceptance criteria.

---

## P0 — Must Ship in Cycle 1

## 1) Establish core design tokens
**Objective:** Create consistent premium foundation across ordering/account surfaces.  
**Scope:** Color, type, spacing, radius, elevation, motion, focus styles.  
**Acceptance criteria:**
- Token file(s) created and consumed by shared UI layer.
- Dark surface + premium accent palette implemented.
- Focus ring and contrast pass on core controls.

## 2) Build sticky cart CTA pattern
**Objective:** Keep checkout intent visible while browsing.  
**Scope:** Menu and item views; sticky bottom “View Cart (n)” with subtotal.  
**Acceptance criteria:**
- CTA visible whenever cart has items.
- Count/subtotal updates in real time.
- CTA does not overlap system/browser safe areas on mobile.

## 3) Redesign item customization modal/page
**Objective:** Reduce option-selection errors and hesitation.  
**Scope:** Required/optional modifier sections, defaults, price deltas, disabled/enabled Add CTA logic.  
**Acceptance criteria:**
- Required groups clearly labeled.
- Add CTA disabled until required rules satisfied.
- Modifier selections persist when navigating back.

## 4) Cart UX overhaul
**Objective:** Make cart editable and trustworthy without friction.  
**Scope:** Editable line items, qty stepper, modifier preview, remove + undo, cost breakdown.  
**Acceptance criteria:**
- Users can edit item modifiers from cart.
- Cost lines (subtotal/fees/tax/total) are explicit.
- Undo removal available via toast for at least 5s.

## 5) Checkout step structure with inline edits
**Objective:** Improve completion via clearer progression and fewer dead ends.  
**Scope:** Address, time slot, payment, final review sections; inline validation.  
**Acceptance criteria:**
- Fixed bottom Place Order CTA on mobile with final total.
- Validation points to exact invalid field and auto-scrolls.
- Users can edit sections without losing progress.

## 6) Account home + order history utility actions
**Objective:** Turn account into repeat-purchase engine.  
**Scope:** Account dashboard, Active/Past orders tabs, reorder action.  
**Acceptance criteria:**
- Order cards include status, total, and actions (view/reorder/help).
- Reorder action handles unavailable items gracefully.
- Empty states provide clear CTA (e.g., “Start ordering”).

---

## P1 — High Impact, Follow Immediately

## 7) Saved addresses management UX
**Objective:** Reduce checkout friction and delivery errors.  
**Scope:** Address cards with labels/default/edit/delete + delivery notes.  
**Acceptance criteria:**
- Add/edit/delete flows work on mobile and desktop.
- Default address can be set in one tap.
- Destructive actions use confirmation.

## 8) Loyalty module in account + checkout context
**Objective:** Increase retention and perceived value.  
**Scope:** Points balance, progress to reward, earn/spend messaging in checkout.  
**Acceptance criteria:**
- Loyalty status visible on account home.
- Reward progress meter reflects current points accurately.
- Checkout indicates points earning/redeeming impact.

## 9) Reorder surfaces across app
**Objective:** Shorten repeat purchase path.  
**Scope:** Home reorder rail, account reorder cards, post-order “save/reorder later”.  
**Acceptance criteria:**
- Returning user sees at least one reorder entry point above the fold.
- Reorder success path requires minimal steps.
- Unavailable SKUs prompt substitute/remove decision.

## 10) Microinteraction pass for confidence
**Objective:** Add premium feel and state clarity.  
**Scope:** Add-to-cart animation, status transitions, skeleton loaders, toasts.  
**Acceptance criteria:**
- Motion durations follow token set.
- Reduced-motion preference is respected.
- No blocking spinner-only states on critical flows.

## 11) Accessibility remediation on critical paths
**Objective:** Reach WCAG AA on ordering/account essentials.  
**Scope:** Keyboard navigation, semantics, focus states, ARIA announcements, contrast fixes.  
**Acceptance criteria:**
- Keyboard-only completion possible for core journey.
- Cart/status updates announced to screen readers.
- Automated and manual checks pass for key screens.

---

## P2 — Valuable Enhancements (If Capacity Allows)

## 12) Enhanced search + filters in menu
- Dietary tags, prep-time, and price filters with clear chip states.

## 13) Preference center in account
- Dietary/spice/communication defaults reused in ordering.

## 14) Rich order tracking timeline
- Visual progress with ETA confidence and support entry points.

## 15) UI polish system
- Icon unification, empty-state illustration set, refined hover/press states.

---

## Suggested Execution Sequence (Engineering + Design)

1. Tokens + shared primitives (P0.1)
2. Ordering core: item modal → cart → sticky CTA → checkout (P0.2–P0.5)
3. Account core: dashboard + order history + reorder (P0.6)
4. Address + loyalty + motion/accessibility hardening (P1)
5. Capacity-based enhancements (P2)

---

## Definition of Done (Cycle 1 UX)

- All P0 tasks complete and QA-approved.
- At least 3 P1 tasks complete (including accessibility task #11).
- Visual/interaction consistency validated against token system.
- Baseline metrics instrumentation active for conversion, reorder, and task success.
