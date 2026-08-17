# Saratoga Ascend - Backend (`saratoga-ascend-be`)

Headless CMS and REST API backend powering **Saratoga Ascend**, built on **Strapi v5**, **TypeScript**, and **PostgreSQL**.

---

## 🛠️ Tech Stack

- **Core Engine**: [Strapi v5](https://strapi.io/) (`v5.52.0`)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Database**: PostgreSQL (via `pg` driver `v8.20.0`) with SQLite fallback support
- **Runtime**: Node.js (`>=20.0.0 <=26.x.x`)

---

## 🔒 Key Security & Config Features

- **JWT & Session Security**: Enhanced session security with `httpOnly` cookies and refresh token management (`@strapi/plugin-users-permissions`).
- **File Upload Security**: Configured upload plugin with strict whitelist for allowed media types (images, videos, audio, PDF, Office docs, CSV, text) and explicit blocking of executable files (`.exe`, `.sh`, Mach-O binaries).
- **REST API Limits**: Document API configured with standard pagination limits (`defaultLimit: 25`, `maxLimit: 100`) and strict parameter validation.
- **Database Flexibility**: Native support for PostgreSQL, MySQL, and SQLite via `config/database.ts`.

---

## 📂 Project Structure

```text
saratoga-ascend-be/
├── config/                # Strapi configuration files
│   ├── admin.ts           # Admin panel JWT secrets & security parameters
│   ├── api.ts             # REST & document API limits & strict mode
│   ├── database.ts        # Database connection config (PostgreSQL / SQLite)
│   ├── middlewares.ts     # Strapi middleware stack configuration
│   ├── plugins.ts         # User permissions & upload security policies
│   └── server.ts          # Server host, port, and app key configuration
├── src/
│   ├── admin/             # Admin panel customizations
│   ├── api/               # API endpoints, controllers, routes, & schemas
│   ├── extensions/        # Strapi plugin extensions
│   └── index.ts           # Global bootstrap & registration hooks
├── .env                   # Environment variable values
└── .env.example           # Environment template file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `>=20.0.0`
- **PostgreSQL**: Server running on port `5432` with a database named `saratoga-ascend` (or update `.env` accordingly).

### Installation

Navigate to the backend directory and install dependencies:

```bash
cd saratoga-ascend-be
npm install
```

### Development

Run the Strapi development server with auto-reload:

```bash
npm run dev
# or
npm run develop
```

- **Admin Panel**: [http://localhost:1337/admin](http://localhost:1337/admin)
- **REST API Endpoint**: [http://localhost:1337/api](http://localhost:1337/api)
- **GraphQL Endpoint**: [http://localhost:1337/graphql](http://localhost:1337/graphql)

---

## 📜 Available Scripts

- `npm run dev` / `npm run develop` – Starts Strapi server with auto-reload enabled.
- `npm run build` – Builds the Strapi admin panel for production.
- `npm run start` – Starts Strapi server in production mode (requires `npm run build` first).
- `npm run console` – Opens an interactive Strapi CLI console.
- `npm run upgrade` – Upgrades Strapi packages to the latest version.

