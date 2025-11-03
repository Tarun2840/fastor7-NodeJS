# CRM Backend API

A RESTful API backend for a Customer Relationship Management (CRM) system built with Node.js, Express.js, and SQLite/Sequelize.

## Features

- Employee authentication (Register/Login) with JWT
- Public enquiry form submission
- Lead management with claim functionality
- Distinguish between public and private enquiries
- Secure endpoints with JWT authentication

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite** - Database (with Sequelize ORM)
- **JWT** - Authentication
- **bcrypt** - Password hashing

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration (especially JWT_SECRET)

5. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The API will be running on `http://localhost:3000`

## API Endpoints

### Employee Routes

#### Register Employee
```
POST /api/employees/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Login Employee
```
POST /api/employees/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Get Employee Profile (Protected)
```
GET /api/employees/profile
Authorization: Bearer <token>
```

### Enquiry Routes

#### Submit Public Enquiry (No Auth Required)
```
POST /api/enquiries/public
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "courseInterest": "Web Development",
  "phone": "1234567890"
}
```

#### Get Unclaimed Leads (Protected)
```
GET /api/enquiries/public
Authorization: Bearer <token>
```

#### Get Claimed Leads (Protected)
```
GET /api/enquiries/private
Authorization: Bearer <token>
```

#### Claim a Lead (Protected)
```
PATCH /api/enquiries/:id/claim
Authorization: Bearer <token>
```

## Project Structure

```
backend/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   ├── employeeController.js # Employee business logic
│   └── enquiryController.js  # Enquiry business logic
├── middlewares/
│   └── auth.js              # JWT authentication middleware
├── models/
│   ├── index.js             # Model initialization
│   ├── employee.js          # Employee model
│   └── enquiry.js           # Enquiry model
├── routes/
│   ├── employeeRoutes.js    # Employee routes
│   └── enquiryRoutes.js     # Enquiry routes
├── .env.example             # Environment variables template
├── package.json
├── server.js                # Main entry point
└── README.md
```

## Database Schema

### Employee Table
- id (Primary Key)
- name
- email (Unique)
- password (Hashed)
- createdAt
- updatedAt

### Enquiry Table
- id (Primary Key)
- name
- email
- courseInterest
- phone
- claimed (Boolean)
- counselorId (Foreign Key)
- createdAt
- updatedAt

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected routes with middleware
- Input validation
- CORS enabled

## Testing with Frontend

The frontend React application is included in the project root. To test the complete system:

1. Start the backend server (this directory)
2. In a separate terminal, start the frontend from the project root:
```bash
npm run dev
```

3. Access the frontend at `http://localhost:8080`

## License

ISC
