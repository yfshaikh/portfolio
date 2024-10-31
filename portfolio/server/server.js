// server.js
import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser';
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true in production with HTTPS
}));
app.use(cors({
    origin: ['https://www.yfshaikh.com', 'http://localhost:5173'],
    credentials: true, // Allow cookies to be sent with requests
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));



app.post('/api/signin', (req, res) => {
  const { username, password } = req.body;
  console.log('request recieved!')

  // Check for valid credentials
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    // Set session data for admin access
    req.session.user = user;
    return res.status(200).json({ message: 'Signed in successfully' });
  }

  return res.status(401).json({ message: 'Invalid username or password' });
});

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next(); // User is authenticated
  }
  return res.status(403).json({ message: 'Unauthorized' });
};

// Example of a protected route
app.get('/api/admin', isAuthenticated, (req, res) => {
  res.status(200).json({ message: 'Welcome to the admin area!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
