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

// api - 회원 가입
app.post("/api/signup", (req, res) => {
  const { email, password, nickname } = req.body;
  const sql = `INSERT INTO user_info (email, password, nickname, join_time, is_admin) VALUES (?, ?, ?, now(), false)`;
  connection.query(sql, [email, password, nickname], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Error creating user" });
      return;
    }
    res.json({ message: "User created successfully", success: true });
  });
});

// api - 로그인
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  connection.query(
    `SELECT * FROM user_info WHERE email = '${email}'`,
    (err, results) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }

      if (results.length === 0) {
        res.status(401).send("존재하지 않는 이메일입니다.");
        return;
      }

      const user_data = results[0];

      if (user_data.password != password) {
        res.status(401).send("비밀번호가 올바르지 않습니다.");
        return;
      }
      res.send("로그인 성공!");
    }
  );
});

// react 앱과 연결
app.get(`*`, (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`);
});

app.listen(port, () => console.log(`port: ${port}`));

module.exports = app;
