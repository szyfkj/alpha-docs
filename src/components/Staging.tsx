import type { ReactNode } from 'react';
import Admonition from '@theme/Admonition';
import Translate from '@docusaurus/Translate';

type Props = {
  /**
   * The merge this block documents, as `<app>#<pr>` (`tms#205`). It is never
   * rendered: the release that ships the PR finds its blocks by this key and
   * unwraps them. App keys, not repository names — the site is public.
   */
  source: string;
  children?: ReactNode;
};

/**
 * Wraps docs for behaviour that has merged to the staging environment but not
 * yet shipped to production. Registered globally in MDXComponents, so pages
 * use it without an import:
 *
 *   <Staging source="tms#205">
 *
 *   Markdown here — keep the blank lines around it.
 *
 *   </Staging>
 */
export default function Staging({ children }: Props): ReactNode {
  return (
    <Admonition
      type="caution"
      className="staging"
      title={<Translate id="staging.block.title">测试环境 · 尚未上线</Translate>}
    >
      <p className="staging__note">
        <Translate id="staging.block.note">
          本节描述的功能目前只在测试环境（staging）可用，还没有发布到正式环境。
        </Translate>
      </p>
      {children}
    </Admonition>
  );
}
