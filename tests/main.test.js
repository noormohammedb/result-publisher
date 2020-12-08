/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
require("dotenv").config({ path: ".test.env" });

const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");

const teacherModel = require("../app/models/teacherModel");
const studentModel = require("../app/models/studentModel");

const should = chai.should();

const server = require("../app/app");

const teacherLoginPayload = {
   email: "tester@mocha.com",
   password: "password"
}

const teacherSignup = "/v1/signup",
   teacherlogn = "/v1/login";

chai.use(chaiHttp);

describe("==>> Testing result publication system", () => {
   // for clean testing_db before testing
   before((done) => {
      teacherModel.deleteMany({}).then(() => {
         console.log("Database Teacher Collection Cleared");
      }).catch((err) => {
         console.log("teacher db clear error");
         console.log(err);
      });

      studentModel.deleteMany({}).then(() => {
         done();
         console.log("Database student Collection Cleared");
      }).catch((err) => {
         console.log("student db clear error");
         console.log(err);
      });
   });

   describe("==>> signup teacher", () => {
      it(`requesting ${teacherSignup}`, (done) => {
         chai.request(server)
            .post(teacherSignup)
            .send(teacherLoginPayload)
            .end((err, res) => {
               // if (err) throw err;
               res.status.should.eql(200);
               res.body.should.property("status", true);
               done();
            });
      });
   });

   describe("==>> login teacher", () => {
      it(`requesting ${teacherSignup}`, (done) => {
         chai.request(server)
            .post(teacherSignup)
            .send(teacherLoginPayload)
            .end((err, res) => {
               // if (err) throw err;
               res.status.should.eql(200);
               res.body.should.property("status", true);
               done();
            });
      });
   });
});
