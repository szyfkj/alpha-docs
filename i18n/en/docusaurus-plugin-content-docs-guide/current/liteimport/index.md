---
id: index
title: Liteimport User Guide
sidebar_position: 1
---

# Liteimport Cross-border Purchasing

**Being written.**

Liteimport is for customers buying in China and shipping to Southeast Asia: order on
1688 through our purchasing service, or pre-alert parcels you bought yourself, and we
consolidate, bill and track them through to the last mile.

## How it relates to TMS

A pre-alerted parcel becomes a waybill in TMS — consolidation, billing and tracking
run through the same transport flow. The TMS side is covered in the
[TMS User Guide](/guide/tms/).

## Settling in Vietnamese dong (VND)

A company's default currency can be Vietnamese dong: in the dashboard, go to **Settings → Company → Company Information → Default Currency** and pick **VND - Vietnamese Dong**.

- **PromptPay QR codes charge in Thai baht.** PromptPay settles only in baht, so a VND order is converted at the current rate when its QR code is created, rounded up to the whole baht so it is never undercharged. The pay page shows both the order amount and what the QR code charges ("The QR charges ฿X"), and so does a payment QR code sent in chat. The order and its payment stay recorded in VND.
- **Refunds go back in baht at the original rate.** A refund of an order paid by QR code pays back baht at the rate the payment was charged at, not at the rate on the day of the refund. Partial refunds work the same way.
- **Bank transfers aren't converted.** A VND order paid by bank transfer is paid in VND, so make sure the company has an active VND receiving bank account.

### Reconciliation: amounts in bank statements

When you import a bank statement in **Reconciliation**, an amount that uses only one kind of separator (only dots, or only commas) is read like this: a separator that repeats (`1.500.000`, `1,500,000`), or appears once with exactly three digits after it (`500.000`, `1,500`), separates thousands; otherwise it is the decimal point (`1500.50`, `1500,5`). So `500.000` VND reads as 500,000, and `1,500` THB as 1,500. When an amount has both dots and commas (`1,234.56`, `1.234,56`), the last separator is still the decimal point.

## What you can read today

- For API integration, see the [Developer Guide](/tms/).
- [Custom domains](./custom-domains.md): put your storefronts, delivery app and
  mini-apps on your own domains.
- [Affiliate analytics](./affiliate-analytics.md): the referrals, orders and
  commissions your affiliates bring in.
- For other Liteimport operating instructions, please get in touch — this guide is
  still being written.
