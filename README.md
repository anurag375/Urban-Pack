# Urban-Pack

Urban-Pack is a Node.js-based e-commerce web application built using Express.js, MongoDB, Mongoose, and EJS. It provides basic user authentication, product management, product browsing, and shopping cart functionality.

The application follows a server-side rendering approach using EJS templates, with MongoDB handling persistent data storage.

## Features

### User Authentication
- User registration with password hashing using bcrypt.
- User login with email and password verification.
- JWT-based authentication.
- Secure token storage using HTTP-only cookies.
- Authentication middleware to protect user-specific routes.
- User logout functionality.
- Flash messages for login errors and application feedback.

### Product Management
- Create and store products in MongoDB.
- Upload product images using Multer.
- Store uploaded images as binary data using MongoDB Buffer fields.
- Configure product appearance through background, panel, and text colors.
- Display available products dynamically from the database.

### Shopping Experience
- Browse available products in the shop.
- Add products to the shopping cart.
- Store product references in the user's cart.
- Populate product details using Mongoose references.
- Display cart items with product images and pricing information.
- Calculate the total bill, including discounts and platform fees.

### Admin / Owner Functionality
- Owner creation endpoint restricted to the development environment.
- Admin product creation interface.
- Product creation with image uploads.
- Flash notifications after successful product creation.

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend web framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB object modeling |
| EJS | Server-side rendering |
| Tailwind CSS | UI styling |
| JavaScript | Application logic |
| bcrypt | Password hashing |
| JSON Web Token (JWT) | Authentication |
| Cookie Parser | Cookie handling |
| Express Session | Session management |
| Connect Flash | Flash messages |
| Multer | File upload handling |
| dotenv | Environment variable management |
| Config | Environment-based configuration |
| Debug | Application debugging |

## Project Structure

```text
Urban-Pack/
│
├── config/
│   ├── development.json
│   ├── keys.js
│   ├── mongoose-connection.js
│   └── multer-config.js
│
├── controllers/
│   └── authController.js
│
├── middlewares/
│   └── isLoggedIn.js
│
├── models/
│   ├── owner-model.js
│   ├── product-model.js
│   └── user-model.js
│
├── public/
│   └── images/
│
├── routes/
│   ├── index.js
│   ├── ownerRouter.js
│   ├── productRouter.js
│   └── userRouter.js
│
├── utils/
│   └── generateToken.js
│
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── admin.ejs
│   ├── cart.ejs
│   ├── create-products.ejs
│   ├── index.ejs
│   ├── owner-login.ejs
│   └── shop.ejs
│
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md
```

## Getting Started

Follow these instructions to run the project locally.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- npm (comes with Node.js)

### 1. Clone the Repository

```bash
git clone <repository-url>
```

Navigate to the project directory:

```bash
cd Urban-Pack
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory.

Add the following variables:

```env
JWT_KEY=your_jwt_secret
Express_SESSION_SECRET=your_session_secret
NODE_ENV=development
```

Replace the placeholder values with your own secret keys.

**Important:** Never commit your `.env` file or expose authentication secrets in a public repository.

### 4. Configure MongoDB

The application uses the `config/development.json` file for MongoDB configuration.

The default configuration is:

```json
{
    "MONGODB_URI": "mongodb://127.0.0.1:27017"
}
```

The application connects to the `Urban-Pack` database.

Make sure your local MongoDB server is running before starting the application.

### 5. Start the Application

Run the following command:

```bash
node app.js
```

Alternatively, if Nodemon is installed:

```bash
npx nodemon app.js
```

The application will be available at:

```text
http://localhost:3000
```

## Application Routes

The following routes are currently implemented:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Display registration and login page |
| GET | `/shop` | Display available products (authentication required) |
| GET | `/cart` | Display the logged-in user's cart (authentication required) |
| GET | `/add-to-cart/:id` | Add a product to the user's cart (authentication required) |
| POST | `/users/register` | Register a new user |
| POST | `/users/login` | Authenticate an existing user |
| GET | `/users/logout` | Log out the current user |
| GET | `/owner` | Owner route |
| GET | `/owner/admin` | Display the product creation interface |
| POST | `/owner/create` | Create an owner (development environment only) |
| POST | `/products/create` | Create a product with an image upload |

## Authentication Flow

Urban-Pack uses JSON Web Tokens (JWT) for user authentication.

The authentication process works as follows:

1. A user submits registration or login credentials.
2. During registration, the password is hashed using bcrypt before being stored in MongoDB.
3. During login, bcrypt compares the submitted password with the stored password hash.
4. After successful authentication, a JWT is generated containing the user's email and ID.
5. The token is stored in an HTTP-only browser cookie.
6. Protected routes use the `isLoggedIn` middleware to verify the JWT.
7. After successful verification, the authenticated user is attached to `req.user`.

## Database Models

The application currently uses three Mongoose models:

**1. User Model**
- Full name
- Email
- Password
- Cart (references to products)
- Orders
- Contact information
- Profile picture

**2. Product Model**
- Product image (Buffer)
- Product name
- Price
- Discount
- Background color
- Panel color
- Text color

**3. Owner Model**
- Full name
- Email
- Password
- Products
- Profile picture
- GSTIN

## File Uploads

Product images are handled using Multer with memory storage.

The uploaded image is received as a buffer and stored in MongoDB through the Product model.

Images are subsequently converted into Base64 data URLs when rendering product listings and cart items using EJS.

## Current Project Scope

Urban-Pack currently implements the foundational features of an e-commerce application, including authentication, product creation, product browsing, and basic cart functionality.

The following features are not yet fully implemented:

- Complete order placement and checkout workflow.
- Payment gateway integration.
- Cart quantity management and product removal.
- Product search, filtering, and sorting.
- Comprehensive admin authentication and authorization.
- Production-ready error handling and input validation.
- Persistent production session storage.

These features can be introduced as the application evolves.

## License

This project is currently licensed under the ISC License, as specified in `package.json`.