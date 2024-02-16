const express = require("express");
const router = express.Router();
const connection = require("../db");

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
    project_name_TH,
    project_name_ENG,
  } = req.body;

  const id = generateId(); // สร้าง ID โดยใช้ฟังก์ชัน generateId()

  try {
    connection.query(
      "INSERT INTO projects (id, project_id, project_name_TH, project_name_ENG) VALUES (?, ?, ?, ?)",
      [
        id,
        project_id,
        project_name_TH,
        project_name_ENG,
      ],
      (err, results, fields) => {
        if (err) {
          console.log("Error while inserting a project into the database", err);
          return res.status(400).send();
        }
        return res.status(201).json({ message: "New project successfully created!" });
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
    project_name_TH,
    project_name_ENG,
  } = req.body;

  try {
    connection.query(
      "UPDATE projects SET project_id = ?, project_name_TH = ?, project_name_ENG = ? WHERE id = ?",
      [
        project_id,
        project_name_TH,
        project_name_ENG,
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
    // ลบข้อมูลที่เกี่ยวข้องในตาราง history_issues
    connection.query(
      "DELETE FROM history_issues WHERE project_id = ?",
      [id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(500).send();
        }
        // ลบข้อมูลที่เกี่ยวข้องในตาราง issues
        connection.query(
          "DELETE FROM issues WHERE project_id = ?",
          [id],
          (err, results, fields) => {
            if (err) {
              console.log(err);
              return res.status(500).send();
            }
            // ลบข้อมูลที่เกี่ยวข้องในตาราง screens
            connection.query(
              "DELETE FROM screens WHERE project_id = ?",
              [id],
              (err, results, fields) => {
                if (err) {
                  console.log(err);
                  return res.status(500).send();
                }
                // ลบข้อมูลที่เกี่ยวข้องในตาราง systems
                connection.query(
                  "DELETE FROM systems WHERE project_id = ?",
                  [id],
                  (err, results, fields) => {
                    if (err) {
                      console.log(err);
                      return res.status(500).send();
                    }
                    // ลบข้อมูลที่เกี่ยวข้องในตาราง user_projects
                    connection.query(
                      "DELETE FROM user_projects WHERE project_id = ?",
                      [id],
                      (err, results, fields) => {
                        if (err) {
                          console.log(err);
                          return res.status(500).send();
                        }
                        // เมื่อลบข้อมูลที่เกี่ยวข้องในตารางทุกตารางเรียบร้อยแล้ว ลบโครงการที่มี id ตรงกันในตารางโครงการ
                        connection.query(
                          "DELETE FROM projects WHERE id = ?",
                          [id],
                          (err, results, fields) => {
                            if (err) {
                              console.log(err);
                              return res.status(500).send();
                            }
                            if (results.affectedRows === 0) {
                              return res.status(404).json({ message: "No project with that id!" });
                            }
                            return res.status(200).json({ message: "Project deleted successfully!" });
                          }
                        );
                      }
                    );
                  }
                );
              }
            );
          }
        );
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
