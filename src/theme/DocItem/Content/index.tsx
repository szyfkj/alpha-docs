import type { ReactNode } from 'react';
import Content from '@theme-original/DocItem/Content';
import type ContentType from '@theme/DocItem/Content';
import type { WrapperProps } from '@docusaurus/types';
import Admonition from '@theme/Admonition';
import Translate from '@docusaurus/Translate';
import { useDoc } from '@docusaurus/plugin-content-docs/client';

type Props = WrapperProps<typeof ContentType>;

/**
 * A page whose front matter carries `staging: <app>#<pr>` is new on staging
 * and not in production yet. The banner goes above the whole page; the
 * release that ships the PR deletes the front matter key.
 */
export default function ContentWrapper(props: Props): ReactNode {
  const { frontMatter } = useDoc();
  const staging = (frontMatter as { staging?: unknown }).staging;

  return (
    <>
      {staging ? (
        <Admonition
          type="caution"
          className="staging staging--page"
          title={<Translate id="staging.page.title">测试环境 · 尚未上线</Translate>}
        >
          <p>
            <Translate id="staging.page.note">
              整页内容描述的功能目前只在测试环境（staging）可用，还没有发布到正式环境。
            </Translate>
          </p>
        </Admonition>
      ) : null}
      <Content {...props} />
    </>
  );
}
