---
id: index
title: Liteimport User Guide
description: "Liteimport cross-border purchasing user guide: buy through two channels, 1688 and Taobao, pre-alert parcels you bought yourself, and ship consolidated to Southeast Asia."
sidebar_position: 1
---

# Liteimport Cross-border Purchasing

**Being written.**

Liteimport is for customers buying in China and shipping to Southeast Asia: find products
from two channels, 1688 and Taobao, in the storefront and we buy them for you, or
pre-alert parcels you bought yourself, and we consolidate, bill and track them through
to the last mile.

## Shopping channels

The storefront offers two shopping channels: **1688** and **Taobao**. Products from both appear in the same search results and the same cart, and every product and order carries a **1688** or **Taobao** badge. After the order is placed, 1688 products are bought from the 1688 sellers and Taobao products are ordered on Taobao as a Taobao purchase; both are shipped to your company's China warehouse and consolidated from there. Search, ordering, purchasing and dashboard work for the Taobao channel are covered in [Taobao products](./taobao.md).

## How it relates to TMS

A pre-alerted parcel becomes a waybill in TMS — consolidation, billing and tracking
run through the same transport flow. The TMS side is covered in the
[TMS User Guide](/guide/tms/).

## Language of product information

When you browse in Thai, 1688 products found by keyword or image search, and the title,
attributes and options on a product's detail page, are shown translated into Thai.

<Staging source="liteimport#75">

Thai product information now comes straight from 1688. A product 1688 hasn't translated
into Thai yet is shown in the original Chinese; switch to English if you need to read it.
A product detail you viewed before may keep its earlier translation for a while.

</Staging>

Taobao provides product information in Chinese, English and Russian. In Thai or any other language, the English text is translated into the customer's language.

## Settling in Vietnamese dong (VND)

A company's default currency can be Vietnamese dong: in the dashboard, go to **Settings → Company → Company Information → Default Currency** and pick **VND - Vietnamese Dong**.

- **PromptPay QR codes charge in Thai baht.** PromptPay settles only in baht, so a VND order is converted at the current rate when its QR code is created, rounded up to the whole baht so it is never undercharged. The pay page shows both the order amount and what the QR code charges ("The QR charges ฿X"), and so does a payment QR code sent in chat. The order and its payment stay recorded in VND.
- **Refunds go back in baht at the original rate.** A refund of an order paid by QR code pays back baht at the rate the payment was charged at, not at the rate on the day of the refund. Partial refunds work the same way.
- **Bank transfers aren't converted.** A VND order paid by bank transfer is paid in VND, so make sure the company has an active VND receiving bank account.

### Reconciliation: amounts in bank statements

When you import a bank statement in **Reconciliation**, an amount that uses only one kind of separator (only dots, or only commas) is read like this: a separator that repeats (`1.500.000`, `1,500,000`), or appears once with exactly three digits after it (`500.000`, `1,500`), separates thousands; otherwise it is the decimal point (`1500.50`, `1500,5`). So `500.000` VND reads as 500,000, and `1,500` THB as 1,500. When an amount has both dots and commas (`1,234.56`, `1.234,56`), the last separator is still the decimal point.

## Purchase numbers in the dashboard

### 1688 order numbers

An order bought from several 1688 sellers has several 1688 order numbers.

- **Order page:** open an order under **Orders** in the dashboard. **1688 Order ID** in **Shipping & Tracking** shows one link per 1688 order number, each opening that order on 1688.
- **Searching by 1688 order number:** type the start of a 1688 order number in the **Orders** list's search box to find every order with a number that starts that way.
- **All orders (platform admin):** the search box finds orders by our order number or by a 1688 order number (again matching its start).

In the storefront, the customer's order page also lists all of the order's 1688 order numbers, separated by commas.

**Each 1688 order number's status:** when an order has several 1688 order numbers, the order page shows, in brackets after each number, the status 1688 reports for that purchase, such as `waitsellersend` (waiting for the seller to ship), exactly as 1688 sends it. Each purchase's status updates on its own: when one seller ships, only that number's status changes and the others keep theirs. An order with a single 1688 order number shows no brackets: its status is under **1688 Status**. An order with several 1688 order numbers has no **1688 Status** field.

### Taobao purchase IDs

The search boxes of the **Orders** list and of All orders also find an order by the start of its **Taobao purchase ID**. Type the beginning of the ID: digits from the middle of an ID find nothing. When only a few digits are typed and many IDs start with them, the search finds at most the newest 100 orders by Taobao purchase ID; type more digits to narrow it down.

The order page's **Taobao purchase** card shows the Taobao purchase ID, its status and tracking; see [Handling Taobao purchases in the dashboard](./taobao.md#handling-taobao-purchases-in-the-dashboard).

## What you can read today

- For API integration, see the [Developer Guide](/tms/).
- [Custom domains](./custom-domains.md): put your storefronts, delivery app and
  mini-apps on your own domains.
- [Affiliate analytics](./affiliate-analytics.md): the referrals, orders and
  commissions your affiliates bring in.
- [Taobao products](./taobao.md): searching, ordering and purchase status on the Taobao
  channel, and handling Taobao purchases in the dashboard.
- [Return and refund](./returns.md): send a bought order back to the seller and refund the
  customer before its parcels leave the China warehouse.
- For other Liteimport operating instructions, please get in touch — this guide is
  still being written.
