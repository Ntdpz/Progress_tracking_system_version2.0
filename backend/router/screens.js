const express = require("express");
const router = express.Router();
const connection = require("../db");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const crypto = require("crypto");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "../frontend/screenImages/");
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
const defaultName = "../frontend/screenImages/DefaultScreen.jpg";
const defaultImage = defaultName.substring(defaultName.lastIndexOf("/") + 1);

function generateId() {
  const maxId = 999999999;
  const minId = 100000000;
  const id = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
  return id;
}

// * POST FROM screens
router.post("/createScreen", upload.single("image"), (req, res) => {
  const {
    system_id,
    project_id,
    screen_id,
    screen_name,
    screen_developer,
    screen_implementer,
    screen_status,
    screen_level,
    screen_start,
    screen_end,
    screen_manday,
  } = req.body;

  const screen_pic = req.file ? req.file.filename : defaultImage;
  const id = generateId();
  try {
    connection.query(
      "INSERT INTO screens(id,system_id,project_id,screen_id,screen_name,screen_developer,screen_implementer,screen_status,screen_level,screen_start,screen_end,screen_manday,screen_pic) VALUES(?,?, ?, ? ,? ,?,?,?,?,?,?,?,?)",
      [
        id,
        system_id,
        project_id,
        screen_id,
        screen_name,
        screen_developer,
        screen_implementer,
        screen_status,
        screen_level,
        screen_start,
        screen_end,
        screen_manday,
        screen_pic,
      ],
      (err, results, fields) => {
        if (err) {
          console.log("Error while inserting a screen into the database", err);
          return res.status(400).send();
        }
        return res
          .status(201)
          .json({ message: "New screen successfully created!" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

// router.put("/updateScreen/:id/image", upload.single("image"), (req, res) => {
//   const id = req.params.id;
//   const {
//     system_id,
//     project_id,
//     screen_id,
//     screen_name,
//     screen_developer,
//     screen_implementer,
//     screen_status,
//     screen_level,
//     screen_start,
//     screen_end,
//     screen_manday,
//   } = req.body;
//   const screen_pic = req.file ? req.file.filename : null;
//   try {
//     let sql;
//     let values;
//     let deletePath = null;

//     if (screen_pic) {
//       connection.query(
//         `SELECT screen_pic FROM screens WHERE id = ?`,
//         [id],
//         (err, results, fields) => {
//           if (err) {
//             console.log(err);
//             return res.status(400).send(err);
//           }
//           if (results[0].screen.pic === "DefaultScreen.jpg") {
//             console.log("Save");
//           } else if (results[0].screen_pic != "DefaultScreen.jpg" && results[0].screen_pic) {
//             deletePath = "../frontend/screenImages/" + results[0].screen_pic;
//             fs.unlink(deletePath, (err) => {
//               if (err) {
//                 console.error(err);
//                 return;
//               }
//               console.log("Old profile picture deleted" + results[0].screen_pic)
//             });
//           }

//           sql = `UPDATE screens SET
//           system_id = ?,
//           project_id = ?,
//           screen_id = ?,
//           screen_name = ?,
//           screen_developer = ?,
//           screen_implementer = ?,
//           screen_status = ?,
//           screen_level = ?,
//           screen_start = ?,
//           screen_end = ?,
//           screen_manday, = ?
//           screen_pic = ?
//           WHERE id = ?`;
//           values = [
//             system_id,
//             project_id,
//             screen_id,
//             screen_name,
//             screen_developer,
//             screen_implementer,
//             screen_status,
//             screen_level,
//             screen_start,
//             screen_end,
//             screen_manday,
//             screen_pic,
//             id,
//           ];
//           connection.query(sql, values, (err, results, fields) => {
//             if (err) {
//               console.log(err);
//               return res.status(400).send(err);
//             }
//             res.status(200).json({ message: "User update successfully!" });
//           });
//         }
//       );
//     } else {
//       connection.query(
//         "UPDATE screens SET system_id = ?, project_id = ?, screen_id = ?, screen_name = ?, screen_developer = ?, screen_implementer = ?, screen_status = ?, screen_level = ?, screen_start = ?, screen_end = ?, screen_manday = ? WHERE id = ?",
//         [
//           system_id,
//           project_id,
//           screen_id,
//           screen_name,
//           screen_developer,
//           screen_implementer,
//           screen_status,
//           screen_level,
//           screen_start,
//           screen_end,
//           screen_manday,
//           id,
//         ],
//         (err, results, fields) => {
//           if (err) {
//             console.log(err);
//             return res.status(400).send();
//           }
//           res.status(200).json({ message: "Screen updated successfully!" });
//         }
//       );
//     }

//   } catch (err) {
//     console.log(err);
//     return res.status(500).send();
//   }
// });

router.put("/updateScreen/:id/image", upload.single("image"), (req, res) => {
  const id = req.params.id;
  const {
    system_id,
    project_id,
    screen_id,
    screen_name,
    screen_developer,
    screen_implementer,
    screen_status,
    screen_level,
    screen_start,
    screen_end,
    screen_manday,
  } = req.body;
  const screen_pic = req.file ? req.file.filename : null;
  try {
    let sql;
    let values;
    let deletePath = null;

    if (screen_pic) {
      connection.query(
        `SELECT screen_pic FROM screens WHERE id = ?`,
        [id],
        (err, results, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).send(err);
          }
          if (results[0].screen_pic === "DefaultScreen.jpg") {
            console.log("Save");
          } else if (
            results[0].screen_pic != "DefaultScreen.jpg" &&
            results[0].screen_pic
          ) {
            deletePath = "../frontend/screenImages/" + results[0].screen_pic;
            fs.unlink(deletePath, (err) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log(
                "Old profile picture deleted" + results[0].screen_pic
              );
            });
          }
          // sql =
          sql = `UPDATE screens SET
          system_id = ?,
          project_id = ?,
          screen_id = ?,
          screen_name = ?,
          screen_developer = ?,
          screen_implementer = ?,
          screen_status = ?,
          screen_level = ?,
          screen_start = ?,
          screen_end = ?,
          screen_manday = ?,
          screen_pic = ?
          WHERE id = ?`;
          values = [
            system_id,
            project_id,
            screen_id,
            screen_name,
            screen_developer,
            screen_implementer,
            screen_status,
            screen_level,
            screen_start,
            screen_end,
            screen_manday,
            screen_pic,
            id,
          ];
          connection.query(sql, values, (err, results, fields) => {
            if (err) {
              console.log(err);
              return res.status(400).send(err);
            }
            res.status(200).json({ message: "User update successfully!" });
          });
        }
      );
    } else {
      connection.query(
        "UPDATE screens SET system_id = ?, project_id = ?, screen_id = ?, screen_name = ?, screen_developer = ?, screen_implementer = ?, screen_status = ?, screen_level = ?, screen_start = ?, screen_end = ?, screen_manday = ? WHERE id = ?",
        [
          system_id,
          project_id,
          screen_id,
          screen_name,
          screen_developer,
          screen_implementer,
          screen_status,
          screen_level,
          screen_start,
          screen_end,
          screen_manday,
          id,
        ],
        (err, results, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).send();
          }
          res.status(200).json({ message: "Screen updated successfully!" });
        }
      );
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

router.get("/test", async (req, res) => {
  try {
    return "Hello";
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

// * GET All FROM screens
router.get("/getAll", async (req, res) => {
  try {
    const systemIDFilter = req.query.system_id;
    const idFilter = req.query.id;
    let query = "SELECT * FROM screens";
    const queryParams = [];
    if (systemIDFilter) {
      query += " WHERE system_id = ?";
      queryParams.push(systemIDFilter);
    } else if (idFilter) {
      query += " WHERE id = ?";
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
      "SELECT * FROM screens WHERE id = ?",
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

//* DELETE screen+image by ID
router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  // get image
  const sql = `SELECT screen_pic FROM screens WHERE id =${id}`;
  connection.query(sql, (err, results, fields) => {
    if (err) {
      console.log(err);
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

    const imagePath = "../frontend/screenImages/" + results[0].screen_pic;

    if (results[0].screen_pic !== "DefaultScreen.jpg") {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.log(`Error deleting image file: ${err}`);
          res.status(500).send(`Error deleting image file: ${err}`);
          return;
        }
        console.log(`Image file ${imagePath} deleted successfully.`);
      });
    }

    const deleteSql = `DELETE FROM screens WHERE id = ${id}`;
    try {
      connection.query(deleteSql, (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: "No screen with that id!" });
        }
        return res
          .status(200)
          .json({ message: "Screen deleted successfully!" });
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  });
});

// *delete screen by system_id
router.delete("/deleteScreen/:system_id", (req, res) => {
  const system_id = req.params.system_id;

  try {
    connection.query(
      `SELECT screen_pic FROM screens WHERE system_id = ?`,
      [system_id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send(err);
        }

        // Delete images from the file system
        results.forEach((result) => {
          if (result.screen_pic && result.screen_pic !== "DefaultScreen.jpg") {
            const deletePath = "../frontend/screenImages/" + result.screen_pic;
            fs.unlink(deletePath, (err) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log("Old profile picture deleted" + result.screen_pic);
            });
          }
        });

        connection.query(
          `DELETE FROM screens WHERE system_id = ?`,
          [system_id],
          (err, results, fields) => {
            if (err) {
              console.log(err);
              return res.status(400).send(err);
            }
            res
              .status(200)
              .json({ message: "Screens deleted successfully!" });
          }
        );
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});


router.post("/addUserScreen", async (req, res) => {
  const { user_id, screen_ids } = req.body;
  try {
    const createUserScreens = (user_id, screen_ids) => {
      // Check that screen_ids is an array
      if (!Array.isArray(screen_ids)) {
        console.log("Error: screen_ids is not an array");
        return;
      }

      // http://localhost:7777/systems/addUserScreen
      //   {
      //     "user_id": 15,
      //     "screen_ids": [1]
      //  }

      // Map over the screen IDs and insert a new row into the user_screens table for each one
      screen_ids.map((screen_id) => {
        connection.query(
          "INSERT INTO user_screens (user_id, screen_id) VALUES (?, ?)",
          [user_id, screen_id],
          (error, results, fields) => {
            if (error) {
              console.log(
                `Error while creating user-screen mapping for user ${user_id} and screen ${screen_id}`,
                error
              );
            }
          }
        );
      });
    };
    createUserScreens(user_id, screen_ids);
    return res.status(200).send("User-screen mappings created successfully");
  } catch (err) {
    console.log("Error while creating user-screen mappings", err);
    return res.status(500).send();
  }
});

module.exports = router;
