---
id: tracking
title: The public tracking page
sidebar_position: 1
---

# The public tracking page

Recipients don't need an account. They type a waybill number and see where their goods
are.

## What they see

One box: **Enter waybill number**. Submitting shows that consignment's **tracking
timeline** — the same chain of events you see beside the
[waybill details](../waybills/detail).

If the number doesn't exist at all (a typo, or not a waybill number), the page says so:
"**No waybill found for …. Check the waybill number and try again.**" A real waybill that
hasn't been scanned yet shows "No tracking events available yet".

The page is titled "**&lt;Your company&gt; Delivery Tracking — Powered by Alpha Cargo**",
carrying your organization's name and logo.

## Three ways to open it

| Route | Notes |
|---|---|
| The general address | The default tracking page |
| With your organization's slug | Shows your name and logo |
| **Your own domain** | Fully your brand — see below |

The address takes a waybill number as a parameter, so a link **opens straight onto the
result** without anyone typing anything. That's the easiest thing to put in a customer
notification.

## Using your own domain

**Custom Domain Settings** lets the tracking page run on a domain of yours, keeping your
branding consistent.

1. Enter the domain you want to use.
2. Add the records it shows you at your DNS provider — each value has a **copy button**.
3. Come back and verify; success reports "Domain verified successfully!"

The same page configures the tracking page's **title and description**.

:::note
This page **isn't in the Settings menu** — reach it from the tracking page
configuration. See [Finding your way around](../getting-started/navigation).
:::

## Customer can't see any tracking?

| Symptom | Usually |
|---|---|
| Number not found | A typo, or they were given your internal reference instead of the waybill number |
| Found, but only one or two events | The goods genuinely haven't been scanned, or a scan didn't reach us |
| Stuck at an early step | A missed scan in the middle — fill it with [Add Tracking Event](../waybills/events) |

## Quoting and ordering

**Quoting, ordering and taking payment from customers happens through the API** — there
is no customer-facing ordering screen in the TMS back office. To connect that flow, see
the quoting and ordering chapters in the [Developer Guide](/tms/).
