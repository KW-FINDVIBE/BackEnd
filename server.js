const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setting
app.use(cors());

// build 파일 접근 허가
app.use(express.static(`${__dirname}/client/build`));

// api
app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello Express!" });
});

//
app.get(`*`, (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`);
});

app.listen(port, () => console.log(`port: ${port}`));

module.exports = app;
