const axios = require("axios").default;
const fs = require("fs");
const path = require("path");

var express = require("express");
var router = express.Router();

let rawdata = fs.readFileSync(path.resolve(__dirname, "../productList.json"));
let result = JSON.parse(rawdata);
let productList = result.products;
const brands = [...new Set(productList.map((product) => product.brand))];
const os = [
  ...new Set(
    productList.map((product) =>
      product.operating_system ? product.operating_system : "N/A"
    )
  ),
];
const propertiesSort = [
  { id: "d", text: "Choose option" },
  { id: "a_r", text: "Sort ascending by rating" },
  { id: "a_p", text: "Sort ascending by price" },
  { id: "d_r", text: "Sort descending by rating" },
  { id: "d_p", text: "Sort descending by price" },
];

const availability = ["all", "until_today"];

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("shop", {
    title: "Shop",
    productList: productList,
    brands: brands,
    os: os,
    propertiesSort: propertiesSort,
    propertiesAvailability: availability,
  });
});

/* GET product list. */
router.get("/api/products", function (req, res, next) {
  res.status(200).send(productList.products);
});

module.exports = router;
