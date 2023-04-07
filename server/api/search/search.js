const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
const connection = require("../../connection");

// 데이터 받아서 저장 + python 서버에 전송
router.post("/search", (req, res) => {});
