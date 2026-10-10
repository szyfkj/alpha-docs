import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Alpha Docs',
  tagline: 'Alpha Cargo 产品文档',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://docs.alphacargo.io',
  baseUrl: '/',
  trailingSlash: false,

  organizationName: 'szyfkj',
  projectName: 'alpha-docs',

  // A broken link is a broken promise to an integrator — fail the build.
  onBrokenLinks: 'throw',

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  // Flow diagrams mix CJK and ASCII, which no monospace font aligns
  // consistently — they are drawn as real diagrams, not as text art.
  themes: ['@docusaurus/theme-mermaid'],

  i18n: {
    // zh-Hans rather than zh: Docusaurus ships translated theme strings for it.
    defaultLocale: 'zh-Hans',
    // The developer guide is Chinese only; an English reader following
    // /en/tms/* gets the Chinese page back, which is Docusaurus' normal
    // fallback. Only the user guide is translated for now.
    locales: ['zh-Hans', 'en'],
    localeConfigs: {
      'zh-Hans': { label: '简体中文' },
      en: { label: 'English' },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Namespaced so WMS and Voice can get their own instances later
          // without moving any URL that has already been published.
          routeBasePath: '/tms',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        // The user guide. One instance holding every product, each in
        // its own folder, so /guide/wms can be split out into an instance of
        // its own later without moving a single published URL.
        id: 'guide',
        path: 'guide',
        routeBasePath: '/guide',
        sidebarPath: './sidebars-guide.ts',
      },
    ],
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        // Chinese has no spaces to tokenise on, so the stock search cannot
        // index this site at all.
        language: ['zh', 'en'],
        docsDir: ['docs', 'guide'],
        docsRouteBasePath: ['/tms', '/guide'],
        indexBlog: false,
        hashed: true,
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Alpha Docs',
      logo: {
        alt: 'Alpha Cargo',
        src: 'img/logo.svg',
      },
      items: [
        {
          // A dropdown rather than a link: the per-product split is the point,
          // and it should be visible from every page.
          type: 'dropdown',
          label: '用户指南',
          position: 'left',
          to: '/guide/',
          items: [
            {
              type: 'docSidebar',
              docsPluginId: 'guide',
              sidebarId: 'guideTmsSidebar',
              label: 'TMS 运输管理',
            },
            {
              type: 'docSidebar',
              docsPluginId: 'guide',
              sidebarId: 'guideWmsSidebar',
              label: 'WMS 仓储管理',
            },
            {
              type: 'docSidebar',
              docsPluginId: 'guide',
              sidebarId: 'guideVoiceSidebar',
              label: 'Voice 语音',
            },
            {
              type: 'docSidebar',
              docsPluginId: 'guide',
              sidebarId: 'guideLiteimportSidebar',
              label: 'Liteimport 跨境代采',
            },
            {
              type: 'docSidebar',
              docsPluginId: 'guide',
              sidebarId: 'guideVideoSidebar',
              label: 'Video 短视频',
            },
          ],
        },
        {
          type: 'docSidebar',
          sidebarId: 'tmsSidebar',
          position: 'left',
          label: '开发者指南',
        },
        {
          href: '/tms/postman',
          label: '下载 Postman',
          position: 'left',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '用户指南',
          items: [
            { label: 'TMS 运输管理', to: '/guide/tms/' },
            { label: 'WMS 仓储管理', to: '/guide/wms/' },
            { label: 'Voice 语音', to: '/guide/voice/' },
            { label: 'Liteimport 跨境代采', to: '/guide/liteimport/' },
            { label: 'Video 短视频', to: '/guide/video/' },
          ],
        },
        {
          title: '开发者指南',
          items: [
            { label: '快速开始', to: '/tms/' },
            { label: '组织鉴权', to: '/tms/authentication' },
            { label: 'Postman', to: '/tms/postman' },
          ],
        },
        {
          title: '产品',
          items: [
            { label: 'Alpha Cargo TMS', to: '/' },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Alpha Cargo.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'python'],
    },
    mermaid: {
      theme: { light: 'neutral', dark: 'dark' },
      // CJK labels have no spaces to break on, so the default 200px wrap
      // splits them mid-phrase. Give labels room to sit on one line.
      options: {
        flowchart: { wrappingWidth: 320 },
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
