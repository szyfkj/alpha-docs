---
id: subcontractors
title: Subcontractors
sidebar_position: 2
---

# Subcontractors

**Partners → Subcontractors** holds your **downstream** carriers — the people you hand
transport work to.

## Adding one

A subcontractor must be an **organization already registered on the platform**, not a
name you type in. So adding is really look-up-and-bind, in two steps.

### Step 1: look them up by authorization key

1. Click **Add Subcontractor**.
2. Under **Step 1: Organization Lookup**, enter their **organization authorization key**
   (it looks like `ORG_ABC123XYZ`) and click **Lookup**.
3. A match shows **Found**, lists their email, phone and **capabilities**, and marks them
   **Verified**.

The key comes from them — ask them to read it out of their own organization settings.

No match gives **Organization Not Found**, with three things to check:

- the authorization key is correct;
- the organization is registered in the system;
- the organization is eligible to be a subcontractor.

### Step 2: confirm

Once you've confirmed it's the right party, click **Add Subcontractor**.

## Label templates

A subcontractor's details have a **Label Templates** section listing the
[template selection rules](../settings/labels-integrations#template-selection-rules) that
name it: each rule's template, route and service, and how the subcontractor prints. With no
rules it says "No rules for this subcontractor: it prints with its own template."
Rules are changed under **Settings → Label Templates**; **Manage template selection rules**
takes you there.

## Status

Subcontractors are **Active**, **Pending** or **Suspended**. Only active ones can take
work.

## Next

Once a subcontractor exists you can
[assign them waybills](../waybills/subcontract) from the waybill list, or hand them a
whole trip in [delivery planning](../delivery/planning).

:::note Don't mix them up with contractors
A **subcontractor** is downstream — goods go out. A **contractor** is upstream — goods
come in. See [Contractors](./contractors).
:::
