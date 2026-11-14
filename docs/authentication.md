---
id: authentication
title: 1. 组织鉴权
sidebar_position: 2
---

# 1. 组织鉴权

所有服务端接口都用**组织级 API 密钥 + HMAC 签名**鉴权。没有 OAuth，没有 access token，也不需要先登录换票 —— 每个请求自带签名，独立验证。

## 获取凭证

在后台 **设置 → 组织 → API Credentials** 页面获取：

| 凭证 | 形如 | 用途 |
|---|---|---|
| `api_key` | `ak_xxxxxxxxxxxx` | 标识你的组织，随请求明文发送 |
| `api_secret` | `as_xxxxxxxxxxxxxxxx` | 用于计算签名，**永远不要发送出去** |

同一页面可以重新生成凭证。重新生成会立即让旧凭证失效，请先完成灰度切换。

:::warning
`api_secret` 等同于你整个组织的操作权限。只放在服务端，不要写进 App、小程序、前端代码或任何会下发到客户端的配置。
:::

## 签名算法

三个鉴权字段 `api_key`、`nonceStr`、`sign` 和业务字段**混在同一层**，不是放在 header 里。

计算步骤：

1. 准备好业务 payload，加上 `api_key` 和 `nonceStr`。
2. 把这个对象（**不含 `sign`**）做**规范化 JSON** 序列化。
3. `sign = HMAC-SHA256(api_secret, 规范化JSON)`，转成**大写十六进制**。
4. 把 `sign` 放回对象里一起发送。

其中：

- **`nonceStr`** 是当前时间戳的**毫秒**值，且必须是**字符串**。例如 `"1771545600000"`。
- **规范化 JSON** 的规则：
  - 对象的 key **递归**按字典序排序（各层都排）
  - 不含任何空白字符
  - 值为 `undefined` 的 key 直接丢弃
  - `NaN` 和 `Infinity` 序列化为 `null`
  - 字符串按标准 JSON 规则转义
- 签名结果是 **64 个大写十六进制字符**。

:::danger 签名字段的位置取决于 HTTP 方法
- `POST` / `PUT` / `PATCH` / `DELETE` —— 三个字段放在 **JSON body** 里
- `GET` —— 三个字段放在 **query string** 里

`GET` 请求有个很容易踩的坑：query 参数传到服务端后**全都是字符串**。所以签名前必须把每个参数值都转成字符串，否则 `{"page":1}` 和 `{"page":"1"}` 算出来的签名不一样，必然验签失败。
:::

### 时效

`nonceStr` 与服务器时钟相差超过 **±5 分钟** 的请求会被拒绝。请确保你的服务器开启了 NTP 时间同步。

`nonceStr` 只做时效判断，**不做重放记录** —— 同一个签名在 5 分钟窗口内可以重复使用。因此对于创建类操作，请自带业务幂等键（建单用 `outTradeNo`，报价用 `request_id`）。

## 代码示例

### Node.js

```javascript
const crypto = require('crypto');

function canonicalize(value) {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (typeof value === 'boolean') return String(value);
  if (typeof value === 'number') {
    return Number.isFinite(value) ? String(value) : 'null';
  }
  if (typeof value === 'string') return JSON.stringify(value);
  if (value instanceof Date) return JSON.stringify(value.toISOString());
  if (Array.isArray(value)) {
    return '[' + value.map(canonicalize).join(',') + ']';
  }
  const pairs = Object.keys(value).sort()
    .filter((k) => value[k] !== undefined)
    .map((k) => JSON.stringify(k) + ':' + canonicalize(value[k]));
  return '{' + pairs.join(',') + '}';
}

function sign(payload, apiSecret) {
  const { sign: _drop, ...rest } = payload;
  return crypto.createHmac('sha256', apiSecret)
    .update(canonicalize(rest))
    .digest('hex')
    .toUpperCase();
}

async function callApi(path, body, { apiKey, apiSecret }) {
  const payload = { ...body, api_key: apiKey, nonceStr: String(Date.now()) };
  payload.sign = sign(payload, apiSecret);

  const res = await fetch('https://staging.alphacargo.io' + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept-Language': 'zh' },
    body: JSON.stringify(payload),
  });
  return res.json();
}
```

`GET` 请求把同样的 payload 放进 query string，注意先转字符串：

```javascript
async function getApi(path, params, { apiKey, apiSecret }) {
  const payload = { api_key: apiKey, nonceStr: String(Date.now()) };
  // 关键：query 参数到服务端都是字符串，签名前必须统一转成字符串
  for (const [k, v] of Object.entries(params || {})) {
    payload[k] = String(v);
  }
  payload.sign = sign(payload, apiSecret);

  const qs = new URLSearchParams(payload).toString();
  const res = await fetch(`https://staging.alphacargo.io${path}?${qs}`, {
    headers: { 'Accept-Language': 'zh' },
  });
  return res.json();
}
```

### Python

```python
import hashlib, hmac, json, time
import requests

def canonicalize(value):
    if value is None:
        return 'null'
    # bool 必须排在 int 前面：Python 里 bool 是 int 的子类
    if isinstance(value, bool):
        return 'true' if value else 'false'
    if isinstance(value, int):
        return str(value)
    if isinstance(value, float):
        if value != value or value in (float('inf'), float('-inf')):
            return 'null'
        # 整数值的浮点数不要输出成 1.0
        if value.is_integer():
            return str(int(value))
        return repr(value)
    if isinstance(value, str):
        return json.dumps(value, ensure_ascii=False, separators=(',', ':'))
    if isinstance(value, list):
        return '[' + ','.join(canonicalize(v) for v in value) + ']'
    if isinstance(value, dict):
        pairs = [
            json.dumps(k, ensure_ascii=False, separators=(',', ':')) + ':' + canonicalize(v)
            for k, v in sorted(value.items())
        ]
        return '{' + ','.join(pairs) + '}'
    return json.dumps(value, ensure_ascii=False, separators=(',', ':'))


def sign(payload, api_secret):
    rest = {k: v for k, v in payload.items() if k != 'sign'}
    return hmac.new(
        api_secret.encode('utf-8'),
        canonicalize(rest).encode('utf-8'),
        hashlib.sha256,
    ).hexdigest().upper()


def call_api(path, body, api_key, api_secret):
    payload = dict(body)
    payload['api_key'] = api_key
    payload['nonceStr'] = str(int(time.time() * 1000))
    payload['sign'] = sign(payload, api_secret)

    resp = requests.post(
        'https://staging.alphacargo.io' + path,
        json=payload,
        headers={'Accept-Language': 'zh'},
        timeout=30,
    )
    return resp.json()
```

:::tip
不想自己实现签名的话，用官方 Node SDK `@alphacargo/tms-sdk`，它已经封装好了签名、重试和错误类型。
:::

## `X-Sender-Account-Id`（模式 B 必读）

如果你走的是**报价卖运力**模式，报价与订单接口还需要一个额外的 header，表示"我这次是代表哪个客户在操作"：

```http
X-Sender-Account-Id: 9f8b7c6d-5e4f-4a3b-2c1d-0e9f8a7b6c5d
```

要点：

- 这个 header **不参与签名计算**。服务端会校验该客户账号确实属于你的组织。
- 值是客户账号的 UUID，通过 `GET /api/sender-accounts` 获取（该接口受 `sender_accounts` 套餐限制）。
- 只有 `POST /api/quotes` 允许**不带**这个 header —— 用于"先报价、后确认客户是谁"的场景，报出来的价属于无主报价。

错误语义要特别注意：

| 情况 | 返回 |
|---|---|
| 没带这个 header，但接口需要 | `401 {"error":"unauthenticated"}` |
| header 不是合法 UUID | `403 {"error":"forbidden"}` |
| 客户账号不存在 | `403 {"error":"forbidden"}` |
| 客户账号属于别的组织 | `403 {"error":"forbidden"}` |

后三种故意返回同样的结果，这样别人无法通过接口探测某个 UUID 是否存在。

注意 `403 forbidden`（小写）来自业务层，而签名本身没通过时返回的是 `401 {"error":"Unauthorized"}`（大写 U），来自更外层 —— 两者含义不同，排查时先看大小写。

## 多语言错误信息

带上 `Accept-Language` 可以让错误信息返回对应语言，支持 `en`、`th`、`zh`。不带或传不支持的值时回落到英文。

```http
Accept-Language: zh
```

只有错误**文案**会翻译，HTTP 状态码和错误码不变。

## 套餐限制

部分接口按订阅套餐开通。未开通时返回：

```json
{ "error": "Feature \"delivery.planning\" is not included in your subscription plan" }
```

| 接口 | 需要的套餐功能 |
|---|---|
| `/api/waybills` | `waybills` |
| `/api/load-planning` | `delivery.planning` |
| `/api/delivery-events` | `delivery.tracking` |
| `/api/sender-accounts` | `sender_accounts` |

`/api/organizations`、`/api/address/resolve`、`/api/regions`，以及全部报价与订单跟踪接口**不受套餐限制**。

<Staging source="tms#366">

`/api/delivery-events` 改为开通 `delivery.tracking` **或** `agent_workbench` 任一套餐功能即可调用。两者都没有时仍返回 `403`，错误里写的是 `delivery.tracking`。

</Staging>

## 排查

| 现象 | 可能原因 |
|---|---|
| `401 {"error":"Unauthorized"}` | 签名算错；`nonceStr` 不是毫秒字符串；服务器时钟偏移超过 5 分钟；`api_key` 不存在 |
| `401 {"error":"unauthenticated"}` | 接口需要 `X-Sender-Account-Id` 但没带 |
| `403 {"error":"forbidden"}` | `X-Sender-Account-Id` 非法、不存在，或不属于你的组织 |
| `403 Feature "..." is not included...` | 该接口未在你的套餐内开通 |
| `400 {"error":"Invalid domain"}` | 请求的域名不对，检查基地址 |

签名对不上时，最快的定位方法是**把你的规范化 JSON 字符串打印出来**，逐字符对比。常见原因：

1. `GET` 请求没把参数值转成字符串
2. 嵌套对象的 key 没有递归排序
3. 序列化时带了空格或换行
4. 把 `sign` 自己也算进去了
5. `nonceStr` 用了秒而不是毫秒
