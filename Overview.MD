# Overview

This document provides an introduction to several essential web development concepts, including cookies, sessions, JSON Web Tokens (JWT), authentication vs. authorization, and middleware. Examples with Node.js and Express are provided for each concept.

---

## 1. Cookies

### What are cookies?
Cookies are small pieces of data stored in a user's browser. They help websites remember things like:
- Login status
- Preferences
- Cart items

### How do they work?
1. A server sends a cookie to the browser when the user visits a website.
2. The browser stores it.
3. On future visits, the browser sends the cookie back to the server.

### Example: Working with cookies in Express
```javascript
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

// Set a cookie
app.get('/set-cookie', (req, res) => {
  res.cookie('username', 'Gourab');
  res.send('Cookie set!');
});

// Get a cookie
app.get('/get-cookie', (req, res) => {
  const username = req.cookies.username;
  res.send(`Hello, ${username}`);
});
```

---

## 2. Session

### What is a session?
A session stores user information on the server for the duration of a user's interaction with a website. Unlike cookies, session data remains on the server.

### How does it work?
1. When a user logs in, a session is created with a unique session ID.
2. The session ID is sent to the user's browser as a cookie.
3. The server uses the session ID to retrieve stored session data.

### Example: Working with sessions in Express
```javascript
const express = require('express');
const session = require('express-session');

const app = express();
app.use(
  session({
    secret: 'secret-key', // Used to encrypt the session ID
    resave: false,
    saveUninitialized: true,
  })
);

// Set a session
app.get('/set-session', (req, res) => {
  req.session.username = 'Gourab';
  res.send('Session set!');
});

// Get a session
app.get('/get-session', (req, res) => {
  res.send(`Hello, ${req.session.username}`);
});
```

---

## 3. JWT (JSON Web Token)

### What is a JWT?
JWT is a token-based authentication method. It’s a string containing encoded data (e.g., user information) used to verify a user's identity.

### How does it work?
1. A user logs in, and the server generates a JWT.
2. The server sends the JWT to the user.
3. The user includes the JWT in future requests (e.g., in headers).
4. The server verifies the JWT to check if the user is authenticated.

### Example: Working with JWT in Node.js
```javascript
const jwt = require('jsonwebtoken');

const secretKey = 'mysecret';

// Create a token
const token = jwt.sign({ username: 'Gourab' }, secretKey, { expiresIn: '1h' });
console.log('Token:', token);

// Verify a token
const decoded = jwt.verify(token, secretKey);
console.log('Decoded:', decoded);
```

---

## 4. Authentication vs Authorization

### Authentication
Authentication is the process of verifying a user's identity.
- Example: Logging in with a username and password.

### Authorization
Authorization determines what actions a user is allowed to perform.
- Example: A regular user can view content, but only an admin can delete it.

### How they work together
1. A user is authenticated (e.g., logs in with correct credentials).
2. Based on their role (user/admin), they are authorized to perform specific actions.

---

## 5. Middleware

### What is middleware?
Middleware is a function that runs between a request and a response. It can:
- Modify the request/response.
- Stop the request from reaching further.
- Execute additional code.

### Example: Middleware in Express
```javascript
const express = require('express');
const app = express();

// Middleware function
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Pass to the next middleware/route handler
};

app.use(logger);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(3000);
```

---

This guide introduces key concepts for handling user data and requests in web development. For further details, refer to the official documentation of the respective libraries or frameworks.

