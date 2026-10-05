# Dilshad v1 — Cycle 1 Execution Backlog (Concise)

## Prioritization Framework
- **P0:** Must ship for MVP launch
- **P1:** High-value, can ship shortly after MVP if needed
- **P2:** Phase 2+ enhancements

---

## Epic 1: Platform Foundation (P0)
1. **Architecture baseline + environments** (P0)
   - Define service boundaries, DB schema baseline, staging/prod setup.
2. **Design system + core UI shell** (P0)
   - Responsive components, typography, tokens, navigation shell.
3. **Observability + alerting** (P0)
   - Central logs, metrics, trace IDs, error alerts, uptime checks.
4. **CI/CD + quality gates** (P0)
   - Test automation, linting, vulnerability scan, release pipeline.

## Epic 2: Identity & Accounts (P0)
1. Email/password signup/login/logout
2. Social login (Google, Apple)
3. Password reset and secure token flow
4. Profile + saved addresses + preferences
5. RBAC framework for admin roles

## Epic 3: Menu & Catalog (P0)
1. Catalog schema: categories/items/variants/modifiers/bundles
2. Allergen/ingredient/tag support with validation
3. Time-based availability/daypart rules
4. Location-specific pricing and stock controls
5. Menu publish workflow with audit trail

## Epic 4: Customer Ordering (P0)
1. Home, menu browsing/search/filter UX
2. Item detail + customization UX
3. Cart persistence and pricing/tax/fee engine
4. Delivery/pickup selection + serviceability checks
5. Checkout + payment provider integration
6. Order confirmation + notification hooks

## Epic 5: Multi-Location (P0)
1. Location model (hours, closures, radius)
2. Geolocation/postcode selector
3. Location pages + local metadata (SEO)
4. Fulfillment routing guards at checkout

## Epic 6: Loyalty & Retention (P0/P1)
1. Points earning ledger + redemption logic (P0)
2. Tier thresholds and daily recalculation job (P0)
3. Rewards catalog + checkout redemption UI (P0)
4. Reorder module and reminder triggers (P1)
5. Referral links/codes and attribution tracking (P1)

## Epic 7: Promotions Engine (P0/P1)
1. Promo rule engine (%/fixed/bundle) (P0)
2. Coupon code lifecycle + usage caps (P0)
3. Conflict/stacking resolution rules (P0)
4. Campaign scheduling and reporting (P1)

## Epic 8: Ordering Quiz/Preferences (P1)
1. Quiz builder/data model (questions/options)
2. Rule-based recommendation service
3. Save preference profile to account
4. Quiz analytics events + dashboard widget

## Epic 9: CMS/Admin & Operations (P0)
1. CMS pages (home blocks/banners/FAQ/policies)
2. Media library with optimization and alt-text
3. Admin role permissions by feature
4. Order operations dashboard + status updates
5. Admin audit logs and change history

## Epic 10: Analytics & Experimentation (P0/P1)
1. Event taxonomy implementation (P0)
2. Conversion funnel dashboards (P0)
3. Loyalty/promo performance dashboards (P1)
4. A/B testing assignment + reporting framework (P1)

## Epic 11: SEO, Accessibility, Security, Performance (P0)
1. SSR/prerender + metadata + sitemap + schema
2. WCAG 2.2 AA keyboard/form/status compliance
3. Security hardening (OWASP controls, rate limits, encryption)
4. Performance optimization against CWV/API p95 targets
5. Backup/restore and disaster recovery runbook

## Epic 12: QA, UAT, Launch (P0)
1. Unit/integration/E2E regression suites
2. Load/perf and security testing
3. Accessibility and SEO validation passes
4. Pilot launch at single location + monitoring
5. Phased rollout + post-launch optimization sprint

---

## Milestone Cut (Suggested)
- **M1 (Weeks 1–3):** Epics 1, 2 (core), 11 (baseline)
- **M2 (Weeks 4–8):** Epics 3, 4, 5
- **M3 (Weeks 9–12):** Epics 6, 7, 9, 10 (core)
- **M4 (Weeks 13–14):** Epic 12 + hardening across all epics

---

## Definition of Done (applies to all backlog items)
- Acceptance criteria implemented and tested.
- Telemetry/events added for critical actions.
- Security/privacy checks passed.
- Documentation updated (admin + engineering runbooks).
- PM + QA sign-off recorded.
