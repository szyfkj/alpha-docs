---
id: delivery
title: 4. 配送规划与跟踪
sidebar_position: 5
---

# 4. 配送规划与跟踪

## 先理清两个概念

- **运单（waybill）= 一票货**。是谁的货、从哪到哪、多重多大。
- **配送（delivery）= 一趟车**。哪台车、走什么路线、装了哪些运单。

一趟车可以装多张运单，这就是整车（FTL）业务的核心。把运单分配到车上的过程叫**装载规划**。

根据你的业务模式，有两条路径：

- **[4A 自营装载规划](#4a-自营装载规划)** —— 货已经是你的，你自己排车
- **[4B 报价 → 支付 → 下单 → 跟踪](#4b-报价--支付--下单--跟踪)** —— 给客户报价收款，系统自动排车

---

## 4A 自营装载规划

需要 `delivery.planning` 套餐功能。

### 前置准备

调用规划接口需要四个 UUID：

| 参数 | 含义 | 怎么获取 |
|---|---|---|
| `origin_unit_id` | 发车网点 | `GET /api/organization-units`（只列出已填写地址的网点） |
| `service_id` | 本次跑车用的整车服务 | **后台复制** |
| `service_area_id` | 服务区域 | **后台复制** |
| `vehicle_type_id` | 车型 | **后台复制** |

:::caution 已知限制
目前只有 `origin_unit_id` 有开放的查询接口，另外三个需要从后台管理页面复制。这些值对你的组织来说是**固定配置**，取一次存在你自己的配置里即可，不需要每次调用都查。
:::

### 第 1 步：试算能不能装下（可选）

```http
POST /api/load-planning/fit-check
```

```json
{
  "waybill_ids": ["uuid-1", "uuid-2"],
  "vehicle_type_id": "uuid-vehicle"
}
```

`vehicle_type_id` 和 `delivery_id` 至少给一个。这一步**不创建任何数据**，纯试算，用来回答"这批货一辆这种车装不装得下"。

传 `delivery_id` 时，会把这趟配送已有的货一起算进去，车型默认用该配送的车型。`waybill_ids` 最多 500 个 UUID，不存在或不属于你组织的 ID 会被忽略。

返回的主要字段：

| 字段 | 说明 |
|---|---|
| `status` | `fits`（全部装下）、`partial`（只装下一部分）、`none`（一件都装不下）、`unusable`（装箱引擎无法评估这批货）、`no_cargo`（没有任何带尺寸的包裹可算） |
| `metrics` | 装载指标：`total_units` / `loaded_units` / `unplaced_units`（件数）、`volume_util` / `weight_util`（0–1 的容积 / 载重利用率）等。`no_cargo` 时为 `null` |
| `cargo` | 参与试算的货物总量：`units`、`weight_kg`、`volume_m3` |
| `problems` | 没法参与计算的包裹，每项带 `waybill_no`、`package_no` 和 `reason`（`missing_dimensions` 缺尺寸、`missing_weight` 缺重量、`suspect_units` 尺寸疑似按米填写） |

### 第 2 步：让系统给出分车方案

```http
POST /api/load-planning/split
```

```json
{
  "action": "propose",
  "waybill_ids": ["uuid-1", "uuid-2", "uuid-3"],
  "vehicle_type_ids": ["uuid-small-truck", "uuid-big-truck"],
  "objective": "fewest_vehicles",
  "keep_recipient_together": true
}
```

| 字段 | 说明 |
|---|---|
| `waybill_ids` | 要排的运单 UUID，最多 500 个。不存在或不属于你组织的 ID 会被忽略 |
| `vehicle_type_ids` | 可用车型，最多 10 种 |
| `objective` | `fewest_vehicles`（默认，车次最少）或 `smallest_vehicles`（车型最小） |
| `max_vehicles` | 最多用几台车，不超过 20 |
| `keep_recipient_together` | 同一收件人的货尽量装同一台车 |

返回按车型分好的组。**这一步仍然什么都不创建**，你可以拿着方案给调度员确认，或者改一改再提交。

### 第 3 步：确认方案，生成配送

```http
POST /api/load-planning/split
```

```json
{
  "action": "accept",
  "origin_unit_id": "uuid-origin",
  "service_area_id": "uuid-area",
  "service_id": "uuid-ftl-service",
  "groups": [
    { "vehicle_type_id": "uuid-big-truck", "waybill_ids": ["uuid-1", "uuid-2"] },
    { "vehicle_type_id": "uuid-small-truck", "waybill_ids": ["uuid-3"] }
  ]
}
```

**每个 group 创建一趟配送**（最多 20 个 group），并自动计算装载方案。返回：

```json
{
  "deliveries": [
    { "id": "uuid", "deliveryNo": "D-000123", "vehicleTypeId": "uuid", "waybillCount": 2, "planned": true }
  ]
}
```

`planned: false` 表示配送已创建但装载方案没算出来，可以稍后重新计算，不影响发车。

:::note 服务端会重新校验
`accept` 不会盲信你提交的分组，会重新检查：同一张运单不能出现在两个组里、运单不能已经被其他配送占用、车型必须仍然存在。中途失败时已创建的配送会被自动回滚，不会留下半截数据。
:::

常见错误（装载规划几个接口通用）：

| `error` | HTTP | 含义 |
|---|---|---|
| `invalid_json` | 400 | 请求体不是合法 JSON |
| `validation_failed` | 400 | 参数校验失败（如 ID 不是 UUID、超出数量上限），`details` 里有具体字段 |
| `invalid_groups` | 422 | 分组为空，或同一运单出现在多个组 |
| `waybills_assigned` | 409 | 有运单已经被其他配送占用了，刷新后重新排 |
| `no_vehicle_type` | 422 | 车型不存在 |
| `no_cargo` | 422 | 这些运单里没有任何带尺寸的包裹可以排，`problems` 列出缺数据的包裹（试算接口不报错，而是返回 `status: "no_cargo"`） |
| `load_planning_unavailable` | 503 | 装箱引擎暂时不可用，按 `Retry-After` 响应头指示的秒数重试 |
| `create_failed` | 500 | 创建失败，已回滚 |

### 第 4 步：查看装载方案

```http
GET /api/load-planning/deliveries/{id}/plan
```

`{id}` 是上一步返回的配送 `id`。

| 字段 | 说明 |
|---|---|
| `plan` | 当前的装载方案，从没算过时为 `null` |
| `freshness` | `fresh`（方案与配送当前的货和车型一致）、`stale`（之后货或车型变过，方案已过期）、`missing`（还没有方案） |
| `staleReason` | `stale` 时的原因，如 `inputs_changed`、`no_vehicle_type`；否则为 `null` |
| `problems` | 没法参与计算的包裹，格式同试算接口 |

### 派车

:::caution 已知限制
指派司机和指派分包商目前**没有开放接口**，需要在后台操作。
:::

### 配送状态

`pending`、`ready_for_pickup`、`assigned`、`in_transit`、`delivered`、`failed`、`cancelled`

注意这里是英式拼写 `cancelled`（双 l）。

---

## 4B 报价 → 支付 → 下单 → 跟踪

面向"给终端客户报价卖运力"的场景。整条链路 7 个接口，**都不受套餐限制**。

除第 1 步外，所有接口都需要 `X-Sender-Account-Id` 这个 header，见[鉴权章节](./authentication.md#x-sender-account-id模式-b-必读)。

```mermaid
flowchart LR
    r["地址解析<br/>取得经纬度"] --> q["报价"] --> m["查支付方式"] --> p["支付"] --> o["自动生成<br/>运单与配送"] --> t["跟踪"]
```

### 第 1 步：报价

```http
POST /api/quotes
```

`X-Sender-Account-Id` 在这一步**可以不带** —— 用于"先报价、后确认客户是谁"的场景。不带时报出来的是无主报价。

```json
{
  "api_key": "ak_example000000",
  "nonceStr": "1771545600000",
  "sign": "...",
  "request_id": "cart-8821",
  "pickup":   { "address": "123 Sukhumvit Rd, Bangkok", "lat": 13.7398, "lng": 100.5601 },
  "delivery": { "address": "456 Nimman Rd, Chiang Mai", "lat": 18.7953, "lng": 98.9670 },
  "items": [
    { "qty": 2, "length_cm": 100, "width_cm": 80, "height_cm": 60, "weight_kg": 25 }
  ],
  "service_type": "ftl_transport",
  "addons": []
}
```

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `pickup` / `delivery` | object | 是 | 起止地址，见下 |
| `items` | array | 是 | 货物明细，至少 1 项 |
| `request_id` | string | 否 | **你自己的关联 ID**，原样回传。不传会自动生成 |
| `service_type` | string | 否 | `ftl_transport`（默认）或 `ltl_transport` |
| `cargo_notes` | string | 否 | 货物备注 |
| `addons` | array | 否 | 增值服务，每项 `{ "key": "..." }` |

**地址对象**：

| 字段 | 类型 | 必填 |
|---|---|---|
| `address` | string | 是 |
| `lat` / `lng` | number | **是** |
| `country` / `province` / `district` / `postal_code` / `phone` | string | 否 |

:::danger 坐标必填，报价永远不会替你做地理编码
这是刻意设计的。地址解析器总会返回点什么 —— 兜底会给你一个**省中心点**。如果报价接口在后台偷偷地理编码，一个模糊地址就会被静默地按错误的行程定价，而你完全不知道。

所以请先调[地址解析](./address.md)，拿到 `confidence` 和 `source`，**由你决定**这个匹配够不够好再来报价。
:::

**`items` 每一项**：

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `qty` | number | 是 | 件数，正整数 |
| `length_cm` / `width_cm` / `height_cm` | number | 是 | 尺寸（cm），必须 > 0 |
| `weight_kg` | number | 是 | 单件重量（kg），必须 > 0 |
| `volume_m3` | number | 否 | 体积 |
| `stackable` | boolean | 否 | 能否堆叠 |
| `fragile` | boolean | 否 | 是否易碎 |
| `flipable` | boolean | 否 | 装车时能否翻面 |
| `name` / `notes` | string | 否 | 名称 / 备注 |
| `image_urls` | array | 否 | 图片 |

:::note 不要自己传总重量、总体积
总量由服务端从 `items` 推导。装载率也不是请求参数 —— 能不能装下是由 3D 装箱算法实际排一遍决定的，比按百分比预留余量更接近真实装车情况。
:::

**响应**：

```json
{
  "quotation_id": "uuid",
  "request_id": "cart-8821",
  "vehicle": { "type": "4_wheel_truck", "max_payload_kg": 1000 },
  "vehicles": null,
  "estimated_total": 4500.00,
  "currency": "THB",
  "expires_at": "2026-09-23T10:30:00Z",
  "breakdown": [
    { "kind": "base", "amount": 4200.00 },
    { "kind": "addon", "key": "tail_lift", "amount": 300.00 }
  ]
}
```

报价**默认有效期 30 分钟**（`expires_at`）。

当货物装不进任何单台车时，会返回**多车组合**报价：`vehicle` 为 `null`，`vehicles` 列出每台车及其价格和分配到的货，`estimated_total` 是各车价格之和：

```json
{
  "vehicle": null,
  "vehicles": [
    { "vehicle_type": "Trailer", "price": 8000.00, "items": [{ "name": "旋转门", "qty": 8 }] },
    { "vehicle_type": "6_wheel_truck", "price": 5000.00, "items": [{ "name": "旋转门", "qty": 4 }] }
  ],
  "estimated_total": 13000.00
}
```

所以**客户端必须同时处理 `vehicle` 和 `vehicles` 两种情况**。

**报价错误**：

| `error` | HTTP | 含义 |
|---|---|---|
| `missing_required_field` | 400 | 参数校验失败，`detail` 里有具体字段 |
| `forbidden` | 403 | 带了 `X-Sender-Account-Id`，但这个客户账号不属于你的组织 |
| `unsupported_route` | 422 | 这条线路没有配置可用服务 |
| `no_vehicle_fits` | 422 | 没有车（也没有多车组合）装得下，`detail` 说明原因 |
| `unsupported_addon` | 422 | 请求了不支持的增值服务 |
| `load_planning_unavailable` | 503 | 装箱引擎暂时不可用，按 `Retry-After` 响应头指示的秒数重试 |
| — | 500 | 服务端内部错误，可稍后重试 |

错误响应形如：

```json
{ "error": "no_vehicle_fits", "detail": "no_vehicle_fits: weight_over, volume_over", "request_id": "cart-8821" }
```

### 第 2 步：查询报价

列出某个客户的全部报价（倒序）：

```http
GET /api/quotes
```

**没有任何查询参数** —— 客户由 `X-Sender-Account-Id` 决定。每条记录带 `delivery` 字段，未支付时为 `null`。

查单条：

```http
GET /api/quotes/{id}
```

```json
{
  "id": "uuid",
  "status": "active",
  "expires_at": "2026-09-23T10:30:00Z",
  "estimated_total": 4500.00,
  "currency": "THB",
  "breakdown": [
    { "kind": "base", "amount": 4200.00 },
    { "kind": "addon", "key": "tail_lift", "amount": 300.00 }
  ],
  "snapshot": {},
  "provider": "lalamove",
  "delivery": null,
  "created_at": "2026-09-23T10:00:00Z"
}
```

:::caution 读取无主报价会"认领"它
第 1 步不带 `X-Sender-Account-Id` 报出来的价是无主的。**谁第一个读它，它就归谁**（前提是仍然 `active` 且未过期）。`GET /api/quotes/{id}` 和 `GET /api/quotes/{id}/payment-methods` 都算"读"。之后只有这个客户账号能查看、支付、取消它。

支付和取消**不会**认领 —— 对还没被认领的报价直接支付或取消会返回 `403 {"error":"forbidden"}`，必须先读一次。

不属于你的报价一律返回 `404 {"error":"not_found_or_forbidden"}`。
:::

`breakdown` 与报价响应里的格式相同：每项 `{ kind, key?, amount }`，`kind` 为 `base`（运费，多车组合时每台车一条）或 `addon`（增值服务，带 `key`）。

`provider` 可能是 `lalamove`、`deliveree`、`internal`（自有车队）、`subcontractor`（分包给下游）或 `null`。

<Staging source="tms#221">

`GET /api/quotes/{id}` 的响应**不再包含 `provider`**，与创建报价（`POST /api/quotes`）的响应一致：由谁承运不对客户公开。如果你的页面展示了承运方，请改为在没有这个字段时不显示。

`snapshot` 是报价时的请求和价格，只包含下面这些字段（报价里没有的字段不会出现）：

| 字段 | 含义 |
|---|---|
| `request_id` | 报价时传入的 `request_id` |
| `pickup`、`delivery` | 报价时的取货地址和送货地址（注意：这里的 `delivery` 是地址，不是顶层表示运单的 `delivery` 字段） |
| `items` | 报价时的货物 |
| `addon_keys` | 请求的增值服务 |
| `addons` | 每项增值服务的价格，`{ key, amount }` |
| `base_amount` | 运费 |
| `is_composition` | 是否为多车组合 |
| `composition` | 多车组合时每台车一条：`{ vehicleType, cost, items }`，`cost` 是这台车的运费 |

不要依赖这张表之外的字段。

</Staging>

### 第 3 步：查可用支付方式

渲染收银台之前调它，不要硬编码支付方式列表：

```http
GET /api/quotes/{id}/payment-methods
```

```json
{
  "methods": [
    { "name": "flashpay", "modes": ["qr", "deeplink", "wechat_applet"], "available": true },
    { "name": "bank_transfer", "modes": ["manual_transfer"], "available": false,
      "unavailable_reason": "no_bank_account_available" }
  ],
  "default": "flashpay"
}
```

`name` 是 `flashpay`、`bank_transfer` 或 `wallet`。金额取自报价本身，不从 query 传。

不可用的方式会**带原因返回而不是被隐藏**，建议置灰并显示原因。`unavailable_reason` 取值：`not_configured`、`no_bank_account_available`、`insufficient_balance`、`currency_unsupported`、`no_sender_account`、`unavailable`。

可用性只是参考值，最终以支付时的结果为准。

### 第 4 步：支付（这一步才真正下单）

```http
POST /api/quotes/{id}/pay
```

```json
{ "type": "qr" }
```

| 字段 | 说明 |
|---|---|
| `type` | `qr`（默认）、`app`、`bank_transfer` 或 `wallet` |
| `bank_code` | `type` 为 `app` 时指定银行 |

:::tip 这一步会创建订单
调用它会**自动创建运单和配送**，然后才发起收款。这个操作是**幂等**的 —— 重复调用不会重复下单。

这就是 B 模式和 A 模式汇合的地方：从这里开始，货在系统里的形态和你自己建单推进来的完全一样。
:::

**响应字段是 camelCase**，按支付方式不同：

```json
// type: "qr"
{ "type": "qr", "paymentId": "uuid", "tradeNo": "FP123456",
  "qrImage": "data:image/png;base64,...", "qrRawData": "00020101...",
  "qrExpireTime": "...", "deliveryId": "uuid" }

// type: "app"
{ "type": "app", "paymentId": "uuid", "tradeNo": "FP123456",
  "appUrl": "https://...", "deliveryId": "uuid" }

// type: "bank_transfer"
{ "type": "bank_transfer", "paymentId": "uuid", "referenceCode": "REF123",
  "account": { "bank_name": "...", "account_number": "...", "account_name": "..." },
  "amount": 4500, "currency": "THB", "expiresAt": "...", "deliveryId": "uuid" }

// type: "wallet"
{ "type": "wallet", "paymentId": "uuid", "balance": 12000, "deliveryId": "uuid" }
```

**`deliveryId` 就是后面跟踪要用的订单号，请存下来。**

钱包支付是同步扣款并立即派单，其他方式需要等收款回调确认。

**支付错误**：

| `error` | HTTP | 含义 |
|---|---|---|
| （说明文字） | 400 | `type` 不是 `qr`、`app`、`bank_transfer`、`wallet` 之一 |
| `forbidden` | 403 | 这个报价不属于该客户，或还没被认领 |
| `not_found` | 404 | 报价或订单不存在 |
| `payment_method_not_allowed` | 409 | 该支付方式不被允许，`allowed` 字段列出可用的 |
| `no_bank_account_available` | 409 | 银行转账：当前没有能收这笔款的收款账户，请换一种支付方式 |
| `not_payable` | 409 | 报价/订单当前状态不可支付（已过期、已支付等） |
| `insufficient_balance` | 409 | 钱包余额不足 |
| `flashpay_not_configured` | 503 | 组织未配置支付网关 |
| `exchange_rate_not_configured` | 503 | 报价币种无法换汇 |
| `pay_failed` | 500 | 发起支付失败 |

### 第 5 步：取消

```http
POST /api/quotes/{id}/cancel
```

无请求体（除签名字段）。返回：

- `{"status":"quote_canceled"}` —— 取消的是尚未支付的报价
- `{"status":"order_canceled"}` —— 已生成待付款订单，取消的是订单

已是终态时返回 `409 {"error":"already_terminal","status":"..."}`。`status` 是当前状态：取消报价时是报价状态（如 `canceled`、`expired`），取消订单时是订单的付款状态（如 `paid`、`canceled`）。

### 第 6 步：跟踪订单

```http
GET /api/orders/{id}/tracking
```

:::caution
`{id}` 是**配送 ID**（支付响应里的 `deliveryId`，或报价详情里的 `delivery.id`），**不是报价 ID**。
:::

订单还没进入可跟踪状态时，返回 **HTTP 200** 加一个简单对象：

```json
{ "state": "awaiting_payment" }
```

可能是 `awaiting_payment`（还没付款）或 `awaiting_3pl`（已付款，正在向承运方下单）。

:::tip
客户端要**先判断有没有 `state` 字段**，有就说明还不能跟踪，不要直接当成完整的跟踪对象解析。
:::

可跟踪时返回：

```json
{
  "provider": "lalamove",
  "external_order_id": "LLM-123",
  "status": "in_transit",
  "driver": { "name": "Somchai", "phone": "0812345678", "photo_url": "https://..." },
  "vehicle": { "plate": "1กข1234", "model": "Toyota", "photo_url": null },
  "current_location": { "lat": 13.7563, "lng": 100.5018 },
  "stops": [
    { "address": "...", "lat": 13.75, "lng": 100.5, "status": "completed", "completed_at": "2026-09-23T09:00:00Z" }
  ],
  "eta_pickup_at": "2026-09-23T08:30:00Z",
  "eta_delivery_at": "2026-09-23T11:00:00Z",
  "pod": { "photo_urls": [], "signature_url": null, "delivered_at": null },
  "fetched_at": "2026-09-23T09:05:00Z"
}
```

- `provider` 是 `lalamove`、`deliveree` 或 `internal`。自有车队时 `external_order_id` 是空字符串，`stops` 是空数组 `[]`，`vehicle`、`current_location`、两个 ETA 和 `pod` 都是 `null`，只有 `status` 和 `driver`（还没派司机时为 `null`）有内容。
- `stops[].status`：`pending`、`arrived`、`completed`、`failed`。
- **跟踪状态** `status`：`pending`、`assigning_driver`、`driver_assigned`、`picked_up`、`in_transit`、`delivered`、`canceled`、`failed`。注意这里是美式拼写 `canceled`（单 l）。

其他返回：`403 {"error":"forbidden"}`（订单不属于该客户，或不是通过报价下的单 —— 只有报价生成的订单能用这个接口跟踪）、`404 {"error":"not_found"}`。

:::note 轮询建议
服务端对结果有 5 秒缓存，所以比 5 秒更密的轮询没有意义。建议**每 10 秒轮询一次**，直到状态变成 `delivered`、`canceled` 或 `failed`。
:::

<Staging source="tms#223">

### ID 格式不对、服务端出错时

报价和订单接口路径里的 `{id}` 是 UUID。传入格式不对的 `{id}`（如 `/api/quotes/abc`）时，当作不存在处理，返回该接口原有的 404：

| 接口 | 返回 |
|---|---|
| `GET /api/quotes/{id}`、`GET /api/quotes/{id}/payment-methods` | `404 {"error":"not_found_or_forbidden"}` |
| `POST /api/quotes/{id}/pay`、`POST /api/quotes/{id}/cancel`、`GET /api/orders/{id}/tracking` | `404 {"error":"not_found"}` |

身份校验仍然在前：签名不对、或 `X-Sender-Account-Id` 不属于你的组织时，先返回 401 / 403。

下面三个接口出现服务端内部错误时，返回带错误码的 JSON，可稍后重试：

| 接口 | 返回 |
|---|---|
| `GET /api/quotes/{id}` | `500 {"error":"get_failed"}` |
| `POST /api/quotes/{id}/cancel` | `500 {"error":"cancel_failed"}` |
| `GET /api/orders/{id}/tracking` | `500 {"error":"tracking_failed"}`（包括承运方接口出错） |

</Staging>

### 报价状态

`active`、`accepted`（已支付下单）、`canceled`、`expired`

---

## 查询运单轨迹

两条路径都可以用运单号查轨迹（A 模式的主要跟踪方式）：

```http
GET /api/waybills/{waybillNo}/events
```

```json
{
  "trackingNo": "TH24020001",
  "state": "delivered",
  "stateText": "已签收",
  "licensePlate": "1กข 1234",
  "courierPhone": "0898765432",
  "podImages": ["https://..."],
  "returnedItems": [],
  "routes": [
    { "state": "created", "stateText": "已建单", "message": "运单已创建", "createdAt": 1706900000 },
    { "state": "delivered", "stateText": "已签收", "message": "已送达收件人", "createdAt": 1707000000 }
  ]
}
```

:::caution
`routes[].createdAt` 是 **Unix 秒**（不是毫秒，也不是 ISO 字符串）。
:::

## 回传轨迹事件

如果履约环节在你那边，可以把轨迹回传给 TMS：

```http
POST /api/delivery-events
```

需要 `delivery.tracking` 套餐功能。

```json
{
  "waybill_id": "uuid",
  "event_type": "picked_up",
  "event_time": "2026-09-23T08:00:00Z",
  "coordinates": "13.7563,100.5018",
  "notes": "已从仓库取件"
}
```

| 字段 | 说明 |
|---|---|
| `waybill_id` / `package_id` | 二选一，`package_id` 优先 |
| `event_type` | 见[运单状态枚举](./waybills.md#运单状态) |
| `event_time` | 可选，默认当前时间 |
| `coordinates` | 可选，`"纬度,经度"` |
| `notes` | 可选，事件描述 |
| `photos` | 可选，`data:image/...;base64,` 格式的图片数组 |

事件冲突（比如已签收又回传取件）返回 `409 {"error":"...","conflict":true,"messages":[...]}`。

<Staging source="tms#225">

请求会先整体校验，客户端的错误返回 4xx，不再返回 500：

| 状态码 | 什么时候 |
|---|---|
| `201` | 已记录，响应体是创建的事件 |
| `400` | 请求体不是合法 JSON；`waybill_id`、`package_id` 都没传，或不是 UUID；`event_type` 缺失或不在允许的取值里（**`draft` 不能作为事件回传**）；`event_time` 无法解析；`photos` 不是数组，或其中有不是 `data:image/...;base64,` 格式的元素；`ignore_conflicts` 不是布尔值（字符串 `"true"` 也不行） |
| `404` | 运单或包裹不存在，或不属于你的组织 |
| `409` | 事件冲突，响应体同上 |
| `422` | 运单存在，但下面没有包裹，没有可以记录事件的对象 |
| `500` | 服务端意外错误 |

除 `409` 外，错误响应都是 `{"error":"..."}`。

- 传 `package_id` 时，事件只记录在这个包裹上（同时传了 `waybill_id` 也以 `package_id` 为准）。
- 传 `waybill_id` 时，事件记录在运单的每个包裹上。系统先检查所有包裹：任何一个包裹冲突就返回 `409`，**一个事件也不记录**；传 `"ignore_conflicts": true` 则不做冲突检查，照常记录。`201` 的响应体是第一个包裹（按创建先后）的事件。

</Staging>

<Staging source="tms#233">

### 跨境里程碑

走跨境路段的运单可以回传跨境里程碑：请求里加 `secondary_event_type`。每个里程碑对应一个普通的 `event_type`，运单和包裹状态按这个 `event_type` 变化；`event_type` 可以不传，由系统补上，传了就必须是对应的那个，否则返回 `400`。

| `secondary_event_type` | 里程碑 | 对应的 `event_type` |
|---|---|---|
| `transport_collecting` | 已接 | `picked_up` |
| `transport_originalport` | 已装柜 | `in_transit_sorted` |
| `customs_finished` | 出口清关完成 | `in_transit_hub_outbound` |
| `transport_departed` | 已离港 | `in_transit_hub_outbound` |
| `transport_arrived` | 已到港 | `in_transit_hub_inbound` |
| `transport_finished` | 进口清关完成 | `in_transit_sorted` |
| `transport_handover` | 已送达 | `delivered` |

```json
{
  "waybill_id": "uuid",
  "secondary_event_type": "customs_finished",
  "event_time": "2026-10-15T08:00:00Z"
}
```

返回的事件里带 `secondary_event_type`，普通事件为 `null`。

</Staging>

## 三套状态枚举别混用

系统里有三套不同的状态，含义和取值都不一样：

| 枚举 | 用在哪 | 取值 |
|---|---|---|
| 运单 / 轨迹事件 | `GET /api/waybills/{no}/events`、`POST /api/delivery-events` | `created`、`picked_up`、`delivering`、`delivered`… |
| 配送状态 | 4A 的配送记录 | `pending`、`ready_for_pickup`、`assigned`、`in_transit`、`delivered`、`failed`、`cancelled` |
| 订单跟踪状态 | `GET /api/orders/{id}/tracking` | `pending`、`assigning_driver`、`driver_assigned`、`picked_up`、`in_transit`、`delivered`、`canceled`、`failed` |

特别注意配送状态用英式 `cancelled`，订单跟踪状态用美式 `canceled`。
