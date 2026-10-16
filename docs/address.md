---
id: address
title: 3. 地址解析
sidebar_position: 4
---

# 3. 地址解析

把一行自由文本、一个地图链接或一对经纬度，变成结构化地址 + 坐标。

这个接口**不受套餐限制**，但仍需鉴权（签名或会话，见[组织鉴权](./authentication.md)）。两个场景都会用到：

1. **建单前** —— 规范化收件地址，拿到标准的省/市/区/邮编再填进运单
2. **报价前** —— 拿到经纬度。报价接口强制要求坐标且**永不代你做地理编码**，详见[配送规划与跟踪](./delivery.md#4b-报价--支付--下单--跟踪)

## 解析地址

```http
POST /api/address/resolve
```

三种输入模式**三选一**，返回结构完全相同：

| 模式 | 字段 | 说明 |
|---|---|---|
| 自由文本 | `address` (string) | 最常用 |
| 地图链接 | `url` (string) | Google Maps 分享链接或短链 |
| 反查 | `lat` + `lng` (number) | 已有坐标，反查结构化地址 |

`url` 只接受 Google Maps 链接，其他链接直接返回 `400`，不会被访问。认可的形式：

- `maps.app.goo.gl/…`、`goo.gl/maps/…` 短链
- `maps.google.<域名后缀>/…`
- `www.google.<域名后缀>/maps/…`、`google.<域名后缀>/maps/…`

`<域名后缀>` 可以是 `com`、两位国家后缀（如 `de`），或 `co.xx`、`com.xx` 形式（如 `co.th`、`com.hk`）。`http://` 链接按 `https://` 处理；带端口号或用户名密码的链接不接受。

短链的跳转只在上述地址之间跟随，最多 5 次。跳到其他页面（例如部分地区先跳到的 Google 同意页）时解析不出坐标，返回 `404`；这时改传链接里的经纬度，或直接传地址文本。

可选字段：

| 字段 | 类型 | 说明 |
|---|---|---|
| `country` | string | ISO-2 国家码，如 `TH`、`VN`。**强烈建议传** —— 它会影响地理编码的区域和语言偏好 |
| `logResolution` | boolean | 是否记录本次解析，默认 `true` |

### 请求示例

```json
{
  "api_key": "ak_example000000",
  "nonceStr": "1771545600000",
  "sign": "...",
  "address": "123 Sukhumvit Rd, Bangkok",
  "country": "TH"
}
```

### 响应

```json
{
  "lat": 13.7563,
  "lng": 100.5018,
  "country": "TH",
  "province": "กรุงเทพมหานคร",
  "district": "เขตปทุมวัน",
  "subdistrict": "แขวงปทุมวัน",
  "postal_code": "10330",
  "formatted_address": "ถนน พระรามที่ 1 แขวงปทุมวัน เขตปทุมวัน กรุงเทพมหานคร 10330 ไทย",
  "place_name": null,
  "confidence": 0.95,
  "source": "google_geocoding"
}
```

| 字段 | 说明 |
|---|---|
| `confidence` | 0–1 的匹配可信度 |
| `source` | 命中的数据源：`google_geocoding`、`google_places`、`postal_centroid`、`province_centroid` |
| `place_name` | 地点名称，只有 `source` 为 `google_places`（按地标/商场等检索命中）时才有值，其余为 `null` |

:::note 返回的是当地语言
省/区/街道等行政区名称和 `formatted_address` 按 `country` 对应的当地语言返回：`TH` 返回泰文，`VN` 返回越南文，`CN` 返回中文，其他国家返回英文；不传 `country` 时按泰国处理。请求里写英文地址也一样。例外是两种中心点兜底结果（`postal_centroid`、`province_centroid`）：它们的 `province` 一般是英文省名。
:::

## 务必判断 `confidence`

:::danger 解析器总会返回点什么
这个接口采用逐级兜底策略：精确地理编码 → 地点检索 → 仅按行政区匹配 → 邮编中心点 → **省中心点**。最后一级的 `confidence` 只有 `0.32`，坐标落在省会城市中心，和真实地址可能差上百公里。

所以只要能匹配到邮编或省份，它就会返回结果 —— 判断"这个结果能不能用"的责任在你这边。
:::

:::note 404 也是正常结果
以下情况会返回 `404`，请当作"解析不到"处理，而不是系统故障：

- 自由文本：地理编码和地点检索都没有足够可信（`confidence` ≥ 0.68）的结果，文本里也识别不出可用的邮编或省份
- 地图链接：链接里取不到坐标，或坐标反查不到地址
- 经纬度：该坐标反查不到地址
:::

建议的处理策略：

| `confidence` | 建议 |
|---|---|
| ≥ 0.68 | 可直接使用 |
| < 0.68 | 视为不可靠，转人工确认或要求客户补充地址 |

同时看 `source`：命中 `province_centroid` 或 `postal_centroid` 说明只匹配到了行政区，没匹配到门牌，用于**报价会导致算错行程和价格**。

```javascript
const from = await resolve({ address: userInput, country: 'TH' });
if (from.confidence < 0.68 || from.source === 'province_centroid') {
  throw new Error('地址太模糊，无法定价，请让客户补充详细地址');
}
```

## 错误

| HTTP | 说明 |
|---|---|
| `400` | 三种输入模式一个都没给，经纬度超出范围（纬度 ±90、经度 ±180），或 `url` 不是 Google Maps 链接（见上文“地图链接”的认可形式，返回 `{ "error": "url must be a Google Maps link" }`） |
| `401` | 签名缺失或无效，见[鉴权排查](./authentication.md#排查) |
| `404` | 解析不出任何结果，见上文 |
| `500` | 地理编码服务暂时出错，可稍后重试 |

## 行政区查询

需要做省/市/区三级联动下拉，或校验用户填的行政区是否存在：

```http
GET /api/regions?country=TH
GET /api/regions?country=TH&postal_code=10330
```

`country` 必填，否则返回 `400`。它按**大写 ISO-2 国家码精确匹配**：`th` 或不支持的国家不会报错，而是返回空列表 `{"provinces": []}`。传 `postal_code` 时只返回该邮编下的行政区。

返回三级嵌套结构（直接是这个对象，没有 `data` 包裹）：

```json
{
  "provinces": [
    {
      "name": "กรุงเทพมหานคร",
      "cities": [
        { "name": "เขต ปทุมวัน", "districts": [{ "name": "ปทุมวัน", "code": "10330" }] }
      ]
    }
  ]
}
```

注意键名和实际层级的对应关系：

| 键 | 实际层级 |
|---|---|
| `provinces[]` | 省 |
| `provinces[].cities[]` | 区/县（泰国的 อำเภอ / เขต） |
| `provinces[].cities[].districts[]` | 街道/乡（泰国的 ตำบล / แขวง） |
| `districts[].code` | 该街道的**邮编**，不是行政区划代码。多个街道可能共用一个邮编 |

名称都是当地语言（泰国为泰文）。

查询支持的国家列表：

```http
GET /api/regions/countries
```

返回有行政区数据的国家码列表：

```json
{ "data": ["TH", "VN"] }
```

这两个接口同样不受套餐限制，但同样需要鉴权，未通过返回 `401`。
