# 🎨 Virtual Art Gallery

A full-stack **Virtual Art Gallery web application** built with the **MERN stack**, designed to connect artists, curators, and art enthusiasts in a digital gallery experience.

Artists can upload and manage their artworks, curators/admins can review and manage submissions, and visitors can explore and view artwork through the gallery.

---

## 🚀 Features

### 👩‍🎨 Artist Panel

* Upload artworks
* Manage artist profile
* View uploaded artworks
* Manage submitted artwork

### 🧑‍💼 Curator / Admin Panel

* Review submitted artworks
* Approve or reject artworks
* Manage artists
* Manage gallery content

### 👀 Visitor View

* Browse available artworks
* Explore the virtual gallery
* View artwork details
* Discover different artists

### 🔐 Authentication

* User registration
* Login system
* Role-based access
* Protected user areas

---

## 🛠️ Tech Stack

### Frontend

* **React.js**

### Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**

## 📁 Project Structure

```text
Art-Gallery/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Getting Started

Follow the steps below to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/shivanimourya2/Art-Gallery.git
```

Navigate into the project:

```bash
cd Art-Gallery
```

---

## 💻 Frontend Setup

Install the required dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will be available at the local URL provided by Vite, usually:

```text
http://localhost:5173
```

### Available Frontend Scripts

```bash
npm run dev       # Start development server
npm run build     # Build the application for production
npm run preview   # Preview the production build
npm run lint      # Run ESLint
```

---

## 🖥️ Backend Setup

Open a **second terminal** and navigate to the backend:

```bash
cd backend
```

Install backend dependencies:

```bash
npm install
```

Start the backend server using the configured development command:

```bash
npm run dev
```

If the project uses a standard start script instead:

```bash
npm start
```

---

## 🗄️ MongoDB Setup

The application uses **MongoDB** for data storage.

You can use either:

* MongoDB Community Server
* MongoDB Atlas

Make sure your MongoDB connection string is configured in the backend environment variables.

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend` directory.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Environment Variables

| Variable     | Description                        |
| ------------ | ---------------------------------- |
| `PORT`       | Port used by the backend server    |
| `MONGO_URI`  | MongoDB connection string          |
| `JWT_SECRET` | Secret key used for authentication |

> ⚠️ Never commit your `.env` file or other sensitive credentials to GitHub.

---

## 🧪 Running the Project

For local development, run the frontend and backend in **separate terminals**.

### Terminal 1 — Frontend

```bash
cd Art-Gallery
npm install
npm run dev
```

### Terminal 2 — Backend

```bash
cd Art-Gallery/backend
npm install
npm run dev
```

Make sure MongoDB is running and the backend `.env` file is properly configured.

---

## 🔄 Application Workflow

```text
Artist
   │
   ▼
Upload Artwork
   │
   ▼
Curator/Admin Review
   │
   ├── Approve ──► Public Gallery
   │
   └── Reject
```

Visitors can browse the artworks available in the public gallery and view their details.

---

## 🤝 Contributing

Contributions are welcome!

To contribute:

### 1. Fork the repository

Create your own fork of the project.

### 2. Create a new branch

```bash
git checkout -b feature/your-feature
```

### 3. Make your changes

Implement your feature or fix.

### 4. Commit your changes

```bash
git add .
git commit -m "Add your feature"
```

### 5. Push your branch

```bash
git push origin feature/your-feature
```

### 6. Open a Pull Request

Create a Pull Request from your branch to the main repository.

---

## 👩‍💻 Author

**Shivani Mourya**

---
