# BookHeaven - Online Book Store

**A modern, premium, full-featured frontend e-commerce platform for book lovers.**

## 📖 Table of Contents
1. [Project Overview](#1-project-overview)
2. [Key Features](#2-key-features)
3. [File & Directory Structure](#3-file--directory-structure)
4. [Core Javascript Modules & Functions](#4-core-javascript-modules--functions)
5. [Backend Integration Details](#5-backend-integration-details)
6. [Developer Team](#6-developer-team)
7. [Future Implementations](#7-future-implementations)

---

## 1. Project Overview
BookHeaven is an aesthetically modern, visually engaging web application built for browsing, purchasing, and discussing books. The project strictly follows vanilla HTML, CSS, and JavaScript to maintain lightweight, blazing-fast load times without the overhead of heavy frameworks (like React or Angular). It utilizes custom-built components, robust CSS variables (design tokens), and sleek glassmorphic UI patterns.

---

## 2. Key Features
- **3D Interactive Hero Section**: Uses Sketchfab iframe integration to render a beautiful, interactive 3D vintage bookstore scene right on the landing page.
- **Premium Glassmorphic UI**: Extensive use of `backdrop-filter: blur()`, semi-transparent backgrounds, and soft drop-shadows to create a premium, modern aesthetic.
- **Dynamic Component Injection**: Modular JS renders components like book cards, skeleton loaders, and toast notifications dynamically via Template Literals, eliminating dead HTML files.
- **Full E-Commerce Flow**: Comprehensive user flows including Browsing -> Searching -> Wishlist -> Cart -> Checkout -> Orders History.
- **Authentication System**: Login, Register, and Profile Management with session storage and backend syncing.
- **API Resilience (Offline Mode)**: Designed to connect to a Java/Spring REST API, but gracefully falls back to in-memory mock data if the backend is unreachable or if running via the `file://` protocol.

---

## 3. File & Directory Structure

```text
website_frontend/
├── index.html                 # Landing page with 3D model, popular books, and testimonials
├── about.html                 # Company info, team members, mission, and publishing partners
├── books.html                 # Main book catalog with filtering and search
├── book-details.html          # Single book view with description, author, and add-to-cart
├── cart.html                  # Shopping cart interface
├── checkout.html              # Payment and shipping address form
├── contact.html               # Contact form and address/map integration
├── login.html & register.html # Authentication pages
├── profile.html & orders.html # User account management and history
├── wishlist.html              # User's saved books
├── components/                # Reusable snippet containers (e.g., loader.html)
└── assets/
    ├── css/                   # Modularized CSS (home, style, navbar, footer, auth, utilities)
    ├── images/                # Static assets, logos, local fallback icons
    └── js/                    # Modularized Vanilla JS application logic
```

---

## 4. Core Javascript Modules & Functions

The application logic is separated into purpose-specific JavaScript files, keeping the codebase clean and maintainable.

### `api.js` (The Data Layer)
The central nervous system of data fetching and API connectivity.
- `API.request(endpoint, options)`: Generic wrapper for fetch calls to `BASE_URL`.
- `API.getBooks()`, `API.login()`, `API.getAboutUs()`: Domain-specific endpoints.
- **Offline Fallback Mechanism**: Intercepts `TypeError: Failed to fetch` errors and routes the request to internal hardcoded mock promises (`MOCK_BOOKS`, `MOCK_USERS`).

### `utils.js` (Global Utilities)
Helper methods used across the entire application.
- `Storage`: Wrapper around `localStorage` and `sessionStorage` (`Storage.get`, `Storage.set`).
- `Toast`: Dynamic toast notification generator (`Toast.show(message, type)`).
- `Loader`: Dynamic full-screen loading spinner (`Loader.show()`, `Loader.hide()`).
- `Currency`: Price formatting logic (`Currency.format(amount)`).

### `main.js` (Application Initializer)
Handles global DOM events and layout initializations.
- `initNavbarActions()`: Scroll events for the floating, transparent-to-solid animated navbar.
- `initFooterActions()`: Binds API data (company info, address) dynamically to the footer.

### `books.js` & `cart.js` (E-Commerce Logic)
- `Books.createBookCard(book)`: Returns the dynamic HTML string for a reusable book item.
- `Cart.add()`, `Cart.remove()`, `Cart.updateQuantity()`: Mutates the global cart state and instantly updates local storage and the DOM counter.

### `auth.js` & `profile.js` (Identity Management)
- Controls session flow, sets user contexts, handles login/registration validation, and secures protected pages by kicking unauthenticated users back to `login.html`.

---

## 5. Backend Integration Details

The frontend is designed to natively hook into a backend REST API.
- **Base URL**: `http://localhost:8080/book_store_backend`
- **Data Exchange**: Standard `application/json` format.
- **Authentication**: JWT / Token-based. The frontend expects auth tokens to be managed by the backend or stored locally.
- **Resilience**: If the Java backend is turned off, the frontend will automatically serve local fallback data without crashing. 
- **Image Fallbacks**: The frontend relies entirely on secure, local fallback images (`assets/images/icons/book.png` and `assets/images/icons/user.png`) preventing any broken images if external CDNs go down.

---

## 6. Developer Team

- **Raj** - *Head of Curation*
  - Visionary and content strategist. Handpicks the catalog and curates the aesthetic direction of the bookstore.
- **Rajdeep** - *Lead Developer*
  - Software architecture and implementation. Handles the Vanilla JS integration, API connections, and core e-commerce logic.
- **Srijani** - *Customer Experience*
  - UI/UX and user flows. Ensures that the glassmorphic layouts, animations, and typography create a frictionless white-glove experience.

---

## 7. Future Implementations (Roadmap)

1. **Live Payment Gateway Integration**: 
   Wire up `checkout.js` with Stripe, PayPal, or Razorpay APIs for live transaction handling and order processing.
2. **Server-Side Pagination & Filtering**: 
   Move client-side filtering (`filter.js`) to the backend to support massive catalogs via Server-Side Pagination and advanced search indexing (e.g., Elasticsearch).
3. **Global Dark Mode Toggle**: 
   Expand the current CSS variables to support a global, user-toggled dark mode theme that persists via `localStorage`.
4. **WebSockets for Live Chat**: 
   Add a persistent customer support floating widget using WebSockets for real-time communication with admins.
5. **Progressive Web App (PWA)**: 
   Add a `manifest.json` and a Service Worker to allow users to install BookHeaven locally on their mobile devices and support offline catalog viewing.
