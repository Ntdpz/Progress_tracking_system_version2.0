// const express = require("express");
// const router = express.Router();
// const connection = require("../db");

// router.get("/test", async (req, res) => {
//   try {
//     return "Hello";
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send();
//   }
// });

// // * GET All FROM systems
// router.get("/getAll", async (req, res) => {
//   try {
//     connection.query("SELECT * FROM systems", (err, results, fields) => {
//       if (err) {
//         console.log(err);
//         return res.status(400).send();
//       }
//       res.status(200).json(results);
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send();
//   }
// });

// //* GET one by id
// router.get("/getOne/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     connection.query(
//       "SELECT * FROM projects WHERE id = ?",
//       [id],
//       (err, results, fields) => {
//         if (err) {
//           console.log(err);
//           return res.status(400).send();
//         }
//         res.status(200).json(results);
//       }
//     );
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send();
//   }
// });

// // * POST FROM projects
// router.post("/createProject", async (req, res) => {
//   const {
//     project_id,
//     project_name,
//     project_shortname,
//     project_agency,
//     project_start,
//     project_end,
//   } = req.body;
//   try {
//     connection.query(
//       "INSERT INTO projects(project_id, project_name, project_shortname ,project_agency, project_start, project_end) VALUES(?, ?, ? ,? ,?,?)",
//       [
//         project_id,
//         project_name,
//         project_shortname,
//         project_agency,
//         project_start,
//         project_end,
//       ],
//       (err, results, fields) => {
//         if (err) {
//           console.log("Error while inserting a project into the database", err);
//           return res.status(400).send();
//         }
//         return res
//           .status(201)
//           .json({ message: "New project successfully created!" });
//       }
//     );
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send();
//   }
// });

// router.put("/updateProject/:id", async (req, res) => {
//   const id = req.params.id;
//   const {
//     project_id,
//     project_name,
//     project_shortname,
//     project_agency,
//     project_start,
//     project_end,
//   } = req.body;
//   try {
//     connection.query(
//       "UPDATE projects SET project_id = ?, project_name = ?, project_shortname = ?, project_agency = ?, project_start = ?, project_end = ? WHERE id = ?",
//       [
//         project_id,
//         project_name,
//         project_shortname,
//         project_agency,
//         project_start,
//         project_end,
//         id,
//       ],
//       (err, results, fields) => {
//         if (err) {
//           console.log(err);
//           return res.status(400).send();
//         }
//         res.status(200).json({ message: "Project updated successfully!" });
//       }
//     );
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send();
//   }
// });

// //* DELETE user by ID
// router.delete("/delete/:id", async (req, res) => {
//   const id = req.params.id;

//   try {
//     connection.query(
//       "DELETE FROM projects WHERE id = ?",
//       [id],
//       (err, results, fields) => {
//         if (err) {
//           console.log(err);
//           return res.status(400).send();
//         }
//         if (results.affectedRows === 0) {
//           return res.status(404).json({ message: "No project with that id!" });
//         }
//         return res
//           .status(200)
//           .json({ message: "Project deleted successfully!" });
//       }
//     );
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send();
//   }
// });

// module.exports = router;
