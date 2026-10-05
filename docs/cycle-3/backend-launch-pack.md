# Dilshad v1 — Cycle 3 Backend/CMS Launch Pack

## 0) Inputs Used
This package finalizes backend/CMS delivery using:
- `docs/cycle-2/backend-stack-and-api.md`
- `docs/cycle-2/cms-role-matrix.md`
- `docs/cycle-2/lead-feedback.md`

Cycle 3 backend deliverables requested by lead and completed here:
1. v1 database migration plan
2. sample API contracts (implementation-ready examples)
3. machine-readable RBAC matrix (see `rbac-matrix.json`)
4. launch runbooks for operations

---

## 1) Canonical Build Order (Backend/CMS)

### Phase A — Foundations (Days 1–4)
- Bootstrap NestJS modules and Prisma schema with canonical IDs (ULID) and naming.
- Implement admin auth/session model + RBAC guards.
- Add audit logging middleware/interceptor (write-path only initially).
- Add CI checks: migration lint, OpenAPI schema generation, contract tests skeleton.

**Exit criteria**
- `POST /v1/admin/auth/login` works end-to-end.
- Role guard returns deterministic `403` codes.
- Baseline migrations apply cleanly on empty DB.

### Phase B — Catalog + Public Read (Days 5–8)
- Categories/products/options/availability endpoints.
- Public menu read endpoints by location.
- Publish flags and read filters for only active/published entities.

**Exit criteria**
- CMS catalog updates visible via `/v1/locations/{id}/menu` after publish.
- Cache invalidation works for category/product changes.

### Phase C — Quote/Order Core (Days 9–13)
- Quote engine (`POST /v1/orders/quote`) with availability, price, hours validation.
- Order placement (`POST /v1/orders`) with idempotency key enforcement.
- Order state transitions + admin order ops endpoints.

**Exit criteria**
- Duplicate place-order calls with same idempotency key are safe.
- Invalid state transitions return `409 STATE_TRANSITION_INVALID`.

### Phase D — CMS Content + Media + Loyalty Hooks (Days 14–17)
- Pages/banners/media endpoints.
- Guest conversion + loyalty summary/reorder suggestion read APIs.
- Webhook registration + delivery worker + retry/dead-letter.

**Exit criteria**
- Page publish appears in public API within SLA.
- Failed webhook deliveries enter retry and DLQ path.

### Phase E — Launch Hardening (Days 18–20)
- Backup/restore drill, alerting, dashboards, runbook rehearsal.
- Staging UAT against full smoke checklist.
- Production deploy with rollback gate.

**Exit criteria**
- Go-live checklist green.
- On-call handoff done with incident flow verified.

---

## 2) v1 Database Migration Plan

## 2.1 Migration Strategy
- Use Prisma migrations with **expand/migrate/contract** pattern for safe changes.
- Seed only canonical reference data (roles/permissions/settings defaults).
- All migrations are forward-only; rollback via compensating migration + restore plan.

Naming convention:
- `YYYYMMDDHHMM_<domain>_<change>.sql`

## 2.2 Ordered Migration Set (v1)

### M001 — identity_core
Create tables:
- `admin_users`
- `roles`
- `permissions`
- `role_permissions`
- `admin_user_roles`
- `admin_sessions`

Constraints/indexes:
- unique(email) on `admin_users`
- unique(name) on `roles`, `permissions`
- partial unique for active session token hash

### M002 — locations_and_hours
Create tables:
- `locations`
- `location_hours`

Constraints/indexes:
- location timezone required
- non-overlap index strategy for opening windows per day

### M003 — catalog_core
Create tables:
- `categories`
- `products`
- `option_groups`
- `options`
- `product_option_groups`
- `product_availability`

Constraints/indexes:
- unique slug for `categories`, `products`
- `min_select <= max_select` in `option_groups`
- foreign keys cascade rules for mapping tables

### M004 — content_and_media
Create tables:
- `pages`
- `page_blocks`
- `banners`
- `media_assets`

Constraints/indexes:
- `pages.slug` unique
- publish status enum checks
- media mime whitelist enforced at app layer + optional DB check

### M005 — customer_and_addresses
Create tables:
- `customer_accounts`
- `customer_addresses`

Constraints/indexes:
- unique(email) nullable-safe strategy for guest conversion

### M006 — commerce_orders
Create tables:
- `cart_quotes`
- `cart_quote_items`
- `orders`
- `order_items`
- `order_item_options`
- `order_status_history`

Constraints/indexes:
- unique `order_no`
- idempotency table or unique key on `(idempotency_key, endpoint, actor_scope)`
- quote expiry index

### M007 — payments_and_financial_state
Create tables:
- `payment_transactions`
- `refunds`

Constraints/indexes:
- payment state enum (`unpaid`, `paid`, `failed`, `refunded`)

### M008 — loyalty_retention
Create tables:
- `loyalty_accounts`
- `points_ledger`
- `rewards`
- `reward_redemptions`
- `reorder_signals`

Constraints/indexes:
- non-negative balance consistency check via ledger aggregation guard

### M009 — operations_observability
Create tables:
- `settings`
- `audit_logs`
- `webhook_endpoints`
- `webhook_deliveries`
- `import_jobs`
- `import_row_results`

Constraints/indexes:
- webhook URL HTTPS check
- audit indexes by `actor_id`, `entity_type`, `created_at`

### M010 — seed_reference_data
Seed:
- permissions list (canonical)
- base roles: owner, manager, staff_ops, support, content_editor
- role-permission grants
- baseline settings (tax bps, default prep minutes)

---

## 2.3 Import/Migration from Scraped Menu Data into CMS

Input assumptions from Cycle 1/2 assets:
- source files in `data/cycle-*/menu.csv` and `data/cycle-*/menu.json`

Import stages:
1. **Normalize** source into canonical import schema:
   - category_name, category_slug
   - product_name, product_slug, description, base_price_minor
   - option_group_name, min_select, max_select
   - option_name, option_price_minor
2. **Validate**:
   - required columns present
   - slug uniqueness
   - price non-negative integer minor units
   - option group bounds valid
3. **Dry run** (no writes): output row-level pass/fail report.
4. **Apply import** in transaction batches (e.g., 200 rows).
5. **Post-import checks**:
   - counts by entity type
   - orphan mapping checks (no product without category)
   - publish readiness report

Idempotency behavior:
- Upsert by slug for categories/products.
- Upsert by `(product_slug, option_group_name)` for group mappings.
- Keep import run history in `import_jobs` and per-row status in `import_row_results`.

---

## 3) Sample API Contracts (Implementation-Ready)

## 3.1 Error Envelope (global)
```json
{
  "code": "STRING_CODE",
  "message": "Human readable",
  "details": {},
  "requestId": "req_01J..."
}
```

## 3.2 Public — Create Quote
`POST /v1/orders/quote`

Request:
```json
{
  "locationId": "01HV7N6N8K3D5Y2K3HV5P6P9Y1",
  "fulfillmentType": "pickup",
  "items": [
    {
      "productId": "01HW1X7KQ5RMQ0G6N9Q2F1X4K8",
      "qty": 2,
      "selectedOptions": [
        "01HX8N3F1W6P9V5R2M4A7B8C1D"
      ]
    }
  ],
  "couponCode": "WELCOME10",
  "rewardId": "01HZ6V2K8M3Q9D1N5T7F4L2R6P"
}
```

Response 200:
```json
{
  "quoteId": "q_01J0ABCD1234EFGH5678JKL90",
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

Failure example 409:
```json
{
  "code": "QUOTE_ITEM_UNAVAILABLE",
  "message": "One or more items are unavailable for selected location/time.",
  "details": {
    "unavailableProductIds": ["01HW1X7KQ5RMQ0G6N9Q2F1X4K8"]
  },
  "requestId": "req_01J0..."
}
```

## 3.3 Public — Place Order (Idempotent)
`POST /v1/orders`
Headers: `Idempotency-Key: 8f03d786-8f7f-4259-a7f9-6ef4e77ac5af`

Request:
```json
{
  "quoteId": "q_01J0ABCD1234EFGH5678JKL90",
  "customer": {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+447700900123"
  },
  "paymentMethodToken": "pm_tok_abc123",
  "notes": "No onions please"
}
```

Response 201:
```json
{
  "orderId": "01J0C2P3Q4R5S6T7U8V9W0X1Y2",
  "orderNo": "DL-100245",
  "status": "placed",
  "paymentStatus": "paid",
  "totalMinor": 2699,
  "placedAt": "2026-03-21T12:58:22Z"
}
```

## 3.4 Admin — Update Order Status
`POST /v1/admin/orders/{orderId}/status`

Request:
```json
{
  "nextStatus": "preparing",
  "reason": "Kitchen accepted"
}
```

Response 200:
```json
{
  "orderId": "01J0C2P3Q4R5S6T7U8V9W0X1Y2",
  "previousStatus": "confirmed",
  "currentStatus": "preparing",
  "updatedAt": "2026-03-21T13:06:00Z"
}
```

Failure 409:
```json
{
  "code": "STATE_TRANSITION_INVALID",
  "message": "Cannot transition from completed to preparing.",
  "details": {
    "from": "completed",
    "to": "preparing"
  },
  "requestId": "req_01J0..."
}
```

## 3.5 Admin — Assign Roles
`POST /v1/admin/users/{userId}/roles`

Request:
```json
{
  "roleIds": ["role_staff_ops"]
}
```

Response 200:
```json
{
  "userId": "01J0USER...",
  "roles": ["staff_ops"],
  "updatedAt": "2026-03-21T13:11:30Z"
}
```

Failure 403 (manager attempting owner assign):
```json
{
  "code": "ROLE_ASSIGN_FORBIDDEN",
  "message": "You cannot assign or revoke owner role.",
  "details": {
    "attemptedRole": "owner"
  },
  "requestId": "req_01J0..."
}
```

---

## 4) RBAC Machine-Readable Output
Machine-readable RBAC is delivered in:
- `docs/cycle-3/rbac-matrix.json`

Contains:
- canonical permission list
- role grants and limits
- endpoint-permission mapping
- global RBAC rules and lockout protections

---

## 5) Launch Runbooks (Ops)

## 5.1 Runbook A — Open/Close Hours Management

### Purpose
Safely open/close location service windows and avoid accepting orders outside valid hours.

### Preconditions
- Actor has `locations.write`.
- No active deployment changing hours logic.

### Steps (Open)
1. CMS: verify location timezone and today schedule.
2. Ensure service modes active (`pickup`/`delivery` as applicable).
3. Confirm menu published for location.
4. Smoke check `GET /v1/locations/{id}/menu` returns expected categories.
5. Announce "location open" in ops channel.

### Steps (Close)
1. Set close mode with effective timestamp.
2. Verify outstanding orders are not force-cancelled.
3. Confirm quote endpoint rejects new quotes post-close with deterministic code.
4. Export end-of-day orders summary.

### Rollback
- Re-enable previous schedule from audit log diff if closure was accidental.

---

## 5.2 Runbook B — Out-of-Stock (OOS) Flow

### Purpose
Remove unavailable items quickly while preserving orderability of remaining menu.

### Steps
1. Staff sets product availability off (`PATCH /admin/products/{id}/availability`).
2. Confirm cache invalidation completed (max 120s TTL).
3. Validate quote attempts with OOS item return `QUOTE_ITEM_UNAVAILABLE`.
4. If substitute exists, update merchandising copy in CMS.
5. When restocked, re-enable availability and verify public menu.

### Guardrails
- Staff cannot alter pricing/structure; only availability and low-risk fields.
- All changes audited.

---

## 5.3 Runbook C — Order Incident Handling

### Incident types
- Payment captured, order missing in kitchen queue
- Wrong status progression
- Customer reports duplicate charge/order

### Triage steps (<= 10 min)
1. Pull order via admin order detail.
2. Check idempotency key history and payment transaction records.
3. Inspect `order_status_history` and recent webhook deliveries.
4. Determine class:
   - **A** data mismatch
   - **B** delayed worker/job
   - **C** payment gateway inconsistency

### Resolution actions
- Class A: correct status via authorized transition + audit reason.
- Class B: retry affected job from queue tooling; monitor completion.
- Class C: hold/reconcile payment; if needed trigger refund flow and notify support.

### Communication template
- Incident ID
- Affected order(s)
- Customer impact
- Mitigation applied
- Follow-up owner + ETA

### Post-incident
- Add audit note and root cause in incident register.
- Create backlog task if systemic.

---

## 5.4 Runbook D — Webhook Failure / Retry Spike

### Trigger
- Alert: webhook failure rate > 5% over 10m or DLQ growth.

### Steps
1. Check destination uptime and TLS validity.
2. Inspect failure codes in `webhook_deliveries`.
3. Pause non-critical webhook endpoints if downstream outage is confirmed.
4. Requeue recoverable events after downstream restored.
5. Confirm DLQ drain progress and duplicate protection.

### Escalation
- >30 min unresolved: escalate to engineering on-call + product owner.

---

## 5.5 Runbook E — Backup Restore Drill (Monthly)

### Objective
Validate RPO<=24h and RTO<=4h commitments.

### Steps
1. Restore latest production backup into isolated staging clone.
2. Run integrity checks:
   - table counts by domain
   - recent orders parity sample
   - RBAC role/permission parity
3. Execute smoke tests for login, menu read, quote, order detail.
4. Document restore duration and failures.

---

## 6) Go-Live Checklist (Backend/CMS)

### Data & Schema
- [ ] All v1 migrations applied in staging and production
- [ ] Seed roles/permissions/settings completed
- [ ] Import jobs completed with 0 critical row failures

### API & Contracts
- [ ] OpenAPI published and frozen for v1
- [ ] Contract tests green for quote/order/admin critical paths
- [ ] Error codes verified for top 20 failure cases

### Security & RBAC
- [ ] RBAC JSON loaded and mapped in authorization layer
- [ ] Last-owner lockout test passed
- [ ] Protected action reason enforcement tested

### Reliability
- [ ] Queue, DB, API dashboards live
- [ ] Alert thresholds tuned (latency, 5xx, queue lag, webhook fail)
- [ ] Backup and restore drill report attached

### Operational Readiness
- [ ] Open/close and OOS runbooks rehearsed
- [ ] Incident handling drill completed
- [ ] On-call schedule and escalation path published

---

## 7) Definition of Done by Module (Backend/CMS)
- **Auth/RBAC**: login/refresh/logout + deterministic enforcement + audit on write.
- **Catalog**: full CRUD + publish + public menu visibility + availability toggles.
- **Orders**: quote/order/idempotency/status state machine + incident-safe auditability.
- **Content/Media**: pages/banners/media upload flow with validations and publish latency SLA.
- **Loyalty/Retention**: summary + earn path + guest conversion endpoint operational.
- **Ops**: webhooks with retries, observability, backup/restore, runbooks validated.

This completes the Cycle 3 backend/CMS finalization package requested by lead feedback.
