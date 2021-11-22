var express = require("express");
var router = express.Router();

const fs = require("fs");
const path = require("path");

const utils = require("../utils");

let isAdmin = false;
let isLoggedIn = false;
let rawdata = fs.readFileSync(path.resolve(__dirname, "../users.json"));
let userList = JSON.parse(rawdata);

/* GET login page. */
router.get("/login", function (req, res, next) {
  res.render("login", { title: "Login" });
});

/* GET register page. */
router.get("/register", function (req, res, next) {
  res.render("register", { title: "Register" });
});

/* POST login page. */
router.post("/login", function (req, res, next) {
  if (req.body.username && req.body.password) {
    let foundEl = userList.find(
      (item) =>
        item.username === req.body.username &&
        item.password === req.body.password
    );
    if (foundEl) {
      isLoggedIn = true;
      isAdmin = foundEl.isAdmin;
      //redirect
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

/* POST login page. */
router.post("/register", function (req, res, next) {
  //create user
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
