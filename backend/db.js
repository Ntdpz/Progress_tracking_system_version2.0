const mysql = require("mysql");


// const connection = mysql.createConnection({
//   connectionLimit: 10, // จำนวน connection สูงสุดที่ pool สามารถจัดการได้
//   host: 'mysql-seniorprojectprogresstracking.alwaysdata.net',     // ที่อยู่ IP หรือชื่อโฮสต์ของ MySQL Server
//   user: '347136',         // ชื่อผู้ใช้ MySQL
//   password: 'Progresstracking1001',         // รหัสผ่าน MySQL
//   database: 'seniorprojectprogresstracking_term1', // ชื่อฐานข้อมูลที่ใช้
// });

const connection = mysql.createConnection({
  connectionLimit: 10, // จำนวน connection สูงสุดที่ pool สามารถจัดการได้
  host: '0.0.0.0',     // ที่อยู่ IP หรือชื่อโฮสต์ของ MySQL Server
  user: 'root',         // ชื่อผู้ใช้ MySQL
  password: '',         // รหัสผ่าน MySQL
  database: 'notemanagement_db', // ชื่อฐานข้อมูลที่ใช้
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
