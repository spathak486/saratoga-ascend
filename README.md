# Saratoga Ascend Monorepo

Welcome to the **Saratoga Ascend** project repository. This codebase is organized into two primary applications:

---

## 📁 Projects Overview

### 1. 🎨 [Frontend App (`saratoga-ascend-fe`)](./saratoga-ascend-fe/README.md)
- **Tech Stack**: Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS v4.
- **Architecture**: Atomic Design System (`atoms`, `molecules`, `organisms`, `templates`).
- **Dev Server**: Runs on `http://localhost:3000`.
- **Documentation**: See [`saratoga-ascend-fe/README.md`](./saratoga-ascend-fe/README.md) for detailed setup and usage.

### 2. ⚙️ [Backend Engine (`saratoga-ascend-be`)](./saratoga-ascend-be/README.md)
- **Tech Stack**: Strapi v5 (`5.52.0`), TypeScript, PostgreSQL (`pg`).
- **Features**: Headless CMS, REST API, JWT Refresh token session management, Media security upload policies.
- **Dev Server**: Runs on `http://localhost:1337`.
- **Documentation**: See [`saratoga-ascend-be/README.md`](./saratoga-ascend-be/README.md) for detailed configuration, environment variables, and database setup.

---

## 🚀 Quick Local Development Setup

To get both services running locally:

1. **Start the Backend**:
   ```bash
   cd saratoga-ascend-be
   npm install
   npm run dev
   ```
   *(Access Admin Panel at [http://localhost:1337/admin](http://localhost:1337/admin))*

2. **Start the Frontend**:
   ```bash
   cd saratoga-ascend-fe
   npm install
   npm run dev
   ```
   *(Access App at [http://localhost:3000](http://localhost:3000))*