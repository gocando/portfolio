# Grecia Ocando — Portfolio

A fast, responsive developer portfolio built with **React + TypeScript + Vite + Tailwind CSS** and a lightweight starfield background. Sections include **About**, **Skills**, **Projects** (with live demo/media), and **Contact**.

**Live site:** https://greciaocando.com

---

## ✨ Features

- Smooth scrolling, sticky top nav, and progress indicator  
- Parallax starfield background on key sections  
- Magnetic/interactive buttons and subtle motion  
- Responsive layout with accessible colors/contrast  
- Project rows with images, tech tags, GitHub links, and optional demos  
- Contact section with copy-email and mailto composer  
- Deployed via **GitHub Pages (Actions)**

---

## 🧰 Tech Stack

- **Framework:** React 18 + TypeScript  
- **Bundler/Dev:** Vite  
- **Styles:** Tailwind CSS (+ a few custom utilities)  
- **Animation/FX:** CSS, small hooks, and `requestAnimationFrame`  
- **Hosting:** GitHub Pages (custom domain on Cloudflare DNS)

---

## 🚀 Getting Started

### Prerequisites
- Node.js **18+** (20+ recommended)  
- npm (or pnpm/yarn if you prefer)

### Install & Run

```bash
# install
npm ci

# start dev server
npm run dev
# open the URL shown (usually http://localhost:5173)

# build for production (outputs to /dist)
npm run build

# preview the production build locally
npm run preview
```

---

### Project Structure

```bash

.
├── public/
│   ├── GreciaResume.pdf
│   ├── grecia.jpg
│   ├── GamerTracker.jpg
│   ├── Minesweeper.png
│   ├── littleC.png
│   ├── logo.png
│   └── CNAME               # greciaocando.com (for GitHub Pages)
│
├── src/
│   ├── components/
│   │   ├── MagneticButton.tsx
│   │   ├── ProjectRow.tsx
│   │   ├── ScrollProgress.tsx
│   │   └── StarBack.tsx
│   ├── utils/Reveal.tsx
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── .github/workflows/pages.yml   # GitHub Pages build & deploy
'''



