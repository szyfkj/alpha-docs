---
id: mobile-pick
title: Picking
sidebar_position: 6
staging: wms#49
---

# Picking

A **Pick** task takes a set of packages off their shelves and brings them together at one
target location. When the pick ends, the WMS creates a consolidation task for the packages
that were picked.

## Creating a pick task

On the web console's **Workflows** page, click **Create Workflow**, choose the type
**Pick**, tick the packages to pick, then click **Create Workflow**. If you tick
**Unpack & repack allowed (拆包合箱)**, that setting carries over to the consolidation task
created when the pick ends.

The new task appears in the workflow list (the type filter also has **Pick**), and a worker
runs it on the phone.

## Picking on the phone

On the phone's **Warehouse Worker** home, under **Workflow Actions**, tap **Pick** and open a
pick task. The top shows the progress, "Picked x / y", and the **Packages** list below is
sorted by location and shows where each package is now. A pick has three steps:

1. **Staging**: scan or type a location (a cart or a staging spot; any location in the
   warehouse will do) and tap **Start picking**. Once the first package is picked, the
   staging location can't change.
2. **Pick**: scan the packages one by one. Each scanned package moves to the staging
   location at once and the progress goes up. A package that isn't in the task is refused
   ("… is not in this pick"), and so is one that hasn't been received into this warehouse.
3. **Target**: scan or type the target location (any location) and tap **Finish pick**.
   Every picked package moves to the target location, the task ends, and the phone shows
   "Pick finished, consolidation task created".

Progress is saved on every scan, so the same task can be continued on another phone.

## Finishing early

When packages can't be found, tap **Finish early** in step 2. At least one package must be
picked, and you enter a **Reason** for the missing ones; then scan the target location and
tap **Finish pick** as usual. **Back to picking** returns to step 2.

When a pick finishes early, its consolidation task holds only the picked packages. The
missing packages and the reason are recorded on the pick task and shown at the top of the
consolidation task: "The pick ended early: n package(s) not found", followed by the package
numbers and the reason.

## The consolidation task after a pick

The consolidation task created when a pick ends appears under **Consolidate**. It starts at
**Collect & verify**: the packages are already at the target location, so there's no move
step first. A pick created on the web console creates a **Consolidate & Store** task.

## Consolidation tasks no longer start with a move

New **Consolidate & Store** and **Consolidate & Ship** tasks (including those created on the
web console) no longer have the move step at the start:

- **Consolidate & Store**: Consolidate → Move;
- **Consolidate & Ship**: Consolidate → Outbound.

Tasks created earlier keep their steps.

<Staging source="wms#56">

## Consolidations from the TMS start with a pick, by route

When the TMS hands a master waybill's consolidation to the WMS, the WMS picks the
consolidation workflow by the master waybill's TMS route. You choose each route's workflow
on the web console under **Settings → API Keys**, in **Consolidation by route**; routes not
listed use the default, **Pick → Consolidate**.

- **Pick → Consolidate** and **Pick → Consolidate → Relocate** (including routes not listed):
  a pick task is created first. It appears under **Pick** on the phone, and you pick it in the
  three steps above. When the pick finishes, the consolidation task is created. It starts at
  **Consolidate**, with no move step first:
  - Pick → Consolidate: consolidate → move to storage;
  - Pick → Consolidate → Relocate: consolidate → move to storage → relocate in the same
    warehouse.
- **Consolidate** and **Consolidate → Relocate**: the consolidation task is created directly,
  without a pick.

Packages the TMS adds while the pick is open go into that pick task. The WMS notifies the TMS
as soon as the consolidate step is done; later moves don't hold up its outbound. Tasks
created earlier keep their steps.

</Staging>
