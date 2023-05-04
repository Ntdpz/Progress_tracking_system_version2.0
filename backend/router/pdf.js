const express = require("express");
const router = express.Router();
const connection = require("../db");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const crypto = require("crypto");

router.get("/test", async (req, res) => {
    try {
        return res.send("Hello");
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

// configure Multer to handle file uploads
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "../frontend/static/uploadfiles/");
    },
    filename(req, file, cb) {
        const originalname = file.originalname;
        const filename = originalname.substring(originalname.lastIndexOf("/") + 1);
        cb(null, filename);
    },
});

const upload = multer({ storage });

// * POST FROM screens
router.post("/createfile", upload.single("file"), (req, res) => {
    const {
        text1
    } = req.body;

    const pdf = req.file ? req.file.filename : null;
    const id = generateId();
    try {
        connection.query(
            "INSERT INTO pdf(id, text1, pdf) VALUES(?, ?, ?)",
            [
                id,
                text1,
                pdf,
            ],
            (err, results, fields) => {
                if (err) {
                    console.log("Error database", err);
                    return res.status(400).send();
                }
                return res
                    .status(201)
                    .json({ message: "successfully created!" });
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});

// * PUT /api/updatefile/:id
router.put("/updatefile/:id", upload.single("file"), (req, res) => {
    const { text1 } = req.body;
    const id = req.params.id;

    // Check if file exists in the database
    connection.query("SELECT pdf FROM pdf WHERE id = ?", [id], (err, results) => {
        if (err) {
            console.log("Error database", err);
            return res.status(400).send();
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "File not found" });
        }

        const pdf = results[0].pdf;

        // Update the text1 field in the database
        try {
            connection.query(
                "UPDATE pdf SET text1 = ? WHERE id = ?",
                [text1, id],
                (err, results) => {
                    if (err) {
                        console.log("Error database", err);
                        return res.status(400).send();
                    }

                    return res
                        .status(200)
                        .json({ message: "successfully updated!" });
                }
            );
        } catch (err) {
            console.log(err);
            return res.status(500).send();
        }
    });
});


// GET endpoint to download a file
router.get("/downloadfile/:pdf", (req, res) => {
    const pdf = req.params.pdf;
    connection.query(
        "SELECT pdf FROM pdf WHERE pdf = ?",
        [pdf],
        (err, results, fields) => {
            if (err) {
                console.log("Error database", err);
                return res.status(400).send();
            }
            const file = results[0].pdf;
            const filePath = path.join("../frontend/static/uploadfiles/", file);
            const fileStream = fs.createReadStream(filePath);

            // Set the Content-Disposition header to force a download
            res.setHeader(
                "Content-Disposition",
                `attachment; filename="${file}"`
            );

            // Set the content type header to match the file type
            res.setHeader("Content-Type", "application/pdf");

            // Send the file to the client for download
            fileStream.pipe(res);
        }
    );
});

// * DELETE FROM screens
router.delete("/deletefile/:id", (req, res) => {
    const id = req.params.id;
    connection.query(
        "SELECT pdf FROM pdf WHERE id = ?",
        [id],
        (err, results, fields) => {
            if (err) {
                console.log("Error database", err);
                return res.status(400).send();
            }
            if (results.length === 0) {
                return res.status(404).json({ message: "File not found" });

            }
            const pdf = results[0].pdf;
            if (!pdf) {
                return connection.query(
                    "DELETE FROM pdf WHERE id = ?",
                    [id],
                    (err, results, fields) => {
                        if (err) {
                            console.log("Error database", err);
                            return res.status(400).send();
                        }
                        return res
                            .status(200)
                            .json({ message: "successfully deleted!" });
                    }
                );
            }
            const filePath = path.join("../frontend/static/uploadfiles/", pdf);
            try {
                fs.unlinkSync(filePath);
                connection.query(
                    "DELETE FROM pdf WHERE id = ?",
                    [id],
                    (err, results, fields) => {
                        if (err) {
                            console.log("Error database", err);
                            return res.status(400).send();
                        }
                        return res
                            .status(200)
                            .json({ message: "successfully deleted!" });
                    }
                );
            } catch (err) {
                console.log(err);
                return res.status(500).send();
            }
        }
    );
});





// *getAll
router.get("/getAll", (req, res) => {
    try {
        connection.query(
            "SELECT * FROM pdf",
            (err, results, fields) => {
                if (err) {
                    console.log("Error database", err);
                    return res.status(400).send();
                }
                return res.status(200).json(results);
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});

module.exports = router;