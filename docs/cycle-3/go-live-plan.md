# Dilshad v1 — Cycle 3 Final Go-Live Execution Plan

Date: 2026-03-21  
Owner: PM (Cycle 3 Finalization)  
Inputs: all `docs/cycle-2/*` outputs + `docs/cycle-2/lead-feedback.md`

---

## 1) Executive Summary

Cycle 3 objective is to convert Cycle 2 implementation planning into an **executable go-live program** with locked ownership, delivery sequence, risk controls, and module-level Definition of Done.

This plan assumes a **6-week execution window**:
- **Weeks 1–4:** build + integration + hardening
- **Week 5:** controlled pilot go-live + ramp
- **Week 6:** hypercare + stabilization + sign-off

This expands Cycle 2’s 4-week MVP path by adding explicit migration, runbooks, launch controls, and post-launch reliability safeguards required by lead feedback.

---

## 2) Locked Build Order (Critical Path)

1. Canonical schema + ID strategy freeze across Menu/Orders/Loyalty/CMS/Analytics  
2. Data migration + import validation from scraped datasets into CMS  
3. Backend contracts + migrations + RBAC enforcement  
4. FE premium UX mapped to real API states (menu/cart/checkout/account/reorder)  
5. Visual production assets + CDN/transformation + fallback policy  
6. Operational runbooks (open/close, out-of-stock, incident response)  
7. UAT, pilot rollout, hypercare, and release sign-off

No downstream module can be marked “Done” without dependencies above being complete.

---

## 3) Team & Owner Map

- **PM (Cycle 3):** program governance, scope control, RAID, go/no-go decision
- **Backend Lead:** API contracts, DB migrations, idempotency, loyalty ledger integrity
- **CMS/Full-stack Lead:** admin workflows, RBAC machine-readable matrix, import tooling
- **Frontend Lead:** premium order flow, account/reorder surfaces, accessibility/performance
- **Visual/Brand Lead:** production-ready asset manifest, naming, responsive sets, QA
- **Data/Analytics Owner:** KPI pipeline, event quality, launch dashboard reliability
- **QA Lead:** test strategy, regression pack, UAT orchestration, defect gating
- **Ops/Store Manager:** runbook validation, operational readiness, pilot staffing

---

## 4) Week-by-Week Execution Schedule

## Week 1 — Foundation Lock + Migration Readiness

### Outcomes
- Canonical data model and IDs frozen
- Migration/import strategy validated on staging sample
- API and event taxonomy versioned and published

### Module deliverables
- **PM:** finalize integrated scope, dependency board, and change-control rules
- **Backend/CMS:**
  - v1 migration set drafted (`locations`, `catalog`, `orders`, `loyalty`, `audit`)
  - OpenAPI contract v1 published for public + admin endpoints
  - RBAC permission keys aligned to Cycle 2 matrix
- **Menu Intelligence:**
  - import bundles generated from `data/cycle-2/menu.*`
  - validation spec for missing images/allergens/ingredients
  - image coverage score by category delivered
- **Data:** event dictionary v1 with required fields and reason codes

### Exit criteria
- Contract freeze approved by PM + FE + BE + CMS
- Staging import dry-run completes with error report and remediation list
- No unresolved schema naming conflicts

---

## Week 2 — Core Commerce Integration (Browse → Checkout)

### Outcomes
- End-to-end transactional flow functional on staging
- CMS menu publish path connected to frontend menu APIs

### Module deliverables
- **Backend:**
  - `/locations`, `/locations/{id}/menu`, `/orders/quote`, `/orders` live in staging
  - idempotency key enforcement on order placement
  - order/payment state machine guards active
- **Frontend:**
  - premium menu cards, item customization validation, sticky cart, checkout validation states
  - realtime order tracking polling path active
- **CMS:**
  - categories/products/options CRUD + publish toggle + availability updates
  - audit logging for all admin writes
- **QA:** integration suite for quote/order/status transitions

### Exit criteria
- Browse→quote→place order succeeds at >=98% in automated staging tests
- Duplicate submit test proves single order creation
- CMS publish reflected in public API within SLA (<=2 min)

---

## Week 3 — Loyalty, Account, Reorder, and Operational Runbooks

### Outcomes
- Retention mechanics are fully embedded in core flow
- Store operations can run service safely with documented procedures

### Module deliverables
- **Backend:**
  - loyalty award/redeem logic with exactly-once ledger behavior
  - guest conversion endpoint + reorder APIs with unavailable-item resolution contract
- **Frontend:**
  - post-checkout account prompt wired to backend
  - reorder CTA in confirmation and account history with resolution modal for unavailable items
  - points visibility in checkout + confirmation
- **Ops/PM/CMS:**
  - runbooks published: open/close, out-of-stock, incident handling, payment mismatch reconciliation
  - role-based SOPs for Owner/Manager/Staff/Support
- **Data:** retention dashboards (prompt CTR, reorder usage, loyalty coverage)

### Exit criteria
- 0 duplicate points awards in test suite
- 100% eligible guest checkouts see account prompt
- Runbook tabletop drill completed with Ops sign-off

---

## Week 4 — Visual Production, Hardening, and UAT Readiness

### Outcomes
- P0 visuals productionized with CDN strategy
- Non-functional quality gates passed for release candidate

### Module deliverables
- **Visual/Brand + FE/CMS:**
  - final asset manifest (hero, top sellers, category covers, trust cues)
  - naming conventions + responsive variants + metadata/licensing in CMS
  - CDN/transformation rules implemented (AVIF/WebP/JPG fallback, size budgets)
- **Backend/Platform:**
  - observability and alerting for checkout/payment/order lifecycle
  - retry/dead-letter setup for webhooks/events
  - security/perf checks (rate limits, auth, vulnerability fixes)
- **QA:**
  - full regression + accessibility + mobile checkout usability
  - release candidate certification report

### Exit criteria
- No open Sev-1/Sev-2 defects
- E2E suite pass >=95%
- Core API p95 + checkout latency within agreed thresholds

---

## Week 5 — Pilot Go-Live + Controlled Ramp

### Outcomes
- Production pilot launched safely with fast rollback options
- KPI and guardrail monitoring actively managed

### Rollout
- **Day 1–2:** 20% traffic at single pilot location
- **Day 3–4:** 100% pilot location (if guardrails green)
- **Day 5:** optional second location enablement

### Controls
- Live war-room schedule (PM, FE, BE, QA, Ops)
- 2-hourly review of checkout, payment, cancellation, and support signals
- Pre-approved rollback triggers and owner on-call list

### Exit criteria
- Guardrails remain within thresholds for 48h at full pilot load
- No unresolved data-integrity incidents

---

## Week 6 — Hypercare, Stabilization, and Formal Sign-Off

### Outcomes
- Pilot issues resolved and documented
- Go-forward plan approved for broader rollout

### Module deliverables
- Defect burn-down closure
- Post-launch KPI readout and lessons learned
- Finalized runbooks v1.1 based on real incidents
- Backlog split: immediate fixes vs post-MVP enhancements

### Exit criteria
- Hypercare Sev-1/Sev-2 = 0 open
- Executive sign-off package complete

---

## 5) RAID — Go-Live Risks, Mitigations, Owners

| Risk | Impact | Probability | Mitigation | Owner | Trigger/Threshold |
|---|---|---:|---|---|---|
| Schema/ID drift across services | Integration failures, bad analytics | Medium | Contract freeze, shared schema package, PR lint checks | PM + Backend Lead | Any contract-breaking change post-W1 freeze |
| Migration/import data quality gaps | Wrong menu/allergen display, trust/compliance risk | High | Validation script, low-confidence QA queue, publish blockers | CMS Lead + Menu Agent | Allergen/image completeness below agreed floor |
| Payment/webhook instability | Orphaned/duplicate order states | Medium | Idempotency, retry queue, reconciliation dashboard + runbook | Backend Lead | Payment failure >5% for 30 min |
| Loyalty ledger inconsistency | Customer trust loss, financial leakage | Medium | Exactly-once ledger logic, atomic transactions, daily reconciliation | Backend Lead + Data | Duplicate award/redeem anomaly detected |
| Visual asset incompleteness | Lower conversion, inconsistent UX | High | P0-first asset plan, fallback policy, CMS publish gating | Visual Lead | P0 slots missing approved asset by W4 |
| Mobile checkout friction | Drop in conversion | Medium | Mobile-first QA scripts, focus/validation fixes, perf budgets | FE Lead + QA | Checkout completion below target in pilot |
| Operational readiness gap | Slow incident response, cancellations | Medium | Mandatory runbook drills and role-based training | Ops Manager + PM | Runbook drill failure or unresolved SOP gap |
| Scope creep during launch window | Timeline slip, quality decline | High | Strict change control; defer non-critical asks | PM | New P0 requests after W3 |

---

## 6) Definition of Done by Module

## 6.1 PM / Program Governance
- Week-by-week plan, dependencies, and owners published and accepted
- Scope in/out maintained with formal change log
- Go/no-go checklist complete and signed by FE/BE/QA/Ops/Data

## 6.2 Menu Intelligence & Import
- Final import bundles delivered and reproducible
- Validation script spec implemented (required fields + confidence thresholds)
- Image coverage score by category published; low-confidence records queued
- No critical import errors in staging dry-run

## 6.3 Backend/API
- v1 migrations applied cleanly in staging and prod
- Public/admin OpenAPI contracts published and versioned
- Idempotent order create + valid state transitions enforced
- Loyalty ledger exactly-once behavior validated
- Observability and alerting active for core commerce paths

## 6.4 CMS & RBAC
- CRUD/publish/order-ops flows work per role matrix
- Machine-readable RBAC matrix exported and enforced server-side
- All admin writes audit-logged with actor + diff + reason when required
- Import/migration operational screens available to authorized roles

## 6.5 Frontend Ordering + Account UX
- Premium UI patterns implemented with real API state mapping
- Mobile checkout flow passes functional and usability tests
- Post-checkout account prompt, reorder flow, and loyalty visibility fully wired
- Accessibility baseline met on critical path (keyboard/focus/labels/aria-live)

## 6.6 Visual Assets
- Final production manifest complete for all P0 slots
- Naming conventions and variant strategy implemented in code/CMS
- CDN/transformation strategy active with format fallback and size budgets
- Missing assets fail gracefully with approved fallback design

## 6.7 Data/Analytics
- KPI dashboard live (CVR, AOV, checkout completion, repeat proxy, reorder interval)
- Event schema quality checks pass (<1% missing mandatory fields)
- Revenue/order reconciliation within tolerance against transactional DB
- Alerting configured for guardrail thresholds

## 6.8 QA & Release
- E2E regression suite pass >=95% on release candidate
- 0 open Sev-1/Sev-2 at go-live decision
- Rollback drill completed successfully pre-launch
- UAT sign-off from Ops and PM recorded

## 6.9 Operations
- Open/close, out-of-stock, and incident handling runbooks approved
- Staff training complete with attendance + competency checks
- Pilot support rota and escalation tree active

---

## 7) Go-Live Decision Framework

Go-live is approved only when all are true:
1. Critical path dependencies completed and signed.
2. Module DoD achieved for Backend, CMS, Frontend, QA, and Ops.
3. Guardrails stable in staging soak and early pilot window.
4. Rollback path tested and operationally ready.

Automatic rollback/hold conditions:
- Checkout technical success <95% for 30 minutes
- Payment failure >5% for 30 minutes without external incident explanation
- Verified data-integrity issue (duplicate orders/points)
- Unresolved Sev-1 defect in live ordering path

---

## 8) Post-Go-Live Priorities (Immediately After Cycle 3)

1. Expand pilot locations with same readiness checklist
2. Begin experiments: checkout layout and reorder CTA placement
3. Raise data quality floor: allergen precision + full image coverage
4. Plan Cycle 4 scope (referrals, advanced campaigns, deeper personalization)
