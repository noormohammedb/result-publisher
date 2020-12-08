const bcrypt = require("bcrypt")
const { signJwt } = require("../utils/createJwt")
const TeacherModel = require("../models/teacherModel")
module.exports = async (payload) => {

   payload.password = await bcrypt.hash(payload.password, 10)

   const newTeacher = new TeacherModel({
      name: payload.name,
      emial: payload.emial,
      password: payload.password,
      isTeacher: true,
   });
   try {
      const dbRes = await newTeacher.save();
      const token = signJwt(dbRes)
      return token;
   } catch (error) {
      console.log("error in teacher signup db operation");
      console.error(error);
   }
}