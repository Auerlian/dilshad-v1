# Dilshad v1 — Cycle 1 Product Requirements Document (PRD)

## 1) Document Control
- **Product:** Premium Local Restaurant Platform (web-first, app-ready)
- **Cycle:** 1
- **Owner:** Product Management (Dilshad PM Agent)
- **Date:** 2026-03-21
- **Status:** Draft for Engineering/Design kickoff

---

## 2) Vision, Problem, and Goals

### Vision
Deliver a premium, fast, and trustworthy digital experience that turns local diners into repeat high-value customers through seamless ordering, personalization, and loyalty.

### Problem Statement
Current restaurant site experiences are often slow, fragmented, and not conversion-optimized, causing lost orders, weak retention, and poor operational visibility.

### Business Goals (12 months)
1. Increase direct digital order conversion rate (visitor → order) to **>= 6.5%**.
2. Increase repeat purchase rate (90-day) to **>= 35%**.
3. Grow average order value (AOV) by **>= 12%** via upsell bundles and loyalty rewards.
4. Reduce dependency on third-party marketplaces (commission-heavy channels).
5. Establish scalable multi-location platform foundation.

### Product Goals (Cycle 1)
- Launch full customer ordering flow and account system.
- Launch loyalty points + redemption MVP.
- Launch CMS/admin for menus, content, locations, and promotions.
- Instrument analytics funnel and operational dashboards.
- Meet baseline SEO, accessibility, and security requirements.

---

## 3) Scope Summary

### In Scope (Cycle 1)
- Customer-facing responsive web app
- Discovery/home, menu browse/search/filter, item detail
- Cart, checkout, payment handoff (provider integration)
- Accounts: signup/login/social login/password reset
- Loyalty points, rewards catalog, tier rules (basic)
- Ordering quizzes/preferences funnel
- Multi-location selector, location pages, hours/service areas
- Promotions/coupons/referrals (MVP)
- Reorder nudges and post-purchase prompts
- Admin CMS (content, menu, promos, users/roles)
- Order lifecycle dashboard (status tracking)
- Analytics, conversion events, A/B testing framework

### Out of Scope (Cycle 1)
- Native iOS/Android apps
- Full kitchen/KDS hardware integrations beyond basic webhook exports
- Dynamic surge pricing
- Advanced AI recommendations (beyond rule-based)
- Internationalization (single language initially)

---

## 4) Personas and Core Jobs

### Personas
1. **Busy Local Customer** — wants quick reorder, simple checkout.
2. **First-time Visitor** — needs confidence (photos, reviews, allergens, clear value).
3. **Health/Preference Customer** — requires ingredient/allergen clarity and customization.
4. **Store Manager** — needs reliable order visibility and quick content/menu updates.
5. **Owner/Marketing Lead** — needs campaign controls and revenue/conversion insight.

### Top Jobs To Be Done
- “Help me find what I want and order in under 3 minutes.”
- “Let me trust ingredients/allergens before purchase.”
- “Remember my preferences and make reordering effortless.”
- “Let me launch menu/promotional changes without engineering support.”

---

## 5) End-to-End Experience Map
1. **Acquire:** SEO/social/direct → landing/home/location pages.
2. **Discover:** browse menu, quiz for recommendations, view item details.
3. **Decide:** add items, apply offers, confirm availability and ETA.
4. **Checkout:** login/guest, address/pickup choice, payment, confirmation.
5. **Fulfillment:** live order status updates.
6. **Retain:** points awarded, reorder reminders, targeted offers.

---

## 6) Functional Requirements by Module

## 6.1 Customer App (Responsive Web)
### Requirements
- Mobile-first UI with premium visual design and fast navigation.
- Home page supports: featured items, categories, offers, nearest location.
- Menu browse with category tabs, search, dietary/allergen filters, sort options.
- Item detail includes images, description, ingredients, allergens, customizations, price impact.
- Persistent cart across sessions for logged-in users.

### Acceptance Criteria
- User can find and add any available item to cart within <= 3 taps from menu.
- Page transitions and core interactions remain responsive on mid-tier mobile devices.
- Cart state persists after refresh/login.

## 6.2 Ordering Flow
### Requirements
- Delivery/pickup selection with location/service-area validation.
- Configurable prep/delivery slots.
- Fees/taxes/tips breakdown transparent pre-payment.
- Promo and coupon input with validation messaging.
- Payment provider integration (tokenized card flow).
- Confirmation page + email/SMS webhook trigger.

### Acceptance Criteria
- Successful checkout completion >= 98% in production (excluding user drop-offs).
- Invalid coupons show actionable error reason.
- Every successful order creates immutable order record + event log.

## 6.3 Accounts & Identity
### Requirements
- Email/password signup/login.
- Social login (Google + Apple minimum).
- Password reset via secure token.
- Profile: name, phone, saved addresses, saved preferences.
- Session management and logout-all-sessions option.

### Acceptance Criteria
- Signup/login median completion <= 60 seconds.
- Reset links single-use, expiring <= 30 minutes.
- Social login failures have safe fallback to email flow.

## 6.4 Loyalty Points, Tiers, Rewards
### Requirements
- Points earning: configurable rate (e.g., 1 point per £1).
- Tier thresholds (e.g., Silver/Gold/Platinum) based on rolling spend or points.
- Reward catalog (e.g., free side, % discount, free delivery) with validity rules.
- Points ledger with transaction history and expiration policy.
- Redemption at checkout with conflict rules (cannot stack incompatible promos).

### Acceptance Criteria
- Points accrue exactly once per paid/completed order.
- Reward redemption updates ledger atomically with order transaction.
- Tier recalculation job runs daily and is auditable.

## 6.5 Ordering Quizzes / Preference Funnels
### Requirements
- Short quiz (3–7 questions) for taste/preferences (spice, diet, portion, mood, budget).
- Recommendation output maps to menu items + bundles.
- Ability to save preference profile to account.
- Quiz completion tracked for funnel analytics.

### Acceptance Criteria
- Quiz completion rate measurable end-to-end.
- Recommendations generated in <= 1.5s median.
- Saved preferences affect future recommendation ranking.

## 6.6 Menu Catalog
### Requirements
- Entities: categories, items, variants, modifiers, bundles.
- Support allergens, ingredients, nutritional notes, halal/vegan tags.
- Time-based availability (breakfast/lunch/dinner/daypart).
- Out-of-stock toggles per location.

### Acceptance Criteria
- Menu edit publish propagates to customer app <= 2 minutes.
- Allergen data mandatory for publish on designated sensitive items.
- Price/version changes are audit logged.

## 6.7 Multi-Location Support
### Requirements
- Location selector based on geolocation/manual postcode.
- Location-specific menus, pricing, stock, hours, closures, service radius.
- Routing rules: customer sees only eligible fulfillment options.

### Acceptance Criteria
- No user can checkout against closed/non-serviceable location.
- Location pages are indexable and include localized metadata.

## 6.8 Promotions, Coupons, Referrals, Reorder Nudges
### Requirements
- Promotion builder: % off, fixed amount, bundle discounts, conditional rules.
- Coupon codes with validity windows and usage caps.
- Referral links/codes (basic: first-order discount for referred user).
- Reorder nudges: “order again” cards, reminder notifications, win-back offers.

### Acceptance Criteria
- Promotion engine resolves deterministic final pricing.
- Referral conversion is trackable from invite to completed first order.
- Reorder module shows last 3 relevant previous orders.

## 6.9 CMS/Admin + RBAC
### Requirements
- Admin roles: Owner, Manager, Marketing, Support, Read-only Analyst.
- Capabilities by role for menu/content/promos/orders/users.
- Content CMS for homepage blocks, banners, FAQs, policy pages.
- Media library with image optimization and alt-text fields.

### Acceptance Criteria
- Unauthorized role actions blocked server-side (not just UI).
- Every admin mutation includes actor, timestamp, previous/new values.
- Content drafts can be previewed before publish.

## 6.10 Order Operations Dashboard
### Requirements
- Real-time queue: New, Accepted, Preparing, Ready, Out for delivery, Completed, Cancelled.
- Search/filter by order ID, phone, location, status, timeframe.
- Manual override actions with reason capture (e.g., cancel/refund marker).

### Acceptance Criteria
- Status changes reflected to customer timeline within <= 10 seconds.
- All overrides write immutable audit event.

## 6.11 Analytics, A/B Tests, Conversion Tracking
### Requirements
- Event taxonomy for acquisition, funnel, cart, checkout, loyalty, quiz.
- Dashboard KPIs: conversion, AOV, repeat rate, LTV proxy, promo ROI, drop-off points.
- A/B test framework for homepage/menu/checkout variants.

### Acceptance Criteria
- Critical events fire once and only once per trigger.
- Dashboard data freshness <= 30 minutes for operational decisions.
- Experiments include guardrails (no severe conversion degradation).

---

## 7) SEO Requirements
- SSR or prerender for key pages (home, menus, locations, item landing pages).
- Structured data (Organization, Restaurant, Menu, FAQ, Breadcrumb, LocalBusiness).
- Canonical tags, meta titles/descriptions, XML sitemap, robots controls.
- Location-specific landing pages with unique content and NAP consistency.
- Core Web Vitals targets (mobile): LCP <= 2.5s, INP <= 200ms, CLS <= 0.1.

### SEO Acceptance Criteria
- 100% of indexable templates produce valid canonical and metadata.
- Sitemap auto-updates when location/menu URLs change.
- Noindex applicable on staging and admin pages.

---

## 8) Accessibility Requirements (WCAG 2.2 AA)
- Semantic HTML and keyboard navigability across full ordering flow.
- Contrast compliance for all text/UI controls.
- Proper labels, ARIA roles, and error messaging for forms.
- Alt text for meaningful images in CMS.
- Screen-reader friendly status updates for cart and order tracking.

### Accessibility Acceptance Criteria
- No critical WCAG AA failures on primary user journeys.
- Keyboard-only user can complete order without dead ends.
- Automated + manual assistive tech checks pass release gate.

---

## 9) Security & Privacy Requirements
- OWASP ASVS-aligned secure coding baseline.
- TLS everywhere, secure cookies, CSRF/XSS/SQLi protections.
- Passwords hashed with modern algorithm (Argon2id/bcrypt strong params).
- Rate limiting and bot protection for auth and checkout endpoints.
- RBAC enforced in API and admin UI.
- PII minimization, encryption at rest for sensitive fields.
- Audit logs for admin and financial-impact actions.
- Privacy policy + consent controls (cookie preferences).

### Security Acceptance Criteria
- Zero high/critical vulnerabilities at go-live.
- Pen test remediation for all exploitable findings.
- Incident logging/alerting configured for auth and payment anomalies.

---

## 10) Non-Functional Requirements (NFRs)
- **Availability:** 99.9% monthly uptime target (customer ordering surfaces).
- **Performance:** p95 API response <= 500ms for core read endpoints.
- **Scalability:** handle 10x lunchtime traffic spike without checkout outage.
- **Reliability:** idempotent order creation/payment callback handling.
- **Observability:** logs, metrics, traces, business event monitoring.
- **Backup/Recovery:** daily backups, tested restore procedure (RTO <= 4h, RPO <= 24h).
- **Maintainability:** documented APIs, schema versioning, runbooks.

---

## 11) Data Model (High-Level)
- **User** (profile, auth IDs, preferences)
- **Address**
- **Location** (hours, service area, status)
- **MenuCategory / MenuItem / Variant / Modifier / Bundle**
- **Allergen / Ingredient**
- **Cart / CartItem**
- **Order / OrderItem / Payment / FulfillmentEvent**
- **LoyaltyAccount / PointsLedger / Tier / Reward / Redemption**
- **Promotion / Coupon / ReferralInvite / ReferralRedemption**
- **Quiz / QuizResponse / RecommendationResult**
- **CMSPage / MediaAsset**
- **AdminUser / Role / AuditEvent**
- **AnalyticsEvent / ExperimentAssignment / ExperimentOutcome**

---

## 12) MVP vs Later Phases

### MVP (Cycle 1 Delivery)
- Responsive customer web app with full ordering and checkout.
- Accounts (email + social), profile, saved addresses.
- Loyalty earning/redemption + basic tiers.
- Menu/CMS/admin with RBAC and audit logs.
- Multi-location support with serviceability checks.
- Quiz v1 (rule-based recommendation).
- Promotions/coupons/referral basics.
- Analytics event pipeline + core dashboards.
- SEO + accessibility + security baseline complete.

### Phase 2
- Native mobile apps.
- Advanced segmentation and automated lifecycle campaigns.
- Smarter recommendations (ML ranking).
- Deeper kitchen/POS integrations.
- Gift cards, subscriptions, and corporate catering flows.

### Phase 3
- Dynamic pricing experiments and demand forecasting.
- Multi-brand franchise management.
- Expanded localization/internationalization.

---

## 13) Milestones and Delivery Plan

### Milestone A — Foundation (Weeks 1–3)
- Architecture, design system, auth baseline, event taxonomy, CI/CD quality gates.

### Milestone B — Core Commerce (Weeks 4–8)
- Menu/catalog, cart/checkout/payment, order lifecycle, location logic.

### Milestone C — Retention + Admin (Weeks 9–12)
- Loyalty, promos/referrals, quiz, CMS/admin RBAC, dashboards.

### Milestone D — Hardening + Launch (Weeks 13–14)
- Performance tuning, security testing, accessibility audits, SEO validation, UAT.

---

## 14) Dependencies
- Payment provider and webhook reliability.
- Email/SMS provider for confirmations/reset links.
- Mapping/postcode service for serviceability.
- Analytics infrastructure and BI dashboard tooling.
- Content/design asset readiness for launch pages.

---

## 15) Risks and Mitigations
1. **Checkout drop-offs due to friction** → one-page checkout, guest flow fallback, instrumentation.
2. **Menu data inconsistency across locations** → strict validation and publish workflow.
3. **Promo abuse/fraud** → rate limits, anti-abuse rules, audit alerts.
4. **Operational failure during peak** → load test + queue backpressure strategy.
5. **SEO regression on migration** → redirect map, pre/post crawl audits.

---

## 16) Acceptance Criteria (System-Level)
- End-to-end user can discover, order, pay, and receive confirmation without support intervention.
- Admin can create/edit/publish menu and promotions per location.
- Loyalty points accrue/redeem accurately across full order lifecycle.
- Conversion and retention analytics available in dashboards with agreed freshness.
- Security, accessibility, and SEO gates pass before production cutover.

---

## 17) QA Plan

### Test Strategy
1. **Unit Tests:** domain logic (pricing, points, promotions, serviceability).
2. **Integration Tests:** auth, payment callbacks, order state machine, analytics events.
3. **E2E Tests:** key journeys (first order, reorder, quiz → checkout, coupon/reward redemption).
4. **Accessibility Testing:** automated scans + manual keyboard/screen reader checks.
5. **Performance Testing:** load and stress around peak windows.
6. **Security Testing:** SAST/DAST, dependency scanning, pen test.
7. **SEO Validation:** metadata/schema checks, crawl/indexation tests, redirect verification.
8. **UAT:** owner/manager sign-off scenarios across at least two locations.

### QA Entry/Exit Criteria
- **Entry:** stable staging build, test data fixtures, instrumentation enabled.
- **Exit:** no open Sev-1/Sev-2 defects; Sev-3 accepted with workaround; release checklist complete.

### Regression Suite (Minimum)
- Account creation/login/reset/social login
- Browse/search/filter menu
- Customization, allergens, pricing calculations
- Checkout + payment success/failure paths
- Points earn/redeem + tier updates
- Admin updates reflected on customer app
- Order status updates and notifications

---

## 18) Launch & Post-Launch
- Soft launch at one pilot location (1 week), then phased rollout.
- Monitor war-room dashboard: conversion, payment errors, order failures, latency, 4xx/5xx.
- 30-day optimization plan: experiment backlog, funnel drop-off improvements, loyalty tuning.

---

## 19) Open Questions
1. Final payment provider and fallback strategy?
2. Preferred loyalty economics (earn rate, liability cap, expiration policy)?
3. Referral reward for inviter vs invitee balance?
4. Delivery fleet integration scope in Cycle 1?
5. Legal review requirements for consent/cookies and promotional terms?
