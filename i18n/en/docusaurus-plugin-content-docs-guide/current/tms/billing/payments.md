---
id: payments
title: Payments and verification
sidebar_position: 6
---

# Payments and verification

**Billing → Payments** handles receipts and bank slip verification.

## The page

Two figures at the top: how many are **Pending Verification**, and **Total Payments**.

Below, two tabs:

| Tab | Shows |
|---|---|
| **All Payments** | Every receipt |
| **Pending Verification** | Slips uploaded but not yet confirmed |

Filters: **User code**, **Reference** and **Status**.

## Verifying a bank slip

After a customer transfers and uploads a slip (see [Invoices](./invoices)), it lands in
**Pending Verification**:

1. Open one.
2. Check the **amount, date and payer** against the invoice.
3. Pass it, and only then is the money treated as received.

If it doesn't match, send it back and ask the customer for the right document.

The verification sheet now starts with the payment's **Invoices**: each invoice number
and the amount allocated to it, as in the payment's details. You can check the slip
against those amounts without looking the invoice up.

:::warning
**Verification is a control, not a formality.** Passing it moves the invoice status and
the customer's balance. Don't click through without looking.
:::

## Receiving bank accounts

**Receiving Bank Accounts** in the top right opens the account maintenance page — the
accounts you collect into, and what customers see when they transfer.

:::note
That page **isn't in the Settings menu**; this is the way in.
:::

## Permissions

Recording payments and verifying slips need the **Payments** permission. Adjusting a
sender account's wallet balance by hand is a separate grant
(**Wallet Adjustment**), because it moves a balance with no receipt behind it.
