---
id: faq
title: FAQ
sidebar_position: 4
---

# FAQ

## Interface

**I can't see a menu.**
Two gates: your organization's plan and your account's permissions. Ask a colleague
whether they can see it — see [Plans and features](./features).

**A colleague mentions a page I can't click to.**
A few pages genuinely aren't in the menus and are reached from elsewhere: Receiving Bank
Accounts (from Payments), Sender Account Types (from Sender Accounts), and Custom Domain.
See [Finding your way around](../getting-started/navigation).

**Settings shows "Coming Soon".**
Going to the settings root shows a placeholder. The real settings are all in the
**Settings** dropdown.

## Waybills

**How do I create a single waybill by hand?**
There's no single-entry form. [Import](../waybills/import) one row, or use the API.

**My import produced the wrong number of waybills.**
In the CSV **one row is one package**, not one waybill. Rows sharing an external waybill
number are grouped. See [Importing waybills](../waybills/import).

**Some waybills were skipped when printing labels.**
Anything in "Waybill Created" status can't be printed; the dialog lists them. See
[Printing labels](../waybills/labels).

**"Consolidate Waybills" doesn't appear.**
Five conditions must hold at once: two or more waybills, same sender account, same
service, same route, and none already a master. See
[Consolidating waybills](../waybills/consolidate).

<Staging source="tms#307">

**"Consolidate Waybills" is greyed out.**
The reason is shown under it: different services, sender accounts or routes, or a waybill with no service. A consolidation master can be consolidated again. See [Consolidating waybills](../waybills/consolidate).

</Staging>

**Assigning a subcontractor says the status isn't assignable.**
Some selected waybills can't be handed over in their current status; the dialog lists
them. Untick them or move them on first.

## Delivery

**The planning page is empty.**
All three of station, service area and fleet must be chosen before anything loads. See
[Delivery planning](../delivery/planning).

**The driver dropdown is empty.**
It only lists drivers whose vehicle type matches the trip. Check the vehicle type on the
[driver's record](../partners/drivers).

**The route won't plan.**
Either the station has no coordinates, or the delivery has no waybills yet.

**The tracking map is blank.**
The waybills on that trip have no usable coordinates — go to
[Address preprocessing](../delivery/address).

## Drivers

**The scanner's event type dropdown has only one option.**
That's normal — it's filtered by permission. For more types, grant the matching scan
sub-permissions under **Settings → Sub Accounts**.

**The camera won't open.**
Use Chrome or Edge and allow camera access. Failing that, enter the waybill number
manually.

**A driver sent photos to LINE and nothing happened.**
That driver isn't registered yet. See [Delivery confirmation](../driver/pod).

**The confirmation link expired.**
Confirmation links last 7 days; resending the package photos generates a new one.
Registration invitations last about 2 days.

## Billing

**I selected billing lines but can't create an invoice.**
One invoice goes to one party. Filter by contractor or sender first, then select. See
[Billing records](../billing/billings).

**I changed a rate card and old billing didn't change.**
Existing billing is never recalculated. Settle the old, then change the price. See
[Rate cards](../billing/rate-cards).

**The money arrived but doesn't match the system.**
Check whether the payment was recorded on [Payments](../billing/payments), then match the
bank entry in [Reconciliation](../billing/reconciliation). Asking customers to include a
reference saves a lot of this.

**The profit figure looks wrong.**
Profit is revenue minus carrier costs minus operating costs. Unrecorded costs inflate it.
See [Reports and profit](../billing/reports).

## Customer tracking

**A customer can't find their number.**
Check they were given the **waybill number**, not your internal reference.

**I want tracking on my own domain.**
You can — see [The public tracking page](../customers/tracking).

## Integration

**I want my system to hear about status changes.**
Configure a rule under **Settings → Automation**; see
[Automation rules](../settings/automation) and the
[Developer Guide](/tms/webhooks).

**I want to call the API.**
Keys live under **Settings → Organization → API Credentials**; usage is in the
[Developer Guide](/tms/).
