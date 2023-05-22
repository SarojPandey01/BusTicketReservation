const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const bodyParser = require("body-parser");
const db = new sqlite3.Database("test.db", (err) => {
  return console.error("err");
});
const app = express();
db.run("DROP TABLE users");
app.post("/signup", (req, res) => {
  try {
  } catch (e) {
    return console.error(e);
  }
});
app.get("/signup", (req, res) => {
  res.json({ message: "success" });
});
app.listen(3001);
