var express = require("express");
var router = express.Router();

const fs = require("fs");
const path = require("path");

const utils = require("../../utils");

let rawdata = fs.readFileSync(path.resolve(__dirname, "../products.json"));

let jsonData = JSON.parse(rawdata);
let productList = jsonData.products;

/* GET all products */
router.get("/products", (req, res) => {
  res.status(200).send(productList);
});

/* GET one products */
router.get("/products/:id", (req, res) => {
  let productId = Number(req.params.id);
  if (isNaN(productId)) {
    res.status(400).send({ message: "Bad request" });
  } else {
    let foundProduct = productList.find(
      (product) => product.id == req.params.id
    );
    if (foundProduct) {
      res.status(200).send(foundProduct);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  }
});

/* POST products */

// {

//   "name":"my Phone",
//   "brand": "my Brand",
//   "operating_system":"iOS",
//   "price":14,
//   "discount": 14
// }

router.post("/products", (req, res) => {
  if (
    req.body.name &&
    req.body.brand &&
    req.body.operating_system &&
    req.body.price &&
    req.body.quantity &&
    req.body.availability_date
  ) {
    //availability date is a string
    const product = {
      id: productList[productList.length - 1].id + 1,
      name: req.body.name,
      brand: req.body.brand,
      operating_system: req.body.operating_system,
      price: req.body.price,
      discount: req.body.discount ? req.body.discount : 0,
      quantity: req.body.quantity,
      availability_date: req.body.availability_date,
      rating: -1,
    };

    //name, brand, os, availability date are strings
    //price, discount, quantity, rating are numbers
    //price>0, discount >=0 && discount <=100, quantity >0,
    //rating >=0 && rating <=5
    let isValid = utils.validateProduct(product);
    console.log(isValid);
    if (isValid) {
      let verifyProduct = productList.find((item) => item.id == product.id);
      if (verifyProduct) {
        res.status(403).send({ message: "Product alredy exists." });
      } else {
        productList.push(product);
        let json = JSON.stringify(jsonData, null, 2);
        fs.writeFile(
          path.resolve(__dirname, "../products.json"),
          json,
          function (err) {
            if (err) throw err;
            res.status(201).send(`Product ${product.name} created`);
          }
        );
      }
    } else {
      res.status(400).send({ message: "Fields are not completed correctly" });
    }
  } else {
    res.status(400).send({ message: "Please complete all fields" });
  }
});

/* DELETE product */
router.delete("/products/:id", (req, res) => {
  let productId = Number(req.params.id);
  if (isNaN(productId)) {
    res.status(400).send({ message: "Bad request" });
  } else {
    let productIndex = productList.findIndex((item) => item.id === productId);
    if (productIndex !== -1) {
      let removed = productList.splice(productIndex, 1);
      console.log(removed);
      let json = JSON.stringify(jsonData, null, 2);
      fs.writeFile(
        path.resolve(__dirname, "../products.json"),
        json,
        function (err) {
          if (err) throw err;
          {
            res
              .status(200)
              .send({
                message: `Product ${removed[0].name} ${removed[0].brand} deleted`,
              });
          }
        }
      );
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  }
});

/* PUT products */
//update a product
router.put("/products/:id", (req, res) => {
  let productId = Number(req.params.id);
  if (isNaN(productId)) {
    res.status(400).send({ message: "Bad request" });
  } else {
    let productIndex = productList.findIndex((item) => item.id === productId);
    if (productIndex !== -1) {
      //update whole product
      const {
        name,
        brand,
        operating_system,
        price,
        discount,
        quantity,
        availability_date,
        rating,
      } = req.body;

      let product = req.body;

      //validate request
      let isValid = utils.validateExistingProduct(product);
      if (isValid) {
        productList[productIndex].name = name
          ? name
          : productList[productIndex].name;
        productList[productIndex].brand = brand
          ? brand
          : productList[productIndex].brand;
        productList[productIndex].operating_system = operating_system
          ? operating_system
          : productList[productIndex].operating_system;
        productList[productIndex].price = price
          ? price
          : productList[productIndex].price;
        productList[productIndex].discount = discount
          ? discount
          : productList[productIndex].discount;
        productList[productIndex].price = quantity
          ? quantity
          : productList[productIndex].quantity;
        productList[productIndex].price = availability_date
          ? availability_date
          : productList[productIndex].availability_date;
        productList[productIndex].price = rating
          ? rating
          : productList[productIndex].rating;

        let json = JSON.stringify(jsonData, null, 2);
        fs.writeFile(
          path.resolve(__dirname, "../products.json"),
          json,
          function (err) {
            if (err) throw err;

            res.status(200).send({
              message: `Product ${productList[productIndex].name} ${productList[productIndex].brand} was updated`,
            });
          }
        );
      } else {
        res.status(400).send({ message: "Bad request" });
      }
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  }
});

module.exports = router;
