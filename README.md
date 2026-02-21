# Sales REST API — Coding Assessment

## Overview

This service provides authenticated access to monthly sales records stored in a relational database.
Clients can query which customer purchased which product during a given month, with pagination and standardized error responses.

The application follows a layered backend architecture (routes → controller → service → database) with validation, authentication, and standardized error handling.

The API allows clients to query **which customer bought which product during a specific month**.

---

## Requirements Coverage

### Core Requirements

* REST API for sales data
* Query monthly sales records
* Relational database structure

  * customers
  * products
  * sales

### Bonus Features Implemented

* Request validation (Fastify JSON schema)
* JWT authentication
* Standardized HTTP error responses
* Health & readiness probes
* Pagination support

---

## Tech Stack

* **Node.js**
* **Fastify**
* **PostgreSQL**
* **JWT Authentication (@fastify/jwt)**
* **Argon2 Password Hashing**
* **Schema Validation (Fastify schema)**

---

## Getting Started

### Prerequisites

* Node.js 18+
* PostgreSQL

---

### Environment Variables

Create a `.env` file:

```id="dtn3lw"
DATABASE_URL=postgres://user:password@localhost:5432/salesdb
PORT=3000
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1h
```

---

### Database Setup (Required Before Running)

The application starts without the database, but authentication, protected endpoints, and readiness checks will fail until the schema exists.

Create the tables described in the **Database Setup** section below and insert at least one user account (see *Seeded Admin User*).

---

### Install & Run

Install dependencies:

```id="f2b7a0"
npm install
```

Run in development:

```id="d2y8i1"
npm run dev
```

Run in production:

```id="d3b5h4"
npm start
```

---

## Database Setup

This project expects an existing PostgreSQL database.
IDs are expected to be auto-generated (SERIAL / IDENTITY) by the database.
Create the following tables and insert sample data manually.

### customers

| column     | type         |
| ---------- | ------------ |
| id         | integer (PK) |
| first_name | varchar(100) |
| last_name  | varchar(100) |

### products

| column | type          |
| ------ | ------------- |
| id     | integer (PK)  |
| name   | varchar(150)  |
| price  | numeric(10,2) |

### sales

| column       | type              |
| ------------ | ----------------- |
| id           | integer (PK)      |
| customer_id  | FK → customers.id |
| product_id   | FK → products.id  |
| quantity     | integer           |
| total_amount | numeric(10,2)     |
| sale_date    | date (YYYY-MM-DD) |

### users

| column        | type                                     |
| ------------- | ---------------------------------------- |
| id            | integer (PK)                             |
| username      | text (unique)                            |
| password_hash | text                                     |
| role          | text (default: `guest`, seeded: `admin`) |


### Seeded Admin User

To access protected endpoints, create an initial admin account.

Example (password: `admin123`):

```id="se1d9x"
INSERT INTO users (username, password_hash, role)
VALUES (
  'admin',
  '$argon2id$v=19$m=65536,t=3,p=1$1/tFEA5CUaGR/CUIS1fMqw$VhPMxHn/+66KLZ03uGDFyVosKUfdbwAu3p8RGGPaz7k',
  'admin'
);
```

You may generate your own hash using Argon2 if desired.

---

## API Reference

Base URL:

```
http://localhost:3000
```

---

### Health Check

**GET /health**
Confirms the service is alive.

Response:

```
{ "status": "ok" }
```

---

### Readiness Check

**GET /ready**
Confirms database connectivity.

Response:

```
{ "status": "ready" }
```

Returns `503` if database is unavailable.

---

### Authentication

**POST /auth/login**

Request:

```
{
  "username": "admin",
  "password": "password"
}
```

Response:
The returned JWT must be sent in the `Authorization: Bearer <token>` header for protected routes.

```
{
  "accessToken": "<jwt>"
}
```

---

### Get Monthly Sales (Protected)

**GET /sales?month=1&year=2025&page=1&pageSize=10**

Headers:

```
Authorization: Bearer <token>
```

Response:

```
{
  "data": [
    {
      "id": 1,
      "customer_name": "John Doe",
      "product_name": "Keyboard",
      "quantity": 1,
      "total_amount": "1500.00",
      "sale_date": "01-15-2025"
    }
  ],
  "meta": {
    "page": 1,
    "pageSize": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

---

## Error Handling

All errors return a consistent JSON structure:

```
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "Invalid credentials"
}
```

Some responses include a `details` field when additional context is available (e.g., validation errors).

Examples:

* 400 → validation error (includes detailed validation issues)
* 401 → authentication failure
* 404 → resource not found
* 415 → unsupported media type
* 503 → dependency unavailable (e.g., database)
* 500 → unexpected server error

---

## Assumptions

* Monthly filtering uses a half-open date range `[start, nextMonthStart)` to avoid timezone edge cases and allow index-friendly comparisons.
* Pagination uses offset-based pagination as the dataset size is expected to be moderate for the scope of the assessment.
* The year range is limited to keep validation simple and aligned with the provided dataset.

---
