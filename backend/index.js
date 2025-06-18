const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
const pinRoute = require('./routes/pins');
const userRoute = require('./routes/users');

dotenv.config();

// ✅ Enable CORS for Netlify frontend
app.use(cors({
  origin: "https://spots-map.netlify.app",
  credentials: true
}));

// ✅ Optional: Health check route
app.get('/', (req, res) => {
  res.send('Backend is alive ✅');
});

// ✅ Parse incoming JSON
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// ✅ Register routes
app.use('/api/pins', pinRoute);
app.use('/api/users', userRoute);

// ✅ Use Railway-provided port
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
