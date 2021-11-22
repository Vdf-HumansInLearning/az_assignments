var express = require("express");
var router = express.Router();

const fs = require("fs");
const path = require("path");

const utils = require("../utils");
const filePath = "../users.json";

let isAdmin = false;
let isLoggedIn = false;
let rawdata = fs.readFileSync(path.resolve(__dirname, filePath));
let users = JSON.parse(rawdata);
let userList = users.userList;
console.log(userList);

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
//create user
router.post("/register", function (req, res, next) {
  let user = {
    id: userList[userList.length - 1].id + 1,
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    isAdmin: false,
  };
  console.log(user);
  //validate user data from front end
  //write the user to file

  let result = utils.validateNewUser(user);
  console.log(result);
  if (result.isValid) {
    userList.push(user);
    console.log("hhhhhh");
    console.log(users);
    let json = JSON.stringify(users, null, 2);
    console.log(json);
    fs.writeFileSync("../users.json", json, (err) => {
      if (err) throw err;
      console.log("Data written to file");
    });
    console.log("ppppppppppppp");

    let newData = fs.readFileSync(path.resolve(__dirname, filePath));
    let newData2 = JSON.parse(newData);

    console.log(newData2);
  } else {
    res.status(406).send({ message: result.message });
  }
});

module.exports = router;
