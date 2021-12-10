const { expect } = require("chai");
let chai = require("chai");
let chaiHttp = require("chai-http");
// let server = require("../appbackup");
let api = require("../server");
const should = chai.should();

chai.use(chaiHttp);

describe("get products", function () {
  it("get all products", () => {
    chai
      .request(api)
      .get("/api/products")
      .end((err, res) => {
        res.should.have.status(200);
      });
  });
});
