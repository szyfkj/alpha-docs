---
id: returns
title: Return and refund
sidebar_position: 5
staging: liteimport#107
---

# Return and refund

Once an order has been bought (ordered and paid on 1688 or Taobao), it can no longer be
cancelled, but the customer can ask to return it for a refund: the whole order goes back to
the seller, and the customer gets back what they paid, less the return shipping fee. This
works the same for every shopping channel (1688, Taobao) and every storefront (web,
Telegram mini-app, Zalo mini-app).

An order that hasn't been bought yet is still cancelled with **Cancel order**: a full refund
at once, with no review.

## The rules

- **Whole order only:** a return covers the whole order, never single parcels or items.
- **Until the parcels leave the China warehouse:** the order can be returned while its
  parcels are still in our China warehouse (not yet shipped out in a consolidation). Once one
  parcel has left, the order can't be returned.
- **Refund = what the customer paid − the return shipping fee.** Staff enter the fee when they
  approve; it can be 0.
- **Refunded as soon as it's approved:** the refund goes straight to the bank account the
  customer has on file in the storefront.

## Customers: asking for a return

On a paid order that has been bought, the order page shows a **Return & refund** section:

> You can return this order for a refund until it leaves our warehouse. If sending the parcels
> back to the seller costs anything, that cost is deducted from the refund.

1. Tap **Return & refund** and enter a reason in the window that opens (the request can't be
   sent without one).
2. Tap **Request return**.

The section then shows how the request is going:

| Status | What the customer sees |
|---|---|
| **Return requested** | We are reviewing your request. |
| **Return approved** | The return shipping cost and the refund, with "Refund of … is being sent to your bank account." |
| **Returned and refunded** | "… was refunded to your bank account." |
| **Return request declined** | The note staff wrote, if any. |

While the refund hasn't arrived, the section links to **Check your bank account details**, so
the customer can check or add their bank account.

## Staff: reviewing a request

The customer's request appears on the order's page in the dashboard, in the **Refund Requests**
section, marked **Return to seller** and showing the customer's reason. Staff who can edit
orders can act on it.

1. In **Return shipping fee (…), deducted from the refund**, enter what sending the parcels back
   to the seller costs. The page shows "The customer will be refunded …".
2. Click **Approve and refund**, or write a note and click **Reject**. On a rejection the note
   is shown to the customer.

**Approve and refund** then:

- tells the warehouse to send every parcel of the order back to the seller; **Parcels sent
  back** lists their numbers;
- marks the order refunded (partly refunded when a fee was deducted);
- pays the customer by bank transfer at once, and notifies them.

If a parcel has already left the warehouse, the approval fails: the parcels already told to go
back are taken back, nothing is refunded, and the request stays **Pending**, so staff can reject
it.

A parcel that ships after the approval (the seller shipped late) is also sent back to the
seller automatically when the warehouse is told about it.

### When the refund can't be paid automatically

When the refund can't be transferred automatically (for example **The customer has no bank
account on file.** or **The customer's bank is not supported by the payment gateway.**), the
return still stands and **Payout** shows **Failed**. Staff can:

- click **Retry payout** once the customer has fixed their bank account; or
- pay another way, enter the transfer reference in **Paid another way: transfer reference** and
  click **Record as paid**.

When the payment gateway gives no clear answer, **Payout** shows **Outcome unknown** with the
refund's trade number. Look it up at the payment gateway first, then click **It was paid** or
**It was not paid**. Until then the refund can't be paid another way, so it is never paid twice.

When an approval or a payout attempt didn't finish, the page says so and offers **Resume
approval** or **Retry payout**. A resumed approval keeps the return shipping fee already entered.

## Not part of a return

- Giving back points or a coupon the customer used.
- Getting a refund from the 1688 or Taobao seller: staff arrange that on 1688 or Taobao
  themselves.
