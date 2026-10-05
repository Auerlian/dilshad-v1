# Dilshad v1 — Cycle 2 PM Delivery Plan (Implementation-Ready)

Date: 2026-03-21  
Owner: PM (Cycle 2)  
Inputs used: Cycle-1 PRD/backlog/backend/CMS/UI/menu report + lead feedback

---

## 1) Cycle 2 objective and constraints

### Objective
Deliver an MVP in **<= 4 weeks** that is shippable for pilot location(s), with a tight integration between frontend ordering flow and backend/CMS, and explicit retention mechanics in core flow.

### Hard constraints
- MVP-first only (defer non-essential scope).
- One canonical domain model and naming standard across FE/BE/CMS/analytics.
- Every committed feature includes: states, validations, edge cases, measurable acceptance criteria.
- Include post-checkout account creation prompt, reorder CTA, points earn/redeem surfaces.

---

## 2) Canonical domain model + naming standard (single source of truth)

Use these terms everywhere (API schema, DB labels, UI copy keys, event names):

### 2.1 Core entities
1. **Location**
2. **MenuCategory**
3. **MenuItem**
4. **ModifierGroup**
5. **ModifierOption**
6. **Cart** / **CartItem**
7. **Order** / **OrderItem**
8. **Payment**
9. **Fulfillment** (delivery or pickup)
10. **CustomerAccount**
11. **LoyaltyAccount**
12. **PointsLedgerEntry**
13. **Reward**
14. **Promotion** / **Coupon**
15. **CmsPage** / **CmsBanner** / **MediaAsset**
16. **AuditEvent**

### 2.2 Status enums (canonical)
- `orderStatus`: `placed | confirmed | preparing | ready | out_for_delivery | completed | cancelled | rejected`
- `paymentStatus`: `unpaid | paid | failed | refunded`
- `rewardStatus`: `active | paused | expired`
- `cmsPublishStatus`: `draft | published`

### 2.3 Naming conventions
- API paths: plural nouns (`/v1/orders`, `/v1/admin/menu-items`).
- IDs: UUIDs in backend; UI references by `id`, public reference via `orderNo`.
- Event names: `<entity>.<action>` lowercase dot format (`order.created`, `loyalty.points_awarded`).
- Analytics events: snake_case (`checkout_started`, `checkout_completed`).

---

## 3) MVP scope cut (4-week deliverable)

## 3.1 IN for MVP
1. Location selection + serviceability guard.
2. Menu browse/search + item customization + cart.
3. Checkout with price transparency + payment handoff.
4. Order confirmation + status tracking.
5. CMS/admin for menu/content/orders (minimum role matrix).
6. Loyalty earn/redeem v1 in checkout and account.
7. Retention surfaces:
   - Post-checkout account creation prompt.
   - Reorder CTA in confirmation + account history.
   - Points earned/redeemed visibility in checkout + confirmation.
8. Core analytics funnel + KPI dashboard v1.

## 3.2 OUT (deferred)
- Quiz builder/recommendation flow.
- Referral program.
- Advanced A/B testing framework.
- Scheduled availability windows and advanced campaign scheduler.

---

## 4) Implementation-ready sprint plan (4 weeks)

## Team assumptions
- 2 FE engineers, 2 BE engineers, 1 full-stack/CMS engineer, 1 QA (shared), 1 designer (shared), 1 PM.
- Weekly releases to staging; production pilot at end of Week 4.

## Sprint 1 (Week 1): Foundation + integration contracts

### Goals
- Lock contracts and unblock parallel FE/BE work.
- Build end-to-end “thin slice” for browse -> cart -> quote.

### Work packages
1. **Canonical schema & API contract freeze (P0)**
   - OpenAPI draft for MVP endpoints.
   - Shared enums/status constants package.
2. **Menu + location read APIs (P0)**
   - `/locations`, `/locations/:id/menu`, `/products/:slug`.
3. **Cart + quote backend (P0)**
   - `/orders/quote` with tax/fee/promo validation placeholders.
4. **Frontend ordering shell (P0)**
   - Menu list, item modal with required modifier validation, sticky cart CTA.
5. **CMS menu CRUD baseline (P0)**
   - Categories/items/modifier groups/options + publish toggle.
6. **Analytics taxonomy implementation v1 (P0)**
   - Critical events instrumented for browse/cart/checkout start.

### Explicit feature states, validations, edge cases
- Item customization state: `idle -> selecting -> valid -> added`.
- Validation: required modifier groups must satisfy min/max.
- Edge cases:
  - Item becomes unavailable before add.
  - Price delta mismatch between FE cache and backend quote.

### Acceptance criteria (measurable)
- 100% of required checkout-contract endpoints available in staging with API docs.
- Quote response p95 <= 600ms on staging dataset.
- FE blocks add-to-cart until required modifiers valid.
- CMS publish updates are visible via public menu API within <= 2 minutes.

---

## Sprint 2 (Week 2): Checkout, order creation, and operations loop

### Goals
- Complete transactional path: cart -> checkout -> order placed.
- Enable operations team to process orders in CMS.

### Work packages
1. **Checkout backend + payment handoff (P0)**
   - `/orders` idempotent create with payment token handling.
2. **Checkout UI completion (P0)**
   - Address, fulfillment mode, slot, payment, review; inline edit/validation.
3. **Order tracking endpoints + timeline (P0)**
   - `/orders/:orderNo` and status timeline rendering.
4. **CMS order operations (P0)**
   - Order list/detail + allowed status transitions + cancellation reason capture.
5. **Audit + RBAC baseline (P0)**
   - Owner/Manager/Staff/Support minimum role permissions.
6. **Notifications plumbing (P1 within MVP)**
   - Confirmation webhook event emitted (`order.created`).

### Explicit feature states, validations, edge cases
- Checkout state: `draft -> validating -> payment_pending -> placed | failed`.
- Validation:
  - Serviceability must pass for delivery addresses.
  - Coupon validity window/usage caps enforced server-side.
- Edge cases:
  - Double-click place order (idempotency key required).
  - Payment success callback delayed/out-of-order.
  - Closed location selected mid-checkout.

### Acceptance criteria
- Checkout completion success (technical) >= 98% in staging test suite.
- Duplicate submit creates max one order for same idempotency key.
- Invalid transition attempts return deterministic 4xx and are audit logged.
- Customer sees order status updates in <= 10 seconds after staff action.

---

## Sprint 3 (Week 3): Retention + loyalty in core flow

### Goals
- Add retention mechanics required by lead feedback directly in user journey.

### Work packages
1. **Loyalty earn/redeem v1 (P0)**
   - Points award on completed paid orders (exactly once).
   - Redeem eligible reward in checkout with stacking rules.
2. **Post-checkout account creation prompt (P0)**
   - Guest user prompt on confirmation; claim order history + points.
3. **Reorder surfaces (P0)**
   - Confirmation “Reorder later” CTA + account order history reorder CTA.
4. **Account essentials (P0)**
   - Signup/login/reset + saved addresses + order history summary.
5. **KPI dashboard v1 (P0)**
   - CVR, AOV, checkout completion, repeat proxy, reorder usage.
6. **Menu data quality guardrails (P1 but included)**
   - Missing image fallback per category; allergen required-field policy for flagged items.

### Explicit feature states, validations, edge cases
- Loyalty award state: `pending -> awarded | reversed`.
- Validation:
  - Reward redemption cannot combine with incompatible promo.
  - Account-claim flow requires ownership proof (email/phone OTP link).
- Edge cases:
  - Guest places order without email; delayed account claim.
  - Reorder contains unavailable/changed-price items.
  - Partial refund handling for points reversal.

### Acceptance criteria
- 0 duplicate points awards in integration tests.
- >= 90% of eligible completed orders generate points ledger entry within 2 minutes (remaining via retry job).
- Post-checkout account prompt shown to 100% eligible guest checkouts.
- Reorder flow resolves unavailable items via substitute/remove modal before cart submit.

---

## Sprint 4 (Week 4): Hardening, UAT, pilot release

### Goals
- Production readiness and pilot launch with controlled rollout.

### Work packages
1. **Performance/security/accessibility gates (P0)**
   - Core read API p95 <= 500ms target.
   - Auth/checkout rate limiting + vuln remediation.
   - Keyboard + screen-reader checks on order critical path.
2. **Observability + incident runbook (P0)**
   - Order failure alerts, payment anomaly alerts, webhook retries dashboard.
3. **Data QA + content freeze checklist (P0)**
   - Top 30 selling items have image, description, allergen completeness.
4. **UAT + training (P0)**
   - Manager/staff scripts for CMS orders/menu updates.
5. **Pilot release plan execution (P0)**
   - Single location soft launch 3 days, then all enabled pilot locations.

### Acceptance criteria
- No open Sev-1/Sev-2 defects at go-live decision.
- End-to-end test pack pass >= 95% on release candidate.
- Production rollback playbook tested successfully once in staging.
- KPI dashboard live with <= 30 min freshness.

---

## 5) Dependency map (build order + critical path)

## 5.1 Critical path
1. Canonical schema + API contracts
2. Menu/location APIs + quote engine
3. Checkout + payment + idempotent order creation
4. CMS order operations + status updates
5. Loyalty ledger + redemption rules
6. Retention surfaces (post-checkout account prompt, reorder CTA)
7. KPI instrumentation + release gates

## 5.2 Dependency table

| Workstream | Depends on | Blocks | Owner |
|---|---|---|---|
| API contract freeze | PM + BE alignment | FE integration, QA test design | PM/BE |
| Menu/Catalog API | DB schema + CMS publish model | Menu UI, quote validation | BE |
| Quote/Pricing engine | Catalog API + tax/settings | Checkout totals, promo validation | BE |
| Checkout UI | Quote API + payment token endpoint | Order creation conversion | FE |
| Order create/idempotency | Checkout UI + payment adapter | Operations dashboard, confirmation | BE |
| CMS order ops | Order state machine + RBAC | Live status tracking | Full-stack |
| Loyalty ledger | Completed order event + payment status | Earn/redeem UI, KPIs | BE |
| Reorder flow | Order history API + catalog availability | Repeat rate uplift | FE/BE |
| Analytics dashboards | Event taxonomy + warehouse pipeline | Go-live KPI monitoring | Data/BE |
| Release readiness | QA automation + observability | Production launch | QA/SRE/PM |

## 5.3 External dependencies
- Payment provider credentials + webhook reliability.
- SMS/email provider for confirmations/reset/account claim.
- Maps/postcode service for delivery serviceability.

Mitigation: secure all sandbox credentials in Week 1, run fallback manual ops process for provider outages.

---

## 6) Release plan (MVP <= 4 weeks)

## 6.1 Environments and release cadence
- Daily deploys to dev.
- Twice-weekly staging releases (Tue/Fri).
- Production: Week 4 soft launch + controlled ramp.

## 6.2 Go/no-go checklist
1. Funnel events verified: view_menu, add_to_cart, checkout_started, checkout_completed.
2. Checkout technical success >= 98% in smoke + synthetic checks.
3. RBAC and audit logs verified on admin mutations.
4. Loyalty earn/redeem reconciliation report passes.
5. Top conversion pages meet CWV threshold trend (no severe regression).

## 6.3 Rollout phases
- **Phase R1 (Day 1-3):** Pilot single location, 20% traffic gate.
- **Phase R2 (Day 4-5):** 100% pilot location + monitor repeat/reorder usage.
- **Phase R3 (Day 6+):** Enable additional locations with same checklist.

## 6.4 Rollback criteria
Trigger rollback if any:
- Checkout technical success < 95% over 30 min.
- Payment failure rate > 5% without provider incident explanation.
- Order creation latency p95 > 2s sustained 30 min.
- Data integrity issue (duplicate orders/points) detected.

Rollback action: route order entry to previous stable version; disable loyalty redemption if ledger inconsistency suspected.

---

## 7) Feature-level implementation cards (ready for Jira)

## Card F1 — Item customization validation
- States: `unconfigured`, `invalid`, `valid`, `submitting`, `added`.
- Rules: required groups enforced; min/max option count; price delta preview required.
- Telemetry: `item_customize_opened`, `item_customize_error`, `item_added`.
- AC: 0 invalid configurations can be submitted from UI or API.

## Card F2 — Checkout place-order
- States: `draft`, `validating`, `payment_pending`, `placed`, `failed`.
- Rules: serviceability pass, slot valid, payment token present.
- Edge: retry after network drop should not duplicate orders.
- AC: idempotent behavior proven via automated test.

## Card F3 — Loyalty redemption
- States: `eligible`, `applied`, `rejected_conflict`, `redeemed`.
- Rules: incompatible promo stacking denied with reason code.
- AC: ledger update atomic with order transaction.

## Card F4 — Post-checkout account claim
- States: `eligible_guest`, `prompted`, `claimed`, `dismissed`.
- Rules: one-click claim link expires in 30 min; resend allowed rate-limited.
- AC: claimed account can view historical order and points.

## Card F5 — Reorder with unavailable items
- States: `ready`, `requires_resolution`, `resolved`, `added_to_cart`.
- Rules: removed or substituted items must be explicit user choice.
- AC: reorder success rate and failure reasons logged.

---

## 8) RAID (top risks)

1. **Menu data quality gaps (images/allergens/descriptions)**
   - Impact: conversion trust and legal risk.
   - Action: fallback imagery + publish validation + high-priority content QA in Week 4.
2. **Payment/webhook instability**
   - Impact: order state mismatch.
   - Action: idempotency + retry queue + manual reconciliation view.
3. **Scope creep beyond 4 weeks**
   - Impact: missed MVP deadline.
   - Action: strict in/out list; PM change control for any new scope.
4. **Cross-team naming drift**
   - Impact: integration bugs and analytics inconsistency.
   - Action: enforce canonical glossary in PR template and API linter.

---

## 9) Definition of Done (Cycle 2 MVP)

MVP is done when all are true:
1. Customer can browse, customize, checkout, track, and reorder.
2. Guest receives post-checkout account creation prompt and can claim order/points.
3. Loyalty earn/redeem works with deterministic conflict rules.
4. CMS staff can maintain menu/content and process orders with RBAC/audit.
5. KPI dashboard tracks CVR, AOV, checkout completion, repeat proxy, reorder interval proxy.
6. Pilot release completed with no unresolved Sev-1/Sev-2 issues.
