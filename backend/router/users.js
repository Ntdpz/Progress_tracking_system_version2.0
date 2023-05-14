const express = require("express");
const router = express.Router();
const connection = require("../db"); // Import the connection object
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "../frontend/static/uploads/");
  },
  filename(req, file, cb) {
    const originalname = file.originalname;
    const filename =
      uuid.v4() +
      "-" +
      Date.now() +
      "-" +
      originalname.substring(originalname.lastIndexOf("/") + 1);
    cb(null, filename);
  },
});

const upload = multer({ storage });
const defaultName = "../frontend/static/uploads/DefaultAvatar.jpg";
const defaultImage = defaultName.substring(defaultName.lastIndexOf("/") + 1);

function generateId() {
  const maxId = 999999999;
  const minId = 100000000;
  const id = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
  return id;
}

// * post user + image
router.post("/createUser", upload.single("image"), (req, res) => {
  const {
    user_firstname,
    user_lastname,
    user_id,
    user_position,
    user_department,
    user_email,
    user_password,
    user_status,
    user_role,
  } = req.body;

  const user_pic = req.file
    ? req.file.filename
    : defaultImage;

  const id = generateId();

  // if (!req.file) {
  //   const targetPath = path.join("../frontend/static/uploads/", user_pic);
  //   fs.copyFileSync("../frontend/defaultimage/Avatar.jpg", targetPath);
  // }

  const sql = `INSERT INTO users(id,user_firstname, user_lastname, user_id, user_position , user_department , user_email , user_password , user_status ,user_role , user_pic ) VALUES(?,?, ?, ?, ? , ?, ?, ?, ?, ?, ?)`;
  connection.query(
    sql,
    [
      id,
      user_firstname,
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
    (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        console.log(`Inserted ${result.affectedRows} row(s)`);
        res.sendStatus(200);
      }
    }
  );
});

// * Edit user + image
// PUT update user information and profile picture
router.put("/updateUsers/:id/image", upload.single("image"), (req, res) => {
  const id = req.params.id;
  const {
    user_firstname,
    user_lastname,
    user_id,
    user_position,
    user_department,
    user_email,
    user_password,
    user_status,
    user_role,
  } = req.body;
  const user_pic = req.file ? req.file.filename : null;

  try {
    let sql;
    let values;
    let deletePath = null; // Initialize the deletePath variable to null

    if (user_pic) {
      // Get the current profile picture path of the user
      connection.query(
        `SELECT user_pic FROM users WHERE id = ?`,
        [id],
        (err, results, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).send(err);
          }
          // If the user already has a profile picture, delete it
          if (
            results[0].user_pic ===
            "DefaultAvatar.jpg"
          ) {
            console.log("it is save!");
          } else if (results[0].user_pic !=
            "DefaultAvatar.jpg" && results[0].user_pic) {
            deletePath = "../frontend/static/uploads/" + results[0].user_pic;
            fs.unlink(deletePath, (err) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log("Old profile picture deleted" + results[0].user_pic)
            });
          }
          // if (results[0].user_pic) {
          //   deletePath = "../frontend/static/uploads/" + results[0].user_pic;
          //   fs.unlink(deletePath, (err) => {
          //     if (err) {
          //       console.error(err);
          //       return;
          //     }
          //     console.log("Old profile picture deleted!");
          //   });
          // }
          // Update user with new image
          sql = `UPDATE users SET 
              user_firstname = ?,
              user_lastname = ?,
              user_id = ?,
              user_position = ?,
              user_department = ?,
              user_email = ?,
              user_password = ?,
              user_status = ?,
              user_role = ?,
              user_pic = ?
            WHERE id = ?`;
          values = [
            user_firstname,
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
          ];
          connection.query(sql, values, (err, results, fields) => {
            if (err) {
              console.log(err);
              return res.status(400).send(err);
            }
            res.status(200).json({ message: "User updated successfully!" });
          });
        }
      );
    } else {
      // Update user without changing the image
      sql = `UPDATE users SET 
              user_firstname = ?,
              user_lastname = ?,
              user_id = ?,
              user_position = ?,
              user_department = ?,
              user_email = ?,
              user_password = ?,
              user_status = ?,
              user_role = ?
            WHERE id = ?`;
      values = [
        user_firstname,
        user_lastname,
        user_id,
        user_position,
        user_department,
        user_email,
        user_password,
        user_status,
        user_role,
        id,
      ];
      connection.query(sql, values, (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send(err);
        }
        res.status(200).json({ message: "User updated successfully!" });
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

//*delete images
// Route to handle DELETE requests to /api/images/:id
router.delete("/api/images/:id", (req, res) => {
  const id = req.params.id;
  const deletePath = null
  // Get the image path from the database
  const sql = `SELECT imagePath FROM mytable WHERE id = ${id}`;
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.log(`Error retrieving image path from database: ${error}`);
      res
        .status(500)
        .send(`Error retrieving image path from database: ${error}`);
      return;
    }

    if (results.length === 0) {
      console.log(`Image with ID ${id} not found in database.`);
      res.status(404).send(`Image with ID ${id} not found in database.`);
      return;
    }

    const imagePath = results[0].imagePath;
    if (imagePath === "DefaultAvatar.jpg") {
      console.log("it is save!");
    }
    else if (imagePath != "DefaultAvatar.jpg") {
      deletePath = "../frontend/static/uploads/" + imagePath;
      fs.unlink(deletePath, (err) => {
        if (err) {
          console.log(`Error deleting image file: ${err}`);
          res.status(500).send(`Error deleting image file: ${err}`);
          return;
        }
        console.log(`Image file ${deletePath} deleted successfully.`);


      });
    }
    // Delete database entry
    const deleteSql = `DELETE FROM mytable WHERE id = ${id}`;
    connection.query(deleteSql, (error, results, fields) => {
      if (error) {
        console.log(`Error deleting image record from database: ${error}`);
        res
          .status(500)
          .send(`Error deleting image record from database: ${error}`);
        return;
      }
      console.log(`Database entry with id ${id} deleted successfully.`);
      res.status(200).send(`Image with ID ${id} deleted successfully.`);
    });
    // Delete image file from server
    // fs.unlink(imagePath, (err) => {
    //   if (err) {
    //     console.log(`Error deleting image file: ${err}`);
    //     res.status(500).send(`Error deleting image file: ${err}`);
    //     return;
    //   }
    //   console.log(`Image file ${imagePath} deleted successfully.`);


    //   const deleteSql = `DELETE FROM mytable WHERE id = ${id}`;
    //   connection.query(deleteSql, (error, results, fields) => {
    //     if (error) {
    //       console.log(`Error deleting image record from database: ${error}`);
    //       res
    //         .status(500)
    //         .send(`Error deleting image record from database: ${error}`);
    //       return;
    //     }
    //     console.log(`Database entry with id ${id} deleted successfully.`);
    //     res.status(200).send(`Image with ID ${id} deleted successfully.`);
    //   });
    // });
  });
});

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
      "INSERT INTO users(user_firstname, user_lastname, user_id, user_position , user_department , user_email , user_password , user_status ,user_role , user_pic ) VALUES(?, ?, ?, ? , ?, ?, ?, ?, ?, ?)",
      [
        user_firstname,
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
    user_firstname,
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
      "UPDATE users SET user_firstname = ? , user_lastname = ? , user_id = ? , user_position = ? , user_department = ? ,user_email = ? ,user_password = ? ,user_status = ?,user_role = ?, user_pic = ? WHERE id = ?",
      [
        user_firstname,
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

//*delete user + image by ID
router.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;

  // Get the image path from the database
  const sql = `SELECT user_pic FROM users WHERE id = ${id}`;
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.log(`Error retrieving image path from database: ${error}`);
      res.status(500).send(`Error retrieving image path from database: ${error}`);
      return;
    }

    if (results.length === 0) {
      console.log(`Image with ID ${id} not found in database.`);
      res.status(404).send(`Image with ID ${id} not found in database.`);
      return;
    }

    const imagePath = "../frontend/static/uploads/" + results[0].user_pic;

    // Check if the image name is not equal to "DefaultAvatar.jpg"
    if (results[0].user_pic !== "DefaultAvatar.jpg") {
    // Delete image file from server
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.log(`Error deleting image file: ${err}`);
          res.status(500).send(`Error deleting image file: ${err}`);
          return;
        }
        console.log(`Image file ${imagePath} deleted successfully.`);
      });
    }

    // Delete database entry
    const deleteSql = `DELETE FROM users WHERE id = ${id}`;
    connection.query(deleteSql, (error, results2, fields) => {
      if (error) {
        console.log(`Error deleting image record from database: ${error}`);
        res.status(500).send(`Error deleting image record from database: ${error}`);
        return;
      }
      if (res.statusCode === 200 && results[0].user_pic !== "DefaultAvatar.jpg") {
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.log(`Error deleting image file: ${err}`);
              res.status(500).send(`Error deleting image file: ${err}`);
              return;
            }
            console.log(`Image file ${imagePath} deleted successfully.`);
          });
      }
      console.log(`Database entry with id ${id} deleted successfully.`);
      res.status(200).send(`Image with ID ${id} deleted successfully.`);
    });
  });
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
