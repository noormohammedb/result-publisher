const StudentModel = require("../models/studentModel");
const findStudentRegNum = require("../utils/findStudentRegNum");

module.exports = async (payload) => {
   const dbResFind = await findStudentRegNum(payload);
   if (!dbResFind) {
      const total = parseInt(payload.subject1) + parseInt(payload.subject2) + parseInt(payload.subject3)
      const newStudent = new StudentModel({
         name: payload.name,
         registerNumber: payload.registerNumber,
         subject1: payload.subject1,
         subject2: payload.subject2,
         subject3: payload.subject3,
         total,
      });
      try {
         const dbRes = await newStudent.save();
         return {
            statusCode: 200,
            json: {
               status: true,
               message: "new student added successfully",
               data: { id: dbRes._id },
            },
         };
      } catch (error) {
         console.log("error in add student db operation");
         console.error(error);
      }
   } else {
      console.log("student exist");
      return {
         statusCode: 400,
         json: {
            status: false,
            message: "student exist",
            data: {},
         },
      };
   }
   return null;
};
