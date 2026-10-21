# Posto — Posts CRUD App

A simple full-stack CRUD application for creating, viewing, editing, and deleting posts. This version has been adapted from an earlier in-memory posts API to use MongoDB for persistent storage, with a basic browser-based interface.

## Features

- Create a post with text content
- View all posts, newest first
- Edit and delete existing posts
- Refresh the post list
- Validate empty post content
- Store posts in MongoDB
- Show post creation dates

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript, Axios
- **Backend:** Node.js, Express 5
- **Database:** MongoDB with Mongoose

## Run Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the database

Create a `.env` file in the project root and add your MongoDB connection string:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/posto
```

Use your own MongoDB URI if your database is hosted elsewhere. Keep `.env` private and do not commit credentials.

### 3. Start the app

```bash
npm start
```

For development with automatic restarts:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## API Endpoints

Base URL: `http://localhost:3000/api/posts`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/posts` | Get all posts |
| GET | `/api/posts/:id` | Get one post |
| POST | `/api/posts` | Create a post |
| PUT | `/api/posts/:id` | Update a post |
| DELETE | `/api/posts/:id` | Delete a post |

For create and update requests, send JSON with a non-empty `text` field:

```json
{
  "text": "A post message"
}
```

## Decisions and Changes

- Replaced the earlier in-memory array with a **MongoDB collection**, so posts remain saved when the server restarts.
- Kept the project lightweight: the frontend uses plain HTML, CSS, and JavaScript rather than introducing a frontend framework.
- Used Axios in the browser to call the Express API.
- Kept API routes and controller logic in separate files to make the backend easier to follow.
- Added basic validation for empty text and invalid or missing post IDs, with appropriate HTTP status codes.
- Sorted posts by creation date so the newest posts appear first.

## Project Structure

```text
├── public/
│   ├── index.html
│   ├── script.js
│   └── style.css
├── src/
│   ├── controllers.js
│   ├── db.js
│   ├── post.model.js
│   └── routes.js
├── app.js
├── server.js
├── example.env
├── package.json
└── README.md
```