---
id: custom-domains
title: 自定义域名
sidebar_position: 2
---

# 自定义域名

**Settings → Domains** 让你给面向客户的每个应用换上自己的域名，例如把商城开在 `shop.example.com`。

这个页面在中文界面下也显示英文，下面的按钮和状态名照屏幕上的英文写。

## 可以设置域名的应用

每个应用一行，各自设置、各自验证：

| 应用 | 说明 |
|---|---|
| Customer storefront | 客户商城 |
| Shipping-only storefront | 只做集运的商城 |
| Delivery app | 寄件人下单、查件的配送应用 |
| Telegram mini-app | Telegram 小程序 |
| Zalo mini-app | Zalo 小程序 |

## 设置步骤

1. 在应用那一行的 **Custom domain** 里填域名，点 **Save**。
2. 到你的域名服务商那里，为这个域名添加一条 CNAME 记录，指向这一行显示的 **CNAME target**。每个应用的目标不一样，不要把几个域名都指到同一个目标。
3. DNS 生效后回到这一页，点 **Verify**。验证会检查域名的 CNAME 是否指向这个应用的目标；通过后状态变为 **Verified**。

验证不通过时，页面会提示原因，比如没找到 CNAME 记录，或记录指向了别的地址。改好 DNS 记录后再点一次 **Verify** 即可；DNS 变更可能要等一段时间才生效。

## 状态

| 状态 | 含义 |
|---|---|
| Not set | 还没有填域名 |
| Not verified | 已保存域名，还没通过验证 |
| Verified | CNAME 已正确指向，域名可用 |

不再使用某个域名时，点 **Remove** 删除它。
