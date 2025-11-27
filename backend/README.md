# Notes App - Backend

A robust RESTful API backend for the Notes App, built with Python, featuring JWT authentication and complete CRUD operations for notes management.

## 🚀 Tech Stack

- **Framework**: FastAPI 
- **Database**: MongoDB (NoSQL)
- **Authentication**: JWT (JSON Web Tokens)
- **ORM/ODM**: Motor (async)
- **API Documentation**: Swagger

## 📋 Prerequisites

- Python 3.9 or higher
- MongoDB Atlas account
- pip package manager
- Virtual environment (venv)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd backend
```

### 2. Create Virtual Environment

```bash
python -m venv venv

# Activate virtual environment

# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Environment Configuration

Create a `.env` file in the root directory:

```env
# MongoDB Configuration
MONGO_USER=your_mongo_username
MONGO_PASSWORD=your_mongo_password
MONGO_DB=notesdb
MONGO_CLUSTER=your_cluster.mongodb.net

# JWT Configuration
JWT_SECRET=your-jwt-secret-key-here
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# CORS
CORS_ORIGINS=http://localhost:3000

# Server
PORT=8000
```

### 5. Database Setup

#### MongoDB Atlas Setup:
```bash
# MongoDB Atlas (Cloud)
# 1. Create account at https://www.mongodb.com/cloud/atlas
# 2. Create a new cluster
# 3. Get your connection string
# 4. Add your credentials to .env file
# 5. Whitelist your IP address in MongoDB Atlas

# No migrations needed - MongoDB creates collections automatically
# Collections will be created on first document insert
```


### 6. Run Development Server

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

```

## 📁 Project Structure

```
├── backend/                          # Backend API
│   ├── app/
│   │   ├── __pycache__/
│   │   ├── core/                     # Core configurations
│   │   ├── crud/                     # Database operations
│   │   ├── db/                       # Database setup
│   │   ├── dependencies/             # Dependency injection
│   │   ├── models/                   # MongoDB models
│   │   ├── routers/                  # API endpoints
│   │   ├── schemas/                  # Request/response schemas
│   │   ├── utils/                    # Utility functions
│   │   └── __init__.py
│   ├── venv/                         # Virtual environment
│   ├── .env                          # Environment variables
│   ├── main.py                       # Application entry point
│   ├── requirements.txt              # Python dependencies
│   └── README.md                    
```

## 🗄️ Database Models

### USER Model

| Field | Type | Description |
|-------|------|-------------|
| `user_id` | UUID | Primary key, auto-generated |
| `user_name` | VARCHAR(255) | User's display name |
| `user_email` | VARCHAR(255) | User's email (unique) |
| `password` | VARCHAR(255) | Hashed password |
| `last_update` | DATETIME | Last modification timestamp |
| `created_on` | DATETIME | Account creation timestamp |

**Constraints:**
- `user_email` must be unique
- `user_email` must be valid email format
- `password` is hashed using bcrypt

### NOTES Model

| Field | Type | Description |
|-------|------|-------------|
| `note_id` | UUID | Primary key, auto-generated |
| `user_id` | UUID | Foreign key to USER table |
| `note_title` | VARCHAR(500) | Note title |
| `note_content` | TEXT | Note content (supports rich text) |
| `last_update` | DATETIME | Last modification timestamp |
| `created_on` | DATETIME | Note creation timestamp |

**Constraints:**
- `user_id` references USER(user_id) with CASCADE delete
- `note_title` is required

## 🔌 API Endpoints

### Authentication Endpoints

#### Register User
```http
POST /api/auth/signup
Content-Type: application/json

{
  "user_name": "John Doe",
  "user_email": "john@example.com",
  "password": "SecurePass123!"
}

Response: 201 Created
{
  "user_id": "uuid-here",
  "user_name": "John Doe",
  "user_email": "john@example.com",
  "created_on": "2025-01-27T10:30:00Z"
}
```

#### Login User
```http
POST /api/auth/signin
Content-Type: application/json

{
  "user_email": "john@example.com",
  "password": "SecurePass123!"
}

Response: 200 OK
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "user_id": "uuid-here",
    "user_name": "John Doe",
    "user_email": "john@example.com"
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>

Response: 200 OK
{
  "user_id": "uuid-here",
  "user_name": "John Doe",
  "user_email": "john@example.com"
}
```

### Notes Endpoints

#### Get All Notes (User's Notes)
```http
GET /api/notes
Authorization: Bearer <token>

Response: 200 OK
{
  "notes": [
    {
      "note_id": "uuid-here",
      "note_title": "My First Note",
      "note_content": "This is the content",
      "created_on": "2025-01-27T10:30:00Z",
      "last_update": "2025-01-27T10:30:00Z"
    }
  ],
  "total": 1
}
```

#### Get Single Note
```http
GET /api/notes/{note_id}
Authorization: Bearer <token>

Response: 200 OK
{
  "note_id": "uuid-here",
  "note_title": "My First Note",
  "note_content": "This is the content",
  "created_on": "2025-01-27T10:30:00Z",
  "last_update": "2025-01-27T10:30:00Z"
}
```

#### Create Note
```http
POST /api/notes
Authorization: Bearer <token>
Content-Type: application/json

{
  "note_title": "New Note",
  "note_content": "Note content here"
}

Response: 201 Created
{
  "note_id": "uuid-here",
  "note_title": "New Note",
  "note_content": "Note content here",
  "created_on": "2025-01-27T10:30:00Z",
  "last_update": "2025-01-27T10:30:00Z"
}
```

#### Update Note
```http
PUT /api/notes/{note_id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "note_title": "Updated Title",
  "note_content": "Updated content"
}

Response: 200 OK
{
  "note_id": "uuid-here",
  "note_title": "Updated Title",
  "note_content": "Updated content",
  "last_update": "2025-01-27T11:00:00Z"
}
```

#### Delete Note
```http
DELETE /api/notes/{note_id}
Authorization: Bearer <token>

Response: 204 No Content
```

## 🔒 Authentication & Security

### JWT Authentication Flow

1. User registers or logs in
2. Server validates credentials
3. Server generates JWT token with user_id in payload
4. Token returned to client
5. Client includes token in Authorization header for protected routes
6. Server validates token and extracts user_id
7. User can only access their own notes

### Security Measures

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure token generation with expiration
- **CORS**: Configured to allow only frontend origin
- **Input Validation**: All inputs validated using schemas
- **SQL Injection Prevention**: ORM/parameterized queries
- **XSS Protection**: Input sanitization
- **Rate Limiting**: Optional (can be added)


### Authentication: JWT vs Session

**Why JWT?**
- Stateless authentication
- Scalable across multiple servers
- Mobile-friendly
- No server-side session storage needed


## ⚡ Performance Optimizations

### Database Optimizations
1. **Indexing**: 
   - Compound index on `user_id` in notes collection
   - Unique index on `user_email` in users collection
   - Index on `created_on` for sorting
2. **Query Optimization**: 
   - Project only needed fields
   - Use aggregation pipeline for complex queries
3. **Connection Pooling**: 
   - MongoClient connection pooling
   - Reuse connections across requests
4. **Document Design**: 
   - Embedded vs referenced documents optimization
   - Denormalization where appropriate

### API Optimizations
1. **Pagination**: Limit results per page (default: 20)
2. **Async Operations**: Non-blocking I/O operations
3. **Caching**: Redis caching for frequently accessed data (optional)
4. **Response Compression**: gzip compression enabled

### Code Optimizations
1. **Dependency Injection**: Efficient resource management
2. **Exception Handling**: Centralized error handling
3. **Code Reusability**: DRY principles in CRUD operations
4. **Type Hints**: Better IDE support and fewer runtime errors

## 📊 Performance Testing

### Testing Tools Used
- Apache JMeter / Locust / pytest-benchmark
- Database query profiling tools

### Test Scenarios
1. **Load Test**: 100 concurrent users
2. **Stress Test**: Gradually increasing load
3. **Endpoint Performance**: Response time for each endpoint

### Sample Results
```
Endpoint: GET /api/notes
- Average Response Time: 45ms
- 95th Percentile: 120ms
- Throughput: 500 req/s

Endpoint: POST /api/notes
- Average Response Time: 85ms
- 95th Percentile: 180ms
- Throughput: 300 req/s
```

**Note**: Submit actual performance testing reports as separate documents.

## 🐳 Docker Setup

### Dockerfile

```dockerfile
FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Expose port
EXPOSE 8000

# Run application
CMD ["python", "main.py"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  backend:
    build: .
    ports:
      - "8000:8000"
    env_file:
      - .env
    volumes:
      - .:/app
    depends_on:
      - mongo

  mongo:
    image: mongo:6.0
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=admin123
      - MONGO_INITDB_DATABASE=notesdb
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

**Note**: For production, use MongoDB Atlas instead of local container.

### Build and Run

```bash
# Build and start services
docker-compose up --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f backend
```



### Password Hashing
- Reference: [bcrypt Documentation](https://pypi.org/project/bcrypt/)
- Used for understanding secure password hashing

### JWT Implementation
- Reference: [PyJWT Documentation](https://pyjwt.readthedocs.io/)
- Pattern for token generation and validation

### Database ORM/ODM
- Reference: [PyMongo Documentation](https://pymongo.readthedocs.io/)
- Reference: [MongoDB Atlas Documentation](https://www.mongodb.com/docs/atlas/)
- Used for understanding MongoDB operations and best practices


## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGO_USER` | MongoDB Atlas username | Yes |
| `MONGO_PASSWORD` | MongoDB Atlas password | Yes |
| `MONGO_DB` | Database name (default: notesdb) | Yes |
| `MONGO_CLUSTER` | MongoDB Atlas cluster URL | Yes |
| `JWT_SECRET` | JWT signing key | Yes |
| `JWT_ALGORITHM` | JWT algorithm (default: HS256) | Yes |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiration (default: 1440 = 24hrs) | Yes |
| `CORS_ORIGINS` | Allowed CORS origins | Yes |
| `DEBUG` | Debug mode (True/False) | No |

