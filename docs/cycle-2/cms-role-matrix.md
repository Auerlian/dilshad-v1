# Dilshad v1 — Cycle 2 CMS Role Matrix

## 1) Scope
This matrix defines CMS authorization for Cycle 2 MVP roles and screens.

Primary required roles (from lead feedback):
- **Owner**
- **Manager**
- **Staff (Ops)**
- **Support**

Additional implementation role (recommended):
- **Content Editor** (optional but practical split for marketing/content workload)

Permission rule:
- API authorization is source of truth.
- UI may hide/disable actions, but server enforces all restrictions.

---

## 2) Permission Keys (Canonical)
- `dashboard.read`
- `orders.read`, `orders.update_status`, `orders.cancel`, `orders.export`
- `catalog.read`, `catalog.write`, `catalog.publish`, `catalog.availability.write`
- `content.read`, `content.write`, `content.publish`
- `media.read`, `media.write`
- `locations.read`, `locations.write`
- `users.read`, `users.write`, `roles.assign`
- `settings.read`, `settings.write`
- `audit.read`
- `webhooks.read`, `webhooks.manage`

---

## 3) Role Definitions

## 3.1 Owner
- Full platform control
- Can manage users/roles/settings/webhooks
- Can override protected actions with reason logging

## 3.2 Manager
- Runs day-to-day operations
- Can manage catalog/content/orders/locations
- Cannot assign elevated roles beyond allowed set
- Cannot change high-risk platform security settings

## 3.3 Staff (Ops)
- Handles order pipeline and limited catalog operations
- Can toggle availability and low-risk product details
- Cannot publish structural catalog/content changes

## 3.4 Support
- Read-only troubleshooting role
- Can view orders, customers (if surfaced), and audit trails
- No write mutations

## 3.5 Content Editor (optional)
- Content and media ownership
- No order status authority
- No user/role/settings authority

---

## 4) Screen-by-Screen Access Matrix
Legend: ✅ allowed, ◑ limited, ❌ denied

| CMS Screen / Action | Owner | Manager | Staff (Ops) | Support | Content Editor |
|---|---:|---:|---:|---:|---:|
| Dashboard: view KPIs | ✅ | ✅ | ✅ | ✅ | ✅ |
| Dashboard: manage widgets/settings | ✅ | ◑ | ❌ | ❌ | ❌ |
| Orders: list/detail | ✅ | ✅ | ✅ | ✅ | ❌ |
| Orders: status transition | ✅ | ✅ | ✅ | ❌ | ❌ |
| Orders: cancel/reject | ✅ | ✅ | ◑ | ❌ | ❌ |
| Orders: export CSV | ✅ | ✅ | ◑ | ✅ | ❌ |
| Categories: create/edit/reorder | ✅ | ✅ | ❌ | ❌ | ❌ |
| Products: create/edit core fields | ✅ | ✅ | ◑ | ❌ | ◑ |
| Products: publish | ✅ | ✅ | ❌ | ❌ | ❌ |
| Availability: quick toggle | ✅ | ✅ | ✅ | ❌ | ❌ |
| Option Groups/Options: full CRUD | ✅ | ✅ | ❌ | ❌ | ❌ |
| Pages: create/edit draft | ✅ | ✅ | ❌ | ❌ | ✅ |
| Pages: publish/unpublish | ✅ | ✅ | ❌ | ❌ | ✅ |
| Banners: create/edit/schedule | ✅ | ✅ | ❌ | ❌ | ✅ |
| Media Library: upload/manage | ✅ | ✅ | ❌ | ❌ | ✅ |
| Locations: edit hours/modes | ✅ | ✅ | ❌ | ❌ | ❌ |
| Users: create/edit/deactivate | ✅ | ◑ | ❌ | ❌ | ❌ |
| Roles: assign | ✅ | ◑ | ❌ | ❌ | ❌ |
| Settings: read | ✅ | ✅ | ❌ | ✅ | ❌ |
| Settings: write | ✅ | ❌ | ❌ | ❌ | ❌ |
| Audit Logs: read | ✅ | ✅ | ✅ | ✅ | ✅ |
| Webhooks: view | ✅ | ✅ | ❌ | ✅ | ❌ |
| Webhooks: create/edit/test | ✅ | ❌ | ❌ | ❌ | ❌ |

---

## 5) “Limited” (◑) Rules

## 5.1 Manager limits
- Can invite users only into: `Staff`, `Support`, `Content Editor`
- Cannot assign/revoke `Owner`
- Cannot modify auth/security-critical settings (token TTL, password policy, webhook secret rotation)

## 5.2 Staff (Ops) limits
- Order cancel allowed only before `completed`
- Cancel/reject requires mandatory reason (min 10 chars)
- Product edits limited to:
  - `is_available`
  - stock/out-of-stock indicator
  - prep-time metadata
- No price, tax, option structure, or publish control

## 5.3 Product edits for Content Editor
- Allowed: name, description, media, allergens copy, merchandising fields
- Not allowed: base price, availability, option pricing, publish state

---

## 6) Endpoint-to-Permission Mapping (Key Extract)

| Endpoint | Required permission |
|---|---|
| `GET /v1/admin/orders` | `orders.read` |
| `POST /v1/admin/orders/{id}/status` | `orders.update_status` |
| `POST /v1/admin/orders/{id}/cancel` | `orders.cancel` |
| `POST /v1/admin/products` | `catalog.write` |
| `PATCH /v1/admin/products/{id}/availability` | `catalog.availability.write` |
| `POST /v1/admin/pages/{id}/publish` | `content.publish` |
| `POST /v1/admin/media/upload-url` | `media.write` |
| `POST /v1/admin/users/{id}/roles` | `roles.assign` |
| `PATCH /v1/admin/settings` | `settings.write` |
| `GET /v1/admin/audit-logs` | `audit.read` |
| `POST /v1/admin/webhooks/{id}/test` | `webhooks.manage` |

---

## 7) Guardrails and Audit Requirements
1. Every write mutation logs:
   - actor user id
   - action
   - entity type/id
   - before/after diff
   - request id + timestamp
2. Protected actions require reason:
   - order cancel/reject
   - location deactivate override
   - role downgrade/remove for active admin
3. Privilege escalation protections:
   - no self-promotion to Owner
   - no self-removal of last Owner
   - prevent lockout (must always keep >=1 active Owner)

---

## 8) Acceptance Criteria
- Unauthorized requests return `403 FORBIDDEN` with deterministic error code
- UI role gating matches API enforcement for all mapped screens
- Audit logs contain 100% of admin write actions in staging verification
- Last-owner lockout scenario blocked and tested
- Staff and Support cannot mutate prices, settings, roles, or webhooks
