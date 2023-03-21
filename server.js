const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setting
app.use(cors());

// sql 연결
const connection = mysql.createConnection({
  host: "localhost",
  user: "findvibe_user",
  password: "findvibe1",
  database: "findvibe_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL server");
});

// build 파일 접근
app.use(express.static(`${__dirname}/client/build`));

// api test
app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello Express!" });
});

// api test
app.post("/api/signup", (req, res) => {
  const { email, password, nickname } = req.body;
  const sql = `INSERT INTO user_info (email, password, nickname, join_time, is_admin) VALUES (?, ?, ?, now(), false)`;
  connection.query(sql, [email, password, nickname], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Error creating user" });
      return;
    }
    res.json({ message: "User created successfully" });
  });
});

// react 앱과 연결
app.get(`*`, (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`);
});

app.listen(port, () => console.log(`port: ${port}`));

module.exports = app;
