const express = require("express");
const router = express.Router();
const connection = require("../db"); // Import the connection object

// * GET All FROM users and query user_position
router.get("/getAll", async (req, res) => {
  try {
    const positionFilter = req.query.user_position; // get the value of the 'user_position' query parameter
    const idFilter = req.query.user_id; // get the value of the 'user_position' query parameter
    let query = "SELECT * FROM users";
    const queryParams = [];
    if (positionFilter) {
      query += " WHERE user_position = ?";
      queryParams.push(positionFilter);
    } else if (idFilter) {
      query += " WHERE user_id = ?";
      queryParams.push(idFilter);
    }
    connection.query(query, queryParams, (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.status(400).send();
      }
      res.status(200).json(results);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

//* GET one by id
router.get("/getOne/:id", async (req, res) => {
  const id = req.params.id;
  try {
    connection.query(
      "SELECT * FROM users WHERE id = ?",
      [id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        res.status(200).json(results);
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

//* POST user
router.post("/create", async (req, res) => {
  const {
    user_firstname,
    user_lastname,
    user_id,
    user_code,
    user_position,
    user_department,
    user_email,
    user_password,
    user_status,
    user_role,
    user_pic,
  } = req.body;
  try {
    connection.query(
      "INSERT INTO users(user_firstname, user_lastname, user_id , user_code, user_position , user_department , user_email , user_password , user_status ,user_role , user_pic ) VALUES(?, ?, ? ,?, ? , ?, ?, ?, ?, ?, ?)",
      [
        user_firstname,
        user_lastname,
        user_id,
        user_code,
        user_position,
        user_department,
        user_email,
        user_password,
        user_status,
        user_role,
        user_pic,
      ],
      (err, results, fields) => {
        if (err) {
          console.log("Error while inserting a user into the database", err);
          return res.status(400).send();
        }
        return res
          .status(201)
          .json({ message: "New user successfully created!" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

//* PUT update
router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const {
    user_fristname,
    user_lastname,
    user_id,
    user_position,
    user_department,
    user_email,
    user_password,
    user_status,
    user_role,
    user_pic,
  } = req.body;

  try {
    connection.query(
      "UPDATE users SET user_fristname = ? , user_lastname = ? , user_id = ? , user_position = ? , user_department = ? ,user_email = ? ,user_password = ? ,user_status = ?,user_role = ?, user_pic = ? WHERE id = ?",
      [
        user_fristname,
        user_lastname,
        user_id,
        user_position,
        user_department,
        user_email,
        user_password,
        user_status,
        user_role,
        user_pic,
        id,
      ],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        res.status(200).json({ message: "User updated successfully!" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

//* DELETE user by ID
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    connection.query(
      "DELETE FROM users WHERE id = ?",
      [id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: "No user with that id!" });
        }
        return res.status(200).json({ message: "User deleted successfully!" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

router.post("/login", async (req, res) => {
  const { user_id, user_password } = req.body;

  try {
    connection.query(
      "SELECT * FROM users WHERE user_id = ? AND user_password = ?",
      [user_id, user_password],
      (error, results, fields) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Server error" });
        }

        if (results.length > 0) {
          req.session.authenticated = true;
          return res.status(200).json({ authenticated: true });
        }

        return res.status(401).json({ message: "Invalid credentials" });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
