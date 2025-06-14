# E-Commerce Platform

## Project Overview

This is a full-stack e-commerce platform built using Next.js, TypeScript, React, Node.js, Express, and MongoDB. It provides a complete shopping experience for users with features like product management, shopping cart functionality, order tracking, and a robust admin dashboard.

## 🌐 Live Preview
The project is deployed on Railway — Frontend and Backend are hosted as separate services.
[Go to Live demo](https://calm-imagination-production.up.railway.app/)


## 📂 Project Structure

### 🔸 User Interface

#### 🏠 1. Categories Page

* The landing page displays all **product categories**.
* Users can click any category to view its products.
  ![image](path-to-categories-image)

#### 📦 2. Products Listing

* Inside each category, all available products are shown.
* Clicking a product opens a **detailed view** with more information.
* Users can choose a quantity, **add to cart**, or proceed directly to purchase.
  ![image](path-to-product-details-image)

#### 🔐 3. Authentication Flow

* Before purchasing, the user must **log in**.
* If they don’t have an account, they can register quickly.
* The **guest cart** is automatically transferred to their user account after login.
  ![image](path-to-login-image)

#### 🛍️ 4. Checkout Process

* Users choose a **payment method** and **shipping address**.
* If no address is stored, they can **add a new one**.
* Once completed, the order is sent to the admin for processing.
  ![image](path-to-checkout-image)

#### 📃 5. My Orders (`/user/orders`)

* Displays all orders made by the user with full details.
* Shows current **order status**: `Pending`, `Shipped`, etc.
  ![image](path-to-user-orders-image)

#### 👤 6. User Profile (`/user/data`)

* Allows updating personal information.
* Manage addresses: **add**, **edit**, or **delete**.
  ![image](path-to-user-profile-image)

---

### 🔸 Admin Dashboard

If the logged-in user is an **admin**, they get access to additional features through the **Admin Dashboard**:

#### 👥 1. Users Management

* View all users.
* Ability to **ban** any user.
  ![image](path-to-users-management-image)

#### 📚 2. Categories Management

* View, add, and delete categories.
* View products within categories.
* Filter to show **deleted** or **out-of-stock** products.
* Edit product details: name, price, quantity, description, etc.
  ![image](path-to-categories-admin-image)

#### 📦 3. Orders Management

* View all orders across the platform.
* Change order status (e.g., from `Pending` to `Shipped`).
  ![image](path-to-orders-admin-image)

---
## Tech Stack 🛠️ 

* **Frontend:**
  * Next.js
  * React
  * TypeScript
  * Tailwind CSS
* **Backend:**
  * Node.js
  * Express
  * MongoDB with Mongo Atlas
  * JWT for authentication
  * Passport.js for user sessions
  * bcrypt for password hashing
  * Multer & Cloudinary for image upload


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Abdoosama-0/ecommerce-platform.git
   ```

2. Navigate to the project directory:

   ```bash
   cd ecommerce-platform
   ```

3. Set up environment variables in server file (.env file):

   ```
   
    GOOGLE_CLIENT_ID=your_GOOGLE_CLIENT_ID
    GOOGLE_CLIENT_SECRET=your_GOOGLE_CLIENT_SECRET
    CALLBACK_URL=your_CALLBACK_URL
    COOKIE_SECRET=your_COOKIE_SECRET
    CLOUD_NAME=your_CLOUD_NAME
    API_KEY=your_API_KEY
    API_SECRET=your_API_SECRET
    SECRET_TOKEN=your_SECRET_TOKEN
    Client_URL=your_Client_URL
    MONGODB_URI=your_mongodb_connection_string
   ```

4. Set up environment variables in client file (.env.local file):

  ```
  NEXT_PUBLIC_API_URL=you_API_URL
  ```


5. Install dependencies and run for both backend and frontend:

   ```bash
   cd server
   npm install
   npm run dev
   cd ../client
   npm install
   npm run dev
   ```
---

## 📱 Responsive Design

* The application is **fully responsive** and works seamlessly across all screen sizes.
  ![image](path-to-responsive-image)

---

## ☁️ Deployment

* Hosted on **Railway**:

  * Frontend and Backend deployed as separate services.
* MongoDB hosted via **Mongo Atlas**.

## Contact

* **email:** abdalrhman.osama.mostafa@gmail.com
