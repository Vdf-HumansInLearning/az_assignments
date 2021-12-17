const { expect } = require("chai");
let chai = require("chai");
let chaiHttp = require("chai-http");
//let server = require("../appbackup");
let api = require("../server");
const should = chai.should();

chai.use(chaiHttp);

describe("get products", function () {
  it("get all products", (done) => {
    chai
      .request(api)
      .get("/api/products")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it("get one product", (done) => {
    chai
      .request(api)
      .get("/api/products/1")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.keys(
          "id",
          "name",
          "brand",
          "operating_system",
          "price",
          "discount",
          "quantity",
          "availability_date",
          "rating"
        );
        done();
      });
  });
});
