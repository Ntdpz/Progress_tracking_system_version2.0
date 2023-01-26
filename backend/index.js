const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");

const port = 7777; // port

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "",
});

db.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + db.threadId);
});

app.get("/hello", (req, res, next) => {
  res.send("hello");
});

app.use((req, res) => {
    res.status(404).send({ url: `${req.originalUrl} not found` });
});

// *Port
app.listen(process.env.PORT || port, function () {
    console.log('Node app is running on 7777');
});
