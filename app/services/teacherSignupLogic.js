const TeacherModel = require("../models/teacherModel")
module.exports = async (payload) => {
   const newTeacher = new TeacherModel({
      name: payload.name,
      emial: payload.emial,
      password: payload.password,
      isTeacher: true,
   });
   try {
      const dbRes = await newTeacher.save();
      return dbRes;
   } catch (error) {
      console.log("error in teacher signup db operation");
      console.error(error);
   }
}