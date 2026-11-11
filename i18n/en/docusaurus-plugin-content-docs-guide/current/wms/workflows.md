---
id: workflows
title: Workflows
sidebar_position: 3
staging: wms#24
---

# Workflows

The web console's **Workflows** page lists your company's warehouse workflows, such as
inbound, processing, consolidation and shipping out. It shows 20 per page; use the page
numbers below the list to move between pages. Above the list you see how many rows the
current page shows and the total number of workflows.

## Waybill numbers in consolidation workflows

A consolidation started from the TMS creates a workflow named "Consolidate 2 package(s)
into C0MC14661154 - TMS outbound": the name carries the waybill the packages go into, so
you can find it by typing the waybill number in the search box.

Consolidation workflows created earlier have no waybill number in their name
("Consolidate 2 package(s) - TMS outbound"). The list and the detail page title add it
after the name, for example "Consolidate 2 package(s) - TMS outbound · C0MC14661154";
searching by waybill number doesn't find these.

## Photos in workflow steps

Click a workflow in the list to open its detail page. Under **Workflow Steps**, each
completed step shows thumbnails of the photos the worker took in that step. Click a
thumbnail to see it enlarged on the same page:

- Inbound, processing and similar steps: **Photos**.
- Consolidation steps: **Photos before repacking**, then one group per consolidated box,
  titled "Box C0MC14661154A1 photos".

A step with no photos shows none.
