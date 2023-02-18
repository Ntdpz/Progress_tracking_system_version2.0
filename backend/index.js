// module.exports = connection;
var cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const session = require("express-session");
const app = express();
const usersRouter = require("./router/users");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Note: set this to 'true' if using HTTPS
  })
);

app.use("/users", usersRouter);

app.listen(7777, () => {
  console.log("Server listening on port 7777");
});
