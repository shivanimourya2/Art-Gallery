# 🎨 Virtual Art Gallery

A full-stack Virtual Art Gallery web application built using the MERN stack where artists can upload their artworks, curators can approve them, and visitors can explore and view art.

---

## 🚀 Features

- 👩‍🎨 Artist Panel
  - Upload artworks
  - Manage profile
  - View uploaded items

- 🧑‍💼 Curator/Admin Panel
  - Approve or reject artworks
  - Manage artists and content

- 👀 Visitor View
  - Browse artworks
  - View artwork details

- 🔐 Authentication
  - Login / Signup system

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- <br>
**Backend:**
- Node.js
- Express.js
- MongoDB

--
## 👩‍💻 Author

Shivani Mourya

## 📁 Project Structure
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

##⚙️ Getting Started

Follow these steps to run the project locally.

1. Clone the Repository
git clone https://github.com/shivanimourya2/Art-Gallery.git

Navigate into the project:

cd Art-Gallery
##💻 Frontend Setup

Open a terminal inside the project root.

Install the frontend dependencies:

npm install

Start the Vite development server:

npm run dev

The frontend will be available at the local URL shown by Vite, usually:

http://localhost:5173

The current frontend configuration uses Vite and provides dev, build, lint, and preview scripts.

🖥️ Backend Setup

Open a second terminal.

Navigate to the backend directory:

cd backend

Install backend dependencies:

npm install

Start the backend server using the project's configured start command.

For development, this may be:

npm run dev

or, depending on the backend configuration:

npm start
##🗄️ MongoDB Setup

The project uses MongoDB as its database.

You can use either:

MongoDB Community Server locally
MongoDB Atlas

Make sure your MongoDB connection string is configured in the backend environment variables.

Example:

MONGO_URI=your_mongodb_connection_string
PORT=5000
🔐 Environment Variables

Create a .env file inside the backend directory.

Example:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

##🧪 Running the Project

For local development, you generally need two terminals:

Terminal 1 — Frontend
cd Art-Gallery
npm install
npm run dev
Terminal 2 — Backend
cd Art-Gallery/backend
npm install
npm run dev

Make sure MongoDB is available and the backend .env file is configured before using features that require database access.

##🤝 Contributing

Contributions are welcome!

If you would like to contribute:

Fork the repository
Create a new branch
git checkout -b feature/your-feature
Make your changes
Commit your changes
git commit -m "Add your feature"
Push the branch
git push origin feature/your-feature
Open a Pull Request

##👩‍💻 Author

Shivani Mourya
