const express = require("express");
const router = express.Router();
const connection = require("../db");

// * GET All FROM default_settings
router.get("/getAll", async (req, res) => {
    try {
        connection.query("SELECT * FROM default_settings", (err, results, fields) => {
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
            "SELECT * FROM default_settings WHERE id = ?",
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

// * POST FROM default_settings
router.post("/createdefault_settings", async (req, res) => {
    const {
        position,
        department,
        nametitle,
        status_user,
        role_user,
        issue_type,
        issue_priotity,
    } = req.body;
    try {
        connection.query(
            "INSERT INTO default_settings (position, department, nametitle, status_user, role_user, issue_type, issue_priotity) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
                position,
                department,
                nametitle,
                status_user,
                role_user,
                issue_type,
                issue_priotity,
            ],
            (err, results, fields) => {
                if (err) {
                    console.log("Error while inserting an issue into the database", err);
                    return res.status(400).send();
                }
                return res
                    .status(201)
                    .json({ message: "New default_settings successfully created!" });
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});

//* PUT default_settings by ID
router.put("/update/:id", async (req, res) => {
    const id = req.params.id;
    const {
        position,
        department,
        nametitle,
        status_user,
        role_user,
        issue_type,
        issue_priotity,
    } = req.body;
    try {
        connection.query(
            "UPDATE default_settings SET position = ?, department = ?, nametitle = ?, status_user = ?, role_user = ?, issue_type = ?, issue_priotity = ? WHERE id = ?",
            [
                position,
                department,
                nametitle,
                status_user,
                role_user,
                issue_type,
                issue_priotity,
                id,
            ],
            (err, result, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                return res.status(200).json({ message: "default_settings updated successfully!" });
            }
        );
    } catch (error) {
        console.log(error);
        return res.status(500).send();
    }
});

//* DELETE default_settings by ID
router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;

    try {
        connection.query(
            "DELETE FROM default_settings WHERE id = ?",
            [id],
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                if (results.affectedRows === 0) {
                    return res.status(404).json({ message: "No default_settings with that id!" });
                }
                return res
                    .status(200)
                    .json({ message: "delete default_settings successfully!" });
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});



module.exports = router;