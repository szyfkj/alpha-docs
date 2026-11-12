---
id: mobile-consolidate
title: Packing boxes on the phone
sidebar_position: 5
staging: wms#33
---

# Packing boxes on the phone

When you carry out a **Consolidate** task from the phone's **Warehouse Worker** home →
**Workflow Actions**, each new box needs its **DIMENSIONS & WEIGHT** before you can tap
**Finish packing**:

- **L (cm)**, **W (cm)** and **H (cm)** are all required, each above 0;
- **Wt (kg)** is required, above 0.

What's still missing is listed under the button, for example "Missing: box size (L×W×H),
box weight", and **Finish packing** stays disabled until it's filled in. As before, the box
also needs packages in it ("no packages in this box") and a photo under **BOX PHOTOS (show
the label)**.

The size and weight are sent to the TMS with the new package. Before, a box could be
finished without them, and the new package reached the TMS with no measurements. Boxes
already finished are not affected.

<Staging source="wms#39">

## Printing the TMS label

After you tap **Finish packing**, the phone fetches that box's label from the TMS: the
subcontractor's label when a leg of the master waybill is assigned to one, otherwise the
label from the TMS's own template. The progress shows under the box:

- "Fetching the shipping label…": while the subcontractor hasn't booked the box yet, the
  phone asks again every 3 seconds, for up to 2 minutes. This runs on the phone, so you
  can carry on packing the next box.
- "Shipping label ready": it prints automatically when a Bluetooth printer is connected.
  The box's printer button (**Print label**) reprints it afterwards.
- "Label not ready, print later": no label within 2 minutes. Tap the box's printer button
  later to fetch and print it.
- When the TMS has no label for the box, the printer button keeps printing the WMS box
  label.
- Any other error shows as "Shipping label:" followed by the reason.

For a finished box, the printer button prints the TMS label instead of the WMS box label.
Before a box is finished, **Add box** still prints the WMS box label, as before.

</Staging>
