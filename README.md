# DailyPress Server

This is the **server-side** application for the DailyPress project, a modern article management system where users can register, submit articles, and admins can manage users and articles.

---
#### Client Repo : https://github.com/DevAbidHasan/B11-A12-Dailypress-client
#### Live Link : https://dailypress-bf298.web.app/

## 🛠 Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB**
- **cors** (Cross-Origin Resource Sharing)
- **dotenv** (Environment Variables)
- **express.json()** (Body Parsing Middleware)

---

## ✨ Features

- User registration and login
- Article creation by users
- Admin functionality:
  - Approve or decline articles
  - Delete articles
  - Delete users
- Article status management (pending, approved, declined)
- Premium article management
- Image uploads for articles (using external image hosting service)
- RESTful APIs for all actions
- Real-time feedback for actions using status codes
- Middleware for security and CORS
- Environment variable configuration for sensitive keys
- Proper error handling for routes and requests
- Easy integration with the client-side React application

---

## ⚡ Middleware Used

- `cors` — to allow cross-origin requests
- `express.json()` — to parse JSON request bodies
- Custom middleware (if any for authentication, logging, or error handling)

---

## 🌿 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
MONGO_URI=<Your MongoDB URI>
JWT_SECRET=<Your JWT Secret>
IMAGE_UPLOAD_KEY=<Your Image Upload API Key>
```
🚀 Installation
Clone the repository:

```
git clone <your-server-repo-url>
```
Navigate to the project folder:
```
cd dailypress-server
```
Install dependencies:
```
npm install
```
Create a .env file with required environment variables.
Start the server (development mode):
```
npm run dev
```
📦 API Endpoints
Users
```
POST /users/register — Register a new user
POST /users/login — Login existing user
DELETE /users/:id — Delete user (Admin only)
```
Articles
```
GET /articles — Get all articles
POST /articles — Create new article
PATCH /articles/:id/status — Update article status (accept/decline)
PATCH /articles/:id/premium — Make article premium
DELETE /articles/:id — Delete article (Admin only)
```
Other

Image upload integration using Imgbb or similar service
