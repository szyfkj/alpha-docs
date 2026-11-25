---
id: affiliate-analytics
title: Affiliate analytics
sidebar_position: 3
---

# Affiliate analytics

**Growth → Affiliate analytics** shows, day by day, the referrals, orders and
commissions your affiliates bring in, so you can see how they perform over time.
Anyone who can open **Affiliates** can open it.

An account that can see affiliates but not orders or customers (a partner agency,
say) gets affiliate analytics as its home page. Such an account sees only the
referral codes it owns, and only counts and totals, never individual customers.

## Filters

Three drop-downs sit at the top right:

- **All affiliates**: narrow it to one affiliate.
- **All referral codes**: narrow it to one referral code; once you pick an affiliate,
  only its codes are listed.
- **Period**: Last 7 days, Last 30 days (the default), Last 90 days, Last 12 months.

## Figures

Each figure is compared with the previous period of the same length.

| Figure | Meaning |
|---|---|
| New referrals | Customers who arrived through a referral code in the period |
| Converted referrals | Referred customers who paid their first order in the period |
| Paid orders | Orders referred customers paid in the period |
| GMV | The value of those paid orders |
| Ordering customers | Referred customers with a paid order in the period, each counted once |
| Pending, Approved and Paid commissions | Commissions created in the period, by their current status |

## Charts

- **Referrals and conversions**: new and converted referrals per day.
- **GMV from paid orders**: GMV per day.
- **Commissions**: commissions created per day, stacked by pending, approved and paid.

<Staging source="liteimport#91">

## Export as CSV

The **Export** button next to the filters downloads what the page shows as a CSV
file, for the affiliate, referral code and period you've selected. It's disabled
while the data loads or if loading fails.

- One row per day, the same days the charts use.
- The columns are Date, New referrals, Converted referrals, Paid orders, GMV,
  Ordering customers, and Pending, Approved and Paid commissions. Money columns
  name the currency, e.g. `GMV (THB)`.
- Headers use the dashboard's language. The file is UTF-8 with a BOM, so Excel
  shows Chinese, Thai and Vietnamese names correctly.
- The file is named `affiliate-analytics_<from>_<to>.csv`; with a referral code
  selected, the code goes in the middle, e.g.
  `affiliate-analytics_AGA10_2026-10-08_2026-11-07.csv`.
- There's no totals row: a customer who orders on several days is counted on each
  of them, so adding up Ordering customers day by day would overcount. The figures
  at the top of the page give the totals.

</Staging>
