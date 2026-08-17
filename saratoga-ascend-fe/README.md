# Saratoga Ascend - Frontend (`saratoga-ascend-fe`)

A modern, high-performance web application built for **Saratoga Ascend** using Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/postcss`
- **Linter**: [ESLint 9](https://eslint.org/) (`eslint-config-next`)

---

## 📐 Architecture & Design System

The application follows the **Atomic Design Methodology**, promoting modular, reusable, and scalable UI development:

```text
src/
├── app/                  # Next.js App Router (Layouts, Pages, Global Styles)
│   ├── globals.css       # Design tokens & custom theme definitions
│   ├── layout.tsx        # Root application layout & metadata
│   └── page.tsx          # Main entry page rendering HomeTemplate
└── components/           # Atomic Component Hierarchy
    ├── atoms/            # Core primitives (Button, Heading, Text, Badge, Container, OptimizedImage)
    ├── molecules/        # Composite UI units (BrandLogo, BannerActions, ColorPaletteCard, StatCard)
    ├── organisms/        # Page sections (Navbar, Banner, ColorSystemSection, Footer)
    └── templates/        # Full page structures (HomeTemplate)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `^20.0.0` or higher
- **Package Manager**: `npm` (v6+) or `yarn` / `pnpm` / `bun`

### Installation

Navigate to the frontend directory and install dependencies:

```bash
cd saratoga-ascend-fe
npm install
```

### Development

Run the development server with auto-reload:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## 📜 Available Scripts

In the `saratoga-ascend-fe` directory, you can run:

- `npm run dev` – Starts Next.js in development mode with HMR on port 3000.
- `npm run build` – Compiles and optimizes the app for production.
- `npm run start` – Starts the Next.js production server.
- `npm run lint` – Runs ESLint checks across TypeScript and TSX files.

---

## 🔗 Backend Integration

This frontend is designed to consume REST APIs provided by the Strapi v5 backend (`saratoga-ascend-be`) running by default at `http://localhost:1337`.
