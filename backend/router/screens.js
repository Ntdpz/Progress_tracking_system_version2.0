const express = require("express");
const router = express.Router();
const connection = require("../db");

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
    connection.query("SELECT * FROM screens", (err, results, fields) => {
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

// * POST FROM screens
router.post("/createScreen", async (req, res) => {
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
  try {
    connection.query(
      "INSERT INTO screens(system_id,project_id,screen_id,screen_name,screen_developer,screen_implementer,screen_status,screen_level,screen_start,screen_end,screen_manday) VALUES(?, ?, ? ,? ,?,?,?,?,?,?,?)",
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

router.put("/updateScreen/:id", async (req, res) => {
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
    try {
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
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  });

//* DELETE screen by ID
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    connection.query(
      "DELETE FROM screens WHERE id = ?",
      [id],
      (err, results, fields) => {
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
