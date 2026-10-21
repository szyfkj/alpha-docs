---
id: users
title: Users and disabled accounts
sidebar_position: 3
staging: wms#20
---

# Users and disabled accounts

Administrators manage their organization's users under **Settings** → **Users** (**User
Management**). Every user has a status: **Active**, **Inactive** or **Suspended**.

## Taking someone's access away

Users can't be deleted in WMS. To stop someone from signing in, edit the user, set
**Status** to **Inactive** or **Suspended**, and save. From then on:

- They can't sign in on the web console, the mobile web console or the mobile app. The
  sign-in page says "Your account has been disabled. Contact your administrator."
- A session they already have open is signed out on its next page load, back to the
  sign-in page with the same message.
- API calls made with their account are refused.

Set the status back to **Active** and they can sign in again. The user's record and the
history of what they did are kept.

## Accounts that can't be disabled

These accounts can't be set to **Inactive** or **Suspended**; saving shows an error:

- your own account;
- the organization's owner and the built-in administrator accounts.

## Permission changes

Roles no longer have a **Delete Users** permission. Roles that were granted it before no
longer show it in their permission list.
