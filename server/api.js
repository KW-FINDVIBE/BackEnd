const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const router = express.Router();
const connection = require("./connection");

// 토큰 키
const accessTokenKey = "1q2w3e4r@";
const refreshTokenKey = "123456789a";

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
        res.status(403).send("Not Authorized");
        return;
      }

      const user_data = results[0];

      if (user_data.password != password) {
        res.status(403).send("password is not correct.");
        return;
      }

      // 사용자 정보에 접근에 사용 - 만료기간 1분
      const accessToken = jwt.sign(
        {
          email: user_data.email,
          password: user_data.password,
          nickname: user_data.nickname,
        },
        accessTokenKey,
        { expiresIn: "1m", issuer: "FindVibe" }
      );

      // accessToken 재발행에 사용 - 만료기간 1일
      const refreashToken = jwt.sign(
        {
          email: user_data.email,
          password: user_data.password,
          nickname: user_data.nickname,
        },
        refreshTokenKey,
        { expiresIn: "24h", issuer: "FindVibe" }
      );

      // find_vibe_token 쿠키에 토큰 저장 + 쿠키 만료 7일
      // TODO : XSS 공격 대비하기
      res.cookie("find_vibe_access_token", accessToken, {
        httpOnly: true,
        secure: false,
      });

      res.cookie("find_vibe_refresh_token", refreashToken, {
        httpOnly: true,
        secure: false,
      });

      /*       
      domain: "localhost",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      */

      res.send({ success: true });
    }
  );
});

// api -  로그아웃
router.post("/logout", (req, res) => {
  res.clearCookie("find_vibe_access_token");
  res.clearCookie("find_vibe_refresh_token");
  res.send({ success: true });
});

router.post("/login/success", (req, res) => {
  const checkToken = req.cookies.find_vibe_access_token;

  if (!checkToken) {
    return res
      .status(401)
      .json({ success: false, message: "Not exist Token." });
  }

  try {
    // 검증 - 실패 시 에러 발생
    const user_data = jwt.verify(checkToken, accessTokenKey);

    const { password, ...other } = user_data;

    res.status(200).json({ other, success: true });
  } catch (error) {
    res.status(200).json({ success: false });
  }
});

// 토큰 유효성 확인
router.post("/token/check", (req, res) => {
  const checkToken = req.cookies.find_vibe_access_token;

  if (!checkToken) {
    return res
      .status(401)
      .json({ success: false, message: "there is no Token(cookie)" });
  }

  try {
    // 검증 - 실패 시 에러 발생
    jwt.verify(checkToken, accessTokenKey);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
});

// access 토큰 재발행
router.post("/token/refresh", (req, res) => {
  const checkToken = req.cookies.find_vibe_refresh_token;

  if (!checkToken) {
    return res
      .status(401)
      .json({ success: false, message: "there is no Token(cookie)" });
  }

  try {
    // 검증 - 실패 시 에러 발생
    const user_data = jwt.verify(checkToken, refreshTokenKey);

    const accessToken = jwt.sign(
      {
        email: user_data.email,
        password: user_data.password,
        nickname: user_data.nickname,
      },
      accessTokenKey,
      { expiresIn: "1m", issuer: "FindVibe" }
    );

    res.cookie("find_vibe_access_token", accessToken, {
      httpOnly: true,
      secure: false,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Invalid token" });
  }
});

module.exports = router;
