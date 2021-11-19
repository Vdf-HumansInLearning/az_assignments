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

//params: array of products
//returns: object with key-value brand-average rating
function getAvgRatingList(arr) {
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
  return myObj;
}

//params: an object representing averag ratings, brand to look for
//returns: the average rating (number) for that brand
function getAvgRatingBrand(listObj, brand) {
  for (key in listObj) {
    if (key === brand) return listObj[key];
    else return "-";
  }
}

//make a new array corelated with the product list to show in
//front end
function generateAverageRating(arr) {
  let newArr = [];
  arr.forEach((item) =>
    newArr.push(getAvgRatingBrand(avgRatingObj, item.brand))
  );
  return newArr;
}

let avgRatingObj = getAvgRatingList(productList);
let averageProdRatings = generateAverageRating(productList);

//today date for filterByDate
let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0");
let yyyy = today.getFullYear();

today = yyyy + "-" + mm + "-" + dd;

maxPriceAvailable = Math.max(...productList.map((product) => product.price));
let message = "";

function vaidatePrice(minPrice, maxPrice) {
  let isValid = false;
  if (minPrice) {
    let minPrice = minPrice ? parseFloat(minPrice) : 0;

    if (minPrice < 0) {
      message = "Minimum price must be above 0.";
    } else if (isNaN(minPrice)) {
      message = "Minimum price must be a number.";
    } else {
      isValid = true;
    }
  } else if (maxPrice) {
    let maxPrice = maxPrice ? parseFloat(maxPrice) : maxPriceAvailable;
    if (isNaN(maxPrice)) {
      message = "Maximum price must be a number.";
    } else {
      isValid = true;
    }
  } else if (minPrice && maxPrice) {
    if (maxPrice < minPrice) {
      message = "Minimum price must be lower than maximum price.";
    } else {
      isValid = true;
    }
  }
  return isValid;
}

//create validation method for number inputs

/* GET home page. */
router.get("/", function (req, res, next) {
  productList = productList
    .filter((product) => {
      if (req.query.brand) {
        let selectedBrands = req.query.brand;
        return selectedBrands.includes(product.brand);
      }
      return true;
    })
    .filter((product) => {
      if (req.query.minPrice) return product.price > req.query.minPrice;
      else if (req.query.maxPrice) return product.price < req.query.maxPrice;
      else if (req.query.minPrice && req.query.maxPrice)
        return (
          product.price > req.query.minPrice &&
          product.price >= req.query.maxPrice
        );
      return true;
    })
    .filter((product) => {
      if (req.query.availability) {
        if (req.query.availability === "until_today") {
          return new Date(product.availability_date) <= new Date(today);
        }
      }
      return true;
    })
    .sort((a, b) => {
      if (req.query.sortProp) {
        switch (req.query.sortProp) {
          case "d":
            break;
          case "a_r":
            return a.rating - b.rating;
          case "a_p":
            return a.price - b.price;
          case "d_r":
            return b.rating - a.rating;
          case "d_p":
            return a.price - b.price;
          default:
            break;
        }
      }
      return true;
    });

  res.render("shop", {
    title: "Shop",
    productList: productList,
    avgRatings: averageProdRatings,
    brands: brands,
    os: os,
    propertiesSort: propertiesSort,
    propertiesAvailability: availability,
    message: message,
  });
});

/* GET product list. */
router.get("/api/products", function (req, res, next) {
  res.status(200).send(productList.products);
});

module.exports = router;
