---
id: warehouses
title: Warehouses
sidebar_position: 2
---

# Warehouses

**Settings → Warehouses** manages your organization's warehouse locations. The list shows each warehouse's name, code, location, status, contact details and notes. You can search by name, code or city, and filter by status and country.

## Adding or editing a warehouse

Click **Add Warehouse**, fill in the details and click **Create Warehouse**. Editing an existing warehouse uses the same form, with **Save**.

The form marks Name, Code, Address, City and Country with `*`. **State/Province**, **Postal Code**, **Phone** and **Email** aren't marked, but they must be filled in too: if one is left blank, saving fails and the message doesn't say which field. Only **Notes** is optional.

<Staging source="wms#13">

Every field except **Notes** is marked `*` and checked in the form before anything is sent. A blank field turns red with "This field is required" under it, and the form isn't submitted; a value that's too long or an invalid email is flagged under its field the same way. Editing a warehouse works the same.

</Staging>
