---
id: events
title: Adding tracking events
sidebar_position: 4
---

# Adding tracking events

Normally tracking comes from drivers scanning. But sometimes it can't — no signal, a
missed scan, or a subcontractor who just phones in an update. Then you add one by hand.

## How

1. **Tick** the waybills on the list. You can do several at once.
2. Click **Assign → Add Tracking Event**.
3. Fill in:

| Field | Required | Note |
|---|---|---|
| **Event Type** | Yes | The status, from the [status reference](./statuses) |
| **Date & Time** | Yes | When it **actually happened**, not when you're typing |
| **Location** | No | Free text |
| **Notes** | No | Context, e.g. "customer confirmed receipt by phone" |
| **Proof of Delivery Photos** | No | Up to 5 |

4. Click **Add Event**.

Every ticked waybill gets the same event.

<Staging source="tms#188">

**Photos upload after the event is saved.** When you click **Add Event**, the event is saved
first and the photos go up after it. Each photo is shrunk to 1600 px on its longest side
(JPEG) before it uploads, so large photos get through too.

If the photos don't make it, the event is still saved and the message says "Event saved, but
the photos didn't upload. Add them again from the event's POD section." Open the waybill's
details, find the event in the [tracking timeline](./detail#the-tracking-timeline) and add the
photos again under it. If that fails too, you'll see **Photos Not Uploaded**; just try again.

</Staging>

<Staging source="tms#233">

## Cross-border waybills

When a waybill travels a [cross-border leg](../settings/routes#leg-type), the **Event Type**
dropdown offers cross-border events instead. Each one is also recorded as an ordinary status,
so the waybill and package statuses move on as usual:

| Cross-border event | Description | Waybill status |
|---|---|---|
| **Picked Up** | The package has been picked up for cross-border transport | Picked Up |
| **Container Loaded** | The package has been loaded into a container | Waybill Sorted |
| **Export Customs Cleared** | The package has cleared export customs | In Transit, Hub Outbound |
| **Departed** | The package has departed for the destination country | In Transit, Hub Outbound |
| **Arrived** | The package has arrived in the destination country | In Transit, Hub Inbound |
| **Import Customs Cleared** | The package has cleared import customs | Waybill Sorted |
| **Delivered** | The package has been delivered | Delivered |

**Failed Delivery**, **Exception**, **Rescheduled**, **Returning** and **Returned** are there
too, as for domestic waybills. **Delivered** still takes proof of delivery photos.

The waybill's [tracking timeline](./detail) and the [public tracking page](../customers/tracking)
show the cross-border event's name and description, e.g. "Export Customs Cleared", rather than
the status it's recorded as.

Domestic and cross-border waybills can't get an event together: with both kinds ticked, the
dialog says "Select only domestic or only cross-border waybills: they have different tracking
events." and **Add Event** stays disabled. Tick them in two rounds.

</Staging>

## Watch out

- **Use the real time.** The customer's tracking is ordered by it; putting "now" on a
  yesterday event scrambles the timeline.
- **Events are append-only.** A wrong one can only be followed by a correct one — both
  stay on the timeline. So check before you add.
- Driver delivery confirmation is a separate path through LINE, see
  [Delivery confirmation](../driver/pod).
