const axios = require("axios").default;
const fs = require("fs");
const path = require("path");

var express = require("express");
var router = express.Router();

let rawdata = fs.readFileSync(path.resolve(__dirname, "../productList.json"));
let productList = JSON.parse(rawdata);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("shop", { title: "Shop", productList: productList.products });
});

/* GET product list. */
router.get("/api/products", function (req, res, next) {
  res.status(200).send(productList.products);
});

module.exports = router;
