const axios = require("axios").default;
const fs = require("fs");
const path = require("path");

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("cart", { title: "Your shopping cart" });
});

module.exports = router;
