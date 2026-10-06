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

1. **`npm ci`**, **`npm run typecheck`**, **`npm run build`**. The build renders every locale
   and fails on broken links; the PR's `Build` check runs the build.
2. **A failure is yours only if it doesn't also fail on `origin/main`.** Check before fixing or
   reporting it. The PR's CI result outranks a local one.
3. **Look at every changed page**, in zh-Hans and, for the user guide, en: `npm run serve --
   --port <free port>` after the build, then the page's URL (English under `/en/…`). Check that
   links between the two guides are absolute site paths (`/tms/…`); the build can't catch a
   relative one that happens to resolve.
4. Changing a zh-Hans user-guide page means changing its English twin under `i18n/en/` in the
   same PR.
5. Whatever you couldn't verify goes in the PR under **Not verified**, with the reason.

## Branches

`main` is the only long-lived branch, and **every merge to `main` publishes the site.** Never
commit on `main`, not even locally: branch from a freshly fetched `origin/main`
(`git fetch origin main && git switch -c docs/<slug> origin/main`) and open a PR into `main`.
