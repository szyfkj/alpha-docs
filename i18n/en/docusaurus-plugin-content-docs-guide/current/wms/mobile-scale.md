---
id: mobile-scale
title: Connecting a scale in the mobile app
sidebar_position: 4
staging: wms-android#15
---

# Connecting a scale in the mobile app

The mobile app can connect to a scale over Bluetooth and send its weight readings to the
receiving form on the **Inbound** page. You pair and test the scale in the app's
**Settings** → **Scale**.

## Supported scales

The app works with both the old and the new scales, with no setting to switch:

- scales that use the Yaohua A7 format (the old ones);
- scales that use the Yingzhan format (the new ones, with an HC-06 compatible Bluetooth
  module), in kilograms, grams or pounds.

When it connects, the app tries Classic Bluetooth (SPP) first, then Bluetooth Low Energy
(BLE), and remembers which one worked to try it first next time. Readings are sent while
the scale is still settling, so you see the number settle on the page.

## Pairing

1. Turn the scale on.
2. In **Settings** → **Scale**, tap **Pair scale** and pick the scale. If the app says it
   isn't paired, pair it in the phone's Bluetooth settings first (the PIN for HC-06
   modules is 1234).

## Connection status

The status line under **Scale** shows:

- **Connected (SPP)** or **Connected (BLE)**: ready to weigh.
- **Connecting…**
- **Not connected:** followed by the reason: **Bluetooth is off**, **scale not found**,
  **not paired**, or the scale didn't answer over Bluetooth (SPP or BLE). In that case,
  check that the scale is on and nearby.

## Test reading

Tap **Test reading**. The app connects to the scale first if it needs to, waits for a
reading, and opens a **Scale test** dialog with one of these results:

- the **current reading** and how it connected, for example "Current reading: 1.23 kg (via SPP)";
- connected, but the scale sent nothing: check that it is on and set to send continuously;
- connected, but the scale's data isn't a weight format the app knows: the dialog shows a
  sample of what arrived; include it when you contact us;
- connected, but the scale reports an overload;
- connected, but the scale sends a unit the app doesn't know;
- **Scale is not connected**, with the reason and the error for each way it tried to connect.
