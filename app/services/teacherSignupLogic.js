const bcrypt = require("bcrypt")
const { signJwt } = require("../utils/createJwt")
const TeacherModel = require("../models/teacherModel")
module.exports = async (payload) => {
   const dbResFind = await TeacherModel.findOne({ email: payload.email }).exec();
   if (!dbResFind) {

      payload.password = await bcrypt.hash(payload.password, 10)

      const newTeacher = new TeacherModel({
         name: payload.name,
         email: payload.email,
         password: payload.password,
         isTeacher: true,
      });
      try {
         const dbRes = await newTeacher.save();
         const token = signJwt(dbRes)
         return {
            statusCode: 200,
            json: {
               status: true,
               messae: "signup success",
               data: { token },
            }
         };
      } catch (error) {
         console.log("error in teacher signup db operation");
         console.error(error);
      }
   } else {
      console.log("email exist");
      return {
         statusCode: 400,
         json: {
            status: false,
            messae: "email exist",
            data: {},
         }
      };
   }
}