---
id: receiving
title: Receiving packages
sidebar_position: 2
---

# Receiving packages

Warehouse staff receive packages on their phone: **Warehouse Worker** home → **Inbound**
(receive, measure, and place package in storage). Pick the warehouse, scan or type the
tracking number, fill in dimensions, weight and photos, then scan or type the code of the
storage location under **Location** and tap **Receive Package**.

<Staging source="wms#16">

For roles other than **Warehouse Worker** (such as **Manager** or **Administrator**),
**Inbound** opens with the warehouse already selected when there's only one to choose:
the one warehouse assigned to the account or, failing that, the only warehouse the account
can see. The location this device last used in that warehouse is filled in too. You can
still switch to another warehouse; with several to choose from, you pick one as before.

</Staging>

## Which locations accept packages

A package can only be received into a location that is both:

- of type **Bin**, and
- in status **Available** or **Occupied**.

Locations of any other type (such as **Rack**, which is also the default type for a new
location) and locations that are **Reserved** or under **Maintenance** can't be used for
receiving. To receive into such a location, ask an administrator to change its type to
**Bin** or set its status back to **Available**.

When the code doesn't exist in the selected warehouse, the hint under **Location** says
"Unknown location: B-01-01".

<Staging source="wms#11">

When the location exists but can't take packages, the hint under **Location** and the error
after tapping **Receive Package** say why, instead of "Unknown location":

- Wrong type: "B-01-01 is type Rack. Packages can only be received into Bin locations."
- Unusable status: "B-01-01 has status Maintenance and can't receive packages."

"Unknown location" now only appears when the selected warehouse has no location with that
code.

</Staging>
