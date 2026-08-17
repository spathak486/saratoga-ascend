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

## ⚙️ Environment Variables

Create a `.env` file in the `saratoga-ascend-be` directory based on `.env.example`:

```env
# Server
HOST=0.0.0.0
PORT=1337

# Application Secrets
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your_api_token_salt
ADMIN_JWT_SECRET=your_admin_jwt_secret
JWT_SECRET=your_jwt_secret
TRANSFER_TOKEN_SALT=your_transfer_token_salt
ENCRYPTION_KEY=your_encryption_key

# Database Setup (PostgreSQL)
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=saratoga-ascend
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=root
DATABASE_SSL=false
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
- **API Endpoint**: [http://localhost:1337/api](http://localhost:1337/api)

---

## 📜 Available Scripts

- `npm run dev` / `npm run develop` – Starts Strapi server with auto-reload enabled.
- `npm run build` – Builds the Strapi admin panel for production.
- `npm run start` – Starts Strapi server in production mode (requires `npm run build` first).
- `npm run console` – Opens an interactive Strapi CLI console.
- `npm run upgrade` – Upgrades Strapi packages to the latest version.

