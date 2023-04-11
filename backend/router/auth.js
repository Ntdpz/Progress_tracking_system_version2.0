const express = require("express");
const router = express.Router();
const db = require("../db");
const mysql = require("mysql");

const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const options = {
  host: "localhost",
  user: "root",
  password: "",
  database: "notemanagement_db",
};

const sessionStore = new MySQLStore(options); // create a new session store

router.use(
  session({
    secret: "your-secret-key",
    store: sessionStore, // use the session store here
    resave: false,
    saveUninitialized: false,
  })
);

const cookieParser = require("cookie-parser");
router.use(cookieParser());

router.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Check if the username and password are correct
  // Query the database to find the user
  const query = `SELECT * FROM users WHERE user_id = '${username}' AND user_password = '${password}'`;
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred" });
    } else if (results.length === 0) {
      res.status(401).json({ message: "Invalid username or password" });
    } else {
      // Set the user ID in the session
      req.session.userId = results[0].id;

      // Return the user's id and username
      const user = {
        id: results[0].id,
        username: results[0].username,
      };
      res.status(200).json({ message: "Login successful", user });
    }
  });
});

router.get("/api/me", (req, res) => {
  if (req.session && req.session.userId) {
    const query = `SELECT * FROM users WHERE id = ${req.session.userId}`;
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred" });
      } else if (results.length === 0) {
        res.status(401).json({ message: "Unauthorized" });
      } else {
        const user = {
          id: results[0].id,
          username: results[0].username,
        };

        res.status(200).json({ user });
      }
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

router.post("/api/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.status(500).json({ message: "Error logging out." });
    } else {
      res.json({});
    }
  });
});

module.exports = router;
