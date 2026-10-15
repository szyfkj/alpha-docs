---
id: webhooks
title: 5. 配送事件 Webhook
sidebar_position: 6
---

# 5. 配送事件 Webhook

货物状态变化时，系统可以主动 POST 到你的接口，省去轮询。

## 机制

对外推送**不是一个独立的订阅功能**，而是「自动化规则」的一种动作。配置在后台，不在 API 里。

在后台 **设置 → 自动化** 新建规则：

1. **触发器**选 `delivery_event_created`（有新轨迹事件时）
2. **动作**选 `http_webhook`
3. 填写：

| 配置项 | 说明 |
|---|---|
| `url` | 你的接收地址，必须是 `http(s)` |
| `method` | **请选 `POST`**，见下方注意事项 |
| `headers` | 额外请求头，JSON 格式字符串 |
| `body_template` | 自定义内容模板，JSON 格式字符串，支持 `{{字段名}}` 占位 |
| `timeout` | 超时秒数 |

规则还可以加条件（按重量、标签、服务、线路等过滤），只有匹配的事件才推送。

页面上有 **Fire Now** 按钮可以立即发一条测试推送。

:::note
目前**没有创建自动化规则的 API**，规则只能在后台配置。
:::

:::caution
后台的 `method` 下拉里虽然能选 `PUT` / `PATCH`，但服务端只实现了 `POST`、`GET`、`DELETE`。选 `PUT` 或 `PATCH` 会导致推送直接失败。**请用 `POST`。**
:::

## 可订阅的触发器

| 触发器 | 时机 | 推送内容 |
|---|---|---|
| `delivery_event_created` | 产生新的轨迹事件（最常用） | 事件 + 运单摘要 |
| `waybill_received` | 收到新运单 | 完整运单 |
| `waybill_canceled` | 运单被取消 | 完整运单 |
| `waybill_paid` | 运单已付款 | 完整运单 |
| `scheduled_task` | 定时任务 | `{ triggeredAt }` |

本文其余部分以最常用的 `delivery_event_created` 为例。运单类触发器推送的 `data` 是完整的运单对象，字段与 `GET /api/waybills/{waybillNo}` 一致。

## 推送内容

系统以 `POST` 发送 JSON：

```json
{
  "additional": {},
  "data": {
    "delivery_event_id": "uuid",
    "waybill_id": "uuid",
    "waybill_no": "TH00012345",
    "external_waybill_no": "ORDER-2026-001",
    "tags": ["fragile"],
    "place": "Bangkok Hub",
    "event_type": "delivered",
    "event_time": "2026-09-23T08:30:00Z",
    "metadata": {},
    "event": "delivery_event_created",
    "service_id": "uuid",
    "organization_ids": ["uuid"],
    "contractor_id": null
  },
  "context": {
    "taskId": "uuid",
    "organizationId": "uuid",
    "timestamp": "2026-09-23T08:30:05Z"
  },
  "api_key": "ak_example000000",
  "nonceStr": "1771545605000",
  "sign": "（大写十六进制签名）"
}
```

| 字段 | 说明 |
|---|---|
| `data.delivery_event_id` | 事件唯一 ID，**用它去重** |
| `data.waybill_no` | 系统运单号 |
| `data.external_waybill_no` | 你自己的单号（建单时传的 `outTradeNo`） |
| `data.event_type` | 事件类型，见[运单状态枚举](./waybills.md#运单状态) |
| `data.event_time` | 事件发生时间（UTC） |
| `data.place` | 发生地点名称 |
| `data.contractor_id` | 上游委托方，没有则为 `null` |
| `context.taskId` | 本次推送任务 ID |
| `additional` | 你配置的 `body_template` 渲染后的结果 |

<Staging source="tms#233">

`data.secondary_event_type`：跨境里程碑（见[回传轨迹事件](./delivery.md#跨境里程碑)），比如 `customs_finished`；普通事件为 `null`。

</Staging>

### `body_template`

用 `{{字段名}}` 从 `data` 里取值。例如模板：

```json
{ "tracking_number": "{{waybill_no}}", "status": "{{event_type}}", "at": "{{event_time}}" }
```

渲染结果会放进推送体的 `additional` 字段。取不到的字段会原样保留占位符。

## 验签

推送体里的 `api_key` / `nonceStr` / `sign` 用的是**和请求签名完全相同**的算法：去掉 `sign` 后对整个 body 做规范化 JSON，再用你的 `api_secret` 算 HMAC-SHA256。

```javascript
const crypto = require('crypto');
// canonicalize() 与鉴权章节里的完全一样
function canonicalize(value) { /* 见 1. 组织鉴权 */ }

function verify(body, apiSecret, maxAgeMs = 5 * 60 * 1000) {
  const { sign, ...rest } = body;
  if (typeof sign !== 'string') return false;
  if (typeof body.nonceStr !== 'string') return false;

  // 时效检查
  const ts = parseInt(body.nonceStr, 10) || 0;
  if (maxAgeMs > 0 && Math.abs(Date.now() - ts) > maxAgeMs) return false;

  const expected = crypto.createHmac('sha256', apiSecret)
    .update(canonicalize(rest)).digest('hex').toUpperCase();

  // 定长比较，避免时序侧信道
  const a = Buffer.from(sign);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

app.post('/webhooks/delivery-events', express.json(), (req, res) => {
  if (!verify(req.body, process.env.TMS_API_SECRET)) {
    return res.status(401).json({ error: 'bad signature' });
  }
  // 先落库去重，再返回 200，耗时处理放异步
  enqueue(req.body.data);
  res.json({ success: true });
});
```

用官方 Node SDK 的话可以直接调 `verifyWebhookSignature(req.body, { apiSecret })`。

:::caution
如果你的组织没有配置 API 凭证，推送将**不带 `sign` 字段**。这种推送无法验证来源，请不要当作可信数据处理。
:::

## 你的接口要满足什么

1. 接受 `Content-Type: application/json` 的 `POST`
2. **尽快返回 2xx**，耗时逻辑放到异步队列里
3. **做幂等** —— 用 `data.delivery_event_id` 去重

## 重要：不要把 Webhook 当作唯一数据源

:::danger
Webhook 推送**不保证送达、也不保证重试**。你的接口返回非 2xx、超时或临时宕机时，这条事件就丢了，不会自动补发。
:::

正确的做法是**推送 + 轮询双保险**：

- 用 Webhook 获得实时性
- 同时定期调 `GET /api/waybills/{waybillNo}/events` 对账，补上漏掉的事件

对于在途运单，建议至少每小时对账一次；对于关键业务节点（如签收），建议缩短到分钟级。

```javascript
// 对账示例：把本地记录的最后事件时间和服务端对比
const remote = await getWaybillEvents(waybillNo);
const localLast = await getLocalLastEventTime(waybillNo);
const missed = remote.routes.filter((r) => r.createdAt * 1000 > localLast);
for (const event of missed) {
  await applyEvent(waybillNo, event);   // 与 webhook 走同一套幂等处理
}
```

把 Webhook 处理和轮询补偿**接到同一个幂等函数上**，重复到达就是无害的。
