# E-Commerce Platform

## Project Overview

This is a full-stack e-commerce platform built using Next.js, TypeScript, React, Node.js, Express, and MongoDB. It provides a complete shopping experience for users with features like product management, shopping cart functionality, order tracking, and a robust admin dashboard.

## 🌐 Live Preview
The project is deployed on Railway — Frontend and Backend are hosted as separate services.
[Go to Live demo](https://calm-imagination-production.up.railway.app/)

## 🔗 Postman Public Workspace  
You can explore and test all API endpoints through the public Postman workspace below:  
[🧪 Open SocialNet-API Workspace](https://www.postman.com/goatme/socialnet-api/overview)

## 📂 Project Structure

### 🔸 User Interface

#### 🏠 1. Categories Page

* The landing page displays all **product categories**.
* Users can click any category to view its products.
  ![image](https://i.postimg.cc/QC6FvzYC/Screenshot-2025-06-14-191218.png)

#### 📦 2. Products Listing

* Inside each category, all available products are shown.
  ![image](https://i.postimg.cc/mrMFh8kp/Screenshot-2025-06-14-191748.png)
* Clicking a product opens a **detailed view** with more information.
* Users can choose a quantity, **add to cart**, or proceed directly to purchase.
  ![image](https://i.postimg.cc/LXL7CKXk/Screenshot-2025-06-14-193211.png)

#### 🔐 3. Authentication Flow

* Before purchasing, the user must **log in**.
   ![image](https://i.postimg.cc/P5jvR04X/Screenshot-2025-06-14-200658.png)
* If they don’t have an account, they can register quickly.
    ![image](https://i.postimg.cc/rmP82t2G/Screenshot-2025-06-14-200714.png)
* The **guest cart** is automatically transferred to their user account after login.


#### 🛍️ 4. Checkout Process

* Users choose a **payment method** and **shipping address**.
* If no address is stored, they can **add a new one**.
* Once completed, the order is sent to the admin for processing.
  ![image](https://i.postimg.cc/Wzcs4ctt/Screenshot-2025-06-14-210938.png)

#### 📃 5. My Orders 

* Displays all orders made by the user with full details.
* Shows current **order status**: `Pending`, `Shipped`, etc.
  ![image](https://i.postimg.cc/Y0NMGDmR/Screenshot-2025-06-14-200522.png)

#### 👤 6. User information 
* Allows updating personal information.
* Manage addresses: **add**, **edit**, or **delete**.
  ![image](https://i.postimg.cc/T2nR41Hb/Screenshot-2025-06-14-200550.png)

---

### 🔸 Admin Dashboard

If the logged-in user is an **admin**, they get access to additional features through the **Admin Dashboard**:

#### 👥 1. Users Management

* View all users.
* Ability to **ban** any user.
  ![image](https://i.postimg.cc/RFnRYTkH/Screenshot-2025-06-14-200753.png)

#### 📚 2. Categories Management

* View, add, and delete categories.
    ![image](https://i.postimg.cc/vTxGYHGJ/Screenshot-2025-06-14-200813.png)
* View products within categories.
* Filter to show **deleted** or **out-of-stock** products.
  ![image](https://i.postimg.cc/yYnFv5DG/Screenshot-2025-06-14-200834.png)
* Edit product details: name, price, quantity, description, etc.
  ![image](https://i.postimg.cc/3rzvgk0D/Screenshot-2025-06-14-200852.png)

#### 📦 3. Orders Management

* View all orders across the platform.
  ![image](https://i.postimg.cc/ZYWNB8nS/Screenshot-2025-06-14-200922.png)
* Change order status (e.g., from `Pending` to `Shipped`).
  ![image](https://i.postimg.cc/Hs573Tbv/Screenshot-2025-06-14-200948.png)

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
  ![image](https://i.postimg.cc/rFbpVC3m/Screenshot-2025-06-18-055028.png)

---

## ☁️ Deployment

* Hosted on **Railway**:

  * Frontend and Backend deployed as separate services.
* MongoDB hosted via **Mongo Atlas**.

## Contact

* **email:** abdalrhman.osama.mostafa@gmail.com
