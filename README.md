# Blog Application

A full-stack blog application built with React and Node.js, featuring **JWT (JSON Web Token) authentication** and a complete **CRUD API** for managing blog posts.

## 🚀 Features

- **JWT Authentication**: Secure user authentication and authorization using JSON Web Tokens
- **User Registration & Login**: Complete authentication system with password hashing
- **Blog CRUD Operations**: Create, Read, Update, and Delete blog posts
- **Protected Routes**: All blog operations require valid JWT tokens
- **Modern UI**: Built with React and Tailwind CSS

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations

## 📁 Project Structure

```
Blog app/
├── Backend/
│   ├── controller/
│   │   ├── authController.js      # JWT authentication logic
│   │   └── blog-controller.js     # Blog CRUD operations
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT verification middleware
│   ├── model/
│   │   ├── Auth.js                # User model
│   │   └── Blog.js                # Blog model
│   ├── routes/
│   │   ├── authRoutes.js          # Authentication routes
│   │   └── blog-route.js          # Blog routes (protected)
│   ├── db/
│   │   └── index.js               # MongoDB connection
│   └── index.js                   # Express server
└── Frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── context/
    │   └── utils/
    └── ...
```

## 🔐 JWT Authentication

This application implements **JWT (JSON Web Token)** for secure authentication and authorization.

### How JWT Works in This App

1. **User Registration/Login**: When a user registers or logs in, the server generates a JWT token containing the user's ID
2. **Token Generation**: Tokens are signed with a secret key and expire after 1 hour
3. **Token Storage**: The token is sent to the client and stored (typically in localStorage)
4. **Protected Routes**: All blog CRUD operations require a valid JWT token in the Authorization header
5. **Token Verification**: The `authMiddleware` verifies the token on each protected request

### JWT Implementation Details

#### Token Generation (authController.js)
```javascript
// JWT token is generated during registration and login
const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);
```

#### Token Verification (authMiddleware.js)
```javascript
// Middleware verifies JWT token on protected routes
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = decoded; // User info attached to request
```

#### Protected Routes (blog-route.js)
All blog routes are protected with the JWT middleware:
- `GET /api/blogs/getBlogs` - Requires JWT
- `POST /api/blogs/add` - Requires JWT
- `PUT /api/blogs/update/:id` - Requires JWT
- `DELETE /api/blogs/delete/:id` - Requires JWT

## 📡 API Endpoints

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Blog CRUD API Endpoints

All blog endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

#### 1. Get All Blogs (READ)
```
GET /api/blogs/getBlogs
Headers:
  Authorization: Bearer <token>

Response:
{
  "blogList": [
    {
      "_id": "blog_id",
      "title": "Blog Title",
      "description": "Blog description",
      "Date": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### 2. Create Blog (CREATE)
```
POST /api/blogs/add
Headers:
  Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "title": "My New Blog Post",
  "description": "This is the content of my blog post"
}

Response:
{
  "message": "Blog added successfully"
}
```

#### 3. Update Blog (UPDATE)
```
PUT /api/blogs/update/:id
Headers:
  Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "title": "Updated Title",
  "description": "Updated description"
}

Response:
{
  "updatedBlog": {
    "_id": "blog_id",
    "title": "Updated Title",
    "description": "Updated description",
    "Date": "2024-01-01T00:00:00.000Z"
  }
}
```

#### 4. Delete Blog (DELETE)
```
DELETE /api/blogs/delete/:id
Headers:
  Authorization: Bearer <token>

Response:
{
  "message": "Blog deleted successfully"
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd "Blog app"
```

2. **Backend Setup**
```bash
cd Backend
npm install
```

3. **Create `.env` file in Backend directory**
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_jwt_key_here
```

4. **Frontend Setup**
```bash
cd ../Frontend
npm install
```

### Running the Application

1. **Start the Backend Server**
```bash
cd Backend
npm start
# Server runs on http://localhost:3000
```

2. **Start the Frontend Development Server**
```bash
cd Frontend
npm run dev
# Frontend runs on http://localhost:5173 (or another port)
```

## 🔒 Security Features

- **Password Hashing**: Passwords are hashed using bcryptjs before storage
- **JWT Token Expiration**: Tokens expire after 1 hour for security
- **Protected Routes**: All blog operations require valid JWT authentication
- **CORS Enabled**: Cross-origin requests are handled securely
- **Environment Variables**: Sensitive data stored in `.env` file

## 📝 Environment Variables

Create a `.env` file in the `Backend` directory with the following variables:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/blogapp
# or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/blogapp
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
```

## 🎯 Key Features Highlighted

### ✨ JWT Authentication
- Secure token-based authentication
- Token generation on login/register
- Token verification middleware
- Protected API routes

### ✨ Blog CRUD API
- **CREATE**: Add new blog posts
- **READ**: Fetch all blog posts
- **UPDATE**: Modify existing blog posts
- **DELETE**: Remove blog posts

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Built with ❤️ using JWT authentication and RESTful API principles.

---

**Note**: Make sure to keep your `JWT_SECRET` secure and never commit it to version control!

