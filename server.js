const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// api
app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello Express!" });
});

app.listen(port, () => console.log(`port: ${port}`));

module.exports = app;
