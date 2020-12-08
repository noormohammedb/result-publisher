const bcrypt = require("bcrypt")
const { signJwt } = require("../utils/createJwt")
const TeacherModel = require("../models/teacherModel")
const findTeacherEmail = require("../utils/findTeacherEmail")
module.exports = async (payload) => {
   const dbResFind = await findTeacherEmail(payload);
   if (dbResFind) {
      try {
         const matchPassword = await bcrypt.compare(payload.password, dbResFind.password);
         if (matchPassword) {
            const token = signJwt(dbResFind)
            return {
               statusCode: 200,
               json: {
                  status: true,
                  messae: "login success",
                  data: { token },
               }
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
            messae: "email not registerd",
            data: {},
         }
      };
   }
}