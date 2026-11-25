---
id: permissions
title: 权限一览
sidebar_position: 1
---

# 权限一览

在 **设置 → 团队成员** 里给每个人勾。完整操作见[团队成员与权限](../settings/sub-accounts)。

:::note 这个界面是英文的
权限名称不跟随界面语言，中文界面下看到的也是英文。下表按界面上的原文列出。
:::

## 全部权限

| 权限组 | 子权限 | 能做什么 |
|---|---|---|
| **Scan** | | 扫码 |
| | Pickup | 取件扫描 |
| | Inbound | 入库扫描 |
| | Sort | 分拣 |
| | Outbound | 出库扫描 |
| | Delivery | 配送扫描 |
| **Waybills** | | 建单、改单、取消，以及指定承运商 |
| **Deliveries** | | 建配送、派司机 |
| | Address Preprocessing | 处理配送地址 |
| | Create | 新建配送 |
| | Assign | 给配送派司机 |
| **Customer Service** | | 客户咨询与工单 |
| | Customer Channels | 客户沟通渠道 |
| | Driver Channels | 司机沟通渠道 |
| **Partner Management** | | 合作伙伴管理 |
| | Subcontractor Management | 管理承运商机构 |
| | Drivers | 管理司机及其派活 |
| **System Settings** | | 系统级设置 |
| | User | 管理用户及其权限 |
| | Organization | 管理机构及其设置 |
| | Automation | 管理自动化规则 |
| | Service Area | 管理服务区域 |
| | Label Template | 管理标签模板 |
| **Billing** | | 打开账单菜单，做它的日常工作：账单记录、发票、账单配置、计费周期、成本和报告 |
| | Rate Cards | 增删改定价用的价格表 |
| | Payments | 记录收款、核验银行水单、标记发票已付 |
| | Wallet Adjustment | 手工增减寄件人账户的预付余额，背后没有实际收款 |

## 几条规则

**机构所有者拥有全部权限。** 不需要勾，也勾不了。

**给了子权限就等于进得了这个菜单。** 例如只给 Billing → Payments，账单菜单就会出现。

**扫码按环节给。** 这决定司机在手机扫描页的事件类型下拉里能选什么，
见[司机扫码](../driver/scan)。

<Staging source="tms#350">

**Scan → Override Conflicts：冲突了也能记。** 在运单列表里 **添加轨迹事件** 时，如果新事件和已有事件冲突（比如已签收的运单再记一条在途），系统会拦下来。有这个子权限的成员会和机构所有者一样看到 **检测到冲突事件** 的提示，点 **仍然创建** 就能照样记录；没有的成员只看到报错，记不了。勾选整个 Scan 权限组也包含它。团队成员列表里它显示为 **扫描：强制创建冲突事件**。

</Staging>

**权限之外还有一道套餐门。** 权限给足了仍然看不到菜单，就是机构套餐里没有这个功能，
见[功能与套餐](./features)。
