# TIMELESS — Haute Horlogerie React Frontend

A luxury watch storefront frontend built with **React**, **Vite**, **Tailwind CSS**, and **React Router DOM**, meticulously converted from Google Stitch design specifications and the *Horological Editorial* design system.

---

## 🏛️ Architecture & Highlights

- **Aesthetic Precision**: Implements the Swiss Haute Horlogerie design movement — high-contrast transitional serifs (**Playfair Display**) paired with surgical sans-serif typography (**Plus Jakarta Sans**), warm alabaster canvas (`#FCF9F3`), champagne gold metallic accents (`#C6A15B`), and hairline borders (`1px solid #EAE2D5`).
- **Currency & Micro-Typography**: Dedicated Indian Rupee (`₹`) formatting with tabular figures (`tnum`) across all prices and valuations.
- **Client-Side State Management**: Persistent `StoreContext` for managing the private custody bag, wishlist bookmarks, live toasts, and bespoke configurator state.
- **Fluid Routing & Modals**: Smooth navigation between Curated Showcase, Curated Vault, Product Atelier, Trade-In Valuation Salon, Private Wishlist, and Custody Bag with interactive drawer and modal overlays.

---

## 📁 Project Structure

```
timeless-luxury-watches/
├── stitch_timeless_luxury_watch_storefront/   # Original Google Stitch UI designs & assets
│   ├── horological_editorial/DESIGN.md       # Design system specification
│   ├── timeless_flagship_showcase/
│   ├── timeless_haute_horlogerie_luxury_watches/
│   ├── timeless_royal_chronometer_detail/
│   └── timeless_watch_catalog_collections/
└── frontend/                                 # Complete React Application
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── common/
    │   │   │   ├── Header.jsx                # Fixed navigation with logo, search, bag, wishlist & avatar
    │   │   │   ├── Footer.jsx                # Haute Horlogerie guarantees, newsletter & concierge info
    │   │   │   ├── BottomNav.jsx             # Fixed mobile navigation bar
    │   │   │   ├── MenuDrawer.jsx            # Curated slide-over navigation drawer
    │   │   │   ├── SearchModal.jsx           # Live archive search with auto-suggestions
    │   │   │   ├── QuickViewModal.jsx        # Rapid timepiece inspection modal
    │   │   │   └── Toast.jsx                 # Ambient horological notifications
    │   │   ├── home/
    │   │   │   ├── HeroSection.jsx           # Masterpiece Edition 2025 showcase & complication tags
    │   │   │   ├── CategoriesSection.jsx     # Curated Salons (Men's, Women's, Complications, etc.)
    │   │   │   ├── FeaturedTimepieces.jsx    # 8 Masterpieces grid with filter pills
    │   │   │   ├── PreOwnedAcquisition.jsx   # 3-step trade-in & liquidation overview
    │   │   │   ├── BrandStory.jsx            # Le Locle craftsmanship vignette & tolerances
    │   │   │   ├── Testimonials.jsx          # Connoisseur collector impressions
    │   │   │   └── NewsletterBox.jsx         # Private Salon Gazette invite box
    │   │   ├── catalog/
    │   │   │   ├── CatalogHeader.jsx         # Vault breadcrumbs & live calibre count
    │   │   │   ├── CatalogFilterBar.jsx      # Live search, sort dropdown & quick metal chips
    │   │   │   ├── MetricBar.jsx             # Insured transit & bespoke invoicing banner
    │   │   │   └── CatalogGrid.jsx           # Technical specification rows & calibre inspection
    │   │   ├── product/
    │   │   │   ├── ProductGallery.jsx        # 4-angle carousel, 360° indicator, tourbillon pulse & zoom
    │   │   │   ├── ProductPricing.jsx        # Reference serials, privilege discount & GST inclusion
    │   │   │   ├── BespokeConfigurator.jsx   # Strapwork & Métiers d'Art dial selector with live pricing
    │   │   │   ├── AcquisitionActions.jsx    # Boutique stock indicator, quantity & escrow CTAs
    │   │   │   ├── AuthenticityBadges.jsx    # NFC sapphire crystal & Ethereum provenance deed
    │   │   │   ├── TechnicalSpecs.jsx        # Alternating horological specification table
    │   │   │   ├── ConnoisseurReviews.jsx    # Verified owner reviews
    │   │   │   ├── RelatedTimepieces.jsx     # Curated pairings swipe carousel
    │   │   │   ├── StickyConciergeBar.jsx    # Sticky bottom concierge quick bar
    │   │   │   ├── EscrowModal.jsx           # Tier-1 Institutional Escrow settlement flow
    │   │   │   └── SalonViewingModal.jsx     # Private viewing suite reservation (Mumbai/Delhi/Zurich)
    │   │   ├── sell/
    │   │   │   └── (Interactive multi-step liquidation & trade-in estimator)
    │   │   └── bag/
    │   │       └── BagDrawer.jsx             # Slide-out bag overview & escrow checkout
    │   ├── context/
    │   │   └── StoreContext.jsx              # Global state for Bag, Wishlist, Modals & Toasts
    │   ├── data/
    │   │   └── watchesData.js                # High-fidelity horological catalog data & specs
    │   ├── pages/
    │   │   ├── HomePage.jsx                  # Flagship Showcase
    │   │   ├── CatalogPage.jsx               # Curated Vault Catalog
    │   │   ├── ProductDetailPage.jsx         # Royal Chronometer & Timepiece Atelier
    │   │   ├── SellWatchPage.jsx             # Pre-Owned Acquisition Salon & Calculator
    │   │   ├── WishlistPage.jsx              # Saved Private Collections
    │   │   ├── BagPage.jsx                   # Custody Bag & Escrow Settlement
    │   │   └── NotFoundPage.jsx              # 404 Chronometric Deviation
    │   ├── App.jsx                           # Route configuration & global overlays
    │   ├── main.jsx                          # Root provider mounting
    │   └── index.css                         # Tailwind directives & horological styles
    ├── index.html                            # Google Fonts & Material Symbols typography
    ├── tailwind.config.js                    # Design tokens (colors, font sizes, spacing, radii)
    ├── vite.config.js
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18+ or v20+ / v22+
- **npm** (or **pnpm** / **yarn**)

### 1. Installation

Navigate into the `frontend` directory and install dependencies:

```powershell
cd C:\Users\HP\.gemini\antigravity\scratch\timeless-luxury-watches\frontend
npm install
```

### 2. Development Server

Start the local development server:

```powershell
npm run dev
```

The application will be live at:
**`http://localhost:3000/`** (or `http://127.0.0.1:3000/`)

### 3. Production Build

To compile and optimize for production:

```powershell
npm run build
```

To preview the production bundle:

```powershell
npm run preview
```

---

## 💎 Pages & Routes

| Route | Page | Key Features |
| :--- | :--- | :--- |
| `/` or `/explore` | **Flagship Showcase** | Masterpiece Edition hero with animated tourbillon escapement, Curated Salons categories, 8 featured timepieces, pre-owned banner, brand heritage story, testimonials, and private gazette. |
| `/catalog` or `/collections` | **Curated Vault** | Real-time search by calibre or reference, sort by price/rating/heritage, quick filter chips (Rose Gold, Platinum, Complications, etc.), 4-column technical specification rows, and archive synchronization. |
| `/watch/:id` or `/product/:id` | **Timepiece Atelier** | 4-angle gallery carousel (Front Dial, Exhibition Sapphire Caseback, Crown & Bezel, On-Wrist) with zoom magnifier and 28,800 VPH tourbillon pulse; bespoke strap & dial configurator with dynamic price adjustments; Escrow modal; Salon appointment booking. |
| `/sell` or `/sell-your-watch` | **Acquisition Salon** | 3-step interactive trade-in & liquidation estimator for luxury timepieces (Patek Philippe, Audemars Piguet, Rolex, etc.) with real-time Geneva secondary market valuation in ₹ INR. |
| `/wishlist` | **Private Wishlist** | Saved timepieces with one-click "Allocate All to Bag", inspection triggers, and persistent browser storage. |
| `/bag` or `/shopping-bag` | **Custody Bag & Escrow** | Detailed allocation breakdown, complimentary armored escort delivery address scheduler, and Tier-1 institutional escrow settlement. |
| `*` | **404 Deviation** | Elegant chronometric deviation screen with quick links back to the Maison and Curated Vault. |

---

## 🎨 Design System Compliance

- **Surface Tiers**: Warm Alabaster (`#FCF9F3`) flat canvas, Pure White (`#FFFFFF`) elevated pedestals with hairline borders (`1px solid #EAE2D5`), and atmospheric shadow overlays.
- **Accents**: Champagne Gold (`#C6A15B`) reserved for micro-details, badges, and high-value highlights; Charcoal Black (`#202020` / `#1C1C18`) for authoritative grounding and primary CTAs.
- **Typography**: Paired transitional serif `Playfair Display` for headlines and narrative depth with `Plus Jakarta Sans` for crystalline technical clarity and currency displays.
- **Responsive Layout**: Fluid experience across mobile, tablet, and ultra-wide desktop displays (12-column grid capped at 1440px max content width).
