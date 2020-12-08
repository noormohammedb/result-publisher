var express = require('express');
var app = express();

app.use("/v1", require("./v1"))

app.all("*", (req, res) => {
  res.status(400).json({ message: "Not Found route" });
});

module.exports = app;
