# Dilshad v1 — Cycle 2 Backend Stack, Deployment Topology, and API Catalog

## 1) Purpose and Scope (Cycle 2)
This document converts Cycle 1 backend architecture + lead feedback into implementation-ready decisions for an MVP build in <4 weeks.

Cycle 2 outcomes covered here:
- Concrete backend stack recommendation
- Deployment topology and environment model
- Canonical domain model + naming standards
- OpenAPI-style endpoint catalog (public + admin)
- Frontend/CMS integration contract
- CMS screen-by-screen backend requirements (states, validations, edge cases, acceptance)

---

## 2) Inputs Reviewed
- `cycle-1/backend-architecture.md`
- `cycle-1/cms-spec.md`
- `cycle-1/lead-feedback.md`
- `cycle-1/pm-prd.md`

Key lead directives applied:
1. Canonical naming and domain alignment
2. Reduce ambiguity with validations + edge cases + acceptance
3. MVP-first scope for <4 weeks
4. Explicit frontend ordering + backend integration
5. Retention mechanics in core flow (post-checkout account prompt, reorder CTA, points earn/redeem)

---

## 3) Concrete Stack Recommendation (Final)

## 3.1 Core runtime
- **Language**: TypeScript (strict mode)
- **Framework**: **NestJS** (modular monolith)
- **API style**: REST + OpenAPI 3.1 docs
- **Validation**: Zod at boundary (request/response DTO schemas)
- **ORM**: Prisma
- **Database**: PostgreSQL 16
- **Cache + queues**: Redis 7 + BullMQ
- **Object storage**: S3-compatible (AWS S3 or Cloudflare R2)
- **Auth**: JWT access (15m) + refresh (30d rolling, server revocable)
- **Password hashing**: Argon2id
- **Observability**: OpenTelemetry + structured logs (pino) + Sentry

Why NestJS (vs Fastify-only structure):
- Faster team onboarding with explicit module boundaries
- Strong guard/interceptor/pipes ecosystem for RBAC + audit concerns
- Good fit for admin + public API split in one service

## 3.2 Frontend/CMS integration stack decisions
- **Contract-first source**: OpenAPI spec generated from DTO annotations + Zod schema snapshots
- **Typed clients**: auto-generated TypeScript SDK for:
  - customer web app (`/v1/*`)
  - admin CMS (`/v1/admin/*`)
- **Realtime**: order status via polling first (10s), optional SSE in Phase 2

## 3.3 Security baseline
- Rate limiting: per-IP + per-user buckets
- Idempotency keys: required on order placement and payment callback ingestion
- CSRF protection for cookie-auth endpoints (if web-admin uses cookies)
- RBAC enforced server-side; UI role checks are non-authoritative
- Audit logging for all admin mutations + financial-impact actions

---

## 4) Canonical Domain Model + Naming Standard

## 4.1 Naming
- Resource names: plural snake_case in DB (`order_items`), kebab-case in URLs (`/option-groups`)
- IDs: ULID string IDs (sortable)
- Time: UTC ISO-8601 in API (`placedAt`, `createdAt`)
- Money: integer minor units in API (`amountMinor`, currency ISO-4217)

## 4.2 Canonical entities (MVP)
1. Identity: `admin_user`, `role`, `permission`, `admin_session`
2. Customer: `customer_account`, `customer_address`
3. Catalog: `category`, `product`, `option_group`, `option`, `product_option_group`
4. Availability: `location`, `location_hours`, `product_availability`
5. Commerce: `cart_quote`, `order`, `order_item`, `order_item_option`, `order_status_history`
6. Content: `page`, `page_block`, `banner`, `media_asset`
7. Retention: `loyalty_account`, `points_ledger`, `reward`, `reward_redemption`, `reorder_signal`
8. Operations: `setting`, `audit_log`, `webhook_endpoint`, `webhook_delivery`

## 4.3 Order state machine (locked)
- `placed -> confirmed -> preparing -> ready|out_for_delivery -> completed`
- terminal: `cancelled`, `rejected`
- invalid transitions return `409 STATE_TRANSITION_INVALID`

## 4.4 Payment state machine (separate)
- `unpaid -> paid -> refunded`
- `unpaid -> failed`

---

## 5) Deployment Topology (MVP)

## 5.1 Topology summary
- **Public API service** (`api`): customer + admin routes
- **Worker service** (`worker`): BullMQ processors
- **PostgreSQL**: managed instance, private network
- **Redis**: managed instance, private network
- **S3 bucket**: media objects + signed upload flow
- **CDN**: fronts media + frontend app

## 5.2 Environment model
- `dev` (shared), `staging`, `prod`
- Separate DB + Redis per env
- Separate S3 prefixes/buckets per env
- Secrets via managed secret store

## 5.3 Network/security
- API exposed via HTTPS load balancer
- DB/Redis private only
- WAF + IP throttling at edge
- Daily backups (RPO <= 24h), restore drill monthly (RTO <= 4h)

## 5.4 Scaling approach
- API horizontal scale on CPU/RPS
- Worker horizontal scale on queue depth
- Read-heavy menu endpoints cached (Redis TTL 30–120s)

---

## 6) OpenAPI-Style Endpoint Catalog (MVP)

Conventions:
- Base URL: `/v1`
- Error envelope:
```json
{ "code": "STRING_CODE", "message": "Human readable", "details": {}, "requestId": "..." }
```

## 6.1 Public Customer API

### Locations & Menu
- `GET /locations`
  - Query: `lat`, `lng`, `postcode` (optional)
  - 200: list active locations
- `GET /locations/{locationId}/menu`
  - Returns category/product/options scoped by location + availability
- `GET /products/{productSlug}`
  - Product detail + allergens + option groups

### Quote, Checkout, Orders
- `POST /orders/quote`
  - Body: `locationId`, `items[]`, `fulfillmentType`, `couponCode?`, `rewardId?`
  - Validates stock, hours, promo compatibility, loyalty rules
- `POST /orders`
  - Headers: `Idempotency-Key` (required)
  - Body: `quoteId`, `customer`, `paymentMethodToken`, `notes?`
  - Creates immutable order record + emits `order.created`
- `GET /orders/{orderNo}`
  - Returns public-safe status timeline and totals

### Content
- `GET /pages/{slug}`
- `GET /banners?locationId={id}`

### Retention and Account Prompts
- `POST /customers/guest-conversion`
  - Converts guest checkout identity into account (post-checkout prompt)
- `GET /customers/{customerId}/reorder-suggestions`
  - Last 3 orders + one-click add payload
- `GET /loyalty/summary?customerId={id}`
  - Balance, tier, expiring points

## 6.2 Admin API

### Auth
- `POST /admin/auth/login`
- `POST /admin/auth/refresh`
- `POST /admin/auth/logout`

### Users/Roles
- `GET /admin/users`
- `POST /admin/users`
- `PATCH /admin/users/{userId}`
- `POST /admin/users/{userId}/roles`
- `GET /admin/roles`

### Catalog
- `GET /admin/categories`
- `POST /admin/categories`
- `PATCH /admin/categories/{categoryId}`
- `POST /admin/categories/reorder`

- `GET /admin/products`
- `POST /admin/products`
- `PATCH /admin/products/{productId}`
- `POST /admin/products/{productId}/option-groups`
- `PATCH /admin/products/{productId}/availability`

- `GET /admin/option-groups`
- `POST /admin/option-groups`
- `PATCH /admin/option-groups/{groupId}`
- `POST /admin/options`
- `PATCH /admin/options/{optionId}`

### Orders Ops
- `GET /admin/orders`
- `GET /admin/orders/{orderId}`
- `POST /admin/orders/{orderId}/status`
- `POST /admin/orders/{orderId}/cancel`

### Content/CMS
- `GET /admin/pages`
- `POST /admin/pages`
- `PATCH /admin/pages/{pageId}`
- `POST /admin/pages/{pageId}/publish`

- `GET /admin/banners`
- `POST /admin/banners`
- `PATCH /admin/banners/{bannerId}`

- `POST /admin/media/upload-url`
- `GET /admin/media`

### Ops/Settings/Audit/Webhooks
- `GET /admin/settings`
- `PATCH /admin/settings`
- `GET /admin/audit-logs`
- `GET /admin/webhooks`
- `POST /admin/webhooks`
- `PATCH /admin/webhooks/{webhookId}`
- `POST /admin/webhooks/{webhookId}/test`

## 6.3 Critical request/response schema examples

### POST /orders/quote request
```json
{
  "locationId": "01HV...",
  "fulfillmentType": "pickup",
  "items": [
    {
      "productId": "01HW...",
      "qty": 2,
      "selectedOptions": ["01HX...", "01HY..."]
    }
  ],
  "couponCode": "WELCOME10",
  "rewardId": "01HZ..."
}
```

### POST /orders/quote response
```json
{
  "quoteId": "q_01J...",
  "currency": "GBP",
  "subtotalMinor": 2499,
  "discountMinor": 250,
  "taxMinor": 450,
  "totalMinor": 2699,
  "loyalty": {
    "pointsToEarn": 26,
    "pointsToRedeemApplied": 0
  },
  "expiresAt": "2026-03-21T13:00:00Z"
}
```

---

## 7) Frontend ↔ Backend Integration Plan (MVP)

## 7.1 Ordering flow integration
1. App loads `GET /locations` and selected `GET /locations/{id}/menu`
2. Cart actions are local until checkout
3. Checkout step calls `POST /orders/quote` on every materially relevant change
4. Place order with `POST /orders` + idempotency key
5. Track order via `GET /orders/{orderNo}` every 10s
6. On completion screen, show:
   - account creation CTA (`POST /customers/guest-conversion`)
   - reorder CTA seeds from created order
   - loyalty earn summary

## 7.2 CMS integration
- Admin shell bootstraps with `/admin/auth/*`, `/admin/users/me` (optional add)
- Every mutation endpoint must return updated resource + `updatedAt`
- List endpoints paginated with standard contract:
```json
{ "items": [], "page": 1, "pageSize": 25, "total": 240 }
```

---

## 8) CMS Screen-by-Screen Backend Requirements (Implementation Ready)

## 8.1 Dashboard
- Data sources: order counts, revenue, prep SLA, cancellation rate
- Endpoint: `GET /admin/dashboard/summary` (additive MVP endpoint)
- States: loading, partial data fallback, stale data banner (>15m)
- Acceptance: dashboard loads in <= 1.5s p95 with cached aggregates

## 8.2 Orders List
- Endpoint: `GET /admin/orders`
- Required filters: status, locationId, date range, paymentStatus
- Edge cases: empty results, invalid filter combo, timezone boundaries
- Acceptance: filters are server-side and reflected in response metadata

## 8.3 Order Detail + Transition
- Endpoints: `GET /admin/orders/{id}`, `POST /admin/orders/{id}/status`, `/cancel`
- Validation: disallow illegal transitions, reason mandatory for cancel/reject
- Acceptance: status update reflected in public order endpoint within 10s

## 8.4 Categories
- Endpoints: CRUD + reorder
- Validation: unique slug, non-empty name, bounded sort_order
- Edge case: cannot delete category with active products (409 + guidance)

## 8.5 Products
- Endpoints: CRUD + option-group map + availability patch
- Validation: base price >= 0; category must exist; image alt text required when image exists
- Edge case: inactive category auto-blocks product publish

## 8.6 Option Groups / Options
- Validation: `min_select <= max_select`; required group implies `min_select >= 1`
- Edge case: option cannot be removed if present in active order quote (soft disable)

## 8.7 Pages
- Endpoints: list/create/update/publish
- States: draft, published, archived
- Validation: slug immutable after publish (unless super admin override)
- Acceptance: published page visible to public API within 2 minutes

## 8.8 Banners
- Validation: schedule window valid; CTA URL https-only; image required
- Edge case: overlapping high-priority banners at same location resolved by `priority` then `updatedAt`

## 8.9 Media Library
- Upload flow: pre-signed PUT URL then metadata confirm endpoint (optional)
- Validation: mime whitelist (`image/jpeg`, `image/png`, `image/webp`), max size 8MB
- Acceptance: uploaded asset available for selection within 5s

## 8.10 Locations
- Validation: timezone required; hours must not overlap; at least one service mode
- Edge case: deactivating location with open orders blocked unless override reason provided

## 8.11 Users & Roles
- Validation: at least one role per active user
- Edge case: prevent self-role downgrade that removes current critical permission

## 8.12 Settings
- Validation: tax in [0, 10000 bps], prep defaults positive
- All changes audited with before/after diff

## 8.13 Audit Logs
- Read-only endpoint with filters by actor/entity/action/time
- Acceptance: every admin write appears in log <= 2s

## 8.14 Webhooks
- Validation: HTTPS endpoint only, event list non-empty
- Retry policy: exponential backoff + dead-letter after max attempts

---

## 9) MVP Delivery Slicing (4-week execution)
- **Week 1**: auth/RBAC, core schema/migrations, categories/products/options + menu public read
- **Week 2**: quote/order placement, order ops dashboard endpoints, audit log baseline
- **Week 3**: pages/banners/media, loyalty summary + points earn path, guest conversion endpoint
- **Week 4**: webhooks/retries, hardening/perf, OpenAPI publish + integration QA

---

## 10) Definition of Done (Cycle 2)
1. API catalog implemented and documented in OpenAPI
2. CMS screen requirements covered by corresponding endpoints + validations
3. Role enforcement verified against role matrix document
4. End-to-end flow verified:
   - CMS menu publish -> public menu visible
   - customer quote/order -> staff status updates -> customer tracking
   - post-checkout account prompt + reorder surface + loyalty balance
5. Operational checks in place: audit logs, retries, observability, backups
