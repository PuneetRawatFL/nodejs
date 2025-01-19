const chai = require("chai");
const chaiHttp = require("chai-http");

//importing
const app = require("./app");

chai.use(chaiHttp);
const expect = chai.expect;

//
describe("GET /ping", () => {
    it("should return hello", (done) => {
        chai.request(app)
            .get("/ping")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an("object");
                expect(res.body).to.have.property("message").eql("Hello");
                done();
            });
    });
});
