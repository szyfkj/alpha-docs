---
id: custom-domains
title: Custom domains
sidebar_position: 2
---

# Custom domains

**Settings → Domains** lets you put each of your customer-facing apps on a domain of
your own, for example your storefront on `shop.example.com`.

## Apps that can have a domain

Each app has its own row, set up and verified separately:

| App | What it is |
|---|---|
| Customer storefront | Your shop for customers |
| Shipping-only storefront | A storefront for shipping only |
| Delivery app | Where senders book and track deliveries |
| Telegram mini-app | The Telegram mini-app |
| Zalo mini-app | The Zalo mini-app |

## Setting up a domain

1. In the app's row, enter the domain under **Custom domain** and click **Save**.
2. At your DNS provider, add a CNAME record for the domain pointing to the **CNAME
   target** shown in that row. Each app has its own target, so don't point all your
   domains at the same one.
3. Once the DNS change is live, come back and click **Verify**. Verification checks
   that the domain's CNAME points to that app's target; when it does, the status
   changes to **Verified**.

If verification fails, the page says why, for example that no CNAME record was found
or that it points somewhere else. Fix the DNS record and click **Verify** again; DNS
changes can take a while to take effect.

## Statuses

| Status | Meaning |
|---|---|
| Not set | No domain entered yet |
| Not verified | Domain saved, not verified yet |
| Verified | The CNAME points to the right target and the domain is in use |

To stop using a domain, click **Remove**.
