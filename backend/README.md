# TIMELESS — Haute Horlogerie Backend API

Enterprise-grade REST API backend built for the **TIMELESS Haute Horlogerie** luxury watch storefront. Powered by **Node.js**, **Express.js**, **MongoDB / Mongoose**, and **JWT**.

---

## Architecture & Technology Stack

- **Runtime**: Node.js (ES Modules, `import`/`export`)
- **Web Framework**: Express.js 4.21+
- **Database & ODM**: MongoDB with Mongoose 8.8+
- **Security & Cryptography**:
  - `bcryptjs` (salt rounds = 10) for one-way password hashing
  - `jsonwebtoken` (JWT) with bearer token extraction & expiry
  - Role-based and ownership-based access control
  - Centralized request validation middleware
- **Zero-Config Database Resiliency**: Automatic fallback to `mongodb-memory-server` if local MongoDB is not running, ensuring immediate out-of-the-box execution for demonstration and testing.
- **CORS**: Configured for React frontend (`http://localhost:3000` & `http://127.0.0.1:3000`).

---

## Directory Structure

```
backend/
├── .env                  # Live environment configuration (gitignored)
├── .env.example          # Sanitized template without secrets
├── package.json          # Dependencies & scripts
├── README.md             # Backend documentation
├── src/
│   ├── server.js         # Express app initialization & route mounting
│   ├── seed.js           # Database seeder (11 timepieces, demo user, tasks)
│   ├── config/
│   │   └── db.js         # Resilient Mongoose connection manager
│   ├── middleware/
│   │   ├── auth.js       # protect, optionalAuth, authorize
│   │   ├── validate.js   # Validation middleware for auth & tasks
│   │   └── errorHandler.js # Global error handler
│   ├── models/
│   │   ├── User.js       # User schema with bcrypt password hashing
│   │   ├── Task.js       # Concierge and collector tasks schema
│   │   ├── Watch.js      # Haute Horlogerie timepiece catalog schema
│   │   ├── Order.js      # Escrow custody orders schema
│   │   └── Valuation.js  # Pre-owned watch trade-in valuation schema
│   └── routes/
│       ├── authRoutes.js      # /api/auth (register, login, me, profile, wishlist)
│       ├── taskRoutes.js      # /api/tasks (full CRUD with ownership checks)
│       ├── watchRoutes.js     # /api/watches (catalog query, search, filtering)
│       ├── orderRoutes.js     # /api/orders (escrow custody order submission)
│       └── valuationRoutes.js # /api/valuations (instant liquidation appraisal)
└── tests/
    └── api.test.js       # Automated end-to-end API test suite (13 endpoints)
```

---

## Environment Variables Configuration

Create a `.env` file in the `backend/` directory (you can copy `.env.example`):

```bash
# Server Port
PORT=5000

# Node Environment
NODE_ENV=development

# MongoDB Connection String:
# 1. Local MongoDB: mongodb://127.0.0.1:27017/timeless_watches
# 2. MongoDB Atlas: mongodb+srv://<username>:<password>@cluster0.mongodb.net/timeless_watches?retryWrites=true&w=majority
# 3. Leave blank or omit: Automatically spins up a high-performance in-memory MongoDB instance!
MONGODB_URI=

# JWT Secret Key (Replace with a strong 32+ character random secret in production)
JWT_SECRET=timeless_haute_horlogerie_geneva_master_key_2026_jwt_secret

# JWT Expiration Period
JWT_EXPIRE=30d

# Frontend Client URL for CORS
CLIENT_URL=http://127.0.0.1:3000
```

---

## Database Credentials & Setup Guide

### Option 1: Zero-Config In-Memory Database (Default)
If you do not have MongoDB installed or configured, **no action is required**. The backend automatically detects that no external MongoDB server is reachable and launches an embedded in-memory MongoDB instance, seeding it with the initial 11 master timepieces, concierge tasks, and a test collector account.

### Option 2: Local MongoDB Service
If you have MongoDB installed locally:
1. Ensure the MongoDB service is active (`mongod`).
2. Set in `backend/.env`:
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/timeless_watches
   ```

### Option 3: MongoDB Atlas (Cloud)
To connect to a managed cloud cluster:
1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user with read/write permissions.
3. Whitelist your IP address (or `0.0.0.0/0` for development).
4. Copy the connection string and paste it into `backend/.env`:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/timeless_watches?retryWrites=true&w=majority
   ```

---

## Default Demonstration Account

The backend automatically seeds a demonstration collector account:
- **Email**: `collector@timeless.ch`
- **Password**: `Password123!`
- **Tier**: `Geneva VIP Connoisseur`

---

## API Endpoints Reference

### 1. System Health
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/health` | Public | Server status, timestamp, and environment |

### 2. User Authentication & Profile
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register new collector (`name`, `email`, `password`, `phone`, `city`) |
| `POST` | `/api/auth/login` | Public | Sign in (`email`, `password`) → returns JWT token & user |
| `GET` | `/api/auth/me` | Protected (JWT) | Get currently authenticated collector profile |
| `PUT` | `/api/auth/profile` | Protected (JWT) | Update phone, city, or address |
| `POST` | `/api/auth/wishlist/toggle` | Protected (JWT) | Add/remove timepiece ID from user wishlist |

### 3. Concierge & Collector Tasks (REST CRUD)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/tasks` | Protected (JWT) | Create new task (`title`, `description`, `category`, `priority`, `watchName`, `location`) |
| `GET` | `/api/tasks` | Protected (JWT) | List collector's tasks (filterable by `status`, `category`, `priority`) |
| `GET` | `/api/tasks/:id` | Protected (JWT) | Retrieve a single task by ID |
| `PUT` | `/api/tasks/:id` | Protected (JWT) | Update task (`status`, `priority`, `description`, etc.) |
| `DELETE` | `/api/tasks/:id` | Protected (JWT) | Delete / archive task |

### 4. Haute Horlogerie Timepiece Catalog
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/watches` | Public | Query master catalog (search `?search=tourbillon`, `?category=rose-gold`, `?sort=price_desc`) |
| `GET` | `/api/watches/:id` | Public | Retrieve single timepiece by ID or slug |
| `POST` | `/api/watches` | Admin | Add a new calibre to the Curated Vault |

### 5. Escrow Orders & Custody Settlements
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/orders` | Optional Auth | Register escrow custody deed with delivery details and bank escrow |
| `GET` | `/api/orders` | Protected (JWT) | List collector's escrow custody orders |
| `GET` | `/api/orders/:id` | Protected (JWT) | Get single order details |

### 6. Pre-Owned Valuations & Trade-Ins
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/valuations` | Optional Auth | Submit trade-in appraisal dossier (`brand`, `model`, `condition`, `hasBox`, `hasPapers`, etc.) |
| `GET` | `/api/valuations` | Protected (JWT) | List collector's submitted appraisal dossiers |

---

## Installation & Running Commands

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start development server with hot-reload
npm run dev

# Or start production server
npm start

# Run end-to-end automated API tests
npm test
```
