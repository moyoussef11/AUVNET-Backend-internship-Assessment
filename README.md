# AUVNET Backend – Internship Assessment

**Role:** Backend Developer Intern (Remote, AUVNET, 2025)

This repository demonstrates a complete, production-ready e‑commerce backend service built with Node.js, Express, and MongoDB.

---

##  Features

- **Authentication & Authorization**
  - Secure authentication for both Admin and User roles (likely using JWT)
- **RESTful APIs**
  - Products: Create, Read, Update, Delete
  - Users: Profile management, listing
  - Categories: Multi-level (3-deep) nested hierarchy
  - Wishlists: User-specific wishlists management
- **Enhanced Functionality**
  - Pagination for efficient data retrieval
  - Well-structured ERD to model database relationships

---

##  Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose for modeling)  
- **Authentication:** JWT (presumed)  
- **Tools:** Postman or similar for API testing, possibly ER diagramming tool (e.g., draw.io, Lucidchart)

---

##  Project Structure (Recommended)

```bash
src/
├── controllers/        # Business logic for routes (products, users, categories, wishlists)
├── models/             # Mongoose schemas: Product, User, Category, Wishlist
├── routes/             # Route definitions & middleware
├── middlewares/        # Authentication, authorization, error handling
├── utils/              # Helpers for pagination, validation, etc.
└── server.js           # App entry point

##  Installation & Running


git clone https://github.com/moyoussef11/AUVNET-Backend-internship-Assessment.git
cd AUVNET-Backend-internship-Assessment
npm install
npm run dev  # or "npm start"
