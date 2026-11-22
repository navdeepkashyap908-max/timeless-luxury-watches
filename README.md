# TIMELESS — Haute Horlogerie Luxury Watch Storefront

A full-stack, enterprise-grade e-commerce application crafted for the haute horlogerie sector. Built with a **React (Vite + Tailwind CSS)** frontend and an **Express.js + MongoDB + Node.js** backend with JWT authentication and full REST CRUD capabilities.

---

## Project Structure

```
timeless-luxury-watches/
├── frontend/                     # React 19 + Vite + Tailwind CSS Single Page Application
│   ├── src/
│   │   ├── components/           # Reusable UI components (Header, Footer, Drawers, Modals)
│   │   │   ├── common/           # Header, Footer, BottomNav, MenuDrawer, SearchModal, AuthModal, TasksModal
│   │   │   ├── product/          # WatchCard, QuickViewModal, EscrowModal, SalonViewingModal
│   │   │   └── bag/              # BagDrawer
│   │   ├── pages/                # Route pages (HomePage, CatalogPage, ProductDetailPage, SellWatchPage, WishlistPage, BagPage)
│   │   ├── context/              # Global StoreContext & useStore hook (State & API sync)
│   │   ├── services/             # Axios/fetch API client (Auth, Tasks, Watches, Orders, Valuations)
│   │   └── data/                 # Haute Horlogerie catalog specs & assets
│   ├── package.json
│   └── vite.config.js
│
└── backend/                      # Node.js + Express.js REST API
    ├── src/
    │   ├── server.js             # Express app entry point
    │   ├── seed.js               # Database seeder (catalog, test user, initial tasks)
    │   ├── config/db.js          # Resilient MongoDB connector (with in-memory fallback)
    │   ├── middleware/           # JWT protect, optionalAuth, validate, errorHandler
    │   ├── models/               # User, Task, Watch, Order, Valuation Mongoose models
    │   └── routes/               # authRoutes, taskRoutes, watchRoutes, orderRoutes, valuationRoutes
    ├── tests/
    │   └── api.test.js           # Automated end-to-end API test suite (13 passing tests)
    ├── .env                      # Live environment variables
    ├── .env.example              # Environment template without secrets
    └── package.json
```

---

## Quick Start Guide

### Prerequisites
- Node.js (v18+ or v20+ or v22+)
- npm or pnpm or yarn

### 1. Start the Backend API Server
```bash
cd backend
npm install
npm start
```
The backend server runs on `http://127.0.0.1:5000` and automatically connects to MongoDB (or launches an embedded in-memory MongoDB instance if no local instance is detected).

### 2. Start the Frontend React Development Server
```bash
cd frontend
npm install
npm run dev
```
The React frontend runs on `http://127.0.0.1:3000`.

---

## Key Features & Endpoints

1. **Authentication & Authorization (`/api/auth`)**:
   - Secure registration and login using bcrypt password hashing (salt rounds = 10).
   - Stateless JWT tokens with bearer authentication middleware.
   - Demo 1-Click Login available (`collector@timeless.ch` / `Password123!`).

2. **Concierge & Collector Tasks CRUD (`/api/tasks`)**:
   - Complete REST API for task creation, retrieval, updating, and deletion.
   - User ownership verification on all task operations.
   - Integrated into the frontend with a "Concierge Tasks" modal in the header and menu.

3. **Timepieces Catalog (`/api/watches`)**:
   - High-horology timepieces with calibre details, complications, reserve, and pricing.
   - Search, category filter, and sorting.

4. **Escrow Custody Orders (`/api/orders`)**:
   - Institutional escrow order registration with armored handover transit.

5. **Trade-In & Liquidations (`/api/valuations`)**:
   - 3-step interactive appraisal valuation dossier submission with instant Geneva secondary market range.

---

## Database Configuration Options
Edit `backend/.env`:
- **In-Memory (Default)**: Leave `MONGODB_URI` blank. Runs immediately without installing MongoDB.
- **Local MongoDB**: `MONGODB_URI=mongodb://127.0.0.1:27017/timeless_watches`
- **MongoDB Atlas**: `MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/timeless_watches?retryWrites=true&w=majority`
