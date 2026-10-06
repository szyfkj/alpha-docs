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
  index.md              hub listing the three products        → /guide
  tms/                  authored                              → /guide/tms
  wms/, voice/          stubs                                 → /guide/wms, /guide/voice
i18n/en/              English translations + theme strings     → /en/…
sidebars.ts           developer guide sidebar
sidebars-guide.ts     one sidebar per product guide
TERMINOLOGY.md        zh/en glossary of product UI wording (not published)
src/pages/index.tsx   Landing page
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
