
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // to read JSON from the form

// Temporary fake database (replace with real DB later)
const users = [
  {
    id: 1,
    username: 'admin',
    // password is "password123" (already hashed)
    password: '$2a$10$8K1p/a0dL1LXMIgoEDFrwOfMQsF8g5q5q5q5q5q5q5q5q5q5q5q5q' // example hash
  }
];

// Login route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Check if user exists
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // 2. Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // 3. Create JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '1h' }
    );

    // 4. Send success response
    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
