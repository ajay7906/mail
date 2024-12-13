// server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const JWT_SECRET = 'abc1234';

// Mock database
const users = [];
const emails = [
  {
    id: 1,
    subject: 'Weekly Team Update',
    sender: 'john@example.com',
    recipient: 'jane@example.com',
    timestamp: '10:30 AM',
    content: 'Hello team, here is our weekly update...',
    folder: 'inbox'
  },
  // Add more mock emails
];

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  const { email, password, name } = req.body;
  
  if (users.find(user => user.email === email)) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const user = { id: users.length + 1, email, password, name };
  users.push(user);

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
  res.json({ token });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
  res.json({ token });
});

// Email Routes
app.get('/api/emails/:folder', authenticateToken, (req, res) => {
  const { folder } = req.params;
  const userEmails = emails.filter(email => email.folder === folder);
  res.json(userEmails);
});

app.post('/api/emails', authenticateToken, (req, res) => {
  const { recipient, subject, content } = req.body;
  const newEmail = {
    id: emails.length + 1,
    subject,
    sender: req.user.email,
    recipient,
    timestamp: new Date().toLocaleTimeString(),
    content,
    folder: 'sent'
  };
  
  emails.push(newEmail);
  res.json(newEmail);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});