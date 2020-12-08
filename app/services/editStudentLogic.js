const StudentModel = require("../models/studentModel");
const findStudentRegNum = require("../utils/findStudentRegNum");

module.exports = async (payload) => {
   const dbResFind = await findStudentRegNum(payload);
   if (dbResFind) {
      console.log(dbResFind);
      try {
         const dbRes = await StudentModel.updateOne(
            { registerNumber: payload.registerNumber, isRemoved: false },
            {
               $set: {
                  ...payload,
               },
            },
         );
         console.log(dbRes);
         return {
            statusCode: 200,
            json: {
               status: true,
               messae: "student setails edited successfully",
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
            messae: "student not exist",
            data: {},
         },
      };
   }
   return null;
};
