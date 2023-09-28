const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "notemanagement_db",
});

// const connection = mysql.createConnection({
//   host: "se.mfu.ac.th",
//   user: "admidpnm",
//   password: "adminpnm2023",
//   database: "notemanagement_db",
// });


connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");
});

module.exports = connection;
