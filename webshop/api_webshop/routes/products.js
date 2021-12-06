var express = require("express");
var router = express.Router();

const fs = require("fs");
const path = require("path");

const utils = require("../../utils");

let rawdata = fs.readFileSync(path.resolve(__dirname, "../productList.json"));

let jsonData = JSON.parse(rawdata);
let productList = jsonData.products;

/* GET all products */
router.get("/products", (req, res) => {
  res.status(200).send(productList);
});

/* GET one products */
router.get("/products/:id", (req, res) => {
  console.log(req.params.id);

  let foundProduct = productList.find((product) => product.id == req.params.id);
  if (foundProduct) {
    res.status(200).send(foundProduct);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

/* POST products */
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

    //TO-DO: add validation of fields

    let verifyProduct = productList.find(
      (product) =>
        product.name == req.body.name &&
        product.brand === req.body.brand &&
        product.operating_system === req.body.operating_system
    );
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
    res.status(400).send({ message: "Please complete all fields" });
  }
});

/* DELETE products */
router.delete("/products", (req, res) => {
  //TO-DO: modify url to include id; delete product by id
  if (req.body.name && req.body.brand) {
    let foundProduct = productList.find(
      (product) =>
        product.name == req.body.name && product.brand === req.body.brand
    );
    if (foundProduct) {
      let productIndex = productList.findIndex(
        (item) => item.name === req.body.name && item.brand === req.body.brand
      );
      console.log(userIndex);
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
                .send(`Product ${removed[0].name} ${removed[0].brand} deleted`);
            }
          }
        );
      } else {
        res.status(404).send({ message: "Product not found" });
      }
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } else {
    res.status(400).send({ message: "Please complete all fields" });
  }
});

/* PUT products */
//update a product
router.put("/products", (req, res) => {
  if (req.body.name && req.body.brand) {
    //get the user
    let productIndex = productList.findIndex(
      (item) => item.name === req.body.name && item.brand === req.body.brand
    );
    if (productIndex !== -1) {
      //update whole user
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
            message: `Product ${name} ${brand} was updated`,
          });
        }
      );
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } else {
    res.status(400).send({ message: "Please complete all fields" });
  }
});

module.exports = router;
