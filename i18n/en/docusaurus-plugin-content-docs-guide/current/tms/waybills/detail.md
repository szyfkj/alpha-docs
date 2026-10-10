---
id: detail
title: Waybill details and packages
sidebar_position: 3
---

# Waybill details and packages

Click any row in the waybill list and its details appear on the right, with the tracking
timeline beyond that.

The detail pane has two tabs: **Details** and **Billings**.

## The Details tab

The top half carries the basics: sender, recipient, address, service, product category,
package count.

A couple of fields are **editable in place** — hover and a small pencil appears:

| Field | Note |
|---|---|
| Service | Change what this consignment is sold as |
| Product category | Change its classification |

### Packages

The **Packages** block lists every piece, each with its own package number.

- The copy icon next to a package number copies it to the clipboard;
- **Edit dimensions & weight** — change length, width, height and weight;
- **Edit handling for load planning** — whether the piece can be stacked, laid on its
  side and so on, which feeds [delivery planning](../delivery/planning);
- an **Ext. No.** is shown when one exists;
- **package photos** uploaded by the driver appear here.

<Staging source="tms#208">

In each package's **Products** list, a product that carries custom data (an HS code,
country of origin or batch number for customs, for example) gets a small box underneath
listing it as name / value rows, read-only. After 3 rows the rest collapse: click
**Show all (n)** to expand and **Show less** to fold them again. The data comes from the
integration that created the waybill (see the developer guide's
[Waybills API](/tms/waybills)) and can't be edited on the page; products without it
show no box.

</Staging>

### Sub-waybills

When a consignment travels in legs, the system generates a **sub-waybill** per leg. The
**Sub-waybills** block expands to list each one's waybill number, status, package count
and matching leg.

The copy icon gives you the sub-waybill number.

### Consolidated waybills

If you've opened a **consolidation master**, an extra **Consolidated Waybills** block
lists the originals merged into it. See [Consolidating waybills](./consolidate).

## The Billings tab

Switch to **Billings** to see the charges this consignment generated. How that money
travels on to invoices and payments is covered in the billing chapter.

## The tracking timeline

The far column lists every status event for this consignment, newest first: when, where,
what. It is exactly what the customer sees on the public tracking page.

Events come from three places: driver scans, manual entry (see
[Adding tracking events](./events)), and connected systems pushing them in.

The full status vocabulary is in the [status reference](./statuses).
