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

<Staging source="tms#254">

The dialog has an extra field, **External Waybill No (optional)**, for giving the master
your own number, such as one from the customer or the warehouse:

- **Filled in:** the master's external number is `CONS-` followed by what you entered
  (surrounding spaces are trimmed; a value that already starts with `CONS-` isn't prefixed
  twice). Leg sub-waybills still add `-LEG1`, `-LEG2` and so on.
- **Left empty:** as before, a `CONS-` number is generated for you.
- **Already used by another waybill:** you get "This external waybill number is already in
  use." and nothing is created.
- Searching the waybill list for the number you entered (without `CONS-`) finds the master.

Consolidating the same set of waybills again still updates the existing draft master
rather than creating a second one. If you enter a new number that time, the master and
its legs are renamed to it.

</Staging>

## Afterwards

- A new **master waybill** is created; planning, labelling and tracking all work against
  it;
- the originals remain, listed under **Consolidated Waybills** on the master's detail
  pane;
- to see masters without leg sub-waybills, use the **Master waybills only** filter.

<Staging source="tms#266">

When the master waybill's status moves on, the originals take the same status, so filtering and counting by status in the waybill list use the new status instead of the one they had when they were consolidated.

- When the master is **Canceled**, the originals aren't canceled with it, and an original that was already canceled stays as it is.
- The originals don't get tracking events of their own for this, so no [automation rule](../settings/automation) callbacks are sent for them. The master's tracking events still show in the originals' detail pane.
- Waybills consolidated earlier are brought up to date too: each original takes the master's current status, unless the original has a tracking event newer than the master's, in which case it keeps its own status.

</Staging>

:::warning
Consolidation can't be undone. Check the list and the recipient details first.
:::
