# GitHub Actions Widget

A widget app to display GitHub Actions in one place.

I built this app, because GitHub is so slow that I could not stand it.

![Screenshot](https://raw.githubusercontent.com/MaciejGarncarski/github-actions-widget/refs/heads/main/.github/screenshots/main.png)

## Tech used

- Next.js
- Tailwind CSS
- Zod
- Playwright
- Vitest

## Usage

Generate PAT in GitHub developer settings, paste it in app settings (/settings route) and save. Token is encrypted and saved in cookies.

[Needed Permissions](https://raw.githubusercontent.com/MaciejGarncarski/github-actions-widget/refs/heads/main/public/pat-permissions.png)

[How to create Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)

## Live

[https://github-actions-widget.vercel.app/](https://github-actions-widget.vercel.app/)

## Development

```bash
pnpm install
pnpm dev
```

## Testing

Unit

```bash
pnpm test
```

E2E

```
pnpm test:e2e
```
