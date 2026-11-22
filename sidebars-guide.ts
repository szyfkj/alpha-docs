import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * User guide sidebars — one per product.
 *
 * Every id is prefixed with its product folder, so any of these can be lifted
 * into a docs instance of its own later without a single URL changing.
 */
const sidebars: SidebarsConfig = {
  guideTmsSidebar: [
    'tms/index',
    {
      type: 'category',
      label: '开始使用',
      collapsed: false,
      items: [
        'tms/getting-started/signup',
        'tms/getting-started/navigation',
        'tms/getting-started/concepts',
      ],
    },
    {
      type: 'category',
      label: '运单',
      items: [
        'tms/waybills/list',
        'tms/waybills/import',
        'tms/waybills/detail',
        'tms/waybills/events',
        'tms/waybills/labels',
        'tms/waybills/consolidate',
        'tms/waybills/subcontract',
        'tms/waybills/statuses',
      ],
    },
    {
      type: 'category',
      label: '配送',
      items: [
        'tms/delivery/planning',
        'tms/delivery/tracking',
        'tms/delivery/address',
      ],
    },
    {
      type: 'category',
      label: '司机',
      items: ['tms/driver/scan', 'tms/driver/pod'],
    },
    {
      type: 'category',
      label: '合作伙伴',
      items: [
        'tms/partners/drivers',
        'tms/partners/subcontractors',
        'tms/partners/contractors',
        'tms/partners/sender-accounts',
      ],
    },
    {
      type: 'category',
      label: '账单与财务',
      items: [
        'tms/billing/overview',
        'tms/billing/rate-cards',
        'tms/billing/billing-profiles',
        'tms/billing/billings',
        'tms/billing/invoices',
        'tms/billing/payments',
        'tms/billing/cycle-runs',
        'tms/billing/reconciliation',
        'tms/billing/costs',
        'tms/billing/reports',
      ],
    },
    {
      type: 'category',
      label: '设置',
      items: [
        'tms/settings/organization',
        'tms/settings/services',
        'tms/settings/routes',
        'tms/settings/automation',
        'tms/settings/sub-accounts',
        'tms/settings/labels-integrations',
      ],
    },
    {
      type: 'category',
      label: '面向客户',
      items: ['tms/customers/tracking'],
    },
    {
      type: 'category',
      label: '参考',
      items: [
        'tms/reference/glossary',
        'tms/reference/permissions',
        'tms/reference/features',
        'tms/reference/faq',
      ],
    },
  ],

  guideWmsSidebar: [
    'wms/index',
    'wms/receiving',
    'wms/warehouses',
    'wms/users',
    'wms/mobile-sign-out',
  ],

  guideVoiceSidebar: ['voice/index'],

  guideLiteimportSidebar: [
    'liteimport/index',
    'liteimport/custom-domains',
    'liteimport/affiliate-analytics',
    'liteimport/taobao',
    'liteimport/returns',
  ],

  guideMarketingSidebar: [
    'marketing/index',
    {
      type: 'category',
      label: '入门',
      collapsed: false,
      items: ['marketing/getting-started', 'marketing/overview', 'marketing/workspace'],
    },
    {
      type: 'category',
      label: '准备',
      collapsed: false,
      items: ['marketing/settings'],
    },
    {
      type: 'category',
      label: '内容制作',
      collapsed: false,
      items: [
        'marketing/research',
        'marketing/ideas',
        'marketing/review',
        'marketing/production',
        'marketing/shoots',
        'marketing/editing',
        'marketing/publishing',
      ],
    },
    {
      type: 'category',
      label: '效果与投入',
      items: ['marketing/results', 'marketing/boosts'],
    },
    {
      type: 'category',
      label: '达人与活动',
      items: ['marketing/creators', 'marketing/campaigns'],
    },
    {
      type: 'category',
      label: '附录',
      items: [
        'marketing/weekly',
        'marketing/exercises',
        'marketing/glossary',
        'marketing/faq',
      ],
    },
  ],
};

export default sidebars;
