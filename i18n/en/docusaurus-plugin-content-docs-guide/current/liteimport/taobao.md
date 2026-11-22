---
id: taobao
title: Taobao products
sidebar_position: 4
---

# Taobao products

Besides 1688, customers can find, view and buy Taobao products in the storefront.

## Search

A keyword search in the storefront (web, Telegram mini-app, Zalo mini-app) shows 1688 and Taobao results together in one list, interleaved. Each product card carries a **1688** or **Taobao** badge saying which channel it comes from. There is no filter by channel.

- **Prices:** Taobao prices are converted from CNY to the storefront's display currency and get the company's markup, the same as 1688 prices.
- **Sorting and price filters:** a sort or price range applies to both channels together, so a sorted list mixes 1688 and Taobao products.
- **When Taobao is unavailable** (for example, the day's lookups are used up), search shows the 1688 results only, and the customer sees no error. When Taobao is slow, search waits at most 6 seconds for it and then shows the 1688 results alone, so the customer isn't kept waiting.
- **Languages:** Taobao provides product information in Chinese, English and Russian. Other languages start from the English text and are translated into the customer's language, the same way as 1688 products.

## Product page

A Taobao product opens on the same page as a 1688 product, with its images, title, price range, attributes and the full list of variants (options, price, stock). At the bottom are **Add cart** and **Order now**, and the product can be bought once a variant is chosen.

## Ordering

Customers order Taobao products in the storefront (web, Telegram mini-app, Zalo mini-app) the same way as 1688 products: choose a variant, add it to the cart and check out.

- **Cart:** one cart can hold 1688 and Taobao products together, and every line carries a **1688** or **Taobao** badge. A cart with only Taobao products can be ordered too.
- **Checkout:** the Taobao products in a checkout go into one order.
- **Purchase:** after the order is placed, its Taobao products are ordered on Taobao as one Taobao purchase, shipped to your company's China warehouse, the same as 1688 purchases. If placing it on Taobao fails, the customer's order is not affected, and staff can create it again from the dashboard (see [Handling Taobao purchases in the dashboard](#handling-taobao-purchases-in-the-dashboard)).
- **Payment:** Taobao purchases are never paid automatically. The platform pays them, within a per-purchase and a daily limit. Until then the purchase shows **Awaiting payment**. A Taobao purchase is paid only for an order the customer has paid and that isn't cancelled or refunded.

**A cart with both 1688 and Taobao products:** at checkout, the Taobao products become an order of their own, the last of the checkout, just as each 1688 seller's products become their own order. The customer sees these orders in **My Orders** but pays once.

- **The total doesn't change:** the customer pays what the checkout page showed. The service fee has a minimum per order, but the first 1688 order and the Taobao order are charged one service fee between them, split by the value of their goods, so the extra order doesn't add a second minimum fee.
- **Shipping and coupons:** shipping is charged on the 1688 orders; a coupon is spread across the checkout's orders.
- **Handled separately:** cancelling, refunding or completing a 1688 order doesn't affect the Taobao products. The Taobao order's status follows its Taobao purchase, and it can be returned or bought again on Taobao on its own.

Orders placed earlier can hold both 1688 and Taobao products. Their status doesn't follow the Taobao purchase: it follows the 1688 purchase, as for an order with only 1688 products, so the order can't show shipped or completed while its 1688 products haven't been bought.

## Order status and tracking

In the **My Orders** list, each order card shows a **1688** or **Taobao** badge next to the order number, telling the customer which channel the order was bought from. It is the same badge as on product cards and the order page. An order with both 1688 and Taobao items shows both badges. This is the same in the storefront on the web, the Telegram mini-app and the Zalo mini-app.

When a customer opens the order in **My Orders**, a **Taobao purchase** section shows how the purchase is going:

| Status | Meaning |
|---|---|
| Being placed | being ordered on Taobao, or waiting for payment |
| Purchased | paid on Taobao |
| Shipped to warehouse | the seller has shipped it to the China warehouse |
| Arrived at warehouse | the parcel has been signed for |
| Closed | the purchase was closed on Taobao; the reason is shown |

Once the seller ships, the section also shows the **Tracking number** and the courier trace, with phone numbers hidden. Status and tracking are synced from Taobao about every two hours.

For an order with only Taobao products, the order status follows the Taobao purchase: **Processing** once it is paid, **Shipped** once it is shipped, and **Completed** once it is signed for. Once it is **Shipped**, its order page also shows **Tap to view tracking details**.

- **Warehouse pre-alert and shipping notice:** the first time the sync sees a tracking number, the warehouse gets a pre-alert for that parcel and the customer gets a tracking update notification, the same as for 1688 purchases. Each tracking number is pre-alerted once, with only the Taobao products in that parcel. If the pre-alert or the notification fails, the next sync retries it.
- **Cancelling:** once the Taobao purchase is paid, or while it is being paid, the customer can't cancel the order and sees: This order has already been bought, so it cannot be cancelled here. It can still be returned for a refund before it leaves our warehouse: please contact us. A cancel by staff during the payment fails too; try again a moment later. Cancelling the order doesn't close the purchase on Taobao, but it will no longer be paid.
- **Returns:** once an order is bought, the customer can ask for a return on the order page; see [Return and refund](./returns.md).

## Handling Taobao purchases in the dashboard

In your company's dashboard, open an order under **Orders**. Its Taobao products carry a **Taobao** badge and link to their product page on Taobao. Below them, the **Taobao purchase** card shows:

- the state: **Not created yet**, **Create failed**, **Awaiting payment**, **Paid**, **Shipped**, **Delivered** or **Closed** (with the reason);
- the **Taobao purchase ID**, **Purchase amount**, **Paid amount** and when it was paid;
- each **Sub-order**'s tracking number and **Courier trace**;
- the reason of the latest failure, and when it was **Last checked**.

Staff who can edit orders can, on the card:

- **Retry creating on Taobao:** try again when the purchase failed or wasn't created. The same order is never ordered twice on Taobao. It still waits for the platform to pay it. It isn't available on a cancelled or refunded order.
- **Refresh from Taobao:** read the latest status and tracking from Taobao now, without waiting for the next sync.

A purchase **Awaiting payment** shows **A platform admin pays Taobao purchases.** Company staff can't pay it. **Confirm receipt** is a platform admin's action too: it releases the platform's payment to the seller and ends the chance to open a dispute. The platform confirms receipt once the goods are at the warehouse; there's nothing for you to do.

When the Taobao account's authorisation has lapsed or its calls are failing, the card shows **Taobao ordering paused**; purchases can't be created or updated until it recovers, so contact us.

An order with only Taobao products doesn't show the **1688 Order ID** block (or its buttons to place and sync on 1688): there is nothing to do on 1688.

### When a purchase is closed

Taobao closes a purchase that isn't paid in time, and a seller can close one too. The card of a **Closed** purchase explains why and offers two actions (for staff who can edit orders):

- **Buy again on Taobao:** creates a new Taobao purchase for the order's Taobao products. Like the first, it waits for the platform to pay it, within the same per-purchase and daily limits. It's available only when the customer has paid and the order isn't cancelled or refunded, and an order never has more than one purchase that isn't closed.
- **Mark as settled:** for a closed purchase you dealt with another way, for example by refunding the customer (cancelling the order or approving their return) or by buying the goods by hand. Nothing is bought or refunded; the card shows when it was marked.

When the order can't be bought again (for example, it was cancelled or refunded), only **Buy again on Taobao** is missing: in its place the card says that the order can be bought again once the customer has paid and while it isn't cancelled or refunded. **Mark as settled** is still available.

After a purchase is bought again, the order page lists all of the order's Taobao purchases, newest first, and only the newest has actions; an older one says it was closed and replaced by the newer purchase above. In **My Orders**, the customer sees the current purchase only.

## Pasting a product link

Pasting a Taobao or 1688 product link in the web storefront's search box, or in the search box on the home page or search page of the Telegram and Zalo mini-apps, opens that product. A product link sent to the chat bot is also recognised as the matching storefront product. These Taobao links are recognised:

- `item.taobao.com/item.htm?id=…`
- `h5.m.taobao.com/…detail.htm?id=…`
- `m.intl.taobao.com/…?id=…`
- `world.taobao.com/item/<item id>.htm`
- the short links the Taobao app shares, `m.tb.cn/…` and `e.tb.cn/…`

The share text copied from the Taobao app can be pasted as it is; there's no need to pick out the link. A short link that has expired, or that leads to a Tmall product, can't open a product and is treated as a keyword search.

## Availability

The Taobao channel is on for every company by default, with nothing to set up in your company's dashboard, but the platform can turn it off for a single company. With it off, that company's storefront:

- shows no Taobao products in search results, only 1688 ones;
- shows a Taobao product page (including one opened from a pasted Taobao link) as not found;
- can't check out a cart that still holds Taobao products; remove them from the cart first.

Orders already placed aren't affected, and their Taobao purchases carry on as usual. Turning it on or off takes effect within about a minute. If your storefront's search shows no Taobao products, or to have Taobao turned off or back on for your company, contact us.
