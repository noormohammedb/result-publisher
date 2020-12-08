const StudentModel = require("../models/studentModel")
const findStudentRegNum = require("../utils/findStudentRegNum")
module.exports = async (payload) => {
   const dbResFind = await findStudentRegNum(payload);
   if (dbResFind) {
      return {
         statusCode: 200,
         json: {
            status: true,
            messae: "register number matched",
            data: {
               name: dbResFind.name,
               registerNumber: dbResFind.registerNumber,
               subject1: dbResFind.subject1,
               subject2: dbResFind.subject2,
               subject3: dbResFind.subject3,

            },
         }
      };
   } else {
      console.log("student not exist for result");
      return {
         statusCode: 400,
         json: {
            status: false,
            messae: "register number not matched",
            data: {},
         }
      };
   }
}