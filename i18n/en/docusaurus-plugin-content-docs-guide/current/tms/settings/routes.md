---
id: routes
title: Routes and product categories
sidebar_position: 3
---

# Routes and product categories

## Routes

**Settings → Routes** manages how waybills travel — a **route** is made of **legs**.

The page shows **Total Routes**, **Total Legs** and **Routes with Legs**.

Goods crossing regions don't go direct; they move leg by leg, and the system generates a
**sub-waybill** for each. Those appear on the
[waybill detail pane](../waybills/detail).

### Leg type

Every leg has a **Leg Type**: **Domestic** or **Cross-border**, chosen in the **Add Leg** /
**Edit Leg** dialog and Domestic by default. The leg list shows it in its own column. Legs
that existed before are Domestic.

Waybills on a cross-border leg are tracked with cross-border events (container loaded,
customs cleared, …): when you [add a tracking event](../waybills/events#cross-border-waybills)
to them, you choose from the cross-border list. A waybill counts as cross-border if its own
leg is cross-border, or if any leg of its route is.

[Importing waybills](../waybills/import) lets you pick a route; when only one is
available it's selected automatically.

### Deleting

Deleting a route or a leg asks for confirmation. Deleting a leg warns that **every route
using it is affected** — check before confirming.

## Product categories

**Settings → Product Categories** classifies the goods your waybills carry, as a
**category tree** with parents and children.

**Add Category** creates one. With none yet, the page prompts you to add your first.

Categories are used to:

- set a consignment's category inline on the waybill detail pane;
- group goods for statistics and analysis.

Deleting a category asks for confirmation.

:::tip
Two or three levels is plenty. The deeper the tree, the more often the person keying in
picks the wrong branch — and the worse the statistics get.
:::
