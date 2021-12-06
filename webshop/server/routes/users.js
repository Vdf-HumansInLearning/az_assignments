const axios = require("axios").default;
var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  // obtain the users from an API call
  axios
    .get("http://localhost:8080/api/users")
    .then(function (response) {
      console.log(response.data);

      res.render("users", {
        title: "Users",
        users: response.data,
        isAdmin: true,
      });
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // always executed
    });
});

module.exports = router;
