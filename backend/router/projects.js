const express = require("express");
const router = express.Router();
const connection = require("../db");

function generateId() {
  const maxId = 999999999;
  const minId = 100000000;
  const id = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
  return id;
}

//* GET All FROM projects
router.get("/getAll", async (req, res) => {
  try {
    const projectIdFilter = req.query.project_id;
    let query = `
      SELECT 
        projects.*,
        COUNT(DISTINCT Systems.id) AS system_count,
        AVG(Systems.system_progress) AS project_progress,
        DATE_FORMAT(MIN(Systems.system_plan_start), '%Y-%m-%d') AS project_plan_start,
        DATE_FORMAT(MAX(Systems.system_plan_end), '%Y-%m-%d') AS project_plan_end,
        DATEDIFF(MAX(Systems.system_plan_end), MIN(Systems.system_plan_start)) AS project_manday
      FROM 
        projects 
      LEFT JOIN Systems ON projects.id = Systems.project_id`;

    const queryParams = [];

    if (projectIdFilter) {
      query += " WHERE projects.id = ?";
      queryParams.push(projectIdFilter);
    }

    query += " GROUP BY projects.id";

    connection.query(query, queryParams, async (err, results, fields) => {
      if (err) {
        console.log(err);
        return res.status(500).send();
      }

      // Filter out deleted projects
      const filteredResults = results.filter(project => !project.is_deleted);

      // Update project data in the database
      for (const project of filteredResults) {
        const updatedProject = await updateProject(project);
        Object.assign(project, updatedProject);
      }

      res.status(200).json(filteredResults);
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
      `
      SELECT 
        projects.*,
        COUNT(DISTINCT Systems.id) AS system_count,
        AVG(Systems.system_progress) AS project_progress,
        DATE_FORMAT(MIN(Systems.system_plan_start), '%Y-%m-%d') AS project_plan_start,
        DATE_FORMAT(MAX(Systems.system_plan_end), '%Y-%m-%d') AS project_plan_end,
        DATEDIFF(MAX(Systems.system_plan_end), MIN(Systems.system_plan_start)) AS project_manday
      FROM 
        projects 
      LEFT JOIN Systems ON projects.id = Systems.project_id
      WHERE projects.id = ?
      GROUP BY projects.id
      `,
      [id],
      async (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        if (results.length === 0) {
          res.status(404).json({ error: 'Project not found' });
        } else {
          // Check if project is deleted
          if (results[0].is_deleted) {
            res.status(404).json({ error: 'Project not found' });
          } else {
            // Update project data in the database
            const updatedProject = await updateProject(results[0]);
            res.status(200).json(updatedProject);
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});


async function updateProject(project) {
  try {
    // Query to update project data
    const updateQuery = `
      UPDATE projects 
      SET 
        project_progress = ?,
        system_count = ?,
        project_plan_start = ?,
        project_plan_end = ?,
        project_manday = ?
      WHERE id = ?
    `;

    // Calculate new values for project fields
    const project_progress = project.project_progress;
    const system_count = project.system_count;
    const project_plan_start = project.project_plan_start;
    const project_plan_end = project.project_plan_end;
    const project_manday = project.project_manday;

    // Execute the update query
    await new Promise((resolve, reject) => {
      connection.query(
        updateQuery,
        [project_progress, system_count, project_plan_start, project_plan_end, project_manday, project.id],
        (err, result) => {
          if (err) reject(err);
          resolve(project);
        }
      );
    });

    return project;
  } catch (error) {
    throw error;
  }
}
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
    // ดึงข้อมูลโปรเจคก่อนหน้าที่มีการแก้ไข
    const previousProjectData = await new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM projects WHERE id = ?",
        [id],
        (err, results, fields) => {
          if (err) reject(err);
          resolve(results[0]);
        }
      );
    });

    // ตรวจสอบว่ามีการส่งข้อมูลการแก้ไขไหม
    if (!project_id && !project_name_TH && !project_name_ENG) {
      // ถ้าไม่มีข้อมูลการแก้ไข ส่งข้อมูลเดิมกลับไปยังฐานข้อมูล
      return res.status(200).json(previousProjectData);
    }

    // มีการส่งข้อมูลการแก้ไข
    connection.query(
      "UPDATE projects SET project_id = ?, project_name_TH = ?, project_name_ENG = ? WHERE id = ?",
      [
        project_id || req.body.project_id || previousProjectData.project_id, // ถ้าไม่มีการส่ง project_id ให้ใช้ค่าเดิม
        project_name_TH || req.body.project_name_TH || previousProjectData.project_name_TH, // ถ้าไม่มีการส่ง project_name_TH ให้ใช้ค่าเดิม
        project_name_ENG || req.body.project_name_ENG || previousProjectData.project_name_ENG, // ถ้าไม่มีการส่ง project_name_ENG ให้ใช้ค่าเดิม
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

// DELETE project by ID
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // Soft delete the project by setting is_deleted flag to true
    connection.query(
      "UPDATE projects SET is_deleted = true WHERE id = ?",
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
