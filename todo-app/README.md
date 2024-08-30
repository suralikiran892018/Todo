Todo Application
This is a simple Todo application built using NestJS for the backend and React with Redux for the frontend.

Prerequisites
Ensure you have the following installed before you begin:

Node.js (v14 or higher)
npm (v6 or higher)
Git
Getting Started
1. Clone the Repository
bash
Copy code
git clone <your-repo-url>
cd todo-app
2. Backend Setup
Navigate to the backend directory:

bash

cd backend
Install the dependencies:

bash
Copy code
npm install
Start the backend server:

bash
npm run start
The backend server will run by default on http://localhost:3000.

3. Frontend Setup
Important: Ensure the backend server is running before starting the frontend.

Navigate to the frontend directory:

bash

cd ../frontend
Install the dependencies:

bash

npm install
Start the frontend development server:

bash

npm start
The frontend will run by default on http://localhost:3001.

Running the Application
Visit http://localhost:3001 in your browser to use the Todo application.
You can register a new account, log in, and manage your todos.
Important Note
Backend First: Always start the backend server before starting the frontend server to ensure proper communication between the frontend and backend.
