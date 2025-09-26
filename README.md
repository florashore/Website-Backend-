# Website Server with MongoDB Authentication

A NestJS application with user registration and login functionality using MongoDB as the database.

## 🚀 Features

- **User Registration** - Create new user accounts
- **User Login** - Authenticate existing users
- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Secure password storage with bcryptjs
- **MongoDB Integration** - Persistent data storage
- **Input Validation** - Request validation with class-validator
- **Environment Configuration** - Configurable settings

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/website
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=1h
   PORT=8080
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system:
   ```bash
   # For local MongoDB
   mongod
   
   # Or use MongoDB Atlas connection string in .env
   ```

5. **Start the application**
   ```bash
   # Development mode
   npm run start:dev
   
   # Production mode
   npm run build
   npm run start:prod
   ```

## 🔌 API Endpoints

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "username": "testuser"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64a1b2c3d4e5f6789abcdef0",
    "email": "user@example.com",
    "username": "testuser"
  }
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64a1b2c3d4e5f6789abcdef0",
    "email": "user@example.com",
    "username": "testuser"
  }
}
```

### Other Endpoints

#### Root Endpoint
```http
GET /
```
**Response:** `"Hello World!"`

#### Test Endpoint
```http
GET /test
```
**Response:** `"Test endpoint is working!"`

## 🧪 Testing

Run the test suite:

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📁 Project Structure

```
src/
├── auth/                 # Authentication module
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   └── auth.dto.ts
├── user/                 # User module
│   ├── user.entity.ts
│   ├── user.service.ts
│   └── user.module.ts
├── config/               # Configuration
│   └── config.module.ts
├── app.controller.ts     # Main app controller
├── app.service.ts        # Main app service
├── app.module.ts         # Main app module
└── main.ts              # Application entry point
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/website` |
| `JWT_SECRET` | JWT signing secret | `your-secret-key` |
| `JWT_EXPIRES_IN` | JWT token expiration | `1h` |
| `PORT` | Server port | `8080` |

### MongoDB Schema

The User schema includes:
- `email` (String, required, unique)
- `password` (String, required, hashed)
- `username` (String, required)
- `createdAt` (Date, auto-generated)
- `updatedAt` (Date, auto-generated)

## 🚀 Deployment

### Docker Deployment

Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "start:prod"]
```

### Environment Setup

For production:
1. Use a strong JWT secret
2. Configure MongoDB Atlas or production MongoDB instance
3. Set up proper environment variables
4. Enable HTTPS
5. Configure CORS if needed

## 📝 Development

### Adding New Features

1. Create new modules using NestJS CLI:
   ```bash
   nest generate module feature-name
   nest generate controller feature-name
   nest generate service feature-name
   ```

2. Follow the existing patterns for:
   - DTOs for request/response validation
   - Services for business logic
   - Controllers for HTTP handling
   - Modules for dependency injection

### Code Style

- Use TypeScript strict mode
- Follow NestJS conventions
- Use class-validator for DTOs
- Write tests for new features
- Use ESLint and Prettier for code formatting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the UNLICENSED license.