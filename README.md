# E-Commerce Platform

## Project Overview

This is a full-stack e-commerce platform built using Next.js, TypeScript, React, Node.js, Express, and MongoDB. It provides a complete shopping experience for users with features like product management, shopping cart functionality, order tracking, and a robust admin dashboard.

## Features

* **Full-Stack Architecture:** Built using Next.js (React and TypeScript) for the frontend and Node.js with Express for the backend.
* **Responsive UI:** Designed with Tailwind CSS to ensure a smooth experience across devices.
* **Authentication & Authorization:** User authentication with secure password hashing, role-based access control (admin and customer).
* **Admin Dashboard:** Comprehensive dashboard for product, order, and user management.
* **Product Management:** Admin can add, edit, and delete products.
* **Cart Management:** Users can add products to the cart, specify quantities, and proceed with checkout.
* **Order Management:** Users can track orders, and admins can manage order status.
* **RESTful API:** Secure and scalable API endpoints for products, orders, and user profiles.

## Tech Stack

* **Frontend:**

  * Next.js
  * React
  * TypeScript
  * Tailwind CSS
* **Backend:**

  * Node.js
  * Express
* **Database:**

  * MongoDB

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Abdoosama-0/ecommerce-platform.git
   ```

2. Navigate to the project directory:

   ```bash
   cd ecommerce-platform
   ```

3. Set up environment variables (.env file):

   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   PORT=5000 (Backend)
   NEXT_PUBLIC_PORT=3000 (Frontend)
   ```
   
4. Install dependencies for both backend and frontend:

   ```bash
   cd server
   npm install
   npm run dev
   cd ../client
   npm install
   npm run dev
   ```



## Usage

* Access the platform at `http://localhost:3000` for the frontend and `http://localhost:5000` for the backend API.
* Use the admin dashboard for managing products, users, and orders.
* Regular users can browse products, add them to the cart, and complete the checkout process.

## Folder Structure

```
/ecommerce-platform
├── client (Frontend)
│   └── pages
│   └── components
│   └── styles
├── server (Backend)
│   └── controllers
│   └── models
│   └── routes
│   └── config
└── .env
└── README.md
```

## Security

* Secure password hashing using bcrypt.
* JSON Web Token (JWT) for user authentication and session management.
* Role-based access control for admin and customer.

## Contributing

1. Fork the repository.
2. Create a new branch (`feature/your-feature`).
3. Commit your changes.
4. Push to the branch.
5. Open a pull request.

## License

This project is licensed under the MIT License.

## Contact

* **Your Name:** Your contact email or GitHub profile.
