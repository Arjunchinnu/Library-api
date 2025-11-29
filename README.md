Bookstore API
A complete Node.js/Express REST API for book management with JWT authentication, role-based access (admin/customer), input validation, and in-memory database. Full MVC architecture with production-ready middleware.

🚀 Features
User Authentication: JWT tokens with bcrypt password hashing (10 rounds)

Role-Based Access: Admin-only book CRUD, customer read access

Book Management: Full CRUD operations (Create/Read/Update/Delete)

Input Validation: express-validator for user registration/login

Error Handling: Global 404 + error middleware with status codes

Request Logging: Method/URL logging for debugging

In-Memory Database: Users & books persistence across requests

📁 Project Structure

product-api/
├── package.json         
├── .gitignore              
├── README.md              
│
└── src/
    ├── server.js           
    ├── app.js               
    │
    ├── database/
    │   └── memory.js         
    │
    ├── models/              
    │
    ├── middleware/
    │   ├── logger.js        
    │   ├── auth.js          
    │   ├── role.js
    │   ├── 404handler.js    
    │   └── errorHandler.js  
    │
    ├── routes/
    │   ├── userRoutes.js   
    │   └── productRoutes.js 
    │
    └── controllers/
        ├── userController.js
        └── productController.js 

Node.js v22+ | Express.js | JWT | bcryptjs | express-validator

5000

🔑 API Endpoints

User Authentication

| Method | Endpoint  | Auth | Role  | Description                                 |
| ------ | --------- | ---- | ----- | ------------------------------------------- |
| POST   | /register | -    | -     | Register user (name, email, password, role) |
| POST   | /login    | -    | -     | Login & receive JWT token                   |
| GET    | /allusers | ✅    | admin | List all users (admin only)                |

Book Management

| Method | Endpoint | Auth | Role  | Description    |
| ------ | -------- | ---- | ----- | ---------------|
| POST   | /        | ✅    | admin | Create book   |
| GET    | /        | ✅    | -     | Get all books |
| PUT    | /:id     | ✅    | admin | Update book   |
| DELETE | /:id     | ✅    | admin | Delete book   |


# 1. Register Admin
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@bookstore.com",
    "password": "admin123",
    "role": "admin"
  }'

# 2. Login (copy token from response)
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@bookstore.com",
    "password": "admin123"
  }'

# 3. Create Book (Admin only - use Bearer token)
curl -X POST http://localhost:5000/ \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Harry Parker",
    "price": 512,
    "category": "story",
    "author": "Harry Parker"
  }'

# 4. Get All Books (Any authenticated user)
curl -X GET http://localhost:8080/ \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"


🛡️ Security Features
Password Hashing: bcrypt (10 salt rounds)

JWT Tokens: 1-hour expiry, user ID + role payload

Role Checks: Admin middleware for sensitive operations

Input Validation: Email format, password length, required fields

Error Protection: No stack traces exposed



🤝 Contributing
Fork the repository

Create feature branch: git checkout -b feature/add-search

Commit changes: git commit -m 'Add book search endpoint'

Push: git push origin feature/add-search

Open Pull Request

📄 License
MIT License - Free to use, modify, and distribute.