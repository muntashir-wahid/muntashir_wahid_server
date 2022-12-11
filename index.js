const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello from MW server!");
});

app.listen(port, () => {
  console.log(`MW server is listening on prot ${port}`);
});
