---
id: services
title: Services and service areas
sidebar_position: 2
---

# Services and service areas

## Services

**Settings → Services** defines the delivery services you sell and how each one prices.

The top of the page shows **Total Services**, **Service Types in Use** and their
distribution.

After creating a service you're told you can now configure **provider services** and
**add-ons** — a service can be backed by third-party carrier capability and carry extra
options.

Services are required in a lot of places: [importing waybills](../waybills/import) needs
one, [consolidation](../waybills/consolidate) requires the **same service**, and rate
cards attach to them. So services are the layer to settle first.

## Service areas

**Settings → Service Areas** manages delivery zones, with **Total Service Areas**,
**Active Service Areas** and **Postal Codes Covered** across the top.

**Add Service Area** creates one. An area is defined by the postal codes it covers: pick
the **Country Code**, type codes in the **Postal Codes** box (several separated by
commas), then press **+** or Enter to add them to the list. A code that's typed but not
added doesn't count, and every area needs at least one postal code.

Clicking **Create Service Area** or **Update Service Area** with no postal code or no
country shows **Cannot Save** with what's missing ("Add at least one postal code with
the + button before saving." or "Select a country before saving.") and doesn't submit
the form.

Service areas are used for:

- one of the three required selectors in [delivery planning](../delivery/planning) — a
  trip stays within one area;
- a filter on the [waybill list](../waybills/list);
- a condition on [automation rules](./automation).

:::tip Don't slice them too finely
The more areas you cut, the more often planning turns up "two consignments for this zone
today". Draw them the way you actually run vehicles, and split later if you must.
:::
