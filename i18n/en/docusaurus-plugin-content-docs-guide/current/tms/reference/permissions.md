---
id: permissions
title: Permission reference
sidebar_position: 1
---

# Permission reference

Permissions are ticked per person under **Settings → Sub Accounts**. The full procedure
is in [Sub accounts and permissions](../settings/sub-accounts).

## Every permission

| Group | Sub-permission | What it allows |
|---|---|---|
| **Scan** | | Scanning |
| | Pickup | Pickup scanning |
| | Inbound | Inbound scanning |
| | Sort | Sorting |
| | Outbound | Outbound scanning |
| | Delivery | Delivery scanning |
| **Waybills** | | Create, update, cancel, and assign waybills to subcontractors |
| **Deliveries** | | Create deliveries and assign drivers |
| | Address Preprocessing | Preprocess delivery addresses |
| | Create | Create new deliveries |
| | Assign | Assign drivers to deliveries |
| **Customer Service** | | Manage customer inquiries and support tickets |
| | Customer Channels | Manage customer communication channels |
| | Driver Channels | Manage driver communication channels |
| **Partner Management** | | Manage partnerships and collaborations |
| | Subcontractor Management | Manage subcontractor organizations |
| | Drivers | Manage drivers and their assignments |
| **System Settings** | | Manage system-wide settings and configurations |
| | User | Manage users and their permissions |
| | Organization | Manage organizations and their settings |
| | Automation | Manage automation settings and workflows |
| | Service Area | Manage service areas and their settings |
| | Label Template | Manage label templates and their settings |
| **Billing** | | Open the Billing menu and do its everyday work: billing records, invoices, billing profiles, cycle runs, costs and reports |
| | Rate Cards | Create, change or delete the rate cards every charge is priced from |
| | Payments | Record a payment against an invoice, verify a bank slip, or mark an invoice paid |
| | Wallet Adjustment | Credit or debit a sender account's prepaid wallet by hand, without a payment behind it |

## A few rules

**The organization owner holds everything.** Nothing to tick, and it can't be changed.

**A sub-permission opens the menu.** Granting only Billing → Payments makes the Billing
menu appear.

**Scanning is granted per station.** It decides what a driver can choose in the scanner's
event type dropdown — see [Driver scanning](../driver/scan).

<Staging source="tms#350">

**Scan → Override Conflicts: record an event despite a conflict.** When you **Add Tracking Event** from the waybill list and the new event conflicts with an existing one (for example, In Transit on a waybill that's already Delivered), the system stops it. A member with this sub-permission gets the same **Conflicting Events Detected** prompt as the organization owner and can click **Create Anyway** to record it; members without it only see the error and can't record the event. Ticking the whole Scan group includes it. In the team member list it shows as **Scan: Override Conflicts**.

</Staging>

**There is a second gate beyond permissions.** If a menu is still missing with the
permission granted, the feature isn't in your organization's plan — see
[Plans and features](./features).
