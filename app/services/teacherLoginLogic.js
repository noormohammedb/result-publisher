const bcrypt = require("bcrypt");
const { signJwt } = require("../utils/createJwt");
const findTeacherEmail = require("../utils/findTeacherEmail");

module.exports = async (payload) => {
   const dbResFind = await findTeacherEmail(payload);
   if (dbResFind) {
      try {
         const matchPassword = await bcrypt.compare(payload.password, dbResFind.password);
         if (matchPassword) {
            const token = signJwt(dbResFind);
            return {
               statusCode: 200,
               json: {
                  status: true,
                  message: "login success",
                  data: { token },
               },
            };
         }
         else {
            return {
               statusCode: 400,
               json: {
                  status: false,
                  message: "password or email error",
                  data: {},
               },
            };
         }
      } catch (error) {
         console.log("error in login bcrypt compare operation");
         console.error(error);
      }
   } else {
      console.log("email not exist to login");
      return {
         statusCode: 400,
         json: {
            status: false,
            message: "email or password error",
            data: {},
         },
      };
   }
   return null;
};
