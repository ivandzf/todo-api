const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../index");
const should = chai.should();

chai.use(chaiHttp);

const projectUrl = "/api/v1/project";

describe("Get all project", () => {
  it("return must all project", done => {
    chai
      .request(server)
      .get(projectUrl)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
