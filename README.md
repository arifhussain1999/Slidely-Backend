# Backend Server for Submission Tracking

This project implements a backend server using Express and TypeScript to handle submission tracking.

## Prerequisites

Before running the server, ensure you have the following installed:
- Node.js (version node-v20.14.0-x64)
- npm (Node Package Manager)

## Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/arifhussain1999/Slidely-Backend.git
   cd backend-server
# Install dependencies:
npm install
# Running the Server
1. Build the TypeScript code:
   npm run build
   
# Start the server:
npm start

The server will start running on http://localhost:3000 by default.

# API Endpoints
1. GET /ping: Check if the server is running.

2. POST /submit: Submit a new form entry.

3. GET /read: Retrieve a specific form submission.

# Configuration
1. The server uses tsconfig.json for TypeScript configuration.
2. Database is managed using db.json.
