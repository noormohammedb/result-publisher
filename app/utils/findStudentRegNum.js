const StudentModle = require("../models/studentModel");

module.exports = async (payload) => {
   try {
      const dbResFind = await StudentModle.findOne({
         registerNumber: payload.registerNumber,
         isRemoved: false,
      }).exec();
      return dbResFind;
   } catch (error) {
      console.log("error in find student regno db operation");
      console.error(error);
   }
};
