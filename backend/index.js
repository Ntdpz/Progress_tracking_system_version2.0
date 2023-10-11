// module.exports = connection;
var cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const session = require("express-session");
const app = express();

const router = require("./router");
app.use(express.json({ limit: '10mb' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Note: set this to 'true' if using HTTPS
  })
);

app.use("/", router);

app.get("/backend", async (req, res) => {
  try {
    res.send({ message: "Backend Started!" });
  } catch (err) {
    console.log(err);
  }
});

// app.listen(8236, () => {
//   console.log("Server listening on port 8236");
// });

app.listen(7777, () => {
  console.log("Server listening on port 7777");
});
