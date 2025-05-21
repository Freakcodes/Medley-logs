# 📝 Medley-Logs

Welcome to **Medley-Logs** — a modern, full-featured blogging platform built with the power of the **MERN stack** and **Clerk authentication**. Create, explore, and manage your own blog posts in a secure and dynamic environment.

> ⚡ Built with speed, scalability, and simplicity in mind.

---

## 🚀 Live Demo

Coming Soon... (or replace with your deployed link)

---

## 📁 Project Structure

```
medley-logs/
│
├── client/     # Frontend - React (Vite)
├── server/     # Backend - Node.js + Express
└── README.md
```

---

## 🛠 Tech Stack

### 🧠 Frontend (`client` folder)

- **React.js** (with Vite for blazing-fast builds)
- **Tailwind CSS** for modern UI styling
- **React Router** for routing
- **TanStack Query** for efficient data fetching & caching
- **React Hook Form** for powerful form handling
- **Clerk** for authentication & user management
- **Toastify** for notifications

### ⚙️ Backend (`server` folder)

- **Node.js** with **Express**
- **MongoDB** with **Mongoose** for database
- **Clerk SDK** for authentication (server-side validation)
- **CORS**, **dotenv**, and other essential middlewares

---

## 🔐 Authentication

Medley-Logs uses **Clerk** to handle authentication, allowing for secure access control:
- Only logged-in users can create or delete posts.
- Users can only delete posts that they have authored.
- Clerk's session tokens are validated both on the frontend and backend.

---

## ✨ Features

- 📰 **Create, Read,  Delete Posts**
- 🔐 **Secure Authentication** using Clerk
- 💬 **Comment System** (Comment + Display)
- 📂 **Rich Text Rendering** (sanitized using DOMPurify)
- 📌 **Save Posts** functionality
- ⏱ **Timestamps** with `date-fns`
- ⚠️ **Error Handling** and Toast Notifications
- 📱 Fully responsive UI

---

## 🧑‍💻 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Freakcodes/medley-logs.git
cd medley-logs
```

### 2. Setup `.env` files

#### In `/client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

#### In `/server/.env`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
FRONTEND_URL=http://localhost:5173
```

> Replace all keys with actual credentials from [Clerk Dashboard](https://clerk.com)

### 3. Install dependencies

#### For Client:
```bash
cd client
npm install
npm run dev
```

#### For Server:
```bash
cd server
npm install
npm start
```

---

## 📦 Deployment

### Backend:
You can deploy the backend for free using [Render](https://render.com):

1. Push your code to GitHub.
2. Create a new **Web Service** on Render.
3. Add your environment variables.
4. Deploy!

### Frontend:
You can deploy the Vite + React frontend using:

- **Vercel** (Recommended)
- **Netlify**
- **Firebase Hosting**

---

## 📷 Screenshots

> _(Optional: Add screenshots of the app UI here using `![Alt text](url)`)_"

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

---



---

## 🙌 Acknowledgements

- [Clerk.dev](https://clerk.dev) for seamless authentication
- [TanStack](https://tanstack.com/) for state & data management
- [Vite](https://vitejs.dev/) for a fast React dev experience
- [Toastify](https://fkhadra.github.io/react-toastify/) for beautiful toast notifications

---

Made with ❤️ by Abhayyy (https://github.com/FreakCodes)
