const express = require("express");
const router = express.Router();
const connection = require("../db");

function generateId() {
  const maxId = 999999999;
  const minId = 100000000;
  const id = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
  return id;
}

router.get("/test", async (req, res) => {
  try {
    return "Hello";
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

// * GET All FROM issues
router.get("/getAll", async (req, res) => {
  try {
    connection.query("SELECT * FROM issues", (err, results, fields) => {
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
      "SELECT * FROM issues WHERE id = ?",
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

// * POST FROM issues
router.post("/createIssue", async (req, res) => {
  const {
    screen_id,
    system_id,
    project_id,
    issue_name,
    issue_id,
    issue_type,
    issue_informer,
    issue_priority,
    issue_end,
    issue_assign,
    issue_qc,
    issue_des,
    issue_des_sa,
    issue_type_sa,
    issue_doc_id,
    issue_customer,
    issue_filename,
    issue_des_dev,
    issue_des_implementer,
    issue_start,
    issue_expected,
    issue_status,
    issue_accepting,
    issue_manday,
    issue_complete,
  } = req.body;

  try {
    connection.query(
      "INSERT INTO issues (screen_id, system_id, project_id, issue_name, issue_id, issue_type, issue_informer, issue_priority, issue_end, issue_assign, issue_qc, issue_des, issue_des_sa, issue_type_sa, issue_doc_id, issue_customer, issue_filename, issue_des_dev, issue_des_implementer, issue_start, issue_expected, issue_status, issue_accepting, issue_manday, issue_complete) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        screen_id,
        system_id,
        project_id,
        issue_name,
        issue_id,
        issue_type,
        issue_informer,
        issue_priority,
        issue_end,
        issue_assign,
        issue_qc,
        issue_des,
        issue_des_sa,
        issue_type_sa,
        issue_doc_id,
        issue_customer,
        issue_filename,
        issue_des_dev,
        issue_des_implementer,
        issue_start,
        issue_expected,
        issue_status,
        issue_accepting,
        issue_manday,
        issue_complete,
      ],
      (err, results, fields) => {
        if (err) {
          console.log("Error while inserting an issue into the database", err);
          return res.status(400).send();
        }
        return res
          .status(201)
          .json({ message: "New issue successfully created!" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

//* Update issue by dev
router.put("/updateIssueDev/:id", async (req, res) => {
  const id = req.params.id;
  const {
    issue_accepting,
    issue_manday,
    issue_start,
    issue_expected,
    issue_status,
    issue_complete,
    issue_des_dev,
  } = req.body;
  try {
    connection.query(
      "UPDATE issues SET issue_accepting = ?, issue_manday = ?, issue_start = ?, issue_expected = ?, issue_status = ?, issue_complete = ?, issue_des_dev = ? WHERE id = ?",
      [
        issue_accepting,
        issue_manday,
        issue_start,
        issue_expected,
        issue_status,
        issue_complete,
        issue_des_dev,
        id,
      ],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        res.status(200).json({ message: "Issue updated successfully!" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

//* Update issue by implementer
router.put("/updateIssueImplementer/:id", async (req, res) => {
  const id = req.params.id;
  const {
    screen_id,
    issue_name,
    issue_id,
    issue_type,
    issue_informer,
    issue_priority,
    issue_end,
    issue_assign,
    issue_qc,
    issue_des,
    issue_des_sa,
    issue_doc_id,
    issue_customer,
    issue_filename,
    issue_des_implementer,
  } = req.body;
  try {
    connection.query(
      "UPDATE issues SET screen_id = ?, issue_name = ?, issue_id = ?, issue_type = ?, issue_informer = ?, issue_priority = ?, issue_end = ?, issue_assign = ?, issue_qc = ?, issue_des = ?, issue_des_sa = ?, issue_doc_id = ?, issue_customer = ?, issue_filename = ?, issue_des_implementer = ? WHERE id = ?",
      [
        screen_id,
        issue_name,
        issue_id,
        issue_type,
        issue_informer,
        issue_priority,
        issue_end,
        issue_assign,
        issue_qc,
        issue_des,
        issue_des_sa,
        issue_doc_id,
        issue_customer,
        issue_filename,
        issue_des_implementer,
        id,
      ],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        res.status(200).json({ message: "Issue updated successfully!" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

//* DELETE issue by ID
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    connection.query(
      "DELETE FROM issues WHERE id = ?",
      [id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: "No issue with that id!" });
        }
        return res.status(200).json({ message: "System issue successfully!" });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

router.post("/addUserIssue", async (req, res) => {
  const { user_id, issue_ids } = req.body;
  try {
    const createUserIssues = (user_id, issue_ids) => {
      // Check that issue_ids is an array
      if (!Array.isArray(issue_ids)) {
        console.log("Error: issue_ids is not an array");
        return;
      }

      // {
      //     "user_id": 15,
      //     "issue_ids": [1]
      //   }

      // Map over the issue IDs and insert a new row into the user_issues table for each one
      issue_ids.map((issue_id) => {
        connection.query(
          "INSERT INTO user_issues (user_id, issue_id) VALUES (?, ?)",
          [user_id, issue_id],
          (error, results, fields) => {
            if (error) {
              console.log(
                `Error while creating user-issue mapping for user ${user_id} and issue ${issue_id}`,
                error
              );
            }
          }
        );
      });
    };
    createUserIssues(user_id, issue_ids);
    return res.status(200).send("User-issues mappings created successfully");
  } catch (err) {
    console.log("Error while creating user-issues mappings", err);
    return res.status(500).send();
  }
});

module.exports = router;
