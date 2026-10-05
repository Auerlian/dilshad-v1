# Dilshad Premium UI/UX Spec — Cycle 1 (Ordering + Accounts)

Date: 2026-03-21  
Owner: Dilshad Premium UI/UX Agent  
Scope: Ordering flow + account area uplift to premium quality

---

## 1) Goals & North-Star Experience

### Product goals (Cycle 1)
1. Increase completed orders by reducing friction in browse → cart → checkout.
2. Increase repeat purchases via fast reorder and saved preferences.
3. Make account area useful (not administrative): status, history, loyalty, addresses, payment confidence.
4. Establish premium visual system with consistent motion, spacing, and interactions.

### UX principles
- **Fast to first item**: menu discovery in ≤2 taps from landing.
- **Confidence at every step**: clear pricing, availability, ETA, and editable choices.
- **Low cognitive load**: progressive disclosure for modifiers/options.
- **One-hand mobile usability**: thumb-reachable primary actions.
- **Continuity**: cart/session persists across auth and device transitions where possible.

---

## 2) Benchmark-Inspired Premium Patterns (Actionable)

> Web search tool unavailable in this environment (missing API key), so this benchmark uses known patterns from leading restaurant/ecommerce products and modern UX conventions.

### A. Ordering patterns seen in top food/ecommerce products
1. **Sticky contextual cart CTA**
   - Pattern: persistent “View Cart (n)” at bottom; updates price live.
   - Why it works: keeps checkout affordance always reachable.
   - Apply: global sticky cart bar on menu and item-detail screens.

2. **Quick-add + deep customize**
   - Pattern: tap once to add defaults; optional “Customize”.
   - Why it works: supports both speed and control.
   - Apply: category cards support quick-add, item modal handles modifiers.

3. **Smart modifier groups**
   - Pattern: required vs optional sections, min/max constraints, defaults preselected.
   - Why it works: prevents errors and accelerates completion.
   - Apply: explicit “Required” labels; disabled primary CTA until required choices made.

4. **Reorder shortcuts**
   - Pattern: “Buy Again” in home/account/history.
   - Why it works: repeat customers convert fastest via memory-based actions.
   - Apply: one-tap reorder with diff handling for unavailable items.

5. **Transparent checkout summary**
   - Pattern: line-item cost breakdown and editable slots (address/time/tip/payment).
   - Why it works: trust + fewer abandonment surprises.
   - Apply: collapsible sections with inline edit; final total always visible.

6. **Progressive identity capture**
   - Pattern: guest checkout first, sign-in after value moment.
   - Why it works: reduces early friction.
   - Apply: account creation prompted post-purchase or during payment save.

### B. Account area premium patterns
1. **Order history as a utility surface**
   - Status chips, receipt download, track, reorder.
2. **Saved addresses with delivery metadata**
   - Labels (Home/Work), delivery notes, default markers.
3. **Loyalty visibility**
   - Points balance + “next reward in X” progress meter.
4. **Payment confidence UI**
   - Card brand + last4 + expiry + “default” + secure copy.
5. **Preference center**
   - Dietary, spice level, comms preferences, order defaults.

---

## 3) End-to-End Ordering UX (Cycle 1)

## 3.1 Information architecture
- **Primary nav (mobile)**: Home, Menu, Orders, Account.
- **Menu IA**:
  - Category rail (sticky horizontal)
  - Item list with badges (Popular, New, Spicy, Veg)
  - Search + filters (dietary, price, prep time)

## 3.2 Core flow
1. **Landing/Home**
   - Hero with primary intent: “Order now”
   - Reorder module (if returning)
   - Featured bundles/upsells
2. **Menu browsing**
   - Quick-add on cards
   - Tap card for detail modal/page
3. **Item customization**
   - Required groups first
   - Price deltas shown per option
   - Quantity stepper + add CTA with computed price
4. **Cart**
   - Editable line items, notes, remove/undo
   - Suggested add-ons (contextual, max 2–3)
   - Promo code + loyalty earn/spend visibility
5. **Checkout**
   - Address → Time slot → Payment → Review
   - Inline validation, no full-page dead-end errors
   - Place order CTA fixed bottom on mobile
6. **Confirmation**
   - Receipt summary + ETA + tracking state
   - Immediate actions: “Track order”, “Reorder later”, “Save as favorite order”

## 3.3 Friction removals
- Persist cart across auth prompts.
- Auto-scroll to first invalid input with clear message.
- Preserve modifier state when navigating back.
- Use skeleton loading instead of spinner-only waits.

---

## 4) Account Experience (Cycle 1)

## 4.1 Account home
- Greeting + loyalty status card
- Quick actions: Reorder, Track current order, Manage addresses, Payment methods
- Recent orders list (3 latest) with CTA: View all

## 4.2 Orders
- Tabs: Active | Past
- Past order card includes:
  - Date/time, item count, total
  - Status chip
  - Actions: View details, Reorder, Help

## 4.3 Addresses
- Address cards with:
  - Label, concise formatted address
  - Delivery instructions preview
  - Default badge
  - Edit/Delete (confirm destructive action)

## 4.4 Loyalty
- Current points and tier
- Progress to next reward
- Available rewards and redeem flow entry

## 4.5 Settings & trust
- Profile, communication preferences, security, privacy links
- Payment tokens only (never display sensitive payment details)

---

## 5) Design System: Premium Tokens (Cycle 1)

> Token names are implementation-friendly and platform-neutral.

## 5.1 Color tokens
```txt
color.bg.base = #0F1115
color.bg.surface = #151922
color.bg.elevated = #1B2130
color.text.primary = #F5F7FB
color.text.secondary = #B6BFCE
color.text.muted = #8E98AA
color.brand.primary = #D4AF37   // premium gold accent
color.brand.primaryHover = #E0BE4A
color.brand.secondary = #5B8CFF
color.success = #2FBF71
color.warning = #F2A93B
color.error = #E25555
color.border.subtle = #2A3243
color.focus.ring = #7CA6FF
```

Accessibility guidance:
- Maintain WCAG AA contrast for text and controls.
- Avoid gold-on-light combinations for essential text.

## 5.2 Typography tokens
```txt
font.family.base = Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif
font.family.display = "Plus Jakarta Sans", Inter, system-ui, sans-serif
font.size.xs = 12
font.size.sm = 14
font.size.md = 16
font.size.lg = 18
font.size.xl = 22
font.size.2xl = 28
font.weight.regular = 400
font.weight.medium = 500
font.weight.semibold = 600
font.weight.bold = 700
line.height.tight = 1.2
line.height.base = 1.45
line.height.relaxed = 1.6
```

## 5.3 Spacing, radius, elevation
```txt
space.1 = 4
space.2 = 8
space.3 = 12
space.4 = 16
space.5 = 20
space.6 = 24
space.8 = 32
radius.sm = 8
radius.md = 12
radius.lg = 16
radius.xl = 20
shadow.sm = 0 2px 8px rgba(0,0,0,0.18)
shadow.md = 0 6px 20px rgba(0,0,0,0.24)
shadow.lg = 0 12px 32px rgba(0,0,0,0.3)
```

## 5.4 Interaction tokens
```txt
motion.duration.fast = 120ms
motion.duration.base = 180ms
motion.duration.slow = 260ms
motion.easing.standard = cubic-bezier(0.2, 0, 0, 1)
motion.easing.emphasized = cubic-bezier(0.2, 0.8, 0.2, 1)
focus.ring.width = 2px
focus.ring.offset = 2px
```

---

## 6) Component Guidance (Ordering + Accounts)

1. **Item Card**
   - Image, name, short descriptor, price-from, badges, quick-add button.
2. **Modifier Group**
   - Header + required indicator + helper text + option list with price deltas.
3. **Cart Line Item**
   - Item summary + selected modifiers + qty stepper + edit/remove.
4. **Sticky Checkout Bar**
   - Left: subtotal/ETA, Right: primary CTA.
5. **Order Status Timeline**
   - Confirmed → Preparing → Out for delivery/Pickup ready → Completed.
6. **Reorder Card**
   - Last ordered date, key items, one-tap reorder, unavailable-item resolution.
7. **Address Card**
   - Label, compact address, default badge, edit action.
8. **Loyalty Progress Card**
   - Points + progress bar + reward CTA.
9. **Empty State Block**
   - Icon/illustration, concise copy, single CTA.
10. **Toast/Inline Alert**
   - Success/error states; include recovery action when possible.

---

## 7) Motion & Microinteraction Guidance

- Use motion to **confirm action** and **maintain spatial continuity**, not decoration.
- Key animations:
  - Add-to-cart: subtle fly-to-cart or badge increment pulse (120–180ms).
  - Modal enter/exit: fade + slight scale (95%→100%).
  - Section expand/collapse in checkout: height + opacity transitions.
- Respect reduced-motion preference:
  - Disable transform-heavy animations; keep opacity-only.
- Haptics on mobile (if available):
  - Light success haptic on add-to-cart and order placement.

---

## 8) Responsive & Accessibility Rules

## 8.1 Responsive
- Mobile-first breakpoints:
  - sm: 360+
  - md: 768+
  - lg: 1024+
- Sticky bottom CTA on mobile; right-side summary rail on desktop checkout.
- Touch targets min 44x44px.

## 8.2 Accessibility
- Semantic headings and landmarks for account/order sections.
- Keyboard operable modals, drawers, quantity steppers.
- Visible focus states on all interactive elements.
- ARIA live region for cart updates and order status changes.
- Error messages linked to field via aria-describedby.

---

## 9) Cycle 1 Success Metrics (UX)

- Checkout completion rate: +10–15% target uplift.
- Time-to-add-first-item: reduce by 20%.
- Reorder usage share: +25% among returning users.
- Address/payment update task success: >95% without support.
- Accessibility: WCAG AA pass on critical ordering/account paths.

---

## 10) Out of Scope (Cycle 1)

- Full visual rebrand beyond tokenized foundation.
- Complex personalization engines/ML recommendations.
- Multi-country tax/payment edge-case expansion.

