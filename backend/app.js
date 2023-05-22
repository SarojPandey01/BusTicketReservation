const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const bodyParser = require("body-parser");
const db = new sqlite3.Database("test.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQlite database.");
});

const app = express();
app.use(bodyParser.json());

let command =
  "CREATE TABLE contacts (contact_id INTEGER PRIMARY KEY,first_name TEXT NOT NULL,last_name TEXT NOT NULL,email TEXT NOT NULL UNIQUE,phone TEXT NOT NULL UNIQUE)";
let c = "DROP TABLE users";
// db.run(sql);

function handleSignup() {
  // let sql =
  //   "CREATE TABLE users (userid INTEGER PRIMARY KEY,Name TEXT, Email TEXT UNIQUE, Password TEXT NOT NULL)";
  app.post("/signup", (req, res) => {
    try {
      const { id, name, email, password } = req.body;
      let sql =
        "INSERT INTO users(userid,Name, Email, Password) VALUES (?,?,?,?)";

      db.run(sql, [id, name, email, password], (err) => {
        if (err) {
          res.json({
            status: "failure",
            message: err.message,
          });
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${id}`);
        res.json({
          status: "success",
          message: `A row has been inserted with rowid ${id}`,
        });
      });
    } catch (e) {
      res.json({
        status: "failure",
        message: e.message,
      });
      return console.error(e);
    }
  });
}
db.run("DROP table contacts");
handleSignup();
app.listen(3001);

db.close((e) => console.log(e));
