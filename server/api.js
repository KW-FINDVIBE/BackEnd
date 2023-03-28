const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
const connection = require("./connection");

const secretKey = "1q2w3e4r@"; // 비밀 키

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
        res.status(401).send("There is no email.");
        return;
      }

      const user_data = results[0];

      if (user_data.password != password) {
        res.status(401).send("password is not correct.");
        return;
      }

      // 만료기간 7일
      const token = jwt.sign(email, secretKey);

      // find_vibe_token 쿠키에 토큰 저장 + 쿠키 만료 7일
      // TODO : XSS 공격 대비하기
      res.cookie("find_vibe_token", token, {
        httpOnly: false,
        secure: false,
        domain: "localhost",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.send({ success: true });
    }
  );
});

// api -  로그아웃
router.post("/logout", (req, res) => {
  res.clearCookie("find_vibe_token");
  res.send({ success: true });
});

// api -  쿠키 확인
router.post("/check_token", (req, res) => {
  const { checkToken } = req.body;

  if (!checkToken) {
    return res.status(401).json({ success: false, message: "Token not found" });
  }

  try {
    // 검증 - 실패 시 에러 발생
    jwt.verify(checkToken, secretKey);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
});

module.exports = router;
