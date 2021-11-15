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

//params: brand to look for, array of products
//looks for a brand and returns average rating
function getAverageRating(arr, brand) {
  let myObj = {};
  arr
    .filter((item) => item.rating >= 0)
    .forEach((item) => {
      if (item.brand in myObj) myObj[item.brand].push(item.rating);
      else myObj[item.brand] = [item.rating];
    });
  for (key in myObj) {
    let sum = 0;
    myObj[key].forEach((item) => (sum += item));
    myObj[key] = parseFloat((sum / myObj[key].length).toFixed(2));
  }
  for (key in myObj) {
    console.log(key);
    console.log(brand);

    if (key === brand) return myObj[key];
    else return "-";
  }
}

function generateAverageRating(arr) {
  let newArr = [];
  arr.forEach((item) => newArr.push(getAverageRating(productList, item.brand)));
  return newArr;
}
let averageProdRatings = generateAverageRating(productList);
console.log("avg prod rating");
console.log(averageProdRatings);
// get phones array
// filter phones array by query params
// get filter array
// set selected filters from query
// send phones and filters to render method

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log(req.query);
  res.render("shop", {
    title: "Shop",
    productList: productList,
    avgRatings: averageProdRatings,
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
