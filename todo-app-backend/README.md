# Todo Application

This project consists of a Todo application with a backend API and a frontend client. The backend is built with NestJS and the frontend is built with React.

## Project Structure

- **Backend:** `/backend`
- **Frontend:** `/frontend`

## Prerequisites

Ensure you have the following installed on your machine:
- Node.js
- npm or yarn

## Setup Instructions

### Backend

1. Navigate to the backend directory:
    ```bash
    cd backend
    ```

2. Install the backend dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3. Start the backend server:
    ```bash
    npm start
    # or
    yarn start
    ```
    By default, the backend server will run on port `3000`.

### Frontend

1. Ensure the backend server is running before starting the frontend.

2. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

3. Install the frontend dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

4. Start the frontend development server:
    ```bash
    npm start
    # or
    yarn start
    ```
    The frontend server will usually run on port `3001`.

## Important Notes

- **Backend Server:** Make sure to start the backend server first before starting the frontend.
- **Port Conflicts:** Ensure that no other applications are running on ports `3000` or `3001` to avoid conflicts.

## Troubleshooting

If you encounter issues:
- Check that both servers are running and there are no errors in the terminal.
- Ensure that the backend API endpoints are accessible.
- Verify the network requests in the browser's developer tools to see if they are correctly pointing to `http://localhost:3000`.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
