---
id: waybills
title: 2. 运单 CRUD
sidebar_position: 3
---

# 2. 运单 CRUD

运单（waybill）是系统里的核心单据，代表**一票货**。一张运单下挂若干包裹（parcel/package）。

| 操作 | 接口 |
|---|---|
| 建单 | `POST /api/waybills` |
| 列表 | `GET /api/waybills` |
| 详情 | `GET /api/waybills/{waybillNo}` |
| 改单 | `PATCH /api/waybills/{waybillNo}` |
| 取消 | `DELETE /api/waybills/{waybillNo}` |
| 查轨迹 | `GET /api/waybills/{waybillNo}/events` |
| 预分配单号 | `POST /api/waybills/allocate-number` |
| 面单 PDF | `GET /api/waybills/{waybillNo}/label` |

以上均需 `waybills` 套餐功能。

## 建单

```http
POST /api/waybills
```

:::caution 字段命名
建单接口使用 **camelCase** 字段名（`outTradeNo`、`parcelList`、`receiverName`……），这是为兼容早期集成保留的格式。不要用 `recipient` / `packages` 这类命名，会直接返回 `422`。
:::

### 必填字段

| 字段 | 类型 | 说明 |
|---|---|---|
| `outTradeNo` | string | **你自己系统的单号**，作为幂等键。重复推送同一个值的行为由 `overwrite` 参数决定 |
| `parcelList` | array | 包裹列表，至少 1 个 |

### 寄件人 / 收件人

不传 `route_id` 时，以下字段必填：

| 字段 | 类型 | 说明 |
|---|---|---|
| `senderPhone` | string | 寄件人电话。系统据此匹配你已登记的发货地址 |
| `receiverName` | string | 收件人姓名 |
| `receiverPhone` | string | 收件人电话 |
| `receiverProvinceName` | string | 省 |
| `receiverCityName` | string | 市 |
| `receiverPostCode` | string | 邮编 |
| `receiverAddress` | string | 详细地址 |

`receiverDistrictName`（区/县）可选但强烈建议传。其余可选：`senderName`、`senderAddress`、`senderCityName`、`senderDistrictName`、`senderPostCode`、`receiverPhone2`。

传了 `route_id` 时，收发双方从线路的首尾节点推导，上述字段全部变为可选。

:::tip
收件地址建议先用[地址解析](./address.md)接口规范化，拿到标准的省/市/区/邮编再填进来，能显著降低分拣异常率。
:::

### `parcelList` 每一项

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `outParcelNo` | string | 是 | 你自己的包裹号 |
| `itemDesc` | string | 是 | 品名描述 |
| `itemValue` | number | 是 | 货值，不能为负 |
| `weight` | number | 否 | 重量（kg） |
| `length` / `width` / `height` | number | 否 | 尺寸（cm） |
| `piece_count` | number | 否 | 件数（正整数） |
| `productList` | array | 否 | 商品明细 |
| `photos` | array | 否 | 图片 URL |

`productList` 每项：`sku`、`name` 必填，`quantity`、`weight`、`length`、`width`、`height` 可选。

<Staging source="tms#208">

`productList` 每项还可以带一个可选的 `metadata` 对象，存放这件产品的自定义信息，比如报关用的生产资料：

```json
{
  "sku": "SKU-001",
  "name": "Wireless Mouse",
  "quantity": 2,
  "metadata": { "hsCode": "8471.60", "origin": "CN", "manufacturer": "Example Electronics Ltd" }
}
```

- 任意 JSON 对象，按 UTF-8 编码的 JSON 计不超过 8 KB。超过 8 KB 或不是对象（比如字符串），返回 `422` 参数校验失败。
- [详情](#详情)接口在 `packages[].products[].metadata` 里原样返回；没传的产品返回 `null`。
- 用 `overwrite=overwrite` 重新推送同一张单时，同一包裹里 `sku` 相同的产品如果**没传** `metadata`，保留原来的值；传 `null` 则清空。
- 新增包裹接口（`POST /api/waybills/{waybillNo}/packages`）的 `parcel.productList` 同样接受 `metadata`。
- TMS 后台的运单详情页会把它按“名称 / 值”逐行显示出来，只读，不能在页面上改。

</Staging>

### 常用可选字段

| 字段 | 类型 | 说明 |
|---|---|---|
| `service_id` | uuid | 指定服务 |
| `route_id` | uuid | 指定线路，收发双方从线路推导 |
| `sender_account` | object | `{ code?, id? }`，关联到某个客户账号 |
| `additional_service_ids` | uuid[] | 增值服务 |
| `insurance` | object | `{ declaredValue }`，保价金额（组织结算币种） |
| `autoSplit` | boolean | 默认 `true`，每件商品拆成独立包裹；批量同款货请传 `false` 并用 `piece_count` |
| `estimatedWeight` / `estimatedVolume` / `volumetricWeight` | number | 整票计费总量 |
| `reference_no` | string | 内部参考号 |
| `remark` | string | 备注 |

### 重复推送的处理

用 query 参数 `overwrite` 控制同一个 `outTradeNo` 再次推送时的行为：

| 值 | 行为 |
|---|---|
| `reject` | **默认**，返回 `409` 重复运单 |
| `overwrite` | 覆盖原运单（原地更新，运单 ID 不变） |
| `return_existing` | 原样返回已有运单，不做修改 |
| `return_if_accepted` | 已接单则返回，否则覆盖 |

```http
POST /api/waybills?overwrite=return_existing
```

### 请求示例

```json
{
  "api_key": "ak_example000000",
  "nonceStr": "1771545600000",
  "sign": "（按鉴权章节算出的 64 位大写十六进制）",
  "outTradeNo": "ORDER-2026-001",
  "senderPhone": "0212345678",
  "senderName": "Acme 仓库",
  "senderAddress": "123 Sukhumvit Road",
  "senderCityName": "Bangkok",
  "senderPostCode": "10110",
  "receiverName": "张三",
  "receiverPhone": "0812345678",
  "receiverProvinceName": "Bangkok",
  "receiverCityName": "Bangkok",
  "receiverDistrictName": "Chatuchak",
  "receiverPostCode": "10900",
  "receiverAddress": "456 Phaholyothin Road",
  "parcelList": [
    {
      "outParcelNo": "PKG-001",
      "itemDesc": "电子产品",
      "itemValue": 1200,
      "weight": 1.5,
      "length": 30,
      "width": 20,
      "height": 15
    }
  ],
  "remark": "易碎，轻拿轻放"
}
```

成功返回 `201` 和运单详情，其中包含系统生成的 `waybill_no`。

### 建单错误

| HTTP | 错误码 | 含义 |
|---|---|---|
| `422` | `1000` | 参数校验失败，`error` 里会指出具体字段 |
| `409` | `1003` | 运单已存在（`overwrite=reject` 时） |
| `403` | `1000` | 该单号属于别的组织 |
| `400` | `1000` | 寄件人地址匹配不到，或缺少寄件人电话 |

## 查询运单

### 列表

```http
GET /api/waybills?page=1&pageSize=20
```

返回 `{ data, total, page, pageSize, totalPages }`。

:::caution
这是 `GET` 请求，签名字段要放在 query string 里，并且**所有参数值签名前都要转成字符串**。详见[鉴权章节](./authentication.md#签名算法)。
:::

### 详情

```http
GET /api/waybills/{waybillNo}
```

`{waybillNo}` 既可以传系统运单号，也可以传你自己的 `outTradeNo`，系统会自动识别。

## 修改运单

```http
PATCH /api/waybills/{waybillNo}
```

只接受以下 7 个字段，传其他字段会被忽略：

`reference_no`、`notes`、`tags`、`priority`、`requires_signature`、`sender_account_id`、`product_category_id`

传空对象会返回 `400 "No valid fields to update"`。

需要改地址、包裹或重量？用 `overwrite=overwrite` 重新推送整张单。

## 取消运单

```http
DELETE /api/waybills/{waybillNo}
```

只有处于可取消状态的运单才能取消，否则返回 `400`。运单不存在返回 `404`。

:::note
`DELETE` 的签名字段放在 **JSON body** 里，和 `POST` 一样。
:::

## 面单 PDF

```http
GET /api/waybills/{waybillNo}/label
```

直接返回 `application/pdf` 二进制流，不是 JSON。可选 query 参数 `packageId` 用于只打某一个包裹的面单。

批量打印：

```http
POST /api/waybills/batch-label
{ "waybill_nos": ["WB001", "WB002"] }
```

单次最多 100 张，返回合并后的 PDF。

## 预分配单号

需要先拿到单号再建单（比如要先印面单）时：

```http
POST /api/waybills/allocate-number
```

请求体除签名字段外可以为空，返回 `{ "number": "ABC1A748213905" }`。该功能需要组织启用自定义单号。

## 响应格式

系统有两种响应信封，**同一个接口返回哪种取决于请求方**，不影响请求体格式。

### 默认格式

成功直接返回数据本身，失败返回 `{"error":"..."}`，并且 **HTTP 状态码是真实的**：

```json
{ "error": "运单不存在" }
```

### 兼容信封

带上 `X-Legacy-Response: true` 时，或你的组织被配置为兼容模式时，返回统一信封，且 **HTTP 状态码永远是 200**，靠 `code` 判断成败：

```json
{
  "code": 1006,
  "success": false,
  "message": "运单不存在",
  "data": null,
  "extra": null
}
```

:::caution
包裹相关接口（新增包裹、拆分包裹）**强制**使用兼容信封，永远返回 HTTP 200。接入这两个接口时务必检查 `code` 而不是 HTTP 状态码。
:::

### 错误码

| `code` | 含义 |
|---|---|
| `0` | 成功 |
| `-1` | 系统错误 |
| `1000` | 参数校验失败 |
| `1001` | 组织不存在 |
| `1002` | 签名验证失败 |
| `1003` | 运单重复 |
| `1004` | 发货地址未匹配到 |
| `1005` | 收货地址未匹配到 |
| `1006` | 运单不存在 |
| `1007` | 未分配承运方 |
| `1008` | 包裹重复 |

## 运单状态

运单状态与轨迹事件类型是同一套枚举：

`draft`、`created`、`picked_up`、`accepted`、`delivering`、`delivered`、`failed`、`exception`、`canceled`、`rescheduled`、`returning`、`returned`、`in_transit_sorted`、`in_transit_hub_inbound`、`in_transit_hub_outbound`

其中 `in_transit_sorted`、`in_transit_hub_inbound`、`in_transit_hub_outbound` 是**可重复发生**的（货物会多次经过中转场）。

查询轨迹见[配送规划与跟踪](./delivery.md#查询运单轨迹)。
