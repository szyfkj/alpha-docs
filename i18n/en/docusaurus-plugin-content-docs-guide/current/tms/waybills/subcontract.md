---
id: subcontract
title: Assigning a subcontractor
sidebar_position: 7
---

# Assigning a subcontractor

When your own vehicles can't take it all — or an area was always someone else's run —
hand the waybills to a **subcontractor**, your downstream carrier.

## How

1. Tick the waybills to hand over.
2. Click **Assign → Assign Subcontractor**.
3. The dialog shows how many waybills are involved. Pick a carrier from
   **Select Subcontractor** (the list pages).
4. Check **Assignment Details** — which subcontractor, how many waybills.
5. Click **Assign Subcontractor**.

Success confirms how many were assigned.

## Wrong status gets stopped

Not every status can be handed over. Tick one that can't and you're told **some waybills
are not in an assignable status**, with the offenders listed. Untick them, or move their
status on first.

Waybills already in transit get an extra check — the dialog briefly shows that it's
verifying them, and warns when some are **not at one of your stations**. That's a prompt
to confirm where the goods physically are, so you don't assign goods that are already in
someone else's hands.

<Staging source="tms#256">

## Waybills on a multi-leg route: assign the sub-waybills

When a waybill's route (your own route) has more than one leg, the master waybill can't be handed to a subcontractor whole: assign its sub-waybills instead. Tick such a master waybill and the dialog says how many waybills are on a route with more than one leg, asks you to assign their sub-waybills instead and lists them; **Assign Subcontractor** can't be clicked. Untick them, find the sub-waybills with the **Route leg** filter in the waybill list, and assign those.

Sub-waybills of different legs can be assigned together. Waybills with no route, or on a one-leg route, are assigned whole as before.

## The route your subcontractor sees

Every organization sees its own route on a waybill. Once a waybill is handed over, the subcontractor doesn't see your route: the system picks one of the subcontractor's own routes, by rules the Alpha Cargo platform sets up for that subcontractor. When no rule matches, the waybill has no route on their side. Your route stays as it is.

</Staging>

## No subcontractors to pick

**No subcontractors available** means none are set up yet. Add them under
**Partners → Subcontractors** first.

## Whose label format?

Carriers want different label layouts. A subcontractor can have its own label template,
so what you print after assigning is the format they asked for. See
[Printing labels](./labels).

:::note Don't mix them up with contractors
A **subcontractor** is downstream — goods go out to them. A **contractor** is upstream —
goods come in from them. Adjacent menus, opposite directions.
:::
