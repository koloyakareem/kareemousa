# Kareem Mousa Mahmoud — Cybersecurity Portfolio

Standalone React + Vite portfolio prepared for GitHub Pages.

## Upload to GitHub

1. Create a new GitHub repository.
2. Upload the **contents of this folder** to the repository root.
3. Make sure the default branch is named `main`.
4. Open **Settings → Pages** in the repository.
5. Under **Build and deployment**, choose **GitHub Actions**.
6. Push to `main`. The included workflow will build and publish the site.

The Vite configuration uses relative asset paths, so it works for both:

- `https://YOUR-USERNAME.github.io`
- `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY`

## Run locally

```bash
npm install
npm run dev
```

## Customize

- Main content: `src/App.tsx`
- Visual styling: `src/index.css`
- Page metadata: `index.html`
- Resume PDF: `public/Kareem-Mousa-Mahmoud-Resume.pdf`
- GitHub Pages deployment: `.github/workflows/deploy.yml`