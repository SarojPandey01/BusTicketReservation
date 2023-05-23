const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

const db = new sqlite3.Database("test.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQlite database.");
});

const app = express();
app.use(bodyParser.json());

function handleSignup() {
  // let sql =
  //   "CREATE TABLE users (userid INTEGER PRIMARY KEY,Name TEXT, Email TEXT UNIQUE, Password TEXT NOT NULL)";

  app.post("/signup", (req, res) => {
    try {
      const { id, name, email, password, phone } = req.body;
      var salt = bcrypt.genSaltSync(10);
      var hashedPassword = bcrypt.hashSync(password, salt);
      let sql =
        "INSERT INTO users(userid,Name, Email, Password,phone) VALUES (?,?,?,?,?)";

      db.run(sql, [id, name, email, hashedPassword, phone], (err) => {
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
function handleLogin() {
  app.post("/login", (req, res) => {
    try {
      console.warn("login request :post");
      const { email, password } = req.body;
      console.warn(email, password);

      let sql = `SELECT password,userid,Name,Email FROM users WHERE email=?`;
      db.all(sql, [email], (err, row) => {
        if (row[0]) {
          let { Password: hash, userid, Name, Email } = row[0];
          console.log(hash, userid, Name, Email);
          let isAuthorized = bcrypt.compareSync(password, hash);
          console.log(isAuthorized);
          if (isAuthorized) {
            res.json({ authorized: true, Name, Email, userid, phone });
          } else {
            res.json({ authorized: false });
          }
        } else {
          res.json({ authorized: false, message: "No Such User" });
        }
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

function handleBookTicket() {
  app.post("/book", (req, res) => {
    try {
      const { userid, name, source, destination, date, seat } = req.body;
      let sql =
        "INSERT INTO bookings (userid,name,source,destination, date,seat) VALUES (?,?,?,?,?,?)";
      db.run(sql, [userid, name, source, destination, date, seat], (e) => {
        if (e == undefined) {
          res.json({ success: false, message: e });

          return console.log(e);
        } else
          res.json({ success: true, userid, name, source, destination, seat });
      });
    } catch (e) {
      if (e) throw new Error(e);
      res.json({ success: false, message: "Some Error occured" });
    }
  });

  // let sql =
  //   "CREATE TABLE bookings (userid INTEGER PRIMARY KEY , name TEXT ,source TEXT, destination TEXT, date TEXT,seat TEXT)";
}
function getUserDataFromUserId(uid) {
  let sql = `SELECT Name,Email,phone FROM users WHERE userid=?`;
  db.all(sql, [uid], (err, row) => {
    if (row[0]) {
      let { userid, Name, Email, phone } = row[0];
      console.log(hash, userid, Name, Email);

      res.json({ authorized: true, Name, Email, userid, phone });
      return {
        userid,
        Name,
        Email,
        phone,
      };
    } else {
      res.json({ authorized: false, message: "No Such User" });
    }
  });
}
console.log(getUserDataFromUserId(69));
//todo
// handleBookTicket();
// handleLogin();

// handleSignup();
app.listen(3001);
