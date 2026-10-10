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

  guideWmsSidebar: ['wms/index'],

  guideVoiceSidebar: ['voice/index'],

  guideLiteimportSidebar: ['liteimport/index'],

  guideVideoSidebar: ['video/index'],
};

export default sidebars;
