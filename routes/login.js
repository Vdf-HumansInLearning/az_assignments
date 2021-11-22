var express = require("express");
var router = express.Router();

const fs = require("fs");
const path = require("path");

let isAdmin = false;
let isLoggedIn = false;
let rawdata = fs.readFileSync(path.resolve(__dirname, "../users.json"));
let userList = JSON.parse(rawdata);

/* GET login page. */
router.get("/", function (req, res, next) {
  res.render("login", { title: "Login" });
});

router.post("/", function (req, res, next) {
  console.log(req.body);

  if (req.body.username && req.body.password) {
    let foundEl = userList.find(
      (item) =>
        item.username === req.body.username &&
        item.password === req.body.password
    );
    if (foundEl) {
      isLoggedIn = true;
      isAdmin = foundEl.isAdmin;
      res.render("index", { title: "Homepage", isAdmin: isAdmin });
    } else {
      res.send({ message: "No user found" });
    }
  } else if (req.query.username) {
    res.send({ message: "No password provided" });
  } else if (req.query.password) {
    res.send({ message: "No username provided" });
  } else {
    res.send({ message: "Please provide username or password" });
  }
});

module.exports = router;
