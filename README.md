# Library_Api

# Library Management System API

## Overview
This project is a **Node.js** and **PostgreSQL**-based RESTful API for managing a library system. It includes features for managing users, books, and borrowing/returning operations. Authentication is handled using **JWT**, and role-based access control ensures secure and appropriate access to different features.

---

## Features
### **Authentication**
- **Register**: Create a new user with roles as ID 's (Admin as 1, Librarian as 2, Member as 3).
- **Login**: Authenticate and generate a JWT token.

### **User Management (Admin Only)**
- Create, update, delete users.
- Retrieve all users.

### **Book Management**
- **Admin**: Add, update, and delete books.
- **Librarian/Member**: View all books.

### **Borrowing and Returning**
- **Members**: Borrow and return books.
- **Librarians**: Manage borrowing records.

---

## Tech Stack
- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **ORM**: Raw SQL Queries (via `pg` library)
- **Authentication**: JWT
- **Validation**: Joi

---

## Installation

### Prerequisites
1. Node.js (v16 or higher)
2. PostgreSQL

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the PostgreSQL database:
   - Create a database named `librarian`.
   - Run the SQL schema to create the required tables:
     ```sql
     CREATE TABLE users (
         id SERIAL PRIMARY KEY,
         email VARCHAR(255) UNIQUE NOT NULL,
         password VARCHAR(255) NOT NULL,
         role_id INT NOT NULL,
         created_at TIMESTAMP DEFAULT NOW(),
         updated_at TIMESTAMP DEFAULT NOW()
     );

     CREATE TABLE books (
         id SERIAL PRIMARY KEY,
         title VARCHAR(255) NOT NULL,
         author VARCHAR(255) NOT NULL,
         isbn VARCHAR(13) UNIQUE NOT NULL,
         total_copies INT NOT NULL,
         available_copies INT NOT NULL,
         created_at TIMESTAMP DEFAULT NOW(),
         updated_at TIMESTAMP DEFAULT NOW()
     );

     CREATE TABLE borrowed_books (
         id SERIAL PRIMARY KEY,
         user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
         book_id INT NOT NULL REFERENCES books(id) ON DELETE CASCADE,
         borrowed_date TIMESTAMP DEFAULT NOW(),
         return_date TIMESTAMP,
         status VARCHAR(50) DEFAULT 'borrowed',
         created_at TIMESTAMP DEFAULT NOW(),
         updated_at TIMESTAMP DEFAULT NOW()
     );
     ```

4. Create a `.env` file in the root directory:
   ```env
   PORT=8080
   DATABASE_URL=postgres://username:password@localhost:5432/librarian
   JWT_SECRET=your_jwt_secret
   ```

5. Start the server:
   ```bash
   npm start
   ```

The server will run at [http://localhost:8080](http://localhost:8080).

---

## API Endpoints

### **Authentication**
| Method | Endpoint          | Description            |
|--------|-------------------|------------------------|
| POST   | `/api/auth/register` | Register a new user    |
| POST   | `/api/auth/login`    | Login and get a token |

### **User Management** (Admin Only)
| Method | Endpoint           | Description            |
|--------|--------------------|------------------------|
| POST   | `/api/users`       | Create a new user      |
| PUT    | `/api/users/:id`   | Update a user          |
| DELETE | `/api/users/:id`   | Delete a user          |
| GET    | `/api/users`       | Get all users          |

### **Book Management**
| Method | Endpoint           | Description            |
|--------|--------------------|------------------------|
| POST   | `/api/books`       | Add a new book         |
| PUT    | `/api/books/:id`   | Update a book          |
| DELETE | `/api/books/:id`   | Delete a book          |
| GET    | `/api/books`       | Get all books          |

### **Borrowing Operations**
| Method | Endpoint           | Description                     |
|--------|--------------------|---------------------------------|
| POST   | `/api/borrow/borrow` | Borrow a book (Member only)     |
| POST   | `/api/borrow/return` | Return a book (Member only)     |
| GET    | `/api/borrow/:userId` | Get borrowing records by user   |

---

## Role-Based Access Control (RBAC)
| Role       | Permissions                                    |
|------------|------------------------------------------------|
| **Admin**  | Manage users and books, view borrowing records |
| **Librarian** | View books, manage borrowing records          |
| **Member** | View books, borrow and return books            |

---

## Postman Collection
A Postman collection for testing all API endpoints is included in the repository. Import the `postman_collection.json` file into Postman to get started.




