var express = require("express");
var router = express.Router();

const fs = require("fs");
const path = require("path");

const utils = require("../../utils");

let rawdata = fs.readFileSync(path.resolve(__dirname, "../users.json"));

let users = JSON.parse(rawdata);
let userList = users.userList;

/* POST login */
router.post("/login", (req, res) => {
  if (req.body.email && req.body.password) {
    let user = {
      email: req.body.email,
      password: req.body.password,
    };
    let result = utils.validateExistingUser(user);
    if (result.isValid) {
      let foundUser = userList.find(
        (item) =>
          item.email === req.body.email && item.password === req.body.password
      );
      if (foundUser) {
        res.status(200).send(user);
      } else {
        res.status(403).send({ message: "No user found" });
      }
    } else {
      res.status(403).send({ message: result.message });
    }
  } else {
    res.status(403).send({ message: "Please provide email or password" });
  }
});

/* POST register */
router.post("/register", (req, res) => {
  //verify if necessary fields are present
  if (req.body.email && req.body.password && req.body.username) {
    //a user needs to be made admin by another admin
    let user = {
      id: userList[userList.length - 1].id + 1,
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      isAdmin: false,
    };

    let result = utils.validateNewUser(user);

    if (result.isValid) {
      userList.push(user);
      let json = JSON.stringify(users, null, 2);
      fs.writeFile(
        path.resolve(__dirname, "../users.json"),
        json,
        function (err) {
          if (err) throw err;
          res.status(201).send({ email: user.email });
        }
      );
    } else {
      res.status(406).send({ message: result.message });
    }
  } else {
    res.status(400).send({ message: "Please complete all fields" });
  }
});
module.exports = router;
