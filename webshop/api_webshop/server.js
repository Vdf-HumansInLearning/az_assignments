var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");

var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");
var authRouter = require("./routes/auth");

var app = express();
const port = 8080;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/api", usersRouter);
app.use("/api", productsRouter);
app.use("/api", authRouter);

app.listen(8080, () => {
  console.log(`Server is running on http://localhost:${8080}`);
});

module.exports = app;
