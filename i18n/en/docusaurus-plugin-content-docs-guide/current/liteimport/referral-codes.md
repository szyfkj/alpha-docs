---
id: referral-codes
title: Referral codes and commissions
sidebar_position: 4
---

# Referral codes and commissions

Each affiliate can have one or more referral codes. Once a customer signs up with a
referral code, each of their orders earns that affiliate a commission.

## Adding a referral code

In **Affiliates**, open an affiliate and click **Add Code** under **Referral Codes**:

- **Code**: 3–20 characters, using only letters, numbers, hyphens and underscores,
  e.g. `PARTNER10`.
- **Commission type**: **Percentage** or **Fixed Amount**.
- **Commission**: what the affiliate earns per order. A percentage is taken of the
  order total; a fixed amount is in the **company's default currency**. If the default
  currency is Vietnamese dong, `20000` means 20,000 VND per order. A company with no
  default currency set uses Thai baht.
- **Linked Coupon**: the customer's discount for using the code comes from the coupon
  you pick here; with **None**, the customer gets no discount.

Click **Create** to save.

The company's default currency is set in **Settings → Company → Company Information →
Default Currency**. Changing it affects only codes created afterwards; existing codes
and their commissions keep the currency they were created with.

### Generating codes in bulk

To give an affiliate a batch of codes at once, click **Add Code** and switch from
**Single code** to **Generate codes**:

- **Code length**: 3–20, 3 by default.
- **Number of codes**: 1–100, 10 by default.
- **Commission type**, **Commission** and **Linked Coupon** work as for a single code;
  every code in the batch gets the same settings.

Click **Generate** to create that many random codes of letters A–Z and digits 0–9,
e.g. `BAM` or `V6L`. They appear in the referral code list.

- Codes your company already uses as a referral code or a coupon code are skipped, so
  a code a customer sends in chat can't be mistaken for another.
- All-digit codes (e.g. `100`) are skipped too: in chat, a number reads more like a
  quantity or an amount.
- If not enough unused codes of that length are left, none are created and the form
  asks you to use a longer length or fewer codes.

## Viewing commissions

The referral code list and the **Commissions** list below it show each amount in its
own currency, e.g. `THB 200`. For day-by-day totals, see
[Affiliate analytics](./affiliate-analytics.md).
