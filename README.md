# 🗺️ Spots Map - Interactive Location Sharing

Spots Map is a full-stack **MERN (MongoDB, Express.js, React, Node.js)** application that allows users to **mark locations on a map, leave reviews, and rate places**. This guide explains how to set up the project on your local machine.

---

# Deployed Site: https://spots-map.netlify.app/

## 🚀 **Features**
✔️ Interactive **Mapbox** integration for marking locations  
✔️ **User authentication** (Login/Register)  
✔️ Users can **add, rate, and review** places  
✔️ Automatically shows **user’s current location**  
✔️ Backend API built with **Node.js + Express + MongoDB**  
✔️ Frontend built with **React.js + Mapbox**  

---

## 🛠 **Tech Stack**
- **Frontend:** React.js, Axios, Mapbox GL
- **Backend:** Node.js, Express.js, MongoDB
- **Database:** MongoDB Atlas
- **Hosting:** Railway (Backend), Netlify (Frontend)

---

## 📥 **1. Clone the Repository**
Open your terminal and run:
```
git clone https://github.com/YOUR_GITHUB_USERNAME/spots-map.git
cd spots-map
```

---

## 🖥️ **2. Setup Backend**
### 📌 **1️⃣ Navigate to the Backend Folder**
```
cd backend
```

### 📌 **2️⃣ Install Backend Dependencies**
```
npm install
```

### 📌 **3️⃣ Create a `.env` File**
Inside the **backend** folder, create a `.env` file and add the following:
```
MONGO_URL=mongodb+srv://your_username:your_password@cluster.mongodb.net/spotsmap?retryWrites=true&w=majority
PORT=8800
JWT_SECRET=your_jwt_secret
```
👉 **Replace** `your_username`, `your_password`, and `your_jwt_secret` with your actual MongoDB credentials and a secure JWT secret.

### 📌 **4️⃣ Start the Backend Server**
```
npm start
```
If successful, you should see:
```
Backend server is running on port 8800
```

---

## 🎨 **3. Setup Frontend**
### 📌 **1️⃣ Navigate to the Frontend Folder**
```
cd ../frontend
```

### 📌 **2️⃣ Install Frontend Dependencies**
```
npm install
```

### 📌 **3️⃣ Create a `.env` File**
Inside the **frontend** folder, create a `.env` file:
```
REACT_APP_MAPBOX=your_mapbox_access_token
REACT_APP_API_URL=http://localhost:8800
```
👉 **Replace** `your_mapbox_access_token` with your **Mapbox API key**.

### 📌 **4️⃣ Start the Frontend Server**
```
npm start
```
Your **frontend should open in the browser at** `http://localhost:3000`.

---

## 🔥 **4. Testing the App**
1. **Make sure the backend is running** on `http://localhost:8800`
2. **Ensure MongoDB Atlas is properly connected**
3. **Start the frontend (`npm start` in the frontend folder)**
4. Open **http://localhost:3000** and start testing the app!

---

## 📦 **5. API Endpoints (Backend)**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/pins` | Fetch all map pins |
| POST | `/api/pins` | Create a new pin |
| POST | `/api/users/register` | Register a new user |
| POST | `/api/users/login` | Login a user |

---

## 🛠 **6. Troubleshooting**
### ❓ **1. Backend is not running**
✔ **Check MongoDB connection in `.env`**  
✔ **Ensure the correct PORT is used** (`8800`)  

### ❓ **2. Frontend is not connecting to Backend**
✔ **Ensure `REACT_APP_API_URL=http://localhost:8800` in `.env`**  
✔ **Check CORS settings in `index.js` (backend)**  

### ❓ **3. Map is not loading**
✔ **Ensure `REACT_APP_MAPBOX` is set correctly in `.env`**  
✔ **Check Mapbox API key permissions**  
