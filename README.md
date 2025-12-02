# 🍔 Foodie - Restaurant & Food Delivery App

<div align="center">

![JavaScript](https://img.shields.io/badge/JavaScript-99.1%25-yellow?style=for-the-badge&logo=javascript)
![React](https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Styling-38B2AC?style=for-the-badge&logo=tailwind-css)

**A full-stack food ordering and restaurant management application with role-based access control**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [API Reference](#-api-reference) • [Screenshots](#-screenshots)

</div>

---

## 📋 Overview

Foodie is a comprehensive full-stack restaurant and food delivery application that enables users to browse restaurants, order food, and track their orders. It features a robust admin panel for restaurant management, food item management, and order processing with role-based access control including Client, Admin, and Super Admin roles.

## ✨ Features

### 👤 User Features
- **User Authentication** - Secure registration and login with JWT
- **Browse Restaurants** - View all restaurants with ratings, delivery time, and location
- **Food Menu** - Browse food items with categories, tags, and pricing
- **Shopping Cart** - Add, update, and remove items from cart
- **Order Management** - Place orders and track order status
- **User Profile** - Manage profile, addresses, and payment methods
- **Search & Filter** - Search food items and filter by categories

### 👨‍💼 Admin Features
- **Dashboard Analytics** - View order summaries, revenue, and ratings
- **Restaurant Management** - Create, update, and delete restaurants
- **Food Item Management** - Add and manage food items with images and tags
- **Category Management** - Organize food items into categories
- **Tag Management** - Create custom tags with colors for food items
- **Order Management** - View and update order statuses

### 🔐 Super Admin Features
- **Admin Management** - Promote users to admin role
- **System-wide Access** - Full control over all platform features
- **User Role Management** - Manage user types (client, admin, vendor, driver)

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI Library |
| **Vite** | Build Tool & Dev Server |
| **Tailwind CSS** | Utility-First CSS Framework |
| **Zustand** | State Management |
| **React Router DOM** | Client-side Routing |
| **Framer Motion** | Animations |
| **Radix UI** | Headless UI Components |
| **Lucide React** | Icon Library |
| **Axios** | HTTP Client |
| **React Hook Form** | Form Management |
| **Recharts** | Charts & Data Visualization |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime Environment |
| **Express.js** | Web Framework |
| **MongoDB** | NoSQL Database |
| **Mongoose** | MongoDB ODM |
| **JWT** | Authentication |
| **bcryptjs** | Password Hashing |
| **CORS** | Cross-Origin Resource Sharing |
| **Morgan** | HTTP Request Logger |
| **dotenv** | Environment Variables |
| **cookie-parser** | Cookie Handling |

## 📁 Project Structure

```
foodie-restaurant-app-fullstack/
├── client/                          # Frontend React Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/              # Admin-specific components
│   │   │   ├── shared/             # Shared/reusable components
│   │   │   └── ui/                 # UI component library
│   │   ├── layouts/                # Layout components
│   │   ├── pages/
│   │   │   ├── admin/              # Admin pages
│   │   │   ├── auth/               # Authentication pages
│   │   │   └── client/             # Client pages
│   │   ├── store/                  # Zustand state stores
│   │   ├── lib/                    # Utility functions
│   │   └── utils/                  # API configuration
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── server/                          # Backend Node.js Application
    ├── config/
    │   └── db.js                   # Database configuration
    ├── controllers/
    │   ├── authController.js       # Authentication logic
    │   ├── userController.js       # User management
    │   ├── restaurantController.js # Restaurant CRUD
    │   ├── foodController.js       # Food item CRUD
    │   ├── categoryController.js   # Category management
    │   ├── tagController.js        # Tag management
    │   ├── orderController.js      # Order processing
    │   └── cartController.js       # Cart operations
    ├── middlewares/
    │   ├── authMiddleware.js       # JWT verification
    │   ├── adminMiddleware.js      # Admin role check
    │   └── superAdminMiddleware.js # Super admin check
    ├── models/
    │   ├── userModel.js
    │   ├── restaurantModel.js
    │   ├── foodModel.js
    │   ├── categoryModel.js
    │   ├── TagModel.js
    │   ├── orderModel.js
    │   └── cartModel.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── userRoutes.js
    │   ├── restaurantRoutes.js
    │   ├── foodRoutes.js
    │   ├── categoryRoutes.js
    │   ├── tagRoutes.js
    │   ├── orderRoutes.js
    │   └── cartRoutes.js
    └── server.js                   # Entry point
```

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Clone the Repository
```bash
git clone https://github.com/rohitrath0d/foodie-restaurant-app-fullstack.git
cd foodie-restaurant-app-fullstack
```

### Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
touch .env
```

Add the following environment variables to `.env`:
```env
PORT=8080
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
SUPERADMIN_EMAIL=superadmin@example.com
SUPERADMIN_PASSWORD=YourSecurePassword123
```

```bash
# Start the server
npm start
```

### Frontend Setup
```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Access the Application
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8080

## 📡 API Reference

### Base URL
```
http://localhost:8080/api/v1
```

### Authentication Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | User login |
| POST | `/auth/register-admin` | Register admin (Super Admin only) |
| POST | `/auth/promote-to-admin` | Promote user to admin |

### User Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/user/getUser` | Get user profile |
| PUT | `/user/updateUser` | Update user profile |
| POST | `/user/updatePassword` | Update password |
| POST | `/user/resetPassword` | Reset password |
| DELETE | `/user/deleteUser/:id` | Delete user account |

### Restaurant Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/restaurant/createRestaurant` | Create restaurant |
| GET | `/restaurant/getAllRestaurants` | Get all restaurants |
| GET | `/restaurant/getRestaurantById/:id` | Get restaurant by ID |
| GET | `/restaurant/getFeaturedRestaurants` | Get featured restaurants |
| GET | `/restaurant/getNearbyRestaurants` | Get nearby restaurants |
| PUT | `/restaurant/updateRestaurantById/:id` | Update restaurant |
| DELETE | `/restaurant/deleteRestaurantById/:id` | Delete restaurant |

### Food Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/food/createFood` | Create food item |
| GET | `/food/getAllFood` | Get all food items |
| GET | `/food/getFoodById/:id` | Get food by ID |
| GET | `/food/getFoodByRestaurantId/:id` | Get food by restaurant |
| GET | `/food/getPopularFoods` | Get popular foods |
| GET | `/food/getFeaturedFoods` | Get featured foods |
| PUT | `/food/updateFood/:id` | Update food item |
| DELETE | `/food/deleteFood/:id` | Delete food item |

### Category Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/category/createCategory` | Create category |
| GET | `/category/getAllCategory` | Get all categories |
| PUT | `/category/updateCategory/:id` | Update category |
| DELETE | `/category/deleteCategory/:id` | Delete category |

### Tag Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/tags/createTag` | Create tag |
| GET | `/tags/getAllTags` | Get all tags |
| GET | `/tags/getTagById/:id` | Get tag by ID |
| PUT | `/tags/updateTag/:id` | Update tag |
| DELETE | `/tags/deleteTag/:id` | Delete tag |

### Cart Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/cart/addToCart` | Add item to cart |
| GET | `/cart/getCartByUser` | Get user's cart |
| PUT | `/cart/updateCartItem` | Update cart item |
| DELETE | `/cart/removeCartItem/:foodId` | Remove cart item |
| DELETE | `/cart/clearCart` | Clear entire cart |

### Order Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/orders/placeOrder` | Place new order |
| POST | `/orders/orderStatus/:id` | Update order status |
| GET | `/orders/getAllOrders` | Get all orders (Admin) |
| GET | `/orders/user-orders` | Get user's orders |
| GET | `/orders/getOrderById/:id` | Get order by ID |

## 🔑 User Roles

| Role | Description |
|------|-------------|
| **Client** | Regular users who can browse, order food, and manage their profile |
| **Admin** | Can manage restaurants, food items, categories, tags, and orders |
| **Super Admin** | Full system access including admin management and user promotions |
| **Vendor** | Restaurant owners (future feature) |
| **Driver** | Delivery personnel (future feature) |

## 🎨 UI Components

The application uses a custom UI component library built with:
- **Radix UI Primitives** - For accessible, unstyled components
- **Tailwind CSS** - For styling
- **Custom Color Palette**:
  - Coral (`#FF6B6B`) - Primary accent
  - Navy (`#1A1E3F`) - Dark theme
  - Mint (`#F1FAF6`) - Light backgrounds
  - Mustard (`#FFC107`) - Secondary accent

## 📱 Pages

### Client Pages
- **Landing Page** - Hero section with app features and CTA
- **Home Page** - Browse restaurants and food items
- **Cart Page** - View and manage cart items
- **Orders Page** - View order history and status
- **Profile Page** - Manage user settings

### Admin Pages
- **Admin Dashboard** - Analytics and statistics
- **Restaurant Management** - CRUD operations for restaurants
- **Food Management** - Manage food items with categories and tags
- **Order Management** - Process and update orders

## 🔐 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcryptjs for secure password storage
- **Role-Based Access Control** - Middleware protection for routes
- **CORS Configuration** - Controlled cross-origin requests
- **Input Validation** - Server-side validation for all inputs

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Rohit Rathod**
- GitHub: [@rohitrath0d](https://github.com/rohitrath0d)

---
