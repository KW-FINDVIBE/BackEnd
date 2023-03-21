const express = require("express");
const router = express.Router();
const connection = require("./connection");

// api test
router.get("/hello", (req, res) => {
  res.send({ message: "Hello Express!" });
});

// api - 회원 가입
router.post("/signup", (req, res) => {
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
router.post("/login", (req, res) => {
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

module.exports = router;
