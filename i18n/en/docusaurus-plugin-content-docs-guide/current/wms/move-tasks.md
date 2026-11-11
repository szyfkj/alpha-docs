---
id: move-tasks
title: Recommended locations and move tasks
sidebar_position: 3
staging: wms#26
---

# Recommended locations and move tasks

When you receive a package, it goes into a **Temporary location** first. WMS also
suggests a **Recommended location** and creates a move task to take the package from the
temporary location to the recommended one. Workers then complete those tasks on their
phone under **Move**.

## Recommended location

On the **Inbound** page, once the dimensions and weight are filled in, a read-only
**Recommended location** appears next to **Temporary location**, with the reason for the
choice. Until then it says "Shown once dimensions and weight are filled in". The
recommendation is chosen in this order:

1. **Holds this customer's packages and has room:** a location that already holds packages
   with the same **Sender account code** and has enough remaining volume and weight for this
   package. When several qualify, the one with the most room left wins.
2. **Next to this customer's packages:** otherwise, the nearest location beside one of
   them (same zone and aisle, one position over, then two, and so on).
3. **Empty location that fits best:** otherwise, the empty location that fits the package
   most tightly.

Only locations of type **Bin**, **Shelf** or **Rack** in status **Available** or
**Occupied** are recommended. A location with no **Max Volume (cm³)** or **Max Weight (kg)** set
(0) counts as unlimited for that measure. When nothing has enough room, it says "No location
with enough room".

**Temporary location** works as **Location** did before: scan or type it, only **Bin**
locations are accepted, and it defaults to the location this device used last. See
[Receiving packages](./receiving.md).

## The move task created at receive

When you tap **Receive Package**, WMS works out the recommended location again from the
locations' current contents, then places the package in the temporary location:

- If the recommended location differs from the temporary one, a pending **Move Location**
  task is created (from the temporary location to the recommended one), and the message
  says "Move task created: to C-01-02."
- If they're the same, or there's no recommended location, no task is created.
- If the recommendation can't be worked out, the package is still received.

The tasks also show on the console's **Workflows** page.

## Completing move tasks on the phone

**Warehouse Worker** home → **Move** (Move a package from one location to another). At the
top, **Move tasks (2)** lists the open tasks, each with the package number and
"temporary location → recommended location".

Tap a task to fill in the **Package** and the **Destination** (the recommended location).
You can change the destination if needed, then tap **Move Package**: the task is completed
and leaves the list.

Moving a package that has an open move task completes that task even if you scanned the
package directly instead of tapping the task, and no extra workflow is created.
