# 📚 BookHeaven - Premium Online Bookstore

A production-ready, highly interactive, and visually stunning e-commerce storefront for an **Online Bookstore**. Built entirely with **Semantic HTML5, CSS3, and Modular ES6 Vanilla JavaScript** (no frameworks, no external libraries). This storefront features elegant dark-contrast accents, custom glassmorphism overlays, smooth transitions, and high-performance micro-animations.

The application utilizes a **Dual-Protocol API Service** which runs on asynchronous standard `fetch()` requests when hosted on active servers and falls back seamlessly to preloaded database arrays when opened locally as static files (`file:///...`), completely bypassing browser CORS blockades.

---

## 🌟 Core Features

1. **Dynamic Catalog & Search Engine**: 
   Instant keypress searching by book title or author. Displays reactive search matching results in a highly premium book card layout.
2. **Category & Price Range Filters**:
   Filter catalog items on the fly using category checkboxes (Self-Help, Business, Tech, Fiction) and dynamic price range slider controls.
3. **Immersive Product Details Page**:
   Renders detailed descriptions, publishing specifications, real-time stock alert indicators, dynamic star-rating aggregates, and detailed user reviews.
4. **Modernized Shopping Cart Experience**:
   Features a 3-stage visual checkout progress stepper, visual left-accent borders, card translation sliding animations, pill-shaped quantity adjusters, and animated removal trash bin triggers.
5. **Flexible Promo Coupon Engine**:
   Simulates active discounts. Applying coupon `BOOKNEW10` triggers a flat 10% subtotal subtraction. Orders with subtotals above ₹1,000 receive automatic free shipping; others incur a standard ₹60 delivery fee.
6. **Secure Billing Checkout**:
   Form validation checks shipping info, payment selections (Card or Cash on Delivery), and expiration formats before finalizing orders.
7. **Simulated Authentication Session**:
   State-persisted login (`john@example.com` / `Password123`) and registration forms backed by `localStorage`.
8. **Interactive User Profile Dashboard**:
   Update profile information, add multiple shipping addresses, edit billing credentials, and select map coordinates.
9. **Real-time Order History Tracker**:
   Tracks order dates, pre-calculated totals, delivery milestones, status trackers, and purchased item list components.
10. **Wishlist Bookmarks**:
    Favorite/unfavorite books instantly. Wishlist and Cart badges in the navigation bar update dynamically across all pages.
11. **Responsive Glassmorphic Contact & About Us Cards**:
    Home About Us collage stack displays perfectly on mobile. The Contact page includes a simulated pulsing map coordinates box and highly responsive form fields.
12. **100% Mobile Responsive Design**:
    Tailored media queries for small smartphones (iPhones, Androids), tablets (iPads), large laptops, and high-resolution monitors.

---

## 🛠️ Technology Stack

* **Structure**: Semantic HTML5 Markup.
* **Styles**: Vanilla CSS3 (CSS Variables, Grid, Flexbox, Glassmorphism, animations).
* **Logic**: Vanilla ES6 JavaScript (Modular scripts, `localStorage` DB persistence).
* **Vectors & Icons**: Remix Icon Web Fonts (loaded via lightweight CDN).
* **Fonts**: Google Fonts (`Inter` for reading text; `Outfit` for strong headings).

---

## 📂 File & Directory Architecture

```text
website_frontend/
├── index.html                  # Homepage (Best Sellers, Categories, Testimonials, About Us)
├── books.html                  # Catalog Browsing, Search, and Category Filtering
├── book-details.html           # Specifications, Rating Aggregates, and User Reviews
├── cart.html                   # Shopping Bag, Stepper Progress, and Promo Codes
├── checkout.html               # Billing Credentials, Payment Selection, Secure Order Form
├── login.html                  # Sign In Simulation
├── register.html               # Sign Up Simulation
├── profile.html                # User Settings, Address Management, Coordinates Selection
├── orders.html                 # Order History Logs and Status Milestones
├── wishlist.html               # Favorite Bookmarks Panel
├── about.html                  # Detailed Corporate Company Profile
├── contact.html                # Pulsing HQ Map coordinates and Support Ticket Form
├── README.md                   # Project Handover Documentation
│
├── components/                 # Shared Visual Component Templates
│   ├── navbar.html             # Global Sticky Navigation Drawer Overlay
│   ├── footer.html             # Corporate Directory and Newsletter forms
│   ├── modal.html              # Address edit dialogue layouts
│   ├── loader.html             # In-app loader spinner visualizer
│   └── toast.html              # Custom in-app Toast notification panel
│
└── assets/
    ├── data/
    │   └── books.json          # Offline Book Database (Double-Protocol fallbacks)
    │
    ├── css/
    │   ├── style.css           # Global resets, harmonized colors, and variables
    │   ├── navbar.css          # Sticky headers and sliding overlay menus
    │   ├── footer.css          # Legal columns and quick links
    │   ├── home.css            # Hero sections, overlays, and About Us collage styles
    │   ├── books.css           # Catalog layouts, filter sidebar checkbox grids
    │   ├── details.css         # Star reviews, specs grids, and stock notifications
    │   ├── cart.css            # checkout stepper, pill adjustments, and trash scales
    │   ├── checkout.css        # Card details and billing summaries
    │   ├── profile.css         # Sidebar dashboards and address modal styling
    │   ├── contact.css         # Glassmorphic detail cards, simulated map pins
    │   ├── auth.css            # Sign In/Create Account card aesthetics
    │   ├── utilities.css       # Unified paddings, generic cards, and button templates
    │   ├── animations.css      # Fade-ins, pulsing pin animations, loading keyframes
    │   └── responsive.css      # Comprehensive Smartphone, iPad, and Desktop breakpoint engine
    │
    └── js/
        ├── utils.js            # Storage wrappers, custom Loader, and dynamic Toasts
        ├── api.js              # Dual-protocol asynchronous CORS fallback resolver
        ├── validation.js       # Real-time CSS form error/success validation markers
        ├── main.js             # Shared navbar injection, dropdown panels, active indicators
        ├── books.js            # Catalog filters render, card click detail redirection
        ├── book-details.js     # Detail stock tracking and review injection
        ├── cart.js             # Cart management, Promo Code apply calculation algorithms
        ├── checkout.js         # Placed orders creation, localStorage user databases updates
        ├── profile.js          # shipping addresses CRUD actions and local overlays
        ├── wishlist.js         # Favorites bookmarks toggler
        └── auth.js             # Credentials verification, local session controllers
```

---

## 🚀 How to Clone and Run the Project

### 1. Clone this Repository
Clone the repository using Git:
```bash
git clone https://github.com/your-username/online-bookstore.git
```
Navigate into the directory:
```bash
cd online-bookstore/website_frontend
```

### 2. Run the Application

#### Option A: Running Completely Offline (No Active Server)
Since the Bookstore is designed using a custom **Dual-Protocol API Service**, you do not need to host it on a server! You can double-click **`index.html`** or open it directly in any browser (`file:///...`). All book details, search listings, and filtering actions will run completely offline.

#### Option B: Running with a Local Static Server (Recommended)
To run the project in a simulated production environment (which resolves components like `navbar.html` and `footer.html` asynchronously using active HTTP protocols), you can serve the directory using a lightweight static server.

**Using Node.js (`npx`):**
```bash
npx http-server -p 8000
```

**Using Python:**
```bash
python -m http.server 8000
```

**Using PHP:**
```bash
php -S localhost:8000
```

After launching your server, open your browser and navigate to:
👉 **[http://localhost:8000/index.html](http://localhost:8000/index.html)**

---

## 🔑 Preloaded Test Credentials

For user authentication and promo code simulations, the following credentials are pre-configured:

* **Simulated User Account:**
  * **Email:** `john@example.com`
  * **Password:** `Password123`
* **Subtotal Coupon Code:**
  * **Code:** `BOOKNEW10` (Yields a flat **10% discount** on your checkout subtotal).
* **Free Delivery Limit:**
  * Subtotals above **₹1,000** receive **Free Shipping**; otherwise, a flat **₹60** shipping fee is appended.
