var express = require("express");
var router = express.Router();

const fs = require("fs");
const path = require("path");

let isAdmin = false;
let rawdata = fs.readFileSync(path.resolve(__dirname, "../users.json"));
let result = JSON.parse(rawdata);
let adminList = result.adminUsers;
let regularList = result.regularUsers;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Homepage" });
});

router.post("/", function (req, res, next) {
  if (req.query.username && req.query.password) {
  } else if (req.query.username) {
    res.send({ message: "No password provided" });
  } else if (req.query.password) {
    res.send({ message: "No username provided" });
  }
  res.render("index", { title: "Homepage", isAdmin: isAdmin });
});

module.exports = router;
