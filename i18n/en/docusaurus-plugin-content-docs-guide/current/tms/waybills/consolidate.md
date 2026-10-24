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

Once narrowed, tick **Select All Matching**: it selects every page of the search, not just the one shown, so the whole result is consolidated (up to 1,000 waybills at a time). **Select Current Page** selects only the page shown. See [The waybill list](./list#select-current-page-and-select-all-matching).

## How

1. Tick waybills that meet the conditions.
2. Click **Assign → Consolidate Waybills**.
3. Enter the new master's **recipient details** — name, phone and address, all
   required. This is where the combined consignment is actually going, usually the other
   side's hub or transfer point, not the recipient of any one original.
4. If you want, fill in **External Waybill No (optional)**; see below.
5. Leave **Auto-generate Virtual Package** on (the default) or turn it off; see below.
6. Click **Consolidate**.

### External waybill number

**External Waybill No (optional)** gives the master your own number, such as one from the
customer or the warehouse:

- **Filled in:** the master's external number is `CONS-` followed by what you entered
  (surrounding spaces are trimmed; a value that already starts with `CONS-` isn't prefixed
  twice). Leg sub-waybills add `-LEG1`, `-LEG2` and so on.
- **Left empty:** a `CONS-` number is generated for you.
- **Already used by another waybill:** you get "This external waybill number is already in
  use." and nothing is created.
- Searching the waybill list for the number you entered (without `CONS-`) finds the master.

Consolidating the same set of waybills again updates the existing draft master rather than
creating a second one. If you enter a new number that time, the master and its legs are
renamed to it.

### Auto-generate Virtual Package

**Auto-generate Virtual Package** is on by default: it creates one virtual package on the
master waybill that contains the packages of all selected waybills. The package's number is
the master's external number, its weight is the selected waybills' total, and its
dimensions are recorded as 0. The master has a package straight away, so you can
[add tracking events](./events) to it at once.

With it off, the master has no package until the warehouse physically consolidates the
goods and the consolidated package is created.

## Afterwards

- A new **master waybill** is created; planning, labelling and tracking all work against
  it;
- the originals remain, listed under **Consolidated Waybills** on the master's detail
  pane;
- to see masters without leg sub-waybills, use the **Master waybills only** filter.

**The master's route:** if a delivery route for consolidations is configured at the
station the waybills are currently at, the master takes that route. If none is, the master
keeps the route its waybills share: its detail pane shows the **Route**, it's split into
that route's legs, and [Add Tracking Event](./events) offers that route's events, which for
a cross-border route are the cross-border ones (container loading, customs and so on; see
[Cross-border waybills](./events#cross-border-waybills)).

:::warning
Consolidation can't be undone. Check the list and the recipient details first.
:::
