# FastAPI User Management Template

This is a FastAPI-based user management template built with Python, SQLModel, and PostgreSQL. It provides a robust
foundation for user registration, retrieval, profile management, and role-based authorization, using synchronous
database operations with the `psycopg2` driver. The template includes timezone-aware timestamp tracking, CORS
middleware, custom exception handling, and JWT-based authorization using `PyJWT`.

## Features

- **User Registration**: Create users with username, email, name, phone number, role, and password (hashed).
- **User Retrieval**: Fetch users by username or ID.
- **User Profile Management**: Update user profiles and delete accounts.
- **Role-Based Authorization**: Restrict endpoints to admin users using JWT tokens.
- **Timezone-Aware Timestamps**: Track creation, update, and soft deletion times using `TIMESTAMP WITH TIME ZONE`.
- **Role-Based Access**: Supports `admin` and `user` roles via a PostgreSQL enum.
- **Synchronous Database Operations**: Uses SQLModel with `psycopg2` for reliable database interactions.
- **CORS Middleware**: Configures Cross-Origin Resource Sharing for flexible client access.
- **Custom Exception Handling**: Handles HTTP and database errors gracefully.
- **Schema Creation**: Automatically creates database tables on startup.
- **Application Lifecycle Management**: Initializes and cleans up resources using a `lifespan` function.
- **JWT Authentication**: Uses `PyJWT` for token generation and verification.
- **Generic CRUD Operations**: Reusable SQLModel CRUD functions for database operations.

## Project Structure

```
fastapi-user-template/
│
├── app/
│   ├── core/
│   │   ├── config.py         # Configuration settings (e.g., database URL, CORS origins, JWT key)
│   │   ├── dependencies.py   # FastAPI dependencies (e.g., admin_user, current_user)
│   │   ├── exceptions.py     # Custom exception handlers
│   │   ├── lifespan.py       # Application lifecycle utilities (e.g., password hashing)
│   │   ├── middleware.py     # Middleware configuration (e.g., CORS)
│   │   ├── models.py         # Shared models (e.g., RoleType, ErrorResponse, PhoneNumber)
│   │   ├── security.py       # Authorization logic (e.g., admin-only checks)
│   │   └── services.py       # Generic SQLModel CRUD operations
│   ├── modules/
│   │   ├── __init__.py       # Imports models for database creation
│   │   ├── api_routes.py     # Aggregates API routers under /v1/api
│   │   ├── auth/
│   │   │   ├── models.py     # TokenPayload for JWT
│   │   │   ├── schemas.py    # Pydantic schemas for user creation
│   │   │   ├── security.py   # JWT token verification
│   │   │   ├── services.py   # Business logic for user operations
│   │   │   ├── routes.py     # FastAPI routes for auth endpoints
│   │   │   ├── utils.py      # Auth-specific utilities (e.g., password hashing)
│   │   │   └── mixins.py     # TimeStampMixin for models
│   │   └── users/
│   │       ├── models.py     # User model and schemas
│   │       ├── routes.py     # FastAPI routes for user endpoints
│   │       └── services.py   # Business logic for user operations
│   ├── database.py           # Database configuration and session management
│   └── main.py               # FastAPI application entry point with lifespan and middleware
│
├── pyproject.toml            # Project dependencies and metadata
├── .env.example              # Example environment variables
└── README.md                 # Project documentation
```

## Prerequisites

- Python 3.12
- PostgreSQL 13+
- A PostgreSQL database (e.g., `user_db`)
- `uv` for project management

## Setup

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd fastapi-user-template
   ```

2. **Initialize the Project with** `uv`:

   If you haven't installed `uv`, follow the installation instructions
   at https://docs.astral.sh/uv/getting-started/installation/.

   Create a virtual environment and sync dependencies defined in `pyproject.toml`:

   ```bash
   uv venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   uv sync
   ```

3. **Configure the Database and CORS**:

    - Create a PostgreSQL database:

      ```sql
      CREATE DATABASE user_db;
      ```

    - Copy `.env.example` to `.env` and update the values:

      ```bash
      cp .env.example .env
      ```

      Edit `.env` to set the database URL, environment, CORS origins, and JWT secret key:

      ```
      DATABASE_URL=postgresql+psycopg2://user:password@localhost:5432/user_db
      ENVIRONMENT=development
      ALLOW_ORIGINS=https://example.com
      JWT_SECRET_KEY=your-secret-key
      ```

      The `.env.example` file provides a template for the required environment variables. Update the values in `.env` to
      match your setup (e.g., database credentials, allowed origins for production).

4. **Run the Application**:

   Start the FastAPI server:

   ```bash
   uv run uvicorn app.main:app --reload
   ```

   The application will automatically create database tables on startup via the `lifespan` function and configure CORS
   middleware. The API will be available at `http://localhost:8000`.

## Database Schema

The `user` table is created with the following schema:

| Column          | Type                     | Description                   |
|-----------------|--------------------------|-------------------------------|
| id              | UUID                     | Primary key                   |
| username        | TEXT                     | Indexed, unique username      |
| email           | TEXT                     | Indexed, unique email         |
| first_name      | TEXT                     | User's first name             |
| last_name       | TEXT                     | User's last name              |
| phone_number    | TEXT                     | Indexed, unique phone number  |
| role            | roletype (enum)          | User role (`admin`, `user`)   |
| is_active       | BOOLEAN                  | Whether the user is active    |
| hashed_password | TEXT                     | Hashed password               |
| created_at      | TIMESTAMP WITH TIME ZONE | Creation timestamp (UTC)      |
| updated_at      | TIMESTAMP WITH TIME ZONE | Last update timestamp (UTC)   |
| deleted_at      | TIMESTAMP WITH TIME ZONE | Soft deletion timestamp (UTC) |

The `roletype` enum is created with values `admin` and `user`.

### Database Creation

Database tables are created automatically on application startup via the `lifespan` function in `app/main.py`, which
calls `create_db_and_tables` from `app/database.py`. The `app/database.py` file imports all models using
`from app.modules import *`, which includes `User` from `app/modules/users/models.py` via `app/modules/__init__.py`.

## API Endpoints

### Auth Endpoints

#### Register a User

- **Endpoint**: `POST /auth/register`

- **Description**: Create a new user with hashed password.

- **Request Body**:

  ```json
  {
      "username": "testuser",
      "email": "testuser@example.com",
      "first_name": "Test",
      "last_name": "User",
      "phone_number": "+1234567890",
      "role": "admin",
      "is_active": true,
      "password": "securepassword"
  }
  ```

- **Response** (201 Created):

  ```json
  {
      "id": "some-uuid",
      "username": "testuser",
      "email": "testuser@example.com",
      "first_name": "Test",
      "last_name": "User",
      "phone_number": "+1234567890",
      "role": "admin",
      "is_active": true,
      "created_at": "2025-05-06T16:40:09Z",
      "updated_at": null,
      "deleted_at": null
  }
  ```

### User Endpoints (Versioned API)

#### Get User Info

- **Endpoint**: `GET /v1/api/users/`

- **Description**: Retrieve the current user's information.

- **Authorization**: Requires JWT token with authenticated user.

- **Response** (200 OK):

  ```json
  {
      "id": "some-uuid",
      "username": "testuser",
      "email": "testuser@example.com",
      "first_name": "Test",
      "last_name": "User",
      "phone_number": "+1234567890",
      "role": "admin",
      "is_active": true
  }
  ```

- **Error** (404 Not Found):

  ```json
  {"detail": "User not found"}
  ```

#### Update User Profile

- **Endpoint**: `PATCH /v1/api/users/`

- **Description**: Update the current user's profile (e.g., username, email, password).

- **Authorization**: Requires JWT token with authenticated user.

- **Request Body**:

  ```json
  {
      "first_name": "Updated",
      "password": "newsecurepassword"
  }
  ```

- **Response** (202 Accepted):

  ```json
  {
      "id": "some-uuid",
      "username": "testuser",
      "email": "testuser@example.com",
      "first_name": "Updated",
      "last_name": "User",
      "phone_number": "+1234567890",
      "role": "admin",
      "is_active": true
  }
  ```

#### Delete Account

- **Endpoint**: `DELETE /v1/api/users/`
- **Description**: Delete the current user's account.
- **Authorization**: Requires JWT token with authenticated user.
- **Response** (204 No Content): No body.

## Usage

1. **Register a User**:

   ```bash
   curl -X POST http://localhost:8000/auth/register -H "Content-Type: application/json" -d '{"username":"testuser","email":"testuser@example.com","first_name":"Test","last_name":"User","phone_number":"+1234567890","role":"admin","is_active":true,"password":"securepassword"}'
   ```

2. **Get User Info**:

    - Obtain a JWT token (e.g., via a `/auth/token` endpoint, not yet implemented).

    - Retrieve user info:

      ```bash
      curl -X GET http://localhost:8000/v1/api/users/ -H "Authorization: Bearer your-jwt-token"
      ```

3. **Update User Profile**:

   ```bash
   curl -X PATCH http://localhost:8000/v1/api/users/ -H "Content-Type: application/json" -H "Authorization: Bearer your-jwt-token" -d '{"first_name":"Updated","password":"newsecurepassword"}'
   ```

4. **Delete Account**:

   ```bash
   curl -X DELETE http://localhost:8000/v1/api/users/ -H "Authorization: Bearer your-jwt-token"
   ```

5. **Verify Database**:

   Connect to PostgreSQL and check the `user` table:

   ```sql
   SELECT * FROM "user";
   ```

## Key Components

### TimeStampMixin

- Defined in `app/modules/auth/mixins.py`.
- Adds `created_at`, `updated_at`, and `deleted_at` fields with `TIMESTAMP WITH TIME ZONE`.
- Uses timezone-aware `datetime` objects (UTC) for consistency.

### User Model

- Defined in `app/modules/users/models.py`.
- Includes `UsersBase` for shared fields, `User` for the database table, `UsersCreate` for registration, `UsersUpdate`
  for profile updates, and `UsersPublic` for response data.

### TokenPayload

- Defined in `app/modules/auth/models.py`.
- Pydantic model for JWT token payload (sub, role, exp).

### Database Configuration

- Defined in `app/database.py`.
- Uses `psycopg2` for synchronous database connections.
- Imports models via `from app.modules import *` for table creation.

### Lifespan Management

- Defined in `app/main.py`.
- Initializes database tables on startup and disposes the engine on shutdown.
- Includes versioned API routes (`/v1/api`) and separate auth routes.

### Middleware

- Defined in `app/core/middleware.py`.
- Configures CORS to allow cross-origin requests, with environment-specific origin restrictions.

### Authorization

- Defined in `app/core/security.py`.
- Implements `check_admin_only` to restrict access to admin users based on JWT token payload.
- Note: Role validation is token-based; role changes require re-login.

### Dependencies

- Defined in `app/core/dependencies.py`.
- Provides `admin_user` and `current_user` dependencies for route protection.

### JWT Verification

- Defined in `app/modules/auth/security.py`.
- Uses `PyJWT` for token decoding and verification.

### Generic CRUD Operations

- Defined in `app/core/services.py`.
- Provides reusable `get_one`, `create`, `update`, and `delete` functions for SQLModel models.

### User Services

- Defined in `app/modules/users/services.py`.
- Implements user-specific CRUD operations (get info, update profile, delete account).

### Routes

- Defined in `app/modules/auth/routes.py` for authentication endpoints.
- Defined in `app/modules/users/routes.py` for user endpoints under `/v1/api/users`.
- Aggregated in `app/modules/api_routes.py` under `/v1/api` for versioned APIs. New module routers should be added to
  `api_routes.py`.

### Exception Handling

- Defined in `app/core/exceptions.py`.
- Handles `HTTPException`, `SQLAlchemyError`, and generic exceptions with JSON responses.

## Testing

1. **Check Database Schema**:

   ```sql
   \d "user"
   ```

   Ensure `created_at`, `updated_at`, and `deleted_at` are `timestamp with time zone`.

2. **Verify RoleType Enum**:

   ```sql
   SELECT enumlabel FROM pg_enum WHERE enumtypid = (SELECT oid FROM pg_type WHERE typname = 'roletype');
   ```

   Confirm values are `admin` and `user`.

3. **Test CORS**:

    - In development (`ENVIRONMENT=development`), test with any origin (e.g., a frontend at `http://localhost:3000`).
    - In production (`ENVIRONMENT=production`), test with an allowed origin (e.g., `https://example.com`).
    - Use browser developer tools to verify CORS headers (e.g., `Access-Control-Allow-Origin`).

4. **Test Authorization**:

    - Add an admin-only route in `app/modules/users/routes.py`:

      ```python
      from backend.app import admin_user
      @router.get("/admin-only")
      def admin_only(user: admin_user):
          return {"message": "Admin access granted"}
      ```

    - Obtain a JWT token and test:

      ```bash
      curl -X GET http://localhost:8000/v1/api/users/admin-only -H "Authorization: Bearer your-jwt-token"
      ```

    - Test with a non-admin token to verify 403 error.

5. **Test Endpoints**:

    - Register a user and verify the response.
    - Get user info, update profile, and delete account using the `/v1/api/users` endpoints.
    - Test a non-existent user ID to ensure a 404 error.

6. **Check Database**:

   ```sql
   SELECT * FROM "user";
   ```

   Verify timestamps are in UTC (e.g., `2025-05-06 16:40:09+00`).

## Troubleshooting

- **Database Connection Errors**:

    - Verify `DATABASE_URL` in `.env` or `app/core/config.py`.
    - Ensure PostgreSQL is running and the database exists.

- **CORS Errors**:

    - Check `ALLOW_ORIGINS` in `.env` or `app/core/config.py`.
    - Verify `ENVIRONMENT` is set correctly (`development` or `production`).
    - Inspect CORS headers in browser developer tools.

- **Authorization Errors**:

    - Ensure `JWT_SECRET_KEY` is set in `.env` or `app/core/config.py`.
    - Verify the token’s role matches `RoleType.admin`.
    - If roles change, users must re-login to update their token.

- **Schema Mismatch**:

    - If `created_at`, `updated_at`, or `deleted_at` are `timestamp without time zone`, run:

      ```sql
      ALTER TABLE "user"
          ALTER COLUMN created_at TYPE TIMESTAMP WITH TIME ZONE,
          ALTER COLUMN updated_at TYPE TIMESTAMP WITH TIME ZONE,
          ALTER COLUMN deleted_at TYPE TIMESTAMP WITH TIME ZONE;
      ```

- **RoleType Enum Mismatch**:

    - If `roletype` enum values differ, update the database:

      ```sql
      ALTER TYPE roletype ADD VALUE 'admin' IF NOT EXISTS;
      ALTER TYPE roletype ADD VALUE 'user' IF NOT EXISTS;
      ```

- **Errors**:

    - Check logs with `echo=True` in `app/database.py`.
    - Share error messages, `\d "user"`, `roletype` enum values, and `app/core/config.py` (redact sensitive info).

## Future Improvements

- Implement a `/auth/token` endpoint for JWT issuance.
- Add real-time role validation in `check_admin_only` using database queries.
- Implement soft delete endpoints.
- Add pagination for user listing.
- Use Alembic for production migrations.
- Add unit tests with `pytest`.

## License

MIT License