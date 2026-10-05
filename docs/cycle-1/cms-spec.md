# Dilshad v1 — Cycle 1 Admin CMS Specification

## 1) CMS Objectives
- Give non-technical staff full control over menu, pricing, availability, content, and operational order handling.
- Keep workflows fast and safe (validation, permissions, audit logs, undo-friendly patterns).
- Support single or multi-location setup from same interface.

## 2) Information Architecture (IA)

## Main navigation
1. **Dashboard**
2. **Orders**
3. **Catalog**
   - Categories
   - Products
   - Option Groups
   - Availability
4. **Content**
   - Pages
   - Banners
   - Media Library
5. **Locations**
6. **Users & Roles**
7. **Settings**
8. **Audit Logs**
9. **Webhooks**

## 3) Core Screens + Functional Requirements

## 3.1 Dashboard
- KPI cards: today orders, revenue, avg prep time, cancellation rate.
- Live order queue summary by status.
- Quick actions: “Create Product”, “Publish Banner”, “Open Orders”.

## 3.2 Orders
### List view
- Columns: order no, customer, location, type, status, payment status, total, placed time.
- Filters: date range, location, status, payment status.
- Bulk action: export CSV (Cycle 1 optional).

### Detail view
- Header: status timeline + transition controls.
- Sections: items/options snapshot, pricing breakdown, customer details, notes.
- Actions: confirm, set preparing, ready, complete, cancel/reject with mandatory reason.
- Side panel: audit trail for this order.

## 3.3 Catalog
### Categories
- CRUD with sort order and active toggle.
- Drag/drop reordering.

### Products
- CRUD fields: name, slug, description, base price, category, location scope, active/available flags.
- Option group mapping and order.
- Image management (primary image, sorting, alt text).
- Preview card of how it appears in app.

### Option Groups + Options
- Group config: min/max selections, required toggle.
- Option rows with price delta and active state.

### Availability
- Per product quick toggles for temporary unavailability.
- Optional schedule windows (future cycle; in C1 keep manual toggle).

## 3.4 Content
### Pages
- Slug-based pages (e.g., home, about, contact, legal).
- Block-based editor (text, image, CTA, rich text) storing JSON blocks.
- Draft/published states.

### Banners
- Banner title, subtitle, image, CTA label+URL, schedule, active flag.
- Location targeting (all or specific locations).

### Media Library
- Upload via presigned URL.
- Search/filter by file type/date/uploader.
- Reuse existing assets across products/pages.

## 3.5 Locations
- Manage store details, contact info, service modes, and opening hours.
- Active/inactive location state.

## 3.6 Users & Roles
- User list with status and last login.
- Invite/create user, reset password, deactivate user.
- Assign one/multiple roles.
- Role permission matrix (view-only for non-super-admin).

## 3.7 Settings
- Tax rules (global/simple in Cycle 1).
- Currency/display settings.
- Order number format and prep time defaults.
- Customer-facing configuration text snippets.

## 3.8 Audit Logs
- Table: actor, action, entity, timestamp.
- Detail drawer with before/after JSON diff.
- Filter by actor/entity/date/action.

## 3.9 Webhooks
- Endpoint list with active state and event subscriptions.
- Test delivery action.
- Delivery history with status and retry count.

## 4) Roles in CMS
- **Super Admin**: full access including users/roles/settings/webhooks.
- **Manager**: everything except user-role escalation and critical system settings.
- **Staff (Ops)**: Orders full workflow, limited catalog availability edits.
- **Content Editor**: Content + media + limited catalog copy edits.
- **Viewer/Support**: read-only dashboards, orders, and logs.

## 5) UX/Interaction Rules (Cycle 1)
- Global search (orders/products/pages).
- Confirm dialogs for destructive/high-impact actions.
- Inline validation + clear error messages.
- Autosave for page editor drafts.
- Toast feedback for all mutations.
- Empty states with guided next actions.

## 6) API-to-CMS Mapping (Key)
- Orders list/detail/status actions -> `/v1/admin/orders*`
- Catalog screens -> `/v1/admin/categories|products|option-groups|options`
- Content screens -> `/v1/admin/pages|banners|media`
- Users/Roles -> `/v1/admin/users`, `/v1/admin/roles`
- Audit + webhooks -> `/v1/admin/audit-logs`, `/v1/admin/webhooks`

## 7) Non-Functional Requirements
- Permission checks enforced server-side (never UI-only).
- Paginated lists by default.
- Optimistic UI only where safe; fallback to authoritative refresh.
- Track all writes in audit logs.
- Accessibility baseline: keyboard nav + labeled controls.

## 8) Cycle 1 Delivery Backlog

## Must-have
1. Auth flow + RBAC in CMS shell
2. Orders list/detail/status transitions
3. Categories/products/options CRUD
4. Media upload and product image assignment
5. Pages/banners CRUD with publish state
6. Users list + role assignment
7. Settings basic module
8. Audit log explorer

## Should-have
1. Dashboard KPIs
2. Webhook endpoint management + test send
3. Advanced filtering + saved views for orders

## Later (post C1)
- Versioned content publishing workflow
- Granular field-level permissions
- Scheduled availability windows
- Multi-language content
- Promotion engine/coupons

## 9) Acceptance Criteria (Cycle 1)
- Admin can create full menu structure and publish changes visible via public API.
- Ops can process order from placed to completed with valid transitions only.
- Content editor can publish/update pages and banners without developer help.
- Super admin can manage users/roles and view complete audit trail.
- Unauthorized actions are blocked and logged.
