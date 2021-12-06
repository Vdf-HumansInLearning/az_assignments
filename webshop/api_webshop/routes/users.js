var express = require("express");
var router = express.Router();

const fs = require("fs");
const path = require("path");

const utils = require("../../utils");

let rawdata = fs.readFileSync(path.resolve(__dirname, "../users.json"));

let users = JSON.parse(rawdata);
let userList = users.userList;

/* GET all users */
router.get("/users", (req, res) => {
  res.status(200).send(userList);
});

/* GET one user */
router.get("/users/:id", (req, res) => {
  let userId = Number(req.params.id);
  if (isNaN(userId)) {
    res.status(400).send({ message: "Bad request" });
  } else {
    let foundUser = userList.find((user) => user.id == req.params.id);
    if (foundUser) {
      res.status(200).send(foundUser);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  }
});

/* POST user */
router.post("/users", (req, res) => {
  if (req.body.email && req.body.password && req.body.username) {
    const user = {
      id: userList[userList.length - 1].id + 1,
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      isAdmin: false,
    };

    let result = utils.validateNewUser(user);

    let verifyUser = userList.find((user) => user.email == req.body.email);
    if (verifyUser) {
      res.status(403).send({ message: "User already registered" });
    } else if (result.isValid) {
      userList.push(user);
      let json = JSON.stringify(users, null, 2);
      fs.writeFile(
        path.resolve(__dirname, "../users.json"),
        json,
        function (err) {
          if (err) throw err;
          res.status(201).send(`User with name ${user.username} created`);
        }
      );
    } else {
      res.status(406).send({ message: result.message });
    }
  } else {
    res.status(400).send({ message: "Please complete all fields" });
  }
});

/* DELETE user */
router.delete("/users", (req, res) => {
  if (req.body.email) {
    let foundUser = userList.find((user) => user.email == req.body.email);
    if (foundUser) {
      let userIndex = userList.findIndex(
        (item) => item.email === req.body.email
      );
      console.log(userIndex);
      if (userIndex !== -1) {
        let removed = userList.splice(userIndex, 1);
        console.log(removed);
        let json = JSON.stringify(users, null, 2);
        fs.writeFile(
          path.resolve(__dirname, "../users.json"),
          json,
          function (err) {
            if (err) throw err;
            {
              res
                .status(200)
                .send(`User with email ${removed[0].email} deleted`);
            }
          }
        );
      } else {
        res.status(404).send({ message: "User not found" });
      }
    } else {
      res.status(404).send({ message: "User not found" });
    }
  }
});

/* PUT user */
//modify a user admin status
router.put("/users", (req, res) => {
  if (req.body.email) {
    let foundIndex = userList.findIndex(
      (item) => item.email === req.body.email
    );
    console.log(foundIndex);
    if (foundIndex) {
      userList[foundIndex].isAdmin = !userList[foundIndex].isAdmin;
      let json = JSON.stringify(users, null, 2);
      fs.writeFile(
        path.resolve(__dirname, "../users.json"),
        json,
        function (err) {
          if (err) throw err;

          res.status(200).send({
            message: `User with email ${userList[foundIndex].email} was updated`,
          });
        }
      );
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } else {
    res.status(400).send({ message: "Please complete all fields" });
  }
});

module.exports = router;
