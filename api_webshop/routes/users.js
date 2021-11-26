var express = require("express");
var router = express.Router();

const fs = require("fs");
const path = require("path");

let rawdata = fs.readFileSync(path.resolve(__dirname, "../users.json"));

let users = JSON.parse(rawdata);
let userList = users.userList;

/* GET all users */
router.get("/users", (req, res) => {
  res.status(200).send(userList);
});

module.exports = router;
