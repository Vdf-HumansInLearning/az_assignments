var express = require("express");
var router = express.Router();

const fs = require("fs");
const path = require("path");

const utils = require("../../utils");
const filePath = "../users.json";

let rawdata = fs.readFileSync(path.resolve(__dirname, filePath)); //....webshop/routes/../users.json

let users = JSON.parse(rawdata);
let userList = users.userList;

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
  if (req.body.email && req.body.password) {
    let user = {
      email: req.body.email,
      password: req.body.password,
      isAdmin: false,
    };
    let result = utils.validateExistingUser(user);
    if (result.isValid) {
      let foundEl = userList.find(
        (item) =>
          item.email === req.body.email && item.password === req.body.password
      );
      console.log(foundEl);
      if (foundEl) {
        user.isAdmin = foundEl.isAdmin;
        res.status(200).send(user);
      } else {
        res.status(403).send({ message: "No user found" });
      }
    } else {
      res.status(403).send({ message: result.message });
    }
  } else {
    res.status(403).send({ message: "Please provide username or password" });
  }
});

/* POST login page. */
//create user
router.post("/register", function (req, res, next) {
  //verify if necessary fields are present
  if (req.body.email && req.body.password && req.body.username) {
    let user = {
      id: userList[userList.length - 1].id + 1,
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      isAdmin: false,
    };

    //validate user data from front end
    //write the user to file
    let result = utils.validateNewUser(user);

    if (result.isValid) {
      userList.push(user);
      let json = JSON.stringify(users, null, 2);
      fs.writeFile(path.resolve(__dirname, "users.json"), json, function (err) {
        if (err) throw err;
        res.status(201).send(user);
      });
    } else {
      res.status(406).send({ message: result.message });
    }
  } else {
    res.status(400).send({ message: "Please complete all fields" });
  }
});

module.exports = router;
