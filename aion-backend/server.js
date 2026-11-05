// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors()); // Allows your React app to send data here
app.use(express.json()); // Parses incoming JSON data

// 1. Connect to MongoDB (Ensure MongoDB is running locally, or use a MongoDB Atlas URL here)
mongoose.connect('mongodb://127.0.0.1:27017/aion_database')
  .then(() => console.log('✅ Connected to Aion MongoDB Database'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// 2. Define the Database Schema (How the data is structured)
const querySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String, default: 'N/A' },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

// 3. Create the Model
const Query = mongoose.model('Query', querySchema);

// 4. Create the POST Route to receive data from React
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, phone, message } = req.body;

    // Create a new database entry
    const newQuery = new Query({
      name,
      email,
      company,
      phone,
      message
    });

    // Save to MongoDB
    await newQuery.save();
    
    res.status(201).json({ success: true, message: 'Query saved successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to save query.' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});