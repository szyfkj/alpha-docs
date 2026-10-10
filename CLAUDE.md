# Alpha Docs

Docusaurus 3 site for docs.alphacargo.io: the user guide (`guide/`, zh-Hans + en) and the TMS
developer guide (`docs/`, zh-Hans only). README.md has the layout and local commands; read it.

## This repository is public

Everything here, including PRs, branches and screenshots, is world-readable. The product
lives in private repos, so the README's **Writing rules** are hard rules: no source paths,
file, function, table or migration names, no internal architecture, no credentials or real
customer data. Describe what a user or integrator can observe. Knowing the TMS code is fine;
quoting it here is not.

UI wording comes from `TERMINOLOGY.md`, which is generated from the apps' locale files. Use its
terms exactly; don't invent a translation for a label the app already has.

## Definition of done (autonomous runs)

For the idea pipeline (szyfkj/alpha-ideas), which works unattended on the dev box, and for
anyone who wants CI's verdict before pushing.

1. **`pnpm install --frozen-lockfile`**, **`pnpm typecheck`**, **`pnpm build`**. The build renders every locale
   and fails on broken links; the PR's `Build` check runs the build.
2. **A failure is yours only if it doesn't also fail on `origin/main`.** Check before fixing or
   reporting it. The PR's CI result outranks a local one.
3. **Look at every changed page**, in zh-Hans and, for the user guide, en: `pnpm serve --port
   <free port>` after the build, then the page's URL (English under `/en/…`). Check that
   links between the two guides are absolute site paths (`/tms/…`); the build can't catch a
   relative one that happens to resolve.
4. Changing a zh-Hans user-guide page means changing its English twin under `i18n/en/` in the
   same PR.
5. Whatever you couldn't verify goes in the PR under **Not verified**, with the reason.

## Staging flags

Docs for a change merged to an app's `develop` branch describe behaviour that is on
staging only. Flag it with `<Staging source="<app>#<pr>">` around the section, or
`staging: <app>#<pr>` in a new page's front matter; README.md's **Staging flags** has
the rules. In short:

- A **staging** docs sync adds flags. A change to live behaviour keeps the production
  text and adds a flagged block describing the new behaviour.
- A **release** docs sync (develop → main) finds every flag whose `source` is one of
  the released PRs, unwraps it, replaces the superseded production text and deletes
  the front matter key. `grep -rn 'tms#205' guide i18n docs` finds them all.
- A **hotfix** (merged straight to `main`) is documented as live, with no flag.
- zh-Hans and English carry the same flags.
- `source` uses the app key, never a repository name: this repository is public.

## pnpm only

The version is pinned by `packageManager`; corepack provides it. Never run `npm install` or
commit a `package-lock.json`. Import only packages declared in `package.json` (pnpm doesn't
hoist). A new dependency with an install script goes in `pnpm.onlyBuiltDependencies`, or in
`pnpm.ignoredBuiltDependencies` when the script isn't needed (as for `@swc/core`, whose binary
comes from an optional platform package, and `core-js`).

## Branches

`main` is the only long-lived branch, and **every merge to `main` publishes the site.** Never
commit on `main`, not even locally: branch from a freshly fetched `origin/main`
(`git fetch origin main && git switch -c docs/<slug> origin/main`) and open a PR into `main`.
