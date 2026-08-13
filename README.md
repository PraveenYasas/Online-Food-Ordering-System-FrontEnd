# 🍔 BiteDash - Online Food Ordering System (Frontend)

Welcome to the frontend repository of **BiteDash**, a modern, responsive, and highly interactive Online Food Ordering System. Built with the latest web technologies, this application provides a seamless food delivery and pickup experience for customers, alongside dedicated management panels for Restaurant Owners and Administrators.

## ✨ Key Features

### 👨‍💼 Customer Experience
* **Smart Cart System:** Real-time cart management with quantity adjustments, single-restaurant cart validation (prevents mixing items from different shops), and dynamic fee calculations (tax, service fee, discounts).
* **Delivery & Pickup Modes:** Toggle between delivery and store pickup, automatically adjusting fees and estimated times.
* **Real-time Search & Filtering:** Instantly search for favorite foods or restaurants with a live filtering system.
* **User Authentication:** Secure login and registration with JWT-based session management.
* **Order Tracking & History:** View past orders, check order status (Pending, Delivered, Cancelled), and easily reorder favorite meals.
* **Favorites:** Save favorite restaurants and dishes for quick access.
* **Profile Management:** Manage personal details, delivery addresses, and payment methods.

### 🏬 Restaurant Owner Panel
* **Menu Management:** Add, edit, and categorize food items with images and descriptions.
* **Order Management:** View incoming orders, update order statuses, and track daily revenue.

### 🛡️ Admin Panel
* **Platform Overview:** Monitor total users, active restaurants, and overall system health.
* **Store & User Management:** Approve new restaurants, suspend shops, and manage user roles.

## 🛠️ Tech Stack

* **Core:** [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
* **Build Tool:** [Vite](https://vitejs.dev/) for lightning-fast HMR and optimized builds.
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) for a utility-first, modern UI design.
* **Routing:** [React Router DOM](https://reactrouter.com/) for seamless single-page application navigation.
* **State Management:** React Context API (e.g., `CartContext` for global cart state).

## 🚀 Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v16 or higher recommended).

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/PraveenYasas/Online-Food-Ordering-System-FrontEnd.git](https://github.com/PraveenYasas/Online-Food-Ordering-System-FrontEnd.git)
   cd Online-Food-Ordering-System-FrontEnd

## 📱 How to Use BiteDash (Step-by-Step Guide)

Getting started with BiteDash is as easy as ordering your favorite meal! Here is a quick guide to exploring the platform:

### 1️⃣ Create an Account & Setup Profile
* Click on **"Sign up"** at the top right corner to create your customer account.
* Once logged in, navigate to your **Profile** to save your default Delivery Address, Contact Number, and update your personal details for faster checkouts.

### 2️⃣ Browse & Discover Delicious Food
* Use the **Smart Search Bar** to instantly find specific dishes (e.g., "Kottu", "Burger") or your favorite restaurants.
* Toggle between **Delivery** and **Pickup** modes at the top navigation bar to see accurate time estimates and pricing.
* Click the **"❤️" (Heart)** icon on food items or shops to save them to your **Favorites** for later!

### 3️⃣ Add to Cart & Checkout
* Found what you crave? Click the green **"Add"** button to drop items into your cart.
* *Note: To ensure a smooth delivery process, you can only add items from one restaurant at a time!*
* Open the **Cart Drawer** to adjust item quantities, review the total (with dynamically calculated taxes and service fees), and click **"Proceed to Checkout"**.
* Select your preferred payment method (Cash on Delivery or Card) and place your order!

### 4️⃣ Track & Manage Your Orders
* Open the sidebar menu (hamburger icon on the top left) and go to **"My Orders"**.
* Here, you can view your active orders, check their real-time status (Pending, Delivered, Cancelled), or even **Cancel** an order if it's still pending.
* Loved the meal? Use the **"Reorder"** button on past deliveries to get it again instantly!

---
**🔐 Special Note for Role-Based Access:** 
If you log in using a **Restaurant Owner** or **Admin** account, the system will automatically bypass the customer homepage and redirect you to your dedicated, secure management dashboards (`/shop-admin` or `/admin`).
