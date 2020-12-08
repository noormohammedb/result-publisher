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
}, studentPayload = {
   name: "tester",
   registerNumber: 77,
   subject1: 4,
   subject2: 1,
   subject3: 6
}, editStudentPayload = {
   name: "tester edited",
   registerNumber: 77,
   subject1: 5,
   subject2: 5,
   subject3: 5
}

let authToken = "", totalMark = 0;

const teacherSignup = "/v1/signup",
   teacherlogin = "/v1/login",
   addStudent = "/v1/add_student",
   showResult = "/v1",
   editStudent = "/v1/edit_student";

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
      it(`requesting ${teacherlogin}`, (done) => {
         chai.request(server)
            .post(teacherlogin)
            .send(teacherLoginPayload)
            .end((err, res) => {
               // if (err) throw err;
               res.status.should.eql(200);
               res.body.should.property("status", true);
               console.log(res.body.data.token);
               authToken = res.body.data.token;
               done();
            });
      });
   });

   describe("==>> add student without login teacher", () => {
      it(`requesting ${addStudent}`, (done) => {
         chai.request(server)
            .post(addStudent)
            .send(studentPayload)
            .end((err, res) => {
               // if (err) throw err;
               console.log(res.body);
               res.status.should.eql(401);
               res.body.should.property("status", false);
               done();
            });
      });
   });

   describe("==>> add student with logged in teacher", () => {
      it(`requesting ${addStudent}`, (done) => {
         chai.request(server)
            .post(addStudent)
            .send(studentPayload)
            .set("Authorization", `bearar ${authToken}`)
            .end((err, res) => {
               // if (err) throw err;
               console.log(res.body);
               res.status.should.eql(200);
               res.body.should.property("status", true);
               done();
            });
      });
   });

   describe("==>> check student result", () => {
      it(`requesting ${showResult}`, (done) => {
         chai.request(server)
            .get(showResult)
            .send({ registerNumber: studentPayload.registerNumber })
            .end((err, res) => {
               // if (err) throw err;
               res.status.should.eql(200);
               res.body.should.property("status", true);
               res.body.data.should.property("registerNumber", studentPayload.registerNumber);
               totalMark = res.body.data.total;
               console.log(`==============================${totalMark}==========================`);
               done();
            });
      });
   });

   describe("==>> edit student details without logged in teacher", () => {
      it(`requesting ${editStudent}`, (done) => {
         chai.request(server)
            .patch(editStudent)
            .send(editStudentPayload)
            .end((err, res) => {
               // if (err) throw err;
               console.log(res.body);
               res.status.should.eql(401);
               res.body.should.property("status", false);
               done();
            });
      });
   });

   describe("==>> edit student details with logged in teacher", () => {
      it(`requesting ${editStudent}`, (done) => {
         chai.request(server)
            .patch(editStudent)
            .set("Authorization", `bearar ${authToken}`)
            .send(editStudentPayload)
            .end((err, res) => {
               // if (err) throw err;
               console.log(res.body);
               res.status.should.eql(200);
               res.body.should.property("status", true);
               done();
            });
      });
   });

   describe("==>> check student result is edited", () => {
      it(`requesting ${showResult}`, (done) => {
         chai.request(server)
            .get(showResult)
            .send({ registerNumber: studentPayload.registerNumber })
            .end((err, res) => {
               // if (err) throw err;
               res.status.should.eql(200);
               res.body.should.property("status", true);
               res.body.data.should.property("registerNumber", studentPayload.registerNumber);
               res.body.data.total.should.not.equal(totalMark);
               console.log(`==============================${res.body.data.total}==========================`);
               done();
            });
      });
   });

});
