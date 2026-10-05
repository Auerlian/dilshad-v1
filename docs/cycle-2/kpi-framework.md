# Dilshad v1 — Cycle 2 KPI Framework (MVP)

Date: 2026-03-21  
Owner: PM + Data/Analytics  
Purpose: Implementation-ready KPI tree aligned to Cycle 2 MVP release in <=4 weeks.

---

## 1) North-star, business outcomes, and guardrails

## North-star metric
**Weekly Direct Revenue per Active Location**
- Why: combines conversion + order value + retention outcomes in one operationally meaningful metric.

Formula:
`weekly_direct_revenue = sum(order_total where channel='direct' and order_status in completed window=7d)`

## Primary business outcomes (required by lead feedback)
1. **CVR** (visitor -> order conversion rate)
2. **AOV** (average order value)
3. **Repeat rate**
4. **Reorder interval**
5. **Checkout completion rate**

## Guardrail metrics
- Payment failure rate
- Order cancellation/rejection rate
- Page performance (LCP/INP/CLS trend)
- Support contact rate per 100 orders

---

## 2) KPI tree (hierarchical)

```text
North Star: Weekly Direct Revenue per Active Location
├── Acquisition Efficiency
│   ├── Qualified sessions
│   └── Menu view rate
├── Conversion
│   ├── Add-to-cart rate
│   ├── Checkout start rate
│   └── Checkout completion rate   [PRIMARY]
├── Order Economics
│   ├── Average order value (AOV)  [PRIMARY]
│   ├── Upsell attach rate
│   └── Discount leakage rate
├── Retention
│   ├── 30-day repeat rate         [PRIMARY]
│   ├── Reorder interval (days)    [PRIMARY]
│   ├── Reorder usage share
│   └── Post-checkout account claim rate
└── Loyalty Health
    ├── Points earn coverage
    ├── Reward redemption rate
    └── Redemption conflict rejection rate
```

---

## 3) Metric definitions, formulas, owners, targets

## 3.1 Primary KPIs

| KPI | Definition | Formula | Owner | MVP target (Week 4 pilot) |
|---|---|---|---|---|
| CVR | Sessions that produce completed order | `completed_orders / unique_sessions` | PM/Growth | >= 4.0% pilot baseline |
| Checkout completion rate | Checkout starts that complete | `checkout_completed / checkout_started` | PM/FE | >= 60% (or +10% vs pre-pilot baseline) |
| AOV | Mean gross order value (before refunds) | `sum(order_total)/count(completed_orders)` | PM/Ops | >= baseline +5% via upsell/loyalty nudges |
| Repeat rate (30d proxy in MVP) | Returning customers with >=2 completed orders | `customers_2plus_orders / customers_1plus_orders` | PM/CRM | establish baseline + upward trend |
| Reorder interval | Median days between order N and N+1 | `median(order_date_n+1 - order_date_n)` | PM/Data | baseline established; trend downward |

Notes:
- 30-day metrics will start as rolling proxy due to early-life data; track weekly cohort trend and annotate confidence.

## 3.2 Leading indicators (week-by-week)

| Indicator | Why it matters | Target by end of W2 | Target by end of W4 |
|---|---|---|---|
| Menu view -> add-to-cart rate | Early funnel quality | >= 18% | >= 22% |
| Add-to-cart -> checkout start | Cart trust/friction | >= 45% | >= 50% |
| Checkout error rate | Technical friction | <= 6% | <= 3% |
| Post-checkout account prompt CTR | Retention setup | n/a (not live) | >= 25% |
| Reorder CTA click-through | Repeat behavior seed | n/a (not live) | >= 12% |
| Points shown coverage | Loyalty visibility | >= 70% eligible checkouts | >= 95% |

## 3.3 Guardrails

| Guardrail | Formula | Alert threshold |
|---|---|---|
| Payment failure rate | `payment_failed / payment_attempted` | > 5% for 30 min |
| Cancellation+rejection rate | `(cancelled+rejected)/placed_orders` | > 8% daily |
| P95 quote latency | p95 `/orders/quote` response | > 800ms sustained |
| P95 order create latency | p95 `POST /orders` | > 1500ms sustained |
| Support tickets per 100 orders | `support_contacts / completed_orders * 100` | > 12 |

---

## 4) Event instrumentation framework (canonical)

## 4.1 Required event list (MVP)

### Discovery and menu
- `menu_viewed`
- `category_selected`
- `item_viewed`
- `item_customization_opened`

### Cart and checkout
- `item_added_to_cart`
- `cart_viewed`
- `checkout_started`
- `checkout_step_completed` (step_name: address|slot|payment|review)
- `checkout_validation_error` (field, reason_code)
- `checkout_completed`
- `checkout_abandoned` (timeout logic)

### Orders and operations
- `order_created`
- `order_status_changed`
- `order_completed`
- `order_cancelled`

### Retention and loyalty
- `post_checkout_account_prompt_shown`
- `post_checkout_account_claimed`
- `reorder_cta_clicked`
- `reorder_started`
- `reorder_completed`
- `loyalty_points_awarded`
- `reward_redeem_attempted`
- `reward_redeemed`
- `reward_redeem_rejected` (reason_code)

## 4.2 Mandatory event properties
For every event:
- `event_id` (UUID)
- `event_time` (ISO8601)
- `user_id` (nullable for guest)
- `session_id`
- `location_id`
- `order_id` (nullable)
- `device_type`
- `platform` (web)
- `experiment_flags` (if any)

Commerce-specific fields (when applicable):
- `cart_value`, `order_value`, `currency`
- `promo_code`, `reward_id`
- `payment_method_type`

## 4.3 Instrumentation quality rules
- Critical conversion events exactly-once (dedupe by `event_id`).
- Event ingestion delay <= 5 minutes for pipeline, dashboard freshness <= 30 minutes.
- Any missing mandatory property rate > 1% triggers data quality alert.

---

## 5) KPI ownership and operating cadence

## 5.1 Ownership (RACI-lite)
- **PM**: KPI definitions, target changes, weekly review.
- **FE lead**: checkout completion, client-side errors, interaction funnel.
- **BE lead**: payment/order reliability, latency, idempotency metrics.
- **Ops manager**: cancellation causes, status SLA.
- **Data analyst (or PM acting)**: dashboard QA, annotations, cohort reads.

## 5.2 Review cadence
- **Daily (launch window):** checkout completion, failures, cancellations, latency.
- **Twice-weekly:** CVR/AOV funnel breakdown by location/device.
- **Weekly:** retention trends (repeat proxy, reorder interval, account claim rate).

---

## 6) Dashboard layout (implementation spec)

## Dashboard A — Executive pulse (single screen)
1. Revenue (7d), orders, AOV.
2. CVR + checkout completion trend.
3. Repeat proxy + reorder interval trend.
4. Guardrail alert tiles.

## Dashboard B — Funnel diagnostics
1. Sessions -> menu_viewed -> add_to_cart -> checkout_started -> checkout_completed.
2. Drop-off by device and location.
3. Checkout validation errors by field/reason.

## Dashboard C — Retention/loyalty
1. Post-checkout account prompt shown -> claimed.
2. Reorder CTA click -> reorder completed.
3. Points awarded coverage, redemption rate, rejection reasons.

---

## 7) Data contract checks (release gate)

Before MVP release candidate, all must pass:
1. Event dictionary published and versioned.
2. 100% of primary KPI formulas reproducible from warehouse tables.
3. Sample trace of one order journey shows complete event chain.
4. Null-rate for mandatory fields < 1% over 24h staging traffic.
5. Dashboard numbers reconcile with transactional DB within +/-1.5% for completed orders and revenue.

---

## 8) KPI-linked experiment backlog (first 2 post-launch tests)

1. **Checkout layout test** (single-page vs progressive sections)
   - Primary KPI: checkout completion rate.
   - Guardrail: payment failure rate.
2. **Reorder CTA placement test** (confirmation top vs account top)
   - Primary KPI: reorder CTA CTR, reorder completed rate.
   - Guardrail: no reduction in immediate confirmation comprehension (support contact rate).

---

## 9) Confidence and caveats

- Early repeat/reorder metrics in first 4 weeks are directional; annotate cohort maturity in all reads.
- Use per-location segmentation to avoid Simpson’s paradox in aggregate metrics.
- If data quality check fails, KPI decisions pause until issue is resolved and backfill complete.
