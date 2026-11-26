# TIMELESS — Haute Horlogerie Luxury Watch Storefront

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-22+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.21-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-Protected-000000?logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

An enterprise-grade, full-stack luxury timepiece storefront and private collector salon crafted for the haute horlogerie industry. Converted from high-fidelity Google Stitch UI designs into a modular React single-page application with a resilient Node.js / Express / MongoDB REST backend.

---

## 🌐 Live Links & Project URLs

| Service | Platform | URL |
|---|---|---|
| **Live Frontend Website** | Vercel | https://timeless-luxury-watches-chi.vercel.app |
| **Live Backend API** | Render | https://timeless-luxury-watches.onrender.com |
| **Backend Health Check** | Render | https://timeless-luxury-watches.onrender.com/api/health |
| **Source Code Repository** | GitHub | https://github.com/navdeepkashyap908-max/timeless-luxury-watches |

> [!NOTE]
> The backend runs on Render's free tier, so if it has been idle for 15+ minutes, the first request may take ~30–60 seconds to wake up.

---

## 🏛️ Project Overview

**TIMELESS** embodies the heritage, prestige, and mechanical artistry of Swiss haute horlogerie. It delivers an exclusive digital salon experience for ultra-high-net-worth collectors, offering bespoke timepiece configuration, institutional escrow checkout with armored transit, instant pre-owned liquidation appraisals, and personalized concierge task management.

---

## ✨ Key Features

### 🌟 High Horology Frontend (React 19 + Vite + Tailwind CSS)
* **Flagship Showcase & Curated Vault**: Interactive catalog of 34 master calibres (Flying Tourbillons, Perpetual Calendars, Minute Repeaters, 18K Rose Gold, and 950 Platinum).
* **Calibre Technical Inspection**: Detailed watch view with real-time specs: frequency (VPH), power reserve, jewels, water resistance, and case geometry.
* **Bespoke Configurator**: Real-time strap allocation (alligator cognac, vulcanized rubber, solid gold bracelet) and dial selection with dynamic pricing in INR (₹).
* **Institutional Escrow Custody (`TL-ESCROW-XXXXXX`)**: Tier-1 private banking escrow checkout with insured armored vehicle doorstep handover across India (Mumbai, New Delhi, Bengaluru, Hyderabad).
* **Acquisition Salon & Trade-In Appraisal (`TL-VAL-XXXXXX`)**: 3-step liquidation appraisal calculator generating real-time Geneva secondary market valuation ranges and dispatching appraisals directly to salon directors.
* **Salon Viewing Reservation**: Private champagne viewing booking at flagship salons in Mumbai BKC, New Delhi, Zurich, and Geneva.
* **Private Bag & Wishlist Synchronization**: Local storage and backend-synced wishlist and shopping bag with drawer views.
* **Collector Authentication & Demo Access**: Modal sign-in with 1-Click Connoisseur Demo Login (`collector@timeless.ch`).

### ⚙️ REST API Backend (Node.js + Express.js + Mongoose)
* **JWT Authentication & Authorization**: Stateless token verification with salted password hashing using `bcryptjs` (10 rounds).
* **Concierge & Collector Tasks CRUD (`/api/tasks`)**: Complete REST API allowing collectors to create, retrieve, update status (`pending`, `in_progress`, `completed`), and archive horological requests.
* **Master Timepiece Catalog API (`/api/watches`)**: Dynamic querying with full-text search, category filters, and sorting.
* **Institutional Escrow Orders API (`/api/orders`)**: Secure order placement generating custody reference IDs.
* **Pre-Owned Valuations API (`/api/valuations`)**: Appraisal dossier submission with automated concierge task assignment.
* **Zero-Config Database Resiliency**: Automatic fallback to an embedded in-memory MongoDB instance if no local MongoDB service is running, ensuring the platform works immediately out of the box.

---

## 🏗️ Architecture & Directory Structure

```
timeless-luxury-watches/
├── frontend/                                # React 19 + Vite Single Page Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/                      # Header, Footer, BottomNav, MenuDrawer, SearchModal, AuthModal, TasksModal
│   │   │   ├── product/                     # WatchCard, BespokeConfigurator, EscrowModal, SalonViewingModal
│   │   │   ├── home/                        # HeroSection, FeaturedTimepieces, BrandStory, Testimonials
│   │   │   ├── catalog/                     # CatalogFilterBar, CatalogGrid, MetricBar
│   │   │   └── bag/                         # BagDrawer
│   │   ├── context/
│   │   │   ├── StoreContext.jsx             # Global state & backend synchronization
│   │   │   └── useStore.js                  # Custom context consumer hook
│   │   ├── services/
│   │   │   └── api.js                       # Unified REST API client (Auth, Tasks, Watches, Orders, Valuations)
│   │   ├── pages/                           # HomePage, CatalogPage, ProductDetailPage, SellWatchPage, BagPage, WishlistPage
│   │   └── data/                            # Offline high-res watch data & master technical specs
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── backend/                                 # Node.js + Express.js REST API
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                        # Resilient Mongoose connection manager with in-memory fallback
│   │   ├── middleware/
│   │   │   ├── auth.js                      # JWT protect, optionalAuth, authorize
│   │   │   ├── validate.js                  # Request validation for auth & tasks
│   │   │   └── errorHandler.js              # Centralized error handler
│   │   ├── models/
│   │   │   ├── User.js                      # Collector profile schema (bcrypt hashing)
│   │   │   ├── Task.js                      # Concierge & collector tasks schema
│   │   │   ├── Watch.js                     # Curated Vault timepieces schema
│   │   │   ├── Order.js                     # Escrow custody orders schema
│   │   │   └── Valuation.js                 # Pre-owned liquidation dossier schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js                # /api/auth (register, login, me, profile, wishlist)
│   │   │   ├── taskRoutes.js                # /api/tasks (full REST CRUD)
│   │   │   ├── watchRoutes.js               # /api/watches (catalog query, search, filters)
│   │   │   ├── orderRoutes.js               # /api/orders (escrow custody registration)
│   │   │   └── valuationRoutes.js           # /api/valuations (liquidation appraisals)
│   │   ├── seed.js                          # Database seeder (11 timepieces, demo user, tasks)
│   │   └── server.js                        # Express server entry point & CORS configuration
│   ├── tests/
│   │   ├── api.test.js                      # 13 automated unit API tests
│   │   └── e2e-integration.js               # 14 end-to-end integration tests
│   ├── .env.example                         # Environment variable template
│   └── package.json
│
├── stitch_timeless_luxury_watch_storefront/ # Original Google Stitch design references & HTML layouts
├── .gitignore                               # Protects .env, node_modules, and build outputs
└── README.md                                # Root documentation
```

---

## 📡 REST API Endpoints

### Authentication & Profile (`/api/auth`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register new collector (`name`, `email`, `password`, `phone`, `city`) |
| `POST` | `/api/auth/login` | Public | Sign in (`email`, `password`) $\rightarrow$ returns JWT token & user |
| `GET` | `/api/auth/me` | Protected (JWT) | Get currently authenticated collector profile |
| `PUT` | `/api/auth/profile` | Protected (JWT) | Update collector contact and delivery preferences |
| `POST` | `/api/auth/wishlist/toggle` | Protected (JWT) | Add/remove timepiece ID from user wishlist |

### Concierge & Collector Tasks CRUD (`/api/tasks`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/tasks` | Protected (JWT) | **Create** new concierge/collector service request |
| `GET` | `/api/tasks` | Protected (JWT) | **Retrieve** all tasks for user (supports `?status=`, `?category=`, `?priority=`) |
| `GET` | `/api/tasks/:id` | Protected (JWT) | **Retrieve** a single task by ID |
| `PUT` | `/api/tasks/:id` | Protected (JWT) | **Update** task status (`pending` $\rightarrow$ `in_progress` $\rightarrow$ `completed`) or details |
| `DELETE` | `/api/tasks/:id` | Protected (JWT) | **Archive / Delete** task with ownership authorization check |

### Watches Catalog (`/api/watches`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/watches` | Public | Query master catalog (search `?search=tourbillon`, category `?category=rose-gold`, sort) |
| `GET` | `/api/watches/:id` | Public | Retrieve single timepiece by ID or slug |

### Escrow Custody Orders (`/api/orders`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/orders` | Optional Auth | Initialize ICICI Private Banking escrow order (`TL-ESCROW-XXXXXX`) |
| `GET` | `/api/orders` | Protected (JWT) | List collector's escrow custody orders |

### Pre-Owned Valuations & Trade-Ins (`/api/valuations`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/valuations` | Optional Auth | Submit secondary market trade-in appraisal dossier (`TL-VAL-XXXXXX`) |
| `GET` | `/api/valuations` | Protected (JWT) | List collector's submitted appraisal dossiers |

---

## 🚀 Quick Start Guide

### Prerequisites
* **Node.js** (v18.0.0 or higher, v22 recommended)
* **npm** or **pnpm** or **yarn**

### 1. Clone the Repository
```bash
git clone https://github.com/navdeepkashyap908-max/timeless-luxury-watches.git
cd timeless-luxury-watches
```

### 2. Configure Environment Variables
Inside the `backend/` folder, create a `.env` file (you can copy `.env.example`):
```bash
cd backend
cp .env.example .env
```
Default configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=
JWT_SECRET=timeless_haute_horlogerie_dev_secret_jwt_2026
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:3000
```
> [!NOTE]
> Leaving `MONGODB_URI` blank automatically activates the embedded **in-memory MongoDB** server, allowing the app to run immediately with zero database installation.

### 3. Start the Backend API Server
```bash
cd backend
npm install
npm run dev
```
The backend API server will start on `http://127.0.0.1:5000`.

### 4. Start the React Frontend
In a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
The React frontend will be accessible at `http://127.0.0.1:3000`.

---

## 🛠️ How This Website Was Created & Deployed (Step-by-Step)

This project was built and deployed end-to-end using the following steps:

### Step 1: Design & Frontend Development (`frontend/`)
* Converted the Google Stitch luxury storefront designs (`stitch_timeless_luxury_watch_storefront/`) into a responsive **React 19 + Vite + Tailwind CSS** application.
* Centralized all backend API calls in `frontend/src/services/api.js` using `import.meta.env.VITE_API_BASE_URL` (falling back to `http://127.0.0.1:5000/api` in local development).

### Step 2: Backend API Development (`backend/`)
* Built a separate **Node.js + Express.js** REST API in `backend/` with **Mongoose** schemas (`User`, `Task`, `Watch`, `Order`, `Valuation`).
* Implemented `bcryptjs` password hashing, **JWT** authentication (`Authorization: Bearer <token>`), input validation, and centralized error handling.
* Added automatic database seeding (`backend/src/seed.js`) for flagship timepieces and the demo collector account.

### Step 3: Database Configuration (MongoDB Atlas + Dev Fallback)
* Configured `backend/src/config/db.js` to connect to **MongoDB Atlas** via `MONGODB_URI` in production (`NODE_ENV=production`).
* In local development (`NODE_ENV !== "production"`), it automatically falls back to `mongodb-memory-server` if no local MongoDB server is running—and skips `mongodb-memory-server` in production so Render's `--omit=dev` install succeeds cleanly.

### Step 4: Version Control & Pushing to GitHub
* Added a root `.gitignore` file to keep `node_modules/`, `backend/.env`, `frontend/.env`, `frontend/dist/`, and `*.log` out of Git.
* Pushed the complete repository to GitHub: https://github.com/navdeepkashyap908-max/timeless-luxury-watches

### Step 5: Deploying the Backend on Render
1. Created a new **Web Service** on [Render](https://render.com) connected to the GitHub repository.
2. Configured the service settings:
   * **Root Directory**: `backend`
   * **Build Command**: `npm install`
   * **Start Command**: `npm start`
3. Added the production environment variables in Render:
   * `MONGODB_URI` — MongoDB Atlas connection string (with Atlas Network Access allowing `0.0.0.0/0`)
   * `JWT_SECRET` — Strong random secret key for signing JWT tokens
   * `JWT_EXPIRE` — `7d`
   * `NODE_ENV` — `production`
   * `CLIENT_URL` — `https://timeless-luxury-watches-chi.vercel.app`
4. Verified the live API at: https://timeless-luxury-watches.onrender.com/api/health (`"database": "connected"`).

### Step 6: Deploying the Frontend on Vercel & Connecting Both
1. Imported the repository into [Vercel](https://vercel.com) with **Root Directory** set to `frontend`.
2. Added the frontend environment variable in Vercel:
   * `VITE_API_BASE_URL` = `https://timeless-luxury-watches.onrender.com/api`
3. Deployed to https://timeless-luxury-watches-chi.vercel.app.
4. Configured **CORS** in `backend/src/server.js` to allow requests from `https://timeless-luxury-watches-chi.vercel.app`, `CLIENT_URL`, and `localhost` in development.

---

## 🧪 Testing

The platform includes comprehensive automated test suites:

```bash
# Run unit API test suite (13 passing tests)
cd backend
npm test

# Run full end-to-end integration test suite (14 passing tests)
node tests/e2e-integration.js
```

### Test Coverage Highlights:
* ✅ Server health check and CORS verification
* ✅ Bcrypt password hashing and JWT authentication
* ✅ Full Task CRUD operations (Create, Read List, Read Single, Update Status, Delete) with ownership checks
* ✅ Calibre catalog queries with search and category filtering
* ✅ Escrow custody order generation (`TL-ESCROW-XXXXXX`)
* ✅ Secondary market appraisal dossier generation (`TL-VAL-XXXXXX`)
* ✅ Private wishlist synchronization

---

## 👤 Demonstration Account Credentials

For instant evaluation, you can log in using the pre-seeded collector account or click the **"Connoisseur 1-Click Demo Login"** button in the sign-in modal:

* **Email**: `collector@timeless.ch`
* **Password**: `Password123!`
* **Tier**: `Geneva VIP Connoisseur`

---

## 🔒 Security & Privacy

* Sensitive configuration files (`.env`) and heavy dependencies (`node_modules/`) are strictly excluded via `.gitignore`.
* Passwords are never stored in plain text (hashed using `bcryptjs` with 10 salt rounds).
* JWT tokens are passed via Bearer authorization headers and validated on protected endpoints.
* Task management APIs enforce strict user ownership checks.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Manufacture de Haute Horlogerie • Geneva Seal Standard • Every Second Tells a Story*
