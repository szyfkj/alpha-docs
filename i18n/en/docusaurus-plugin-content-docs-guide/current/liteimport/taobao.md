---
id: taobao
title: Taobao products
sidebar_position: 4
staging: liteimport#100
---

# Taobao products

Besides 1688, customers can now find and view Taobao products in the storefront. For now they can search and open the product page only: Taobao products can't be ordered yet.

<Staging source="liteimport#101">

Taobao products can now be added to the cart and ordered; see [Ordering](#ordering) below.

</Staging>

## Search

A keyword search in the storefront (web, Telegram mini-app, Zalo mini-app) shows 1688 and Taobao results together in one list, interleaved. Each product card carries a **1688** or **Taobao** badge saying which channel it comes from. There is no filter by channel.

- **Prices:** Taobao prices are converted from CNY to the storefront's display currency and get the company's markup, the same as 1688 prices.
- **Sorting and price filters:** a sort or price range applies to both channels together, so a sorted list mixes 1688 and Taobao products.
- **When Taobao is unavailable** (for example, the day's lookups are used up), search shows the 1688 results only, and the customer sees no error.
- **Languages:** Taobao provides product information in Chinese, English and Russian. Other languages start from the English text and are translated into the customer's language, the same way as 1688 products.

<Staging source="liteimport#104">

When Taobao is slow, search waits at most 6 seconds for it and then shows the 1688 results alone, so the customer isn't kept waiting.

</Staging>

## Product page

A Taobao product opens on the same page as a 1688 product, with its images, title, price range, attributes and the full list of variants (options, price, stock). At the bottom, **Add cart** and **Order now** are replaced by the notice **Ordering from Taobao is coming soon**.

<Staging source="liteimport#101">

The **Ordering from Taobao is coming soon** notice is gone. A Taobao product page has **Add cart** and **Order now** at the bottom, the same as a 1688 product, and can be bought once a variant is chosen.

</Staging>

<Staging source="liteimport#101">

## Ordering

Customers order Taobao products in the storefront (web, Telegram mini-app, Zalo mini-app) the same way as 1688 products: choose a variant, add it to the cart and check out.

- **Cart:** one cart can hold 1688 and Taobao products together, and every line carries a **1688** or **Taobao** badge. A cart with only Taobao products can be ordered too.
- **Checkout:** the Taobao products in a checkout go into one order. A cart with one 1688 seller's products plus Taobao products still becomes a single order.
- **Purchase:** after the order is placed, its Taobao products are ordered on Taobao as one Taobao purchase, shipped to your company's China warehouse, the same as 1688 purchases. If placing it on Taobao fails, the customer's order is not affected, and staff can create it again from the dashboard (see [Handling Taobao purchases in the dashboard](#handling-taobao-purchases-in-the-dashboard)).
- **Payment:** Taobao purchases are never paid automatically. The platform pays them, within a per-purchase and a daily limit. Until then the purchase shows **Awaiting payment**.

## Order status and tracking

<Staging source="liteimport#113">

In the **My Orders** list, each order card shows a **1688** or **Taobao** badge next to the order number, telling the customer which channel the order was bought from. It is the same badge as on product cards and the order page. An order with both 1688 and Taobao items shows both badges. This is the same on the web, Telegram mini app and Zalo mini app.

</Staging>

When a customer opens the order in **My Orders**, a **Taobao purchase** section shows how the purchase is going:

| Status | Meaning |
|---|---|
| Being placed | being ordered on Taobao, or waiting for payment |
| Purchased | paid on Taobao |
| Shipped to warehouse | the seller has shipped it to the China warehouse |
| Arrived at warehouse | the parcel has been signed for |
| Closed | the purchase was closed on Taobao; the reason is shown |

Once the seller ships, the section also shows the **Tracking number** and the courier trace, with phone numbers hidden. Status and tracking are synced from Taobao about every two hours.

For an order with only Taobao products, the order status follows the Taobao purchase: **Processing** once it is paid, **Shipped** once it is shipped, and **Completed** once it is signed for.

<Staging source="liteimport#104">

- **Warehouse pre-alert and shipping notice:** the first time the sync sees a tracking number, the warehouse gets a pre-alert for that parcel and the customer gets a tracking update notification, the same as for 1688 purchases. Each tracking number is pre-alerted once, with only the Taobao products in that parcel. If the pre-alert or the notification fails, the next sync retries it.
- **Tracking:** once an order with only Taobao products is **Shipped**, its order page also shows **Tap to view tracking details**.
- **Orders with both 1688 and Taobao products:** the order status doesn't follow the Taobao purchase. It follows the 1688 purchase, as for an order with only 1688 products, so the order can't show shipped or completed while its 1688 products haven't been bought.
- **When the platform pays:** a Taobao purchase is paid only for an order the customer has paid and that isn't cancelled or refunded. Cancelling the order doesn't close the purchase on Taobao, but it will no longer be paid.
- **Cancelling:** once the Taobao purchase is paid, or while it is being paid, the customer can't cancel the order and sees: This order has already been bought, so it cannot be cancelled here. It can still be returned for a refund before it leaves our warehouse: please contact us. A cancel by staff during the payment fails too; try again a moment later.

</Staging>

<Staging source="liteimport#107">

Customers can now ask for the return themselves on the order page, without contacting you; see
[Return and refund](./returns.md).

</Staging>

## Handling Taobao purchases in the dashboard

In your company's dashboard, open an order under **Orders**. Its Taobao products carry a **Taobao** badge and link to their product page on Taobao. Below them, the **Taobao purchase** card shows:

- the state: **Not created yet**, **Create failed**, **Awaiting payment**, **Paid**, **Shipped**, **Delivered** or **Closed** (with the reason);
- the **Taobao purchase ID**, **Purchase amount**, **Paid amount** and when it was paid;
- each **Sub-order**'s tracking number and **Courier trace**;
- the reason of the latest failure, and when it was **Last checked**.

Staff who can edit orders can, on the card:

- **Retry creating on Taobao:** try again when the purchase failed or wasn't created. The same order is never ordered twice on Taobao. It still waits for the platform to pay it.
- **Refresh from Taobao:** read the latest status and tracking from Taobao now, without waiting for the next sync.
- **Confirm receipt:** confirm on Taobao that a sub-order arrived at the warehouse. This releases the money to the seller, so do it only once the goods are really there.

A purchase **Awaiting payment** shows **A platform admin pays Taobao purchases.** Company staff can't pay it. When the Taobao account's authorisation has lapsed or its calls are failing, the card shows **Taobao ordering paused**; purchases can't be created or updated until it recovers, so contact us.

</Staging>

<Staging source="liteimport#104">

An order with only Taobao products no longer shows the **1688 Order ID** block (or its buttons to place and sync on 1688): there is nothing to do on 1688. **Retry creating on Taobao** isn't available on a cancelled or refunded order.

</Staging>

## Pasting a Taobao link

Pasting a Taobao product link in the web storefront's search box, or on the search page of the Telegram and Zalo mini-apps, opens that product. These links are recognised:

- `item.taobao.com/item.htm?id=…`
- `h5.m.taobao.com/…detail.htm?id=…`
- `m.intl.taobao.com/…?id=…`
- `world.taobao.com/item/<item id>.htm`

Short links starting with `m.tb.cn` can't be opened directly yet and are treated as a keyword search. Open the short link in a browser first, then copy the full link it leads to.

<Staging source="liteimport#104">

The search box on the Telegram and Zalo mini-apps' home page now also opens a pasted 1688 or Taobao product link, as the web storefront does; before, it searched for the link as keywords. A Taobao link sent to the chat bot is also recognised as the matching storefront product.

</Staging>

## Availability

The Taobao channel is switched on by the platform for every storefront; there's nothing to set up in your company's dashboard. If your storefront's search shows no Taobao products, contact us.
