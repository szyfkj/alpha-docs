---
id: consolidate
title: Consolidating waybills
sidebar_position: 6
---

# Consolidating waybills

Several small consignments from one customer heading the same way can travel as one.
That's consolidation: the system creates a **master waybill**, with the originals
hanging off it.

## When you can consolidate

If **Consolidate Waybills** doesn't appear in the **Assign** dropdown, the conditions
aren't met. All of these must hold:

- **two or more** waybills ticked;
- all from the **same sender account**;
- all on the **same service**;
- all on the **same route**;
- **none of them already a consolidation master** — you can't consolidate a
  consolidation.

:::tip
Filter by sender account code and service first, then select all. Much quicker than
ticking rows one at a time.
:::

<Staging source="tms#253">

Once narrowed, tick **Select All Matching**: it selects every page of the search, not just the one shown, so the whole result is consolidated (up to 1,000 waybills at a time). **Select Current Page** selects only the page shown. See [The waybill list](./list#select-current-page-and-select-all-matching).

</Staging>

## How

1. Tick waybills that meet the conditions.
2. Click **Assign → Consolidate Waybills**.
3. Enter the new master's **recipient details** — name, phone and address, all
   required. This is where the combined consignment is actually going, usually the other
   side's hub or transfer point, not the recipient of any one original.
4. Click **Consolidate**.

## Afterwards

- A new **master waybill** is created; planning, labelling and tracking all work against
  it;
- the originals remain, listed under **Consolidated Waybills** on the master's detail
  pane;
- to see masters without leg sub-waybills, use the **Master waybills only** filter.

:::warning
Consolidation can't be undone. Check the list and the recipient details first.
:::
