const TeacherModel = require("../models/teacherModel")
module.exports = async (payload) => {
   try {
      const dbResFind = await TeacherModel.findOne({ email: payload.email }).exec();
      return dbResFind;
   } catch (error) {
      console.log("error in find email db operation");
      console.error(error);
   }
}
