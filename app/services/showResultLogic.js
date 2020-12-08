const findStudentRegNum = require("../utils/findStudentRegNum");

module.exports = async (payload) => {
   const dbResFind = await findStudentRegNum(payload);
   if (dbResFind) {
      return {
         statusCode: 200,
         json: {
            status: true,
            message: "register number matched",
            data: {
               name: dbResFind.name,
               registerNumber: dbResFind.registerNumber,
               subject1: dbResFind.subject1,
               subject2: dbResFind.subject2,
               subject3: dbResFind.subject3,
               total: dbResFind.total,
            },
         },
      };
      // eslint-disable-next-line no-else-return
   } else {
      console.log("student not exist for result");
      return {
         statusCode: 400,
         json: {
            status: false,
            message: "register number not matched",
            data: {},
         },
      };
   }
};
