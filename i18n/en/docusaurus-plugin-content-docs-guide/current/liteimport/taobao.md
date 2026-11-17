---
id: taobao
title: Taobao products
sidebar_position: 4
staging: liteimport#100
---

# Taobao products

Besides 1688, customers can now find and view Taobao products in the storefront. For now they can search and open the product page only: Taobao products can't be ordered yet.

## Search

A keyword search in the storefront (web, Telegram mini-app, Zalo mini-app) shows 1688 and Taobao results together in one list, interleaved. Each product card carries a **1688** or **Taobao** badge saying which channel it comes from. There is no filter by channel.

- **Prices:** Taobao prices are converted from CNY to the storefront's display currency and get the company's markup, the same as 1688 prices.
- **Sorting and price filters:** a sort or price range applies to both channels together, so a sorted list mixes 1688 and Taobao products.
- **When Taobao is unavailable** (for example, the day's lookups are used up), search shows the 1688 results only, and the customer sees no error.
- **Languages:** Taobao provides product information in Chinese, English and Russian. Other languages start from the English text and are translated into the customer's language, the same way as 1688 products.

## Product page

A Taobao product opens on the same page as a 1688 product, with its images, title, price range, attributes and the full list of variants (options, price, stock). At the bottom, **Add cart** and **Order now** are replaced by the notice **Ordering from Taobao is coming soon**.

## Pasting a Taobao link

Pasting a Taobao product link in the storefront opens that product, on the web and in both mini-apps. These links are recognised:

- `item.taobao.com/item.htm?id=…`
- `h5.m.taobao.com/…detail.htm?id=…`
- `m.intl.taobao.com/…?id=…`
- `world.taobao.com/item/<item id>.htm`

Short links starting with `m.tb.cn` can't be opened directly yet and are treated as a keyword search. Open the short link in a browser first, then copy the full link it leads to.

## Availability

The Taobao channel is switched on by the platform for every storefront; there's nothing to set up in your company's dashboard. If your storefront's search shows no Taobao products, contact us.
