// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/task_routes');

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Enable parsing of JSON request bodies

// Use task routes
app.use('/task', taskRoutes);

// MongoDB Connection
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MongoDB URI is not defined in .env file.");
  process.exit(1);
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB database connection established successfully'))
.catch(err => console.log('MongoDB connection error:', err));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});