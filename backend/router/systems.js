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

function generateId() {
  const maxId = 999999999;
  const minId = 100000000;
  const id = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
  return id;
}

// * GET All FROM systems
router.get("/getAll", async (req, res) => {
  try {
    const systemIdFilter = req.query.system_id;
    const projectFilter = req.query.project_id;
    let query = "SELECT * FROM systems";
    const queryParams = [];
    if (projectFilter) {
      query += " WHERE project_id = ?";
      queryParams.push(projectFilter);
    } else if (systemIdFilter) {
      query += " WHERE system_id = ?";
      queryParams.push(systemIdFilter);
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
      "SELECT * FROM systems WHERE id = ?",
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

// * POST FROM systems
router.post("/createSystem", async (req, res) => {
  const {
    project_id,
    system_id,
    system_nameTH,
    system_nameEN,
    system_shortname,
    system_member,
  } = req.body;
  const id = generateId();
  try {
    connection.query(
      "INSERT INTO systems(id, project_id,system_id,system_nameTH,system_nameEN,system_shortname,system_member) VALUES(?, ?, ?, ? ,? ,?,?)",
      [
        id,
        project_id,
        system_id,
        system_nameTH,
        system_nameEN,
        system_shortname,
        system_member,
      ],
      (err, results, fields) => {
        if (err) {
          console.log("Error while inserting a systems into the database", err);
          return res.status(400).send();
        }
        return res
          .status(201)
          .json({ message: "New systems successfully created!" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

router.put("/updateSystem/:id", async (req, res) => {
  const id = req.params.id;
  const {
    project_id,
    system_id,
    system_nameTH,
    system_nameEN,
    system_shortname,
    system_member,
  } = req.body;
  try {
    connection.query(
      "UPDATE systems SET project_id = ?, system_id = ?,system_nameTH = ?,system_nameEN = ?,system_shortname = ?,system_member = ? WHERE id = ?",
      [
        project_id,
        system_id,
        system_nameTH,
        system_nameEN,
        system_shortname,
        system_member,
        id,
      ],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        res.status(200).json({ message: "System updated successfully!" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

//* DELETE system by ID
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    connection.query(
      "DELETE FROM systems WHERE id = ?",
      [id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: "No system with that id!" });
        }
        return res
          .status(200)
          .json({ message: "System deleted successfully!" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

router.post("/addUserSystem", async (req, res) => {
  const { user_id, system_ids } = req.body;
  try {
    const createUserSystemMappings = async (user_id, system_ids) => {
      // Check that system_ids is an array
      if (!Array.isArray(system_ids)) {
        console.log("Error: system_ids is not an array");
        return res.status(400).send("system_ids must be an array");
      }

      // Map over the system IDs and insert a new row into the user_systems table for each one
      for (const system_id of system_ids) {
        try {
          await connection.query(
            "INSERT INTO user_systems (user_id, system_id) VALUES (?, ?)",
            [user_id, system_id]
          );
        } catch (error) {
          console.log(
            `Error while creating user-system mapping for user ${user_id} and system ${system_id}`,
            error
          );
          return res
            .status(500)
            .send(
              `Error while creating user-system mapping for user ${user_id} and system ${system_id}`
            );
        }
      }

      return res.status(200).send("User-system mappings created successfully");
    };
    await createUserSystemMappings(user_id, system_ids);
  } catch (err) {
    console.log("Error while creating user-system mappings", err);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
