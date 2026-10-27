---
id: labels
title: Printing labels
sidebar_position: 5
---

# Printing labels

The label is the sheet stuck to the goods — it carries the barcode drivers scan.

## Batch printing

1. Tick the waybills on the list.
2. Click **Assign → Print Label**.
3. The dialog tells you how many waybills will go into one PDF. Confirm with
   **Print N Labels**.
4. All the labels come back as **a single PDF** — download and print straight through.

## Waybills in "Waybill Created" status are skipped

The usual surprise: you tick 20 and only 15 print.

The dialog says plainly **how many were skipped for being in "created" status**, and
lists them marked **skipped**. Those waybills haven't been confirmed yet, so they have
no printable label number.

The fix is to move them on to a confirmed status and print again.

## What the label looks like

Layout comes from a **label template**, configured under **Settings → Label Templates**.
You can set a default, and use [template selection rules](../settings/labels-integrations#template-selection-rules)
to pick other templates by route, service and subcontractor — so goods handed to a carrier
print in the format that carrier wants.

The template editor is visual; see the settings chapter.
