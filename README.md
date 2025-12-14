# Node + React Project

This repository contains a small full-stack web application with a React client and an Express + MongoDB server. The app provides user authentication (JWT), product management (CRUD), and a user basket (cart).

Key features
- User registration and login (JWT)
- Product listing, details, create/update/delete (protected by JWT)
- User basket (add, view, remove)

Tech stack
- Client: React, React Router, Redux Toolkit, MUI, styled-components, axios
- Server: Node.js, Express, Mongoose, JWT, bcrypt
- Database: MongoDB / Mongo Atlas

Repository structure

- `Client/` — React front-end app (create-react-app)
	- `package.json` scripts: `start`, `build`, `test`, `eject`
- `Server/` — Express API
	- `package.json` scripts: `start` (node server), `dev` (nodemon server)
	- `server.js` — entrypoint
	- `config/` — db connection and cors options
	- `routes/` — `authRouter`, `ProductRouter`, `BasketRouter`
	- `controllers/` — request handlers
	- `models/` — Mongoose schemas

Prerequisites
- Node.js (v16+ recommended)
- npm (or yarn)
- MongoDB instance (local or Atlas)

Environment variables (Server)
- `DATABASE_URI` — MongoDB connection string (required)
- `ACCESS_TOKEN_SECRET` — secret key used to sign JWTs (required)
- `PORT` — optional, defaults to `1478`

Quick start (development)

1. Install dependencies

PowerShell commands

```powershell
cd Server; npm install
cd ..\Client; npm install
```

2. Start servers (use two terminals)

Terminal 1 — server (development):

```powershell
cd Server
npm run dev
```

Terminal 2 — client:

```powershell
cd Client
npm start
```

The React dev server runs on its default port (usually 3000) and the API server will start on the `PORT` value or `1478` by default.

Production build

Build the client and serve the static files from the `Server/public` folder (the server already serves `public` as static in `server.js`):

```powershell
cd Client
npm run build
# copy/move the build output into Server/public (manual or script)
```

API routes (server)

Note: the server currently mounts routers in `server.js` as follows. There is a typo in the product mount path (`/api/prudoct`) — see "Notes & tips" below.

- Authentication (no auth required)
	- POST /api/user/register — register a new user (body: username, password, name, email, phone)
	- POST /api/user/login — login (body: username, password) — returns `{ accesstoken, user }`

- Products
	- GET /api/prudoct/ — get all products
	- GET /api/prudoct/:id — get a product by id
	- POST /api/prudoct/ — create product (protected; requires Bearer token)
	- PUT /api/prudoct/ — update product (protected; product id expected in body)
	- DELETE /api/prudoct/:id — delete product (protected)

- Basket (all routes protected)
	- POST /api/basket/ — add to basket
	- GET /api/basket/ — get current user basket
	- DELETE /api/basket/:id — remove an item from the basket

Auth & security
- JWT tokens are expected in the `Authorization` header as `Bearer <token>`.
- The server uses `ACCESS_TOKEN_SECRET` to sign/verify tokens.

Notes & tips
- server.js mounts `authRouter` twice (two identical `app.use('/api/user', ...)` lines). You can safely remove the duplicate.
- `server.js` currently mounts the product router at `/api/prudoct` (misspelled). If you want `/api/product`, change the route path to `/api/product`.
- Product routes that modify data are protected by `verifyJWT` middleware.
- The update product route expects the full product body including `id`.

Troubleshooting
- If you see MongoDB connection errors, verify `DATABASE_URI` and network access (for Atlas).
- If protected endpoints return 401/403, ensure your Authorization header contains a valid Bearer token returned from login.

Next steps / improvements
- Fix route typo (`/api/prudoct` -> `/api/product`) and remove duplicate auth mount in `server.js`.
- Add validation and better error handling in controllers.
- Add tests for server endpoints and client components.

License & credits
- (Add license and contributors here)

If you want, I can also open a PR to fix the typo and the duplicate router mounts in `server.js` and add a small script to copy the client build into `Server/public`.
