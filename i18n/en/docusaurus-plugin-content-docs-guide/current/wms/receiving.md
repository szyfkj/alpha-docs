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

<Staging source="wms#30">

## Receiving notes

What you type under **Notes** in **Inbound** is saved on the package: in **Inventory**, tap
the package's view icon (👁) and the **Package Details** show it under **Notes**, where you
can also edit it. When the same package is received again, the new note is added to the
existing notes on a new line; a note that is already there isn't added twice.

The note also goes into the waybill's remark in the TMS. A new waybill is created with it.
For a waybill the customer has already ordered, the note is added to the existing remark on
a new line; the customer's own text and the item description stay as they were.

A note entered in **Scan Inbound** is also added to the package's notes when the package has
already been received in this warehouse. In the TMS it is still recorded on the
arrived-at-hub event only.

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

## Scan Inbound

To tell the TMS a package has arrived without measuring or storing it, use **Warehouse
Worker** home → **Quick Actions** → **Scan Inbound** (Quick scan — notify TMS of package
arrival). Scan or type the package number and tap **Confirm Inbound**. On success it says
"C0MC14661154 scanned in", and the package gets an arrived-at-hub event in the TMS. The package must already have been received in this warehouse
with **Inbound**.

<Staging source="wms#19">

**Scan Inbound** no longer needs the package to have been received in this warehouse first.
A package this warehouse hasn't received is looked up in the TMS organizations mapped to
your warehouse (for accounts with no assigned warehouse, such as the owner or an
administrator, the organizations mapped to any of the company's warehouses):

- The number is a TMS package number, external number or sub-package number: that package
  is marked as arrived.
- The number is a waybill number and the waybill has one package: that package is marked as
  arrived.
- The number is a waybill number and the waybill has several packages: nothing is scanned
  in, and it says "C0MC14661154 is a waybill with 3 packages — scan a package label
  instead". Scan the package label.
- The number isn't found anywhere: "C0MC14661154 was not found in this warehouse or in the
  TMS — check the number".
- Your warehouse isn't mapped to a TMS organization yet: "Your warehouse is not mapped to
  any TMS organization — ask an admin to map it under Settings → API Keys".

A quick scan doesn't create a receiving record in this warehouse; to measure, photograph and
store a package, use **Inbound** as before. Error messages appear in the app's language.
**Scan Outbound** still only works for packages received in this warehouse.

</Staging>
