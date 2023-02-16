const express = require('express');
const router = express.Router();
const connection = require('../db'); // Import the connection object

// * GET All FROM users
router.get('/getAll', async (req, res) => {
  try {
    connection.query('SELECT * FROM users', (err, results, fields) => {
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
    id,
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
      "INSERT INTO users(user_fristname, user_lastname, user_id , user_position , user_department , user_email , user_password , user_status ,user_role , user_pic ) VALUES(?, ?, ? ,? , ?, ?, ?, ?, ?, ?)",
      [
        id,
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

module.exports = router;