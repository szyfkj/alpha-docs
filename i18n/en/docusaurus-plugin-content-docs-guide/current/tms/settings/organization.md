---
id: organization
title: Organization settings
sidebar_position: 1
---

# Organization settings

**Settings → Organization** holds organization-level configuration across five tabs.

| Tab | Covers |
|---|---|
| **General** | Organization details, logo, waybill numbering |
| **Units** | The units under your organization |
| **Subscription** | Your current plan, and requesting a change |
| **Subcontractor** | Your configuration as a subcontractor |
| **API Credentials** | Keys for API integration |

## General

Name, contact details and logo. Logos may be JPEG, PNG or PDF and must be
**under 5MB** — the wrong type or size is rejected on the spot.

### Waybill numbering

How waybill numbers are generated. Saving confirms "Waybill numbering updated
successfully."

:::warning
Changing the scheme only affects waybills created **afterwards**; existing numbers stay
as they are. Changing it repeatedly makes your numbering look chaotic — settle on one.
:::

## Units

The units under your organization. The **Station** you choose in delivery planning comes
from here, and a station's address is the route origin — so fill addresses in fully.
**A station without coordinates can't have a route planned.**

A unit that waybills, users or routes still refer to can't be deleted: you'll see
"Waybills, users or routes still refer to this unit, so it can't be deleted." Move them
to another unit first.

## Subscription

Shows what your current plan includes. Request a change here; you'll be told the request
was submitted for review and that you'll hear once it's processed.

A menu you can't see is often a plan that doesn't include it — see
[Finding your way around](../getting-started/navigation).

## API credentials

The keys used for API integration. You can also **regenerate** them.

:::danger
Regenerating **invalidates the current credentials immediately** and will break running
integrations. You'll be asked to confirm. Tell whoever integrates with you before doing
it.
:::

How to use the API is in the [Developer Guide](/tms/authentication).
