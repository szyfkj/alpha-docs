---
id: sub-accounts
title: Sub accounts and permissions
sidebar_position: 5
---

# Sub accounts and permissions

**Settings → Sub Accounts** manages your colleagues' accounts and what each of them can
do.

## The list

Each person shows a status (**Active** / **Inactive** / **Suspended**) and their granted
permissions. Long lists collapse into "**+N more**". Someone with none shows
**No Permissions** — that account can see almost nothing after signing in.

## Adding someone

Create the account with their email and details; the system sends an invitation and they
set their own password. See [Signing up and signing in](../getting-started/signup).

## Ticking permissions

Permissions come in groups, and groups have finer sub-permissions. **Ticking the group
grants all of it**, or tick only the sub-permissions you want.

| Group | What it covers | Sub-permissions |
|---|---|---|
| Scan | Scanning | By station: Pickup, Inbound, Sort, Outbound, Delivery |
| Waybills | Create, update, cancel, assign to subcontractors | — |
| Deliveries | Create deliveries, assign drivers | Address Preprocessing / Create / Assign |
| Customer Service | Customer enquiries and tickets | Customer Channels / Driver Channels |
| Partner Management | Partners | Subcontractor Management / Drivers |
| System Settings | System configuration | User / Organization / Automation / Service Area / Label Template |
| Billing | The Billing menu and its everyday work | Rate Cards / Payments / Wallet Adjustment |

## Things worth thinking about

**Scan permissions are granted per station.** Give a sorter only Scan → Sort and the
event type dropdown on their phone shows only sorting. That's exactly why
[driver scanning](../driver/scan) can show a one-item list — it isn't a fault.

**The Billing group is the menu's master switch.** Without it, the whole Billing menu is
absent from the bar.

**Wallet Adjustment is separate for a reason.** It allows someone to **change a
customer's prepaid balance with no payment behind it**. Think before granting it.

**The organization owner holds every permission** and can't be configured here.

**The owner can edit their own details.** When the organization owner chooses **Edit** on their own row, they can change their name, phone and organization unit and save with **Update User**. Every permission box is ticked and greyed out, with the note "The owner has all permissions; they can't be changed." Saving never changes the owner's permissions.

**Other members can't change their own account.** When someone who isn't the owner edits their own row, the save is refused with "You cannot change your own account here. Ask an organization owner." Ask the organization owner to make the change.

## Deactivating and suspending

When someone leaves, **deactivate** the account rather than deleting it — the waybills,
deliveries and actions they handled still reference it.
