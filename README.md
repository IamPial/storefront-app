# StoreFront - An E-commerce Online Marketplace


---

##  Live Website

**Live URL:**  [https://storefront-online-app.vercel.app](https://storefront-online-app.vercel.app)



---

##  Project Overview

StoreFront is a modern, responsive e-commerce online marketplace designed to provide customers with a smooth and engaging shopping experience. The platform allows users to browse products, explore categories, search and filter items, view detailed product information, manage their cart and wishlist, complete the checkout process, and track their orders.

The application uses local JSON data to simulate a real e-commerce backend. Products are maintained as mock data inside the `/database` directory.

The project implements all eight flows requested in the assessment:

* Storefront / Home
* Product Details
* Search & Filtering
* Shopping Cart
* Checkout
* My Orders
* Order Tracking
* Wishlist

---

---

#  Screenshots

### Home Page

![Home](/src/assets/home.png)

---



##  Features

###  Storefront

* Featured products
* Product categories
* Product browsing
* Responsive layout
* Modern e-commerce interface

###  Product Details

* Product image gallery
* Product pricing
* Sale pricing
* Product information
* Product variants
* Add to Cart
* Add to Wishlist

###  Search & Filter

* Search products by name
* Filter by category
* Filter by price
* Product sorting
* Empty-results state

###  Shopping Cart

* Add products to cart
* Increase/decrease quantity
* Remove products
* Live total calculation
* Persistent cart after page refresh with localstorage
* Empty cart state

###  Checkout

* Customer address form
* Form validation
* Order summary
* Order confirmation
* Success state
* Inline validation feedback

###  My Orders

* View customer orders
* Filter orders by status
* Pending orders
* Delivered orders
* Cancelled orders
* Returned orders
* View order details

###  Order Tracking

* Visual order-status timeline
* Order progress
* Shipment/order status information

###  Wishlist

* Add products to wishlist
* Remove products from wishlist
* Move wishlist items to cart
* Persistent wishlist
* Empty wishlist state

---

##  Tech Stack

| Technology    | Purpose                     |
| ------------- | --------------------------- |
| Next.js 16    | Frontend framework          |
| React 19      | UI library                  |
| TypeScript    | Type safety                 |
| Tailwind CSS  | Styling                     |
| Lucide        | Icons                       |
| Framer Motion | Animations and interactions |
| Context API   | Global state management     |
| Local JSON    | Mock data                   |

---

##  Project Structure

```text
storefront-app/
│
├── database/
│   ├── products.json
│   
│   
│   
│
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── products/
│   │   ├── carts/
│   │   ├── checkout/
│   │   ├── orders/
│   │   ├── order-tracking/
│   │   └── wishlists/
│   │
│   ├── assets/
│   │   
│   │
│   ├── components/
│   │   ├── layout/
│   │   ├── homepage/
│   │   ├── cart/
│   │   ├── wishlist/
│   │   ├── ui/
│   │   
│   │
│   ├── context/
│   │   ├── CartContext.tsx
│   │   └── WishlistContext.tsx
│   │
│   ├
│   │  
│   │
│   └── lib/
│       └── api/
│
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```


---

##  State Management

I chose **React Context API** for global state management.

The application primarily uses Context API to manage shared client-side state such as:

* Shopping cart
* Cart quantities
* Wishlist
* Adding/removing products
* Moving wishlist items to cart
* Persistent user selections

Context API was chosen because the application's global state requirements are relatively focused and do not require the additional complexity of a dedicated state-management library.

Using Context API also keeps the project lightweight and makes the state flow easy to understand and maintain.

Cart and wishlist data are persisted using browser storage so that the user's selections remain available after a page refresh.

---

##  Mock Data

The application does not use an external API or database.

All e-commerce data is stored locally inside:

```text
/database
```


The data structure follows the concepts and field naming patterns provided in the assessment reference material as closely as practical.

---

##  Assets

All project images are stored inside the `src/assets` directory rather than the `public` directory.

```text
src/
└── assets/
    
```

Images are imported directly into the relevant components/pages where required.

---

## Design Approach

The project was designed independently without relying on a pixel-perfect responsive ui.

The main design goals were:

* Modern and unique visual identity
* Clear visual hierarchy
* Responsive design
* Consistent spacing and typography
* Restrained use of gradients and shadows
* Purposeful animations
* Reusable components
* Clear interaction feedback

The interface also considers different application states:

* Loading
* Empty
* Error
* Success
* Form validation
* No search results
* Empty cart
* Empty wishlist

---

##  Animation & Interaction

**Framer Motion** is used selectively where animation improves the overall user experience.

Examples include:

* Hover interactions
* Modal entrances
* Product interactions
* Page/section transitions
* Cart and wishlist feedback

Animations are intentionally subtle and are used to support the interface rather than distract from the shopping experience.

---

##  Responsive Design

The storefront is designed to work across:

*  Mobile
*  Tablet
*  Desktop

The UI follows a responsive approach with particular attention to mobile shopping experiences.

---

##  Getting Started

### Prerequisites

Make sure you have installed:

* Node.js 18+
* npm, yarn, or pnpm

### 1. Clone the repository

```bash
  git clone https://github.com/IamPial/storfront-app.git
```

### 2. Navigate to the project

```bash
cd storefront-app
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Visit:

```text
http://localhost:3000
```

---

##  Available Scripts

```bash
# Start development server
npm run dev

# Create production build
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

---

##  Environment Variables

This project does not require any external API keys or database credentials.

No `.env` configuration is required to run the application locally.

---

##  Assumptions

* The project is frontend-only.
* No real backend API is used.
* Local JSON files are used as mock data.
* Checkout simulates order creation rather than processing a real payment.
* Order tracking is based on the mock order lifecycle.
* Cart and wishlist state are managed using React Context API.
* Cart and wishlist selections persist across page refreshes.
* Product and order information is based on the local mock dataset.

---


##  Author

**Pial Uddin**

Frontend Developer
