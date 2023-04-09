const express = require("express");
const jwt = require("jsonwebtoken");
const util = require("../util/util");
const accessTokenKey = "1q2w3e4r@";

const router = express.Router();
const connection = require("../../connection");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 상대경로 - 옮기면 바꾸기
    cb(null, "/home/hungkunge/FindVibe/upload_images");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

// 데이터 받아서 저장 + python 서버에 전송
router.post("/", upload.single("image"), async (req, res) => {
  // 유효성 확인 - 사용자 정보 받아오기
  const checkToken = req.cookies.find_vibe_access_token;

  if (!checkToken) {
    return res
      .status(401)
      .json({ success: false, message: "Not exist Token." });
  }

  // 검증 - 실패 시 에러 발생
  const user_data = jwt.verify(checkToken, accessTokenKey);

  const nickname = user_data.nickname;

  const userId = await util.getUserIdByNickname(nickname);

  console.log("userId:" + userId);

  // path
  const imagePath = req.file.path;

  // path와 user_info를 DB에 저장
  const saveResult = await util.saveRequestLog(userId, imagePath);
  // TODO: python 서버로 요청 전송

  // 요청 결과가 오면 결과를 DB에 저장 밑 반환
  res.status(200).json({ success: saveResult });
});

module.exports = router;
