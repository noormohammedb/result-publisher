const StudentModel = require("../models/studentModel");
const findStudentRegNum = require("../utils/findStudentRegNum");

module.exports = async (payload) => {
   const dbResFind = await findStudentRegNum(payload);
   if (dbResFind) {
      const total = parseInt(payload.subject1) + parseInt(payload.subject2) + parseInt(payload.subject3)
      console.log(dbResFind);
      try {
         const dbRes = await StudentModel.updateOne(
            { registerNumber: payload.registerNumber, isRemoved: false },
            {
               $set: {
                  ...payload, total
               },
            },
         );
         console.log(dbRes);
         return {
            statusCode: 200,
            json: {
               status: true,
               message: "student setails edited successfully",
               data: {},
            },
         };
      } catch (error) {
         console.log("error in edit student db operation");
         console.error(error);
      }
   } else {
      console.log("student not exist for edit");
      return {
         statusCode: 400,
         json: {
            status: false,
            message: "student not exist",
            data: {},
         },
      };
   }
   return null;
};
