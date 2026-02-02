# Bookstore API

A robust RESTful API for managing a bookstore inventory, built with Node.js, Express, TypeScript, and Mongoose.
Implements a clean OOP architecture (Controller -> Service -> Repository).

## Features
- **CRUD Operations**: Create, Read (List/Detail), Update, Delete Books.
- **Advanced Search**: Search by title, author, or genre.
- **Filtering & Sorting**: Filter by genre, price range. Sort by fields (e.g. `price:asc`).
- **Pagination**: Efficient data handling with `page` and `limit`.
- **Authentication**: User registration and login with JWT and Bcrypt.
- **Security**: Request validation (Joi) and protected Routes.

## Tech Stack
- Node.js & Express
- TypeScript
- MongoDB & Mongoose
- Joi (Validation)
- JWT (Authentication)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure Environment:
   Update `.env` with your MongoDB URI:
   ```env
   MONGODB_URI=mongodb://localhost:27017/bookstore_workshop
   JWT_SECRET=your_jwt_secret
   ```

3. Run Server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Auth
- `POST /users/register`: Register a new user.
- `POST /users/login`: Login and get a token.

### Books
- `GET /books`: Get all books (supports `search`, `genre`, `minPrice`, `maxPrice`, `sort`, `page`, `limit`).
- `GET /books/:id`: Get book details.
- `POST /books`: Create a book (Protected).
- `PUT /books/:id`: Update a book (Protected).
- `DELETE /books/:id`: Delete a book (Protected).
