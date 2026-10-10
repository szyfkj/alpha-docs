# Alpha Docs

Public documentation for the Alpha Cargo suite, published to
<https://docs.alphacargo.io> via GitHub Pages. It carries two guides:

- **User guide** (`/guide`) — for the people operating the product.
- **Developer guide** (`/tms`) — for the people integrating with it.

Built with [Docusaurus 3](https://docusaurus.io/). Simplified Chinese
(`zh-Hans`) is the source of truth; the user guide is also published in
English. The developer guide is Chinese only for now, so `/en/tms/*` falls
back to the Chinese pages.

## Layout

```
docs/                 TMS developer guide                     → /tms
guide/                user guide, one folder per product
  index.md              hub listing every product             → /guide
  tms/                  authored                              → /guide/tms
  wms/, voice/,         stubs                                 → /guide/wms, /guide/voice,
  liteimport/, video/                                           /guide/liteimport, /guide/video
i18n/en/              English translations + theme strings     → /en/…
sidebars.ts           developer guide sidebar
sidebars-guide.ts     one sidebar per product guide
TERMINOLOGY.md        zh/en glossary of product UI wording (not published)
src/pages/index.tsx   Landing page
src/components/       <Staging> (staging flags, see below)
src/theme/            swizzles: MDXComponents, DocItem/Content (page banner)
static/               CNAME, Postman collection + environment
.github/workflows/    Pages deployment
```

Both sides are namespaced per product. WMS and Voice get their own developer
docs instances later, and `guide/wms/` can be lifted into an instance of its
own — neither move changes a published URL.

## Local development

```bash
pnpm install                 # pnpm only; corepack provides the pinned version
pnpm start                   # dev server with hot reload (zh-Hans)
pnpm start --locale en       # dev server in English
pnpm build                   # production build — fails on broken links
pnpm serve                   # serve the production build
```

`pnpm build` builds every locale and throws on broken links, so it is also
the check that no cross-guide link has rotted.

> Links between the two guides must be absolute site paths (`/tms/webhooks`).
> A relative `./tms` written inside `/guide` resolves to the *developer* guide
> and the build will not catch it, because that page exists.

Node 20+ is required.

## Publishing

Every push to `main` builds and deploys. The custom domain is set by
`static/CNAME`; do not delete that file.

## Staging flags

The apps ship in two steps: a merge to their `develop` branch goes to the staging
environment, and a release (`develop` → `main`) takes it to production. Docs for a
change are written when it reaches staging, flagged until it ships:

- **Inside a page**, wrap the new or changed part in `<Staging>`. It needs no import,
  and the blank lines around its Markdown body are required:

  ```mdx
  <Staging source="tms#205">

  You can now set an account code when importing customers.

  </Staging>
  ```

- **A whole new page** gets `staging: tms#205` in its front matter, which puts a
  banner above it.

`source` is `<app>#<pr>`: the app's key (`tms`, `wms`, `voice`, `wms-android`,
`liteimport`, `video`) and the number of the merged pull request. When the release
ships that PR, its blocks are unwrapped and its front matter key deleted. Use the
same `source` in zh-Hans and in the English twin.

When a change alters behaviour that is already live, keep the production text as it
is and add a `<Staging>` block describing the new behaviour. The release replaces the
old text with it. A reverted PR's blocks are deleted.

These edits are normally made by the docs-sync run of the idea pipeline, which is
filed automatically for every merge in the app repositories.

## Writing rules

This repository is **public**. The product source lives in private
repositories, so anything published here must stay on the outside of that line:

- **No source paths, file names, line numbers, function names, table names or
  migration names.** Describe externally observable behaviour only.
- **No credentials, real API keys, customer data or real organization UUIDs.**
  Use obviously fake placeholders (`ak_example…`).
- **No internal architecture** (queues, row-level security, service layering).
- Document known limitations honestly, but frame them as behaviour and advice
  rather than as defects.

## Keeping the Postman collection in sync

`static/tms-api.postman_collection.json` carries a collection-level
pre-request script that signs every request. Its canonicalisation must stay
byte-identical to the server's, or every request it sends will fail to
authenticate. When the signing scheme changes, re-verify the script against the
server implementation before publishing.
