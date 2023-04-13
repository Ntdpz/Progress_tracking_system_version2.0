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

// * GET All FROM projects
router.get("/getAll", async (req, res) => {
  try {
    const projectIdFilter = req.query.project_id;
    let query = "SELECT * FROM projects";
    const queryParams = [];
    if (projectIdFilter) {
      query += " WHERE project_id = ?";
      queryParams.push(projectIdFilter);
    }
    connection.query(query, queryParams, (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.status(500).send();
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
      "SELECT * FROM projects WHERE id = ?",
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

// * POST FROM projects
router.post("/createProject", async (req, res) => {
  const {
    project_id,
    project_name,
    project_shortname,
    project_agency,
    project_start,
    project_end,
  } = req.body;
  const id = generateId();
  try {
    connection.query(
      "INSERT INTO projects(id,project_id, project_name, project_shortname ,project_agency, project_start, project_end) VALUES(?,?, ?, ? ,? ,?,?)",
      [
        id,
        project_id,
        project_name,
        project_shortname,
        project_agency,
        project_start,
        project_end,
      ],
      (err, results, fields) => {
        if (err) {
          console.log("Error while inserting a project into the database", err);
          return res.status(400).send();
        }
        return res
          .status(201)
          .json({ message: "New project successfully created!" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

router.put("/updateProject/:id", async (req, res) => {
  const id = req.params.id;
  const {
    project_id,
    project_name,
    project_shortname,
    project_agency,
    project_start,
    project_end,
  } = req.body;
  try {
    connection.query(
      "UPDATE projects SET project_id = ?, project_name = ?, project_shortname = ?, project_agency = ?, project_start = ?, project_end = ? WHERE id = ?",
      [
        project_id,
        project_name,
        project_shortname,
        project_agency,
        project_start,
        project_end,
        id,
      ],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        res.status(200).json({ message: "Project updated successfully!" });
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
      "DELETE FROM projects WHERE id = ?",
      [id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: "No project with that id!" });
        }
        return res
          .status(200)
          .json({ message: "Project deleted successfully!" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

router.post("/addUserProject", async (req, res) => {
  const { user_id, project_ids } = req.body;
  try {
    const createUserProjects = (user_id, project_ids) => {
      // Check that project_ids is an array
      if (!Array.isArray(project_ids)) {
        console.log("Error: project_ids is not an array");
        return;
      }

      // http://localhost:7777/projects/addUserProject
      //   {
      //     "user_id": 15, //user_id
      //     "project_ids": [1] //project_id in array
      // }

      // Map over the project IDs and insert a new row into the user_projects table for each one
      project_ids.map((project_id) => {
        connection.query(
          "INSERT INTO user_projects (user_id, project_id) VALUES (?, ?)",
          [user_id, project_id],
          (error, results, fields) => {
            if (error) {
              console.log(
                `Error while creating user-project mapping for user ${user_id} and project ${project_id}`,
                error
              );
            }
          }
        );
      });
    };
    createUserProjects(user_id, project_ids);
    return res.status(200).send("User-project mappings created successfully");
  } catch (err) {
    console.log("Error while creating user-project mappings", err);
    return res.status(500).send();
  }
});

module.exports = router;
