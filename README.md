# Shopping App

A comprehensive shopping application built with **Next.js**, **React**, **Redux Toolkit**, and two robust backends using **.NET 8** and **Nest.js**. This project facilitates users to add products to a shopping cart categorized by types and submit orders with their details. The entire setup is containerized using **Docker Compose** for seamless deployment and scalability.

## Table of Contents

- [Shopping App](#shopping-app)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Technologies Used](#technologies-used)
  - [Prerequisites](#prerequisites)
  - [Setup Instructions](#setup-instructions)
    - [1. Clone the Repository](#1-clone-the-repository)
    - [2. Configure Environment Variables](#2-configure-environment-variables)
      - [Frontend (shopping-app-frontend/.env.local)](#frontend-shopping-app-frontendenvlocal)
      - [Orders Backend (orders-backend/.env)](#orders-backend-orders-backendenv)
      - [Categories Backend](#categories-backend)
    - [3. Docker Compose](#3-docker-compose)
  - [Running the Application](#running-the-application)
    - [Frontend](#frontend)
    - [Categories Backend (.NET 8)](#categories-backend-net-8)
    - [Orders Backend (Nest.js)](#orders-backend-nestjs)
  - [API Documentation](#api-documentation)
    - [Categories API](#categories-api)
    - [Orders API](#orders-api)
  - [License](#license)
  - [Contact](#contact)

## Project Overview

The **Shopping App** is designed to provide a seamless shopping experience where users can:

1. **Shopping Cart Page:**

   - Select product categories (e.g., Dairy, Meat, Fruits & Vegetables).
   - Enter product names manually.
   - View selected products categorized accordingly.
   - Navigate to the Order Page.

2. **Order Page:**
   - Review selected products.
   - Fill out an order form with Full Name, Address, and Email.
   - Submit the order details to the Orders Backend.

The application comprises three main projects managed under a single Git repository:

- **Frontend:** Built with Next.js, React, and Redux Toolkit.
- **Categories Backend:** Developed using .NET 8, Entity Framework, and SQL Server.
- **Orders Backend:** Powered by Nest.js and MongoDB, with Elastic Search integration planned for future enhancements.

## Technologies Used

- **Frontend:**

  - [Next.js](https://nextjs.org/)
  - [React](https://reactjs.org/)
  - [Redux Toolkit](https://redux-toolkit.js.org/)
  - [React Hook Form](https://react-hook-form.com/)
  - [Yup](https://github.com/jquense/yup)
  - [Ant Design](https://ant.design/)

- **Backends:**

  - **Categories Backend:**

    - [.NET 8](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
    - [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)
    - [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)

  - **Orders Backend:**
    - [Nest.js](https://nestjs.com/)
    - [MongoDB](https://www.mongodb.com/)
    - [Elastic Search](https://www.elastic.co/elasticsearch/) _(Planned)_

- **DevOps & Deployment:**
  - [Docker](https://www.docker.com/)
  - [Docker Compose](https://docs.docker.com/compose/)
  - [Azure DevOps](https://azure.microsoft.com/en-us/services/devops/)

## Prerequisites

Before setting up the project, ensure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js (v16 or later)](https://nodejs.org/)
- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [MongoDB](https://www.mongodb.com/try/download/community) _(Optional if not using Docker for MongoDB)_

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/shopping-app.git
cd shopping-app
```

### 2. Configure Environment Variables

Create .env files for each project as needed.

#### Frontend (shopping-app-frontend/.env.local)

```env
NEXT_PUBLIC_CATEGORIES_API=http://categories-backend:5000
NEXT_PUBLIC_ORDERS_API=http://orders-backend:5001
```

#### Orders Backend (orders-backend/.env)

```env
MONGODB_URI=mongodb://mongodb:27017/ordersdb
```

#### Categories Backend

Ensure the connection string is set in the docker-compose.yml under the categories-api service.

### 3. Docker Compose

Ensure Docker and Docker Compose are installed and running.

## Running the Application

### Frontend

1. **Navigate to Frontend Directory:**

   ```bash
   cd shopping-app-frontend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Run the Development Server:**

   ```bash
   npm run dev
   ```

The frontend will be accessible at <http://localhost:3000>.

### Categories Backend (.NET 8)

1. **Navigate to Categories Backend Directory:**

   ```bash
   cd categories-api
   ```

2. **Restore Dependencies and Run Migrations:**

   ```bash
   dotnet restore
   dotnet ef database update
   ```

3. **Run the Application:**

   ```bash
   dotnet run
   ```

The Categories Backend API will be accessible at <http://localhost:5000>.

### Orders Backend (Nest.js)

1. **Navigate to Orders Backend Directory:**

   ```bash
   cd orders-api
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Run the Application:**

   ```bash
   npm run start:dev
   ```

The Orders Backend API will be accessible at <http://localhost:5001>.

## API Documentation

### Categories API

- **Base URL:** `http://localhost:5000`
- **Endpoints:**
  - `GET /categories`  
    _Fetches the list of product categories._

### Orders API

- **Base URL:** `http://localhost:5001`
- **Endpoints:**
  - `POST /orders`
    _Submits order details._
  - `GET /orders` _(Optional)_
    _Fetches all orders._

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any inquiries or support, please contact:

- **GitHub:** [iMelki](https://github.com/iMelki)

---

_Happy Coding!_
