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
  //verify if the id is a number
  //if not, message: please enter a valid number
  console.log(req.params.id);
  let foundUser = userList.find((user) => user.id == req.params.id);
  if (foundUser) {
    res.status(200).send(foundUser);
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

/* GET admin list */
router.get("/admins", (req, res) => {
  let fiteredList = userList.filter((user) => user.isAdmin);
  console.log(fiteredList);
  res.status(200).send(fiteredList);
});

/* GET regular users list */
router.get("/regulars", (req, res) => {
  let fiteredList = userList.filter((user) => !user.isAdmin);
  console.log(fiteredList);
  res.status(200).send(fiteredList);
});

/* POST user */
router.post("/users", (req, res) => {
  //verify if necessary fields are present
  if (req.body.email && req.body.password && req.body.username) {
    const user = {
      id: userList[userList.length - 1].id + 1,
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
      isAdmin: false,
    };

    //validate user
    let result = utils.validateNewUser(user);

    //verify if the user already exists
    let verifyUser = userList.find((user) => user.email == req.body.email);
    if (verifyUser) {
      res.status(403).send({ message: "User already registered" });
    } else if (result.isValid) {
      //push user to array and write to file
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
  //verify if necessary fields are present
  if (req.body.email) {
    //validate if email is correct
    //find user
    let foundUser = userList.find((user) => user.email == req.body.email);
    if (foundUser) {
      //delete user
      //get index of user

      let userIndex = userList.findIndex(
        (item) => item.email === req.body.email
      );
      console.log(userIndex);
      if (userIndex !== -1) {
        //if we found the index, remove the user with the given email

        let removed = userList.splice(userIndex, 1);
        console.log(removed);
        //update file
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

//modify a user admin status
router.put("/users/", (req, res) => {
  //verify if necessary fields are present
  if (req.body.email) {
  } else {
    res.status(400).send({ message: "Please complete all fields" });
  }
});

module.exports = router;
