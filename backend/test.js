var express = require("express");
var PORT = 8236;
var cors = require("cors");
var app = express();
var mysql = require("mysql");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: true }));
app.use(cors());

const connection = mysql.createConnection({
  host: "se.mfu.ac.th",
  user: "admidpnm",
  password: "adminpnm2023",
  database: "notemanagement_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Mysql Connected...");
});

// app.listen(process.env.PORT || 8236, function () {
//   console.log("Node app is running on 8236");
// });

app.listen(PORT, function () {
  console.log("Node app is running on ", PORT);
});

// //Testing API Server
// app.get("/hello", function (req, res, next) {
//   return res.send({ success: true, message: "hello" });
// });
app.get("/", function (req, res, next) {
  return res.send({ success: true, message: "backend started " });
});
