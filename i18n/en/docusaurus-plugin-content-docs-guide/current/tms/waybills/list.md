---
id: list
title: The waybill list
sidebar_position: 1
---

# The waybill list

**Waybills** is where you land after signing in, and the page you'll use most.

## How the page is laid out

The left third is the waybill list; the right shows the selected waybill's details and
tracking. Click a row and the right-hand side follows.

Above the list are **Waybills** and the total count, with **Export** and **Import** in
the top right.

:::tip
Every row has a checkbox. **Clicking a row opens it; ticking a row selects it** for a
bulk action. Two different things.
:::

## Searching and filtering

The search box at the top matches waybill numbers, recipients and similar. **Filters**
(shown as **More** on narrow screens) opens the full set:

| Filter | What it narrows by |
|---|---|
| Service area | Delivery zone |
| Station | Departure / collection station |
| Contractor | The upstream party who gave you the goods |
| Subcontractor | The downstream carrier you handed them to |
| Sender code | Exact sender account code |
| Statuses | Multiple selection |
| Service | The service sold |
| Route | Your own organization's routes; defaults to **All routes** |
| Route leg | Each entry starts with **Route leg:**, so it isn't confused with a route; **Master waybills only** excludes the sub-waybills produced by legs |
| Date | A **From** / **To** range |
| Show only unassigned | Goods not yet handed to anyone |

Click **Search** to apply, **Clear** to reset.

## Bulk actions

Tick one or more rows and an action bar appears above the list showing how many are
selected, with an **Assign** dropdown on the right:

| Action | What it does |
|---|---|
| **Assign Subcontractor** | Hand these waybills to a carrier — see [Assigning a subcontractor](./subcontract) |
| **Add Tracking Event** | Record a status by hand — see [Adding tracking events](./events) |
| **Print Label** | Generate label PDFs — see [Printing labels](./labels) |
| **Cancel Waybill** | Void these waybills |
| **Consolidate Waybills** | Merge into one — see [Consolidating waybills](./consolidate). Hidden when the conditions aren't met |

The bar also totals the selected waybills' **count, weight, volume and largest
dimensions** — the fastest way to judge whether a vehicle will take them.

**Clear selection** unticks everything.

### Select Current Page and Select All Matching

Above the list are two checkboxes:

- **Select Current Page** ticks only the waybills shown on this page. Changing page clears them.
- **Select All Matching (N)** ticks every waybill the current search found, where N is the search's total, not just this page. The selection stays when you change page, the action bar shows the full count and totals, and the actions in the **Assign** dropdown apply to all of them.

Only one of the two can be ticked: ticking one unticks the other and replaces its selection. Unticking either clears the selection. Changing the search clears it too.

**Select All Matching** selects at most 1,000 waybills. When the search found more, you'll see "You can select up to 1000 waybills at a time. Narrow the search first." and nothing is selected; narrow it with the filters and tick it again.

## Exporting

**Export** exports the current filtered result to an Excel file. There is a per-export row limit; exceed
it and you're asked to narrow the filter first.

Which sheets and columns the file has is set by the **export template** your platform
administrator configures for your organization. With one template, **Export** starts
right away; with several, the **Export waybills** dialog opens first: pick one under
**Export template** and click **Export**. If none is set up yet you'll see "No export
template is set up for this organization. Contact your platform administrator."

Exporting needs your account to have an **Organization Unit**. Without one the export
doesn't start, and you see "Your account has no organization unit. Set one in Settings >
Sub-accounts, then export again." Ask your organization's admin to edit your account under
**Settings → Sub Accounts**, choose an **Organization Unit**, and export again.

Exports run in the background, so you don't have to wait on the page. Past exports are
listed next to the button, ready to download once they finish.

## Where waybills come from

Three sources:

1. **Import** — upload a spreadsheet, see [Importing waybills](./import);
2. **The API** — pushed in by your system or your customer's, see the
   [Developer Guide](/tms/waybills);
3. **Sub-waybills** — generated automatically when a consignment travels in legs.

:::note There is no "new waybill" button
Waybills are a bulk business, so the interface has no one-at-a-time entry form. If you
only have one, [import](./import) a single row.
:::
