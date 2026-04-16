# Preview Environments: How They Work and What Teams Get Wrong

Companion code for the Autonoma blog post 'Preview Environments: How They Work and What Teams Get Wrong'. A GitHub Actions workflow that listens for deployment_status success events, extracts the preview URL from the event payload, and runs Playwright E2E tests against the deployed preview environment.

> Companion code for the Autonoma blog post: **[Preview Environments: How They Work and What Teams Get Wrong](https://getautonoma.com/blog/preview-environments)**

## Requirements

GitHub Actions enabled on the repository. Playwright installed as a dev dependency. A hosting provider that emits `deployment_status` events on preview deploys (Vercel, Netlify, Railway, Render, Fly.io, Coolify, or a DIY Docker setup that calls the GitHub API to record deployments). Optional: Autonoma connected to skip writing/maintaining the Playwright tests yourself.

## Quickstart

```bash
git clone https://github.com/Autonoma-Tools/preview-environments.git
cd preview-environments
Copy `.github/workflows/preview-e2e.yml` into your repo, ensure Playwright is installed (`npm i -D @playwright/test`), and write at least one test under `tests/`. The workflow triggers automatically whenever your hosting provider (Vercel, Netlify, Railway, Render, Fly) fires a `deployment_status: success` webhook for a preview deployment. No additional configuration required beyond repo permissions for the default GITHUB_TOKEN.
```

## Project structure

```
.
├── .github/
│   └── workflows/
│       └── preview-e2e.yml
├── examples/
│   ├── playwright.config.example.ts
│   └── smoke.spec.example.ts
├── .gitignore
├── LICENSE
└── README.md
```

- `.github/workflows/` — the CI gate itself: a `deployment_status`-triggered Playwright run.
- `examples/` — drop-in Playwright config and a smoke test you can copy into your own repo to prove the wiring works end-to-end.

## About

This repository is maintained by [Autonoma](https://getautonoma.com) as reference material for the linked blog post. Autonoma builds autonomous AI agents that plan, execute, and maintain end-to-end tests directly from your codebase.

If something here is wrong, out of date, or unclear, please [open an issue](https://github.com/Autonoma-Tools/preview-environments/issues/new).

## License

Released under the [MIT License](./LICENSE) © 2026 Autonoma Labs.
