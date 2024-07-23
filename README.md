# Invoice Management System

## Project Description

The Invoice Management System is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows administrators to manage invoices, view analytics on invoice activity, and ensure secure access to the system. The application features user authentication, CRUD operations for invoices, and the ability to generate and view invoices as PDF documents.

## Technologies Used

- **Frontend:**
  - React.js
  - Axios
  - Tailwind CSS
  - React Router

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - Bcryptjs
  - JSON Web Tokens (JWT)
  - HTML-PDF

- **Deployment:**
  - Vercel (Frontend)
  - Heroku (Backend)

## Setup Instructions for Running the Project Locally

### Prerequisites

- Node.js installed
- MongoDB installed and running
- Git installed

### Backend Setup

1. **Clone the Repository:**

   ```bash
   git clone [https://github.com/yourusername/invoice-management-system.git](https://github.com/vikassaroj123/Invoice-Management)
   cd invoice-management-system/backend


2. **Install the Required Packages:**

   ```bash
   npm install
   ```

3. **Create a `.env` File:**

   Create a `.env` file in the `backend` directory with the following content:

   ```env
   MONGODB_URI= 
   JWT_SECRET= 
   ```

4. **Start the Backend Server:**

   ```bash
   node server.js
   ```

### Frontend Setup

1. **Navigate to the Frontend Directory:**

   ```bash
   cd ../frontend
   ```

2. **Install the Required Packages:**

   ```bash
   npm install
   ```

3. **Start the Frontend Development Server:**

   ```bash
   npm start
   ```

### Running the Application

- **Backend:** The server will run on `http://localhost:5000`.
- **Frontend:** The client will run on `http://localhost:3000`.

## API Documentation

### Authentication

- **POST /api/auth/signup**: Register a new user.
  - **Request Body:**
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "User created"
    }
    ```

- **POST /api/auth/login**: Login an existing user.
  - **Request Body:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "token": "string"
    }
    ```

### Invoice Management

- **GET /api/invoices**: Retrieve all invoices.
  - **Response:**
    ```json
    [
      {
        "invoiceNumber": "string",
        "customerName": "string",
        "amount": "number",
        "dueDate": "date",
        "status": "string"
      }
    ]
    ```

- **POST /api/invoices**: Create a new invoice.
  - **Request Body:**
    ```json
    {
      "invoiceNumber": "string",
      "customerName": "string",
      "amount": "number",
      "dueDate": "date",
      "status": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "invoice": {
        "invoiceNumber": "string",
        "customerName": "string",
        "amount": "number",
        "dueDate": "date",
        "status": "string"
      }
    }
    ```

- **GET /api/invoices/:id**: Retrieve a single invoice.
  - **Response:**
    ```json
    {
      "invoiceNumber": "string",
      "customerName": "string",
      "amount": "number",
      "dueDate": "date",
      "status": "string"
    }
    ```

- **PUT /api/invoices/:id**: Update an invoice.
  - **Request Body:**
    ```json
    {
      "invoiceNumber": "string",
      "customerName": "string",
      "amount": "number",
      "dueDate": "date",
      "status": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "invoice": {
        "invoiceNumber": "string",
        "customerName": "string",
        "amount": "number",
        "dueDate": "date",
        "status": "string"
      }
    }
    ```

- **DELETE /api/invoices/:id**: Delete an invoice.
  - **Response:**
    ```json
    {
      "message": "Invoice deleted"
    }
    ```

### PDF Generation

- **GET /api/invoices/:id/pdf**: Generate a PDF for an invoice.
  - **Response:** PDF document

### Frontend Deployment on Vercel

1. **Create a New Project on Vercel.**

2. **Connect Your GitHub Repository to Vercel.**

3. **Set the Build and Output Settings:**
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

4. **Deploy the Application Using the Vercel Dashboard.**

## Contact

For any inquiries or issues, please contact Vikas Saroj at vikasforwork0@gmail.com.
```
