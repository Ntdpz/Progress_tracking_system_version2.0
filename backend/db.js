// const mysql = require("mysql");

// // สร้าง connection โดยใช้ Docker Compose
// const connection = mysql.createConnection({
//   connectionLimit: 10,
//   host: 'db', // หรือใส่เป็น localhost ก็ได้
//   user: 'root',
//   password: 'root',
//   database: 'seniorprojectprogresstracking_term1'
// });


// //Alwaysdata.com
// // const connection = mysql.createConnection({
// //   connectionLimit: 10, // จำนวน connection สูงสุดที่ pool สามารถจัดการได้
// //   host: 'mysql-seniorprojectprogresstracking.alwaysdata.net',     // ที่อยู่ IP หรือชื่อโฮสต์ของ MySQL Server
// //   user: '347136',         // ชื่อผู้ใช้ MySQL
// //   password: 'Progresstracking1001',         // รหัสผ่าน MySQL
// //   database: 'seniorprojectprogresstracking_term1', // ชื่อฐานข้อมูลที่ใช้
// // });


// //XAMPP
// // const connection = mysql.createConnection({
// //   connectionLimit: 10, // จำนวน connection สูงสุดที่ pool สามารถจัดการได้
// //   host: '0.0.0.0',     // ที่อยู่ IP หรือชื่อโฮสต์ของ MySQL Server
// //   user: 'root',         // ชื่อผู้ใช้ MySQL
// //   password: '',         // รหัสผ่าน MySQL
// //   database: 'seniorprojectprogresstracking_term1', // ชื่อฐานข้อมูลที่ใช้
// // });

// //server SE.LAB
// // const connection = mysql.createConnection({
// //   host: "se.mfu.ac.th",
// //   user: "admidpnm",
// //   password: "adminpnm2023",
// //   database: "notemanagement_db",
// // });

// connection.connect((err) => {
//   if (err) {
//     console.error("Error connecting to database:", err);
//     return;
//   }
//   console.log("Connected to database");
// });

// module.exports = connection;


const mysql = require('mysql2');

const dbConfig = {
  host: 'db', // ชื่อ container ของ MySQL
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'seniorprojectprogresstracking_term1', // ชื่อ database ของ MySQL
};

// เพิ่ม try-catch block เพื่อดักจับ error
try {
  const connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to database:", err);
      return;
    }
    console.log("Connected to database");
  });

  module.exports = connection;
} catch (err) {
  // โยน error ออกมาเพื่อให้ระบบจัดการต่อไป
  throw err;
}
