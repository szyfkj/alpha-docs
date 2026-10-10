import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

type Guide = {
  title: string;
  audience: string;
  description: string;
  to: string;
  products: { name: string; ready: boolean }[];
};

// Both guides list every product: what differs is which are written yet.
const PRODUCT_NAMES = ['TMS', 'WMS', 'Voice', 'Liteimport', 'Video'];
const PRODUCTS = (...ready: string[]) =>
  PRODUCT_NAMES.map((name) => ({ name, ready: ready.includes(name) }));

function useGuides(): Guide[] {
  return [
    {
      title: translate({ id: 'home.guide.user.title', message: '用户指南' }),
      audience: translate({
        id: 'home.guide.user.audience',
        message: '给使用产品的人',
      }),
      description: translate({
        id: 'home.guide.user.description',
        message: '录单、排车、扫码、对账——按菜单逐项说明怎么操作。',
      }),
      to: '/guide/',
      products: PRODUCTS('TMS'),
    },
    {
      title: translate({ id: 'home.guide.dev.title', message: '开发者指南' }),
      audience: translate({
        id: 'home.guide.dev.audience',
        message: '给对接系统的人',
      }),
      description: translate({
        id: 'home.guide.dev.description',
        message: '签名鉴权、运单接口、地址解析、装载规划与事件推送。',
      }),
      to: '/tms/',
      products: PRODUCTS('TMS'),
    },
  ];
}

function GuideCard({ title, audience, description, to, products }: Guide) {
  const comingSoon = translate({
    id: 'home.product.comingSoon',
    message: '敬请期待',
  });

  return (
    <Link to={to} className={styles.productLink}>
      <div className={clsx('card', styles.productCard)}>
        <div className="card__header">
          <Heading as="h3">{title}</Heading>
          <span className={styles.audience}>{audience}</span>
        </div>
        <div className="card__body">
          <p>{description}</p>
        </div>
        <div className="card__footer">
          {products.map(({ name, ready }) => (
            <span
              key={name}
              className={clsx(
                'badge',
                ready ? 'badge--success' : 'badge--secondary',
                styles.productBadge,
              )}
            >
              {ready ? name : `${name} · ${comingSoon}`}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const guides = useGuides();

  return (
    <Layout
      title={translate({ id: 'home.meta.title', message: '产品文档' })}
      description={translate({
        id: 'home.meta.description',
        message: 'Alpha Cargo 产品文档 —— 用户操作指南与接口接入指南',
      })}
    >
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">
            <Translate id="home.tagline">Alpha Cargo 产品文档</Translate>
          </p>
          <div className={styles.buttons}>
            <Link className="button button--secondary button--lg" to="/guide/">
              <Translate id="home.cta.guide">查看用户指南</Translate>
            </Link>
            <Link
              className="button button--outline button--secondary button--lg"
              to="/tms/"
            >
              <Translate id="home.cta.api">开始接入 API</Translate>
            </Link>
          </div>
        </div>
      </header>
      <main className="container margin-vert--lg">
        <div className="row">
          {guides.map((guide) => (
            <div key={guide.title} className="col col--6 margin-bottom--lg">
              <GuideCard {...guide} />
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
